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

import { ICON_TYPES } from 'utils/constants'
import { getAreaChartOps } from 'utils/monitoring'
import ComponentMonitorStore from 'stores/monitoring/component'

import { SimpleArea } from 'components/Charts'
import { StatusTabs } from 'components/Cards/Monitoring'
import { ETCDNodes } from 'clusters/components/Cards/Monitoring'
import TabItem from './Tab'

const MetricTypes = {
  proposals_committed_rate: 'etcd_server_proposals_committed_rate',
  proposals_applied_rate: 'etcd_server_proposals_applied_rate',
  proposals_failed_rate: 'etcd_server_proposals_failed_rate',
  proposals_pending_count: 'etcd_server_proposals_pending_count',
  db_size: 'etcd_mvcc_db_size',
  client_received_bytes: 'etcd_network_client_grpc_received_bytes',
  client_sent_bytes: 'etcd_network_client_grpc_sent_bytes',
}

@inject('rootStore')
@observer
export default class ETCDStatusTab extends React.Component {
  constructor(props) {
    super(props)

    this.monitorStore = new ComponentMonitorStore({
      module: 'etcd',
      cluster: props.cluster,
    })
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

  getSpecificData = (metricName, type, value) => {
    const data =
      get(this.metrics, `${MetricTypes[metricName]}.data.result`) || []
    return data.find(item => get(item, `metric.${type}`) === value) || {}
  }

  getVerbData = value =>
    this.getSpecificData('request_latencies_apis', 'verb', value)

  getTabOptions = () => {
    const result = [
      {
        icon: ICON_TYPES['etcd'],
        name: 'etcd',
        title: 'ETCD_STATUS',
      },
      {
        icon: ICON_TYPES['etcd'],
        name: 'etcd',
        title: 'ETCD_PROPOSAL',
      },
      {
        icon: ICON_TYPES['etcd'],
        name: 'etcd',
        title: 'ETCD_DB_SIZE',
      },
      {
        icon: ICON_TYPES['etcd'],
        name: 'etcd',
        title: 'ETCD_CLIENT_TRAFFIC',
      },
    ]

    return result.map(item => ({
      props: item,
      component: TabItem,
    }))
  }

  getContentOptions = () => {
    const metrics = this.metrics
    const result = [
      {
        props: {
          cluster: this.props.cluster,
        },
        component: ETCDNodes,
      },
      {
        props: {
          type: 'area',
          title: 'RAFT_PROPOSAL',
          unit: t('TIMES_PER_SECOND'),
          legend: [
            'PROPOSAL_COMMITTED',
            'PROPOSAL_APPLIED',
            'PROPOSAL_FAILED',
            'PROPOSAL_PENDING',
          ],
          data: [
            get(
              metrics,
              `${MetricTypes.proposals_committed_rate}.data.result[0]`
            ),
            get(
              metrics,
              `${MetricTypes.proposals_applied_rate}.data.result[0]`
            ),
            get(metrics, `${MetricTypes.proposals_failed_rate}.data.result[0]`),
            get(
              metrics,
              `${MetricTypes.proposals_pending_count}.data.result[0]`
            ),
          ],
          areaColors: ['blue', 'green', 'red', 'yellow'],
        },
        render: this.renderChart,
      },
      {
        props: {
          type: 'area',
          title: 'DB_SIZE',
          unitType: 'memory',
          legend: ['DB_SIZE'],
          data: get(metrics, `${MetricTypes.db_size}.data.result`),
        },
        render: this.renderChart,
      },
      {
        props: {
          type: 'area',
          title: 'CLIENT_TRAFFIC',
          unitType: 'traffic',
          legend: ['RECEIVED', 'SENT'],
          data: [
            get(metrics, `${MetricTypes.client_received_bytes}.data.result[0]`),
            get(metrics, `${MetricTypes.client_sent_bytes}.data.result[0]`),
          ],
        },
        render: this.renderChart,
      },
    ]

    return result
  }

  renderChart(option) {
    const commonProps = {
      key: option.title,
      width: '100%',
      height: '100%',
    }
    const config = getAreaChartOps(option)

    if (isEmpty(config.data)) return null

    switch (option.type) {
      default:
        return <SimpleArea {...commonProps} {...config} />
    }
  }

  render() {
    const { isLoading, isRefreshing } = this.monitorStore

    return (
      <StatusTabs
        title={t('ETCD_MONITORING')}
        tabOptions={this.getTabOptions()}
        contentOptions={this.getContentOptions()}
        loading={isLoading}
        refreshing={isRefreshing}
        onFetch={this.fetchData}
      />
    )
  }
}
