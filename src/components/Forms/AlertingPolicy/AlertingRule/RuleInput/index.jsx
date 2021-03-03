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
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { isUndefined, isNaN, isObject, get, set, cloneDeep } from 'lodash'

import { cacheFunc } from 'utils'

import { Icon, Input, Select, Slider } from '@kube-design/components'
import { NumberInput } from 'components/Inputs'

import { RESOURCE_METRICS_CONFIG } from 'configs/alerting/metrics'

import styles from './index.scss'

export default class RuleInput extends React.Component {
  static propTypes = {
    metricConfig: PropTypes.array,
    value: PropTypes.object,
    onChange: PropTypes.func,
  }

  static defaultProps = {
    metricConfig: [],
    value: {},
    onChange() {},
  }

  constructor(props) {
    super(props)

    this.state = {
      metricType: this.getMetricType(props),
    }

    this.metricOps = this.getSelectOptions(this.metricConfig)
  }

  get resourceMetricsConfig() {
    const { resourceType } = this.props
    return cloneDeep(RESOURCE_METRICS_CONFIG[resourceType || 'node']) || {}
  }

  get metricConfig() {
    const configs = this.resourceMetricsConfig
    return Object.entries(configs).map(([key, item]) => ({
      value: key,
      ...item,
    }))
  }

  get selectMetricConfig() {
    const { metricType } = this.state
    return this.metricConfig.find(metric => metric.value === metricType)
  }

  get ruleConfig() {
    return get(this.selectMetricConfig, 'ruleConfig') || []
  }

  getMetricType = props =>
    get(props, 'value._metricType', get(this.metricConfig[0], 'value'))

  getSelectOptions = (config = []) =>
    config.map(({ prefixIcon, color, type, label, value, disabled }) => {
      const option = {
        label: t(label, { value }),
        value,
      }

      if (prefixIcon) {
        option.label = (
          <div className={classnames(styles.optionLabel, styles[type])}>
            <Icon name={prefixIcon} size={20} color={color} />
            {option.label}
          </div>
        )
      }

      if (disabled) {
        option.disabled = disabled
      }

      return option
    })

  handleMetricTypeChange = type => {
    this.setState({ metricType: type }, () => {
      this.props.onChange({ _metricType: type })
    })
  }

  handleItemChange = name =>
    cacheFunc(
      name,
      (e, val) => {
        const { value, onChange } = this.props
        const { metricType } = this.state
        let _value = isObject(val) || !val ? e : val

        // Special handling of thresholds
        if (name === 'thresholds') {
          const unit = get(String(_value).match(/\D+$/g), '[0]') || ''
          set(value, 'unit', unit)

          _value = String(_value).replace(/([a-zA-Z%/])+$/g, '')
        }

        set(value, name, _value)
        onChange({ ...value, _metricType: metricType })
      },
      this
    )

  renderConfigItem = (config = {}) => {
    const { value } = this.props
    const {
      type,
      name,
      placeholder,
      value: _value,
      options = [],
      converter,
      ...rest
    } = config

    if (isUndefined(value[name]) || isNaN(value[name])) {
      const val = get(options[0], 'value', _value || '')
      set(value, name, val)
    }

    const baseProps = {
      key: name,
      className: styles[name],
      name,
      placeholder: t(placeholder),
      value: value[name],
      onChange: this.handleItemChange(name),
    }

    switch (type) {
      default:
      case 'select': {
        const ops = this.getSelectOptions(options)

        return <Select options={ops} {...baseProps} {...rest} />
      }
      case 'number': {
        return <NumberInput showUnit {...baseProps} {...rest} />
      }
      case 'text': {
        return <Input type={type} {...baseProps} {...rest} />
      }
      case 'slider':
        return <Slider {...baseProps} {...rest} className={styles.slider} />
    }
  }

  render() {
    const { metricType } = this.state
    const ruleConfig = this.ruleConfig

    return (
      <div className={styles.inputs}>
        <Select
          className={styles.type}
          name="_metricType"
          options={this.metricOps}
          value={metricType}
          onChange={this.handleMetricTypeChange}
        />
        {ruleConfig.map(this.renderConfigItem)}
      </div>
    )
  }
}
