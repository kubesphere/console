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
import { isObject, get, cloneDeep, isEmpty, endsWith } from 'lodash'

import { Icon, Select } from '@kube-design/components'
import { NumberInput } from 'components/Inputs'

import { RESOURCE_METRICS_CONFIG } from 'configs/alerting/metrics'
import styles from './index.scss'
import { severityOptions } from '../../CustomRule'

const durationOptions = [1, 5, 15, 30, 60].map(num => ({
  label: t.html('LASTING_MINUTES', { minutes: num }),
  value: `${num}m`,
}))

const alertingTypeOptions = severityOptions.map(({ label, value }) => ({
  label,
  value,
}))

class RuleInput extends React.Component {
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
      ...this.getStateFromProps(props),
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

  getMetricType = props => {
    const _value = get(props.value, 'metricThreshold', {})
    if (isEmpty(_value)) {
      return this.metricConfig[0].value
    }

    const metricType = Object.keys(_value)[0]
    return `${metricType}:${Object.keys(_value[metricType])[0]}`
  }

  getStateFromProps = props => {
    const { value } = props
    const _metricValue = get(value, 'metricThreshold', {})

    const metricParamsArr = this.metricConfig[0].value.split(':')
    let nodeResourceType = metricParamsArr[0]
    let monitorType = metricParamsArr[1]

    if (!isEmpty(_metricValue)) {
      const metricType = Object.keys(_metricValue)[0]
      nodeResourceType = metricType
      monitorType = Object.keys(_metricValue[metricType])[0]
    }

    const duration = get(value, 'for', '')
    const severity = get(value, 'severity', '')

    return {
      nodeResourceType,
      monitorType,
      comparator: get(value, 'comparator', ''),
      duration: duration !== '' ? duration : durationOptions[0].value,
      severity: severity !== '' ? severity : alertingTypeOptions[0].value,
    }
  }

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
    const nodeResourceType = type.split(':')[0]
    const monitorType = type.split(':')[1]
    const { comparator, severity, duration } = this.state
    this.setState(
      { metricType: type, nodeResourceType, monitorType, thresholds: '' },
      () => {
        this.props.onChange({
          names: this.props.value.names,
          kind: this.props.value.kind,
          metricThreshold: {
            [nodeResourceType]: {
              [monitorType]: '',
            },
          },
          comparator,
          for: duration,
          severity,
        })
      }
    )
  }

  handleItemChange = (name, converter) => (e, val) => {
    const { onChange } = this.props
    let _value = isObject(val) || !val ? e : val

    if (name === 'thresholds') {
      _value = String(_value).replace(/([a-zA-Z%/])+$/g, '')
      _value =
        _value !== ''
          ? endsWith(_value, '.')
            ? _value
            : converter(Number(_value))
          : ''
    }

    this.setState(
      {
        [name]: _value,
      },
      () => {
        const {
          nodeResourceType,
          monitorType,
          comparator,
          duration,
          severity,
        } = this.state
        const thresholds = get(
          this.props.value,
          `metricThreshold.${nodeResourceType}.${monitorType}`
        )
        onChange({
          names: this.props.value.names,
          kind: this.props.value.kind,
          metricThreshold: {
            [nodeResourceType]: {
              [monitorType]: name === 'comparator' ? thresholds : _value,
            },
          },
          comparator: name === 'comparator' ? _value : comparator,
          for: duration,
          severity,
        })
      }
    )
  }

  handleDurationChange = value => {
    const { severity, nodeResourceType, monitorType, comparator } = this.state
    const thresholds = get(
      this.props.value,
      `metricThreshold.${nodeResourceType}.${monitorType}`
    )
    this.setState({ duration: value }, () => {
      this.props.onChange({
        names: this.props.value.names,
        kind: this.props.value.kind,
        metricThreshold: {
          [nodeResourceType]: {
            [monitorType]: thresholds,
          },
        },
        for: value,
        severity,
        comparator,
      })
    })
  }

  handleSeverityChange = value => {
    const { duration, nodeResourceType, monitorType, comparator } = this.state
    const thresholds = get(
      this.props.value,
      `metricThreshold.${nodeResourceType}.${monitorType}`
    )
    this.setState({ severity: value }, () => {
      this.props.onChange({
        names: this.props.value.names,
        kind: this.props.value.kind,
        metricThreshold: {
          [nodeResourceType]: {
            [monitorType]: thresholds,
          },
        },
        for: duration,
        comparator,
        severity: value,
      })
    })
  }

  renderConfigItem = (config = {}) => {
    const { value } = this.props
    const { nodeResourceType, monitorType } = this.state
    const {
      type,
      name,
      placeholder,
      options = [],
      converter,
      reverser,
      ...rest
    } = config

    let thresholds
    if (reverser) {
      const _thresholds = get(
        value,
        `metricThreshold.${nodeResourceType}.${monitorType}`,
        ''
      )
      thresholds =
        _thresholds !== ''
          ? endsWith(_thresholds, '.')
            ? _thresholds
            : reverser(Number(_thresholds))
          : ''
    }

    // comparator,thresholds
    const baseProps = {
      key: name,
      className: styles[name],
      placeholder: t(placeholder),
      value: name === 'comparator' ? this.state.comparator : thresholds,
      onChange: this.handleItemChange(name, converter),
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
    }
  }

  render() {
    const { metricType, duration, severity } = this.state
    const ruleConfig = this.ruleConfig

    return (
      <div className={styles.inputs}>
        <div className={styles.type}>
          <Select
            options={this.metricOps}
            value={metricType}
            onChange={this.handleMetricTypeChange}
          />
        </div>
        {ruleConfig.map(this.renderConfigItem)}
        <Select
          className={styles.normalSelect}
          value={duration}
          options={durationOptions}
          onChange={this.handleDurationChange}
          placeholder={t('DURATION')}
        />
        <Select
          className={styles.normalSelect}
          value={severity}
          options={alertingTypeOptions}
          onChange={this.handleSeverityChange}
          placeholder={t('SEVERITY')}
          optionRenderer={({ label, value }) => (
            <span
              className={styles[value]}
              style={{ paddingTop: 2, paddingBottom: 2 }}
            >
              {label}
            </span>
          )}
          valueRenderer={({ label, value }) => (
            <span className={styles[value]}>{label}</span>
          )}
        />
      </div>
    )
  }
}

export default RuleInput
