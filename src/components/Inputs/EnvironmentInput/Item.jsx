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

import { get, isEmpty } from 'lodash'
import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import pathToRegexp from 'path-to-regexp'

import { getDisplayName } from 'utils'

import { Icon, Input, Select } from '@pitrix/lego-ui'

import ObjectInput from '../ObjectInput'

const TYPE_MODULE_MAP = {
  ConfigMap: 'configmaps',
  Secret: 'secrets',
}

const getResource = (obj, key = 'name') =>
  get(
    obj,
    `value.valueFrom.configMapKeyRef.${key}`,
    get(obj, `value.valueFrom.secretKeyRef.${key}`, '')
  )

const pathRe = pathToRegexp('/projects/:namespace/:module')

export default class Item extends React.Component {
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

  state = {
    resource: getResource(this.props),
  }

  componentWillReceiveProps(nextProps) {
    const newResource = getResource(nextProps)
    if (newResource && newResource !== getResource(this.props)) {
      this.setState({ resource: newResource })
    }
  }

  getDetailPrefix(type) {
    const results = pathRe.exec(location.pathname) || []

    if (results.length > 2) {
      return `/projects/${results[1]}/${TYPE_MODULE_MAP[type]}`
    }

    return ''
  }

  handleChange = value => {
    const { configMaps, secrets } = this.props
    const newValue = { name: value.name, valueFrom: {} }

    if (value.resource) {
      let type = ''
      const configMap = configMaps.find(item => item.name === value.resource)
      const secret = secrets.find(item => item.name === value.resource)
      const data = configMap || secret
      if (configMap) {
        type = 'configMapKeyRef'
      } else if (secret) {
        type = 'secretKeyRef'
      }

      if (type) {
        newValue.valueFrom = {
          [type]: {
            name: data.name,
            key: value.resourceKey,
          },
        }
      }
    }

    this.props.onChange(newValue)
  }

  handleSelectChange = value => {
    this.setState({ resource: value })
  }

  getResourceOptions() {
    const { configMaps, secrets } = this.props
    const options = []

    if (!isEmpty(configMaps)) {
      options.push({
        label: t('ConfigMap'),
        options: configMaps.map(item => ({
          label: getDisplayName(item),
          value: item.name,
          type: 'ConfigMap',
        })),
      })
    }

    if (!isEmpty(secrets)) {
      options.push({
        label: t('Secret'),
        options: secrets.map(item => ({
          label: getDisplayName(item),
          value: item.name,
          type: 'Secret',
        })),
      })
    }

    return options
  }

  valueRenderer = option => {
    const prefix = this.getDetailPrefix(option.type)
    return (
      <p>
        {option.label}
        <span style={{ color: '#abb4be' }}> ({t(option.type)})</span>
        {prefix && (
          <Link to={`${prefix}/${option.value}`} target="_blank">
            <Icon className="align-text-bottom" name="question" />
          </Link>
        )}
      </p>
    )
  }

  getKeysOptions() {
    const { resource } = this.state
    const { configMaps, secrets } = this.props

    const configMap = configMaps.find(({ name }) => name === resource)
    const secret = secrets.find(({ name }) => name === resource)

    const data = configMap || secret || {}

    return Object.keys(data.data || {}).map(key => ({
      label: key,
      value: key,
    }))
  }

  render() {
    const { value = {}, onChange } = this.props

    if (value.valueFrom) {
      const formatValue = {
        name: value.name,
        resource: getResource(this.props),
        resourceKey: getResource(this.props, 'key'),
      }

      return (
        <ObjectInput value={formatValue} onChange={this.handleChange}>
          <Input name="name" placeholder={t('name')} />
          <Select
            name="resource"
            placeholder={t('Select resource')}
            options={this.getResourceOptions()}
            onChange={this.handleSelectChange}
            valueRenderer={this.valueRenderer}
          />
          <Select
            name="resourceKey"
            placeholder={t('Select Key')}
            options={this.getKeysOptions()}
          />
        </ObjectInput>
      )
    }

    return (
      <ObjectInput value={value} onChange={onChange}>
        <Input name="name" placeholder={t('name')} />
        <Input name="value" placeholder={t('value')} />
      </ObjectInput>
    )
  }
}
