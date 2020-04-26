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
import { isEmpty, get, set } from 'lodash'

import { STRATEGIES, STRATEGIES_PREFIX } from 'utils/constants'

import { Input, Columns, Column, Alert } from '@pitrix/lego-ui'
import { Form, TypeSelect } from 'components/Base'
import { NumberInput } from 'components/Inputs'

import styles from './index.scss'

const getStrategy = (props = {}) =>
  get(props.data, `${STRATEGIES_PREFIX[props.module]}.type`)

@observer
export default class UpdateStrategyForm extends React.Component {
  static propTypes = {
    ownRef: PropTypes.object,
    formRef: PropTypes.object,
    module: PropTypes.string,
    data: PropTypes.object,
    replicas: PropTypes.number,
    onChange: PropTypes.func,
  }

  static defaultProps = {
    formRef: {},
    module: '',
    data: {},
    replicas: 1,
    onChange() {},
  }

  constructor(props) {
    super(props)

    this.state = {
      strategy: getStrategy(props) || 'RollingUpdate',
    }

    this.strategyFormRef = props.ownRef || React.createRef()

    this.init(props)
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.data !== this.props.data ||
      prevProps.replicas !== this.props.replicas
    ) {
      this.init(this.props)
      this.setState({
        strategy: getStrategy(this.props),
      })
    }
  }

  componentDidMount() {
    this.setStrategyValidator()
  }

  get isRollingUpdate() {
    return this.state.strategy === 'RollingUpdate'
  }

  get rollingUpdatePrefix() {
    return `${STRATEGIES_PREFIX[this.props.module]}.rollingUpdate`
  }

  get maxUnavailable() {
    return get(this.props.data, `${this.rollingUpdatePrefix}.maxUnavailable`)
  }

  get maxSurge() {
    return get(this.props.data, `${this.rollingUpdatePrefix}.maxSurge`)
  }

  get strategyOptions() {
    const { module } = this.props
    const ops = STRATEGIES[module]
    return ops.map(({ label, value, description }) => ({
      label: t(label),
      description: t(description),
      icon: 'update',
      value,
    }))
  }

  getPodValue = (name, replicas, value = '25%') => {
    const total = replicas || 1
    const rate = parseFloat(value) / 100
    let val = 1

    if (name === 'minAvailablePod') {
      val = total - total * rate
    }
    if (name === 'maxSurgePod') {
      val = total * (1 + rate)
    }

    return Math.ceil(val)
  }

  getPercentageValue = (name, replicas, value) => {
    if (value <= 0) return '25%'

    const total = replicas || 1
    let val = 0

    if (name === 'maxUnavailable') {
      val = total - value
    }
    if (name === 'maxSurge') {
      val = value - total

      if (val > total) return '100%'
    }

    return val <= 0 ? '0%' : `${Math.ceil((val / total) * 100)}%`
  }

  init(props = this.props) {
    const { data, replicas, module } = props
    const strategy = getStrategy(props)

    if (module !== 'deployments') {
      return
    }

    let minAvailablePod = ''
    let maxSurgePod = ''

    if (strategy === 'RollingUpdate') {
      minAvailablePod = String(
        this.getPodValue(
          'minAvailablePod',
          replicas,
          get(data, `${this.rollingUpdatePrefix}.maxUnavailable`)
        )
      )
      maxSurgePod = String(
        this.getPodValue(
          'maxSurgePod',
          replicas,
          get(data, `${this.rollingUpdatePrefix}.maxSurge`)
        )
      )
    } else {
      set(data, this.rollingUpdatePrefix, null)
    }

    set(
      data,
      'metadata.annotations["kubesphere.io/minAvailablePod"]',
      minAvailablePod
    )
    set(data, 'metadata.annotations["kubesphere.io/maxSurgePod"]', maxSurgePod)
  }

  setStrategyValidator = () => {
    const { formRef } = this.props

    if (formRef && formRef.current && !formRef.current.customValidator) {
      formRef.current.setCustomValidator(this.validator)
    }
  }

  validator = callback => {
    this.strategyFormRef.current.validate(callback)
  }

  strategyValidator = (rule, value, callback) => {
    const { data } = this.props

    // make sure the values in the annotations are all strings
    const annotations = get(data, 'metadata.annotations')
    if (!isEmpty(annotations)) {
      const result = {}
      Object.entries(annotations).forEach(([_key, _value]) => {
        result[_key] = String(_value)
      })
      set(data, 'metadata.annotations', result)
    }

    callback()
  }

  minAvailablePodValidator = (rule, value, callback) => {
    const { replicas } = this.props

    if (value < 1) {
      return callback({ message: t('MIN_AVAILABLE_POD_VALIDATOR_MIN') })
    }

    if (value > replicas) {
      return callback({ message: t('MIN_AVAILABLE_POD_VALIDATOR_MAX') })
    }
    callback()
  }

  maxSurgePodValidator = (rule, value, callback) => {
    const { replicas } = this.props

    if (value < replicas) {
      return callback({ message: t('MAX_SURGE_POD_VALIDATOR_MIN') })
    }

    if (value > replicas * 2) {
      return callback({ message: t('MAX_SURGE_POD_VALIDATOR_MAX') })
    }
    callback()
  }

  handleStrategyChange = value => {
    this.setState(
      {
        strategy: value,
      },
      () => {
        this.init()
      }
    )
  }

  handleInputChange = name => value => {
    const { data, replicas } = this.props
    const val = this.getPercentageValue(name, replicas, value)

    set(data, `${this.rollingUpdatePrefix}[${name}]`, val)
  }

  renderAlert() {
    const { strategy = '' } = this.state
    const type = this.isRollingUpdate ? 'info' : 'warning'

    return (
      <Columns>
        <Column>
          <Alert
            type={type}
            description={t(`${strategy.toUpperCase()}_ALERT_TIP`)}
          />
        </Column>
      </Columns>
    )
  }

  renderRollingUpdateParams() {
    if (this.props.module === 'statefulsets') {
      return (
        <Columns className={styles.wrapper}>
          <Column>
            <Form.Item
              label={t('Partition')}
              desc={t('STATEFULSET_PARTITION_DESC')}
              rules={[{ required: true, message: t('Please input value') }]}
            >
              <NumberInput
                name={`${this.rollingUpdatePrefix}.partition`}
                placeholder={t('STATEFULSET_PARTITION_PLACEHOLDER')}
                min={0}
                integer
              />
            </Form.Item>
          </Column>
        </Columns>
      )
    } else if (this.props.module === 'daemonsets') {
      return (
        <Columns className={styles.wrapper}>
          <Column>
            <Form.Item
              label={t('MaxUnavailable (%)')}
              desc={t('MAX_UNAVAILABLE_DESC')}
              rules={[{ required: true, message: t('Please input value') }]}
            >
              <NumberInput
                name={`${this.rollingUpdatePrefix}.maxUnavailable`}
                unit="%"
                min={1}
                max={100}
                integer
              />
            </Form.Item>
          </Column>
          <Column>
            <Form.Item
              label={t('MinReadySeconds')}
              desc={t('MIN_READY_SECONDS_DESC')}
              rules={[{ required: true, message: t('Please input value') }]}
            >
              <Input name="spec.minReadySeconds" />
            </Form.Item>
          </Column>
        </Columns>
      )
    }

    return (
      <Columns className={styles.wrapper}>
        <Column>
          <Form.Item
            label={t('MIN_AVAILABLE_POD_LABEL')}
            desc={t('MIN_AVAILABLE_POD_DESC')}
            rules={[{ validator: this.minAvailablePodValidator }]}
          >
            <NumberInput
              name="metadata.annotations['kubesphere.io/minAvailablePod']"
              min={1}
              onChange={this.handleInputChange('maxUnavailable')}
              integer
            />
          </Form.Item>
        </Column>
        <Column>
          <Form.Item
            label={t('MAX_SURGE_POD_LABEL')}
            desc={t('MAX_SURGE_POD_DESC')}
            rules={[{ validator: this.maxSurgePodValidator }]}
          >
            <NumberInput
              name="metadata.annotations['kubesphere.io/maxSurgePod']"
              onChange={this.handleInputChange('maxSurge')}
              integer
            />
          </Form.Item>
        </Column>
      </Columns>
    )
  }

  render() {
    const { className, module, data, formProps = {} } = this.props

    // const label = (
    //   <span>
    //     <span className="align-middle">{t('POD_SETTING_TIP')}</span>
    //     {module === 'deployments' && (
    //       <Tooltip content={t('ROLLING_UPDATE_POD_TIP')}>
    //         <Icon name="information" />
    //       </Tooltip>
    //     )}
    //   </span>
    // )

    return (
      <Form
        className={className}
        type="inner"
        data={data}
        ref={this.strategyFormRef}
        {...formProps}
      >
        <Form.Item
          label={t('Update Strategy')}
          rules={[{ validator: this.strategyValidator }]}
        >
          <TypeSelect
            name={`${STRATEGIES_PREFIX[module]}.type`}
            onChange={this.handleStrategyChange}
            defaultValue="RollingUpdate"
            options={this.strategyOptions}
          />
        </Form.Item>
        {/* <Form.Group label={label} checkable keepDataWhenUnCheck>
          {this.isRollingUpdate && this.renderRollingUpdateParams()}
        </Form.Group> */}
      </Form>
    )
  }
}
