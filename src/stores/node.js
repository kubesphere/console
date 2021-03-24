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

import { get, omit } from 'lodash'
import { LIST_DEFAULT_ORDER } from 'utils/constants'

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

  withTypeSelectParams = (params, type) => {
    const result = { ...params }

    if (type === 'node') {
      result.labelSelector = result.labelSelector
        ? ',!node-role.kubernetes.io/edge'
        : '!node-role.kubernetes.io/edge'
    } else if (type === 'edgenode') {
      result.labelSelector = result.labelSelector
        ? ',node-role.kubernetes.io/edge='
        : 'node-role.kubernetes.io/edge='
    }

    if (result.role) {
      result.labelSelector += `,node-role.kubernetes.io/${params.role}=`
      delete result.role
    }

    return result
  }

  @action
  async fetchList({
    cluster,
    workspace,
    namespace,
    more,
    devops,
    type = 'node',
    ...params
  } = {}) {
    this.list.isLoading = true

    if (!params.sortBy && params.ascending === undefined) {
      params.sortBy = LIST_DEFAULT_ORDER[this.module] || 'createTime'
    }

    if (params.limit === Infinity || params.limit === -1) {
      params.limit = -1
      params.page = 1
    }

    params.limit = params.limit || 10

    const result = await request.get(
      this.getResourceUrl({ cluster, workspace, namespace, devops }),
      this.withTypeSelectParams(params, type)
    )

    const data = (get(result, 'items') || []).map(item => ({
      cluster,
      namespace,
      ...this.mapper(item),
    }))

    this.list.update({
      data: more ? [...this.list.data, ...data] : data,
      total: result.totalItems || result.total_count || data.length || 0,
      ...omit(params, 'labelSelector'),
      limit: Number(params.limit) || 10,
      page: Number(params.page) || 1,
      isLoading: false,
      ...(this.list.silent ? {} : { selectedRowKeys: [] }),
    })

    return data
  }

  @action
  async fetchDetail(params) {
    this.isLoading = true

    const result = await request.get(
      `${this.getResourceUrl(params)}/${params.name}`
    )
    const detail = { ...params, ...this.mapper(result), kind: 'Node' }

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
