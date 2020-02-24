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
import { debounce } from 'lodash'

import { Select, Input, Group } from '@pitrix/lego-ui'

import styles from './index.scss'

export default class CookieMatch extends React.Component {
  static propTypes = {
    value: PropTypes.object,
    onChange: PropTypes.func,
    matchTypes: PropTypes.array,
  }

  static defaultProps = {
    value: {},
    onChange() {},
    matchTypes: ['exact', 'regex'],
  }

  constructor(props) {
    super(props)

    this.state = {
      match: Object.keys(props.value)[0] || this.matchTypes[0].value,
      value: Object.values(props.value)[0] || '',
    }
  }

  static getDerivedStateFromProps(props, state) {
    const match = Object.keys(props.value)[0]
    const value = Object.values(props.value)[0]
    if (match !== state.match || value !== state.value) {
      return { match, value }
    }
    return null
  }

  get matchTypes() {
    const { matchTypes } = this.props
    return [
      { label: t('Exact Match'), value: 'exact' },
      { label: t('Prefix Match'), value: 'prefix' },
      { label: t('Regex Match'), value: 'regex' },
    ].filter(({ value }) => matchTypes.includes(value))
  }

  triggerChange = debounce(() => {
    const { match, value } = this.state
    const { onChange } = this.props

    if (match) {
      onChange({ [match]: value || '' })
    }
  }, 200)

  handleMatchChange = value => {
    this.setState({ match: value }, () => {
      this.triggerChange()
    })
  }

  handleValueChange = (e, value) => {
    this.setState({ value }, () => {
      this.triggerChange()
    })
  }

  render() {
    const { match, value } = this.state

    return (
      <Group className={styles.match}>
        <Select
          value={match}
          options={this.matchTypes}
          onChange={this.handleMatchChange}
        />
        <Input
          value={value}
          placeholder={this.props.placeholder || 'key=value'}
          onChange={this.handleValueChange}
        />
      </Group>
    )
  }
}
