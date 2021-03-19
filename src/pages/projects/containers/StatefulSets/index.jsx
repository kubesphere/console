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

import { Avatar } from 'components/Base'
import Banner from 'components/Cards/Banner'
import { withProjectList, ListPage } from 'components/HOCs/withList'
import WorkloadStatus from 'projects/components/WorkloadStatus'
import StatusReason from 'projects/components/StatusReason'
import Table from 'components/Tables/List'

import { getLocalTime, getDisplayName } from 'utils'
import { getWorkloadStatus } from 'utils/status'
import { WORKLOAD_STATUS, ICON_TYPES } from 'utils/constants'

import WorkloadStore from 'stores/workload'

@withProjectList({
  store: new WorkloadStore('statefulsets'),
  module: 'statefulsets',
  name: 'Workload',
})
export default class StatefulSets extends React.Component {
  get prefix() {
    const { workspace, namespace, cluster } = this.props.match.params
    return `/${workspace}/clusters/${cluster}/projects/${namespace}`
  }

  handleTabChange = value => {
    this.props.routing.push(`${this.prefix}/${value}`)
  }

  get tabs() {
    return {
      value: this.props.module,
      onChange: this.handleTabChange,
      options: [
        {
          value: 'deployments',
          label: t('Deployments'),
        },
        {
          value: 'statefulsets',
          label: t('StatefulSets'),
        },
        {
          value: 'daemonsets',
          label: t('DaemonSets'),
        },
      ],
    }
  }

  get itemActions() {
    const { module, trigger, name } = this.props
    return [
      {
        key: 'edit',
        icon: 'pen',
        text: t('Edit'),
        action: 'edit',
        onClick: item =>
          trigger('resource.baseinfo.edit', {
            detail: item,
          }),
      },
      {
        key: 'editYaml',
        icon: 'pen',
        text: t('Edit YAML'),
        action: 'edit',
        onClick: item =>
          trigger('resource.yaml.edit', {
            detail: item,
          }),
      },
      {
        key: 'redeploy',
        icon: 'restart',
        text: t('Redeploy'),
        action: 'edit',
        onClick: item =>
          trigger('workload.redeploy', {
            module,
            detail: item,
          }),
      },
      {
        key: 'delete',
        icon: 'trash',
        text: t('Delete'),
        action: 'delete',
        onClick: item =>
          trigger('workload.delete', {
            type: t(name),
            detail: item,
          }),
      },
    ]
  }

  get tableActions() {
    const { trigger, name, rowKey, tableProps } = this.props
    return {
      ...tableProps.tableActions,
      selectActions: [
        {
          key: 'delete',
          type: 'danger',
          text: t('Delete'),
          action: 'delete',
          onClick: () =>
            trigger('workload.batch.delete', {
              type: t(name),
              rowKey,
            }),
        },
      ],
    }
  }

  getStatus() {
    return WORKLOAD_STATUS.map(status => ({
      text: t(status.text),
      value: status.value,
    }))
  }

  getItemDesc = record => {
    const { status, reason } = getWorkloadStatus(record, this.props.module)
    const desc = reason ? (
      <StatusReason status={status} reason={t(reason)} data={record} />
    ) : (
      record.description || '-'
    )

    return desc
  }

  getColumns = () => {
    const { getSortOrder, getFilteredValue, module } = this.props
    return [
      {
        title: t('Name'),
        dataIndex: 'name',
        sorter: true,
        sortOrder: getSortOrder('name'),
        search: true,
        render: (name, record) => (
          <Avatar
            icon={ICON_TYPES[module]}
            iconSize={40}
            title={getDisplayName(record)}
            desc={this.getItemDesc(record)}
            to={`${this.prefix}/${module}/${name}`}
            isMultiCluster={record.isFedManaged}
          />
        ),
      },
      {
        title: t('Status'),
        dataIndex: 'status',
        filters: this.getStatus(),
        filteredValue: getFilteredValue('status'),
        isHideable: true,
        search: true,
        width: '22%',
        render: (status, record) => (
          <WorkloadStatus data={record} module={module} />
        ),
      },
      {
        title: t('Application'),
        dataIndex: 'app',
        isHideable: true,
        search: true,
        width: '22%',
      },
      {
        title: t('Created Time'),
        dataIndex: 'createTime',
        sorter: true,
        sortOrder: getSortOrder('createTime'),
        isHideable: true,
        width: 150,
        render: time => getLocalTime(time).format('YYYY-MM-DD HH:mm:ss'),
      },
    ]
  }

  showCreate = () => {
    const { match, module, projectStore } = this.props
    return this.props.trigger('workload.create', {
      module,
      projectDetail: projectStore.detail,
      namespace: match.params.namespace,
      cluster: match.params.cluster,
    })
  }

  render() {
    const { bannerProps, tableProps } = this.props
    return (
      <ListPage {...this.props}>
        <Banner {...bannerProps} tabs={this.tabs} />
        <Table
          {...tableProps}
          itemActions={this.itemActions}
          tableActions={this.tableActions}
          columns={this.getColumns()}
          onCreate={this.showCreate}
        />
      </ListPage>
    )
  }
}
