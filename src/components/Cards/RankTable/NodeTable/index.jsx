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

import { getValueByUnit, getSuitableUnit } from 'utils/monitoring'

import { get } from 'lodash'

import { Icon } from '@kube-design/components'
import { Empty } from 'components/Base'
import Link from 'components/Link'
import Table from 'components/Tables/Ranking'

import styles from './index.scss'

@observer
export default class NodeUsageRank extends React.Component {
  IconWidth = 40

  rankTdWidth = 124

  toPercentage(num) {
    const number = Number(num) || 0
    return `${Math.ceil(number * 100)}%`
  }

  get canViewNode() {
    const { cluster } = this.props
    return globals.app.hasPermission({
      cluster,
      module: 'nodes',
      action: 'view',
    })
  }

  columns = [
    {
      width: this.IconWidth,
      key: 'icon',
      render: () => <Icon name="nodes" type="dark" size={40} />,
    },
    {
      title: t('NODES'),
      render: node => {
        const link = get(node, 'role', []).includes('edge')
          ? `/clusters/${this.props.cluster}/edgenodes/${node.node}`
          : `/clusters/${this.props.cluster}/nodes/${node.node}`

        return (
          <div>
            <h3>
              <Link to={link} auth={this.canViewNode}>
                {node.node}
              </Link>
              {node.role === 'master' && (
                <span className={styles.label}>Master</span>
              )}
            </h3>
            <p>{get(node, 'host_ip', '-')}</p>
          </div>
        )
      },
    },
    {
      key: 'cpu',
      width: this.rankTdWidth,
      sort_metric: 'node_cpu_utilisation',
      title: t('CPU'),
      render: node => {
        const unit = getSuitableUnit(node.node_cpu_total, 'cpu')
        return (
          <div>
            <h3>{this.toPercentage(node.node_cpu_utilisation)}</h3>
            <div>
              {getValueByUnit(node.node_cpu_usage, unit) || '-'} /{' '}
              {getValueByUnit(node.node_cpu_total, unit) || '-'} {unit}
            </div>
          </div>
        )
      },
    },
    {
      width: this.rankTdWidth,
      title: (
        <span className={styles.averageload}>{t('CPU_AVERAGE_LOAD')}</span>
      ),
      sort_metric: 'node_load1',
      render: node => (
        <div>
          <h3>
            {(node.node_load1 && Number(node.node_load1).toFixed(2)) || '-'}
          </h3>
        </div>
      ),
    },
    {
      width: this.rankTdWidth,
      sort_metric: 'node_memory_utilisation',
      title: t('Memory'),
      key: 'Memory',
      render: node => (
        <div>
          <h3>{this.toPercentage(node.node_memory_utilisation)}</h3>
          <div>
            {getValueByUnit(node.node_memory_usage_wo_cache, 'Gi') || '-'} /{' '}
            {getValueByUnit(node.node_memory_total, 'Gi') || '-'} Gi
          </div>
        </div>
      ),
    },
    {
      title: t('Local Storage'),
      key: 'disk',
      sort_metric: 'node_disk_size_utilisation',
      width: this.rankTdWidth,
      render: node => (
        <div>
          <h3>{this.toPercentage(node.node_disk_size_utilisation)}</h3>
          <div>
            {getValueByUnit(node.node_disk_size_usage, 'GB') || '-'} /{' '}
            {getValueByUnit(node.node_disk_size_capacity, 'GB') || '-'} GB
          </div>
        </div>
      ),
    },
    {
      width: this.rankTdWidth,
      title: t('inode Utilization'),
      sort_metric: 'node_disk_inode_utilisation',
      render: node => (
        <div>
          <h3>{this.toPercentage(node.node_disk_inode_utilisation)}</h3>
          <div>
            {node.node_disk_inode_usage || '-'} /{' '}
            {node.node_disk_inode_total || '-'}
          </div>
        </div>
      ),
    },
    {
      title: t('Pods'),
      key: 'Pod',
      width: this.rankTdWidth,
      sort_metric: 'node_pod_utilisation',
      render: node => (
        <div>
          <h3>{this.toPercentage(node.node_pod_utilisation)}</h3>
          <div>
            {node.node_pod_running_count || '-'} / {node.node_pod_quota || '-'}
          </div>
        </div>
      ),
    },
  ]

  render() {
    const { theme, store } = this.props
    const { data } = this.props.store

    return (
      <Table
        theme={theme}
        columns={this.columns}
        store={store}
        dataSource={data.toJS()}
        emptyText={<Empty />}
      />
    )
  }
}
