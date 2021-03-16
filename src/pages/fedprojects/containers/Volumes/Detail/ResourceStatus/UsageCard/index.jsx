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
import { Loading } from '@kube-design/components'
import { get } from 'lodash'

import {
  getAreaChartOps,
  getLastMonitoringData,
  getValueByUnit,
  getSuitableUnit,
  getChartData,
} from 'utils/monitoring'

import VolumeStatus from 'projects/components/Charts/VolumeUsage'
import CustomTooltip from 'components/Charts/Custom/Tooltip'
import { Panel } from 'components/Base'
import { SimpleArea } from 'components/Charts'
import ClusterTitle from 'components/Clusters/ClusterTitle'

import VolumeMonitor from 'stores/monitoring/volume'

import styles from './index.scss'

const METRICS = {
  inodeUsage: 'pvc_inodes_used',
  inodeTotal: 'pvc_inodes_total',
  inodeUtilisation: 'pvc_inodes_utilisation',
  capacityAvailable: 'pvc_bytes_available',
  capacityTotal: 'pvc_bytes_total',
  capacityUtilisation: 'pvc_bytes_utilisation',
}

const UPDATE_INTERVAL = 60000

@observer
export default class UsageCard extends Component {
  constructor(props) {
    super(props)

    const { namespace, name } = this.props.match.params
    const { cluster } = this.props

    this.monitor = new VolumeMonitor({
      cluster: cluster.name,
      namespace,
      pvc: name,
    })
  }

  componentDidMount() {
    this.timer = this.monitor.monitoringMetrics(
      {
        step: '1m',
        times: 60,
        metrics: Object.values(METRICS),
      },
      { interval: UPDATE_INTERVAL }
    )
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  parseMetrics(value, type) {
    const unit = getSuitableUnit(value, type)
    const count = getValueByUnit(value, unit)

    return { unit, count }
  }

  render() {
    const { isLoading, isRefreshing } = this.monitor

    return (
      <Panel>
        <Loading spinning={isLoading}>
          <div data-refreshing={isRefreshing}>
            {this.renderStatus()}
            {this.renderMonitor()}
          </div>
        </Loading>
      </Panel>
    )
  }

  renderStatus() {
    const { cluster } = this.props
    const { data } = this.monitor
    const status = getLastMonitoringData(data)

    const capacityAvailable = get(
      status,
      `${METRICS.capacityAvailable}.value[1]`,
      0
    )

    const capacityTotal = get(status, `${METRICS.capacityTotal}.value[1]`, 0)

    const available = this.parseMetrics(capacityAvailable, 'memory')
    const total = this.parseMetrics(capacityTotal, 'memory')

    const currentUsageRate = get(
      status,
      `${METRICS.capacityUtilisation}.value[1]`,
      0
    )

    return (
      <header className={styles.header}>
        <div className={styles.cluster}>
          <ClusterTitle
            cluster={cluster}
            theme="light"
            tagClass="float-right"
          />
        </div>
        <div className={styles.space} />
        <div className={styles.card}>
          <VolumeStatus rate={Number(currentUsageRate)} />
        </div>
        <div className={styles.description}>
          <h3>
            {available.count}
            <small>{available.unit}</small>
          </h3>
          <p>{t('Available Capacity')}</p>
        </div>
        <div className={styles.description}>
          <h3>
            {total.count}
            <small>{total.unit}</small>
          </h3>
          <p>{t('Volume Capacity')}</p>
        </div>
      </header>
    )
  }

  renderMonitor() {
    const { data } = this.monitor

    const usageRate = get(data, `${METRICS.inodeUtilisation}.data.result`)
    const usage = get(data, `${METRICS.inodeUsage}.data.result[0].values`, [])
    const total = get(data, `${METRICS.inodeTotal}.data.result[0].values`, [])

    const config = getAreaChartOps({
      title: `Inode ${t('USAGE_RATE')}`,
      unit: '%',
      legend: ['UTILIZATION'],
      data: usageRate,
      renderTooltip: () => {
        const usageData = getChartData({
          unit: '',
          legend: ['UTILIZATION'],
          valuesData: [usage],
        })
        const totalData = getChartData({
          unit: '',
          legend: ['UTILIZATION'],
          valuesData: [total],
        })

        return <CustomTooltip usageData={usageData} totalData={totalData} />
      },
    })

    return <SimpleArea width="100%" theme={'dark'} {...config} />
  }
}
