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
import Table from 'components/Tables/List'
import withList, { ListPage } from 'components/HOCs/withList'
import ClusterWrapper from 'components/Clusters/ClusterWrapper'

import { getDisplayName, getLocalTime } from 'utils'

import FederatedStore from 'stores/federated'

@withList({
  store: new FederatedStore({ module: 'namespaces' }),
  name: 'Multi-cluster Project',
  module: 'federatedprojects',
  injectStores: ['rootStore', 'workspaceStore'],
})
export default class Projects extends React.Component {
  handleTabChange = value => {
    const { workspace } = this.props.match.params
    this.props.routing.push(`/workspaces/${workspace}/${value}`)
  }

  @computed
  get clusters() {
    return this.props.workspaceStore.clusters.data
  }

  get tabs() {
    return {
      value: this.props.module,
      onChange: this.handleTabChange,
      options: [
        {
          value: 'projects',
          label: t('Projects'),
        },
        {
          value: 'federatedprojects',
          label: t('Multi-cluster Projects'),
        },
      ],
    }
  }

  getData = async ({ silent, ...params } = {}) => {
    const { store } = this.props
    const { workspace } = this.props.match.params

    silent && (store.list.silent = true)
    await store.fetchList({
      labelSelector: `kubesphere.io/workspace=${workspace}`,
      ...params,
    })
    store.list.silent = false
  }

  get workspace() {
    return this.props.match.params.workspace
  }

  get itemActions() {
    const { trigger } = this.props
    return [
      {
        key: 'edit',
        icon: 'pen',
        text: t('Edit'),
        action: 'edit',
        onClick: item => trigger('resource.baseinfo.edit', { detail: item }),
      },
      {
        key: 'delete',
        icon: 'trash',
        text: t('Delete'),
        action: 'delete',
        onClick: item =>
          trigger('resource.delete', {
            type: t('Project'),
            detail: item,
          }),
      },
    ]
  }

  getColumns = () => {
    return [
      {
        title: t('Name'),
        dataIndex: 'name',
        render: (name, record) => (
          <Avatar
            to={`/${this.workspace}/federatedprojects/${name}`}
            icon="project"
            iconSize={40}
            isMultiCluster={true}
            desc={record.description || '-'}
            title={getDisplayName(record)}
          />
        ),
      },
      {
        title: t('Deploy Placement'),
        dataIndex: 'clusters',
        isHideable: true,
        render: clusters => (
          <ClusterWrapper clusters={clusters} clustersDetail={this.clusters} />
        ),
      },
      {
        title: t('Created Time'),
        dataIndex: 'createTime',
        isHideable: true,
        width: '20%',
        render: time => getLocalTime(time).format('YYYY-MM-DD HH:mm:ss'),
      },
    ]
  }

  showCreate = () =>
    this.props.trigger('project.create', {
      ...this.props.match.params,
    })

  render() {
    const { bannerProps, tableProps } = this.props
    return (
      <ListPage {...this.props} getData={this.getData}>
        <Banner
          {...bannerProps}
          tabs={this.tabs}
          icon="project"
          title={t('Projects')}
          description={t('PROJECT_DESC')}
        />
        <Table
          {...tableProps}
          itemActions={this.itemActions}
          columns={this.getColumns()}
          onCreate={this.showCreate}
          searchType="name"
        />
      </ListPage>
    )
  }
}
