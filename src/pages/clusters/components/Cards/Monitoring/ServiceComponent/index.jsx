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
import TabItem from './Tab'

const MetricTypes = {
  request_latencies_total: 'apiserver_request_latencies',
  request_latencies_apis: 'apiserver_request_by_verb_latencies',
  request_rate: 'apiserver_request_rate',
  schedule_attempts_count: 'scheduler_schedule_attempts',
  schedule_attempt_rate: 'scheduler_schedule_attempt_rate',
}

@inject('rootStore')
@observer
export default class ServiceComponentStatusTab extends React.Component {
  constructor(props) {
    super(props)

    this.apiStore = new ComponentMonitorStore({
      module: 'apiserver',
      cluster: props.cluster,
    })
    this.schedulerStore = new ComponentMonitorStore({
      module: 'scheduler',
      cluster: props.cluster,
    })
  }

  get routing() {
    return this.props.rootStore.routing
  }

  get metrics() {
    const apiData = this.apiStore.data
    const schedulerData = this.schedulerStore.data
    return {
      ...apiData,
      ...schedulerData,
    }
  }

  fetchData = async (params = {}) => {
    const data = {
      step: '5m',
      times: 100,
      ...params,
    }

    await this.apiStore.fetchMetrics({
      metrics: [
        MetricTypes.request_latencies_total,
        MetricTypes.request_latencies_apis,
        MetricTypes.request_rate,
      ],
      ...data,
    })

    await this.schedulerStore.fetchMetrics({
      metrics: [
        MetricTypes.schedule_attempts_count,
        MetricTypes.schedule_attempt_rate,
      ],
      ...data,
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
        icon: ICON_TYPES['apiserver'],
        name: 'API_SERVER',
        title: 'REQUEST_LATENCY_TCAP',
      },
      {
        icon: ICON_TYPES['apiserver'],
        name: 'API_SERVER',
        title: 'REQUEST_RATE',
      },
      {
        icon: ICON_TYPES['scheduler'],
        name: 'SCHEDULER',
        title: 'SCHEDULE_ATTEMPTS_TCAP',
      },
      {
        icon: ICON_TYPES['scheduler'],
        name: 'SCHEDULER',
        title: 'SCHEDULING_RATE_TCAP',
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
        type: 'area',
        title: 'REQUEST_LATENCY',
        unit: 'ms',
        legend: [
          'REST_GET',
          'REST_POST',
          'REST_PATCH',
          'REST_DELETE',
          'REST_PUT',
          'TOTAL_AVERAGE',
        ],
        data: [
          this.getVerbData('GET'),
          this.getVerbData('POST'),
          this.getVerbData('PATCH'),
          this.getVerbData('DELETE'),
          this.getVerbData('PUT'),
          get(metrics, `${MetricTypes.request_latencies_total}.data.result[0]`),
        ],
      },
      {
        type: 'area',
        title: 'REQUEST_PER_SECOND',
        unit: 'TIMES_PER_SECOND',
        legend: ['REQUEST'],
        data: get(metrics, `${MetricTypes.request_rate}.data.result`),
      },
      {
        type: 'area',
        title: 'SCHEDULE_ATTEMPTS',
        unit: '',
        legend: ['SUCCESS', 'ERROR', 'FAILURE'],
        data: [
          this.getSpecificData(
            'schedule_attempts_count',
            'result',
            'scheduled'
          ),
          this.getSpecificData('schedule_attempts_count', 'result', 'error'),
          this.getSpecificData(
            'schedule_attempts_count',
            'result',
            'unschedulable'
          ),
        ],
        areaColors: ['blue', 'red', 'yellow'],
      },
      {
        type: 'area',
        title: 'SCHEDULING_RATE',
        unit: 'TIMES_PER_SECOND',
        legend: ['SUCCESS', 'ERROR', 'FAILURE'],
        data: [
          this.getSpecificData('schedule_attempt_rate', 'result', 'scheduled'),
          this.getSpecificData('schedule_attempt_rate', 'result', 'error'),
          this.getSpecificData(
            'schedule_attempt_rate',
            'result',
            'unschedulable'
          ),
        ],
        areaColors: ['blue', 'red', 'yellow'],
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
    const config = getAreaChartOps(option)

    if (isEmpty(config.data)) return null

    switch (option.type) {
      default:
        return <SimpleArea {...commonProps} {...config} />
    }
  }

  render() {
    const { isLoading, isRefreshing } = this.schedulerStore

    return (
      <StatusTabs
        title={t('SERVICE_COMPONENT_MONITORING')}
        tabOptions={this.getTabOptions()}
        contentOptions={this.getContentOptions()}
        loading={isLoading}
        refreshing={isRefreshing}
        onFetch={this.fetchData}
      />
    )
  }
}
