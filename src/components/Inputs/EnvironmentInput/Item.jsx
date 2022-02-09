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
import { Input, Select } from '@kube-design/components'
import styles from './index.scss'

import ObjectInput from '../ObjectInput'

export default class EnvironmentInputItem extends React.Component {
  state = {
    keyError: false,
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

  componentDidMount() {
    const { value = {} } = this.props
    if (value.valueFrom) {
      this.validEnvKey(value.name)
    }
  }

  parseValue(data) {
    const resourceType = has(data, 'configMapKeyRef')
      ? 'configMapKeyRef'
      : 'secretKeyRef'
    const resourceName = get(data, `${resourceType}.name`, '')
    const resourceKey = get(data, `${resourceType}.key`, '')
    return { resourceType, resourceName, resourceKey }
  }

  handleResourceValueForm = resource => {
    const { configMaps, secrets } = this.props

    const resourceType = resource.startsWith('configmap-')
      ? 'configMapKeyRef'
      : 'secretKeyRef'

    const valueFrom = {}
    let data

    if (resourceType === 'configMapKeyRef') {
      const name = resource.replace('configmap-', '')
      data = configMaps.find(item => item.name === name)
    } else if (resourceType === 'secretKeyRef') {
      const name = resource.replace('secret-', '')
      data = secrets.find(item => item.name === name)
    }

    valueFrom[resourceType] = {
      name: data ? data.name : '',
      key: '',
    }

    return { valueFrom, resourceType }
  }

  handleChange = value => {
    const { onChange } = this.props
    const isEmptyValue = Object.values(value).every(_value => {
      return isEmpty(_value)
    })

    if (isEmptyValue) {
      return
    }

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

  handleResourceData = resource => {
    const { valueFrom } = this.handleResourceValueForm(resource)

    const newValue = {
      name: this.props.value.name || '',
      valueFrom: { ...valueFrom },
    }

    this.props.onChange(newValue)
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

    this.props.onChange(newValue)
  }

  getResourceOptions() {
    const { configMaps, secrets } = this.props
    const options = []

    if (!isEmpty(configMaps)) {
      options.push({
        label: t('ConfigMap'),
        options: configMaps.map(item => ({
          label: getDisplayName(item),
          value: `configmap-${item.name}`,
          type: 'ConfigMap',
        })),
      })
    }

    if (!isEmpty(secrets)) {
      options.push({
        label: t('Secret'),
        options: secrets.map(item => ({
          label: getDisplayName(item),
          value: `secret-${item.name}`,
          type: 'Secret',
        })),
      })
    }

    return options
  }

  valueRenderer = option => (
    <p>
      {isEmpty(option.type) ? (
        <span style={{ color: '#5f708a', fontWeight: '400' }}>
          {t('RESOURCE')}
        </span>
      ) : (
        t.html('LABEL_TYPE', {
          label: option.label,
          style: 'color: #5f708a; font-weight: 400',
          type: t(option.type.toUpperCase()),
        })
      )}
    </p>
  )

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

  validEnvKey = debounce((value, target = {}) => {
    const { handleKeyError, handleInputError } = this.props
    const status = !PATTERN_ENV_NAME.test(value)
    if (value === '' && target.value === '') {
      handleKeyError()
      handleInputError()
      this.setState({
        keyError: false,
      })
    } else {
      if (status) {
        const message =
          value !== ''
            ? t('ENVIRONMENT_INVALID_TIP')
            : t('ENVIRONMENT_CANNOT_BE_EMPTY')
        handleInputError({ message })
        handleKeyError({ message })
      } else {
        handleKeyError()
        handleInputError()
      }
      this.setState({
        keyError: status,
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
      this.validEnvKey(name, value)
    }
  }, 300)

  render() {
    const { value = {}, onChange } = this.props
    const { keyError } = this.state

    if (value.valueFrom) {
      const { resourceType, resourceName, resourceKey } = this.parseValue(
        value.valueFrom
      )
      const formatValue = {
        name: value.name,
        resource: `${
          resourceType === 'configMapKeyRef' ? 'configmap' : 'secret'
        }-${resourceName}`,
        resourceKey,
      }

      return (
        <ObjectInput value={formatValue} onChange={this.handleChange}>
          <Input
            name="name"
            placeholder={t('KEY')}
            className={classNames({
              [styles.formError]: keyError,
            })}
            onChange={this.validEnvKey}
          />
          <Select
            name="resource"
            placeholder={t('RESOURCE')}
            options={this.getResourceOptions()}
            valueRenderer={this.valueRenderer}
            onChange={this.handleResourceData}
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

    return (
      <ObjectInput value={value} onChange={onChange}>
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
