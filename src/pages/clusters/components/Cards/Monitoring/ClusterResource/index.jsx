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
import { get } from 'lodash'

import { getLastMonitoringData, getAreaChartOps } from 'utils/monitoring'
import ClusterMonitorStore from 'stores/monitoring/cluster'

import { SimpleArea } from 'components/Charts'

import { StatusTabs } from 'components/Cards/Monitoring'
import TabItem from './Tab'

const MetricTypes = {
  cpu_usage: 'cluster_cpu_usage',
  cpu_total: 'cluster_cpu_total',
  cpu_utilisation: 'cluster_cpu_utilisation',
  memory_usage: 'cluster_memory_usage_wo_cache',
  memory_total: 'cluster_memory_total',
  memory_utilisation: 'cluster_memory_utilisation',
  disk_size_usage: 'cluster_disk_size_usage',
  disk_size_capacity: 'cluster_disk_size_capacity',
  disk_utilisation: 'cluster_disk_size_utilisation',
  pod_count: 'cluster_pod_running_count',
  pod_capacity: 'cluster_pod_quota',
}

@inject('rootStore')
@observer
export default class ClusterResourceStatusTab extends React.Component {
  constructor(props) {
    super(props)

    this.monitorStore = new ClusterMonitorStore({ cluster: props.cluster })
  }

  get routing() {
    return this.props.rootStore.routing
  }

  get metrics() {
    return this.monitorStore.data
  }

  fetchData = (params = {}) => {
    this.monitorStore.fetchMetrics({
      metrics: Object.values(MetricTypes),
      step: '5m',
      times: 100,
      ...params,
    })
  }

  getValue = data => get(data, 'value[1]', 0)

  getTabOptions = () => {
    const lastData = getLastMonitoringData(this.metrics)
    const result = [
      {
        name: 'CPU',
        unitType: 'cpu',
        used: this.getValue(lastData[MetricTypes.cpu_usage]),
        total: this.getValue(lastData[MetricTypes.cpu_total]),
      },
      {
        name: 'MEMORY',
        unitType: 'memory',
        used: this.getValue(lastData[MetricTypes.memory_usage]),
        total: this.getValue(lastData[MetricTypes.memory_total]),
      },
      {
        name: 'DISK',
        unitType: 'disk',
        used: this.getValue(lastData[MetricTypes.disk_size_usage]),
        total: this.getValue(lastData[MetricTypes.disk_size_capacity]),
      },
      {
        name: 'PODS',
        unit: '',
        used: this.getValue(lastData[MetricTypes.pod_count]),
        total: this.getValue(lastData[MetricTypes.pod_capacity]),
      },
    ]

    return result.map(item => ({
      props: item,
      component: TabItem,
    }))
  }

  getContentOptions = () => {
    const result = [
      {
        type: 'utilisation',
        title: 'CPU_USAGE',
        unit: '%',
        legend: ['USAGE'],
        data: get(this.metrics, `${MetricTypes.cpu_utilisation}.data.result`),
      },
      {
        type: 'utilisation',
        title: 'MEMORY_USAGE',
        unit: '%',
        legend: ['USAGE'],
        data: get(
          this.metrics,
          `${MetricTypes.memory_utilisation}.data.result`
        ),
      },
      {
        type: 'utilisation',
        title: 'DISK_USAGE',
        unit: '%',
        legend: ['USAGE'],
        data: get(this.metrics, `${MetricTypes.disk_utilisation}.data.result`),
      },
      {
        title: 'POD_COUNT',
        unit: '',
        legend: ['COUNT'],
        data: get(this.metrics, `${MetricTypes.pod_count}.data.result`),
      },
    ]

    return result.map(item => ({
      props: item,
      render: this.renderChart,
    }))
  }

  renderChart(option) {
    const commonProps = {
      key: option.title,
      width: '100%',
      height: '100%',
    }

    switch (option.type) {
      default:
      case 'area': {
        const config = getAreaChartOps(option)
        return <SimpleArea {...commonProps} {...config} />
      }
    }
  }

  render() {
    const { isLoading, isRefreshing } = this.monitorStore

    return (
      <StatusTabs
        title={t('CLUSTER_RESOURCE_USAGE')}
        tabOptions={this.getTabOptions()}
        contentOptions={this.getContentOptions()}
        loading={isLoading}
        refreshing={isRefreshing}
        onFetch={this.fetchData}
      />
    )
  }
}
