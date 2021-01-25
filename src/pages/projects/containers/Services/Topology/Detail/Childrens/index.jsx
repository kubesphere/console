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

export default class Childrens extends Component {
  getColumns(child) {
    return [
      {
        id: 'label',
        label: child.label,
        defaultSort: false,
        render: label => <strong>{label}</strong>,
      },
      ...child.columns,
    ]
  }

  getData(child) {
    return child.nodes.map(item => ({
      id: item.id,
      label: { value: item.label },
      ...[...(item.metadata || []), ...(item.metrics || [])].reduce(
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
    const children = get(this.props.detail, 'children', [])

    if (isEmpty(children)) {
      return null
    }

    return children.map(child => (
      <Table
        key={child.topologyId}
        columns={this.getColumns(child)}
        data={this.getData(child)}
      />
    ))
  }
}
