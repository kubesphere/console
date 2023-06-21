import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react'
import { Form, Input, TextArea } from '@kube-design/components'
import { get, isEmpty, endsWith, isUndefined } from 'lodash'
import styles from './index.scss'
import MonitoringTarget from './MonitoringTarget'
import RuleInput from './RuleInput'

const NodeRule = (props, ref) => {
  const { editRule } = props

  const [formTemplate] = useState(() => {
    return {
      alert: get(editRule, 'alert', ''),
      annotations: {
        summary: get(editRule, 'annotations.summary', ''),
        message: get(editRule, 'annotations.message', ''),
      },
      exprBuilder: {
        node: {
          names: get(editRule, `exprBuilder.node.names`, []),
          comparator: get(editRule, `exprBuilder.node.comparator`, '>'),
          metricThreshold: get(
            editRule,
            `exprBuilder.node.metricThreshold`,
            {}
          ),
          for: get(editRule, 'for', '1m'),
          severity: get(editRule, 'severity', 'critical'),
        },
      },
      disable: get(editRule, 'disable', false),
    }
  })

  const ruleRef = useRef()
  useImperativeHandle(ref, () => ({
    target: ruleRef.current,
  }))

  const alertingRuleValidator = (rule, value, callback) => {
    if (!value) {
      return callback()
    }

    if (isEmpty(value.comparator)) {
      return callback({
        message: t('OPERATOR_REQUIRED'),
        field: rule.field,
      })
    }

    if (!isEmpty(value.metricThreshold)) {
      const selectedType = Object.keys(value.metricThreshold)[0]
      const thresholdsKey = Object.keys(value.metricThreshold[selectedType])[0]
      const _value = value.metricThreshold[selectedType][thresholdsKey]

      if (_value === '' || !_value || isUndefined(_value)) {
        return callback({
          message: t('THRESHOLD_REQUIRED'),
          field: rule.field,
        })
      }

      if (endsWith(_value, '.')) {
        return callback({
          message: t('THRESHOLD_INVALID'),
          field: rule.field,
        })
      }
    } else {
      return callback({
        message: t('THRESHOLD_REQUIRED'),
        field: rule.field,
      })
    }

    callback()
  }

  return (
    <Form data={formTemplate} ref={ruleRef}>
      <div className={styles.label}>{t('RULE_SETTINGS')}</div>
      <div className={styles.contentGroup}>
        <Form.Item
          label={t('RULE_NAME')}
          desc={t('CUSTOM_RULE_NAME_DESC')}
          rules={[{ required: true, message: t('RULE_NAME_REQUIRED') }]}
        >
          <Input name="alert" maxLength={63} />
        </Form.Item>
        <MonitoringTarget
          resourceType={'node'}
          targetName={`exprBuilder.node.names`}
          namespace={props.namespace}
          cluster={props.cluster}
          formTemplate={formTemplate}
        />
        <Form.Item
          label={t('TRIGGER_CONDITION')}
          rules={[
            { required: true, message: t('SET_ACTIVATION_CONDITION_DESC') },
            { validator: alertingRuleValidator },
          ]}
        >
          <RuleInput resourceType={'node'} name={'exprBuilder.node'} />
        </Form.Item>
      </div>
      <div className={styles.label}>{t('MESSAGE_SETTINGS')}</div>
      <div className={styles.contentGroup}>
        <Form.Item
          className={styles.message}
          label={t('MESSAGE_SUMMARY')}
          desc={t('MESSAGE_SUMMARY_DESC')}
          rules={[{ required: true, message: t('MESSAGE_REQUIRED') }]}
        >
          <Input name="annotations.summary" maxLength={63} />
        </Form.Item>
        <Form.Item
          className={styles.message}
          label={t('MESSAGE_DETAILS')}
          desc={t('MESSAGE_DETAILS_DESC')}
        >
          <TextArea name="annotations.message" maxLength={256} />
        </Form.Item>
      </div>
    </Form>
  )
}

const NodeRuleWithRef = forwardRef(NodeRule)

export default NodeRuleWithRef
