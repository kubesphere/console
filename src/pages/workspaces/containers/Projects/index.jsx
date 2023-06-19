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

import { Icon, Tooltip } from '@kube-design/components'

import { Avatar, Status } from 'components/Base'
import Banner from 'components/Cards/Banner'
import withList, { ListPage } from 'components/HOCs/withList'
import { get } from 'lodash'
import { computed } from 'mobx'
import React from 'react'
import ProjectMonitorStore from 'stores/monitoring/project'

import ProjectStore from 'stores/project'

import { getDisplayNameNew, getLocalTime } from 'utils'
import { getSuitableValue, getValueByUnit } from 'utils/monitoring'
import Table from 'workspaces/components/ResourceTable'

const MetricTypes = {
  cpu: 'namespace_cpu_usage',
  memory: 'namespace_memory_usage_wo_cache',
  pod: 'namespace_pod_count',
}

@withList({
  store: new ProjectStore(),
  name: 'PROJECT',
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
          label: t('PROJECT_PL'),
        },
        {
          value: 'federatedprojects',
          label: t('MULTI_CLUSTER_PROJECT_PL'),
        },
      ],
    }
  }

  get showFederated() {
    return globals.app.isMultiCluster
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
        labelSelector:
          'kubefed.io/managed!=true, kubesphere.io/kubefed-host-namespace!=true',
      })

      const resources = store.list.data.map(item => item.name)

      if (resources.length > 0) {
        await this.monitoringStore.fetchMetrics({
          cluster,
          resources,
          ...this.props.match.params,
          metrics: Object.values(MetricTypes),
          last: true,
        })
      }
    }

    store.list.silent = false
  }

  get itemActions() {
    const { trigger, name } = this.props
    return [
      {
        key: 'edit',
        icon: 'pen',
        text: t('EDIT_INFORMATION'),
        action: 'edit',
        onClick: item => trigger('resource.baseinfo.edit', { detail: item }),
      },
      {
        key: 'quotaEdit',
        icon: 'pen',
        text: t('EDIT_QUOTAS'),
        action: 'edit',
        onClick: item =>
          trigger('project.quota.edit', {
            type: t('PROJECT'),
            detail: item,
          }),
      },
      {
        key: 'delete',
        icon: 'trash',
        text: t('DELETE'),
        action: 'delete',
        onClick: item =>
          trigger('resource.delete', {
            type: name,
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
        title: t('NAME'),
        dataIndex: 'name',
        sorter: true,
        sortOrder: getSortOrder('name'),
        render: (name, record) => (
          <Avatar
            to={
              record.status === 'Terminating' || record.isFedHostNamespace
                ? null
                : `/${this.workspace}/clusters/${record.cluster}/projects/${name}`
            }
            icon="project"
            iconSize={40}
            desc={record.description || '-'}
            title={getDisplayNameNew(record)}
          />
        ),
      },
      {
        title: t('STATUS'),
        dataIndex: 'status',
        isHideable: true,
        render: status => <Status type={status} name={t(status)} flicker />,
      },
      {
        title: t('CPU_USAGE'),
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
        title: t('MEMORY_USAGE'),
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
        title: t('POD_COUNT'),
        key: 'namespace_pod_count',
        isHideable: true,
        render: record => this.getLastValue(record, MetricTypes.pod),
      },
      {
        title: t('CREATION_TIME_TCAP'),
        dataIndex: 'createTime',
        isHideable: true,
        sorter: true,
        render: time => getLocalTime(time).format('YYYY-MM-DD HH:mm:ss'),
      },
    ]
  }

  renderTitle(record) {
    if (record.isFedHostNamespace) {
      return (
        <span>
          <span className="margin-r8">{getDisplayNameNew(record)}</span>
          <Tooltip content={t('FED_HOST_NAMESPACE_TIP')}>
            <Icon name="information" />
          </Tooltip>
        </span>
      )
    }

    return getDisplayNameNew(record)
  }

  showCreate = () =>
    this.props.trigger('project.create', {
      ...this.props.match.params,
      defaultCluster: this.workspaceStore.cluster,
      success: cluster => {
        if (cluster) {
          this.workspaceStore.selectCluster(cluster)
        }
        this.getData({ silent: true })
      },
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
          className={'table-2-7'}
          {...tableProps}
          itemActions={this.itemActions}
          columns={this.getColumns()}
          columnSearch={this.columnSearch}
          onCreate={this.showCreate}
          {...this.clusterProps}
          isLoading={tableProps.isLoading || isLoadingMonitor}
          getCheckboxProps={this.getCheckboxProps}
        />
      </ListPage>
    )
  }
}
