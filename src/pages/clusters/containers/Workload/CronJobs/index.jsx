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
import { Link } from 'react-router-dom'

import { Avatar, Status } from 'components/Base'
import Banner from 'components/Cards/Banner'
import { withClusterList, ListPage } from 'components/HOCs/withList'
import StatusReason from 'projects/components/StatusReason'
import ResourceTable from 'clusters/components/ResourceTable'

import { getLocalTime, getDisplayName } from 'utils'
import { getWorkloadStatus } from 'utils/status'
import { CRONJOB_STATUS, ICON_TYPES } from 'utils/constants'

import WorkloadStore from 'stores/workload'

@withClusterList({
  store: new WorkloadStore('cronjobs'),
  module: 'cronjobs',
  name: 'CronJob',
  rowKey: 'uid',
})
export default class CronJobs extends React.Component {
  handleTabChange = value => {
    const { cluster } = this.props.match.params
    this.props.routing.push(`/clusters/${cluster}/${value}`)
  }

  get tabs() {
    return {
      value: this.props.module,
      onChange: this.handleTabChange,
      options: [
        {
          value: 'jobs',
          label: t('Jobs'),
        },
        {
          value: 'cronjobs',
          label: t('CronJobs'),
        },
      ],
    }
  }

  get itemActions() {
    const { trigger, name } = this.props
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
        show: record => record.suspend,
        key: 'start',
        icon: 'start',
        text: t('Start'),
        action: 'edit',
        onClick: this.handleSwitch(true),
      },
      {
        show: record => !record.suspend,
        key: 'pause',
        icon: 'stop',
        text: t('Pause'),
        action: 'edit',
        onClick: this.handleSwitch(false),
      },
      {
        key: 'delete',
        icon: 'trash',
        text: t('Delete'),
        action: 'delete',
        onClick: item =>
          trigger('resource.delete', {
            type: t(name),
            detail: item,
          }),
      },
    ]
  }

  handleSwitch = params => item => {
    this.props.store.switch(item, params).then(() => {
      this.props.routing.query()
    })
  }

  getStatus() {
    return CRONJOB_STATUS.map(status => ({
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
    const { cluster } = this.props.match.params
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
            to={`/clusters/${cluster}/projects/${record.namespace}/${module}/${name}`}
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
        width: '15%',
        render: (_, record) => {
          const { status } = getWorkloadStatus(record, module)
          return <Status type={status} name={t(status)} />
        },
      },
      {
        title: t('Project'),
        dataIndex: 'namespace',
        isHideable: true,
        width: '18%',
        render: namespace => (
          <Link to={`/clusters/${cluster}/projects/${namespace}`}>
            {namespace}
          </Link>
        ),
      },
      {
        title: t('Schedule'),
        dataIndex: 'spec.schedule',
        isHideable: true,
        width: '15%',
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
    const { query, match, module } = this.props
    return this.props.trigger('workload.create', {
      module,
      namespace: query.namespace,
      cluster: match.params.cluster,
    })
  }

  render() {
    const { match, bannerProps, tableProps } = this.props
    return (
      <ListPage {...this.props}>
        <Banner {...bannerProps} tabs={this.tabs} />
        <ResourceTable
          {...tableProps}
          itemActions={this.itemActions}
          columns={this.getColumns()}
          onCreate={this.showCreate}
          cluster={match.params.cluster}
        />
      </ListPage>
    )
  }
}
