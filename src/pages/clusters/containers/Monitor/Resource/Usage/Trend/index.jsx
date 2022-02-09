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
import classnames from 'classnames'
import { isEmpty, get } from 'lodash'

import { getAreaChartOps } from 'utils/monitoring'
import WorkspaceMonitorStore from 'stores/monitoring/workspace'

import { Loading } from '@kube-design/components'
import { Card } from 'components/Base'
import { SimpleArea } from 'components/Charts'

import styles from './index.scss'

const MetricTypes = {
  namespace_count: 'cluster_namespace_count',
}

@inject('rootStore')
@observer
export default class ProjectTrend extends React.Component {
  constructor(props) {
    super(props)

    this.monitorStore = new WorkspaceMonitorStore({
      cluster: props.match.params.cluster,
    })
    this.fetchData()
  }

  get metrics() {
    return this.monitorStore.data
  }

  fetchData = (params = {}) => {
    this.monitorStore.fetchMetrics({
      metrics: Object.values(MetricTypes),
      step: '60m',
      times: 100,
      ...params,
    })
  }

  renderChart() {
    const config = getAreaChartOps({
      title: 'PROJECT_COUNT',
      unit: '',
      legend: ['PROJECT_COUNT'],
      data: get(this.metrics, `${MetricTypes.namespace_count}.data.result`),
    })

    if (isEmpty(config.data)) return null

    return <SimpleArea width="100%" bgColor="transparent" {...config} />
  }

  render() {
    const { isLoading, isRefreshing } = this.monitorStore
    const empty = isEmpty(this.metrics)

    return (
      <Loading spinning={isLoading}>
        <Card
          className={classnames(styles.card, {
            [styles.empty]: empty,
          })}
          refreshing={isRefreshing}
          empty={t('NO_MONITORING_DATA')}
        >
          {this.renderChart()}
        </Card>
      </Loading>
    )
  }
}
