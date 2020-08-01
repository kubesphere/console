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

import { get, keyBy, findKey } from 'lodash'
import { action, observable } from 'mobx'
import { withDryRun } from 'utils'
import ObjectMapper from 'utils/object.mapper'
import { MODULE_KIND_MAP } from 'utils/constants'

import Base from 'stores/base'
import List from 'stores/base.list'

export default class FederatedStore extends Base {
  list = new List()

  @observable
  detail = {}

  @observable
  initializing = false

  @observable
  resources = {}

  @observable
  isResourcesLoading = false

  constructor(store) {
    super(store.module)
    this.resourceStore = store
  }

  get apiVersion() {
    return 'apis/types.kubefed.io/v1beta1'
  }

  getPath({ namespace }) {
    let path = ''
    if (namespace) {
      path += `/namespaces/${namespace}`
    }
    return path
  }

  getListUrl = params =>
    `${this.apiVersion}${this.getPath(params)}/federated${params.module ||
      this.module}${params.dryRun ? '?dryRun=All' : ''}`

  getDetailUrl = params => `${this.getListUrl(params)}/${params.name}`

  getWatchListUrl = (params = {}) =>
    `${this.apiVersion}/watch${this.getPath(params)}/federated${this.module}`

  getWatchUrl = (params = {}) =>
    `${this.getWatchListUrl(params)}/${params.name}`

  getResourceUrl = (params = {}) =>
    `kapis/resources.kubesphere.io/v1alpha3${this.getPath(params)}/federated${
      this.module
    }`

  @action
  async fetchList({ workspace, namespace, more, ...params } = {}) {
    this.list.isLoading = true

    if (!params.sortBy && params.ascending === undefined) {
      params.sortBy = 'createTime'
    }

    if (params.limit === Infinity || params.limit === -1) {
      params.limit = -1
      params.page = 1
    }

    params.limit = params.limit || 10

    const result = await request.get(
      this.getResourceUrl({ namespace }),
      this.getFilterParams(params)
    )

    const data = get(result, 'items', []).map(
      ObjectMapper.federated(this.mapper)
    )

    if (this.resourceStore.getResourceUrl) {
      const clusterNamesMap = {}
      data.forEach(item => {
        item.clusters.forEach(({ name: cluster }) => {
          clusterNamesMap[cluster] = clusterNamesMap[cluster] || []
          clusterNamesMap[cluster].push(item.name)
        })
      })
      const resources = await Promise.all(
        Object.entries(clusterNamesMap).map(([cluster, names]) =>
          request.get(
            this.resourceStore.getResourceUrl({ cluster, namespace }),
            { names: names.join(',') },
            null,
            () => {}
          )
        )
      )
      const clusters = Object.keys(clusterNamesMap)
      const dataMap = keyBy(data, 'name')
      resources.forEach((resource, index) => {
        const cluster = clusters[index]
        if (resource && resource.items) {
          resource.items.forEach(item => {
            const itemData = this.mapper(item)
            const itemName = itemData.name
            if (dataMap[itemName]) {
              dataMap[itemName].resources = dataMap[itemName].resources || {}
              dataMap[itemName].resources[cluster] = {
                cluster,
                ...itemData,
              }
            }
          })
        }
      })
    }

    this.list.update({
      data: more ? [...this.list.data, ...data] : data,
      total: result.totalItems || 0,
      ...params,
      limit: Number(params.limit) || 10,
      page: Number(params.page) || 1,
      isLoading: false,
      ...(this.list.silent ? {} : { selectedRowKeys: [] }),
    })

    return data
  }

  @action
  async fetchListByK8s({ namespace, module, ...rest } = {}) {
    this.list.isLoading = true

    if (module) {
      this.module = module
    }

    const params = rest

    const result = await request.get(
      this.getListUrl({ namespace, module }),
      params
    )
    const data = result.items.map(item => ({
      module: module || this.module,
      ...ObjectMapper.federated(this.mapper)(item),
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
    const detail = ObjectMapper.federated(this.mapper)(result)

    this.detail = detail
    this.isLoading = false
    return detail
  }

  @action
  async fetchResources({ clusters, ...params }) {
    this.isResourcesLoading = true
    const result = await Promise.all(
      clusters.map(cluster =>
        request.get(
          this.resourceStore.getDetailUrl({ ...params, cluster }),
          null,
          null,
          () => {}
        )
      )
    )

    result.forEach((item, index) => {
      Object.assign(this.resources, {
        [clusters[index]]: {
          ...this.mapper(item),
          cluster: clusters[index],
        },
      })
    })
    this.isResourcesLoading = false
  }

  @action
  create(data, params = {}) {
    const reqs = []
    if (data.metadata) {
      reqs.push({ url: this.getListUrl(params), data })
    } else {
      Object.keys(data).forEach(key => {
        if (data[key].kind) {
          const kind = data[key].kind.replace('Federated', '')
          const module = findKey(MODULE_KIND_MAP, o => o === kind)

          if (module) {
            reqs.push({
              url: this.getListUrl({ ...params, module }),
              data: data[key],
            })
          }
        }
      })
    }
    return this.submitting(withDryRun(reqs))
  }

  @action updateResource(cluster, data) {
    this.isResourcesLoading = true
    Object.assign(this.resources, {
      [cluster]: { ...this.mapper(data), cluster },
    })
    this.isResourcesLoading = false
  }
}
