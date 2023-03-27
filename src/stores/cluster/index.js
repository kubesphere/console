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

import { cloneDeep, get, set } from 'lodash'
import { action, observable } from 'mobx'

import Base from 'stores/base'
import List from 'stores/base.list'

import { DEFAULT_CLUSTER, LIST_DEFAULT_ORDER } from 'utils/constants'
import { eventBus } from 'utils/EventBus'
import { eventKeys } from 'utils/events'

export default class ClusterStore extends Base {
  @observable
  initializing = true

  @observable
  isAgentLoading = true

  @observable
  agent = ''

  @observable
  isValidating = false

  @observable
  isSubmitting = false

  @observable
  version = ''

  module = 'clusters'

  @observable
  project = undefined

  projects = new List()

  getAgentUrl = ({ cluster }) =>
    `kapis/cluster.kubesphere.io/v1alpha1/clusters/${cluster}/agent/deployment`

  getTenantUrl = (params = {}) =>
    `kapis/tenant.kubesphere.io/v1alpha2${this.getPath(params)}/${this.module}`

  @action
  async fetchList({ from, more, ...params } = {}) {
    this.list.isLoading = true

    if (!params.sortBy && params.ascending === undefined) {
      params.sortBy = LIST_DEFAULT_ORDER[this.module] || 'createTime'
    }

    if (params.limit === Infinity || params.limit === -1) {
      params.limit = -1
      params.page = 1
    }

    params.limit = params.limit || 10

    let result
    if (!globals.app.isMultiCluster) {
      result = { items: [DEFAULT_CLUSTER] }
    } else {
      result = await request.get(this.getResourceUrl({}), params)
    }

    const data = get(result, 'items', []).map(this.mapper)

    this.list.update({
      data: more ? [...this.list.data, ...data] : data,
      total: result.totalItems || result.total_count || data.length || 0,
      ...params,
      limit: Number(params.limit) || 10,
      page: Number(params.page) || 1,
      isLoading: false,
      ...(this.list.silent ? {} : { selectedRowKeys: [] }),
    })

    data.forEach(item => {
      eventBus.emit(eventKeys.CLUSTER_CHANGE, item)
    })

    return data
  }

  // Whether the current user has permission to access the cluster to which he belongs and the public cluster in the worksspace
  @action
  async fetchGrantedList({ from, more, ...params } = {}) {
    this.list.isLoading = true

    if (!params.sortBy && params.ascending === undefined) {
      params.sortBy = LIST_DEFAULT_ORDER[this.module] || 'createTime'
    }

    if (params.limit === Infinity || params.limit === -1) {
      params.limit = -1
      params.page = 1
    }

    params.limit = params.limit || 10

    let result
    if (!globals.app.isMultiCluster) {
      result = { items: [DEFAULT_CLUSTER] }
    } else {
      const tenantParams = {
        ...params,
        labelSelector: `${
          params.labelSelector ? `${params.labelSelector},` : ''
        }cluster.kubesphere.io/visibility!=public`,
      }

      const resourceParams = {
        ...params,
        labelSelector: `${
          params.labelSelector ? `${params.labelSelector},` : ''
        }cluster.kubesphere.io/visibility=public`,
      }

      const [tenantList, list] = await Promise.all([
        request.get(this.getTenantUrl({}), tenantParams),
        request.get(this.getResourceUrl({}), resourceParams),
      ])

      result = {
        items: [...list.items, ...tenantList.items],
        totalItems: tenantList.totalItems + list.totalItems,
      }
    }

    const data = get(result, 'items', []).map(this.mapper)

    this.list.update({
      data: more ? [...this.list.data, ...data] : data,
      total: result.totalItems || result.total_count || data.length || 0,
      ...params,
      limit: Number(params.limit) || 10,
      page: Number(params.page) || 1,
      isLoading: false,
      ...(this.list.silent ? {} : { selectedRowKeys: [] }),
    })

    // return data
  }

  @action
  async fetchListByUser({ from, more, ...params } = {}) {
    this.list.isLoading = true

    if (!params.sortBy && params.ascending === undefined) {
      params.sortBy = LIST_DEFAULT_ORDER[this.module] || 'createTime'
    }

    if (params.limit === Infinity || params.limit === -1) {
      params.limit = -1
      params.page = 1
    }

    params.limit = params.limit || 10

    let result
    if (!globals.app.isMultiCluster) {
      result = { items: [DEFAULT_CLUSTER] }
    } else {
      result = await request.get(this.getTenantUrl({}), params)
    }

    const data = get(result, 'items', []).map(this.mapper)

    this.list.update({
      data: more ? [...this.list.data, ...data] : data,
      total: result.totalItems || result.total_count || data.length || 0,
      ...params,
      limit: Number(params.limit) || 10,
      page: Number(params.page) || 1,
      isLoading: false,
      ...(this.list.silent ? {} : { selectedRowKeys: [] }),
    })

    data.forEach(item => {
      eventBus.emit(eventKeys.CLUSTER_CHANGE, item)
    })
    return data
  }

  @action
  async fetchDetail(params) {
    this.isLoading = true

    let detail
    if (!globals.app.isMultiCluster) {
      detail = this.mapper(cloneDeep(DEFAULT_CLUSTER))
    } else {
      const result = await request.get(
        `${this.getResourceUrl(params)}/${params.name}`,
        null,
        null,
        (_, err) => {
          if (err.reason === 'Not Found') {
            global.navigateTo('/404')
          }
        }
      )
      detail = { ...params, ...this.mapper(result) }
    }

    this.detail = detail
    this.isLoading = false
    return detail
  }

  @action
  async fetchAgent(params) {
    this.isAgentLoading = true

    const result = await request.get(this.getAgentUrl(params))

    this.agent = result
    this.isAgentLoading = false
  }

  @action
  async validate(data) {
    this.isValidating = true
    await request.post(
      'kapis/cluster.kubesphere.io/v1alpha1/clusters/validation',
      data,
      {},
      (res, err) => {
        this.isValidating = false
        window.onunhandledrejection({
          status: 400,
          reason: t('VALIDATION_FAILED'),
          message: err.message,
        })
        return Promise.reject()
      }
    )
    this.isValidating = false
  }

  @action
  setProject(project) {
    this.project = project
  }

  @action
  async fetchProjects({ cluster, namespace, more, ...params } = {}) {
    this.projects.isLoading = true

    if (!params.sortBy && params.ascending === undefined) {
      params.sortBy = LIST_DEFAULT_ORDER[this.module] || 'createTime'
    }

    if (params.limit === Infinity || params.limit === -1) {
      params.limit = -1
      params.page = 1
    }

    params.limit = params.limit || 10

    const result = await request.get(
      `kapis/resources.kubesphere.io/v1alpha3${this.getPath({
        cluster,
        namespace,
      })}/namespaces`,
      {
        labelSelector: '!kubesphere.io/devopsproject',
        ...params,
      }
    )
    const data = get(result, 'items', []).map(item => ({
      cluster,
      ...this.mapper(item),
    }))

    this.projects.update({
      data: more ? [...this.projects.data, ...data] : data,
      total: result.totalItems || result.total_count || data.length || 0,
      ...params,
      limit: Number(params.limit) || 10,
      page: Number(params.page) || 1,
      isLoading: false,
      ...(this.projects.silent ? {} : { selectedRowKeys: [] }),
    })
  }

  @action
  async fetchVersion({ cluster }) {
    const result = await request.get(
      `kapis/clusters/${cluster}/version`.replace('/clusters/default', '')
    )

    this.version = get(result, 'kubernetes.gitVersion')
  }

  @action
  async updateKubeConfig({ cluster, data }) {
    return this.submitting(
      request.put(
        `/kapis/cluster.kubesphere.io/v1alpha1/clusters/${cluster}/kubeconfig`,
        data
      )
    )
  }

  @action
  async fetchClusterConfigz({ cluster }) {
    await this.fetchDetail({ name: cluster })
    set(globals, `clusterConfig.${cluster}`, this.detail.configz)
    return get(this.detail.configz, 'ksVersion', '') !== ''
  }

  @action
  fetchAllCluster = async params => {
    const res = await request.get(
      '/kapis/resources.kubesphere.io/v1alpha3/clusters',
      params
    )
    return get(res, 'items', []).map(this.mapper)
  }

  checkSpringCloudIfActive = async ({ cluster }) => {
    const multiCluster = get(globals, 'ksConfig.multicluster', false)
    const res = await request.get(
      `/kapis${
        multiCluster ? `/clusters/${cluster}` : ''
      }/resources.kubesphere.io/v1alpha3/customresourcedefinitions?name=configurations.springcloud.kubesphere.io`,
      {},
      {},
      () => {
        return false
      }
    )

    if (res && res.totalItems === 1) {
      return true
    }

    return false
  }

  afterChange = d => {
    eventBus.emit(eventKeys.CLUSTER_CHANGE, this.mapper(d))
  }

  afterDelete = d => {
    eventBus.emit(eventKeys.DELETE_CLUSTER, this.mapper(d))
  }
}
