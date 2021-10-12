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

import { isEmpty } from 'lodash'
import { fillEmptyMetrics } from 'utils/monitoring'
import { to } from 'utils'

import Base from './base'

export default class GatewayMonitor extends Base {
  resourceName = 'gateways'

  getApi = ({ namespace }) =>
    `${this.apiVersion}/namespaces/${namespace ||
      'kubesphere-system'}/ingresses`

  getGatewayParams = ({ resources = [], metrics = [], ...rest } = {}) => {
    const params = {
      ...rest,
    }

    if (!isEmpty(resources)) {
      params.resources_filter = `${resources.join('|')}$`
    }

    if (!isEmpty(metrics)) {
      params.metrics_filter = `${metrics.join('|')}$`
    }

    params.time = Math.floor(Date.now() / 1000)

    return params
  }

  async fetchGatewayMetrics({
    autoRefresh = false,
    more = false,
    fillZero = true,
    ...filters
  }) {
    if (autoRefresh) {
      filters.last = true
      this.isRefreshing = true
    } else {
      this.isLoading = true
    }

    if (filters.cluster) {
      this.cluster = filters.cluster
    }

    const params = this.getGatewayParams(filters)
    const api = this.getApi(filters)

    const response = await to(request.get(api, params))

    let result = this.getResult(response)
    if (autoRefresh) {
      result = this.getRefreshResult(result, this.data)
    }
    if (more) {
      result = this.getMoreResult(result, this.data)
    }

    this.data = fillZero ? fillEmptyMetrics(params, result) : result
    this.isLoading = false
    this.isRefreshing = false

    return result
  }
}
