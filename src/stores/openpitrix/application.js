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

import { get, keyBy, isEmpty } from 'lodash'
import { observable, action } from 'mobx'

import { getFilterString } from 'utils'
import ObjectMapper from 'utils/object.mapper'
import { CLUSTER_QUERY_STATUS } from 'configs/openpitrix/app'

import ServiceStore from 'stores/service'
import ServiceMonitorStore from 'stores/monitoring/service.monitor'
import PodStore from 'stores/pod'

import Base from './base'

const dataFormatter = data => {
  const status = get(data, 'cluster.status')
  return {
    ...data,
    ...data.cluster,
    status: status === 'pending' ? 'failed' : status,
  }
}

export default class Application extends Base {
  resourceName = 'applications'

  defaultStatus = CLUSTER_QUERY_STATUS

  serviceStore = new ServiceStore()

  serviceMonitorStore = new ServiceMonitorStore()

  podStore = new PodStore()

  @observable
  components = {
    data: [],
    total: 0,
    isLoading: true,
  }

  get baseUrl() {
    return 'kapis/openpitrix.io/v1'
  }

  getPath({ workspace, cluster, namespace }) {
    let path = ''
    if (workspace) {
      path += `/workspaces/${workspace}`
    }
    if (cluster) {
      path += `/clusters/${cluster}`
    }
    if (namespace) {
      path += `/namespaces/${namespace}`
    }
    return path
  }

  getUrl = ({ workspace, namespace, cluster, cluster_id } = {}) => {
    const url = `${this.baseUrl}${this.getPath({
      workspace,
      namespace,
      cluster,
    })}/applications`

    if (cluster_id) {
      return `${url}/${cluster_id}`
    }

    return url
  }

  @observable
  env = {
    data: {},
    isLoading: false,
  }

  @action
  fetchList = async ({
    limit,
    page,
    cluster,
    namespace,
    workspace,
    more,
    status,
    sortBy: order,
    reverse,
    ...filters
  } = {}) => {
    this.list.isLoading = true

    const params = {
      conditions: getFilterString({ status: status || this.defaultStatus }),
    }

    if (!order && reverse === undefined) {
      order = 'status_time'
      reverse = true
    }

    if (!isEmpty(filters)) {
      const filterString = getFilterString(filters)
      if (filterString) {
        params.conditions += `,${filterString}`
      }
    }

    if (limit !== Infinity) {
      params.paging = `limit=${limit || 10},page=${page || 1}`
    }

    if (order) {
      params.orderBy = order
    }

    if (reverse) {
      params.reverse = true
    }

    const result = await request.get(
      this.getUrl({ workspace, namespace, cluster }),
      params
    )

    const data = (result.items || []).map(item => ({
      ...dataFormatter(item),
      workspace,
      cluster,
    }))

    Object.assign(this.list, {
      data: more ? [...this.list.data, ...data] : data,
      total: result.total_count || 0,
      limit: Number(limit) || 10,
      page: Number(page) || 1,
      order,
      reverse,
      filters,
      selectedRowKeys: [],
    })

    this.list.isLoading = false
    return data
  }

  @action
  fetchDetail = async ({ workspace, namespace, cluster, id: cluster_id }) => {
    this.isLoading = true

    const result = await request.get(
      this.getUrl({ workspace, namespace, cluster, cluster_id })
    )

    if (result.services) {
      result.services = result.services.map(ObjectMapper.services)
    }

    if (result.workloads) {
      Object.keys(result.workloads).forEach(key => {
        if (ObjectMapper[key]) {
          result.workloads[key] = result.workloads[key].map(ObjectMapper[key])
        }
      })
    }

    try {
      const clusterData = get(result, 'cluster.env', '')
      this.env.data = JSON.parse(clusterData)
    } catch (err) {}

    this.detail = {
      ...dataFormatter(result),
      workspace,
      cluster,
    }

    this.isLoading = false
  }

  @action
  async fetchComponents(params) {
    this.components.isLoading = true

    await Promise.all([
      this.serviceStore.fetchListByK8s(params),
      this.serviceMonitorStore.fetchListByK8s(params),
      this.podStore.fetchListByK8s(params),
    ])

    const services = this.serviceStore.list.data
    const serviceMonitors = this.serviceMonitorStore.list.data
    const pods = this.podStore.list.data

    if (services) {
      const componentNameMap = keyBy(services, 'name')
      const serviceMonitorNameMap = keyBy(serviceMonitors, 'name')
      if (pods) {
        pods.forEach(item => {
          const service = item.labels.app
          if (service && componentNameMap[service]) {
            componentNameMap[service].podNums =
              componentNameMap[service].podNums || 0
            componentNameMap[service].podNums += 1
          }
        })
      }

      services.forEach(service => {
        service.monitor = serviceMonitorNameMap[service.name]
      })

      this.components.data = services
      this.components.total = services.length
    }

    this.components.isLoading = false
  }

  @action
  async upgrade(params, { workspace, namespace, cluster, cluster_id }) {
    return this.submitting(
      request.post(
        this.getUrl({ workspace, namespace, cluster, cluster_id }),
        params
      )
    )
  }

  @action
  update = ({ cluster_id, cluster, workspace, zone, ...data }) =>
    this.submitting(
      request.patch(
        this.getUrl({ namespace: zone, cluster_id, cluster, workspace }),
        data
      )
    )

  @action
  patch = ({ cluster_id, cluster, workspace, zone }, data) =>
    this.submitting(
      request.patch(
        this.getUrl({ namespace: zone, cluster_id, cluster, workspace }),
        data
      )
    )

  @action
  delete = ({ cluster_id, cluster, workspace, zone }) => {
    return this.submitting(
      request.delete(
        this.getUrl({ namespace: zone, cluster_id, cluster, workspace })
      )
    )
  }

  @action
  batchDelete = (rowKeys, { namespace, cluster, workspace }) =>
    this.submitting(
      Promise.all(
        rowKeys.map(cluster_id =>
          request.delete(
            this.getUrl({ namespace, cluster, workspace, cluster_id })
          )
        )
      )
    )
}
