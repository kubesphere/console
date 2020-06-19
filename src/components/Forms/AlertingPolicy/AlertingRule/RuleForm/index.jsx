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
import { observer } from 'mobx-react'
import PropTypes from 'prop-types'
import { isEmpty, get, set, includes } from 'lodash'

import { RESOURCE_METRICS_CONFIG } from 'configs/alerting/metrics'
import { ReactComponent as BackIcon } from 'src/assets/back.svg'

import { Columns, Column, Input } from '@pitrix/lego-ui'
import { Form } from 'components/Base'
import RuleInput from './RuleInput'

import styles from './index.scss'

@observer
export default class RuleForm extends React.Component {
  static propTypes = {
    type: PropTypes.string,
    resourceType: PropTypes.string,
    workloadKind: PropTypes.string,
    metricTypes: PropTypes.object,
    module: PropTypes.string,
    data: PropTypes.object,
    onSave: PropTypes.func,
    onCancel: PropTypes.func,
    currentRules: PropTypes.array,
  }

  static defaultProps = {
    type: 'Add',
    resourceType: '',
    workloadKind: '',
    metricTypes: {},
    module: '',
    data: {},
    onSave() {},
    onCancel() {},
    currentRules: [],
  }

  static contextTypes = {
    registerSubRoute: PropTypes.func,
    resetSubRoute: PropTypes.func,
  }

  static childContextTypes = {
    updateName: PropTypes.func,
  }

  getChildContext() {
    return {
      updateName: this.updateName,
    }
  }

  constructor(props) {
    super(props)

    this.state = {
      errorItems: [],
    }

    this.formRef = React.createRef()
  }

  get resourceMetricsConfig() {
    const { resourceType } = this.props
    return RESOURCE_METRICS_CONFIG[resourceType || 'node'] || {}
  }

  get metricConfig() {
    const { workloadKind, metricTypes } = this.props
    const configs = this.resourceMetricsConfig

    return Object.entries(configs)
      .map(([key, item]) => {
        if (!metricTypes[key]) return null

        if (item.kind && item.kind !== workloadKind) return null

        const result = {
          value: key,
          ...item,
        }

        return result
      })
      .filter(item => item)
  }

  get defaultName() {
    const metricLabel = get(this.metricConfig, `[0].label`) || ''
    return t(metricLabel)
  }

  uniqueNameValidator = blocklist => (rule, value, callback) => {
    if (includes(blocklist, value)) {
      return callback({ message: t('Name exists') })
    }
    return callback()
  }

  getRuleNameRules() {
    const { currentRules, data, type } = this.props
    const requireRule = { required: true, message: t('Please input name') }

    const exitNames = currentRules.map(({ rule_name }) => rule_name)

    const blocklist =
      type === 'Add'
        ? exitNames
        : exitNames.filter(name => name !== data.rule_name)

    return [requireRule, { validator: this.uniqueNameValidator(blocklist) }]
  }

  componentDidMount() {
    this.registerForm()
  }

  registerForm = () => {
    const { registerSubRoute } = this.context
    const { onCancel } = this.props

    registerSubRoute && registerSubRoute(this.handleSubmit, onCancel)
  }

  updateName = name => {
    set(this.props.data, 'rule_name', name)
    this.forceUpdate()
  }

  handleGoBack = () => {
    const { resetSubRoute } = this.context

    resetSubRoute && resetSubRoute()

    this.props.onCancel()
  }

  handleSubmit = callback => {
    const { onSave } = this.props
    const form = this.formRef.current

    form &&
      form.validate(() => {
        const data = form.getData()
        const result = { ...data }

        if (!isEmpty(data._config)) {
          Object.assign(result, data._config)
        }

        // set metric_id
        const metric_id = get(
          this.props.metricTypes,
          `[${result._metricType}].metric_id`
        )
        set(result, 'metric_id', metric_id)

        onSave(result)
        callback && callback()
      })
  }

  ruleValidator = (rule, value, callback) => {
    if (isEmpty(value.thresholds)) {
      this.setState({ errorItems: ['thresholds'] })

      return callback({
        message: t('Please input the threshold'),
      })
    }

    this.setState({ errorItems: [] })
    callback()
  }

  render() {
    const { type, data } = this.props
    const title = t(`${type} Rule`)

    return (
      <div className={styles.wrapper}>
        <div className="h4">
          <a className="custom-icon" onClick={this.handleGoBack}>
            <BackIcon />
          </a>
          {title}
        </div>
        <Form ref={this.formRef} data={data}>
          <Columns>
            <Column>
              <Form.Item
                label={t('Rule Name')}
                desc={t('RULE_NAME_DESC')}
                rules={this.getRuleNameRules()}
              >
                <Input name="rule_name" defaultValue={this.defaultName} />
              </Form.Item>
            </Column>
          </Columns>
          <Columns>
            <Column>
              <Form.Item
                className={styles.rulesForm}
                label={t('Rule')}
                desc={
                  <div
                    className={styles.tips}
                    dangerouslySetInnerHTML={{
                      __html: t('REPEAT_RULE_TIPS'),
                    }}
                  />
                }
                rules={[{ validator: this.ruleValidator }]}
              >
                <RuleInput
                  name="_config"
                  metricConfig={this.metricConfig}
                  errorItems={this.state.errorItems}
                  defaultValue={{}}
                />
              </Form.Item>
            </Column>
          </Columns>
        </Form>
      </div>
    )
  }
}
