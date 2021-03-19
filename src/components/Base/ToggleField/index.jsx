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
import { PropTypes } from 'prop-types'
import { noop, isEqual } from 'lodash'
import { Toggle } from '@kube-design/components'

export default class ToggleField extends React.Component {
  static propTypes = {
    name: PropTypes.string,
    onText: PropTypes.string,
    offText: PropTypes.string,
    value: PropTypes.bool,
    onChange: PropTypes.func,
  }

  static defaultProps = {
    onChange: noop,
  }

  constructor(props) {
    super(props)
    this.state = {
      value: props.value || false,
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { value } = prevState
    if ('value' in nextProps && !isEqual(nextProps.value, value)) {
      return { value: nextProps.value }
    }
    return null
  }

  handleChange = value => {
    const { onChange } = this.props
    this.setState({ value })
    if (onChange !== noop) {
      onChange(value)
    }
  }

  render() {
    const { name, onText, offText, ...rest } = this.props
    const { value } = this.state

    return (
      <Toggle
        {...rest}
        name={name}
        onText={onText}
        offText={offText}
        checked={value}
        onChange={this.handleChange}
      />
    )
  }
}
