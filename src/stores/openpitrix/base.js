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
import { get, isEmpty, omit } from 'lodash'

import { MAX_LIMIT } from 'configs/openpitrix/app'
import { getFilterString } from 'utils'

export default class Base {
  sortKey = 'create_time'

  defaultStatus = []

  defaultRepo = ''

  @observable
  list = {
    data: [],
    page: 0,
    limit: 10,
    total: 0,
    reverse: false,
    filters: {},
    isLoading: true,
    keyword: '',
    selectedRowKeys: [],
    setSelectRowKeys: this.setSelectRowKeys,
  }

  @observable
  detail = {}

  @observable
  isLoading = true

  @observable
  isSubmitting = false

  get baseUrl() {
    return 'kapis/openpitrix.io/v1'
  }

  getPath({ workspace, cluster, namespace }) {
    let path = ''
    if (workspace) {
      path += `/workspaces/${workspace}`
    }
    if (globals.app.isMultiCluster && cluster) {
      path += `/clusters/${cluster}`
    }
    if (namespace) {
      path += `/namespaces/${namespace}`
    }
    return path
  }

  getUrl = ({ workspace, app_id, version_id, name } = {}) => {
    let prefix = this.baseUrl

    if (workspace) {
      prefix += `/workspaces/${workspace}`
    }

    if (version_id) {
      const suffix = this.resourceName === 'versions' ? '' : this.resourceName
      return `${prefix}/apps/${app_id}/versions/${version_id}/${name || suffix}`
    }

    if (app_id) {
      const suffix = this.resourceName === 'apps' ? '' : this.resourceName
      return `${prefix}/apps/${app_id}/${name || suffix}`
    }

    return `${prefix}/${name || this.resourceName}`
  }

  @action
  submitting = (promise, time = 500) => {
    this.isSubmitting = true
    setTimeout(() => {
      promise
        .catch(() => {})
        .finally(() => {
          this.isSubmitting = false
        })
    }, time)

    return promise
  }

  getConditions = ({ status, app_id, version_id, repo_id } = {}) => {
    const conditions = {
      status: status || this.defaultStatus,
    }

    if (this.resourceName === 'applications') {
      conditions.app_id = app_id
      conditions.version_id = version_id
    }

    if (repo_id || this.defaultRepo) {
      conditions.repo_id = repo_id || this.defaultRepo
    }

    return conditions
  }

  @action
  fetchList = async ({
    limit,
    page,
    noLimit,
    status,
    app_id,
    version_id,
    repo_id,
    statistics,
    order,
    reverse,
    more,
    workspace,
    ...filters
  } = {}) => {
    this.list.isLoading = true

    const conditions = this.getConditions({
      status,
      app_id,
      version_id,
      repo_id,
    })

    const params = {
      orderBy: order || this.sortKey,
      paging: `limit=${noLimit ? MAX_LIMIT : limit || 10},page=${page || 1}`,
      conditions: getFilterString(conditions),
    }

    if (reverse === undefined) {
      reverse = true
    }

    if (!isEmpty(filters)) {
      const filterStr = getFilterString(filters)
      params.conditions += filterStr ? `,${filterStr}` : ''
    }

    if (reverse) {
      params.reverse = true
    }

    if (statistics) {
      params.statistics = true
    }

    const result = await request.get(
      this.getUrl({ workspace, app_id, version_id }),
      params,
      {},
      this.reject
    )

    const data = get(result, 'items', []).map(item => ({ ...item, workspace }))
    Object.assign(this.list, {
      data: more ? [...this.list.data, ...data] : data,
      total: get(result, 'total_count', 0),
      isLoading: false,
      limit: Number(limit) || 10,
      page: Number(page) || 1,
      order,
      reverse,
      filters: omit(filters, ['isv', 'workspace', 'category_id']),
      selectedRowKeys: [],
    })
  }

  @action
  fetchDetail = async ({
    app_id,
    appId,
    version_id,
    workspace,
    ...params
  } = {}) => {
    this.isLoading = true

    const result = await request.get(
      this.getUrl({ app_id: app_id || appId, version_id, workspace }),
      params,
      {},
      this.reject
    )

    this.detail = result || {}
    this.detail.workspace = workspace
    this.isLoading = false
  }

  @action
  create = async ({ app_id, version_id, workspace, ...data } = {}) => {
    await this.submitting(
      request.post(this.getUrl({ app_id, workspace, version_id }), data)
    )
  }

  @action
  update = async ({ app_id, version_id, workspace, ...data } = {}) => {
    await this.submitting(
      request.patch(this.getUrl({ app_id, workspace, version_id }), data)
    )
  }

  @action
  delete = async data => {
    delete data.name
    await this.submitting(request.delete(this.getUrl(data)))
  }

  @action
  clearSearch() {
    this.list.keyword = ''
  }

  @action
  setSelectRowKeys = keys => {
    this.list.selectedRowKeys = keys
  }

  reject = res => {
    this.isSubmitting = false
    this.isLoading = false
    window.onunhandledrejection(res)
  }
}
