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
import { get } from 'lodash'

import { Avatar, Status } from 'components/Base'
import Banner from 'components/Cards/Banner'
import Table from 'workspaces/components/ResourceTable'
import withList, { ListPage } from 'components/HOCs/withList'

import { getDisplayName } from 'utils'
import { getSuitableValue, getValueByUnit } from 'utils/monitoring'

import ProjectStore from 'stores/project'
import ProjectMonitorStore from 'stores/monitoring/project'

const MetricTypes = {
  cpu: 'namespace_cpu_usage',
  memory: 'namespace_memory_usage_wo_cache',
  pod: 'namespace_pod_count',
}

@withList({
  store: new ProjectStore(),
  name: 'Project',
  module: 'projects',
  injectStores: ['rootStore', 'workspaceStore'],
})
export default class Projects extends React.Component {
  workspaceStore = this.props.workspaceStore

  monitoringStore = new ProjectMonitorStore()

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

  get showFederated() {
    const { workspace } = this.props.match.params
    return (
      globals.app.isMultiCluster &&
      globals.app.hasPermission({
        workspace,
        module: 'federatedprojects',
        action: 'view',
      })
    )
  }

  @computed
  get clusters() {
    return this.workspaceStore.clusters.data.map(item => ({
      label: item.name,
      value: item.name,
    }))
  }

  get workspace() {
    return this.props.match.params.workspace
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
        labelSelector: 'kubefed.io/managed!=true',
      })
      await this.monitoringStore.fetchMetrics({
        cluster,
        ...this.props.match.params,
        resources: store.list.data.map(item => item.name),
        metrics: Object.values(MetricTypes),
        last: true,
      })
    }
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

  getLastValue = (record, type, unit) => {
    const metricsData = this.monitoringStore.data
    const result = get(metricsData, `${type}.data.result`) || []
    const metrics = result.find(
      item => get(item, 'metric.namespace') === record.name
    )
    return getValueByUnit(get(metrics, 'value[1]', 0), unit)
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
        key: 'namespace_cpu_usage',
        isHideable: true,
        render: record =>
          getSuitableValue(
            this.getLastValue(record, MetricTypes.cpu),
            'cpu',
            '-'
          ),
      },
      {
        title: t('Memory Usage'),
        key: 'namespace_memory_usage_wo_cache',
        isHideable: true,
        render: record =>
          getSuitableValue(
            this.getLastValue(record, MetricTypes.memory),
            'memory',
            '-'
          ),
      },
      {
        title: t('Pod Count'),
        key: 'namespace_pod_count',
        isHideable: true,
        render: record => this.getLastValue(record, MetricTypes.pod),
      },
    ]
  }

  showCreate = () =>
    this.props.trigger('project.create', {
      ...this.props.match.params,
    })

  render() {
    const { match, bannerProps, tableProps } = this.props

    const matchParams = {
      ...match,
      params: {
        ...match.params,
        cluster: this.workspaceStore.cluster,
      },
    }

    const isLoadingMonitor = this.monitoringStore.isLoading

    return (
      <ListPage
        {...this.props}
        match={matchParams}
        getData={this.getData}
        module="namespaces"
      >
        <Banner {...bannerProps} tabs={this.showFederated ? this.tabs : {}} />
        <Table
          {...tableProps}
          itemActions={this.itemActions}
          columns={this.getColumns()}
          onCreate={this.showCreate}
          searchType="name"
          {...this.clusterProps}
          monitorLoading={isLoadingMonitor}
          getCheckboxProps={this.getCheckboxProps}
          alwaysUpdate
        />
      </ListPage>
    )
  }
}
