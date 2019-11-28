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

import { action } from 'mobx'
import { isEmpty, get } from 'lodash'

import { getFilterString } from 'utils'
import { getWorkloadVolumes } from 'utils/workload'

import Base from './base'

export default class PodStore extends Base {
  constructor() {
    super('pods')
  }

  get apiVersion() {
    return 'kapis/resources.kubesphere.io/v1alpha2'
  }

  getListUrl = ({ namespace }) => {
    const namespacePath = namespace ? `/namespaces/${namespace}` : ''
    return `${this.apiVersion}${namespacePath}/pods`
  }

  getDetailUrl = ({ namespace, name }) =>
    `api/v1/namespaces/${namespace}/pods/${name}`

  getWatchListUrl = ({ namespace }) =>
    `api/v1/watch/namespaces/${namespace}/${this.module}`

  getData = async result => {
    const items = get(result, 'items', result.pods) || []
    const data = items.map(this.mapper)

    return data
  }

  @action
  async fetchList({
    workspace,
    namespace,
    order,
    reverse,
    more,
    limit = 10,
    page = 1,
    ...filters
  } = {}) {
    this.list.isLoading = true

    const params = {}

    if (!isEmpty(filters)) {
      params.conditions = getFilterString(filters)
    }

    if (limit !== Infinity) {
      params.paging = `limit=${limit},page=${page}`
    }

    if (order) {
      params.orderBy = order
    }

    if (reverse) {
      params.reverse = true
    }

    const api = this.getListUrl({ namespace })
    const result = await request.get(api, params)
    const data = await this.getData(result, filters)

    this.list.update({
      data: more ? [...this.list.data, ...data] : data,
      total: result.total_count || 0,
      limit: Number(limit) || 10,
      page: Number(page) || 1,
      order,
      reverse,
      filters,
      isLoading: false,
    })
  }

  @action
  async fetchDetail({ namespace, name, silent }) {
    if (!silent) {
      this.isLoading = true
    }

    const result = await request.get(this.getDetailUrl({ namespace, name }))
    const detail = this.mapper(result)

    detail.volumes = await getWorkloadVolumes(detail)

    if (!isEmpty(detail.volumes)) {
      detail.containers.forEach(container => {
        if (!isEmpty(container.volumeMounts)) {
          container.volumeMounts.forEach(volumeMount => {
            const volume = detail.volumes.find(
              _volume => _volume.name === volumeMount.name
            )
            if (!isEmpty(volume)) {
              volume.containers = volume.containers || []
              volume.containers.push(container)
            }
          })
        }
      })
    }

    this.detail = detail

    if (!silent) {
      this.isLoading = false
    }
  }

  @action
  async delete({ namespace, name }) {
    await this.submitting(
      request.delete(this.getDetailUrl({ namespace, name }))
    )
  }

  @action
  async fetchListByK8s({ namespace, labelSelector, ...rest }) {
    this.list.isLoading = true

    if (!namespace) {
      this.list.isLoading = false
      return
    }

    const params = rest

    if (!isEmpty(labelSelector)) {
      params.labelSelector = labelSelector
    }

    const result = await request.get(
      `api/v1/namespaces/${namespace}/pods`,
      params
    )

    this.list = {
      data: result.items.map(this.mapper),
      total: result.items.length,
      isLoading: false,
    }
  }
}
