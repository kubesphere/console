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
import { pick } from 'lodash'
import { Select, Form } from '@kube-design/components'

import NodeStore from 'stores/node'

export default class NodeSelect extends Component {
  store = new NodeStore()

  state = {
    node: [],
    isLoading: false,
  }

  componentDidMount() {
    this.fetchData()
  }

  fetchData = params => {
    const { cluster } = this.props
    this.setState({ isLoading: false })
    this.store
      .fetchList({
        cluster,
        ...params,
      })
      .then(() => {
        this.setState({
          nodes: this.store.list.data.map(item => ({
            label: item.name,
            value: item.name,
          })),
          isLoading: false,
        })
      })
  }

  render() {
    const pagination = pick(this.store.list, ['page', 'limit', 'total'])
    return (
      <Form.Item
        label={t('Monitoring Target')}
        rules={[{ required: true, message: t('RESOURCE_NODE_FORM_TIP') }]}
      >
        <Select
          name="resources"
          options={this.state.nodes}
          pagination={pagination}
          isLoading={this.state.isLoading}
          onFetch={this.fetchData}
          searchable
          multi
        />
      </Form.Item>
    )
  }
}
