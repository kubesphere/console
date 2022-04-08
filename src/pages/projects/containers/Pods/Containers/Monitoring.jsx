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

import { observer, inject } from 'mobx-react'
import { get } from 'lodash'

import ContainerMonitorStore from 'stores/monitoring/container'

import { Component as Base } from '../Detail/Monitoring'

const MetricTypes = {
  cpu_usage: 'container_cpu_usage',
  memory_usage: 'container_memory_usage_wo_cache',
}

class Monitorings extends Base {
  constructor(props) {
    super(props)

    this.monitorStore = new ContainerMonitorStore()
  }

  get podName() {
    return get(this.props.match, 'params.podName', '')
  }

  fetchData = params => {
    const { cluster, namespace, name } = this.store.detail
    this.monitorStore.fetchMetrics({
      cluster,
      namespace,
      container: name,
      podName: this.podName,
      metrics: Object.values(MetricTypes),
      ...params,
    })
  }

  getMonitoringCfgs = () => [
    {
      type: 'cpu',
      title: 'CPU_USAGE',
      unitType: 'cpu',
      legend: ['USAGE'],
      data: get(this.metrics, `${MetricTypes.cpu_usage}.data.result`),
    },
    {
      type: 'memory',
      title: 'MEMORY_USAGE',
      unitType: 'memory',
      legend: ['USAGE'],
      data: get(this.metrics, `${MetricTypes.memory_usage}.data.result`),
    },
  ]
}

export default inject('rootStore', 'detailStore')(observer(Monitorings))
export const Component = Monitorings
