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
import { Dropdown, Menu, Input, Icon } from '@pitrix/lego-ui'

import styles from './index.scss'

export default class SelectInput extends React.Component {
  static propTypes = {
    name: PropTypes.string,
    value: PropTypes.any,
    onChange: PropTypes.func,
    options: PropTypes.array,
  }

  static defaultProps = {
    value: '',
    onChange() {},
    options: [],
  }

  state = {
    showOptions: false,
  }

  toggleOptions = () => {
    this.setState(({ showOptions }) => ({
      showOptions: !showOptions,
    }))
  }

  hideOptions = () => {
    this.setState({
      showOptions: false,
    })
  }

  handleOptionsClick = (e, key) => {
    this.props.onChange(key)
  }

  renderOptions() {
    const { options, optionRenderer } = this.props

    return (
      <Menu onClick={this.handleOptionsClick}>
        {options.map(option => (
          <Menu.MenuItem key={option.value}>
            {optionRenderer ? optionRenderer(option) : option.label}
          </Menu.MenuItem>
        ))}
      </Menu>
    )
  }

  render() {
    const { options, optionRenderer, ...rest } = this.props
    return (
      <div className={styles.wrapper}>
        <Input {...rest} />
        <Icon
          className={styles.caret}
          name="caret-down"
          clickable
          onClick={this.toggleOptions}
        />
        <Dropdown
          visible={this.state.showOptions}
          className="dropdown-default"
          content={this.renderOptions()}
          placement="bottomRight"
          onClose={this.hideOptions}
        >
          <div className={styles.trigger} />
        </Dropdown>
      </div>
    )
  }
}
