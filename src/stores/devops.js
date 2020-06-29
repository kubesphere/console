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

import { set, get, isArray } from 'lodash'
import { action, observable } from 'mobx'
import { getFilterString } from 'utils'

import Base from 'stores/base'

import RoleStore from 'stores/role'

export default class DevOpsStore extends Base {
  @observable
  initializing = true

  roleStore = new RoleStore()

  module = 'devops'

  @observable
  roles = {
    data: [],
    page: 1,
    total: 0,
    isLoading: true,
  }

  @observable
  data = {}

  @observable
  devopsListData = []

  @observable
  project_id = ''

  @observable
  devops = ''

  getPath({ cluster, namespace, workspace } = {}) {
    let path = ''
    if (cluster) {
      path += `/klusters/${cluster}`
    }
    if (workspace) {
      path += `/workspaces/${workspace}`
    }
    if (namespace) {
      path += `/namespaces/${namespace}`
    }
    return path
  }

  getBaseUrlV2 = params =>
    `kapis/devops.kubesphere.io/v1alpha2${this.getPath(params)}/`

  getDevopsUrlV2 = params => `${this.getBaseUrlV2(params)}devops/`

  getResourceUrl = ({ workspace }) =>
    `${this.getBaseUrlV2({ workspace })}devops`

  getBaseUrl = params => `${this.apiVersion}${this.getPath(params)}/`

  getDevOpsUrl = params => `${this.getBaseUrl(params)}devops`

  getDevOpsDetailUrl = ({ workspace, cluster, devops }) =>
    `${this.getDevOpsUrl({ cluster, workspace })}/${devops}`

  getWatchListUrl = ({ workspace, ...params }) => {
    if (workspace) {
      return `${this.apiVersion}/watch/${
        this.module
      }?labelSelector=kubesphere.io/workspace=${workspace}`
    }
    return `${this.apiVersion}/watch${this.getPath(params)}/devopsprojects`
  }

  getWatchUrl = (params = {}) =>
    `${this.getWatchListUrl(params)}/${params.name}`

  getDevops(project_id) {
    return project_id.slice(0, -5)
  }

  @action
  async fetchList({
    workspace,
    cluster,
    limit,
    page,
    order,
    reverse,
    keyword,
  } = {}) {
    this.list.isLoading = true
    const params = {}

    if (workspace) {
      params.labelSelector = `kubesphere.io/workspace=${workspace}`
    }

    if (limit !== Infinity) {
      params.paging = `limit=${limit || 10},page=${page || 1}`
    }

    if (keyword) {
      params.conditions = getFilterString({ keyword })
    }

    if (order) {
      params.orderBy = order
    }

    if (reverse) {
      params.reverse = true
    }

    const result = await request.get(
      this.getDevOpsUrl({ cluster, workspace }),
      params,
      null,
      () => {}
    )

    const items = Array.isArray(get(result, 'items'))
      ? get(result, 'items')
      : []

    this.devopsListData = items

    const data = items.map(item => ({
      cluster,
      ...this.mapper(item),
    }))

    this.list.update({
      data,
      total: get(result, 'total_count') || data.length || 0,
      limit: Number(limit) || 10,
      page: Number(page) || 1,
      order,
      reverse,
      keyword,
      cluster: globals.app.isMultiCluster ? cluster : undefined,
      isLoading: false,
      selectedRowKeys: [],
    })
  }

  @action
  create(data, { cluster, workspace }) {
    data.kind = 'DevOpsProject'
    data.apiVersion = 'devops.kubesphere.io/v1alpha3'
    data.metadata.labels = { 'kubesphere.io/workspace': workspace }
    return this.submitting(
      request.post(this.getDevOpsUrl({ cluster, workspace }), data)
    )
  }

  @action
  update({ cluster, workspace, name }, item, isBaseInfoEditor = false) {
    let data = null
    if (isBaseInfoEditor) {
      data = this.itemDetail
    } else {
      const result = this.devopsListData.filter(
        v => v.metadata.uid === item.uid
      )

      data = result.length > 0 ? result[0] : null
    }

    if (data) {
      data = set(
        data,
        'metadata.annotations["kubesphere.io/description"]',
        item.description
      )

      return this.submitting(
        request.put(
          `${this.getDevOpsDetailUrl({ cluster, workspace, devops: name })}`,
          data,
          {
            headers: {
              'content-type': 'application/json',
            },
          }
        )
      )
    }
  }

  @action
  delete({ name, cluster, workspace }) {
    return this.submitting(
      request.delete(
        `${this.getDevOpsDetailUrl({ workspace, cluster, devops: name })}`
      )
    )
  }

  @action
  batchDelete(rowKeys, params) {
    const { workspace, cluster, name } = params
    return this.submitting(
      Promise.all(
        rowKeys.map(project_id =>
          request.delete(
            `${this.getDevOpsDetailUrl({
              workspace,
              cluster,
              devops: name,
            })}/${project_id}`
          )
        )
      )
    )
  }

  @action
  async fetchDetail({ cluster, project_id, workspace }) {
    const devops = this.getDevops(project_id)
    const detail = await request.get(
      this.getDevOpsDetailUrl({ workspace, cluster, devops }),
      null,
      null,
      res => {
        if (res.reason === 'Not Found' || res.reason === 'Forbidden') {
          global.navigateTo('/404')
        }
      }
    )

    this.itemDetail = detail
    const data = { cluster, ...this.mapper(detail) }
    this.devops = data.name
    this.project_id = data.namespace
    data.workspace = data.workspace || workspace
    this.data = data
  }

  @action
  async fetchRoles({ cluster, project_id }) {
    this.roles.isLoading = true
    const result = await request.get(
      `${this.getListUrl({ cluster })}/${project_id}/defaultroles`
    )
    if (isArray(result)) {
      this.roles.data = result.map(role => {
        role.description = t(`pipeline_${role.name}`)
        return role
      })
      this.roles.total = result.length
    }
    this.roles.isLoading = false
  }

  @action
  setSelectRowKeys(key, selectedRowKeys) {
    this[key] && this[key].selectedRowKeys.replace(selectedRowKeys)
  }
}
