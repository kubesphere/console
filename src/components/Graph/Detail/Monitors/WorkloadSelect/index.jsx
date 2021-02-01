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

import React, { Component } from 'react'
import classNames from 'classnames'
import { Dropdown, Menu, Icon } from '@kube-design/components'

import styles from './index.scss'

export default class WorkloadSelect extends Component {
  handleOptionsClick = (e, key) => {
    this.props.onChange(key)
  }

  renderOptions() {
    const { options } = this.props

    return (
      <Menu className={styles.options} onClick={this.handleOptionsClick}>
        {options.map(option => (
          <Menu.MenuItem key={option.value}>{option.label}</Menu.MenuItem>
        ))}
      </Menu>
    )
  }

  renderControl() {
    const { className, value } = this.props
    return (
      <div className={classNames(styles.value, className)}>
        <span className={styles.label}>{value}</span>
        <Icon className={styles.rightIcon} name="chevron-down" type="light" />
      </div>
    )
  }

  render() {
    return (
      <Dropdown theme="dark" content={this.renderOptions()}>
        {this.renderControl()}
      </Dropdown>
    )
  }
}
