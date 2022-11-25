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
import {
  get,
  set,
  isEqual,
  isFinite,
  isEmpty,
  isNaN,
  isUndefined,
} from 'lodash'

import {
  Icon,
  Input,
  Columns,
  Column,
  Alert,
  Select,
} from '@kube-design/components'

import { cpuFormat, memoryFormat } from 'utils'

import styles from './index.scss'

export default class ResourceLimit extends React.Component {
  static propTypes = {
    value: PropTypes.object,
    defaultValue: PropTypes.object,
    onChange: PropTypes.func,
    onError: PropTypes.func,
    supportGpuSelect: PropTypes.bool,
  }

  static defaultProps = {
    value: {},
    onChange() {},
    onError() {},
    cpuProps: {},
    memoryProps: {},
    supportGpuSelect: false,
  }

  constructor(props) {
    super(props)

    this.state = {
      ...ResourceLimit.getValue(props),
      defaultValue: props.defaultValue,
      cpuError: '',
      memoryError: '',
      workspaceLimitCheck: {},
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.isEdit &&
      !this.props.isEdit &&
      isEqual(prevProps.defaultValue, prevState.defaultValue)
    ) {
      this.setState({
        ...ResourceLimit.getValue(this.props),
        defaultValue: this.props.defaultProps,
      })
    }
  }

  static getDerivedStateFromProps(props, state) {
    if (
      !isEqual(props.defaultValue, state.defaultValue) ||
      !isEqual(props.workspaceLimitProps, state.workspaceLimitProps)
    ) {
      return {
        ...ResourceLimit.getValue(props),
        defaultValue: props.defaultValue,
        workspaceLimitProps: props.workspaceLimitProps,
      }
    }

    return null
  }

  static allowInputDot(formatNum, unit, formatFn, isMemory = false) {
    if (formatNum === Infinity) {
      return formatNum
    }

    const inputNum = formatNum && isMemory ? formatNum.slice(0, -2) : formatNum

    if (inputNum && String(inputNum).endsWith('.')) {
      const number = formatFn(formatNum, unit)
      return `${number}.`
    }

    if (inputNum && String(inputNum).endsWith('.0')) {
      const number = formatFn(formatNum, unit)
      return `${number}.0`
    }

    return formatFn(formatNum, unit)
  }

  static getValue(props) {
    const cpuUnit = get(props, 'cpuProps.unit', 'Core')
    const memoryUnit = get(props, 'memoryProps.unit', 'Mi')

    const requestCpu = ResourceLimit.getDefaultRequestValue(props, 'cpu')
    const requestMeo = ResourceLimit.getDefaultRequestValue(props, 'memory')
    const limitCpu = ResourceLimit.getDefaultLimitValue(props, 'cpu')
    const limitMeo = ResourceLimit.getDefaultLimitValue(props, 'memory')

    const cpuRequests = ResourceLimit.allowInputDot(
      requestCpu,
      cpuUnit,
      cpuFormat
    )

    const memoryRequests = ResourceLimit.allowInputDot(
      requestMeo,
      memoryUnit,
      memoryFormat,
      true
    )

    const cpuLimits = ResourceLimit.allowInputDot(limitCpu, cpuUnit, cpuFormat)

    const memoryLimits = ResourceLimit.allowInputDot(
      limitMeo,
      memoryUnit,
      memoryFormat,
      true
    )

    const workspaceReqMeo = memoryFormat(
      `${ResourceLimit.getWorkspaceRequestLimit(props, 'memory')}Mi`,
      memoryUnit
    )

    const workspaceMeoLimit = memoryFormat(
      `${ResourceLimit.getWorkspaceLimitValue(props, 'memory')}Mi`,
      memoryUnit
    )

    const workspaceCpuRequests = cpuFormat(
      ResourceLimit.getWorkspaceRequestLimit(props, 'cpu'),
      cpuUnit
    )

    const workspaceCpuLimits = cpuFormat(
      ResourceLimit.getWorkspaceLimitValue(props, 'cpu'),
      cpuUnit
    )

    return {
      requests: {
        cpu: cpuRequests,
        memory: memoryRequests,
      },
      limits: {
        cpu: cpuLimits,
        memory: memoryLimits,
      },
      workspaceRequests: {
        cpu: isNaN(workspaceCpuRequests) ? 'Not Limited' : workspaceCpuRequests,
        memory: isNaN(workspaceReqMeo) ? 'Not Limited' : workspaceReqMeo,
      },
      workspaceLimits: {
        cpu: isNaN(workspaceCpuLimits) ? 'Not Limited' : workspaceCpuLimits,
        memory: isNaN(workspaceMeoLimit) ? 'Not Limited' : workspaceMeoLimit,
      },
      gpu: ResourceLimit.gpuSetting(props),
    }
  }

  static getGpuFromProps(value) {
    // get gpu config from requests field
    const supportGpuType = globals.config.supportGpuType
    if (!value) {
      return {
        type: supportGpuType[0],
        value: '',
      }
    }
    // The value may not have requests field
    const types = Object.keys(get(value, 'requests', {})).filter(key =>
      supportGpuType.some(item => key.endsWith(item))
    )
    const type = !isEmpty(types) ? types[0] : supportGpuType[0]
    return {
      type,
      value: !isEmpty(types) ? value.requests[`${type}`] : '',
    }
  }

  static gpuSetting(props) {
    const value = get(props, 'value', {})
    const defaultValue = get(props, 'defaultValue', {})
    if (!isEmpty(value)) {
      return ResourceLimit.getGpuFromProps(value)
    }
    if (!isEmpty(defaultValue)) {
      return ResourceLimit.getGpuFromProps(defaultValue)
    }
    return ResourceLimit.getGpuFromProps()
  }

  static getDefaultRequestValue(props, key) {
    const value = get(
      props,
      `value.requests.${key}`,
      get(props, `defaultValue.requests.${key}`) ?? ''
    )
    return value
  }

  static getDefaultLimitValue(props, key) {
    return get(
      props,
      `value.limits.${key}`,
      get(props, `defaultValue.limits.${key}`) ?? Infinity
    )
  }

  static getWorkspaceRequestLimit(props, key) {
    return get(props, `workspaceLimitProps.requests.${key}`, 'Not Limited')
  }

  static getWorkspaceLimitValue(props, key) {
    return get(props, `workspaceLimitProps.limits.${key}`, 'Not Limited')
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

  get gpuOption() {
    return globals.config.supportGpuType.reduce(
      (prev, value) => [
        ...prev,
        {
          value,
          label: t(value.replace(/[-/.]/g, '_').toUpperCase()),
        },
      ],
      []
    )
  }

  get gpuType() {
    return this.state.gpu.type
  }

  getLimit(value) {
    return isFinite(Number(value)) ? value : ''
  }

  getRequest(value) {
    return value === null || value === undefined ? '' : value
  }

  checkError = state => {
    let cpuError = ''
    let memoryError = ''
    const { requests, limits } = state

    if (
      limits.cpu &&
      !String(limits.cpu).endsWith('.') &&
      Number(requests.cpu) > Number(limits.cpu)
    ) {
      cpuError = 'RequestExceed'
    }

    if (
      limits.memory &&
      !String(limits.memory).endsWith('.') &&
      Number(requests.memory) > Number(limits.memory)
    ) {
      memoryError = 'RequestExceed'
    }

    return { cpuError, memoryError }
  }

  checkAndTrigger = () => {
    const {
      requests,
      limits,
      gpu,
      workspaceLimits: wsL,
      workspaceRequests: wsR,
    } = this.state

    this.setState(
      {
        workspaceLimitCheck: {
          requestCpuError: this.checkNumOutLimit(requests.cpu, wsR.cpu),
          requestMemoryError: this.checkNumOutLimit(
            requests.memory,
            wsR.memory
          ),
          limitCpuError: this.checkNumOutLimit(limits.cpu, wsL.cpu),
          limitMemoryError: this.checkNumOutLimit(limits.memory, wsL.memory),
          gpuLimitError: this.checkGpuOutOfLimit(gpu),
        },
      },
      this.triggerChange
    )
  }

  checkGpuOutOfLimit = gpu => {
    const { type } = gpu
    const limitsArr = get(this.props, `workspaceLimitProps.gpuLimit`, [])
    const limitRes = limitsArr.filter(item =>
      Object.keys(item)[0].endsWith(type)
    )
    const limit =
      limitRes.length > 0 ? Object.values(limitRes[0])[0] : 'Not Limited'
    return this.checkNumOutLimit(gpu.value, limit)
  }

  checkNumOutLimit = (num, limit) => {
    if (limit !== 'Not Limited') {
      return isFinite(Number(num)) && Number(num) > limit
        ? 'workspaceRequestExceed'
        : ''
    }
    return ''
  }

  triggerChange = () => {
    const { onChange, onError } = this.props
    const {
      requests,
      limits,
      cpuError,
      memoryError,
      workspaceLimitCheck: wsL,
      gpu,
    } = this.state
    const memoryUnit = this.memoryUnit
    const cpuUnit = this.cpuUnit === 'Core' ? '' : this.cpuUnit

    const errorList = this.getWorkspaceCheckError()
    errorList.length > 0
      ? onError(cpuError || memoryError || wsL[errorList[0]])
      : onError(cpuError || memoryError)

    const result = {}

    if (requests.cpu !== '' && requests.cpu >= 0 && requests.cpu < Infinity) {
      set(result, 'requests.cpu', `${requests.cpu}${cpuUnit}`)
    }

    if (
      requests.memory !== '' &&
      requests.memory >= 0 &&
      requests.memory < Infinity
    ) {
      set(result, 'requests.memory', `${requests.memory}${memoryUnit}`)
    }

    if (limits.cpu !== '' && limits.cpu >= 0 && limits.cpu < Infinity) {
      set(result, 'limits.cpu', `${limits.cpu}${cpuUnit}`)
    }
    if (
      limits.memory !== '' &&
      limits.memory >= 0 &&
      limits.memory < Infinity
    ) {
      set(result, 'limits.memory', `${limits.memory}${memoryUnit}`)
    }

    // pass gpu input config into limits and requests field
    if (!!gpu.type && !!gpu.value) {
      set(result, 'limits', { ...result.limits, [`${gpu.type}`]: gpu.value })
      set(result, 'requests', {
        ...result.requests,
        [`${gpu.type}`]: gpu.value,
      })
    }

    onChange(result)
  }

  getWorkspaceCheckError = () => {
    return Object.keys(this.state.workspaceLimitCheck).filter(
      key => this.state.workspaceLimitCheck[key] !== ''
    )
  }

  handleCPUChange = value => {
    this.setState(
      ({ requests, limits }) => ({
        requests: { ...requests, cpu: value[0] === 0 ? '' : value[0] },
        limits: { ...limits, cpu: value[1] === 0 ? '' : value[1] },
      }),
      this.checkAndTrigger
    )
  }

  handleMemoryChange = value => {
    this.setState(
      ({ requests, limits }) => ({
        requests: { ...requests, memory: value[0] === 0 ? '' : value[0] },
        limits: { ...limits, memory: value[1] === 0 ? '' : value[1] },
      }),
      this.checkAndTrigger
    )
  }

  handleInputChange = (e, value) => {
    let inputNum
    const name = e.target.name

    if (value === '' || value === undefined) {
      inputNum = ''
    } else {
      const number = /^(([1-9]{1}\d*)|(0{1}))(\.\d{0,2})?$/.exec(value)
      inputNum = number == null ? get(this.state, name, null) : number[0]
    }

    this.setState(state => {
      set(state, name, isNaN(inputNum) ? '' : inputNum)
      return { ...state, ...this.checkError(state) }
    }, this.checkAndTrigger)
  }

  handleGpuInputChange = (e, value) => {
    let inputNum
    if (value === '') {
      inputNum = ''
    } else {
      const number = /^(0|[1-9][0-9]*)$/.exec(value)
      inputNum = number == null ? get(this.state, 'gpu.value', '') : number[0]
    }
    this.setState(
      {
        gpu: {
          type: this.state.gpu.type,
          value: inputNum,
        },
      },
      this.checkAndTrigger
    )
  }

  gpuSelectChange = type => {
    this.setState(
      {
        gpu: {
          type,
          value: this.state.gpu.value,
        },
      },
      this.checkAndTrigger
    )
  }

  renderLimitTip = (value, unit) => {
    return value !== 'Not Limited' ? `${value} ${unit}` : t('NO_LIMIT')
  }

  renderGpuTip = () => {
    const { workspaceLimitProps: pWL } = this.props
    const { gpu } = this.state
    const findResult = pWL?.gpuLimit.filter(item => {
      return isEmpty(item) ? item : Object.keys(item)[0].endsWith(gpu.type)
    })[0]

    return (
      <div className={styles.message}>
        <span>{t('GPU_TYPE')}:</span>
        <span>{isUndefined(findResult) ? t('NO_LIMIT') : gpu.type}</span>
        <br />
        <span>{t('GPU_LIMIT')}:</span>
        <span>
          {isUndefined(findResult)
            ? t('NO_LIMIT')
            : Object.values(findResult)[0]}
        </span>
      </div>
    )
  }

  renderQuotasTip() {
    const { workspaceLimitProps: pWL, supportGpuSelect } = this.props
    const { workspaceLimits: wsL, workspaceRequests: wsR } = this.state
    const memoryUnit = this.memoryUnit
    const cpuUnit = this.cpuUnit

    const title = t('AVAILABLE_QUOTAS')

    const message = () => (
      <>
        <div>
          <div className={styles.message}>
            <span>{t('RESOURCE_REQUESTS')}:</span>
            <span>
              CPU&nbsp;
              {this.renderLimitTip(wsR.cpu, cpuUnit)},&nbsp;
              {t('MEMORY')}&nbsp;
              {this.renderLimitTip(wsR.memory, memoryUnit)}
            </span>
          </div>
          <div className={styles.message}>
            <span>{t('RESOURCE_LIMITS')}:</span>
            <span>
              CPU&nbsp;
              {this.renderLimitTip(wsL.cpu, cpuUnit)},&nbsp;
              {t('MEMORY')}&nbsp;
              {this.renderLimitTip(wsL.memory, memoryUnit)}
            </span>
          </div>
          {supportGpuSelect && pWL.gpuLimit && this.renderGpuTip()}
        </div>
      </>
    )

    return (
      <Alert
        title={title}
        type="info"
        className="margin-t12"
        message={message()}
      />
    )
  }

  get ifRenderTip() {
    const { workspaceLimitProps } = this.props
    return !isEmpty(workspaceLimitProps)
  }

  renderGpuSelect = () => {
    return (
      <Column>
        <div className={styles.inputGroup}>
          <img src="/assets/GPU.svg" size={48} />
          <div className={classnames(styles.input)}>
            <div className={styles.label}>
              <span>{t('GPU_TYPE')}</span>
            </div>
            <div className={styles.inputBox}>
              <Select
                options={this.gpuOption}
                value={this.state.gpu.type}
                onChange={this.gpuSelectChange}
                placeholder=" "
              ></Select>
            </div>
          </div>
          <div className={classnames(styles.input)}>
            <div className={styles.label}>
              <span>{t('GPU_LIMIT')}</span>
            </div>
            <div className={styles.inputBox}>
              <Input
                name="gpu.value"
                value={this.state.gpu.value}
                onChange={this.handleGpuInputChange}
                placeholder={t('NO_LIMIT')}
              />
            </div>
          </div>
        </div>
      </Column>
    )
  }

  render() {
    const { cpuError, memoryError, workspaceLimitCheck: limit } = this.state
    const { supportGpuSelect } = this.props
    const outWorkSpaceLimit = this.getWorkspaceCheckError()

    return (
      <div className={styles.wrapper}>
        <div className={styles.inputWrapper}>
          <Columns className="is-gapless">
            <Column>
              <div className={styles.inputGroup}>
                <Icon name="cpu" size={48} />
                <div
                  className={classnames(styles.input, {
                    [styles.error]: cpuError || limit.requestCpuError,
                  })}
                >
                  <span className={styles.label}>{t('CPU_REQUEST')}</span>
                  <div className={styles.inputBox}>
                    <Input
                      name="requests.cpu"
                      value={this.getRequest(this.state.requests.cpu)}
                      onChange={this.handleInputChange}
                      placeholder={t('NO_REQUEST')}
                    />
                    <span className={styles.unit}>{this.cpuUnit}</span>
                  </div>
                </div>
                <div
                  className={classnames(styles.input, {
                    [styles.error]: cpuError || limit.limitCpuError,
                  })}
                >
                  <span className={styles.label}>{t('CPU_LIMIT')}</span>
                  <div className={styles.inputBox}>
                    <Input
                      name="limits.cpu"
                      value={this.getLimit(this.state.limits.cpu)}
                      onChange={this.handleInputChange}
                      placeholder={t('NO_LIMIT')}
                    />
                    <span className={styles.unit}>{this.cpuUnit}</span>
                  </div>
                </div>
              </div>
            </Column>
            <Column>
              <div className={styles.inputGroup}>
                <Icon name="memory" size={48} />
                <div
                  className={classnames(styles.input, {
                    [styles.error]: memoryError || limit.requestMemoryError,
                  })}
                >
                  <span className={styles.label}>{t('MEMORY_REQUEST')}</span>
                  <div className={styles.inputBox}>
                    <Input
                      name="requests.memory"
                      value={this.getRequest(this.state.requests.memory)}
                      onChange={this.handleInputChange}
                      placeholder={t('NO_REQUEST')}
                    />
                    <span className={styles.unit}>{this.memoryUnit}</span>
                  </div>
                </div>
                <div
                  className={classnames(styles.input, {
                    [styles.error]: memoryError || limit.limitMemoryError,
                  })}
                >
                  <span className={styles.label}>{t('MEMORY_LIMIT')}</span>
                  <div className={styles.inputBox}>
                    <Input
                      name="limits.memory"
                      value={this.getLimit(this.state.limits.memory)}
                      onChange={this.handleInputChange}
                      placeholder={t('NO_LIMIT')}
                    />
                    <span className={styles.unit}>{this.memoryUnit}</span>
                  </div>
                </div>
              </div>
            </Column>
            {supportGpuSelect && this.renderGpuSelect()}
          </Columns>
        </div>
        {this.ifRenderTip && this.renderQuotasTip()}
        {(cpuError || memoryError) && (
          <Alert
            type="error"
            className="margin-t12"
            message={t('REQUEST_EXCEED_LIMIT')}
          />
        )}
        {outWorkSpaceLimit.length > 0 && (
          <Alert
            type="error"
            className="margin-t12"
            message={t('REQUEST_EXCEED_AVAILABLE_QUOTA')}
          />
        )}
      </div>
    )
  }
}
