/*
 * This file is part of KubeSphere Console.
 * Copyright (C) 2019 The KubeSphere Console Authors.
 *
 * KubeSphere Console is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * KubeSphere Console is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with KubeSphere Console.  If not, see <https://www.gnu.org/licenses/>.
 */

import React from 'react'
import { get, isEmpty } from 'lodash'
import { Form, RadioGroup, RadioButton } from '@kube-design/components'

import MonitoringTarget from './MonitoringTarget'
import RuleInput from './RuleInput'
import CustomRule from './CustomRule'
import QueryMonitor from './QueryMonitor'

import styles from './index.scss'

export default class AlertingRule extends React.Component {
  state = {
    query: get(this.props.formTemplate, 'query'),
    ruleType: get(this.props.formTemplate, 'ruleType', 'template'),
  }

  get namespace() {
    return get(this.props.formTemplate, 'namespace')
  }

  get resourceType() {
    return this.namespace ? 'workload' : 'node'
  }

  handleTypeChange = ruleType => {
    this.setState({ ruleType }, () => {
      this.props.formTemplate.ruleType = ruleType
    })
  }

  handleQueryChange = query => {
    this.setState({ query })
  }

  ruleValidator = (rule, value, callback) => {
    if (!value) {
      return callback()
    }

    if (isEmpty(value.thresholds)) {
      return callback({
        message: t('SET_RULE_DESC'),
        field: rule.field,
      })
    }

    callback()
  }

  renderTemplates() {
    const { cluster, formTemplate } = this.props
    return (
      <div>
        <MonitoringTarget
          namespace={this.namespace}
          cluster={cluster}
          formTemplate={formTemplate}
        />
        <Form.Item
          label={t('ALERTING_RULE')}
          rules={[
            { required: true, message: t('SET_RULE_DESC') },
            { validator: this.ruleValidator },
          ]}
        >
          <RuleInput name="rules[0]" resourceType={this.resourceType} />
        </Form.Item>
      </div>
    )
  }

  renderCustomRule() {
    const { cluster, namespace, store, formTemplate } = this.props
    return (
      <>
        <Form.Item
          label={t('RULE_EXPRESSION')}
          desc={t.html('ALERT_RULE_EXPRESSION_DESC')}
          rules={[{ required: true, message: t('ENTER_RULE_EXPRESSION') }]}
        >
          <CustomRule
            name="query"
            store={store}
            cluster={cluster}
            namespace={namespace}
            onChange={this.handleQueryChange}
          />
        </Form.Item>
        <div className="margin-t12">
          <QueryMonitor
            query={this.state.query}
            duration={formTemplate.duration}
            store={store}
            cluster={cluster}
            namespace={namespace}
          />
        </div>
      </>
    )
  }

  render() {
    const { ruleType } = this.state
    const { formRef, formTemplate } = this.props

    return (
      <Form data={formTemplate} ref={formRef}>
        <RadioGroup
          mode="button"
          buttonWidth={155}
          value={ruleType}
          onChange={this.handleTypeChange}
        >
          <RadioButton value="template">{t('RULE_TEMPLATE')}</RadioButton>
          <RadioButton value="custom">{t('CUSTOM_RULE')}</RadioButton>
        </RadioGroup>
        <div className={styles.content}>
          <div className={styles.contentWrapper}>
            {ruleType === 'template'
              ? this.renderTemplates()
              : this.renderCustomRule()}
          </div>
        </div>
      </Form>
    )
  }
}
