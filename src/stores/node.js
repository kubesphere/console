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

  module = 'nodes'

  getFilterParams = params => {
    const result = { ...params }
    if (result.role) {
      result.labelSelector = result.labelSelector || ''
      result.labelSelector += `node-role.kubernetes.io/${result.role}=`
      delete result.role
    }
    return result
  }

  @action
  async fetchDetail(params) {
    this.isLoading = true

    const result = await request.get(
      `${this.getResourceUrl(params)}/${params.name}`
    )
    const detail = { ...params, ...this.mapper(result) }

    this.detail = detail
    this.isLoading = false
    return detail
  }

  @action
  async fetchCount(params) {
    const resp = await request.get(this.getResourceUrl(params), {
      labelSelector: 'node-role.kubernetes.io/master=',
    })

    const masterWorker = resp.items.filter(
      item =>
        getNodeRoles(item.metadata.labels).filter(role => role !== 'master')
          .length > 0
    ).length

    this.masterCount = resp.totalItems
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
  async cordon({ cluster, name }) {
    const data = {
      spec: { unschedulable: true },
    }
    const result = await request.patch(
      this.getDetailUrl({ cluster, name }),
      data
    )

    this.detail = this.mapper(result)
    this.originDetail = result
  }

  @action
  async uncordon({ cluster, name }) {
    const data = {
      spec: { unschedulable: null },
    }
    const result = await request.patch(
      this.getDetailUrl({ cluster, name }),
      data
    )

    this.detail = this.mapper(result)
    this.originDetail = result
  }

  @action
  async deleteSelected(rowKeys) {
    await Promise.all(
      rowKeys.map(rowKey => {
        const node = this.list.data[rowKey]
        if (node.role === 'master') return null

        return request.delete(this.getDetailUrl(node), {
          orphanDependents: false,
        })
      })
    )
    this.list.selectedRowKeys = []
  }
}
