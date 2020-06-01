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

import { observable, action, toJS } from 'mobx'
import { isEmpty, get, min } from 'lodash'

import { getLocalTime, getFilterString } from 'utils'
import ObjectMapper from 'utils/object.mapper'

import NodeStore from 'stores/node'
import WorkloadStore from 'stores/workload'
import TypesStore from 'stores/alerting/types'
import { getLevelPath } from 'stores/alerting/path'

import List from 'stores/base.list'

import Base from './base'

export default class ResourceStore extends Base {
  nodes = new List()

  components = new List()

  workloads = new List()

  typesStore = new TypesStore()

  @observable
  resources = {
    data: [],
    resourceType: '',
    workloadKind: '',
    isLoading: true,
  }

  getResourceUrl = (params, resourceType) => {
    const path = getLevelPath(params, resourceType)
    return `${this.apiVersion}${path}/resource`
  }

  @action
  async fetchNodes({
    cluster,
    sort_type,
    sort_metric,
    resources = [],
    metrics = [],
    page = 1,
    limit = 10,
    more = false,
  }) {
    this.nodes.isLoading = true

    const params = {
      type: 'rank',
      page,
      limit,
      sort_type: sort_type || 'desc',
      sort_metric: sort_metric || '',
    }

    if (!isEmpty(resources)) {
      params.resources_filter = resources.join('|')
    }

    if (!isEmpty(metrics)) {
      params.metrics_filter = metrics.join('|')
    }

    const result = await request.get(
      `kapis${this.getPath({
        cluster,
      })}/monitoring.kubesphere.io/v1alpha3/nodes`,
      params
    )
    const data = (get(result, 'results') || []).reduce(
      (nodeList, metric = {}) => {
        const metricName = metric.metric_name
        const metricResult = get(metric, 'data.result') || []

        metricResult.forEach((_data, index) => {
          const item = nodeList[index] || {}
          const value = get(_data, 'value', [])
          const describeMsg = get(_data, 'metric', {})

          item[metricName] = value[1]

          Object.assign(item, describeMsg)
          item.name = item.resource_name || `node_${index}`
          item.nodeIp = get(item, 'address[0].address') || ''

          nodeList[index] = item
        })

        return nodeList
      },
      []
    )

    this.nodes.update({
      data: more ? [...this.nodes.data, ...data] : data,
      total: result.total_item || 0,
      total_page: result.total_page,
      limit,
      page,
      isLoading: false,
    })

    return toJS(this.nodes.data)
  }

  @action
  async fetchComponents(params) {
    this.components.isLoading = true

    const result = await request.get(
      `kapis${this.getPath(params)}/resources.kubesphere.io/v1alpha2/components`
    )
    const data = Object.entries(result || {}).map(([key, value]) => {
      const item = {
        healthy_pod_count: 0,
        total_pod_count: 0,
        service_count: 0,
        start_time: 0,
        running_time: '',
        status: 'Warning',
        services: value,
      }

      // set basic info
      switch (key) {
        case 'kube-system':
          item.name = 'kubernetes'
          item.label = 'Kubernetes'
          item.icon = 'kubernetes'
          break
        case 'kubesphere-system':
          item.name = 'kubesphere'
          item.label = 'KubeSphere'
          item.icon = 'kubesphere'
          break
        case 'openpitrix-system':
          item.name = 'openpitrix'
          item.label = 'OpenPitrix'
          item.icon = 'openpitrix'
          break
        default:
          break
      }

      // set service count
      const services = Object.values(value || [])
      item.service_count = services.length

      // set start time
      item.start_time = min(
        services.map(
          ({ healthyBackends = 0, totalBackends = 0, startedAt = '' }) => {
            // calculate pod count
            item.healthy_pod_count += healthyBackends
            item.total_pod_count += totalBackends

            return new Date(startedAt).valueOf()
          }
        )
      )

      // set running time
      item.running_time = getLocalTime(item.start_time).fromNow()

      // set status
      if (item.healthy_pod_count === item.total_pod_count) {
        item.status = 'Healthy'
      }

      return item
    })

    this.components.update({
      data,
      total: data.length,
      page: 1,
      isLoading: false,
    })

    return data
  }

  @action
  async fetchWorkloads({
    cluster,
    workspace,
    namespace,
    order,
    reverse,
    limit = 10,
    page = 1,
    more = false,
    type = 'deployments',
    ...filters
  }) {
    this.workloads.isLoading = true

    const params = {}

    if (!order && reverse === undefined) {
      order = 'createTime'
      reverse = true
    }

    if (!isEmpty(filters)) {
      params.conditions = getFilterString(filters)
    }

    if (limit !== Infinity) {
      params.paging = `limit=${limit},page=${page}`
    }

    if (order) {
      params.orderBy = order
    }

    if (reverse) {
      params.reverse = true
    }

    const result = await request.get(
      `kapis/resources.kubesphere.io/v1alpha2${this.getPath({
        cluster,
        namespace,
      })}/${type}`,
      params
    )
    const data = result.items.map(item =>
      ObjectMapper[type]({ kind: type, ...item })
    )

    this.workloads.update({
      data: more ? [...this.workloads.data, ...data] : data,
      total: result.total_count || 0,
      page: Number(page) || 1,
      limit: Number(limit) || 10,
      order,
      reverse,
      filters,
      isLoading: false,
      selectedRowKeys: [],
    })

    return data
  }

  @action
  async fetchResources({
    cluster,
    namespace,
    resourceType,
    resourceFilter = {},
  }) {
    this.resources.isLoading = true

    const kind = get(resourceFilter, 'workload_kind')
    const params = {
      namespace,
      limit: Infinity,
    }

    let store = {}
    switch (resourceType) {
      case 'node': {
        store = new NodeStore()
        params.names = get(resourceFilter, 'node_id', '').split('|')
        break
      }
      case 'workload': {
        store = new WorkloadStore(`${kind}s`)
        params.names = get(resourceFilter, 'workload_name', '').split('|')
        break
      }
      default:
        break
    }

    if (resourceFilter.selector) {
      const _params = {
        selector: resourceFilter.selector,
        workload_kind: kind,
      }
      const api = this.getResourceUrl({ cluster, namespace }, resourceType)
      const result = await request.get(api, _params)

      params.names = result || []
    }

    let data = []
    if (!isEmpty(params.names)) {
      data = await store.fetchList({
        ...params,
        cluster,
        names: params.names.join(','),
      })
    }

    this.resources = {
      data,
      resourceType,
      workloadKind: kind,
      isLoading: false,
    }
  }
}
