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

import { sortBy, isEmpty } from 'lodash'
import React, { Component } from 'react'
import { Icon } from '@kube-design/components'
import { getSuitableValue } from 'utils/monitoring'

import styles from './index.scss'

const sortByWithOrder = (data, sortKey, order = 'asc') => {
  if (!sortKey) {
    return data
  }

  let sortedData = sortBy(data, `${sortKey}.value`)

  if (order === 'asc') {
    sortedData = sortedData.reverse()
  }

  return sortedData
}

export default class Table extends Component {
  constructor(props) {
    super(props)

    const column = this.props.columns.find(item => item.defaultSort)

    this.state = {
      sortKey: column ? column.id : '',
      order: 'asc',
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (!prevState.sortKey && prevProps.columns !== this.props.columns) {
      const column = this.props.columns.find(item => item.defaultSort)
      if (column) {
        this.setState({ sortKey: column.id, order: 'asc' })
      }
    }
  }

  handleTitleClick = e => {
    const { id } = e.currentTarget.dataset
    this.setState(({ sortKey, order }) => ({
      sortKey: id,
      order: sortKey !== id ? 'asc' : order === 'asc' ? 'desc' : 'asc',
    }))
  }

  getValue(data) {
    if (isEmpty(data)) {
      return ''
    }

    if (data.format === 'percent') {
      return `${data.value}%`
    }

    if (data.format === 'filesize') {
      return `${getSuitableValue(data.value, 'disk')}`
    }

    return data.value
  }

  render() {
    const { columns, data } = this.props
    const { sortKey, order } = this.state

    const sortedData = sortByWithOrder(data, sortKey, order)

    return (
      <table className={styles.table}>
        <thead>
          <tr>
            {columns.map(column => (
              <th
                key={column.id}
                title={column.label}
                data-id={column.id}
                onClick={this.handleTitleClick}
              >
                {column.dataType === 'number' && column.label.startsWith('#')
                  ? '#'
                  : column.label}
                {sortKey === column.id && (
                  <Icon name={order === 'asc' ? 'caret-down' : 'caret-up'} />
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((item, index) => (
            <tr key={`${item.id}-${index}`}>
              {columns.map(column => {
                const value = this.getValue(item[column.id])
                return (
                  <td key={column.id} title={value}>
                    {column.render ? column.render(value, item) : value}
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    )
  }
}
