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
import { Dropdown, Menu, Input } from '@pitrix/lego-ui'

export default class SelectInput extends React.Component {
  static propTypes = {
    name: PropTypes.string,
    value: PropTypes.any,
    onChange: PropTypes.func,
    options: PropTypes.array,
  }

  static defaultProps = {
    onChange() {},
    options: [],
  }

  handleOptionsClick = (e, key) => {
    this.props.onChange(key)
  }

  renderOptions() {
    const { options } = this.props

    return (
      <Menu onClick={this.handleOptionsClick}>
        {options.map(option => (
          <Menu.MenuItem key={option.value}>{option.label}</Menu.MenuItem>
        ))}
      </Menu>
    )
  }

  render() {
    const { options, ...rest } = this.props

    return (
      <Dropdown content={this.renderOptions()}>
        <Input {...rest} />
      </Dropdown>
    )
  }
}
