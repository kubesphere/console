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
import ObjectMapper from 'utils/object.mapper'

import { LIST_DEFAULT_ORDER, API_VERSIONS } from 'utils/constants'

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
    return API_VERSIONS[this.module] || ''
  }

  get mapper() {
    return ObjectMapper[this.module] || (data => data)
  }

  getPath({ cluster, namespace } = {}) {
    let path = ''
    if (cluster) {
      path += `/klusters/${cluster}`
    }
    if (namespace) {
      path += `/namespaces/${namespace}`
    }
    return path
  }

  getListUrl = (params = {}) =>
    `${this.apiVersion}${this.getPath(params)}/${this.module}${
      params.dryRun ? '?dryRun=All' : ''
    }`

  getDetailUrl = (params = {}) => `${this.getListUrl(params)}/${params.name}`

  getWatchListUrl = (params = {}) =>
    `${this.apiVersion}/watch${this.getPath(params)}/${this.module}`

  getWatchUrl = (params = {}) =>
    `${this.getWatchListUrl(params)}/${params.name}`

  getResourceUrl = (params = {}) =>
    `kapis/resources.kubesphere.io/v1alpha3${this.getPath(params)}/${
      this.module
    }`

  getFilterParams = params => {
    const result = { ...params }
    if (result.app) {
      result.labelSelector = result.labelSelector || ''
      result.labelSelector += `app.kubernetes.io/name=${result.app}`
      delete result.app
    }
    return result
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
    cluster,
    workspace,
    namespace,
    more,
    devops,
    ...params
  } = {}) {
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
      this.getResourceUrl({ cluster, workspace, namespace, devops }),
      this.getFilterParams(params)
    )
    const data = get(result, 'items', []).map(item => ({
      cluster,
      ...this.mapper(item),
    }))

    this.list.update({
      data: more ? [...this.list.data, ...data] : data,
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
  async fetchListByK8s({ cluster, namespace, module, ...rest } = {}) {
    this.list.isLoading = true

    if (module) {
      this.module = module
    }

    const params = rest

    const result = await request.get(
      this.getListUrl({ cluster, namespace, module }),
      params
    )
    const data = result.items.map(item => ({
      cluster,
      module: module || this.module,
      ...this.mapper(item),
    }))

    this.list.update({
      data,
      total: result.items.length,
      isLoading: false,
    })

    return data
  }

  @action
  async fetchDetail(params) {
    this.isLoading = true

    const result = await request.get(this.getDetailUrl(params))
    const detail = { ...params, ...this.mapper(result) }

    this.detail = detail
    this.isLoading = false
    return detail
  }

  @action
  setSelectRowKeys(selectedRowKeys) {
    this.list.selectedRowKeys.replace(selectedRowKeys)
  }

  @action
  create(data, params = {}) {
    return this.submitting(request.post(this.getListUrl(params), data))
  }

  @action
  async update(params, newObject) {
    const result = await request.get(this.getDetailUrl(params))
    const resourceVersion = get(result, 'metadata.resourceVersion')
    if (resourceVersion) {
      set(newObject, 'metadata.resourceVersion', resourceVersion)
    }
    return this.submitting(request.put(this.getDetailUrl(params), newObject))
  }

  @action
  patch(params, newObject) {
    return this.submitting(request.patch(this.getDetailUrl(params), newObject))
  }

  @action
  delete(params) {
    return this.submitting(request.delete(this.getDetailUrl(params)))
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
  checkName(params) {
    return request.get(
      this.getDetailUrl(params),
      {},
      {
        headers: { 'x-check-exist': true },
      }
    )
  }

  @action
  checkLabels({ labels, ...params }) {
    return request.get(
      this.getListUrl(params),
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
