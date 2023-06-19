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

import { Tag } from '@kube-design/components'
import { Avatar } from 'components/Base'
import Banner from 'components/Cards/Banner'
import ClusterWrapper from 'components/Clusters/ClusterWrapper'
import withList, { ListPage } from 'components/HOCs/withList'
import Table from 'components/Tables/List'
import { computed } from 'mobx'
import React from 'react'
import ClusterStore from 'stores/cluster'

import WorkspaceStore from 'stores/workspace'

import { getDisplayNameNew, getDomTitle, getLocalTime } from 'utils'

@withList({
  store: new WorkspaceStore(),
  module: 'workspaces',
  name: 'WORKSPACE',
})
export default class Workspaces extends React.Component {
  clusterStore = new ClusterStore()

  componentDidMount() {
    this.clusterStore.fetchList({ limit: -1 })
  }

  @computed
  get clusters() {
    return this.clusterStore.list.data
  }

  get columnSearch() {
    return [
      {
        dataIndex: 'name',
        title: t('NAME'),
        search: true,
      },
      {
        dataIndex: 'alias',
        title: t('ALIAS'),
        search: true,
      },
    ]
  }

  showAction(record) {
    return globals.config.systemWorkspace !== record.name
  }

  get itemActions() {
    const { name, routing, trigger } = this.props
    return [
      {
        key: 'edit',
        icon: 'pen',
        text: t('EDIT_INFORMATION'),
        action: 'edit',
        show: this.showAction,
        onClick: item =>
          trigger('resource.baseinfo.edit', {
            detail: item,
            success: routing.query,
          }),
      },
      {
        key: 'delete',
        icon: 'trash',
        text: t('DELETE'),
        action: 'delete',
        show: this.showAction,
        onClick: item =>
          trigger('workspace.delete', {
            type: name,
            resource: item.name,
            detail: item,
            success: routing.query,
          }),
      },
    ]
  }

  get tableActions() {
    const { tableProps, trigger, name } = this.props
    return {
      ...tableProps.tableActions,
      selectActions: [
        {
          key: 'delete',
          type: 'danger',
          text: t('DELETE'),
          action: 'delete',
          onClick: () =>
            trigger('workspace.batch.delete', {
              type: name,
              rowKey: 'name',
            }),
        },
      ],
      getCheckboxProps: record => ({
        disabled: !this.showAction(record),
        name: record.name,
      }),
    }
  }

  getColumns = () => {
    const { getSortOrder } = this.props

    const columns = [
      {
        title: t('NAME'),
        dataIndex: 'name',
        sorter: true,
        sortOrder: getSortOrder('name'),
        render: (name, record) => (
          <Avatar
            icon="enterprise"
            iconSize={40}
            title={getDomTitle(getDisplayNameNew(record))}
            desc={getDomTitle(record.description || '-')}
            to={`/workspaces/${name}`}
          />
        ),
      },
      {
        title: t('CREATION_TIME_TCAP'),
        dataIndex: 'createTime',
        sorter: true,
        sortOrder: getSortOrder('createTime'),
        isHideable: true,
        width: 250,
        render: time => getLocalTime(time).format('YYYY-MM-DD HH:mm:ss'),
      },
    ]

    if (globals.app.isMultiCluster) {
      columns.splice(1, 0, {
        title: t('CLUSTER_PL'),
        dataIndex: 'clusters',
        width: '30%',
        render: (clusters, { name }) =>
          name === 'system-workspace' ? (
            <Tag type="secondary">{t('ALL_CLUSTERS')}</Tag>
          ) : (
            <ClusterWrapper
              clusters={clusters}
              clustersDetail={this.clusters}
            />
          ),
      })
    }

    return columns
  }

  showCreate = () => {
    const { getData } = this.props
    return this.props.trigger('workspace.create', {
      success: getData,
    })
  }

  render() {
    const { bannerProps, tableProps } = this.props
    const isClusterLoading = this.clusterStore.list.isLoading
    return (
      <ListPage {...this.props}>
        <Banner {...bannerProps} />
        <Table
          className={'table-2-6'}
          {...tableProps}
          columns={this.getColumns()}
          columnSearch={this.columnSearch}
          itemActions={this.itemActions}
          tableActions={this.tableActions}
          onCreate={this.showCreate}
          isLoading={tableProps.isLoading || isClusterLoading}
        />
      </ListPage>
    )
  }
}
