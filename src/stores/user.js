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
import { getFilterString } from 'utils'

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

  getListUrl = () => 'kapis/iam.kubesphere.io/v1alpha2/users'

  getDetailUrl = ({ name }) => `${this.getListUrl()}/${name}`

  getResourceUrl = () => this.getListUrl()

  @action
  async fetchList({ page = 1, limit = 10, more, keyword, ...params } = {}) {
    this.list.isLoading = true

    if (keyword) {
      params.conditions = getFilterString({ keyword })
    }

    if (limit !== Infinity) {
      params.paging = `limit=${limit || 10},page=${page || 1}`
    }

    if (params.reverse === undefined) {
      params.reverse = true
    }

    const result = await request.get(this.getResourceUrl(), params)

    this.list.update({
      data: more ? [...this.list.data, ...result.items] : result.items,
      total: result.total_count || 0,
      limit: Number(limit) || 10,
      page: Number(page) || 1,
      keyword,
      isLoading: false,
      selectedRowKeys: [],
    })
    return result
  }

  @action
  async fetchDetail({ name }) {
    this.isLoading = true

    const result = await request.get(this.getDetailUrl({ name }))

    this.detail = result
    this.isLoading = false
  }

  @action
  async fetchUserRoles({ username }) {
    const result = await request.get(
      `kapis/iam.kubesphere.io/v1alpha2/users/${username}/roles`
    )

    this.roles = result
  }

  @action
  async fetchLogs({ name }) {
    this.logs.isLoading = true

    const result = await request.get(`${this.getDetailUrl({ name })}/logs`)

    this.logs.data = result
    this.logs.isLoading = false
  }

  @action
  create(data) {
    return this.submitting(request.post(this.getListUrl(), data))
  }

  @action
  checkUserName(name) {
    return request.get(this.getListUrl(), { check: name })
  }

  @action
  checkEmail(email) {
    return request.get(this.getListUrl(), { check: email })
  }

  @action
  async update(data, { username } = {}) {
    const name = username || data.username || this.detail.username

    await this.submitting(request.put(this.getDetailUrl({ name }), data))

    if (data.password && name === globals.user.username) {
      return await request.post('logout')
    }

    if (data.lang && data.lang !== cookie('lang')) {
      cookie('lang', data.lang, { path: '/' })
      window.location.reload()
    }
  }

  @action
  async batchDelete(rowKeys) {
    if (rowKeys.includes(globals.user.username)) {
      Notify.error(t('Error Tips'), t('Unable to delete itself'))
    } else {
      await this.submitting(
        Promise.all(
          rowKeys.map(username =>
            request.delete(`${this.getDetailUrl({ name: username })}`)
          )
        )
      )
    }
    this.list.selectedRowKeys = []
  }

  @action
  delete({ username }) {
    if (username === globals.user.username) {
      Notify.error(t('Error Tips'), t('Unable to delete itself'))
      return
    }

    return this.submitting(
      request.delete(`${this.getDetailUrl({ name: username })}`)
    )
  }
}
