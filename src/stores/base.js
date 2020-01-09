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

import { get, isEmpty } from 'lodash'
import { action, observable } from 'mobx'
import ObjectMapper from 'utils/object.mapper'

import { getFilterString } from 'utils'

import List from './base.list'

export default class BaseStore {
  list = new List()

  @observable
  detail = {}

  @observable
  isLoading = true

  @observable
  isSubmitting = false

  constructor(module) {
    this.module = module
  }

  get apiVersion() {
    return 'apis/apps/v1'
  }

  get mapper() {
    return ObjectMapper[this.module] || (data => data)
  }

  getListUrl = ({ namespace }) =>
    `${this.apiVersion}/namespaces/${namespace}/${this.module}`

  getDetailUrl = ({ name, namespace }) =>
    `${this.getListUrl({ namespace })}/${name}`

  getWatchListUrl = ({ namespace }) =>
    `${this.apiVersion}/watch/namespaces/${namespace}/${this.module}`

  getWatchUrl = ({ name, namespace }) =>
    `${this.getWatchListUrl({ namespace })}/${name}`

  getResourceUrl = ({ namespace }) => {
    const namespacePath = namespace ? `/namespaces/${namespace}` : ''

    return `kapis/resources.kubesphere.io/v1alpha2${namespacePath}/${
      this.module
    }`
  }

  @action
  setModule(module) {
    this.module = module
  }

  @action
  submitting = promise => {
    this.isSubmitting = true

    setTimeout(() => {
      promise
        .catch(() => {})
        .finally(() => {
          this.isSubmitting = false
        })
    }, 500)

    return promise
  }

  @action
  async fetchList({
    limit,
    page,
    order,
    reverse,
    workspace,
    namespace,
    more,
    resources = [],
    conditions,
    ...filters
  } = {}) {
    this.list.isLoading = true

    const params = {}

    if (limit === Infinity || limit === -1) {
      limit = -1
      page = 1
    }

    if (!isEmpty(resources)) {
      filters.name = resources.join('|')
    }

    if (!isEmpty(filters) || conditions) {
      params.conditions = conditions || getFilterString(filters)
    }

    params.paging = `limit=${limit || 10},page=${page || 1}`

    if (order) {
      params.orderBy = order
    }

    if (reverse) {
      params.reverse = true
    }

    const result = await request.get(this.getResourceUrl({ namespace }), params)
    const data = get(result, 'items', []).map(this.mapper)

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

  @action
  async fetchListByK8s({ namespace, labelSelector, ...rest }) {
    this.list.isLoading = true

    if (!namespace) {
      this.list.isLoading = false
      return
    }

    const params = rest

    if (!isEmpty(labelSelector)) {
      params.labelSelector = labelSelector
    }

    const result = await request.get(this.getListUrl({ namespace }), params)
    const data = result.items.map(this.mapper)

    this.list.update({
      data,
      total: result.items.length,
      isLoading: false,
    })

    return data
  }

  @action
  async fetchDetail({ name, namespace }) {
    this.isLoading = true

    const result = await request.get(this.getDetailUrl({ name, namespace }))
    const detail = this.mapper(result)

    this.detail = detail
    this.isLoading = false
    return detail
  }

  @action
  setSelectRowKeys(selectedRowKeys) {
    this.list.selectedRowKeys.replace(selectedRowKeys)
  }

  @action
  create(data) {
    const namespace = get(data, 'metadata.namespace')

    if (!namespace) {
      return
    }

    return this.submitting(request.post(this.getListUrl({ namespace }), data))
  }

  @action
  update({ name, namespace }, newObject) {
    return this.submitting(
      request.put(this.getDetailUrl({ name, namespace }), newObject)
    )
  }

  @action
  patch({ name, namespace }, newObject) {
    return this.submitting(
      request.patch(this.getDetailUrl({ name, namespace }), newObject)
    )
  }

  @action
  delete({ name, namespace }) {
    return this.submitting(
      request.delete(this.getDetailUrl({ name, namespace }))
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
  checkName({ name, namespace }) {
    return request.get(
      this.getDetailUrl({ name, namespace }),
      {},
      {
        headers: { 'x-check-exist': true },
      }
    )
  }

  @action
  checkLabels({ labels, namespace }) {
    return request.get(
      this.getDetailUrl({ name, namespace }),
      {
        labelSelector: Object.keys(labels)
          .map(key => `${key}=${labels[key]}`)
          .join(','),
      },
      { headers: { 'x-check-exist': true } }
    )
  }

  reject = res => {
    this.isSubmitting = false
    window.onunhandledrejection(res)
  }
}
