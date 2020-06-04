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

import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { get } from 'lodash'
import { Icon, Loading } from '@pitrix/lego-ui'
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from 'recharts'

import { Text, Panel } from 'components/Base'
import ClusterTitle from 'components/Clusters/ClusterTitle'
import ResourceItem from 'clusters/containers/Overview/Dashboard/ResourcesUsage/ResourceItem'

import ClusterMonitorStore from 'stores/monitoring/cluster'

import { getLastMonitoringData } from 'utils/monitoring'

import styles from './index.scss'

const MetricTypes = {
  cpu_usage: 'cluster_cpu_usage',
  cpu_total: 'cluster_cpu_total',
  memory_usage: 'cluster_memory_usage_wo_cache',
  memory_total: 'cluster_memory_total',
  disk_size_usage: 'cluster_disk_size_usage',
  disk_size_capacity: 'cluster_disk_size_capacity',
  pod_count: 'cluster_pod_running_count',
  pod_capacity: 'cluster_pod_quota',
}

@observer
export default class Card extends Component {
  monitorStore = new ClusterMonitorStore({ cluster: this.props.cluster.name })

  componentDidMount() {
    this.fetchData()
  }

  get metrics() {
    return this.monitorStore.data
  }

  getValue = data => get(data, 'value[1]', 0)

  fetchData = () => {
    this.monitorStore.fetchMetrics({
      metrics: Object.values(MetricTypes),
      last: true,
    })
  }

  getResourceOptions = () => {
    const data = getLastMonitoringData(this.metrics)
    return [
      {
        name: 'CPU',
        unitType: 'cpu',
        used: this.getValue(data[MetricTypes.cpu_usage]),
        total: this.getValue(data[MetricTypes.cpu_total]),
      },
      {
        name: 'Memory',
        unitType: 'memory',
        used: this.getValue(data[MetricTypes.memory_usage]),
        total: this.getValue(data[MetricTypes.memory_total]),
      },
      {
        name: 'Pod',
        unitType: '',
        used: this.getValue(data[MetricTypes.pod_count]),
        total: this.getValue(data[MetricTypes.pod_capacity]),
      },
      {
        name: 'Local Storage',
        unitType: 'disk',
        used: this.getValue(data[MetricTypes.disk_size_usage]),
        total: this.getValue(data[MetricTypes.disk_size_capacity]),
      },
    ]
  }

  getRadarOptions = options =>
    options.map(option => ({
      name: t(option.name),
      usage: Math.round((option.used * 100) / (option.total || option.used)),
    }))

  render() {
    const { cluster } = this.props
    const options = this.getResourceOptions()
    const radarOptions = this.getRadarOptions(options)

    return (
      <Panel key={cluster.name}>
        <Loading spinning={this.monitorStore.isLoading}>
          <div className={styles.cluster}>
            <div className={styles.info}>
              <div className={styles.title}>
                <ClusterTitle cluster={cluster} />
              </div>
              <div className={styles.desc}>
                <Text
                  title={cluster.kubernetesVersion}
                  description={t('Kubernetes Version')}
                />
                <Text
                  title={cluster.provider || '-'}
                  description={t('Provider')}
                />
              </div>
              <div className={styles.chart}>
                <RadarChart
                  cx={136}
                  cy={100}
                  width={250}
                  height={200}
                  data={radarOptions}
                >
                  <PolarGrid gridType="circle" />
                  <PolarAngleAxis dataKey="name" />
                  <PolarRadiusAxis domain={[0, 100]} />
                  <Radar dataKey="usage" stroke="#345681" fill="#1c2d4267" />
                </RadarChart>
              </div>
              <Icon name="cluster" size={200} className={styles.cornerIcon} />
            </div>
            <div className={styles.monitor}>
              {options.map(option => (
                <ResourceItem key={option.name} {...option} />
              ))}
            </div>
          </div>
        </Loading>
      </Panel>
    )
  }
}
