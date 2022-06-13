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

import { get, has, isEmpty, set, debounce } from 'lodash'
import React from 'react'
import PropTypes from 'prop-types'

import { getDisplayName } from 'utils'
import { PATTERN_ENV_NAME } from 'utils/constants'
import classNames from 'classnames'
import { Input, Select, Icon } from '@kube-design/components'
import styles from './index.scss'

import ObjectInput from '../ObjectInput'

export default class EnvironmentInputItem extends React.Component {
  state = {
    keyError: false,
    envType: 'customization',
  }

  static propTypes = {
    value: PropTypes.object,
    onChange: PropTypes.func,
    configMaps: PropTypes.array,
    secrets: PropTypes.array,
  }

  static defaultProps = {
    name: '',
    value: {},
    onChange() {},
    configMaps: [],
    secrets: [],
  }

  get envType() {
    const { envType } = this.state
    const { value } = this.props
    const propsEnvType = value.valueFrom && Object.keys(value.valueFrom)[0]
    return !propsEnvType ? envType : propsEnvType
  }

  get resourceOptions() {
    return [
      {
        label: t('CUSTOM'),
        value: 'customization',
      },
      {
        label: t('FROM_CONFIGMAP'),
        value: 'configMapKeyRef',
      },
      {
        label: t('FROM_SECRET'),
        value: 'secretKeyRef',
      },
    ]
  }

  componentDidMount() {
    this.updateCheckStatus()
  }

  parseValue(data) {
    const resourceType = has(data, 'configMapKeyRef')
      ? 'configMapKeyRef'
      : 'secretKeyRef'
    const resourceName = get(data, `${resourceType}.name`, '')
    const resourceKey = get(data, `${resourceType}.key`, '')
    return { resourceType, resourceName, resourceKey }
  }

  handleResourceValueForm = name => {
    const { configMaps, secrets } = this.props

    const valueFrom = {}
    let data

    if (this.envType === 'configMapKeyRef') {
      data = configMaps.find(item => item.name === name)
    } else if (this.envType === 'secretKeyRef') {
      data = secrets.find(item => item.name === name)
    }

    valueFrom[this.envType] = {
      name: data ? data.name : '',
      key: '',
    }

    return { valueFrom, resourceType: this.envType }
  }

  handleChange = value => {
    const { onChange } = this.props

    const newValue = { name: '', valueFrom: {} }

    if (value.resource) {
      const { valueFrom, resourceType } = this.handleResourceValueForm(
        value.resource
      )

      newValue.valueFrom = { ...valueFrom }

      if (value.resourceKey) {
        newValue.valueFrom[resourceType].key = value.resourceKey
      }
    }

    newValue.name = value.name
    onChange(newValue)
  }

  handleKeyData = data => {
    const newValue = { ...this.props.value }
    const key = Object.keys(newValue.valueFrom)

    if (key) {
      set(newValue, `valueFrom.${key}.key`, data)
    }

    if (!newValue.name) {
      newValue.name = data
    }

    this.validEnvKey(newValue.name, newValue)
    this.props.onChange(newValue)
  }

  get getConfigOrSecretOptions() {
    const { configMaps, secrets } = this.props
    return this.envType === 'configMapKeyRef'
      ? configMaps.map(config => ({
          label: getDisplayName(config),
          value: config.name,
        }))
      : secrets.map(secret => ({
          label: getDisplayName(secret),
          value: secret.name,
        }))
  }

  updateCheckStatus = () => {
    const { repeatKeyArr = [], index } = this.props
    if (repeatKeyArr.length > 0) {
      const myError = repeatKeyArr.includes(`${index}`)
      if (myError) {
        this.setState(
          {
            keyError: myError,
          },
          () => {
            const message = t('DUPLICATE_KEYS')
            this.handleError({ message })
          }
        )
      }
    }
  }

  handleCfOrScChange = cfOrScName => {
    const newValue = {
      name: this.props.value.name || '',
      valueFrom: {
        [this.envType]: {
          name: cfOrScName || '',
          key: '',
        },
      },
    }
    this.validEnvKey(newValue.name, newValue)
    this.props.onChange(newValue)
  }

  getKeysOptions({ resourceType, resourceName }) {
    const { configMaps, secrets } = this.props

    let data
    if (resourceType === 'configMapKeyRef') {
      data = configMaps.find(item => item.name === resourceName)
    } else if (resourceType === 'secretKeyRef') {
      data = secrets.find(item => item.name === resourceName)
    }

    if (!data) {
      return []
    }

    return Object.keys(data.data || {}).map(key => ({
      label: key,
      value: key,
    }))
  }

  handleError = (text = '') => {
    const { handleKeyError, handleInputError } = this.props
    handleKeyError(text)
    handleInputError(text)
  }

  checkNameRepeat = value => {
    const { arrayValue, index: position } = this.props
    if (arrayValue.length > 1) {
      const repeat = arrayValue.filter(
        (item, index) => item.name === value && index !== position
      )
      return repeat.length > 0
    }
    return false
  }

  validEnvKey = debounce((value, target = {}) => {
    const invalid = !PATTERN_ENV_NAME.test(value)
    const repeat = this.checkNameRepeat(value)
    const emptyKey = has(target, 'valueFrom')
      ? isEmpty(target.valueFrom)
      : target.value === ''
    if (value === '' && emptyKey) {
      this.handleError()
      this.setState({
        keyError: false,
      })
    } else {
      if (repeat) {
        const message = t('DUPLICATE_KEYS')
        this.handleError({ message })
      } else if (invalid) {
        const message =
          value !== ''
            ? t('ENVIRONMENT_INVALID_TIP')
            : t('ENVIRONMENT_CANNOT_BE_EMPTY')
        this.handleError({ message })
      } else {
        this.handleError()
      }
      this.setState({
        keyError: invalid || repeat,
      })
    }
  }, 300)

  handleValueChange = debounce(({ name, value }) => {
    if (name === '' && value === '') {
      this.props.handleKeyError()
      this.props.handleInputError()
      this.setState({
        keyError: false,
      })
    } else {
      this.validEnvKey(name, { value })
    }
  }, 300)

  handleTypeChange = val => {
    const { value, onChange } = this.props
    this.setState(
      {
        envType: val,
        keyError: '',
      },
      () => {
        if (val !== 'customization') {
          onChange({
            name: value.name || '',
            valueFrom: {
              [val]: {
                name: '',
                key: '',
              },
            },
          })
        } else {
          onChange({
            name: value.name || '',
            value: '',
          })
        }

        if (value.name === '') {
          this.handleError()
        }
      }
    )
  }

  renderConfigOrSecret = () => {
    const { value = {} } = this.props
    const { keyError } = this.state

    const { resourceType, resourceName, resourceKey } = this.parseValue(
      value.valueFrom
    )

    const formatValue = {
      name: value.name,
      resource: resourceName,
      resourceKey,
    }

    return (
      <ObjectInput value={formatValue} onChange={this.handleChange}>
        <div className={styles.typeBox}>
          <Select
            options={this.resourceOptions}
            onChange={this.handleTypeChange}
            value={this.envType}
          ></Select>
        </div>
        <Input
          name="name"
          placeholder={t('KEY')}
          className={classNames({
            [styles.formError]: keyError,
          })}
          onChange={v => this.validEnvKey(v, value)}
        />
        <Select
          name="resource"
          placeholder={t('RESOURCE')}
          prefixIcon={
            <Icon
              name={this.envType === 'configMapKeyRef' ? 'hammer' : 'key'}
            />
          }
          options={this.getConfigOrSecretOptions}
          onChange={this.handleCfOrScChange}
        />
        <Select
          name="resourceKey"
          placeholder={t('KEY_IN_RESOURCE')}
          options={this.getKeysOptions({ resourceType, resourceName })}
          onChange={this.handleKeyData}
        />
      </ObjectInput>
    )
  }

  render() {
    const { value = {}, onChange } = this.props
    const { keyError } = this.state

    if (value.valueFrom) {
      return this.renderConfigOrSecret()
    }

    return (
      <ObjectInput value={value} onChange={onChange}>
        <div className={styles.typeBox}>
          <Select
            options={this.resourceOptions}
            onChange={this.handleTypeChange}
            value={this.envType}
          ></Select>
        </div>
        <Input
          name="name"
          placeholder={t('KEY')}
          className={classNames({
            [styles.formError]: keyError,
          })}
          onChange={v => this.validEnvKey(v, value)}
        />
        <Input
          name="value"
          placeholder={t('VALUE')}
          onChange={() => this.handleValueChange(value)}
        />
      </ObjectInput>
    )
  }
}
