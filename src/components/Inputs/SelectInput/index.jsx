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
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { get } from 'lodash'
import { Dropdown, Menu, Input } from '@kube-design/components'

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

  constructor(props) {
    super(props)

    this.state = {
      value: this.getOptionsForValue(this.props.value),
      showOptions: false,
    }
  }

  showOptions = () => {
    this.setState({ showOptions: true })
  }

  hideOptions = () => {
    this.setState({ showOptions: false })
  }

  handleOptionsClick = (e, key) => {
    this.setState(
      { value: this.getOptionsForValue(key), showOptions: false },
      () => {
        this.props.onChange(key)
      }
    )
  }

  getOptionsForValue = value => {
    const { options } = this.props
    return (
      get(
        options.find(item => item.value === value),
        'label'
      ) || value
    )
  }

  getOptionsForLabel = label => {
    const { options } = this.props
    return (
      get(
        options.find(item => item.label === label),
        'value'
      ) || label
    )
  }

  handleChange = (e, value) => {
    this.setState({ value, showOptions: false }, () => {
      this.props.onChange(value)
    })
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
    const { options, optionRenderer, className, ...rest } = this.props
    const { showOptions, value } = this.state
    return (
      <div className={classNames(styles.wrapper, className)}>
        <Dropdown
          theme="dark"
          visible={showOptions}
          content={this.renderOptions()}
          placement="bottomRight"
          closeAfterClick={false}
        >
          <Input
            {...rest}
            value={value}
            onChange={this.handleChange}
            onClick={this.showOptions}
          />
        </Dropdown>
      </div>
    )
  }
}
