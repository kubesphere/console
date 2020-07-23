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

import { get } from 'lodash'
import { action } from 'mobx'
import ObjectMapper from 'utils/object.mapper'
import FederatedStore from './federated'

export default class FederatedProject extends FederatedStore {
  getResourceUrl = ({ workspace, ...params }) => {
    return `kapis/tenant.kubesphere.io/v1alpha2/workspaces/${workspace}${this.getPath(
      params
    )}/federatednamespaces`
  }

  getWatchListUrl = ({ workspace, ...params }) => {
    return `${this.apiVersion}/watch${this.getPath(params)}/federated${
      this.module
    }?labelSelector=kubesphere.io/workspace=${workspace}`
  }

  @action
  async fetchList({ workspace, namespace, more, devops, ...params } = {}) {
    this.list.isLoading = true

    if (!params.sortBy && params.ascending === undefined) {
      params.sortBy = 'createTime'
    }

    if (params.limit === Infinity || params.limit === -1) {
      params.limit = -1
      params.page = 1
    }

    params.limit = params.limit || 10

    const result = await request.get(
      this.getResourceUrl({ workspace, namespace, devops }),
      params
    )
    const data = get(result, 'items', []).map(item => ({
      ...ObjectMapper.federated(this.mapper)(item),
    }))

    this.list.update({
      data: more ? [...this.list.data, ...data] : data,
      total: result.totalItems || result.total_count || data.length || 0,
      ...params,
      limit: Number(params.limit) || 10,
      page: Number(params.page) || 1,
      isLoading: false,
      ...(this.list.silent ? {} : { selectedRowKeys: [] }),
    })

    return data
  }
}
