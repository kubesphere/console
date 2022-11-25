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
import { action, observable, extendObservable } from 'mobx'
import ObjectMapper from 'utils/object.mapper'

export default class CRDResourceStore {
  @observable
  list = {
    data: [],
    page: 1,
    limit: 10,
    total: 0,
    continues: { 1: '' },
    isLoading: true,
  }

  constructor({ module, kind, apiVersion }) {
    this.module = module
    this.kind = kind
    this.apiVersion = apiVersion
  }

  get mapper() {
    return ObjectMapper.default
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
    `${this.apiVersion}${this.getPath(params)}/${this.module}`

  getDetailUrl = (params = {}) => `${this.getListUrl(params)}/${params.name}`

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
    namespace,
    page = this.list.page,
    name,
    ...rest
  } = {}) {
    this.list.isLoading = true

    const params = rest

    if (!params.limit) {
      params.limit = this.list.limit
    } else {
      this.list.limit = params.limit
    }

    if (this.list.continues[page]) {
      params.continue = this.list.continues[page]
    }

    if (name) {
      params.fieldSelector = `metadata.name=${name}`
    }

    const result = await request.get(
      this.getListUrl({ cluster, namespace }),
      params
    )

    const data = result.items.map(item => ({
      cluster,
      namespace,
      ...this.mapper(item),
    }))

    this.list.continues[Number(page) + 1] = result.metadata.continue

    if (page === 1) {
      this.list.total = data.length + (result.metadata.remainingItemCount || 0)
    }

    extendObservable(this.list, { data, page: Number(page), name })

    this.list.isLoading = false
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
}
