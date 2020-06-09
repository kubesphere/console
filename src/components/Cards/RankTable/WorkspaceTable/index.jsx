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
import { Link } from 'react-router-dom'
import { inject, observer } from 'mobx-react'

import { isUndefined } from 'lodash'

import { getSuitableValue } from 'utils/monitoring'

import { Icon } from '@pitrix/lego-ui'
import { Empty } from 'components/Base'
import Table from 'components/Tables/Ranking'

@inject('rootStore')
@observer
export default class NodeUsageRank extends React.Component {
  IconWidth = 40

  rankTdWidth = 124

  toPercentage(num) {
    const number = Number(num) || 0
    return `${Math.ceil(number * 100)}%`
  }

  columns = [
    {
      width: this.IconWidth,
      key: 'icon',
      render: () => <Icon name="enterprise" type="dark" size={40} />,
    },
    {
      dataIndex: 'resource_name',
      title: t('Workspace'),
      render: ws => (
        <div>
          <h3>
            <Link to={`/workspaces/${ws}/overview/ranking`}>{ws}</Link>
          </h3>
        </div>
      ),
    },
    {
      sort_metric: 'workspace_cpu_usage',
      key: 'workspace_cpu_usage',
      width: this.rankTdWidth,
      title: <div>{t('CPU Usage')}</div>,
      render: node => (
        <div>
          <h3>{getSuitableValue(node.workspace_cpu_usage, 'cpu', '-')}</h3>
        </div>
      ),
    },
    {
      sort_metric: 'workspace_memory_usage_wo_cache',
      width: this.rankTdWidth,
      title: <div>{t('Memory Usage')}</div>,
      key: 'memory',
      render: node => (
        <div>
          <h3>
            {getSuitableValue(
              node.workspace_memory_usage_wo_cache,
              'memory',
              '-'
            )}
          </h3>
        </div>
      ),
    },
    {
      title: t('Pod Count'),
      sort_metric: 'workspace_pod_count',
      key: 'pod',
      width: this.rankTdWidth,
      render: node => (
        <div>
          <h3>
            {isUndefined(node.workspace_pod_count)
              ? '-'
              : node.workspace_pod_count}
          </h3>
        </div>
      ),
    },
    {
      title: t('Outbound Traffic'),
      sort_metric: 'workspace_net_bytes_transmitted',
      key: 'workspace_net_bytes_transmitted',
      width: this.rankTdWidth,
      render: node => (
        <div>
          <h3>
            {getSuitableValue(
              node.workspace_net_bytes_transmitted,
              'bandwidth',
              '-'
            )}
          </h3>
        </div>
      ),
    },
    {
      title: t('Inbound Traffic'),
      sort_metric: 'workspace_net_bytes_received',
      key: 'workspace_net_bytes_received',
      width: this.rankTdWidth,
      render: node => (
        <div>
          <h3>
            {getSuitableValue(
              node.workspace_net_bytes_received,
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
