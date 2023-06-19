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

import { Avatar, Status } from 'components/Base'
import Banner from 'components/Cards/Banner'
import withList, { ListPage } from 'components/HOCs/withList'
import { computed } from 'mobx'
import React from 'react'

import DevOpsStore from 'stores/devops'

import { getDisplayNameNew, getLocalTime } from 'utils'
import Table from 'workspaces/components/ResourceTable'

@withList({
  store: new DevOpsStore(),
  name: 'DEVOPS_PROJECT',
  module: 'devops',
  rowKey: 'namespace',
  injectStores: ['rootStore', 'workspaceStore'],
})
export default class DevOps extends React.Component {
  workspaceStore = this.props.workspaceStore

  get itemActions() {
    const { trigger, name } = this.props
    return [
      {
        key: 'edit',
        icon: 'pen',
        text: t('EDIT'),
        action: 'edit',
        onClick: item => trigger('devops.edit', { detail: item }),
      },
      {
        key: 'delete',
        icon: 'trash',
        text: t('DELETE'),
        action: 'delete',
        onClick: item => {
          trigger('resource.delete', {
            title: t('DELETE_DEVOPS_PROJECT'),
            desc: t.html('DELETE_DEVOPS_PROJECT_TIP', { resource: item.name }),
            type: name,
            resource: item.name,
            detail: item,
          })
        },
      },
    ]
  }

  get tips() {
    return [
      {
        title: t('DEVOPS_TIP_GITOPS_Q'),
        description: t('DEVOPS_TIP_GITOPS_A'),
      },
      {
        title: t('DEVOPS_TIP_TYPE_Q'),
        description: t('DEVOPS_TIP_TYPE_A'),
      },
    ]
  }

  get workspace() {
    return this.props.match.params.workspace
  }

  @computed
  get clusters() {
    return this.workspaceStore.clusters.data.map(item => ({
      label: item.name,
      value: item.name,
      disabled: !item.isReady,
      cluster: item,
    }))
  }

  get clusterProps() {
    return {
      clusters: this.clusters,
      cluster: this.workspaceStore.cluster,
      onClusterChange: this.handleClusterChange,
      showClusterSelect: globals.app.isMultiCluster,
    }
  }

  get tableActions() {
    const { tableProps, trigger } = this.props
    return {
      ...tableProps.tableActions,
      selectActions: [
        {
          key: 'delete',
          type: 'danger',
          text: t('DELETE'),
          action: 'delete',
          onClick: () => {
            trigger('devops.batch.delete', {
              type: tableProps.name,
              rowKey: tableProps.rowKey,
            })
          },
        },
      ],
    }
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

  handleClusterChange = cluster => {
    this.workspaceStore.selectCluster(cluster)
    this.getData()
  }

  getData = async ({ silent, ...params } = {}) => {
    const { store } = this.props

    silent && (store.list.silent = true)
    const { cluster } = this.workspaceStore
    if (cluster) {
      await store.fetchList({
        cluster,
        ...this.props.match.params,
        ...params,
      })
    }
    store.list.silent = false
  }

  getColumns = () => [
    {
      title: t('NAME'),
      dataIndex: 'name',
      render: (name, record) => {
        const isTerminating = record.status === 'Terminating'
        return (
          <>
            <Avatar
              icon="strategy-group"
              iconSize={40}
              to={
                record.namespace && record.cluster && !isTerminating
                  ? `/${this.workspace}/clusters/${record.cluster}/devops/${record.namespace}`
                  : null
              }
              desc={record.description || '-'}
              title={getDisplayNameNew(record)}
            />
          </>
        )
      },
    },
    {
      title: t('STATUS'),
      dataIndex: 'status',
      isHideable: true,
      render: status => (
        <Status type={status} name={t(status.toUpperCase())} flicker />
      ),
    },
    {
      title: t('CREATOR'),
      dataIndex: 'creator',
      isHideable: true,
      render: creator => creator || '-',
    },
    {
      title: t('CREATION_TIME_TCAP'),
      dataIndex: 'createTime',
      isHideable: true,
      sorter: true,
      render: time => getLocalTime(time).format('YYYY-MM-DD HH:mm:ss'),
    },
  ]

  showCreate = () =>
    this.props.trigger('devops.create', {
      ...this.props.match.params,
      cluster: this.workspaceStore.cluster,
      success: cluster => {
        if (cluster) {
          this.workspaceStore.selectCluster(cluster)
        }
        this.getData({ silent: true })
      },
    })

  getCheckboxProps = record => ({
    disabled: record.status === 'Terminating',
    name: record.name,
  })

  render() {
    const { bannerProps, tableProps, match } = this.props
    const matchParams = {
      ...match,
      params: {
        ...match.params,
        cluster: this.workspaceStore.cluster,
      },
    }

    return (
      <ListPage {...this.props} getData={this.getData} match={matchParams}>
        <Banner
          {...bannerProps}
          description={t('DEVOPS_DESCRIPTION')}
          tips={this.tips}
        />
        <Table
          {...tableProps}
          className={'table-2-8'}
          itemActions={this.itemActions}
          tableActions={this.tableActions}
          columns={this.getColumns()}
          columnSearch={this.columnSearch}
          onCreate={this.showCreate}
          isLoading={tableProps.isLoading}
          {...this.clusterProps}
          getCheckboxProps={this.getCheckboxProps}
        />
      </ListPage>
    )
  }
}
