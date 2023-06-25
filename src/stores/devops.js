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

import { cloneDeep, get, isArray, omit, set } from 'lodash'
import { action, observable } from 'mobx'

import Base from 'stores/base'

import RoleStore from 'stores/role'
import { eventBus } from 'utils/EventBus'
import { eventKeys } from 'utils/events'

export default class DevOpsStore extends Base {
  @observable
  initializing = true

  roleStore = new RoleStore()

  module = 'devops'

  hostName = ''

  hostDetail = {}

  @observable
  roles = {
    data: [],
    page: 1,
    total: 0,
    isLoading: true,
  }

  @observable
  data = {}

  detail = {}

  @observable
  devopsListData = []

  @observable
  devops = ''

  @observable
  devopsName = ''

  getPath({ cluster, namespace, workspace, devops } = {}) {
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
    if (devops) {
      path += `/devops/${devops}`
    }
    return path
  }

  getDevopsUrlV2 = params =>
    `kapis/devops.kubesphere.io/v1alpha2${this.getPath(params)}/`

  getDevopsUrlV3 = params =>
    `kapis/devops.kubesphere.io/v1alpha3${this.getPath(params)}/`

  getDevopsTenantUrl = params =>
    `kapis/tenant.kubesphere.io/v1alpha2${this.getPath(params)}/devops`

  getResourceUrl = params => `${this.getDevopsUrlV2(params)}`

  getBaseUrl = params => `${this.apiVersion}${this.getPath(params)}/`

  getWatchListUrl = ({ workspace, ...params }) => {
    return `apis/devops.kubesphere.io/v1alpha3/watch${this.getPath(
      params
    )}/devopsprojects?labelSelector=kubesphere.io/workspace=${workspace}`
  }

  getWatchAllListUrl = ({ workspace, ...params }) => {
    return `apis/devops.kubesphere.io/v1alpha3/watch${this.getPath(
      params
    )}/devopsprojects`
  }

  getWatchUrl = (params = {}) =>
    `${this.getWatchListUrl(params)}/${params.name}`

  getDevops(devops) {
    return devops.slice(0, -5)
  }

  @action
  async fetchList({ workspace, cluster, more, ...params } = {}) {
    this.list.isLoading = true

    if (params.limit === Infinity || params.limit === -1) {
      params.limit = -1
      params.page = 1
    } else {
      params.limit = params.limit || 10
    }

    const result =
      (await request
        .get(this.getDevopsTenantUrl({ cluster, workspace }), params)
        .catch(() => {})) || {}

    const items = Array.isArray(get(result, 'items'))
      ? get(result, 'items')
      : []

    this.devopsListData = items

    const data = items.map(item => ({
      cluster,
      ...this.mapper(item),
    }))

    this.list.update({
      data: more ? [...this.list.data, ...data] : data,
      total: result.totalItems || data.length || 0,
      limit: Number(params.limit) || 10,
      page: Number(params.page) || 1,
      cluster: globals.app.isMultiCluster ? cluster : undefined,
      isLoading: false,
      ...(this.list.silent ? {} : { selectedRowKeys: [] }),
      ...omit(params, ['limit', 'page']),
    })

    data.forEach(item => {
      eventBus.emit(eventKeys.DEVOPS_CHANGE, item)
    })
  }

  @action
  checkNewName(params, query) {
    return request.get(
      `/kapis/devops.kubesphere.io/v1alpha3${this.getPath(params)}`,
      { ...query }
    )
  }

  @action
  checkDevopsName(params, isOld) {
    if (isOld) {
      return this.checkName(
        {
          ...params,
        },
        {
          generateName: true,
        }
      )
    }
    return this.checkNewName(
      {
        ...params,
        devops: params.name,
      },
      {
        // devopsName: params.name,
        check: true,
        generateName: true,
      }
    )
  }

  @action
  async create(data, { cluster, workspace }) {
    data.kind = 'DevOpsProject'
    data.apiVersion = 'devops.kubesphere.io/v1alpha3'
    data.metadata.labels = { 'kubesphere.io/workspace': workspace }
    const res = await this.submitting(
      request.post(`${this.getBaseUrl({ cluster, workspace })}devops`, data)
    )
    this.afterChange(res, { cluster, workspace })
    return res
  }

  @action
  async update({ cluster, workspace, devops }, newData) {
    await this.fetchDetail({ cluster, workspace, devops })
    const data = cloneDeep(this.itemDetail)

    if (data) {
      set(
        data,
        'metadata.annotations["kubesphere.io/description"]',
        newData.description
      )

      set(
        data,
        'metadata.annotations["kubesphere.io/alias-name"]',
        newData.aliasName
      )

      const res = await this.submitting(
        request.put(
          `${this.getBaseUrl({ cluster, workspace, devops })}`,
          data,
          {
            headers: {
              'content-type': 'application/json',
            },
          }
        )
      )
      this.afterChange(res, { cluster, workspace, devops })
      return res
    }
  }

  @action
  async editAllowlist({ cluster, workspace, devops }, newData) {
    await this.fetchDetail({ cluster, workspace, devops })
    const data = cloneDeep(this.itemDetail)
    set(data, 'spec.argo', get(newData, 'spec.argo'))

    return this.submitting(
      request.put(`${this.getBaseUrl({ cluster, workspace, devops })}`, data, {
        headers: {
          'content-type': 'application/json',
        },
      })
    )
  }

  @action
  async delete({ devops, cluster, workspace }) {
    const res = await this.submitting(
      request.delete(`${this.getBaseUrl({ workspace, cluster, devops })}`)
    )
    this.afterDelete({ workspace, cluster, devops })
    return res
  }

  @action
  batchDelete(rowKeys, params) {
    const { workspace, cluster, devops } = params
    return this.submitting(
      Promise.all(
        rowKeys.map(devopsName =>
          request.delete(
            `${this.getBaseUrl({
              workspace,
              cluster,
              devops: this.list.find(value => value.name === devopsName).devops,
            })}/${devops}`
          )
        )
      )
    )
  }

  @action
  async fetchDetail({ cluster, devops, workspace }) {
    const result = await request.get(
      this.getBaseUrl({ workspace, cluster, devops }),
      null,
      null,
      res => {
        if (res.reason === 'Not Found' || res.reason === 'Forbidden') {
          global.navigateTo('/404')
        }
      }
    )

    this.itemDetail = result
    const data = { cluster, ...this.mapper(result) }
    this.devopsName = data.name
    this.devops = data.devops
    data.workspace = data.workspace || workspace
    this.data = data
    this.detail = data
    return data
  }

  @action
  async fetchRoles({ cluster, devops }) {
    this.roles.isLoading = true
    const result = await request.get(
      `${this.getListUrl({ cluster })}/${devops}/defaultroles`
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
  setSelectRowKeys = selectedRowKeys => {
    this.list.selectedRowKeys = selectedRowKeys
  }

  @action
  async fetchListByUser({
    cluster,
    workspace,
    namespace,
    username,
    type,
    filters,
    ...params
  } = {}) {
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
      `kapis/tenant.kubesphere.io/v1alpha2/workspaces/${workspace}${this.getPath(
        { cluster, namespace }
      )}/workspacemembers/${username}/devops`,
      params
    )
    const data = get(result, 'items', []).map(item => ({
      cluster,
      ...this.mapper(item),
    }))

    this.list.update({
      data,
      total: result.totalItems || 0,
      ...params,
      ...filters,
      cluster: globals.app.isMultiCluster ? cluster : undefined,
      limit: Number(params.limit) || 10,
      page: Number(params.page) || 1,
      isLoading: false,
    })

    return data
  }

  afterChange = (d, { cluster }) => {
    eventBus.emit(eventKeys.DEVOPS_CHANGE, { ...this.mapper(d), cluster })
  }

  afterDelete = d => {
    eventBus.emit(eventKeys.DELETE_DEVOPS, { ...d, namespace: d.devops })
  }
}
