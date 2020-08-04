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
import { computed } from 'mobx'
import { observer, inject } from 'mobx-react'
import classnames from 'classnames'
import { isEmpty, get, capitalize } from 'lodash'

import { ALL_METRICS_CONFIG } from 'configs/alerting/metrics'
import { getLocalTime } from 'utils'
import { getAreaChartOps } from 'utils/monitoring'
import NodeMonitorStore from 'stores/monitoring/node'
import WorkloadMonitorStore from 'stores/monitoring/workload'
import PodMonitorStore from 'stores/monitoring/pod'

import { Card } from 'components/Base'
import { SimpleArea } from 'components/Charts'

import styles from './index.scss'

class AlertDetail extends React.Component {
  constructor(props) {
    super(props)

    this.init()
  }

  init() {
    const { cluster, workloadKind } = this.store.detail
    switch (this.resourceType) {
      case 'node': {
        this.monitorStore = new NodeMonitorStore({ cluster })
        break
      }
      case 'workload': {
        this.monitorStore = new WorkloadMonitorStore({
          cluster,
          module: `${workloadKind.toLowerCase()}s`,
        })
        break
      }
      case 'pod': {
        this.monitorStore = new PodMonitorStore({ cluster })
        break
      }
      default:
        this.monitorStore = {}
        break
    }
  }

  get module() {
    return this.props.module
  }

  get params() {
    return this.props.match.params
  }

  get store() {
    return this.props.detailStore
  }

  get metrics() {
    return this.monitorStore.data
  }

  @computed
  get resourceType() {
    return this.store.detail.resourceType
  }

  @computed
  get metricLabel() {
    const { metricName } = this.store.detail
    return get(ALL_METRICS_CONFIG[metricName], 'label', '')
  }

  @computed
  get status() {
    return this.store.detail.status
  }

  @computed
  get createTime() {
    return getLocalTime(this.store.detail.createTime).format(
      'YYYY-MM-DD HH:mm:ss'
    )
  }

  @computed
  get timeRange() {
    const { createTime } = this.store.detail
    const time = createTime / 1000
    const range = 10 * 60
    const start = time - range
    const afterRange = time + range
    const now = Math.floor(Date.now() / 1000)
    const end = afterRange > now ? now : afterRange

    return { start, end }
  }

  @computed
  get monitoringConfig() {
    const { isLoading, resourceName } = this.monitorStore
    const { metricName, condition_type, thresholds, unit } = this.store.detail
    const title = this.metricLabel
    const data = get(this.metrics, `${metricName}.data.result`) || []
    const legend = data.map((record, index) =>
      get(record, `metric.${resourceName}`, `${this.resourceType}_${index}`)
    )

    return {
      loading: isLoading,
      type: this.resourceType,
      title,
      legend,
      unit,
      data,
      alert: {
        label: title,
        condition: condition_type,
        value: thresholds,
      },
    }
  }

  componentDidMount() {
    this.fetchData()
  }

  fetchData = params => {
    const { namespace, resourceName, metricName } = this.store.detail
    const data = {
      step: '1m',
      resources: [resourceName],
      metrics: [metricName],
      ...this.timeRange,
      ...params,
      fillZero: false,
    }

    if (namespace) {
      data.namespace = namespace
    }

    if (this.monitorStore.fetchMetrics) {
      this.monitorStore.fetchMetrics(data)
    }
  }

  renderChart() {
    const chartConfig = getAreaChartOps(this.monitoringConfig)

    return (
      <div className={styles.chart}>
        <SimpleArea width="100%" {...chartConfig} />
      </div>
    )
  }

  renderAlertList() {
    const {
      severity,
      workloadKind,
      resourceName,
      condition_type,
      thresholds,
      unit,
    } = this.store.detail
    const resourceType = t(capitalize(this.resourceType))
    const resourceText = workloadKind
      ? `${resourceType}-${t(workloadKind)}`
      : resourceType

    return (
      <div className={styles.list}>
        <div className={styles.item}>
          <i className={classnames(styles[severity])}>{t(severity)}</i>
          <div className={styles.desc}>
            <div className={styles.title}>
              <strong>{`${resourceText}: ${resourceName}`}</strong>
              <strong>
                {`${t(
                  this.metricLabel
                )} ${condition_type} ${thresholds}${unit}`}
              </strong>
            </div>
            <p>
              <span>{`${t(
                this.status === 'resumed' ? 'Recovery Time' : 'Alerting Time'
              )}: ${this.createTime}`}</span>
            </p>
          </div>
        </div>
      </div>
    )
  }

  render() {
    const { data, loading } = this.monitoringConfig

    return (
      <Card
        title={t('Alerting Detail')}
        loading={loading}
        isEmpty={isEmpty(data)}
        empty={t('No Relevant Data')}
      >
        {this.renderChart()}
        {this.renderAlertList()}
      </Card>
    )
  }
}

export default inject('detailStore')(observer(AlertDetail))
export const Component = AlertDetail
