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
import { omit } from 'lodash'
import { Button, Loading } from '@kube-design/components'
import { MultiArea as Chart } from 'components/Charts'
import { getAreaChartOps } from 'utils/monitoring'
import TimeSelector from 'components/Cards/Monitoring/Controller/TimeSelector'
import { getMinuteValue, getTimeRange } from 'stores/monitoring/base'

import styles from './index.scss'

export default class Monitoring extends Component {
  state = {
    metrics: [],
    step: '30s',
    times: 60,
    isLoading: true,
  }

  componentDidMount() {
    this.fetchMetrics()
  }

  fetchMetrics = async params => {
    const { step, times } = this.state

    this.setState({ isLoading: true })

    const { query, cluster, namespace } = this.props.detail || {}
    const { start, end } = getTimeRange({ step, times })

    const result = await this.props.store.fetchMetric({
      expr: query,
      end,
      start,
      step,
      cluster,
      namespace,
      ...params,
    })
    this.setState({ metrics: result, times, step, isLoading: false })
  }

  handleChange = params => {
    const { step, times } = params
    this.setState({ step: getMinuteValue(step), times }, () => {
      this.fetchMetrics()
    })
  }

  render() {
    const { metrics } = this.state
    const { times, step, isLoading } = this.state
    const options = getAreaChartOps({
      height: 500,
      title: t('Alerting Monitoring'),
      data: metrics,
      legend: metrics.map(item =>
        item.metric ? JSON.stringify(omit(item.metric, '__name__')) : ''
      ),
    })
    return (
      <div className={styles.monitoring}>
        <div className={styles.bar}>
          <TimeSelector
            step={step}
            times={times}
            onChange={this.handleChange}
          />
          <Button
            type="control"
            icon="refresh"
            iconType="light"
            onClick={this.fetchMetrics}
          />
        </div>
        <Loading spinning={isLoading}>
          <Chart {...options} />
        </Loading>
      </div>
    )
  }
}
