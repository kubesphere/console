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
import { observable, action } from 'mobx'
import { Notify } from 'components/Base'
import cookie from 'utils/cookie'
import { LIST_DEFAULT_ORDER } from 'utils/constants'

import Base from './base'

export default class UsersStore extends Base {
  @observable
  logs = {
    data: [],
    total: 0,
    isLoading: true,
  }

  @observable
  roles = []

  module = 'users'

  getResourceUrl = ({ project_id }) =>
    `kapis/iam.kubesphere.io/v1alpha2/devopsprojects/${project_id}/users`

  getDetailUrl = ({ project_id, name }) => {
    ;`${this.getResourceUrl(project_id)}/${name}`
  }

  getFetchUrl = ({ project_id }) =>
    `kapis/iam.kubesphere.io/v1alpha2/namespaces/${project_id}/users`

  getWorkspaceUrl = ({ workspace }) =>
    `kapis/iam.kubesphere.io/v1alpha2/workspaces/${workspace}/users`

  @action
  async fetchList({ project_id, workspace, ...params } = {}) {
    this.list.isLoading = true

    if (!params.sortBy && params.ascending === undefined) {
      params.sortBy = LIST_DEFAULT_ORDER[this.module] || 'createTime'
    }

    if (params.limit === Infinity || params.limit === -1) {
      params.limit = -1
      params.page = 1
    }

    if (params.namespace) {
      delete params.namespace
    }

    params.limit = params.limit || 10

    const url = project_id
      ? this.getFetchUrl({ project_id })
      : this.getWorkspaceUrl({ workspace })

    const result = await request.get(url, params)
    const data = get(result, 'items', []).map(item => ({
      ...this.mapper(item),
    }))

    this.list.update({
      data,
      total: result.totalItems || result.total_count || data.length || 0,
      ...params,
      limit: Number(params.limit) || 10,
      page: Number(params.page) || 1,
      isLoading: false,
      ...(this.list.silent ? {} : { selectedRowKeys: [] }),
    })

    return data
  }

  @action
  async fetchLogs({ name }) {
    this.logs.isLoading = true

    const result = await request.get(`${this.getDetailUrl({ name })}/logs`)

    this.logs.data = result
    this.logs.isLoading = false
  }

  @action
  checkEmail(email) {
    return request.get(
      `${this.getListUrl()}`,
      { email },
      {
        headers: { 'x-check-exist': true },
      }
    )
  }

  @action
  async update({ name, ...params }, data) {
    await this.submitting(
      request.put(this.getDetailUrl({ name, ...params }), data)
    )

    if (data.password && name === globals.user.username) {
      return await request.post('logout')
    }

    if (data.lang && data.lang !== cookie('lang')) {
      cookie('lang', data.lang, { path: '/' })
      window.location.reload()
    }
  }

  @action
  async batchDelete({ rowKeys, ...params }) {
    if (rowKeys.includes(globals.user.username)) {
      Notify.error(t('Error Tips'), t('Unable to delete itself'))
    } else {
      await this.submitting(
        Promise.all(
          rowKeys.map(username =>
            request.delete(
              `${this.getDetailUrl({ name: username, ...params })}`
            )
          )
        )
      )
    }
    this.list.selectedRowKeys = []
  }

  @action
  delete(user) {
    if (user.name === globals.user.username) {
      Notify.error(t('Error Tips'), t('Unable to delete itself'))
      return
    }

    return this.submitting(request.delete(`${this.getDetailUrl(user)}`))
  }
}
