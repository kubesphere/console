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

import { omit, isEmpty, has, get } from 'lodash'
import { action, observable } from 'mobx'
import Base from 'stores/base'

export default class CDStore extends Base {
  module = 'cds'

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
  clustersList = []

  @observable
  detail = {}

  @observable
  syncResult = {
    data: [],
    page: 1,
    total: 0,
    filters: {},
    isLoading: false,
  }

  @observable
  summary = {}

  getPath({ cluster, namespace, workspace, devops } = {}) {
    let path = ''
    if (cluster) {
      path += `/klusters/${cluster}`
    }
    if (workspace) {
      path += `/workspaces/${workspace}`
    }
    if (namespace) {
      path += `/namespaces/${namespace}`
    }
    if (devops) {
      path += `/devops/${devops}`
    }
    return path
  }

  getListUrl = (params = {}) =>
    `${this.apiVersion}${this.getPath(params)}/applications${
      params.dryRun ? '?dryRun=All' : ''
    }`

  getResourceUrl = (params = {}) =>
    `${this.apiVersion}${this.getPath(params)}/applications`

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

    const result = await request.get(url, { ...params }, {}, () => {})

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
  async updateSync({ data, application, devops, cluster }) {
    const url = `${this.getResourceUrl({
      namespace: devops,
      cluster,
    })}/${application}/sync`

    return this.submitting(request.post(url, data))
  }

  @action
  async update(detail, data) {
    const url = `${this.getResourceUrl({
      namespace: detail.devops,
      cluster: detail.cluster,
    })}/${data.metadata.name}`
    return this.submitting(request.put(url, data))
  }

  @action
  patch(params, newObject) {
    const url = `${this.getResourceUrl({
      namespace: params.devops,
      cluster: params.cluster,
    })}/${newObject.metadata.name}`
    return this.submitting(request.put(url, newObject))
  }

  @action
  delete(params) {
    const _params = omit({ ...params, namespace: params.devops }, 'devops')
    return this.submitting(
      request.delete(
        `${this.getDetailUrl(_params)}${
          _params.isRelated ? '?cascade=true' : ''
        }`
      )
    )
  }

  @action
  async fetchDetail({ name, isSilent, devops, cluster }) {
    if (!isSilent) {
      this.isLoading = true
    }

    const resultKub = await request.get(
      `${this.getResourceUrl({ namespace: devops, cluster })}/${name}`
    )

    const result = this.mapper({ ...resultKub, devops })

    this.detail = result
    this.isLoading = false
    return result
  }

  @action
  async getClustersList(defaultHost = 'host') {
    const url = `${this.apiVersion}/clusters`
    const result = await request.get(url, null, null, () => {
      return []
    })

    let hostName = 'default'

    if (globals.app.isMultiCluster) {
      const clusters = await request.get(
        'kapis/tenant.kubesphere.io/v1alpha2/clusters'
      )

      const cluster = clusters.items.find(item =>
        has(item, 'metadata.labels["cluster-role.kubesphere.io/host"]')
      )

      hostName = get(cluster, 'metadata.name', defaultHost)
    }

    if (isEmpty(result)) {
      this.clustersList = [
        {
          server: 'https://kubernetes.default.svc',
          name: 'in-cluster',
          label: hostName,
        },
      ]
    } else {
      this.clustersList = result.map(item => {
        return {
          ...item,
          label: item.name === 'in-cluster' ? hostName : item.name,
        }
      })
    }
    globals.hostClusterName = hostName
  }

  @action
  async fetchStatusSummary({ devops, cluster }) {
    const url = `${this.apiVersion}${this.getPath({
      namespace: devops,
      cluster,
    })}/application-summary`
    const result = await request.get(url)
    this.summary = result || {}
  }
}
