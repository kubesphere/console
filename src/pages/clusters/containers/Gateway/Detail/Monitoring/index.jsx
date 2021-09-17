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
import GatewayMonitor from 'stores/monitoring/gateway'
import { Select } from '@kube-design/components'
import { Controller as MonitoringController } from 'components/Cards/Monitoring'
import { SimpleArea } from 'components/Charts'
import MonitoringOverview from '../../Components/MonitoringOverview'

const MetricTypes = {
  ingress_request_count: 'ingress_request_count',
  ingress_request_5xx_count: 'ingress_request_5xx_count',
  ingress_request_4xx_count: 'ingress_request_4xx_count',
  ingress_active_connections: 'ingress_active_connections',
  ingress_success_rate: 'ingress_success_rate',
  ingress_request_duration_average: 'ingress_request_duration_average',
  ingress_request_duration_50percentage:
    'ingress_request_duration_50percentage',
  ingress_request_duration_95percentage:
    'ingress_request_duration_95percentage',
  ingress_request_duration_99percentage:
    'ingress_request_duration_99percentage',
}

@inject('detailStore')
@observer
class Monitorings extends React.Component {
  monitorStore = new GatewayMonitor({ cluster: this.cluster })

  state = {
    options: [],
    podsName: '',
  }

  get store() {
    return this.props.detailStore
  }

  get detail() {
    return this.store.gateway.data
  }

  get cluster() {
    return this.props.match.params.cluster
  }

  get metrics() {
    return this.monitorStore.data
  }

  fetchData = async params => {
    const { namespace } = this.props.match.params
    const { name } = this.detail
    const podName = await this.getGatewayPods()

    this.monitorStore.fetchMetrics({
      resources: [],
      metrics: Object.values(MetricTypes),
      job: `${name}-metrics`,
      namespace,
      pod: podName,
      fillZero: true,
      ...params,
    })
    this.setState({ timeParams: params })
  }

  handlePodName = value => {
    const { namespace } = this.props.match.params
    const { name } = this.detail
    const { timeParams } = this.state
    this.monitorStore.fetchMetrics({
      resources: [],
      metrics: Object.values(MetricTypes),
      job: `${name}-metrics`,
      namespace,
      pod: value,
      ...timeParams,
    })

    this.setState({ podsName: value })
  }

  getGatewayPods = async () => {
    const result = await this.store.getGatewayPods(this.props.match.params)
    let podsName = ''
    const options = !isEmpty(result)
      ? result.map(item => {
          return { label: item.name, value: item.name }
        })
      : []
    podsName = isEmpty(options) ? '' : options[0].value
    this.setState({ options, podsName })
    return podsName
  }

  getMonitoringCfgs = () => [
    {
      title: 'Request Count',
      unit: '',
      legend: ['Utilization'],
      data: get(
        this.metrics,
        `${MetricTypes.ingress_request_count}.data.result`,
        {}
      ),
    },
    {
      title: 'Active Connections',
      unit: '',
      legend: ['Utilization'],
      data: get(
        this.metrics,
        `${MetricTypes.ingress_active_connections}.data.result`,
        {}
      ),
    },

    {
      title: 'Request Duration',
      legend: [
        t('Duration 50percentage'),
        t('Duration 95percentage'),
        t('Duration 99percentage'),
        t('Duration Average'),
      ],

      data: [
        get(
          this.metrics,
          `${MetricTypes.ingress_request_duration_50percentage}.data.result[0]`,
          {}
        ),
        get(
          this.metrics,
          `${MetricTypes.ingress_request_duration_95percentage}.data.result[0]`,
          {}
        ),
        get(
          this.metrics,
          `${MetricTypes.ingress_request_duration_99percentage}.data.result[0]`,
          {}
        ),
        get(
          this.metrics,
          `${MetricTypes.ingress_request_duration_average}.data.result[0]`,
          {}
        ),
      ],
      dot: 4,
    },

    {
      title: 'Request Error',
      unit: '',
      legend: [t('Request 4xx'), t('Request 5xx')],
      data: [
        get(
          this.metrics,
          `${MetricTypes.ingress_request_4xx_count}.data.result[0]`,
          {}
        ),
        get(
          this.metrics,
          `${MetricTypes.ingress_request_5xx_count}.data.result[0]`,
          {}
        ),
      ],
    },
  ]

  render() {
    const { createTime } = this.store.detail
    const { isLoading, isRefreshing } = this.monitorStore
    const { podsName, options } = this.state
    const configs = this.getMonitoringCfgs()

    return (
      <div>
        <MonitoringOverview {...this.props} />
        <MonitoringController
          createTime={createTime}
          onFetch={this.fetchData}
          loading={isLoading}
          refreshing={isRefreshing}
          title={
            <Select
              value={podsName}
              options={options}
              onChange={this.handlePodName}
            />
          }
          isEmpty={isEmpty(this.metrics)}
        >
          {configs.map(item => {
            const config = getAreaChartOps(item)

            if (isEmpty(config.data)) return null

            return <SimpleArea key={config.title} width="100%" {...config} />
          })}
        </MonitoringController>
      </div>
    )
  }
}

export default Monitorings
