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
import { observer } from 'mobx-react'
import { get } from 'lodash'

import { getLastMonitoringData, getAreaChartOps } from 'utils/monitoring'
import NodeMonitorStore from 'stores/monitoring/node'

import { Columns, Column } from '@pitrix/lego-ui'
import { Card } from 'components/Base'
import PodsCard from 'components/Cards/Pods'
import { StatusCircle } from 'components/Cards/Monitoring'
import { SimpleArea } from 'components/Charts'

import styles from './index.scss'

const MetricTypes = {
  used: 'node_pod_running_count',
  capacity: 'node_pod_quota',
}

@observer
export default class Pods extends React.Component {
  constructor(props) {
    super(props)

    this.module = props.module
    this.store = props.detailStore
    this.monitorStore = new NodeMonitorStore()

    this.fetchData()
  }

  get node() {
    return get(this.props.match, 'params.name', '')
  }

  fetchData() {
    this.monitorStore.fetchMetrics({
      resources: [this.node],
      metrics: Object.values(MetricTypes),
    })
  }

  renderPodsMonitor() {
    const { data, isLoading } = this.monitorStore
    const lastData = getLastMonitoringData(data)
    const config = getAreaChartOps({
      title: 'Pod Quantity Trend',
      unit: '',
      legend: ['Pod Count'],
      data: get(data, `${MetricTypes.used}.data.result`),
    })

    return (
      <Card className={styles.monitors} loading={isLoading}>
        <Columns className="is-variable">
          <Column className="is-4">
            <div className={styles.podStatus}>
              <div className={styles.title}>{t('Pod Status')}</div>
              <StatusCircle
                name={t('Pod Usage')}
                legend={['Used', 'Capacity']}
                used={get(lastData, `${MetricTypes.used}.value[1]`, 0)}
                total={get(lastData, `${MetricTypes.capacity}.value[1]`, 0)}
              />
            </div>
          </Column>
          <Column className="is-8">
            <SimpleArea width="100%" bgColor="transparent" {...config} />
          </Column>
        </Columns>
      </Card>
    )
  }

  render() {
    return (
      <div>
        {this.renderPodsMonitor()}
        <PodsCard detail={this.store.detail} />
      </div>
    )
  }
}
