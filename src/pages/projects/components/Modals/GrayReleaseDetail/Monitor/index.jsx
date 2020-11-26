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
import isEqual from 'react-fast-compare'
import { get, has } from 'lodash'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Columns, Column } from '@kube-design/components'
import { getSuccessRate } from 'utils/service'
import Circle from './Circle'
import Line from './Line'

import styles from './index.scss'

export default class Monitor extends React.Component {
  static propTypes = {
    detail: PropTypes.object,
    store: PropTypes.object,
  }

  constructor(props) {
    super(props)

    this.state = {
      newMetrics: {},
      oldMetrics: {},
      selectedType: 'traffic-in',
    }

    this.getData()
  }

  componentDidUpdate(prevProps) {
    if (!isEqual(this.props.detail, prevProps.detail)) {
      this.getData(this.props)
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

  getData(props) {
    const { detail } = props || this.props
    if (detail && detail.namespace) {
      this.store
        .fetchMetrics(detail, {
          duration: 1800,
        })
        .then(([newMetrics, oldMetrics]) => {
          this.setState({ newMetrics, oldMetrics })
        })
    }
  }

  get store() {
    return this.props.store
  }

  get metrics() {
    const { detail } = this.props
    if (!detail) {
      return []
    }

    const { newMetrics, oldMetrics } = this.state
    const request_count = [
      get(newMetrics, 'metrics.request_count.matrix[0].values', []),
      get(oldMetrics, 'metrics.request_count.matrix[0].values', []),
    ]
    const request_error_count = [
      get(newMetrics, 'metrics.request_error_count.matrix[0].values', []),
      get(oldMetrics, 'metrics.request_error_count.matrix[0].values', []),
    ]
    const request_success_rate = [
      request_count[0].map((item, index) =>
        getSuccessRate(item, request_error_count[0][index])
      ),
      request_count[1].map((item, index) =>
        getSuccessRate(item, request_error_count[1][index])
      ),
    ]

    let request_duration = []
    if (has(newMetrics, 'histograms.request_duration_millis')) {
      request_duration = [
        get(
          newMetrics,
          'histograms.request_duration_millis["avg"].matrix[0].values',
          []
        ).map(([time, value]) => [time, parseFloat(value) / 1000]),
        get(
          oldMetrics,
          'histograms.request_duration_millis["avg"].matrix[0].values',
          []
        ).map(([time, value]) => [time, parseFloat(value) / 1000]),
      ]
    } else {
      request_duration = [
        get(
          newMetrics,
          'histograms.request_duration["avg"].matrix[0].values',
          []
        ).map(([time, value]) => [time, parseFloat(value)]),
        get(
          oldMetrics,
          'histograms.request_duration["avg"].matrix[0].values',
          []
        ).map(([time, value]) => [time, parseFloat(value)]),
      ]
    }

    return [
      {
        type: 'traffic-in',
        title: t('Traffic monitor'),
        legendData: [detail.newVersion, detail.oldVersion],
        data: request_count,
        unit: 'RPS',
        tip: t('Traffic of last five minutes'),
      },
      {
        type: 'request_success_rate',
        title: t('Request success rate'),
        legendData: [detail.newVersion, detail.oldVersion],
        data: request_success_rate,
        unit: '%',
      },
      {
        type: 'request_duration',
        title: t('Request duration'),
        legendData: [detail.newVersion, detail.oldVersion],
        data: request_duration,
        unit: 'ms',
      },
    ]
  }

  get tcpMetrics() {
    const { detail } = this.props
    if (!detail) {
      return []
    }

    const { newMetrics, oldMetrics } = this.state

    const received = [
      get(newMetrics, 'metrics.tcp_received.matrix[0].values', []),
      get(oldMetrics, 'metrics.tcp_received.matrix[0].values', []),
    ]

    const sent = [
      get(newMetrics, 'metrics.tcp_sent.matrix[0].values', []),
      get(oldMetrics, 'metrics.tcp_sent.matrix[0].values', []),
    ]

    return [
      {
        type: 'traffic-in',
        title: t('TCP - Inbound Traffic'),
        legendData: [detail.newVersion, detail.oldVersion],
        data: received,
        unit: 'B/s',
        icon: 'next',
      },
      {
        type: 'traffic-out',
        title: t('TCP - Outbound Traffic'),
        legendData: [detail.newVersion, detail.oldVersion],
        data: sent,
        unit: 'B/s',
        icon: 'previous',
      },
    ]
  }

  handleTypeChange = e => {
    const type = e.currentTarget.dataset.type

    this.setState({ selectedType: type })
  }

  render() {
    const { selectedType } = this.state
    const { detail } = this.props

    const metrics = detail.protocol === 'tcp' ? this.tcpMetrics : this.metrics

    const selectMetric = metrics.find(metric => metric.type === selectedType)

    return (
      <Columns>
        <Column className="is-narrow">
          <ul className={styles.leftPane}>
            {metrics.map(metric => (
              <li
                key={metric.type}
                className={classNames({
                  [styles.selected]: metric.type === selectedType,
                })}
                data-type={metric.type}
                onClick={this.handleTypeChange}
              >
                <Circle {...metric} whiteMode={metric.type === selectedType} />
              </li>
            ))}
          </ul>
        </Column>
        <Column>{selectMetric && <Line {...selectMetric} />}</Column>
      </Columns>
    )
  }
}
