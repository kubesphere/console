import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'
import { Form, Input, TextArea } from '@kube-design/components'
import { get, isEmpty, endsWith, isUndefined } from 'lodash'
import WorkloadStore from 'stores/workload'
import styles from './index.scss'
import MonitoringTarget from './MonitoringTarget/WorkloadSelect'
import RuleInput from './RuleInput'

const WorkloadRule = (props, ref) => {
  const { editRule } = props

  const [formTemplate] = useState(() => {
    return {
      alert: get(editRule, 'alert', ''),
      annotations: {
        summary: get(editRule, 'annotations.summary', ''),
        message: get(editRule, 'annotations.message', ''),
      },
      exprBuilder: {
        workload: {
          comparator: get(editRule, 'exprBuilder.workload.comparator', '>'),
          metricThreshold: get(
            editRule,
            `exprBuilder.workload.metricThreshold`,
            {}
          ),
          for: get(editRule, 'for', '1m'),
          severity: get(editRule, 'severity', 'critical'),
        },
        workloadKind: {
          kind: get(editRule, 'exprBuilder.workload.kind', 'Deployment'),
          names: get(editRule, 'exprBuilder.workload.names', []),
        },
      },
      disable: get(editRule, 'disable', false),
    }
  })

  // workload
  const [workloadIsLoading, setWorkloadIsLoading] = useState(false)
  const [workloads, setWorkloads] = useState([])
  const storeRef = useRef({
    Deployment: new WorkloadStore('deployments'),
    StatefulSet: new WorkloadStore('statefulsets'),
    DaemonSet: new WorkloadStore('daemonsets'),
  })

  const ruleRef = useRef()
  useImperativeHandle(ref, () => ({
    target: ruleRef.current,
  }))

  const fetchWorkloads = useCallback((kind, params) => {
    const { cluster, namespace } = props
    const store = storeRef.current[kind]
    setWorkloadIsLoading(true)
    store
      .fetchList({
        cluster,
        namespace,
        ...params,
      })
      .then(() => {
        setWorkloads(
          store.list.data.map(item => ({
            label: item.name,
            value: item.name,
          }))
        )
        setWorkloadIsLoading(false)
      })
  }, [])

  useEffect(() => {
    fetchWorkloads('Deployment', {})
  }, [])

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

  const monitorTargetValidator = (rule, value, callback) => {
    if (isEmpty(value.names)) {
      return callback({ message: t('MONITOR_TARGET_EMPTY') })
    }

    return callback()
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
        <Form.Item
          label={t('RESOURCE_TYPE')}
          rules={[{ validator: monitorTargetValidator }]}
        >
          <MonitoringTarget
            name={'exprBuilder.workloadKind'}
            namespace={props.namespace}
            cluster={props.cluster}
            workloads={workloads}
            fetchWorkloads={fetchWorkloads}
            stores={storeRef.current}
            isLoading={workloadIsLoading}
          />
        </Form.Item>
        <Form.Item
          label={t('TRIGGER_CONDITION')}
          rules={[
            { required: true, message: t('SET_ACTIVATION_CONDITION_DESC') },
            { validator: alertingRuleValidator },
          ]}
        >
          <RuleInput name={'exprBuilder.workload'} resourceType={'workload'} />
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

const WorkloadRuleWithRef = forwardRef(WorkloadRule)

export default WorkloadRuleWithRef
