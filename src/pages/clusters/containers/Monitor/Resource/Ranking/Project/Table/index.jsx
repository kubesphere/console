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

import { getSuitableValue } from 'utils/monitoring'
import { showNameAndAlias } from 'utils'

import { Avatar, Empty } from 'components/Base'
import Table from 'components/Tables/Ranking'

@inject('rootStore')
@observer
export default class ProjectUsageRank extends React.Component {
  IconWidth = 40

  rankTdWidth = 124

  toPercentage(num) {
    const number = Number(num) || 0
    return `${Math.ceil(number * 100)}%`
  }

  toUnit(number, unit = '') {
    return isNaN(number) ? '-' : `${number} ${unit}`
  }

  get prefix() {
    const { workspace, cluster } = this.props
    return `${workspace ? `/${workspace}` : ''}/clusters/${cluster}/projects`
  }

  columns = [
    {
      dataIndex: 'namespace',
      title: t('PROJECT'),
      render: namespace => (
        <Avatar
          icon="project"
          iconSize={40}
          title={showNameAndAlias(namespace, 'project')}
          to={`${this.prefix}/${namespace}`}
        />
      ),
    },
    {
      sort_metric: 'namespace_cpu_usage',
      key: 'cpu',
      width: this.rankTdWidth,
      title: <div>{t('CPU_USAGE')}</div>,
      render: node => (
        <div>
          <h3>{getSuitableValue(node.namespace_cpu_usage, 'cpu', '-')}</h3>
          <div>
            {t('QUOTA_VALUE', {
              value: getSuitableValue(
                node.namespace_cpu_limit_hard,
                'cpu',
                '-'
              ),
            })}
          </div>
        </div>
      ),
    },
    {
      sort_metric: 'namespace_memory_usage_wo_cache',
      width: this.rankTdWidth,
      title: <div>{t('MEMORY_USAGE')}</div>,
      key: 'memory',
      render: node => (
        <div>
          <h3>
            {getSuitableValue(
              node.namespace_memory_usage_wo_cache,
              'memory',
              '-'
            )}
          </h3>
          <div>
            {t('QUOTA_VALUE', {
              value: getSuitableValue(
                node.namespace_memory_limit_hard,
                'memory',
                '-'
              ),
            })}
          </div>
        </div>
      ),
    },
    {
      sort_metric: 'namespace_pod_count',
      title: t('POD_COUNT'),
      key: 'pod',
      width: this.rankTdWidth,
      render: node => (
        <div>
          <h3>{node.namespace_pod_count || '-'}</h3>
          <div>
            {t('QUOTA_VALUE', { value: node.namespace_pod_count_hard || '-' })}
          </div>
        </div>
      ),
    },
    {
      sort_metric: 'namespace_net_bytes_transmitted',
      title: t('OUTBOUND_TRAFFIC'),
      key: 'namespace_net_bytes_transmitted',
      width: this.rankTdWidth,
      render: node => (
        <div>
          <h3>
            {getSuitableValue(
              node.namespace_net_bytes_transmitted,
              'bandwidth',
              '-'
            )}
          </h3>
        </div>
      ),
    },
    {
      sort_metric: 'namespace_net_bytes_received',
      title: t('INBOUND_TRAFFIC'),
      key: 'namespace_net_bytes_received',
      width: this.rankTdWidth,
      render: node => (
        <div>
          <h3>
            {getSuitableValue(
              node.namespace_net_bytes_received,
              'bandwidth',
              '-'
            )}
          </h3>
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
