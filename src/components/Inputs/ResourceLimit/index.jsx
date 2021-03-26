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
import { get, set } from 'lodash'
import isEqual from 'react-fast-compare'

import { Icon, Input, Columns, Column, Alert } from '@kube-design/components'

import { cpuFormat, memoryFormat } from 'utils'

import Slider from './Slider'

import styles from './index.scss'

export default class ResourceLimit extends React.Component {
  static propTypes = {
    value: PropTypes.object,
    defaultValue: PropTypes.object,
    onChange: PropTypes.func,
    onError: PropTypes.func,
  }

  static defaultProps = {
    value: {},
    onChange() {},
    onError() {},
    cpuProps: {},
    memoryProps: {},
  }

  constructor(props) {
    super(props)

    this.state = {
      ...ResourceLimit.getValue(props),
      defaultValue: props.defaultValue,
      cpuError: '',
      memoryError: '',
    }
  }

  static getDerivedStateFromProps(props, state) {
    if (!isEqual(props.defaultValue, state.defaultValue)) {
      return {
        ...ResourceLimit.getValue(props),
        defaultValue: props.defaultValue,
      }
    }

    return null
  }

  static getValue(props) {
    const cpuUnit = props.cpuProps.unit || 'Core'
    const memoryUnit = props.memoryProps.unit || 'Mi'
    return {
      requests: {
        cpu: cpuFormat(
          ResourceLimit.getDefaultRequestValue(props, 'cpu'),
          cpuUnit
        ),
        memory: memoryFormat(
          ResourceLimit.getDefaultRequestValue(props, 'memory'),
          memoryUnit
        ),
      },
      limits: {
        cpu: cpuFormat(
          ResourceLimit.getDefaultLimitValue(props, 'cpu'),
          cpuUnit
        ),
        memory: memoryFormat(
          ResourceLimit.getDefaultLimitValue(props, 'memory'),
          memoryUnit
        ),
      },
    }
  }

  static getDefaultRequestValue(props, key) {
    return get(
      props,
      `value.requests.${key}`,
      get(props, `defaultValue.requests.${key}`)
    )
  }

  static getDefaultLimitValue(props, key) {
    return get(
      props,
      `value.limits.${key}`,
      get(props, `defaultValue.limits.${key}`)
    )
  }

  cpuFormatter = value => {
    if (value > 0 && value < 1) {
      return value.toFixed(2)
    }
    if (value > 1 && value !== Infinity) {
      return value.toFixed(1)
    }
    return value
  }

  memoryFormatter = value => {
    value = Math.round(value)
    if (value > 0 && value < 1000) {
      return value - (value % 10)
    }
    if (value > 1000 && value < 2000) {
      return value - (value % 50)
    }
    if (value > 2000 && value !== Infinity) {
      return value - (value % 100)
    }
    return value
  }

  get cpuUnit() {
    return this.props.cpuProps.unit || 'Core'
  }

  get memoryUnit() {
    return this.props.memoryProps.unit || 'Mi'
  }

  getCPUProps() {
    const { requests, limits } = this.state
    return {
      marks: [
        { value: 0, label: t('No Request'), weight: 2 },
        { value: 0.2, label: 0.2, weight: 2 },
        { value: 0.5, label: 0.5, weight: 2 },
        { value: 1, label: 1, weight: 3 },
        { value: 2, label: 2, weight: 2 },
        { value: 3, label: 3, weight: 2 },
        { value: 4, label: 4 },
        { value: Infinity, label: t('No Limit') },
      ],
      value: [requests.cpu || 0, limits.cpu || Infinity],
      onChange: this.handleCPUChange,
      valueFormatter: this.cpuFormatter,
      ...this.props.cpuProps,
      unit: this.cpuUnit,
    }
  }

  getMemoryProps() {
    const { requests, limits } = this.state
    return {
      marks: [
        { value: 0, label: t('No Request'), weight: 2 },
        { value: 200, label: 200, weight: 2 },
        { value: 500, label: 500, weight: 2 },
        { value: 1000, label: 1000, weight: 2 },
        { value: 2000, label: 2000, weight: 2 },
        { value: 4000, label: 4000, weight: 2 },
        { value: 6000, label: 6000, weight: 1 },
        { value: 8000, label: 8000 },
        { value: Infinity, label: t('No Limit') },
      ],
      value: [requests.memory || 0, limits.memory || Infinity],
      onChange: this.handleMemoryChange,
      valueFormatter: this.memoryFormatter,
      ...this.props.memoryProps,
      unit: this.memoryUnit,
    }
  }

  getLimit(value) {
    return value === Infinity ? t('No Limit') : value || ''
  }

  getRequest(value) {
    return value === 0 ? t('No Request') : value || ''
  }

  checkError = state => {
    let cpuError = ''
    let memoryError = ''
    const { requests, limits } = state

    if (limits.cpu && Number(requests.cpu) > Number(limits.cpu)) {
      cpuError = 'RequestExceed'
    }

    if (limits.memory && Number(requests.memory) > Number(limits.memory)) {
      memoryError = 'RequestExceed'
    }

    return { cpuError, memoryError }
  }

  triggerChange = () => {
    const { onChange, onError } = this.props
    const { requests, limits, cpuError, memoryError } = this.state
    const { unit: memoryUnit } = this.getMemoryProps()
    let { unit: cpuUnit } = this.getCPUProps()

    cpuUnit = cpuUnit === 'Core' ? '' : cpuUnit

    onError(cpuError || memoryError)

    const result = {}
    if (requests.cpu > 0 && requests.cpu < Infinity) {
      set(result, 'requests.cpu', `${requests.cpu}${cpuUnit}`)
    }
    if (requests.memory > 0 && requests.memory < Infinity) {
      set(result, 'requests.memory', `${requests.memory}${memoryUnit}`)
    }
    if (limits.cpu > 0 && limits.cpu < Infinity) {
      set(result, 'limits.cpu', `${limits.cpu}${cpuUnit}`)
    }
    if (limits.memory > 0 && limits.memory < Infinity) {
      set(result, 'limits.memory', `${limits.memory}${memoryUnit}`)
    }

    onChange(result)
  }

  handleCPUChange = value => {
    this.setState(
      ({ requests, limits }) => ({
        requests: { ...requests, cpu: value[0] },
        limits: { ...limits, cpu: value[1] },
      }),
      this.triggerChange
    )
  }

  handleMemoryChange = value => {
    this.setState(
      ({ requests, limits }) => ({
        requests: { ...requests, memory: value[0] },
        limits: { ...limits, memory: value[1] },
      }),
      this.triggerChange
    )
  }

  handleInputChange = (e, value) => {
    const name = e.target.name
    this.setState(state => {
      set(state, name, isNaN(value) ? '' : value)
      return { ...state, ...this.checkError(state) }
    }, this.triggerChange)
  }

  render() {
    const { cpuError, memoryError } = this.state

    return (
      <div className={styles.wrapper}>
        <div className={styles.sliderWrapper}>
          <div>CPU ({this.cpuUnit})</div>
          <Slider {...this.getCPUProps()} />
        </div>
        <div className={styles.sliderWrapper}>
          <div>
            {t('Memory')} ({this.memoryUnit})
          </div>
          <Slider {...this.getMemoryProps()} />
        </div>
        <div className={styles.inputWrapper}>
          <Columns className="is-gapless">
            <Column>
              <div className={styles.inputGroup}>
                <Icon name="cpu" size={48} />
                <div
                  className={classnames(styles.input, {
                    [styles.error]: cpuError,
                  })}
                >
                  <span className={styles.label}>{t('Resource Request')}:</span>
                  <Input
                    name="requests.cpu"
                    value={this.getRequest(this.state.requests.cpu)}
                    onChange={this.handleInputChange}
                    placeholder={t(t('No Request'))}
                  />
                  <span className={styles.unit}>{this.cpuUnit}</span>
                </div>
                <div
                  className={classnames(styles.input, {
                    [styles.error]: cpuError,
                  })}
                >
                  <span className={styles.label}>{t('Resource Limit')}:</span>
                  <Input
                    name="limits.cpu"
                    value={this.getLimit(this.state.limits.cpu)}
                    onChange={this.handleInputChange}
                    placeholder={t(t('No Limit'))}
                  />
                  <span className={styles.unit}>{this.cpuUnit}</span>
                </div>
              </div>
            </Column>
            <Column>
              <div className={styles.inputGroup}>
                <Icon name="memory" size={48} />
                <div
                  className={classnames(styles.input, {
                    [styles.error]: memoryError,
                  })}
                >
                  <span className={styles.label}>{t('Resource Request')}:</span>
                  <Input
                    name="requests.memory"
                    value={this.getRequest(this.state.requests.memory)}
                    onChange={this.handleInputChange}
                    placeholder={t(t('No Request'))}
                  />
                  <span className={styles.unit}>{this.memoryUnit}</span>
                </div>
                <div
                  className={classnames(styles.input, {
                    [styles.error]: memoryError,
                  })}
                >
                  <span className={styles.label}>{t('Resource Limit')}:</span>
                  <Input
                    name="limits.memory"
                    value={this.getLimit(this.state.limits.memory)}
                    onChange={this.handleInputChange}
                    placeholder={t(t('No Limit'))}
                  />
                  <span className={styles.unit}>{this.memoryUnit}</span>
                </div>
              </div>
            </Column>
          </Columns>
        </div>
        {(cpuError || memoryError) && (
          <Alert
            type="error"
            className="margin-t12"
            message={t('REQUEST_EXCCED')}
          />
        )}
      </div>
    )
  }
}
