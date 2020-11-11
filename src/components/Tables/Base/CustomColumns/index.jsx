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
import classnames from 'classnames'
import PropTypes from 'prop-types'
import { Icon, Dropdown, Button } from '@kube-design/components'
import { includes, remove, get, isUndefined, isEmpty } from 'lodash'

import styles from './index.scss'

class CustomColumns extends Component {
  static propTypes = {
    value: PropTypes.array,
    onChange: PropTypes.func.isRequired,
    className: PropTypes.string,
    title: PropTypes.node,
    columns: PropTypes.array.isRequired,
  }

  static defaultProps = {
    value: [],
    columns: [],
  }

  constructor(props) {
    super(props)

    this.hideableColumns = props.columns
      .filter(column => column.isHideable)
      .map(column => ({
        label: column.title,
        value: column.dataIndex || column.key,
      }))
  }

  isVisibleOption(option) {
    const { value } = option
    const { value: hideColumns } = this.props
    return !includes(hideColumns, value)
  }

  handleOptionClick = e => {
    const value = get(e, 'currentTarget.dataset.value')
    const { value: hideColumns, onChange } = this.props
    const duplicate = [...hideColumns]
    includes(duplicate, value)
      ? remove(duplicate, visibleValue => visibleValue === value)
      : duplicate.push(value)
    onChange(duplicate)
  }

  renderContent() {
    const { className } = this.props
    return (
      <div className={classnames(styles.wrapper, className)}>
        {this.renderHeader()}
        {this.renderOptions()}
      </div>
    )
  }

  renderHeader() {
    const { title } = this.props
    return isUndefined(title) ? null : <header>{title}</header>
  }

  renderOptions() {
    return <ul>{this.hideableColumns.map(this.renderOption, this)}</ul>
  }

  renderOption(option) {
    const isVisible = this.isVisibleOption(option)
    const { value, label } = option
    const iconName = isVisible ? 'eye' : 'eye-closed'
    return (
      <li data-value={value} key={value} onClick={this.handleOptionClick}>
        <Icon name={iconName} />
        {label}
      </li>
    )
  }

  render() {
    if (isEmpty(this.hideableColumns)) {
      return null
    }

    return (
      <Dropdown content={this.renderContent()} placement="bottomRight">
        <Button type="flat" icon="cogwheel" data-test="table-columns" />
      </Dropdown>
    )
  }
}

export default CustomColumns
