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

import { observable, action } from 'mobx'
import { Notify } from 'components/Base'
import cookie from 'utils/cookie'

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

  getPath({ cluster, workspace, namespace } = {}) {
    let path = ''
    if (cluster) {
      path = `/klusters/${cluster}`
    }
    if (workspace) {
      path = `/workspaces/${workspace}`
    }
    if (namespace) {
      path = cluster
        ? `/klusters/${cluster}/namespaces/${namespace}`
        : `/namespaces/${namespace}`
    }
    return path
  }

  getResourceUrl = (params = {}) =>
    `kapis/iam.kubesphere.io/v1alpha2${this.getPath(params)}/users`

  getListUrl = this.getResourceUrl

  @action
  async fetchLogs({ name }) {
    this.logs.isLoading = true

    const result = await request.get(`k${this.getDetailUrl({ name })}/logs`)

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
