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

import styles from './index.scss'

const MetricTypes = {
  schedule_attempts_count: 'scheduler_schedule_attempts',
  schedule_attempt_rate: 'scheduler_schedule_attempt_rate',
  scheduling_latency_average: 'scheduler_e2e_scheduling_latency',
  scheduling_latency_quantile: 'scheduler_e2e_scheduling_latency_quantile',
}

@inject('rootStore')
@observer
class SchedulerMonitorings extends React.Component {
  constructor(props) {
    super(props)

    this.monitorStore = new ComponentMonitorStore({
      module: 'scheduler',
      cluster: props.match.params.cluster,
    })
  }

  fetchData = params => {
    this.monitorStore.fetchMetrics({
      metrics: Object.values(MetricTypes),
      ...params,
    })
  }

  get metrics() {
    return this.monitorStore.data
  }

  getSpecificData = (metricName, type, value) => {
    const data =
      get(this.metrics, `${MetricTypes[metricName]}.data.result`) || []
    return data.find(item => get(item, `metric.${type}`) === value) || {}
  }

  getMonitoringCfgs = () => [
    {
      type: 'area',
      title: 'SCHEDULE_ATTEMPTS',
      unit: '',
      legend: ['SUCCESS', 'ERROR', 'FAILURE'],
      data: [
        this.getSpecificData('schedule_attempts_count', 'result', 'scheduled'),
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
    {
      type: 'grade',
      title: 'SCHEDULING_LATENCY',
      unit: 'ms',
      legend: ['99th', '90th', '50th', 'AVERAGE'],
      data: [
        this.getSpecificData('scheduling_latency_quantile', 'quantile', '0.99'),
        this.getSpecificData('scheduling_latency_quantile', 'quantile', '0.9'),
        this.getSpecificData('scheduling_latency_quantile', 'quantile', '0.5'),
        get(
          this.metrics,
          `${MetricTypes.scheduling_latency_average}.data.result[0]`
        ),
      ],
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

    return (
      <MonitoringController
        title={t('SCHEDULER_MONITORING')}
        step="2m"
        times={50}
        onFetch={this.fetchData}
        loading={isLoading}
        refreshing={isRefreshing}
        isEmpty={isEmpty(this.metrics)}
      >
        <div className={styles.content}>
          {configs.map(item => this.renderChart(item))}
        </div>
      </MonitoringController>
    )
  }
}

export default SchedulerMonitorings
