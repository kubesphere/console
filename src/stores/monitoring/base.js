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

import { action, observable, toJS } from 'mobx'
import { isEmpty, isArray, get, set } from 'lodash'

import { to } from 'utils'
import { fillEmptyMetrics } from 'utils/monitoring'

export const getMinuteValue = (timeStr = '60s', hasUnit = true) => {
  const unit = timeStr.slice(-1)
  let value = parseFloat(timeStr)

  switch (unit) {
    default:
    case 's':
      break
    case 'm':
      value *= 60
      break
    case 'h':
      value *= 60 * 60
      break
    case 'd':
      value = value * 24 * 60 * 60
      break
  }
  return hasUnit ? `${value}s` : value
}

export const getTimeRange = ({ step = '600s', times = 20 } = {}) => {
  const interval = parseFloat(step) * times
  const end = Math.floor(Date.now() / 1000)
  const start = Math.floor(end - interval)

  return { start, end }
}

export default class BaseMonitoringStore {
  @observable
  isLoading = false

  @observable
  isRefreshing = false

  @observable
  etcdChecking = false

  @observable
  supportETCD = false

  isConfirmSupportETCD = false

  data = {}

  resourceName = 'resource_name'

  constructor(filters = {}) {
    Object.keys(filters).forEach(key => set(this, key, filters[key]))
  }

  get apiVersion() {
    if (globals.app.isMultiCluster && this.cluster) {
      return `kapis/clusters/${this.cluster}/monitoring.kubesphere.io/v1alpha3`
    }
    return 'kapis/monitoring.kubesphere.io/v1alpha3'
  }

  getApi = () => `${this.apiVersion}/cluster`

  getParams = ({
    start,
    end,
    step = '600s',
    times = 20,
    resources = [],
    metrics = [],
    last = false, // last time
    ...rest
  } = {}) => {
    const params = {
      ...rest,
    }

    if (!last) {
      Object.assign(params, {
        start,
        end,
        step: getMinuteValue(step),
        times,
      })

      if (!start || !end) {
        const timeRange = getTimeRange(params)
        params.start = timeRange.start
        params.end = timeRange.end
      }
    }

    if (params.start) {
      params.start = Math.floor(params.start)
    }

    if (params.end) {
      params.end = Math.floor(params.end)
    }

    if (!isEmpty(resources)) {
      params.resources_filter = `${resources.join('|')}$`
    }

    if (!isEmpty(metrics)) {
      params.metrics_filter = `${metrics.join('|')}$`
    }

    return this.handleParams(params)
  }

  handleParams = params => params

  getResult = result => {
    const data = {}
    const results = isArray(result) ? result : get(result, 'results', []) || []

    if (isEmpty(results)) {
      const metricName = get(result, 'metric_name')

      if (metricName) {
        data[metricName] = result
      }
    } else {
      results.forEach(item => {
        data[item.metric_name] = item
      })
    }

    return data
  }

  getNewValues = (origin = [], newValue = []) => {
    const values = isEmpty(origin) ? [] : [...origin]
    const value = newValue || []

    if (!isEmpty(value)) {
      if (values.length > 10) {
        values.shift()
      }
      values.push(value)
    }

    return values
  }

  getNewRefreshedResult = (currentResult = [], originResult = []) => {
    const newResult = [...originResult]

    currentResult.forEach((record, index) => {
      const resourceName = get(record, `metric.${this.resourceName}`)
      let recordData = null

      if (resourceName) {
        const originRecord = newResult.find(
          _record =>
            get(_record, `metric.${this.resourceName}`) === resourceName
        )

        if (isEmpty(originRecord)) {
          newResult.push(record)
        } else {
          recordData = originRecord
        }
      } else {
        recordData = newResult[index]
      }

      if (!isEmpty(recordData)) {
        const newValues = this.getNewValues(recordData.values, record.value)
        set(recordData, 'values', newValues)
      }
    })

    return newResult
  }

  getRefreshResult = (newData = {}, origin = {}) => {
    const data = toJS(origin)

    if (isEmpty(data)) {
      return newData
    }

    Object.values(newData).forEach(item => {
      const key = get(item, 'metric_name')
      const metric = data[key]

      if (metric) {
        const currentResult = get(item, 'data.result') || []
        const originResult =
          get(metric, 'data.result', get(metric, 'data.results')) || []

        set(
          metric,
          'data.result',
          this.getNewRefreshedResult(currentResult, originResult)
        )
      }
    })

    return data
  }

  getMoreResult = (newData = {}, origin = {}) => {
    const data = toJS(origin)

    if (isEmpty(data)) {
      return newData
    }

    Object.values(newData).forEach(item => {
      const key = get(item, 'metric_name')
      const metric = data[key]

      if (metric) {
        const originResult =
          get(metric, 'data.result', get(metric, 'data.results')) || []
        const currentResult = get(item, 'data.result') || []

        const newResult = [...originResult, ...currentResult]
        set(metric, 'data.result', newResult)
      }
    })

    return data
  }

  @action
  async fetchMetrics({
    autoRefresh = false,
    more = false,
    fillZero = true,
    ...filters
  }) {
    if (autoRefresh) {
      filters.last = true
      this.isRefreshing = true
    } else {
      this.isLoading = true
    }

    if (filters.cluster) {
      this.cluster = filters.cluster
    }

    const params = this.getParams(filters)
    const api = this.getApi(filters)

    const response = await to(request.get(api, params))

    let result = this.getResult(response)
    if (autoRefresh) {
      result = this.getRefreshResult(result, this.data)
    }
    if (more) {
      result = this.getMoreResult(result, this.data)
    }

    this.data = fillZero ? fillEmptyMetrics(params, result) : result
    this.isLoading = false
    this.isRefreshing = false

    return result
  }

  @action
  checkEtcd = async () => {
    const api = `apis${
      this.cluster && globals.app.isMultiCluster
        ? `/clusters/${this.cluster}`
        : ''
    }/monitoring.coreos.com/v1/namespaces/kubesphere-monitoring-system/servicemonitors/etcd`
    this.etcdChecking = true

    try {
      const response = await request.get(api, {}, {}, () => {})
      this.supportETCD = response.code !== '404'
    } catch (e) {
      this.supportETCD = false
    } finally {
      this.etcdChecking = false
    }
  }
}
