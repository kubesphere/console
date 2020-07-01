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
import { get } from 'lodash'

import { to } from 'utils'

import Base from './base'

export default class ClusterMonitoring extends Base {
  @observable
  statistics = {
    data: {},
    isLoading: false,
  }

  @observable
  resourceMetrics = {
    originData: {},
    data: [],
    isLoading: false,
  }

  @action
  async fetchStatistics() {
    this.statistics.isLoading = true

    const params = {
      type: 'statistics',
    }
    const result = await to(request.get(this.getApi(), params))
    const data = this.getResult(result)

    this.statistics = {
      data,
      isLoading: false,
    }

    return data
  }

  @action
  async fetchApplicationResourceMetrics({
    workspace,
    namespace,
    autoRefresh = false,
    ...filters
  }) {
    if (autoRefresh) {
      filters.last = true
      this.resourceMetrics.isRefreshing = true
    } else {
      this.resourceMetrics.isLoading = true
    }

    if (filters.cluster) {
      this.cluster = filters.cluster
    }

    const params = this.getParams(filters)

    // set correct path
    const paramsReg = /^[a-zA-Z]+_/g
    const metricType = get(filters.metrics, '[0]', '').replace(
      paramsReg,
      'cluster_'
    )
    let path = 'cluster'

    if (workspace) {
      path = `workspaces/${workspace}`
      params.metrics_filter = `${metricType.replace(paramsReg, 'workspace_')}$`
    }
    if (namespace && namespace !== 'all') {
      path = `namespaces/${namespace}`
      params.metrics_filter = `${metricType.replace(paramsReg, 'namespace_')}$`
    }

    const result = await to(request.get(`${this.apiVersion}/${path}`, params))

    let data = this.getResult(result)
    if (autoRefresh) {
      data = this.getRefreshResult(data, this.resourceMetrics.originData)
    }

    this.resourceMetrics = {
      originData: data,
      data: get(Object.values(data), '[0].data.result') || [],
      isLoading: false,
      isRefreshing: false,
    }

    return data
  }

  fetchClusterDevopsCount = async () => {
    const result = await request.get(
      'kapis/tenant.kubesphere.io/v1alpha2/devopscount/'
    )

    return get(result, 'count', 0)
  }
}
