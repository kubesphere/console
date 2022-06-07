/*
 * This file is part of KubeSphere Console.
 * Copyright (C) 2022 The KubeSphere Console Authors.
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

import { omit } from 'lodash'
import { action, observable } from 'mobx'
import Base from 'stores/base'

export default class CodeRepoStore extends Base {
  module = 'codeRepos'

  @observable
  list = {
    data: [],
    page: 1,
    limit: 10,
    total: 0,
    order: '',
    filters: {},
    isLoading: false,
    selectedRowKeys: [],
  }

  @observable
  detail = {}

  getPath({ namespace, cluster } = {}) {
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
    `${this.apiVersion}${this.getPath(params)}/gitrepositories${
      params.dryRun ? '?dryRun=All' : ''
    }`

  getResourceUrl = (params = {}) =>
    `${this.apiVersion}${this.getPath(params)}/gitrepositories`

  getDetailUrl = (params = {}) => `${this.getListUrl(params)}/${params.name}`

  @action
  setSelectRowKeys = selectedRowKeys => {
    this.list.selectedRowKeys = selectedRowKeys
  }

  @action
  async fetchList({ devops, workspace, cluster, more, ...params } = {}) {
    this.list.isLoading = true

    if (params.limit === Infinity || params.limit === -1) {
      params.limit = -1
      params.page = 1
    }

    params.limit = params.limit || 10

    const url = `${this.getResourceUrl({ namespace: devops, cluster })}`

    const result = await request.get(url, { ...params }, {}, () => {
      return []
    })

    const data = Array.isArray(result.items)
      ? result.items.map(item => {
          return { ...this.mapper({ ...item, devops }) }
        })
      : []

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
  async create({ data, devops, cluster }) {
    const url = `${this.getResourceUrl({ namespace: devops, cluster })}`
    const result = await request.post(url, data)
    return result
  }

  @action
  async edit({ data, devops, name, cluster }) {
    const url = `${this.getResourceUrl({ namespace: devops, cluster })}/${name}`
    return this.submitting(request.put(url, data))
  }

  @action
  async update(params, newObject) {
    const url = `${this.getResourceUrl({
      namespace: params.devops,
      cluster: params.cluster,
    })}/${newObject.metadata.name}`
    return this.submitting(request.put(url, newObject))
  }

  @action
  delete(params) {
    const _params = omit({ ...params, namespace: params.devops }, 'devops')
    return this.submitting(request.delete(this.getDetailUrl(_params)))
  }

  @action
  async fetchDetail(params) {
    const url = `${this.getResourceUrl({
      namespace: params.devops,
      cluster: params.cluster,
    })}/${params.name}`
    const result = await this.submitting(request.get(url), null, null, () => {
      return {}
    })

    const detail = this.mapper(result)
    this.detail = detail
    return detail
  }
}
