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

import { getFilterString, joinSelector } from 'utils'
import { CLUSTER_QUERY_STATUS } from 'configs/openpitrix/app'

import ServiceStore from 'stores/service'
import PodStore from 'stores/pod'

import Base from './base'

const STATUSES = {
  creating: 'Creating',
  created: 'Creating',
  active: 'Running',
  failed: 'Failed',
  deleting: 'Deleting',
  upgrading: 'Upgrading',
  upgraded: 'Upgrading',
}

const dataFormatter = data => {
  const status = get(data, 'cluster.status')
  return {
    ...data,
    ...data.cluster,
    selector: {
      'app.kubesphere.io/instance': data.cluster.name,
    },
    status: STATUSES[status],
  }
}

export default class Application extends Base {
  resourceName = 'applications'

  defaultStatus = CLUSTER_QUERY_STATUS

  serviceStore = new ServiceStore()

  podStore = new PodStore()

  @observable
  components = {
    data: [],
    total: 0,
    isLoading: true,
  }

  getWatchListUrl = ({ cluster, namespace } = {}) =>
    `apis/application.kubesphere.io/v1alpha1/watch/helmreleases?labelSelector=${joinSelector(
      {
        'kubesphere.io/cluster': globals.app.isMultiCluster ? cluster : null,
        'kubesphere.io/namespace': namespace,
      }
    )}`

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

    this.detail = {
      ...dataFormatter(result),
      workspace,
      namespace,
      cluster,
    }

    this.isLoading = false
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
