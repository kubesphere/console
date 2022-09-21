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

import { get, set } from 'lodash'
import { action, observable } from 'mobx'

import { LIST_DEFAULT_ORDER } from 'utils/constants'
import BaseStore from 'stores/base'

export default class Base extends BaseStore {
  get apiVersion() {
    return 'kapis/notification.kubesphere.io/v2beta1'
  }

  @observable
  resourceVersion = ''

  getPath({ user }) {
    let path = ''
    if (user) {
      path += `/users/${user}`
    }
    return path
  }

  getResourceUrl = (params = {}) =>
    `${this.apiVersion}${this.getPath(params)}/${this.module}`

  @action
  async fetchList({ more, user, ...params } = {}) {
    this.list.isLoading = true

    if (!params.sortBy && params.ascending === undefined) {
      params.sortBy = LIST_DEFAULT_ORDER[this.module] || 'createTime'
    }

    if (params.limit === Infinity || params.limit === -1) {
      params.limit = -1
      params.page = 1
    }

    params.limit = params.limit || 10

    const result = await request.get(
      this.getResourceUrl({ user }),
      this.getFilterParams(params)
    )
    const data = (get(result, 'items') || []).map(item => ({
      ...this.mapper(item),
    }))

    this.list.update({
      data: more ? [...this.list.data, ...data] : data,
      total:
        result.totalItems ||
        result.total_count ||
        result.total ||
        data.length ||
        0,
      ...params,
      limit: Number(params.limit) || 10,
      page: Number(params.page) || 1,
      isLoading: false,
      ...(this.list.silent ? {} : { selectedRowKeys: [] }),
    })

    return data
  }

  @action
  async getResource(params) {
    const result = await request.get(
      this.getDetailUrl(params),
      {},
      null,
      () => {
        return {}
      }
    )
    const resourceVersion = get(result, 'metadata.resourceVersion')
    this.resourceVersion = resourceVersion || ''
    return resourceVersion !== undefined
  }

  @action
  async update(params, newObject) {
    if (!this.resourceVersion) {
      await this.getResource(params)
    }
    set(newObject, 'metadata.resourceVersion', this.resourceVersion)
    return this.submitting(request.put(this.getDetailUrl(params), newObject))
  }
}
