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

import { getAreaChartOps } from 'utils/monitoring'
import ComponentMonitorStore from 'stores/monitoring/component'

import { SimpleArea, PercentArea } from 'components/Charts'
import { Controller as MonitoringController } from 'components/Cards/Monitoring'
import { ETCDNodes } from 'clusters/components/Cards/Monitoring'

import styles from './index.scss'

const MetricTypes = {
  proposals_committed_rate: 'etcd_server_proposals_committed_rate',
  proposals_applied_rate: 'etcd_server_proposals_applied_rate',
  proposals_failed_rate: 'etcd_server_proposals_failed_rate',
  proposals_pending_count: 'etcd_server_proposals_pending_count',
  db_size: 'etcd_mvcc_db_size',
  client_received_bytes: 'etcd_network_client_grpc_received_bytes',
  client_sent_bytes: 'etcd_network_client_grpc_sent_bytes',
  grpc_received_rate: 'etcd_grpc_server_msg_received_rate',
  grpc_sent_rate: 'etcd_grpc_server_msg_sent_rate',
  wal_fsync_duration_average: 'etcd_disk_wal_fsync_duration',
  wal_fsync_duration_quantile: 'etcd_disk_wal_fsync_duration_quantile',
  backend_commit_duration_average: 'etcd_disk_backend_commit_duration',
  backend_commit_duration_quantile:
    'etcd_disk_backend_commit_duration_quantile',
}

@inject('rootStore')
@observer
class EtcdMonitorings extends React.Component {
  constructor(props) {
    super(props)

    this.monitorStore = new ComponentMonitorStore({
      module: 'etcd',
      cluster: props.match.params.cluster,
    })
  }

  get metrics() {
    return this.monitorStore.data
  }

  fetchData = params => {
    this.monitorStore.fetchMetrics({
      metrics: Object.values(MetricTypes),
      ...params,
    })
  }

  getQuantileData = (metricName, quantile) => {
    const data =
      get(this.metrics, `${MetricTypes[metricName]}.data.result`) || []
    return data.find(item => get(item, 'metric.quantile') === quantile) || {}
  }

  getMonitoringCfgs = () => [
    {
      type: 'size',
      title: 'DB Size',
      unitType: 'memory',
      legend: ['DB Size'],
      data: get(this.metrics, `${MetricTypes.db_size}.data.result`),
    },
    {
      type: 'area',
      title: 'Client Traffic',
      unitType: 'traffic',
      legend: ['Received', 'Sent'],
      data: [
        get(
          this.metrics,
          `${MetricTypes.client_received_bytes}.data.result[0]`
        ),
        get(this.metrics, `${MetricTypes.client_sent_bytes}.data.result[0]`),
      ],
    },
    {
      type: 'area',
      title: 'gRPC Stream Messages',
      unit: 'times/s',
      legend: ['Received', 'Sent'],
      data: [
        get(this.metrics, `${MetricTypes.grpc_received_rate}.data.result[0]`),
        get(this.metrics, `${MetricTypes.grpc_sent_rate}.data.result[0]`),
      ],
    },
    {
      type: 'grade',
      title: 'WAL Fsync',
      unit: 'ms',
      legend: ['99th', '90th', '50th', 'AVERAGE'],
      data: [
        this.getQuantileData('wal_fsync_duration_quantile', '0.99'),
        this.getQuantileData('wal_fsync_duration_quantile', '0.9'),
        this.getQuantileData('wal_fsync_duration_quantile', '0.5'),
        get(
          this.metrics,
          `${MetricTypes.wal_fsync_duration_average}.data.result[0]`
        ),
      ],
    },
    {
      type: 'grade',
      title: 'DB Fsync',
      unit: 'ms',
      legend: ['99th', '90th', '50th', 'AVERAGE'],
      data: [
        this.getQuantileData('backend_commit_duration_quantile', '0.99'),
        this.getQuantileData('backend_commit_duration_quantile', '0.9'),
        this.getQuantileData('backend_commit_duration_quantile', '0.5'),
        get(
          this.metrics,
          `${MetricTypes.backend_commit_duration_average}.data.result[0]`
        ),
      ],
    },
    {
      type: 'area',
      title: 'Raft Proposals',
      unit: 'times/s',
      legend: [
        'Proposal Commit Rate',
        'Proposal Apply Rate',
        'Proposal Failure Rate',
        'Proposal Pending Total',
      ],
      data: [
        get(
          this.metrics,
          `${MetricTypes.proposals_committed_rate}.data.result[0]`
        ),
        get(
          this.metrics,
          `${MetricTypes.proposals_applied_rate}.data.result[0]`
        ),
        get(
          this.metrics,
          `${MetricTypes.proposals_failed_rate}.data.result[0]`
        ),
        get(
          this.metrics,
          `${MetricTypes.proposals_pending_count}.data.result[0]`
        ),
      ],
      areaColors: ['blue', 'green', 'red', 'yellow'],
    },
  ]

  renderChart(item) {
    const commonProps = {
      width: '100%',
      height: 190,
    }
    const config = getAreaChartOps(item)

    if (isEmpty(config.data)) return null

    let content = null
    switch (item.type) {
      case 'grade':
        content = <PercentArea {...commonProps} {...config} />
        break
      default:
        content = <SimpleArea {...commonProps} {...config} />
        break
    }

    return (
      <div key={item.title} className={styles.box}>
        {content}
      </div>
    )
  }

  render() {
    const { isLoading, isRefreshing } = this.monitorStore
    const configs = this.getMonitoringCfgs()
    const cluster = this.props.match.params.cluster

    return (
      <MonitoringController
        title={t('ETCD Monitoring')}
        step="2m"
        times={50}
        onFetch={this.fetchData}
        loading={isLoading}
        refreshing={isRefreshing}
        isEmpty={isEmpty(this.metrics)}
      >
        <div className={styles.content}>
          <div className={styles.box}>
            <div className={styles.status}>
              <ETCDNodes cluster={cluster} />
            </div>
          </div>
          {configs.map(item => this.renderChart(item))}
        </div>
      </MonitoringController>
    )
  }
}

export default EtcdMonitorings
