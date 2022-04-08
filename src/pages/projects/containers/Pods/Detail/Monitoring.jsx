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

import React from 'react'
import { observer, inject } from 'mobx-react'
import { isEmpty, get } from 'lodash'

import { getAreaChartOps } from 'utils/monitoring'
import PodMonitorStore from 'stores/monitoring/pod'

import { Controller as MonitoringController } from 'components/Cards/Monitoring'
import { SimpleArea } from 'components/Charts'

const MetricTypes = {
  cpu_usage: 'pod_cpu_usage',
  memory_usage: 'pod_memory_usage_wo_cache',
  net_transmitted: 'pod_net_bytes_transmitted',
  net_received: 'pod_net_bytes_received',
}

class Monitorings extends React.Component {
  constructor(props) {
    super(props)

    this.monitorStore = new PodMonitorStore()
  }

  get store() {
    return this.props.detailStore
  }

  get metrics() {
    return this.monitorStore.data
  }

  fetchData = params => {
    const { cluster, namespace, name } = this.store.detail
    this.monitorStore.fetchMetrics({
      cluster,
      namespace,
      pod: name,
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
    {
      type: 'bandwidth',
      title: 'OUTBOUND_TRAFFIC',
      unitType: 'bandwidth',
      legend: ['OUTBOUND'],
      data: get(this.metrics, `${MetricTypes.net_transmitted}.data.result`),
    },
    {
      type: 'bandwidth',
      title: 'INBOUND_TRAFFIC',
      unitType: 'bandwidth',
      legend: ['INBOUND'],
      data: get(this.metrics, `${MetricTypes.net_received}.data.result`),
    },
  ]

  render() {
    const { createTime } = this.store.detail
    const { isLoading, isRefreshing } = this.monitorStore
    const configs = this.getMonitoringCfgs()

    return (
      <MonitoringController
        createTime={createTime}
        onFetch={this.fetchData}
        loading={isLoading}
        refreshing={isRefreshing}
        isEmpty={isEmpty(this.metrics)}
      >
        {configs.map(item => {
          const config = getAreaChartOps(item)

          if (isEmpty(config.data)) return null

          return <SimpleArea key={item.title} width="100%" {...config} />
        })}
      </MonitoringController>
    )
  }
}

export default inject('rootStore', 'detailStore')(observer(Monitorings))
export const Component = Monitorings
