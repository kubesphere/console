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

import { observable, action } from 'mobx'
import { get } from 'lodash'

import ObjectMapper from 'utils/object.mapper'
import { getWorkloadVolumes } from 'utils/workload'
import { encrypt } from 'utils'
import List from './base.list'

export default class ContainerStore {
  @observable
  detail = {}

  tagList = new List()

  @observable
  isLoading = true

  @observable
  volumes = []

  @observable
  logs = {
    data: '',
    isLoading: true,
  }

  watchHandler = null

  encryptKey = get(globals, 'config.encryptKey', 'kubesphere')

  module = 'containers'

  getDetailUrl = ({ cluster, namespace, podName, gateways }) => {
    let path = `api/v1`

    if (cluster) {
      path += `/klusters/${cluster}`
    }

    if (gateways) {
      const ns =
        namespace === 'kubesphere-controls-system' || !namespace
          ? 'kubesphere-system'
          : namespace
      return `kapis/gateway.kubesphere.io/v1alpha1/namespaces/${ns}/gateways/${gateways}/pods/${podName}`
    }

    return `${path}/namespaces/${namespace}/pods/${podName}`
  }

  getPath = ({ cluster, namespace }) => {
    let path = ''

    if (cluster) {
      path += `/klusters/${cluster}`
    }

    if (namespace) {
      path += `/namespaces/${namespace}`
    }

    return path
  }

  @action
  async fetchDetail({ cluster, namespace, podName, containerName }) {
    this.isLoading = true

    const result = await request.get(
      this.getDetailUrl({ cluster, namespace, podName })
    )
    const pod = ObjectMapper.pods(result)
    const detail =
      pod.containers.find(item => item.name === containerName) ||
      pod.initContainers.find(item => item.name === containerName)
    detail.createTime = get(pod, 'createTime', '')
    detail.app = detail.app || pod.app
    detail.cluster = cluster
    pod.cluster = cluster

    this.volumes = await getWorkloadVolumes(pod)

    this.detail = detail
    this.isLoading = false
  }

  @action
  async watchLogs(
    { cluster, namespace, podName, gateways, silent, ...params },
    callback
  ) {
    if (!silent) {
      this.logs.isLoading = true
    }

    if (params.follow) {
      this.watchHandler = request.watch(
        `${this.getDetailUrl({ cluster, namespace, podName, gateways })}/log`,
        params,
        data => {
          this.logs = {
            data,
            isLoading: false,
          }
          callback()
        }
      )
    } else {
      const result = await request.get(
        `${this.getDetailUrl({ cluster, namespace, podName, gateways })}/log`,
        params
      )

      this.logs = {
        data: result,
        isLoading: false,
      }

      callback()
    }
  }

  @action
  stopWatchLogs() {
    this.watchHandler && this.watchHandler.abort()
  }

  async checkPreviousLog({ cluster, namespace, podName, ...params }) {
    const result = await request.get(
      `${this.getDetailUrl({ cluster, namespace, podName })}/log`,
      params,
      {},
      () => {}
    )

    return !!result
  }

  @action
  async fetchAllLogs({ cluster, namespace, podName, ...params }) {
    return await request.get(
      `${this.getDetailUrl({ cluster, namespace, podName })}/log`,
      params
    )
  }

  @action
  getDockerImagesLists = async params =>
    await request.post(
      `dockerhub/api/content/v1/products/search`,
      params,
      {
        headers: {
          'Search-Version': 'v3',
        },
      },
      () => {}
    )

  @action
  getHarborImagesLists = async ({ params, harborData }) =>
    await request.post(`harbor/search`, {
      harborData: encrypt(this.encryptKey, JSON.stringify(harborData)),
      params,
    })

  @action
  getHarborImageTag = async (harborData, projectName, repositoryName, params) =>
    await request.post(`harbor/artifacts`, {
      harborData: encrypt(
        this.encryptKey,
        JSON.stringify({ ...harborData, projectName, repositoryName })
      ),
      params,
    })

  @action
  getImageDetail = async ({ cluster, namespace, ...params }) => {
    const result = await request.get(
      `kapis/resources.kubesphere.io/v1alpha3${this.getPath({
        cluster,
      })}/namespaces/${namespace}/imageconfig`,
      params,
      null,
      (e, data) => data
    )

    if (get(result, 'status', 'succeeded') !== 'succeeded') {
      return { status: 'failed', message: result.message }
    }

    return ObjectMapper.imageBlob(result)
  }

  @action
  getImageTagList = async ({
    namespace,
    cluster,
    more,
    limit = 10,
    ...params
  }) => {
    this.tagList.isLoading = true

    if (limit === Infinity || limit === -1) {
      limit = -1
      params.page = 1
    }

    const result = await request.get(
      `kapis/resources.kubesphere.io/v1alpha3${this.getPath({
        cluster,
        namespace,
      })}/repositorytags`,
      { ...params, limit },
      null,
      (e, data) => data
    )

    const data = result.tags || []

    this.tagList.update({
      data: more ? [...this.tagList.data, ...data] : data,
      total: result.total || data.length || 0,
      limit: Number(params.limit) || 10,
      page: Number(params.page) || 1,
      isLoading: false,
    })

    return result.tags
  }
}
