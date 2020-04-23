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

import { isEmpty, set, intersection } from 'lodash'
import { action, observable } from 'mobx'
import ObjectMapper from 'utils/object.mapper'
import { formatRules } from 'utils'

import Base from 'stores/base'
import List from 'stores/base.list'

export default class WorkspaceStore extends Base {
  @observable
  initializing = true

  module = 'workspaces'

  clusters = new List()

  namespaces = new List()

  devops = new List()

  getResourceUrl = params =>
    `kapis/tenant.kubesphere.io/v1alpha2${this.getPath(params)}/${this.module}`

  @action
  async fetchDetail({ workspace } = {}) {
    if (isEmpty(workspace)) {
      return
    }

    this.isLoading = true
    const detail = await request.get(
      this.getDetailUrl({ name: workspace }),
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

    this.detail = this.mapper(detail)
    this.isLoading = false
  }

  @action
  async fetchRules({ workspace } = {}) {
    this.initializing = true

    if (isEmpty(workspace)) {
      this.initializing = false
      return
    }

    const rules = await request.get(
      `kapis/tenant.kubesphere.io/v1alpha2/workspaces/${workspace}/rules`
    )

    const formatedRules = formatRules(rules)
    if (workspace === globals.config.systemWorkspace) {
      Object.keys(formatedRules).forEach(key => {
        formatedRules[key] = intersection(
          formatedRules[key],
          globals.config.systemWorkspaceRules[key]
        )
      })
    }

    set(globals.user, `workspace_rules[${workspace}]`, formatedRules)

    this.initializing = false
  }

  @action
  async fetchClusters({ more } = {}) {
    this.clusters.isLoading = true

    const params = {}

    const result = await request.get(
      `apis/cluster.kubesphere.io/v1alpha1/clusters`,
      params
    )

    const items = result.items.map(ObjectMapper.namespaces)

    this.clusters.update({
      data: more ? [...this.namespaces.data, ...items] : items,
      total: result.totalItems,
      limit: 10,
      page: 1,
      isLoading: false,
    })
  }
}
