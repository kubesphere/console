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

import { action, toJS } from 'mobx'

import Base from 'stores/base'

export default class NotificationStoreBase extends Base {
  get apiVersion() {
    return 'kapis/notification.kubesphere.io/v1'
  }

  get itemsKey() {
    return `${this.module}_set`
  }

  getListUrl = (params = {}) =>
    `${this.apiVersion}${this.getPath(params)}/notifications`

  @action
  async fetchList({
    cluster,
    reverse = false,
    limit = 10,
    page = 1,
    more = false,
    ...filters
  }) {
    this.list.isLoading = true

    const params = {
      ...filters,
    }

    const result = await request.get(this.getListUrl({ cluster }), params)
    const items = result[this.itemsKey] || []

    this.list = {
      data: more ? [...this.list.data, ...items] : items,
      total: result.total || 0,
      limit: Number(limit) || 10,
      page: Number(page) || 1,
      reverse,
      filters,
      isLoading: false,
      selectedRowKeys: [],
    }

    return toJS(this.list.data)
  }

  @action
  create(params, data) {
    return this.submitting(request.post(this.getListUrl(params), data))
  }
}
