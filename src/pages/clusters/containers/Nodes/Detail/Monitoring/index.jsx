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
import { get, isEmpty } from 'lodash'

import { getChartData, getAreaChartOps } from 'utils/monitoring'
import NodeMonitorStore from 'stores/monitoring/node'

import { Controller as MonitoringController } from 'components/Cards/Monitoring'
import { SimpleArea } from 'components/Charts'
import CustomTooltip from 'components/Charts/Custom/Tooltip'

const MetricTypes = {
  cpu_utilisation: 'node_cpu_utilisation',
  cpu_load1: 'node_load1',
  cpu_load5: 'node_load5',
  cpu_load15: 'node_load15',
  memory_utilisation: 'node_memory_utilisation',
  disk_utilisation: 'node_disk_size_utilisation',
  disk_inode_utilisation: 'node_disk_inode_utilisation',
  device_size_utilisation: 'node_device_size_utilisation',
  disk_inode_usage: 'node_disk_inode_usage',
  disk_inode_total: 'node_disk_inode_total',
  disk_read_iops: 'node_disk_read_iops',
  disk_write_iops: 'node_disk_write_iops',
  disk_read_throughput: 'node_disk_read_throughput',
  disk_write_throughput: 'node_disk_write_throughput',
  net_transmitted: 'node_net_bytes_transmitted',
  net_received: 'node_net_bytes_received',
}

@inject('detailStore')
@observer
class Monitorings extends React.Component {
  constructor(props) {
    super(props)

    this.monitorStore = new NodeMonitorStore({ cluster: this.cluster })
  }

  get store() {
    return this.props.detailStore
  }

  get cluster() {
    return this.props.match.params.cluster
  }

  get metrics() {
    return this.monitorStore.data
  }

  fetchData = params => {
    const { name, role = [] } = this.store.detail
    this.monitorStore.fetchMetrics({
      resources: [name],
      metrics: Object.values(MetricTypes),
      fillZero: !role.includes('edge'),
      ...params,
    })
  }

  getMonitoringCfgs = () => {
    const deviceUsage = get(
      this.metrics,
      `${MetricTypes.device_size_utilisation}.data.result`,
      []
    )
    const legend = deviceUsage && deviceUsage.map(item => item.metric.device)

    return [
      {
        type: 'utilisation',
        title: 'CPU_USAGE',
        unit: '%',
        legend: ['CPU_USAGE'],
        data: get(this.metrics, `${MetricTypes.cpu_utilisation}.data.result`),
      },
      {
        type: 'load',
        title: 'AVERAGE_CPU_LOAD',
        legend: [
          t('TIME_M', { num: 1 }),
          t('TIME_M', { num: 5 }),
          t('TIME_M', { num: 15 }),
        ],
        data: [
          get(this.metrics, `${MetricTypes.cpu_load1}.data.result[0]`, {}),
          get(this.metrics, `${MetricTypes.cpu_load5}.data.result[0]`, {}),
          get(this.metrics, `${MetricTypes.cpu_load15}.data.result[0]`, {}),
        ],
      },
      {
        type: 'utilisation',
        title: 'MEMORY_USAGE',
        unit: '%',
        legend: ['MEMORY_USAGE'],
        data: get(
          this.metrics,
          `${MetricTypes.memory_utilisation}.data.result`
        ),
      },
      {
        type: 'utilisation',
        title: 'DISK_USAGE_DETAILS',
        unit: '%',
        legend: ['AVERAGE_USAGE', ...legend],
        data: [
          get(this.metrics, `${MetricTypes.disk_utilisation}.data.result[0]`),
          ...deviceUsage,
        ],
      },
      {
        type: 'utilisation',
        title: 'INODE_USAGE',
        unit: '%',
        legend: ['INODE_USAGE'],
        data: get(
          this.metrics,
          `${MetricTypes.disk_inode_utilisation}.data.result`
        ),
        renderTooltip: () => {
          const usageData = getChartData({
            unit: '',
            legend: ['USAGE'],
            valuesData: [
              get(
                this.metrics,
                `${MetricTypes.disk_inode_usage}.data.result[0].values`,
                []
              ),
            ],
          })
          const totalData = getChartData({
            unit: '',
            legend: ['USAGE'],
            valuesData: [
              get(
                this.metrics,
                `${MetricTypes.disk_inode_total}.data.result[0].values`,
                []
              ),
            ],
          })

          return <CustomTooltip usageData={usageData} totalData={totalData} />
        },
      },
      {
        type: 'iops',
        title: 'IOPS',
        legend: ['READ', 'WRITE'],
        data: [
          get(this.metrics, `${MetricTypes.disk_read_iops}.data.result[0]`, {}),
          get(
            this.metrics,
            `${MetricTypes.disk_write_iops}.data.result[0]`,
            {}
          ),
        ],
      },
      {
        type: 'throughput',
        title: 'DISK_THROUGHPUT',
        unitType: 'throughput',
        legend: ['READ', 'WRITE'],
        data: [
          get(
            this.metrics,
            `${MetricTypes.disk_read_throughput}.data.result[0]`,
            {}
          ),
          get(
            this.metrics,
            `${MetricTypes.disk_write_throughput}.data.result[0]`,
            {}
          ),
        ],
      },
      {
        type: 'bandwidth',
        title: 'NETWORK_TRAFFIC',
        unitType: 'bandwidth',
        legend: ['OUT', 'IN'],
        data: [
          get(
            this.metrics,
            `${MetricTypes.net_transmitted}.data.result[0]`,
            {}
          ),
          get(this.metrics, `${MetricTypes.net_received}.data.result[0]`, {}),
        ],
      },
    ]
  }

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

          return <SimpleArea key={config.title} width="100%" {...config} />
        })}
      </MonitoringController>
    )
  }
}

export default Monitorings
