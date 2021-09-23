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
import { Button, Icon, Select } from '@kube-design/components'
import { SimpleCircle } from 'components/Charts'
import classnames from 'classnames'
import { ReactComponent as Alarm } from 'assets/alarm-object.svg'
import GatewayMonitor from 'stores/monitoring/gateway'

import { isEmpty, get } from 'lodash'
import TimeSelector from '../TimeSelector'
import styles from './index.scss'

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

export default class MonitoringOverview extends React.Component {
  state = {
    enableAutoRefresh: true,
    autoRefresh: false,
    duration: '10m',
    metrics: {},
    errorType: 'ingress_request_4xx_count',
  }

  monitorStore = new GatewayMonitor({ cluster: this.cluster })

  componentDidMount() {
    this.fetchMetrics(this.props.match.params)
  }

  get detail() {
    return this.props.detailStore.gateway.data
  }

  handleChange = duration => {
    this.setState({ duration }, () => {
      this.fetchMetrics()
    })
  }

  handleRequestError = value => {
    this.setState({ errorType: value })
  }

  fetchMetrics = async params => {
    const { duration } = this.state

    this.setState({ isLoading: true })

    const { cluster, name } = this.detail || {}
    const ns = name.split('kubesphere-router-')[1]
    const result = await this.monitorStore.fetchGatewayMetrics({
      duration,
      cluster,
      namespace: ns,
      metrics: Object.values(MetricTypes),
      job: `${name}-metrics`,
      ...params,
    })

    const data = this.handleMetricsData(result)

    this.setState({ metrics: { ...data }, duration, isLoading: false })
  }

  handleMetricsData = result => {
    if (!isEmpty(result)) {
      const data = {}
      Object.values(MetricTypes)
        .map(item => result[item])
        .forEach(item => {
          const _num = get(item, 'data.result[0].value[1]', 0)
          const num =
            typeof _num === 'string' && _num.indexOf('.') > -1
              ? Number(_num).toFixed(4)
              : isNaN(Number(_num))
              ? 0
              : _num
          data[item['metric_name']] = num
        })
      return data
    }
  }

  renderAutoRefresh = () => {
    const { enableAutoRefresh, autoRefresh } = this.state

    if (!enableAutoRefresh) return null

    return (
      <Button
        className={styles.button}
        type="control"
        icon={autoRefresh ? 'pause' : 'start'}
        iconType="light"
        onClick={this.handleAutoRefresh}
      ></Button>
    )
  }

  getMetricsData = (key, initvalue = 0) => {
    return get(this.state.metrics, `${key}`, initvalue)
  }

  renderCustomLegend = (props = {}) => {
    const { className, payload, activeSeries = [], showAll = false } = props
    const data = payload || []

    if (data.length < 2 && !showAll) return <div className={styles.legend} />

    const handleClick = e => {
      const { onClick } = props

      if (onClick) {
        const key = get(e.target, 'dataset.key')
        onClick(e, key)
      }
    }

    return (
      <div className={(className, styles.legend)} onClick={handleClick}>
        {data.map(item => {
          const inactive = !activeSeries.includes(item.value)
          const color = get(item, 'payload.stroke')

          return (
            <div
              key={item.dataKey}
              data-key={item.dataKey}
              className={classnames(styles.item, {
                [styles.inactive]: inactive,
              })}
            >
              <i style={{ backgroundColor: color }} />
              {t(item.value)}
            </div>
          )
        })}
      </div>
    )
  }

  render() {
    const { duration, errorType } = this.state

    return (
      <div className={styles.overview}>
        <div className={styles.header}>
          <p className={styles.title}>{t('Overview')}</p>
          <div className={styles.operations}>
            <TimeSelector duration={duration} onChange={this.handleChange} />
            {this.renderAutoRefresh()}
            <Button
              className={styles.button}
              type="control"
              icon="refresh"
              iconType="light"
              onClick={this.handleRefresh}
            ></Button>
          </div>
        </div>
        <div className={styles.body}>
          <div className={styles.left}>
            <div className={styles.item}>
              <Icon name="gateway" size={56}></Icon>
              <div>
                <p>{t('Total Requests')}</p>
                <span>{this.getMetricsData('ingress_request_count')}</span>
              </div>
            </div>
            <div className={styles.item}>
              <Icon name="error" size={56}></Icon>
              <div>
                <Select
                  width={30}
                  value={errorType}
                  options={[
                    {
                      label: t('Request 4xx'),
                      value: 'ingress_request_4xx_count',
                    },
                    {
                      label: t('Request 5xx'),
                      value: 'ingress_request_5xx_count',
                    },
                  ]}
                  onChange={this.handleRequestError}
                />
                <span>{this.getMetricsData(errorType)}</span>
              </div>
            </div>
          </div>
          <div className={styles.middle}>
            <SimpleCircle
              theme="light"
              width={200}
              height={200}
              title=""
              value={this.getMetricsData('ingress_success_rate') * 100}
              total={100}
              unit="%"
              innerRadius="80%"
              legend={['Request Success', 'Total']}
              showCenter={true}
              showRate={false}
              areaColors={['#55BC8A', '#E3E9EF']}
              renderCustomCenter={({ value }) => (
                <div className={styles.simpleContent}>
                  <p>{t('REQUEST_SUCCESS_RATE')}</p>
                  <span>{value}%</span>
                </div>
              )}
            />
          </div>
          <div className={styles.right}>
            <div className={styles.item}>
              <span className={styles.customIcon}>
                <Alarm />
              </span>
              <div>
                <p>{t('Duration Average')}</p>
                <span>
                  {this.getMetricsData('ingress_request_duration_average')}
                </span>
              </div>
            </div>
            <div className={styles.itemSmall}>
              <span>{t('Duration 50percentage')}</span>
              <span>
                {this.getMetricsData('ingress_request_duration_50percentage')}
              </span>
            </div>
            <div className={styles.itemSmall}>
              <span>{t('Duration 95percentage')}</span>
              <span>
                {this.getMetricsData('ingress_request_duration_95percentage')}
              </span>
            </div>
            <div className={styles.itemSmall}>
              <span>{t('Duration 99percentage')}</span>
              <span>
                {this.getMetricsData('ingress_request_duration_99percentage')}
              </span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
