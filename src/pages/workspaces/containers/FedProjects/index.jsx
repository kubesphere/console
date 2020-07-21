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
import { Avatar, Status } from 'components/Base'
import Banner from 'components/Cards/Banner'
import Table from 'workspaces/components/ResourceTable'
import withList, { ListPage } from 'components/HOCs/withList'
import ClusterWrapper from 'components/Clusters/ClusterWrapper'

import { getDisplayName, getLocalTime } from 'utils'

import FederatedStore from 'stores/federated'
import ProjectStore from 'stores/project'

@withList({
  store: new FederatedStore({ module: 'namespaces' }),
  name: 'Multi-cluster Project',
  module: 'federatedprojects',
  injectStores: ['rootStore', 'workspaceStore'],
})
export default class Projects extends React.Component {
  projectStore = new ProjectStore()

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
          trigger('federated.project.delete', {
            detail: item,
          }),
      },
    ]
  }

  get tableActions() {
    const { name, trigger, getData, tableProps } = this.props
    return {
      ...tableProps.tableActions,
      selectActions: [
        {
          key: 'delete',
          type: 'danger',
          text: t('Delete'),
          action: 'delete',
          onClick: () =>
            trigger('federated.project.delete.batch', {
              type: t(name),
              success: getData,
              rowKey: 'name',
              ...this.props.match.params,
            }),
        },
      ],
      getCheckboxProps: record => ({
        disabled: record.deletionTime,
        name: record.name,
      }),
    }
  }

  getColumns = () => {
    return [
      {
        title: t('Name'),
        dataIndex: 'name',
        render: (name, record) => (
          <Avatar
            to={
              record.deletionTime
                ? null
                : `/${this.workspace}/federatedprojects/${name}`
            }
            icon="project"
            iconSize={40}
            isMultiCluster={true}
            desc={record.description || '-'}
            title={getDisplayName(record)}
          />
        ),
      },
      {
        title: t('Status'),
        dataIndex: 'status',
        isHideable: true,
        render: status => <Status type={status} name={t(status)} flicker />,
      },
      {
        title: t('Deployment Location'),
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
    this.props.trigger('federated.project.create', {
      ...this.props.match.params,
      store: this.projectStore,
      clusters: this.clusters.slice(),
      success: () => this.getData(),
    })

  render() {
    const { bannerProps, tableProps } = this.props

    return (
      <ListPage
        {...this.props}
        getData={this.getData}
        module="namespaces"
        isFederated
      >
        <Banner
          {...bannerProps}
          tabs={this.tabs}
          icon="project"
          title={t('Projects')}
          description={t('PROJECT_DESC')}
        />
        <Table
          {...tableProps}
          tableActions={this.tableActions}
          itemActions={this.itemActions}
          columns={this.getColumns()}
          onCreate={this.showCreate}
          searchType="name"
          clusters={this.clusters}
        />
      </ListPage>
    )
  }
}
