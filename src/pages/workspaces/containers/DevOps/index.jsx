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

import { Avatar } from 'components/Base'
import Banner from 'components/Cards/Banner'
import Table from 'workspaces/components/ResourceTable'
import withList, { ListPage } from 'components/HOCs/withList'

import { getLocalTime } from 'utils'

import DevOpsStore from 'stores/devops'

@withList({
  store: new DevOpsStore(),
  name: 'DevOps Project',
  module: 'devops',
  rowKey: 'name',
  injectStores: ['rootStore', 'workspaceStore'],
})
export default class DevOps extends React.Component {
  workspaceStore = this.props.workspaceStore

  get itemActions() {
    const { trigger } = this.props
    return [
      {
        key: 'edit',
        icon: 'pen',
        text: t('Edit'),
        action: 'edit',
        onClick: item =>
          trigger('devops.edit', { detail: item, success: this.getData }),
      },
      {
        key: 'delete',
        icon: 'trash',
        text: t('Delete'),
        action: 'delete',
        onClick: item =>
          trigger('resource.delete', {
            type: t('DevOps Project'),
            resource: item.name,
            detail: item,
            success: () => {
              setTimeout(() => {
                this.getData()
              }, 500)
            },
          }),
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
      title: t('Name'),
      dataIndex: 'name',
      width: '20%',
      render: (name, record) => {
        return (
          <Avatar
            icon="strategy-group"
            iconSize={40}
            to={
              record.namespace && record.cluster
                ? `/${this.workspace}/clusters/${record.cluster}/devops/${
                    record.namespace
                  }`
                : null
            }
            desc={record.description || '-'}
            title={name}
          />
        )
      },
    },
    {
      title: t('ID'),
      dataIndex: 'namespace',
      isHideable: true,
      width: '20%',
    },
    {
      title: t('Creator'),
      dataIndex: 'creator',
      isHideable: true,
      width: '40%',
      render: creator => creator || '-',
    },
    {
      title: t('Created Time'),
      dataIndex: 'createTime',
      isHideable: true,
      width: '20%',
      render: time => getLocalTime(time).format('YYYY-MM-DD HH:mm:ss'),
    },
  ]

  showCreate = () =>
    this.props.trigger('devops.create', {
      ...this.props.match.params,
      success: () => {
        setTimeout(() => {
          this.getData()
        }, 500)
      },
    })

  render() {
    const { bannerProps, tableProps } = this.props
    return (
      <ListPage {...this.props} getData={this.getData} noWatch>
        <Banner
          {...bannerProps}
          description={t('DEVOPS_DESCRIPTION')}
          tips={this.tips}
        />
        <Table
          {...tableProps}
          itemActions={this.itemActions}
          columns={this.getColumns()}
          onCreate={this.showCreate}
          searchType="name"
          {...this.clusterProps}
        />
      </ListPage>
    )
  }
}
