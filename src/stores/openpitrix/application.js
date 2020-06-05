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

import { get, isEmpty } from 'lodash'
import { observable, action } from 'mobx'

import { getFilterString } from 'utils'
import ObjectMapper from 'utils/object.mapper'
import { CLUSTER_QUERY_STATUS } from 'configs/openpitrix/app'

import Base from './base'

export default class Application extends Base {
  resourceName = 'applications'

  defaultStatus = CLUSTER_QUERY_STATUS

  get baseUrl() {
    return 'kapis/openpitrix.io/v1'
  }

  getPath({ runtime_id, namespace }) {
    let path = ''
    if (runtime_id) {
      path += `/runtimes/${runtime_id}`
    }
    if (namespace) {
      path += `/namespaces/${namespace}`
    }
    return path
  }

  getUrl = ({ namespace, runtime_id, cluster_id } = {}) => {
    const url = `${this.baseUrl}${this.getPath({
      namespace,
      runtime_id,
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
    runtime_id,
    namespace,
    workspace,
    more,
    status,
    order,
    reverse,
    ...filters
  } = {}) => {
    this.list.isLoading = true

    if (!runtime_id) {
      this.list.isLoading = false
      return
    }

    const params = {
      conditions: getFilterString({ status: status || this.defaultStatus }),
    }

    if (!order && reverse === undefined) {
      order = 'status_time'
      reverse = true
    }

    if (!isEmpty(filters)) {
      params.conditions += `,${getFilterString(filters)}`
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
      this.getUrl({ namespace, runtime_id }),
      params
    )

    const data = (result.items || []).map(
      ({ cluster: clusterDetail, ...item }) => ({
        ...clusterDetail,
        ...item,
      })
    )

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
  }

  @action
  fetchDetail = async ({ namespace, runtime_id, id: cluster_id }) => {
    this.isLoading = true

    const result = await request.get(
      this.getUrl({ namespace, runtime_id, cluster_id })
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
      ...result,
      ...result.cluster,
    }

    this.isLoading = false
  }

  @action
  update = ({ cluster_id, runtime_id, zone, ...data }) =>
    this.submitting(
      request.patch(
        this.getUrl({ namespace: zone, cluster_id, runtime_id }),
        data
      )
    )

  @action
  patch = ({ cluster_id, runtime_id, zone }, data) =>
    this.submitting(
      request.patch(
        this.getUrl({ namespace: zone, cluster_id, runtime_id }),
        data
      )
    )

  @action
  delete = ({ cluster_id, runtime_id, zone }) =>
    this.submitting(
      request.delete(this.getUrl({ namespace: zone, cluster_id, runtime_id }))
    )

  @action
  batchDelete = (rowKeys, { namespace, runtime_id }) =>
    this.submitting(
      Promise.all(
        rowKeys.map(cluster_id =>
          request.delete(this.getUrl({ namespace, runtime_id, cluster_id }))
        )
      )
    )

  // todo: nex version
  @action
  upgrade = ({ cluster_id, runtime_id, version_id }) =>
    this.submitting(
      request.post(`${this.baseUrl}clusters/upgrade`, {
        cluster_id,
        runtime_id,
        version_id,
      })
    )
}
