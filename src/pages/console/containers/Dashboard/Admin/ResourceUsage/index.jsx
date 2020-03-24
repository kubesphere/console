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

import {
  getSuitableUnit,
  getValueByUnit,
  getLastMonitoringData,
} from 'utils/monitoring'
import ClusterMonitorStore from 'stores/monitoring/cluster'

import { Loading } from '@pitrix/lego-ui'
import { Card } from 'components/Base'
import { SimpleCircle } from 'components/Charts'
import { UsageRank } from 'console/components/Cards/Monitoring'

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

@inject('rootStore')
@observer
export default class ResourceUsage extends React.Component {
  constructor(props) {
    super(props)

    this.monitorStore = new ClusterMonitorStore()
    this.fetchData()
  }

  get routing() {
    return this.props.rootStore.routing
  }

  get metrics() {
    return this.monitorStore.data
  }

  fetchData = () => {
    this.monitorStore.fetchMetrics({
      metrics: Object.values(MetricTypes),
      last: true,
    })
  }

  getValue = data => get(data, 'value[1]', 0)

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
        name: 'Local Storage',
        unitType: 'disk',
        used: this.getValue(data[MetricTypes.disk_size_usage]),
        total: this.getValue(data[MetricTypes.disk_size_capacity]),
      },
      {
        name: 'Pod',
        unit: '',
        used: this.getValue(data[MetricTypes.pod_count]),
        total: this.getValue(data[MetricTypes.pod_capacity]),
      },
    ]
  }

  renderResourceList() {
    const options = this.getResourceOptions()

    return (
      <div className={styles.tabList}>
        {options.map((op, index) => {
          const nameText = t(op.name)
          const unit = getSuitableUnit(op.total, op.unitType) || op.unit
          const used = getValueByUnit(op.used, unit)
          const total = getValueByUnit(op.total, unit)

          return (
            <div key={index} className={styles.tab}>
              <SimpleCircle
                className={styles.circle}
                width={40}
                height={40}
                title={nameText}
                value={parseFloat(used)}
                total={parseFloat(total)}
                unit={unit}
                showCenter={false}
              />
              <div className={styles.info}>
                <div className={styles.title}>
                  {nameText} {t(unit)}
                </div>
                <p title={`${used}/${total}`}>
                  {used}
                  <span>/{total}</span>
                </p>
              </div>
              <img className={styles.img} src="/assets/banner-icon-1.svg" />
            </div>
          )
        })}
      </div>
    )
  }

  render() {
    return (
      <Loading spinning={this.monitorStore.isLoading}>
        <Card className={styles.card} title={t('RESOURCE_USAGE_TITLE')}>
          <div className={styles.content}>
            {this.renderResourceList()}
            <UsageRank className={styles.rank} />
          </div>
        </Card>
      </Loading>
    )
  }
}
