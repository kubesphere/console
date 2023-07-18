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

import { get, isEmpty, set } from 'lodash'
import { action, observable } from 'mobx'

import { API_VERSIONS, LIST_DEFAULT_ORDER } from 'utils/constants'
import ObjectMapper from 'utils/object.mapper'

import List from './base.list'

export default class BaseStore {
  list = new List()

  @observable
  detail = {}

  @observable
  isLoading = true

  @observable
  isSubmitting = false

  @observable
  ksVersion = 3.1

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
    const data = (get(result, 'items') || []).map(item => ({
      cluster,
      namespace,
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
      params,
      {},
      () => {
        return { items: [] }
      }
    )

    const data = Array.isArray(result.items)
      ? result.items.map(item => ({
          cluster,
          module: module || this.module,
          ...this.mapper(item),
        }))
      : []

    this.list.update({
      data,
      total: result.items.length || 0,
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
  async fetchDetailWithoutWarning(params) {
    let urlNotSupport = false
    this.isLoading = true

    const result = await request.get(
      this.getDetailUrl(params),
      {},
      {},
      (error, response) => {
        if (error) {
          if (error.status === 404) {
            urlNotSupport = true
          }
          return {}
        }
        return response
      }
    )

    if (urlNotSupport) {
      return { urlNotSupport }
    }

    const detail = !isEmpty(result) ? { ...params, ...this.mapper(result) } : {}

    this.detail = detail
    this.isLoading = false
    return detail
  }

  @action
  setSelectRowKeys(selectedRowKeys) {
    this.list.selectedRowKeys.replace(selectedRowKeys)
  }

  @action
  async create(data, params = {}) {
    const res = await this.submitting(
      request.post(this.getListUrl(params), data)
    )
    if (this.afterChange) {
      this.afterChange(res)
    }
    return res
  }

  @action
  async update(params, newObject) {
    const result = await request.get(this.getDetailUrl(params))
    const resourceVersion = get(result, 'metadata.resourceVersion')
    if (resourceVersion) {
      set(newObject, 'metadata.resourceVersion', resourceVersion)
    }
    const res = this.submitting(
      request.put(this.getDetailUrl(params), newObject)
    )
    if (this.afterChange) {
      this.afterChange(res, params)
    }
    return res
  }

  @action
  async patch(params, newObject) {
    const res = await this.submitting(
      request.patch(this.getDetailUrl(params), newObject)
    )
    if (this.afterChange) {
      this.afterChange(res, params)
    }
    return res
  }

  @action
  async delete(params) {
    const res = await this.submitting(request.delete(this.getDetailUrl(params)))
    if (this.afterDelete) {
      this.afterDelete(res, params)
    }
    return res
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
  checkName(params, query) {
    return request.get(
      this.getDetailUrl(params),
      { ...query },
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

  async getKsVersion(params) {
    let result
    let ksVersion
    const configVersion = get(
      globals.clusterConfig,
      `${params.cluster}.ksVersion`,
      ''
    )
    if (configVersion !== '') {
      ksVersion = configVersion.replace(/[^\d.]/g, '')
    } else {
      if (globals.ksConfig.multicluster) {
        result = await request.get(`/kapis/clusters/${params.cluster}/version`)
      } else {
        result = await request.get(`/kapis/version`)
      }
      ksVersion = result.gitVersion.replace(/[^\d.]/g, '')
    }
    const version = Number(
      ksVersion
        .split('.')
        .slice(0, 2)
        .join('.')
    )
    this.ksVersion = version
    return version
  }
}
