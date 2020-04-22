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

import { action } from 'mobx'
import { isEmpty, isArray } from 'lodash'

import { getFilterString } from 'utils'
import List from 'stores/base.list'

export default class UserStore {
  list = new List()

  get apiVersion() {
    return 'apis/iam.kubesphere.io/v1alpha2'
  }

  getListUrl = ({ workspace, namespace }) => {
    let path = '/users'

    if (workspace) {
      path = `/workspaces/${workspace}/members`
    }

    if (namespace) {
      path = `/namespaces/${namespace}/users`
    }

    return `${this.apiVersion}${path}`
  }

  @action
  async fetchList({
    workspace,
    namespace,
    order,
    reverse,
    limit = 10,
    page = 1,
    more = false,
    names = [],
    emails = [],
    ...filters
  } = {}) {
    this.list.isLoading = true

    const params = {}

    if (!isEmpty(names)) {
      filters.username = names.join('|')
    }

    if (!isEmpty(emails)) {
      filters.email = emails.join('|')
    }

    if (!isEmpty(filters)) {
      params.conditions = getFilterString(filters, ['name'])
    }

    if (limit !== Infinity) {
      params.paging = `limit=${limit || 10},page=${page || 1}`
    }

    if (order) {
      params.orderBy = order
    }

    if (reverse) {
      params.reverse = true
    }

    const result = await request.get(
      this.getListUrl({ workspace, namespace }),
      params
    )
    const data = isArray(result) ? result : result.items || []

    this.list.update({
      data: more ? [...this.list.data, ...data] : data,
      total: result.total_count || 0,
      limit: Number(limit) || 10,
      page: Number(page) || 1,
      order,
      reverse,
      filters,
      isLoading: false,
      selectedRowKeys: [],
    })

    return data
  }
}
