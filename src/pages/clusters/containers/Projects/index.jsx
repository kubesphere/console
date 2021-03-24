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
import { get, omit } from 'lodash'

import { Avatar, Status } from 'components/Base'
import Banner from 'components/Cards/Banner'
import Table from 'components/Tables/List'
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
})
export default class Projects extends React.Component {
  monitoringStore = new ProjectMonitorStore()

  showAction = record => !record.isFedManaged

  get itemActions() {
    const { trigger, routing, name } = this.props
    return [
      {
        key: 'edit',
        icon: 'pen',
        text: t('Edit'),
        action: 'edit',
        show: this.showAction,
        onClick: item =>
          trigger('resource.baseinfo.edit', {
            detail: omit(item, 'workspace'),
            success: routing.query,
          }),
      },
      {
        key: 'modify',
        icon: 'restart',
        text: t('Assign Workspace'),
        action: 'manage',
        show: record => !record.workspace && this.showAction(record),
        onClick: item =>
          trigger('project.assignworkspace', {
            detail: item,
            success: routing.query,
          }),
      },
      {
        key: 'delete',
        icon: 'trash',
        text: t('Delete'),
        action: 'delete',
        show: record =>
          record.workspace !== globals.config.systemWorkspace &&
          this.showAction(record),
        onClick: item =>
          trigger('resource.delete', {
            type: t(name),
            resource: item.name,
            detail: omit(item, 'workspace'),
            success: routing.query,
          }),
      },
    ]
  }

  get tabs() {
    return {
      value: this.type || 'user',
      onChange: this.handleTabChange,
      options: [
        {
          value: 'user',
          label: t('User Projects'),
        },
        {
          value: 'system',
          label: t('System Projects'),
        },
      ],
    }
  }

  get tableActions() {
    const { tableProps } = this.props
    return {
      ...tableProps.tableActions,
      onFetch: this.handleFetch,
    }
  }

  handleFetch = (params, refresh) => {
    const { routing } = this.props
    routing.query({ ...params, type: this.type }, refresh)
  }

  handleTabChange = type => {
    const { cluster } = this.props.match.params
    this.props.routing.push(`/clusters/${cluster}/projects?type=${type}`)
  }

  getData = async ({ silent, ...params } = {}) => {
    this.query = params
    params.type = params.type || 'user'
    this.type = params.type

    const { store } = this.props
    silent && (store.list.silent = true)
    await store.fetchList({
      ...this.props.match.params,
      ...params,
    })
    await this.monitoringStore.fetchMetrics({
      ...this.props.match.params,
      resources: store.list.data.map(item => item.name),
      metrics: Object.values(MetricTypes),
      last: true,
    })
    store.list.silent = false
  }

  getLastValue = (record, type, unit) => {
    const metricsData = this.monitoringStore.data
    const result = get(metricsData, `${type}.data.result`) || []
    const metrics = result.find(
      item => get(item, 'metric.namespace') === record.name
    )
    return getValueByUnit(get(metrics, 'value[1]', 0), unit)
  }

  getColumns = () => {
    const { getSortOrder, prefix } = this.props
    return [
      {
        title: t('Name'),
        dataIndex: 'name',
        sorter: true,
        sortOrder: getSortOrder('name'),
        render: (name, record) => (
          <Avatar
            to={record.status === 'Terminating' ? null : `${prefix}/${name}`}
            icon="project"
            iconSize={40}
            isMultiCluster={record.isFedManaged}
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
        title: t('Workspace'),
        dataIndex: 'workspace',
        isHideable: true,
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
      success: () => this.getData(),
    })

  render() {
    const { bannerProps, tableProps } = this.props
    const isLoadingMonitor = this.monitoringStore.isLoading

    return (
      <ListPage {...this.props} getData={this.getData} module="namespaces">
        <Banner {...bannerProps} tabs={this.tabs} />
        <Table
          {...tableProps}
          itemActions={this.itemActions}
          tableActions={this.tableActions}
          columns={this.getColumns()}
          onCreate={this.type === 'system' ? null : this.showCreate}
          isLoading={tableProps.isLoading || isLoadingMonitor}
          searchType="name"
        />
      </ListPage>
    )
  }
}
