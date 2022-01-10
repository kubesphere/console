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
import { inject, observer } from 'mobx-react'
import classnames from 'classnames'
import { isEmpty, get } from 'lodash'

import ComponentMonitorStore from 'stores/monitoring/component'

import { Loading } from '@kube-design/components'
import { Empty } from 'components/Base'
import Item from './item'

import styles from './index.scss'

const MetricTypes = {
  etcd_online: 'etcd_server_up_total',
  etcd_total: 'etcd_server_total',
  etcd_has_leader: 'etcd_server_has_leader',
  etcd_leader_changes: 'etcd_server_leader_changes',
  etcd_server_list: 'etcd_server_list',
  etcd_server_is_leader: 'etcd_server_is_leader',
}

@inject('rootStore')
@observer
export default class ETCDNodes extends React.Component {
  constructor(props) {
    super(props)

    this.store = new ComponentMonitorStore({
      module: 'etcd',
      cluster: props.cluster,
    })
  }

  getReulst = type => get(this.metrics, `${type}.data.result`) || []

  get metrics() {
    return this.store.data
  }

  get list() {
    const leader = this.getReulst(MetricTypes.etcd_has_leader)
    const isLeaderList = this.getReulst(MetricTypes.etcd_server_is_leader)
    const changes = this.getReulst(MetricTypes.etcd_leader_changes)
    const nodes = this.getReulst(MetricTypes.etcd_server_list)

    return nodes.map(node => {
      const ip = get(node, 'metric.node_ip')
      const isOnline = get(node, 'value[1]') === '1'
      const hasLeader =
        get(
          leader.find(item => get(item, 'metric.node_ip') === ip),
          'value[1]'
        ) === '1'
      const isLeader =
        get(
          isLeaderList.find(item => get(item, 'metric.node_ip') === ip),
          'value[1]'
        ) === '1'
      const leaderChanges =
        get(
          changes.find(item => get(item, 'metric.node_ip') === ip),
          'value[1]'
        ) || 0

      return {
        ...node.metric,
        hasLeader,
        isLeader,
        leaderChanges,
        isOnline,
      }
    })
  }

  componentDidMount() {
    this.fetchData()
  }

  fetchData = params => {
    this.store.fetchMetrics({
      metrics: Object.values(MetricTypes),
      last: true,
      ...params,
    })
  }

  render() {
    const prefix = '/infrastructure/nodes'
    const data = this.list

    return (
      <div className={classnames(styles.wrapper, this.props.className)}>
        <div className={styles.title}>{t('SERVICE_STATUS')}</div>
        <Loading spinning={this.store.isLoading}>
          <div className={styles.list}>
            {isEmpty(data) ? (
              <Empty className={styles.emtpy} />
            ) : (
              data.map(item => Item({ prefix, data: item }))
            )}
          </div>
        </Loading>
      </div>
    )
  }
}
