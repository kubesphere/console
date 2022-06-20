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

import { get } from 'lodash'
import React from 'react'
import PropTypes from 'prop-types'
import isEqual from 'react-fast-compare'

import { getAreaChartOps } from 'utils/monitoring'
import { getMetricData, getSuccessCount } from 'utils/service'

import { SimpleArea as Chart } from 'components/Charts'
import TrafficCard from './TrafficCard'
import WorkloadSelect from './WorkloadSelect'

import styles from './index.scss'

export default class Monitors extends React.Component {
  static propTypes = {
    detail: PropTypes.object,
    store: PropTypes.object,
  }

  constructor(props) {
    super(props)

    this.state = {
      workload: get(props.detail, 'workloads[0].data.workload'),
      metrics: {},
      outMetrics: {},
    }

    this.getData()
  }

  componentDidUpdate(prevProps) {
    if (!isEqual(prevProps.detail, this.props.detail)) {
      this.setState(
        {
          workload: get(this.props.detail, 'workloads[0].data.workload'),
        },
        () => {
          this.getData()
        }
      )
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

  get workloads() {
    return get(this.props.detail, 'workloads', []).map(item => ({
      label: get(item, 'data.workload', ''),
      value: get(item, 'data.workload', ''),
    }))
  }

  async getData() {
    const { workload } = this.state
    const { store } = this.props

    if (workload) {
      this.store
        .fetchWorkloadMetrics(
          {
            name: workload,
            namespace: store.detail.namespace,
            cluster: store.detail.cluster,
          },
          { duration: 1800 }
        )
        .then(metrics => {
          this.setState({ metrics })
        })
      this.store
        .fetchWorkloadMetrics(
          {
            name: workload,
            namespace: store.detail.namespace,
            cluster: store.detail.cluster,
          },
          {
            duration: 1800,
            direction: 'outbound',
            reporter: 'destination',
          }
        )
        .then(metrics => {
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
    const request_count = get(metrics, 'request_count[0].datapoints', [])
    const request_error_count = get(
      metrics,
      'request_error_count[0].datapoints',
      []
    )
    const request_success_count = request_count.map((item, index) =>
      getSuccessCount(item, request_error_count[index])
    )

    return getAreaChartOps({
      title: 'TRAFFIC',
      legend: ['SUCCESSFUL', 'ALL'],
      areaColors: ['#329dce', '#d8dee5'],
      data: [{ values: request_success_count }, { values: request_count }],
      unit: 'RPS',
    })
  }

  get requestOutMetrics() {
    const { detail } = this.props
    if (!detail) {
      return []
    }

    const { outMetrics } = this.state
    const request_count = get(outMetrics, 'request_count[0].datapoints', [])
    const request_error_count = get(
      outMetrics,
      'request_error_count[0].datapoints',
      []
    )
    const request_success_count = request_count.map((item, index) =>
      getSuccessCount(item, request_error_count[index])
    )

    return getAreaChartOps({
      title: 'TRAFFIC',
      legend: ['SUCCESSFUL', 'ALL'],
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
    const received = get(metrics, 'tcp_received[0].datapoints', [])
    const sent = get(metrics, 'tcp_sent[0].datapoints', [])

    if (received.length === 0 && sent.length === 0) {
      return {}
    }

    return getAreaChartOps({
      title: 'BANDWIDTH',
      legend: ['SENT', 'RECEIVED'],
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
    const sent = get(outMetrics, 'tcp_sent[0].datapoints', [])

    if (received.length === 0 && sent.length === 0) {
      return {}
    }

    return getAreaChartOps({
      title: 'BANDWIDTH',
      legend: ['SENT', 'RECEIVED'],
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
      get(metrics, 'request_count[0].datapoints', []),
      NaN
    )
    const request_error_count = getMetricData(
      get(metrics, 'request_error_count[0].datapoints', []),
      0
    )
    const request_success_rate =
      request_count > 0
        ? ((request_count - request_error_count) * 100) / request_count
        : NaN

    const request_duration = getMetricData(
      get(metrics, 'request_duration_millis[0].datapoints', []),
      NaN
    )

    return [
      {
        title: 'TRAFFIC',
        data: request_count.toFixed(2),
        unit: 'RPS',
        icon: 'changing-over',
      },
      {
        title: 'SUCCESS_RATE',
        desc: 'SUCCESS_RATE_SCAP',
        data: request_success_rate.toFixed(2),
        icon: 'check',
        unit: '%',
      },
      {
        title: 'DURATION',
        data: request_duration.toFixed(2),
        icon: 'timed-task',
        unit: 'ms',
      },
    ]
  }

  get trafficOutMetrics() {
    const { detail } = this.props
    if (!detail) {
      return []
    }

    const { outMetrics } = this.state
    const request_count = getMetricData(
      get(outMetrics, 'request_count[0].datapoints', []),
      NaN
    )
    const request_error_count = getMetricData(
      get(outMetrics, 'request_error_count[0].datapoints', []),
      0
    )
    const request_success_rate =
      request_count > 0
        ? ((request_count - request_error_count) * 100) / request_count
        : NaN

    const request_duration = getMetricData(
      get(outMetrics, 'request_duration_millis[0].datapoints', []),
      NaN
    )

    return [
      {
        title: 'TRAFFIC',
        data: request_count.toFixed(2),
        unit: 'RPS',
        icon: 'changing-over',
      },
      {
        title: 'SUCCESS_RATE',
        desc: 'SUCCESS_RATE_SCAP',
        data: request_success_rate.toFixed(2),
        icon: 'check',
        unit: '%',
      },
      {
        title: 'DURATION',
        data: request_duration.toFixed(2),
        icon: 'timed-task',
        unit: 'ms',
      },
    ]
  }

  handleWorkloadChange = workload => {
    this.setState({ workload }, () => this.getData())
  }

  renderWorkloadSelect() {
    return (
      <WorkloadSelect
        className={styles.workloads}
        value={this.state.workload}
        options={this.workloads}
        onChange={this.handleWorkloadChange}
      />
    )
  }

  render() {
    const { protocol } = this.props
    if (protocol === 'tcp') {
      return (
        <>
          <div className={styles.title}>
            {t('TCP_INBOUND_TRAFFIC')} {this.renderWorkloadSelect()}
          </div>
          <Chart {...this.tcpInMetrics} height={150} />
          <div className={styles.title}>
            {t('TCP_OUTBOUND_TRAFFIC')} {this.renderWorkloadSelect()}
          </div>
          <Chart {...this.tcpOutMetrics} height={150} />
        </>
      )
    }

    // for http and grpc
    return (
      <>
        <div className={styles.title}>
          {t('HTTP_INBOUND_TRAFFIC')} {this.renderWorkloadSelect()}
        </div>
        <TrafficCard metrics={this.trafficInMetrics} />
        <div className="margin-b8" />
        <Chart {...this.requestInMetrics} height={150} />
        <div className={styles.title}>
          {t('HTTP_OUTBOUND_TRAFFIC')} {this.renderWorkloadSelect()}
        </div>
        <TrafficCard metrics={this.trafficOutMetrics} />
        <div className="margin-b8" />
        <Chart {...this.requestOutMetrics} height={150} />
      </>
    )
  }
}
