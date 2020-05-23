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
import { getFilterString, formatRules } from 'utils'

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
  project_name = ''

  getBaseUrlV2 = () => 'kapis/devops.kubesphere.io/v1alpha2/'

  getResourceUrl = ({ workspace }) =>
    `${this.getBaseUrlV2()}workspaces/${workspace}/devops`

  getDetailUrlV2 = project_id => `${this.getDevopsUrlV2()}/${project_id}`

  getBaseUrl = () => `${this.apiVersion}/`

  getDevOpsUrl = () => `${this.getBaseUrl()}devopsprojects`

  getDevOpsDetailUrl = name => `${this.getBaseUrl()}devopsprojects/${name}`

  getWatchListUrl = () => `${this.getBaseUrl()}/watch/devopsprojects/`

  getWatchUrl = (params = {}) => `${this.getWatchListUrl()}/${params.name}`

  @action
  async fetchList({ workspace, limit, page, order, reverse, keyword } = {}) {
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

    const result = await request.get(this.getDevOpsUrl(), params)

    this.devopsListData = get(result, 'items', [])

    const data = get(result, 'items', []).map(item => ({
      ...this.mapper(item),
    }))

    this.list.update({
      data,
      total: result.total_count || data.length || 0,
      limit: Number(limit) || 10,
      page: Number(page) || 1,
      order,
      reverse,
      keyword,
      isLoading: false,
      selectedRowKeys: [],
    })
  }

  @action
  create(data, { workspace }) {
    data.kind = 'DevOpsProject'
    data.apiVersion = 'devops.kubesphere.io/v1alpha3'
    data.metadata.labels = { 'kubesphere.io/workspace': workspace }

    return this.submitting(request.post(this.getDevOpsUrl(), data))
  }

  @action
  update(name, item, isBaseInfoEditor = false) {
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
        request.put(`${this.getDevOpsDetailUrl(name)}`, data, {
          headers: {
            'content-type': 'application/json',
          },
        })
      )
    }
  }

  @action
  delete({ name }) {
    return this.submitting(request.delete(`${this.getDevOpsDetailUrl(name)}`))
  }

  @action
  batchDelete(rowKeys, params) {
    return this.submitting(
      Promise.all(
        rowKeys.map(project_id =>
          request.delete(`${this.getDevOpsDetailUrl(params)}/${project_id}`)
        )
      )
    )
  }

  @action
  async fetchDetail({ project_id }) {
    const project_name = project_id.slice(0, -5)
    const detail = await request.get(
      this.getDevOpsDetailUrl(project_name),
      null,
      null,
      res => {
        if (res.reason === 'Not Found' || res.reason === 'Forbidden') {
          global.navigateTo('/404')
        }
      }
    )

    this.itemDetail = detail
    const data = this.mapper(detail)
    this.project_name = data.name
    this.project_id = data.namespace
    this.data = data
  }

  @action
  async fetchRules({ project_id }) {
    this.initializing = true
    const rules = await request.get(
      `kapis/tenant.kubesphere.io/v1alpha2/devops/${project_id}/rules`,
      null,
      null,
      () => []
    )
    if (rules) {
      const formatedRules = formatRules(rules)

      if (project_id === globals.config.systemWorkspace) {
        Object.keys(formatedRules).forEach(key => {
          formatedRules[key] = globals.config.systemWorkspaceProjectRules[
            key
          ] || ['view', 'edit']
        })
      }
      set(globals.user, `rules[${project_id}]`, formatedRules)
    }

    this.initializing = false
  }
  @action
  async fetchRoles({ project_id }) {
    this.roles.isLoading = true
    const result = await request.get(
      `${this.getListUrl()}/${project_id}/defaultroles`
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
