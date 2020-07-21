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
import { get, omit } from 'lodash'

import ObjectMapper from 'utils/object.mapper'
import Base from 'stores/base'

import { getLevelPath } from './path'

export default class AlertStoreBase extends Base {
  constructor(level) {
    super()

    this.module = 'alert'
    this.level = level
  }

  get apiVersion() {
    return 'kapis/alerting.kubesphere.io/v1'
  }

  get itemsKey() {
    return `${this.module}detail_set`
  }

  get mapper() {
    return ObjectMapper[this.module] || (data => data)
  }

  getListUrl = params => {
    const path = getLevelPath(params, this.level)
    return `${this.apiVersion}${path}/${this.module}`
  }

  getDetailUrl = ({ name, ...params }) =>
    `${this.getListUrl(params)}?${this.module}_names=${name}`

  @action
  async fetchList({
    node,
    cluster,
    workspace,
    namespace,
    pod,
    status,
    reverse = false,
    limit = 10,
    page = 1,
    more = false,
    ...filters
  } = {}) {
    this.list.isLoading = true

    const levels = {
      cluster,
      node,
      workspace,
      namespace,
      pod,
    }
    const params = {
      ...filters,
    }

    if (limit !== Infinity) {
      params.limit = limit
      params.offset = (Number(page) - 1) * limit || 0
    }

    if (params.keyword) {
      params.search_word = params.keyword
      delete params.keyword
    }

    if (status) {
      params.events = status
    }

    if (reverse) {
      params.reverse = true
    }

    const api = this.getListUrl(levels)
    const result = await request.get(api, params)
    const items = (result[this.itemsKey] || []).map(item => ({
      ...this.mapper(item),
      cluster,
      namespace,
    }))

    this.list.update({
      data: more ? [...this.list.data, ...items] : items,
      total: result.total || 0,
      limit: Number(limit) || 10,
      page: Number(page) || 1,
      status,
      reverse,
      filters: omit(filters, ['namespace', 'sort_key']),
      isLoading: false,
      selectedRowKeys: [],
    })
  }

  @action
  async fetchDetail(params = {}) {
    this.isLoading = true

    const result = await request.get(this.getDetailUrl(params))
    const data = this.mapper(get(result, `[${this.itemsKey}][0]`) || {})

    this.detail = { cluster: params.cluster, ...data }
    this.isLoading = false

    return data
  }

  @action
  delete({ name, ...params }) {
    return this.submitting(
      request.delete(this.getDetailUrl({ name, ...params }))
    )
  }

  @action
  batchDelete(rowKeys) {
    return this.submitting(
      Promise.all(
        rowKeys.map(name => {
          const item = this.list.data.find(_item => _item.name === name)
          return request.delete(this.getDetailUrl(item))
        })
      )
    )
  }

  @action
  patch({ name, ...params }, newObject) {
    return this.submitting(
      request.patch(this.getDetailUrl({ name, ...params }), newObject)
    )
  }
}
