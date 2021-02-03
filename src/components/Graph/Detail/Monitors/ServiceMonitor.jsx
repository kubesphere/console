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

import { get, has } from 'lodash'
import React from 'react'
import PropTypes from 'prop-types'
import isEqual from 'react-fast-compare'
import { getAreaChartOps } from 'utils/monitoring'
import { getMetricData, getSuccessCount } from 'utils/service'

import { SimpleArea as Chart } from 'components/Charts'
import TrafficCard from './TrafficCard'

import styles from './index.scss'

export default class Monitors extends React.Component {
  static propTypes = {
    detail: PropTypes.object,
    store: PropTypes.object,
  }

  constructor(props) {
    super(props)

    this.state = {
      metrics: {},
      outMetrics: {},
    }

    this.getData()
  }

  componentDidUpdate(prevProps) {
    if (!isEqual(prevProps.detail, this.props.detail)) {
      this.getData()
    }
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.getData()
    }, 10000)
  }

  componentWillUnmount() {
    if (this.interval) {
      clearInterval(this.interval)
    }
  }

  get store() {
    return this.props.store
  }

  getData() {
    const { detail, store, protocol } = this.props

    const func =
      protocol === 'tcp'
        ? this.store.fetchAppMetrics.bind(this.store)
        : this.store.fetchServiceMetrics.bind(this.store)

    if (detail && detail.name) {
      func(
        {
          name: detail.name,
          namespace: store.detail.namespace,
          cluster: store.detail.cluster,
        },
        { duration: 1800 }
      ).then(metrics => {
        this.setState({ metrics })
      })

      func(
        {
          name: detail.name,
          namespace: store.detail.namespace,
          cluster: store.detail.cluster,
        },
        {
          duration: 1800,
          direction: 'outbound',
          reporter: 'destination',
        }
      ).then(metrics => {
        this.setState({ outMetrics: metrics })
      })
    }
  }

  get requestInMetrics() {
    const { detail } = this.props
    if (!detail) {
      return []
    }

    const { metrics } = this.state
    const request_count = get(
      metrics,
      'metrics.request_count.matrix[0].values',
      []
    )
    const request_error_count = get(
      metrics,
      'metrics.request_error_count.matrix[0].values',
      []
    )
    const request_success_count = request_count.map((item, index) =>
      getSuccessCount(item, request_error_count[index])
    )

    return getAreaChartOps({
      title: 'traffic',
      legend: ['Success', 'All'],
      areaColors: ['#329dce', '#d8dee5'],
      data: [{ values: request_success_count }, { values: request_count }],
      unit: 'RPS',
    })
  }

  get tcpInMetrics() {
    const { detail } = this.props
    if (!detail) {
      return []
    }

    const { metrics } = this.state
    const received = get(metrics, 'metrics.tcp_received.matrix[0].values', [])
    const sent = get(metrics, 'metrics.tcp_sent.matrix[0].values', [])

    if (received.length === 0 && sent.length === 0) {
      return {}
    }

    return getAreaChartOps({
      title: 'bandwith',
      legend: ['Send', 'Receive'],
      data: [{ values: sent }, { values: received }],
      unit: 'B/s',
    })
  }

  get tcpOutMetrics() {
    const { detail } = this.props
    if (!detail) {
      return {}
    }

    const { outMetrics } = this.state
    const received = get(
      outMetrics,
      'metrics.tcp_received.matrix[0].values',
      []
    )
    const sent = get(outMetrics, 'metrics.tcp_sent.matrix[0].values', [])

    if (received.length === 0 && sent.length === 0) {
      return {}
    }

    return getAreaChartOps({
      title: 'bandwith',
      legend: ['Send', 'Receive'],
      data: [{ values: sent }, { values: received }],
      unit: 'B/s',
    })
  }

  get trafficInMetrics() {
    const { detail } = this.props
    if (!detail) {
      return []
    }

    const { metrics } = this.state
    const request_count = getMetricData(
      get(metrics, 'metrics.request_count.matrix[0].values', []),
      NaN
    )
    const request_error_count = getMetricData(
      get(metrics, 'metrics.request_error_count.matrix[0].values', []),
      0
    )
    const request_success_rate =
      request_count > 0
        ? ((request_count - request_error_count) * 100) / request_count
        : NaN

    let request_duration
    if (has(metrics, 'histograms.request_duration_millis')) {
      request_duration = getMetricData(
        get(
          metrics,
          'histograms.request_duration_millis["avg"].matrix[0].values',
          []
        ),
        NaN
      )
    } else {
      request_duration =
        getMetricData(
          get(
            metrics,
            'histograms.request_duration["avg"].matrix[0].values',
            []
          ),
          NaN
        ) * 1000
    }

    return [
      {
        title: 'Traffic',
        data: request_count.toFixed(2),
        unit: 'RPS',
        icon: 'changing-over',
      },
      {
        title: 'Success rate',
        data: request_success_rate.toFixed(2),
        icon: 'check',
        unit: '%',
      },
      {
        title: 'Duration',
        data: request_duration.toFixed(2),
        icon: 'timed-task',
        unit: 'ms',
      },
    ]
  }

  render() {
    const { protocol } = this.props

    if (protocol === 'http') {
      return (
        <>
          <div className={styles.title}>
            {t('Traffic (requests per second)')}
          </div>
          <TrafficCard metrics={this.trafficInMetrics} />
          <div className="margin-b8" />
          <Chart {...this.requestInMetrics} height={150} />
        </>
      )
    }

    if (protocol === 'tcp') {
      return (
        <>
          <div className={styles.title}>{t('TCP - Inbound Traffic')}</div>
          <Chart {...this.tcpInMetrics} height={150} />
          <div className={styles.title}>{t('TCP - Outbound Traffic')}</div>
          <Chart {...this.tcpOutMetrics} height={150} />
        </>
      )
    }

    return null
  }
}
