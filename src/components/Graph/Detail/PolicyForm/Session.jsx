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

import { debounce } from 'lodash'
import React from 'react'
import PropTypes from 'prop-types'
import { Select, Input } from '@kube-design/components'

const parseCookie = str => {
  let status = true
  const arr = str.replace(/\s+/g, '').split(';')
  const result = {}
  for (let i = 0; i < arr.length; i++) {
    const cur = arr[i].split('=')
    if (cur.length > 1) {
      result[cur[0]] = cur[1]
    } else {
      status = false
    }
  }
  return { result, status }
}

export default class Session extends React.Component {
  static propTypes = {
    value: PropTypes.object,
    onChange: PropTypes.func,
  }

  static defaultProps = {
    value: {},
    onChange() {},
  }

  constructor(props) {
    super(props)

    const options = this.getOptions()

    const type = Object.keys(props.value)[0] || options[0].value
    let value = props.value[type]

    if (type === 'httpCookie' && value) {
      value = Object.entries(value)
        .map(([key, _value]) => `${key}=${_value}`)
        .join('; ')
    }

    this.state = { type, value, propsValue: props.value }
  }

  static getDerivedStateFromProps(props, state) {
    if (props.value !== state.propsValue) {
      const newType = Object.keys(props.value)[0]
      let newValue = props.value[newType]

      if (newType === 'httpCookie' && newValue) {
        newValue = Object.entries(newValue)
          .map(([key, _value]) => `${key}=${_value}`)
          .join('; ')
      }

      return { type: newType, value: newValue, propsValue: props.value }
    }

    return null
  }

  triggerChange = debounce(value => {
    this.props.onChange(value)
  }, 500)

  handleTypeChange = type => {
    this.setState({ type, value: '' }, () => {
      if (type === 'useSourceIp') {
        this.triggerChange({ [type]: true })
      } else {
        this.triggerChange({ [type]: '' })
      }
    })
  }

  handleValueChange = (e, value) => {
    this.setState({ value }, () => {
      const { type } = this.state
      if (type === 'httpCookie') {
        const { result: parsedValue, status } = parseCookie(value)
        if (status) {
          this.triggerChange({ [type]: parsedValue })
        }
      } else {
        this.triggerChange({ [type]: value })
      }
    })
  }

  getOptions() {
    const { protocol } = this.props

    if (protocol === 'http') {
      return [
        {
          label: t('HASH_BASED_ON_HTTP_HEADER'),
          value: 'httpHeaderName',
        },
        { label: t('HASH_BASED_ON_HTTP_COOKIE'), value: 'httpCookie' },
        {
          label: t('HASH_BASED_ON_SOURCE_IP_ADDRESS'),
          value: 'useSourceIp',
        },
      ]
    }

    return [
      {
        label: t('HASH_BASED_ON_SOURCE_IP_ADDRESS'),
        value: 'useSourceIp',
      },
    ]
  }

  render() {
    const { type, value } = this.state

    return (
      <div>
        <Select
          value={type}
          options={this.getOptions()}
          onChange={this.handleTypeChange}
        />
        {type === 'httpHeaderName' && (
          <>
            <div className="margin-t12">{t('HTTP_HEADER')}</div>
            <Input value={value} onChange={this.handleValueChange} />
          </>
        )}
        {type === 'httpCookie' && (
          <>
            <div className="margin-t12">{t('HTTP_COOKIE')}</div>
            <Input
              value={value}
              onChange={this.handleValueChange}
              placeholder="key1=value1; key2=value2"
            />
          </>
        )}
      </div>
    )
  }
}
