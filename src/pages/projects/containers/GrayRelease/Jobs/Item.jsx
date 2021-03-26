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
      getMetricData(
        get(newMetrics, 'metrics.request_count.matrix[0].values', []),
        0
      ),
      getMetricData(
        get(oldMetrics, 'metrics.request_count.matrix[0].values', []),
        0
      ),
    ]
    const request_error_count = [
      getMetricData(
        get(newMetrics, 'metrics.request_error_count.matrix[0].values', []),
        0
      ),
      getMetricData(
        get(oldMetrics, 'metrics.request_error_count.matrix[0].values', []),
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

    let request_duration = []
    if (has(newMetrics, 'histograms.request_duration_millis')) {
      request_duration = [
        getMetricData(
          get(
            newMetrics,
            'histograms.request_duration_millis["avg"].matrix[0].values',
            []
          ),
          NaN
        ),
        getMetricData(
          get(
            oldMetrics,
            'histograms.request_duration_millis["avg"].matrix[0].values',
            []
          ),
          NaN
        ),
      ]
    } else {
      request_duration = [
        getMetricData(
          get(
            newMetrics,
            'histograms.request_duration["avg"].matrix[0].values',
            []
          ),
          NaN
        ) * 1000,
        getMetricData(
          get(
            oldMetrics,
            'histograms.request_duration["avg"].matrix[0].values',
            []
          ),
          NaN
        ) * 1000,
      ]
    }

    return [
      {
        type: 'traffic',
        name: t('Traffic monitor'),
        legendData: [data.newVersion, data.oldVersion],
        data: request_count,
        unit: 'RPS',
        icon: 'changing-over',
        tip: t('Traffic of last five minutes'),
      },
      {
        type: 'request_success_rate',
        name: t('Request success rate'),
        legendData: [data.newVersion, data.oldVersion],
        data: request_success_rate,
        icon: 'check',
        unit: '%',
      },
      {
        type: 'request_duration',
        name: t('Request duration'),
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
      getMetricData(
        get(newMetrics, 'metrics.tcp_received.matrix[0].values', []),
        0
      ),
      getMetricData(
        get(oldMetrics, 'metrics.tcp_received.matrix[0].values', []),
        0
      ),
    ]

    const sent = [
      getMetricData(
        get(newMetrics, 'metrics.tcp_sent.matrix[0].values', []),
        0
      ),
      getMetricData(
        get(oldMetrics, 'metrics.tcp_sent.matrix[0].values', []),
        0
      ),
    ]

    return [
      {
        type: 'traffic-in',
        name: t('TCP - Inbound Traffic'),
        legendData: [data.newVersion, data.oldVersion],
        data: received,
        unit: 'B/s',
        icon: 'next',
      },
      {
        type: 'traffic-out',
        name: t('TCP - Outbound Traffic'),
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
              <span>{t('Application')}</span>:{' '}
              {get(data, 'labels["app.kubernetes.io/name"]')}
            </p>
            <p>
              <span>{t('GRAY_RELEASE_CATEGORIES')}</span>: {t(cate.title)}
            </p>
            <p>
              <span>{t('Grayscale Release Component')}</span>: {data.hosts}
            </p>
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.versions}>
            <p>
              <strong>{t('Version Comparison')}</strong>
            </p>
            <p className={styles.tag}>
              {data.newVersion}
              &nbsp;
              <span>
                ({t('Replicas')}:{' '}
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
                ({t('Replicas')}:{' '}
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
