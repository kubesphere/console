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
import { get, isEmpty } from 'lodash'

import Table from '../Table'

export default class Connections extends Component {
  getColumns(con) {
    const { jumpTo } = this.props
    return [
      {
        id: 'label',
        label: con.label,
        defaultSort: false,
        render: (label, record) => (
          <a onClick={() => jumpTo(record)}>{label}</a>
        ),
      },
      ...con.columns,
    ]
  }

  getData(con) {
    return con.connections.map(item => ({
      id: item.nodeId,
      label: { value: item.label },
      ...item.metadata.reduce(
        (prev, cur) => ({
          ...prev,
          [cur.id]: this.format(cur),
        }),
        {}
      ),
    }))
  }

  format = data => {
    if (
      data.dataType === 'number' ||
      data.id === 'count' ||
      data.id === 'port'
    ) {
      data.value = Number(data.value)
    }

    return data
  }

  render() {
    const connections = get(this.props.detail, 'connections', [])

    if (isEmpty(connections)) {
      return null
    }

    return connections.map(con => (
      <Table
        key={con.id}
        columns={this.getColumns(con)}
        data={this.getData(con)}
      />
    ))
  }
}
