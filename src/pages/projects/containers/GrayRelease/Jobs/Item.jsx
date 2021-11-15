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
import isEqual from 'react-fast-compare'
import { Icon } from '@kube-design/components'
import { getMetricData } from 'utils/service'
import { GRAY_RELEASE_CATEGORIES } from 'utils/constants'

import Chart from './Chart'

import styles from './index.scss'

export default class Item extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      newMetrics: {},
      oldMetrics: {},
      newHealth: {},
      oldHealth: {},
    }
  }

  componentDidMount() {
    this.getData()
  }

  componentWillUnmount() {
    this.unmount = true
  }

  componentDidUpdate(prevProps) {
    if (!isEqual(this.props.data, prevProps.data)) {
      this.getData(this.props)
    }
  }

  getData(props) {
    const { data } = props || this.props
    this.store.fetchMetrics(data).then(([newMetrics, oldMetrics]) => {
      if (!this.unmount) {
        this.setState({ newMetrics, oldMetrics })
      }
    })
    this.store.fetchHealth(data).then(([newHealth, oldHealth]) => {
      if (!this.unmount) {
        this.setState({ newHealth, oldHealth })
      }
    })
  }

  get store() {
    return this.props.store
  }

  get metrics() {
    const { data } = this.props
    if (!data) {
      return []
    }

    const { newMetrics, oldMetrics } = this.state
    const request_count = [
      getMetricData(get(newMetrics, 'request_count[0].datapoints', []), 0),
      getMetricData(get(oldMetrics, 'request_count[0].datapoints', []), 0),
    ]
    const request_error_count = [
      getMetricData(
        get(newMetrics, 'request_error_count[0].datapoints', []),
        0
      ),
      getMetricData(
        get(oldMetrics, 'request_error_count[0].datapoints', []),
        0
      ),
    ]
    const request_success_rate = [
      request_count[0] > 0
        ? Number(
            (
              (100 * (request_count[0] - request_error_count[0])) /
              request_count[0]
            ).toFixed(2)
          )
        : NaN,
      request_count[1] > 0
        ? Number(
            (
              (100 * (request_count[1] - request_error_count[1])) /
              request_count[1]
            ).toFixed(2)
          )
        : NaN,
    ]

    const request_duration = [
      getMetricData(
        get(newMetrics, 'request_duration_millis[0].datapoints', []),
        NaN
      ),
      getMetricData(
        get(oldMetrics, 'request_duration_millis[0].datapoints', []),
        NaN
      ),
    ]

    return [
      {
        type: 'traffic',
        name: t('TRAFFIC'),
        legendData: [data.newVersion, data.oldVersion],
        data: request_count,
        unit: 'RPS',
        icon: 'changing-over',
        tip: t('TRAFFIC_IN_LAST_FIVE_MINUTES'),
      },
      {
        type: 'request_success_rate',
        name: t('SUCCESSFUL_REQUEST_RATE'),
        legendData: [data.newVersion, data.oldVersion],
        data: request_success_rate,
        icon: 'check',
        unit: '%',
      },
      {
        type: 'request_duration',
        name: t('REQUEST_LATENCY'),
        legendData: [data.newVersion, data.oldVersion],
        data: request_duration,
        icon: 'timed-task',
        unit: 'ms',
      },
    ]
  }

  get tcpMetrics() {
    const { data } = this.props
    if (!data) {
      return []
    }

    const { newMetrics, oldMetrics } = this.state

    const received = [
      getMetricData(get(newMetrics, 'tcp_received[0].datapoints', []), 0),
      getMetricData(get(oldMetrics, 'tcp_received[0].datapoints', []), 0),
    ]

    const sent = [
      getMetricData(get(newMetrics, 'tcp_sent[0].datapoints', []), 0),
      getMetricData(get(oldMetrics, 'tcp_sent[0].datapoints', []), 0),
    ]

    return [
      {
        type: 'traffic-in',
        name: t('TCP_INBOUND_TRAFFIC'),
        legendData: [data.newVersion, data.oldVersion],
        data: received,
        unit: 'B/s',
        icon: 'next',
      },
      {
        type: 'traffic-out',
        name: t('TCP_OUTBOUND_TRAFFIC'),
        legendData: [data.newVersion, data.oldVersion],
        data: sent,
        unit: 'B/s',
        icon: 'previous',
      },
    ]
  }

  handleClick = () => {
    const { data, onClick } = this.props
    onClick(data)
  }

  render() {
    const { data } = this.props
    const { newHealth, oldHealth } = this.state

    const cate =
      GRAY_RELEASE_CATEGORIES.find(item => item.type === data.type) || {}

    const metrics = data.protocol === 'tcp' ? this.tcpMetrics : this.metrics

    return (
      <div className={styles.item} onClick={this.handleClick}>
        <div className={styles.left}>
          <div className={styles.icon}>
            <img
              src={get(
                data,
                'annotations["app.kubernetes.io/icon"]',
                '/assets/default-app.svg'
              )}
              alt=""
            />
            <div className={styles.iconExtra}>
              <Icon name={cate.icon} size={24} type="light" />
            </div>
          </div>
          <div className={styles.title}>
            <div className="h5">{data.name}</div>
            <p>
              <span>{t('APP')}</span>:{' '}
              {get(data, 'labels["app.kubernetes.io/name"]')}
            </p>
            <p>
              <span>{t('RELEASE_MODE')}</span>: {t(`${cate.title}_LOW`)}
            </p>
            <p>
              <span>{t('SERVICE')}</span>: {data.hosts}
            </p>
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.versions}>
            <p>
              <strong>{t('VERSIONS')}</strong>
            </p>
            <p className={styles.tag}>
              {data.newVersion}
              &nbsp;
              <span>
                ({t('REPLICA_COUNT_LOW')}:{' '}
                {get(newHealth, 'workloadStatus.available') ||
                  get(newHealth, 'workloadStatus.availableReplicas')}
                /
                {get(newHealth, 'workloadStatus.replicas') ||
                  get(newHealth, 'workloadStatus.desiredReplicas')}
                )
              </span>
            </p>
            <p className={styles.tag}>
              {data.oldVersion}
              &nbsp;
              <span>
                ({t('REPLICA_COUNT_LOW')}:{' '}
                {get(oldHealth, 'workloadStatus.available') ||
                  get(oldHealth, 'workloadStatus.availableReplicas')}
                /
                {get(oldHealth, 'workloadStatus.replicas') ||
                  get(oldHealth, 'workloadStatus.desiredReplicas')}
                )
              </span>
            </p>
          </div>
          {metrics.map(metric => (
            <Chart key={metric.type} {...metric} />
          ))}
        </div>
      </div>
    )
  }
}
