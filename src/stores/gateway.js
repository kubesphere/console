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

import { LIST_DEFAULT_ORDER } from 'utils/constants'
import ObjectMapper from 'utils/object.mapper'

import { stringify } from 'qs'
import Base from './base'
import List from './base.list'

export default class Gateway extends Base {
  module = 'gateways'

  getOldGatewayUrl = params =>
    `kapis/resources.kubesphere.io/v1alpha2${this.getPath(params)}/router`

  gatewayUrl = ({ cluster, namespace, gatewayName = '' }) =>
    `${this.apiVersion}${this.getPath({
      namespace: namespace || 'kubesphere-system',
      cluster,
    })}/${this.module}${
      this.isCluster(namespace) ? `${gatewayName && `/${gatewayName}`}` : ''
    }`

  gatewayeditUrl = ({ cluster, namespace, gatewayName = '' }) =>
    `/${
      this.isCluster(namespace) ? 'k' : ''
    }apis/gateway.kubesphere.io/v1alpha1${this.getPath({
      namespace: namespace || 'kubesphere-controls-system',
      cluster,
    })}/${this.module}${
      this.isCluster(namespace)
        ? `${gatewayName && `/${gatewayName}`}`
        : '/kubesphere-router-kubesphere-system'
    }`

  gatewayPodsUrl = ({ cluster, namespace, gatewayName = '' }) =>
    `${this.apiVersion}${this.getPath({
      namespace: namespace || 'kubesphere-system',
      cluster,
    })}/${this.module}${
      this.isCluster(namespace)
        ? `${gatewayName && `/${gatewayName}`}`
        : '/kubesphere-router-kubesphere-system'
    }`

  isCluster(namespace) {
    return namespace && namespace !== 'kubesphere-controls-system'
  }

  @observable
  gateway = {
    data: {},
    isLoading: true,
  }

  @observable
  podList = new List()

  @observable
  logs = new List()

  @action
  async getGateway(params) {
    this.gateway.isLoading = true
    const url = this.gatewayUrl(params)

    const result = await request.get(url, null, null, () => {})
    let data = {}

    if (result && !isEmpty(result)) {
      if (this.isCluster(params.namespace)) {
        const gatewayData = result
          .filter(
            item => item.metadata.name !== 'kubesphere-router-kubesphere-system'
          )
          .map(item => ObjectMapper.gateway(item))
          .find(item => item.name.indexOf(params.namespace) > -1)

        data = gatewayData
      } else {
        data = ObjectMapper.gateway(result[0])
      }
    }

    this.detail = data
    this.gateway.data = data
    this.gateway.isLoading = false
    return data
  }

  @action
  async getGatewayReplica(params) {
    const url = `${this.gatewayPodsUrl(params)}/pods`
    const result = await this.submitting(request.get(url))
    let pods = []
    if (result && result.totalItems > 0) {
      pods = result.items.map(item => ObjectMapper.pods(item))
    }
    return pods
  }

  @action
  async getGatewayByProject(params) {
    this.gateway.isLoading = true
    const url = this.gatewayUrl(params)

    const result = await request.get(url, null, null, () => {})
    const dataList = []

    for (let i = 0; i < 2; i++) {
      const data =
        result && result[i] ? ObjectMapper.gateway(result[i]) : undefined
      dataList.push(data)
    }

    let detailGateway = dataList[0]

    if (get(detailGateway, 'name') !== 'kubesphere-router-kubesphere-system') {
      const temp = dataList[1]
      dataList[0] = temp
      dataList[1] = detailGateway
    }

    detailGateway = dataList[1] || dataList[0]

    this.detail = detailGateway
    this.gateway.data = detailGateway
    this.gateway.isLoading = false
    return dataList
  }

  @action
  async addGateway(params, data) {
    return this.submitting(request.post(this.gatewayeditUrl(params), data))
  }

  @action
  async editGateway(params, data) {
    return this.submitting(request.put(this.gatewayeditUrl(params), data))
  }

  @action
  async deleteGateway({ cluster, namespace, isOld }) {
    if (isOld) {
      return this.submitting(
        request.delete(this.getOldGatewayUrl({ cluster, namespace }))
      )
    }
    return this.submitting(
      request.delete(this.gatewayeditUrl({ cluster, namespace }))
    )
  }

  @action
  async updateGateway(params, data) {
    const url = `${this.gatewayeditUrl(params)}/upgrade`
    return this.submitting(request.post(url, data))
  }

  @action
  async getGatewayLogs({
    cluster,
    namespace,
    gatewayName,
    component,
    ...params
  }) {
    this.logs.isLoading = true

    const result = await request.get(
      `${this.gatewayPodsUrl({ cluster, namespace, gatewayName })}/logs`,
      {
        ...params,
        start_time: params.start_time
          ? Math.floor(params.start_time / 1000)
          : undefined,
        end_time: params.end_time
          ? Math.floor(params.end_time / 1000)
          : undefined,
        container_query: 'controller',
      },
      {},
      () => {
        return []
      }
    )

    const data = get(result, 'query.records') || []

    this.logs = {
      data,
      total: get(result, 'query.total') || data.length || 0,
      ...params,
      size: Number(params.size) || 10,
      from: Number(params.from) || 0,
      isLoading: false,
    }

    return data
  }

  exportLinkFactory({
    cluster,
    namespace,
    gatewayName,
    start_time,
    end_time,
    ...params
  }) {
    const api = `${this.gatewayPodsUrl({
      cluster,
      namespace,
      gatewayName,
    })}/logs`

    return `/${api}?${stringify({
      sort: 'asc',
      ...params,
      start_time: Math.floor(start_time / 1000),
      end_time: Math.floor(end_time / 1000),
      operation: 'export',
    })}`
  }

  @action
  async getGatewayPods(params) {
    const url = `${this.gatewayPodsUrl(params)}/pods`
    const result = await this.submitting(request.get(url))
    let pods = []
    if (result && result.totalItems > 0) {
      pods = result.items.map(item => ObjectMapper.pods(item))
    }
    this.gateway.data.pods = pods
    return pods
  }

  @action
  async getGatewayPodsList({
    cluster,
    name,
    gatewayName,
    namespace,
    workspace,
    more,
    component,
    search,
    ...params
  }) {
    this.podList.isLoading = true

    if (!params.sortBy && params.ascending === undefined) {
      params.sortBy = LIST_DEFAULT_ORDER[this.module] || 'createTime'
    }

    if (params.limit === Infinity || params.limit === -1) {
      params.limit = -1
      params.page = 1
    }

    params.limit = params.limit || 10
    const result = await request.get(
      `${this.gatewayPodsUrl({ cluster, namespace, gatewayName })}/pods`,
      {
        ...params,
        name: search,
      },
      {},
      () => {
        return []
      }
    )

    const data = (get(result, 'items') || []).map(item => ({
      cluster,
      namespace: item.metadata.name.split('kubesphere-router-')[1],
      ...ObjectMapper.pods(item),
    }))

    this.podList.update({
      data: more ? [...this.podList.data, ...data] : data,
      total: result.totalItems || result.total_count || data.length || 0,
      ...params,
      limit: Number(params.limit) || 10,
      page: Number(params.page) || 1,
      isLoading: false,
      ...(this.podList.silent ? {} : { selectedRowKeys: [] }),
    })

    return []
  }

  @action
  scale(params, newReplicas) {
    const data = this.gateway.data._originData
    data.spec.deployment.replicas = newReplicas
    set(data, 'metadata.resourceVersion', this.gateway.data.resourceVersion)
    return this.submitting(request.put(this.gatewayUrl(params), data))
  }

  @action
  async fetchList({ cluster, namespace, more, component, ...params }) {
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
      `${this.apiVersion}${this.getPath({
        cluster,
      })}/gateways`,
      {
        ...params,
      },
      {},
      () => {
        return []
      }
    )

    const data = (get(result, 'items') || []).map(item => ({
      cluster,
      namespace: item.metadata.name.split('kubesphere-router-')[1],
      ...ObjectMapper.gateway(item),
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

    return []
  }
}
