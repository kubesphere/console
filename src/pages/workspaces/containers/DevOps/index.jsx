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
import { computed, get } from 'mobx'
import { parse } from 'qs'

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
    const { trigger, getData } = this.props
    return [
      {
        key: 'edit',
        icon: 'pen',
        text: t('Edit'),
        action: 'edit',
        onClick: item =>
          trigger('devops.edit', { detail: item, success: getData }),
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
                getData()
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

  @computed
  get clusters() {
    return this.workspaceStore.clusters.data.map(item => ({
      label: item.name,
      value: item.name,
    }))
  }

  @computed
  get cluster() {
    const params = parse(location.search.slice(1))
    return params.cluster || this.hostCluster
  }

  @computed
  get hostCluster() {
    if (this.workspaceStore.clusters.data.length < 1) {
      return ''
    }

    return get(
      this.workspaceStore.clusters.data.find(cluster => cluster.isHost) ||
        this.workspaceStore.clusters.data[0],
      'name'
    )
  }

  getData = async ({ silent, ...params } = {}) => {
    this.query = params

    const { store } = this.props

    silent && (store.list.silent = true)
    await store.fetchList({
      cluster: this.cluster,
      ...this.props.match.params,
      ...params,
    })
    store.list.silent = false
  }

  getColumns = () => [
    {
      title: t('Name'),
      dataIndex: 'name',
      width: '20%',
      render: (name, record) => (
        <Avatar
          icon="strategy-group"
          iconSize={40}
          to={`/cluster/${this.cluster}/devops/${record.namespace}`}
          desc={record.description || '-'}
          title={name}
        />
      ),
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
      dataIndex: 'create_time',
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
          this.props.getData()
        }, 500)
      },
    })

  render() {
    const { bannerProps, tableProps } = this.props
    return (
      <ListPage {...this.props} getData={this.getData}>
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
          cluster={this.cluster}
          clusters={this.clusters}
        />
      </ListPage>
    )
  }
}
