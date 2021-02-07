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

import { action, observable } from 'mobx'
import { Notify } from '@kube-design/components'
import ObjectMapper from 'utils/object.mapper'
import { isArray, get } from 'lodash'
import { getFilterString, parseUrl } from 'utils'

import Base from '../base'

export default class S2irunStore extends Base {
  @observable
  list = {
    data: [],
    page: 1,
    limit: 10,
    total: 0,
    isLoading: true,
    selectedRowKeys: [],
  }

  @observable
  logData = {
    isLoading: true,
    log: '',
    start: 0,
    hasMore: true,
  }

  @observable
  jobDetail = {}

  @observable
  runDetail = {}

  @observable
  isLoading = true

  constructor() {
    super()
    this.module = 's2iruns'
  }

  get apiVersion() {
    return 'apis/devops.kubesphere.io/v1alpha1'
  }

  @action
  async fetchJobDetail({ name, cluster, namespace }) {
    this.isLoading = true

    const result = await request.get(
      `apis/batch/v1${this.getPath({ cluster, namespace })}/jobs/${name}`
    )
    const detail = ObjectMapper['jobs'](result)
    this.jobDetail = detail
    this.isLoading = false
  }

  @action
  async fetchRunDetail({ cluster, namespace, runName }) {
    if (!runName) {
      return
    }

    this.getRunDetailLoading = true
    const result = await request.get(
      `apis/devops.kubesphere.io/v1alpha1${this.getPath({
        cluster,
        namespace,
      })}/${this.module}/${runName}`
    )

    this.runDetail = ObjectMapper['s2iruns'](result)
    this.getRunDetailLoading = false
    return this.runDetail
  }

  @action
  async deleteRun({ cluster, namespace, runName }) {
    if (!runName) {
      return
    }

    await request.delete(
      `apis/devops.kubesphere.io/v1alpha1${this.getPath({
        cluster,
        namespace,
      })}/${this.module}/${runName}`
    )
  }

  @action
  async fetchS2IRunRecords({
    limit = 10,
    name,
    page = 1,
    order,
    reverse,
    workspace,
    cluster,
    namespace,
    more,
    ...filters
  } = {}) {
    if (!this.list.data.length) {
      this.list.isLoading = true
    }
    const params = {}

    params.conditions = getFilterString({
      ...filters,
      'labels.devops.kubesphere.io/builder-name': name,
    })

    if (!order && reverse === undefined) {
      order = 'createTime'
      reverse = true
    }

    if (limit !== Infinity) {
      params.paging = `limit=${limit},page=${page}`
    }

    if (order) {
      params.orderBy = order
    }

    params.reverse = true

    const result = await request.get(
      `kapis/resources.kubesphere.io/v1alpha2${this.getPath({
        cluster,
        namespace,
      })}/${this.module}`,
      params
    )
    const data = result.items.map(this.mapper)
    data.forEach((item, index) => {
      item.count = result.total_count - index - 10 * (page - 1)
      item.cluster = cluster
    })

    this.list = {
      data: more ? [...this.list.data, ...data] : data,
      total: result.total_count || 0,
      limit: Number(limit) || 10,
      page: Number(page) || 1,
      order,
      reverse,
      filters,
      isLoading: false,
      selectedRowKeys: [],
    }
    return this.list
  }

  @action
  getLog = async (logURL, cluster) => {
    if (this.logData.logURL !== logURL) {
      this.logData = {
        isLoading: true,
        log: '',
        start: 0,
        hasMore: true,
      }
    }
    let url = parseUrl(logURL).pathname.slice(1)

    const namespaces = get(url.match(/\/namespaces\/(.*)\/pods\//), '1')
    const pods = get(url.match(/\/pods\/(.*)/), '1')

    url = `kapis/tenant.kubesphere.io/v1alpha2${this.getPath({
      cluster,
    })}/logs`

    const result = await request.get(url, {
      namespaces,
      pods,
      container: this.containerName,
      timestamps: true,
      tailLines: 1000,
      size: 300,
      from: this.logData.start,
      sort: 'asc',
    })

    const logRecords = get(result, 'query.records', [])
    const total = get(result, 'query.total', [])
    const { log } = this.logData

    if (isArray(logRecords)) {
      const totalLog = logRecords.reduce(
        (logStr, logItem) => logStr + logItem.log,
        log
      )
      this.logData = {
        logURL,
        log: totalLog,
        start: this.logData.start + logRecords.length,
        hasMore: total > this.logData.start + logRecords.length,
        isLoading: false,
      }
    }
  }

  @action
  async fetchPodsLogs(logURL, cluster) {
    if (get(this.logData, 'logURL', '') !== logURL) {
      this.logData = {
        isLoading: false,
        log: '',
        start: 0,
        hasMore: false,
      }
    }
    this.logData.isLoading = true
    const namespace = get(logURL.match(/namespaces\/([\w-/.]*)*\?/), '1')
    if (!this.containerName) {
      const podsDetail = await request.get(
        `api/v1${this.getPath({ namespace, cluster })}`
      )
      const containerID = get(
        podsDetail,
        'status.containerStatuses[0]containerID'
      )
      if (!containerID) {
        return Notify.error('container not ready')
      }
      this.containerName = get(podsDetail, 'spec.containers[0].name', '')
    }
    const result = await request.get(
      `api/v1${this.getPath({ namespace, cluster })}/log`,
      {
        container: this.containerName,
        timestamps: true,
        tailLines: 1000,
      }
    )
    this.logData = {
      logURL,
      isLoading: false,
      log: result,
      start: 0,
      hasMore: false,
    }
  }
}
