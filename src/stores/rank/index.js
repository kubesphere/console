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
import { isEmpty, get, assign, set } from 'lodash'
import { to } from 'utils'
import { saveAs } from 'file-saver'

export default class BaseRankStore {
  @observable
  page = 1

  @observable
  data = []

  @observable
  total_page = 1

  @observable
  isLoading = true

  @observable
  limit = 10

  @observable
  sort_metric

  @observable
  sort_type = 'desc'

  get apiVersion() {
    if (globals.app.isMultiCluster && this.cluster) {
      return `kapis/clusters/${this.cluster}/monitoring.kubesphere.io/v1alpha3`
    }
    return `kapis/monitoring.kubesphere.io/v1alpha3`
  }

  get fetchUrl() {
    return `${this.apiVersion}/${this.resource}`
  }

  get rankRequestTag() {
    return 'rank'
  }

  get defaultParams() {
    return {
      type: this.rankRequestTag,
    }
  }

  constructor(filters = {}) {
    Object.keys(filters).forEach(key => set(this, key, filters[key]))
  }

  @action
  changeSortType = () => {
    this.sort_type = this.sort_type === 'desc' ? 'asc' : 'desc'
    this.fetchAll()
  }

  @action
  changeSortMetric = sortMetric => {
    this.sort_metric = sortMetric
    this.fetchAll()
  }

  @action
  changePagination = page => {
    this.page = page
    this.fetchAll()
  }

  download = fileName => {
    const json = JSON.stringify(this.data, null, 2)
    const blob = new Blob([json], {
      type: 'text/plain;charset=utf-8',
    })
    saveAs(blob, fileName)
  }

  @action
  async fetchAll(params = {}) {
    this.isLoading = true

    const defaultParams = {
      type: this.rankRequestTag,
      metrics_filter: this.metrics_filter,
      page: this.page,
      limit: this.limit,
      sort_type: this.sort_type,
      sort_metric: this.sort_metric || get(this, 'sort_metric_options.[0]'),
    }

    const result = await to(
      request.get(this.fetchUrl, assign(defaultParams, params))
    )

    const data = this.handleResult(result)

    this.total_page = result.total_page

    this.data = data

    this.isLoading = false

    return data
  }

  handleResult = response => {
    const results = get(response, 'results', [])

    if (isEmpty(results)) {
      return []
    }

    return results.reduce((rankList, metric = {}) => {
      const sortName = metric.metric_name
      const result = get(metric, 'data.result') || []
      result.forEach((data, index) => {
        const item = rankList[index] || {}
        const value = get(data, 'value', [])
        const describeMsg = get(data, 'metric', {})
        item[sortName] = value[1]
        Object.assign(item, describeMsg)
        rankList[index] = item
      })
      return rankList
    }, [])
  }
}
