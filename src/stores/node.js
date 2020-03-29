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

import { action, observable } from 'mobx'
import { isEmpty } from 'lodash'

import { getNodeRoles } from 'utils/node'

import Base from './base'

export default class NodeStore extends Base {
  @observable
  nodesMetrics = []

  @observable
  nodeMetrics = {}

  @observable
  masterCount = 0

  @observable
  masterWorkerCount = 0

  constructor() {
    super()
    this.module = 'nodes'
  }

  get apiVersion() {
    return 'api/v1'
  }

  getResourceUrl = () => `kapis/resources.kubesphere.io/v1alpha2/${this.module}`

  @action
  async fetchListByK8s({ namespace, labelSelector, ...rest }) {
    this.list.isLoading = true

    const params = rest

    if (!isEmpty(labelSelector)) {
      params.labelSelector = labelSelector
    }

    const result = await request.get(this.getListUrl({ namespace }), params)

    this.list = {
      data: result.items.map(this.mapper),
      total: result.items.length,
      isLoading: false,
    }
  }

  @action
  async fetchCount() {
    const resp = await request.get(this.getResourceUrl(), {
      conditions: 'role=master',
    })

    const masterWorker = resp.items.filter(
      item =>
        getNodeRoles(item.metadata.labels).filter(role => role !== 'master')
          .length > 0
    ).length

    this.masterCount = resp.total_count
    this.masterWorkerCount = masterWorker
  }

  @action
  async batchPatchTaints(nodes) {
    await this.submitting(
      Promise.all(
        nodes.map(node => {
          const newTaints = node.taints
          return request.patch(this.getDetailUrl(node), {
            spec: { taints: newTaints },
          })
        })
      )
    )
  }

  @action
  async cordon({ name }) {
    const data = {
      spec: { unschedulable: true },
    }
    const result = await request.patch(this.getDetailUrl({ name }), data)

    this.detail = this.mapper(result)
    this.originDetail = result
  }

  @action
  async uncordon({ name }) {
    const data = {
      spec: { unschedulable: null },
    }
    const result = await request.patch(this.getDetailUrl({ name }), data)

    this.detail = this.mapper(result)
    this.originDetail = result
  }

  @action
  async deleteSelected(rowKeys) {
    await Promise.all(
      rowKeys.map(rowKey => {
        const node = this.list.data[rowKey]
        if (node.role === 'master') return null

        return request.delete(this.getDetailUrl({ name: node.name }), {
          orphanDependents: false,
        })
      })
    )
    this.list.selectedRowKeys = []
  }
}
