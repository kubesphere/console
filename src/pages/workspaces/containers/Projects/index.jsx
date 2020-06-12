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
import { isUndefined } from 'lodash'

import { Avatar, Status } from 'components/Base'
import Banner from 'components/Cards/Banner'
import Table from 'workspaces/components/ResourceTable'
import withList, { ListPage } from 'components/HOCs/withList'

import { getDisplayName } from 'utils'
import { getSuitableValue } from 'utils/monitoring'

import ProjectStore from 'stores/project'

@withList({
  store: new ProjectStore(),
  name: 'Project',
  module: 'projects',
  injectStores: ['rootStore', 'workspaceStore'],
})
export default class Projects extends React.Component {
  workspaceStore = this.props.workspaceStore

  handleTabChange = value => {
    const { workspace } = this.props.match.params
    this.props.routing.push(`/workspaces/${workspace}/${value}`)
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

  @computed
  get clusters() {
    return this.workspaceStore.clusters.data.map(item => ({
      label: item.name,
      value: item.name,
    }))
  }

  get cluster() {
    if (this.query && this.query.cluster) {
      return this.query.cluster
    }
    return this.hostCluster
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

  get workspace() {
    return this.props.match.params.workspace
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
        key: 'quotaEdit',
        icon: 'pen',
        text: t('Edit Quota'),
        action: 'edit',
        onClick: item =>
          trigger('project.quota.edit', {
            type: t('Project'),
            detail: item,
          }),
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

  getCheckboxProps = record => ({
    disabled: record.status === 'Terminating',
    name: record.name,
  })

  getColumns = () => {
    const { getSortOrder } = this.props
    return [
      {
        title: t('Name'),
        dataIndex: 'name',
        sorter: true,
        sortOrder: getSortOrder('name'),
        render: (name, record) => (
          <Avatar
            to={
              record.status === 'Terminating'
                ? null
                : `/${this.workspace}/clusters/${
                    record.cluster
                  }/projects/${name}`
            }
            icon="project"
            iconSize={40}
            desc={record.description || '-'}
            title={getDisplayName(record)}
          />
        ),
      },
      {
        title: t('Status'),
        dataIndex: 'status',
        isHideable: true,
        search: true,
        render: status => <Status type={status} name={t(status)} flicker />,
      },
      {
        title: t('CPU Usage'),
        dataIndex: 'annotations.namespace_cpu_usage',
        isHideable: true,
        render: count => getSuitableValue(count, 'cpu', '-'),
      },
      {
        title: t('Memory Usage'),
        dataIndex: 'annotations.namespace_memory_usage_wo_cache',
        isHideable: true,
        render: count => getSuitableValue(count, 'memory', '-'),
      },
      {
        title: t('Pod Count'),
        dataIndex: 'annotations.namespace_pod_count',
        isHideable: true,
        render: count => (!isUndefined(count) ? count : 0),
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
      <ListPage {...this.props} getData={this.getData} module="namespaces">
        <Banner {...bannerProps} tabs={this.tabs} />
        <Table
          {...tableProps}
          itemActions={this.itemActions}
          columns={this.getColumns()}
          onCreate={this.showCreate}
          searchType="name"
          cluster={this.cluster}
          clusters={this.clusters}
          getCheckboxProps={this.getCheckboxProps}
        />
      </ListPage>
    )
  }
}
