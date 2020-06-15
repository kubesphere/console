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
import { action, observable } from 'mobx'
import ObjectMapper from 'utils/object.mapper'
import { DEFAULT_CLUSTER } from 'utils/constants'

import Base from 'stores/base'
import List from 'stores/base.list'

export default class WorkspaceStore extends Base {
  @observable
  initializing = true

  module = 'workspaces'

  clusters = new List()

  @observable
  cluster = ''

  namespaces = new List()

  devops = new List()

  getResourceUrl = (params = {}) =>
    params.cluster
      ? `kapis/resources.kubesphere.io/v1alpha3${this.getPath(params)}/${
          this.module
        }`
      : `kapis/tenant.kubesphere.io/v1alpha2${this.getPath(params)}/${
          this.module
        }`

  getListUrl = this.getResourceUrl

  @action
  async fetchDetail({ cluster, workspace } = {}) {
    if (isEmpty(workspace)) {
      return
    }

    this.isLoading = true
    const detail = await request.get(
      this.getDetailUrl({ name: workspace, cluster }),
      null,
      null,
      res => {
        if (
          res.reason === 'Not Found' ||
          res.reason === 'No Such Object' ||
          res.reason === 'Forbidden'
        ) {
          global.navigateTo('/404')
        }
      }
    )

    this.detail = { ...this.mapper(detail), cluster }
    this.isLoading = false

    return { ...this.mapper(detail), cluster }
  }

  @action
  async fetchClusters({ workspace, more } = {}) {
    this.clusters.isLoading = true

    const params = {}

    let result
    if (globals.app.isMultiCluster) {
      result = await request.get(
        `kapis/tenant.kubesphere.io/v1alpha2/workspaces/${workspace}/clusters`,
        params
      )
    } else {
      result = { items: [DEFAULT_CLUSTER] }
    }

    const items = result.items.map(ObjectMapper.clusters)

    this.clusters.update({
      data: more ? [...this.namespaces.data, ...items] : items,
      total: result.totalItems,
      limit: 10,
      page: 1,
      isLoading: false,
    })

    if (this.clusters.data.length > 1) {
      this.selectCluster(
        get(
          this.clusters.data.find(cluster => cluster.isHost) ||
            this.clusters.data[0],
          'name'
        )
      )
    }
  }

  @action
  selectCluster(cluster) {
    this.cluster = cluster
  }
}
