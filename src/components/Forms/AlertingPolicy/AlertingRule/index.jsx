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
import { computed } from 'mobx'
import { observer } from 'mobx-react'
import PropTypes from 'prop-types'
import { isEmpty, get, set } from 'lodash'

import { MODULE_KIND_MAP } from 'utils/constants'
import TypesStore from 'stores/alerting/types'

import { Form, Alert } from 'components/Base'
import RuleList from './RuleList'
import RuleFrom from './RuleForm'

import styles from './index.scss'

@observer
export default class AlertingRule extends React.Component {
  static childContextTypes = {
    showFormError: PropTypes.func,
    hideFormError: PropTypes.func,
  }

  getChildContext() {
    return {
      showFormError: this.showError,
      hideFormError: this.hideError,
    }
  }

  constructor(props) {
    super(props)

    this.state = {
      showRule: false,
      selectRule: {},
      isValid: true,
      validMessage: '',
    }

    this.typesStore = new TypesStore()
  }

  get prefix() {
    return ''
  }

  get namespace() {
    return get(this.formTemplate, 'metadata.namespace')
  }

  get formTemplate() {
    const { formTemplate, module } = this.props
    return get(formTemplate, MODULE_KIND_MAP[module], formTemplate)
  }

  get resourceType() {
    return get(this.formTemplate, 'resource_filter.resource_type')
  }

  get workloadKind() {
    return get(
      this.formTemplate,
      'resource_filter.rs_filter_param.workload_kind',
      'deployment'
    )
  }

  @computed
  get metricTypes() {
    return this.typesStore.metricTypes
  }

  componentDidMount() {
    this.fetchMetricTypes()
  }

  fetchMetricTypes = () => {
    const { cluster } = this.props
    const rs_type_id = get(this.formTemplate, 'resource_filter.rs_type_id')
    this.typesStore.fetchMetricTypes({ rs_type_id, cluster })
  }

  showRule = data => {
    this.setState({
      showRule: true,
      selectRule: data || {},
    })
  }

  hideRule = () => {
    this.setState({
      showRule: false,
      selectRule: {},
    })
  }

  showError = ({ message = '' }) => {
    this.setState({ isValid: false, validMessage: message })
  }

  hideError = () => {
    this.setState({ isValid: true })
  }

  rulesValidator = (rule, value, callback) => {
    if (isEmpty(value)) {
      this.showError({ message: t('Please add at least one rule') })
      return callback('')
    }

    callback()
  }

  handleRule = data => {
    const rules = get(this.formTemplate, `${this.prefix}rules`, [])
    const newRules = [...rules]

    const isExist = rules.some((rule, index) => {
      if (rule.rule_name === data.rule_name) {
        set(newRules, `[${index}]`, data)
        return true
      }
      return false
    })

    if (!isExist) {
      newRules.push(data)
    }

    set(this.formTemplate, `${this.prefix}rules`, newRules)
    this.hideRule()

    if (!isEmpty(newRules)) {
      this.hideError()
    }
  }

  renderRuleForm(data) {
    const { module } = this.props
    const type = !data.rule_name ? 'Add' : 'Edit'
    const currentRules = get(this.formTemplate, `${this.prefix}rules`, [])

    return (
      <RuleFrom
        type={type}
        resourceType={this.resourceType}
        workloadKind={this.workloadKind}
        metricTypes={this.metricTypes}
        module={module}
        namespace={this.namespace}
        data={data}
        onSave={this.handleRule}
        onCancel={this.hideRule}
        currentRules={currentRules}
      />
    )
  }

  renderRuleList() {
    const { formRef } = this.props

    return (
      <Form data={this.formTemplate} ref={formRef}>
        <Form.Item rules={[{ validator: this.rulesValidator }]}>
          <RuleList
            resourceType={this.resourceType}
            name={`${this.prefix}rules`}
            onShow={this.showRule}
          />
        </Form.Item>
      </Form>
    )
  }

  render() {
    const { showRule, selectRule, isValid, validMessage } = this.state

    if (showRule) {
      return this.renderRuleForm(selectRule)
    }

    return (
      <div>
        {this.renderRuleList()}
        {!isValid && (
          <Alert type="error" className={styles.alert} message={validMessage} />
        )}
      </div>
    )
  }
}
