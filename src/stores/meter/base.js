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

import { isArray, isEmpty, get, assign } from 'lodash'
import { action, observable } from 'mobx'

import {
  getTimeParams,
  getMetricsFilters,
  handleSortBySourceType,
  handleValueByUnit,
  handleWorkloadToKind,
  handleNodeParams,
  handleLevelParams,
  fillEmptyMeterValue,
  getResourceFilters,
} from 'utils/meter'

import {
  RESOURCES_METER_TYPE,
  FEE_CONFIG,
} from 'components/Modals/Bill/constats'

import base from '../base'
import { getTimeStr } from '../../components/Cards/Monitoring/Controller/TimeSelector/utils'

export default class MeterStore extends base {
  module = 'meter'

  @observable
  isLoading = false

  @observable
  data = []

  get apiVersion() {
    if (globals.app.isMultiCluster && this.cluster) {
      return `kapis/clusters/${this.cluster}/metering.kubesphere.io/v1alpha1`
    }
    return 'kapis/metering.kubesphere.io/v1alpha1'
  }

  get tenantUrl() {
    if (globals.app.isMultiCluster && this.cluster) {
      return `kapis/clusters/${this.cluster}/tenant.kubesphere.io/v1alpha2`
    }
    return 'kapis/tenant.kubesphere.io/v1alpha2'
  }

  getPaths({
    cluster,
    workspaces,
    namespaces,
    applications,
    services,
    deployments,
    statefulsets,
    pods,
    nodes,
    module,
  }) {
    let path = ''

    if (cluster) {
      path += module === 'cluster' ? '/cluster' : ''
    }

    if (workspaces) {
      path += `/workspaces/${workspaces}`
    }

    if (namespaces) {
      path += `/namespaces/${namespaces}`
    }

    if (applications) {
      path += `/applications`
    }

    if (services) {
      path += `/services`
    }

    if (!pods && (deployments || statefulsets)) {
      path += `/workloads`
    }

    if (nodes && !pods) {
      path += '/nodes'
    }

    if (nodes && pods) {
      path += `/nodes/${nodes}`
    }

    if (pods) {
      path += `/pods`
    }

    return path
  }

  getApi = ({ module, ...params }) => {
    return `${this.apiVersion}${this.getPaths({ module, ...params })}`
  }

  getExportParams = ({
    cluster,
    workspaces,
    namespaces,
    applications,
    services,
    deployments,
    statefulsets,
    pods,
    nodes,
    isTime,
    start,
    end,
    step,
    module,
    meters,
    resources,
    ...rest
  }) => {
    const params = assign(
      { ...rest },
      handleLevelParams({
        module,
      }),
      getTimeParams({ isTime, start, end, step }),
      getMetricsFilters({ module, meters }),
      getResourceFilters({
        module,
        resources,
      }),
      handleWorkloadToKind({ deployments, statefulsets }),
      handleNodeParams({ nodes, pods, resources })
    )

    if (!rest.operation) {
      delete params.resources_filter
    }
    params.namespace = namespaces
    params.workspace = workspaces
    return params
  }

  getParams = ({
    start,
    end,
    step = '1h',
    resources = [],
    meters = [],
    module,
    isTime = false,
    deployments,
    statefulsets,
    nodes,
    pods,
    ...rest
  } = {}) => {
    const params = assign(
      rest,
      getTimeParams({ start, end, step, isTime }),
      getMetricsFilters({ module, meters }),
      getResourceFilters({ module, resources }),
      handleWorkloadToKind({ deployments, statefulsets }),
      handleNodeParams({ nodes, pods, resources, module })
    )
    return this.setParams(params)
  }

  setParams = params => params

  getResource = ({
    cluster,
    workspaces,
    namespaces,
    applications,
    services,
    deployments,
    statefulsets,
    nodes,
    pods,
  }) => {
    const params = {
      cluster,
      namespaces,
      workspaces,
    }

    if (pods) {
      return { pods, nodes: nodes || undefined, ...params }
    }

    if (nodes) {
      return { nodes, ...params }
    }

    if (deployments || statefulsets) {
      return { deployments, statefulsets, ...params }
    }

    if (services) {
      return { services, ...params }
    }

    if (applications) {
      return { applications, ...params }
    }

    return params
  }

  setOneSourceAllMeterByType = (item, module) => {
    const { data, metric_name } = item
    const result = get(data, 'result.0', {})
    const itemObject = {
      type: metric_name,
      module: RESOURCES_METER_TYPE[module],
      ...result,
    }
    return itemObject
  }

  getOneSourceAllMeterData = (item, params, module) => {
    if (params.start) {
      item.start = params.start * 1000
    }

    if (params.end) {
      item.end = params.end * 1000
    }

    if (params.step) {
      item.step = getTimeStr(params.step)
    }

    item.values = fillEmptyMeterValue(
      { start: params.start, end: params.end, step: params.step.slice(0, -1) },
      item.values
    )

    return handleValueByUnit(item, module)
  }

  handleAllMeterData = (result, params, module) => {
    const _result = result.results.map(item => {
      if (item.data.result) {
        const _item = this.setOneSourceAllMeterByType(item, module)
        return this.getOneSourceAllMeterData(_item, params, module)
      }
      return false
    })
    return handleSortBySourceType(_result)
  }

  handleOneMeterData = (result, module) => {
    const _result = result.results[0]
    const data = get(_result, 'data.result', [])
    const metricName = get(_result, 'metric_name', '')
    let meterData = []

    if (!isEmpty(data)) {
      meterData = data.map(meter => {
        meter = {
          type: metricName,
          module: RESOURCES_METER_TYPE[module],
          ...meter,
        }
        return handleValueByUnit(meter, module)
      })
    }
    return meterData
  }

  @action
  async fetchMeter({
    cluster,
    workspaces,
    namespaces,
    applications,
    services,
    deployments,
    statefulsets,
    pods,
    nodes,
    ...filter
  } = {}) {
    this.isLoading = true
    let url = ''
    let params = {}
    this.cluster = cluster

    const resource = this.getResource({
      cluster,
      workspaces,
      namespaces,
      applications,
      services,
      deployments,
      statefulsets,
      pods,
      nodes,
    })

    if (filter.operation || filter.module === 'namespaces') {
      url = `${this.tenantUrl}/meterings`
      params = this.getExportParams({
        ...resource,
        ...filter,
      })
    } else {
      params = this.getParams({
        deployments,
        statefulsets,
        pods,
        nodes,
        ...filter,
      })

      url = this.getApi({
        module: filter.module,
        ...resource,
      })
    }

    const result = await request.get(url, params, {}, () => {
      return []
    })

    this.isLoading = false

    if (filter.operation) {
      return result
    }

    if (!isEmpty(result) && isArray(result.results)) {
      const { module, meters } = filter

      if (meters === 'all') {
        const data = this.handleAllMeterData(result, params, module)
        this.data = data
        return data
      }
      const meterData = this.handleOneMeterData(result, module)
      this.data = meterData
      return meterData
    }
    this.data = []
    return []
  }

  @action
  fetchPrice = async () => {
    const url = `${this.tenantUrl}/metering/price_info`
    const result = await request.get(url, {}, {}, () => {
      return {}
    })

    if (result && !isEmpty(result)) {
      const _result = {}
      Object.keys(result).forEach(key => {
        _result[FEE_CONFIG[key]] = result[key]
      })
      return _result
    }
  }
}
