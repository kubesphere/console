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

import ResourceTable from 'clusters/components/ResourceTable'

import { Avatar } from 'components/Base'
import Banner from 'components/Cards/Banner'
import { ListPage, withClusterList } from 'components/HOCs/withList'
import JobStatus from 'projects/components/JobStatus'
import StatusReason from 'projects/components/StatusReason'
import React from 'react'
import { Link } from 'react-router-dom'

import WorkloadStore from 'stores/workload'

import { getDisplayName, getLocalTime, showNameAndAlias } from 'utils'
import { ICON_TYPES, JOB_STATUS } from 'utils/constants'
import { getWorkloadStatus } from 'utils/status'

@withClusterList({
  store: new WorkloadStore('jobs'),
  module: 'jobs',
  name: 'JOB',
  rowKey: 'uid',
})
export default class Jobs extends React.Component {
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
          label: t('JOB_PL'),
        },
        {
          value: 'cronjobs',
          label: t('CRONJOB_PL'),
        },
      ],
    }
  }

  get itemActions() {
    const { trigger, name, store } = this.props
    return [
      {
        key: 'edit',
        icon: 'pen',
        text: t('EDIT_INFORMATION'),
        action: 'edit',
        onClick: item =>
          trigger('resource.baseinfo.edit', {
            detail: item,
          }),
      },
      {
        key: 'rerun',
        icon: 'refresh',
        text: t('RERUN'),
        action: 'edit',
        onClick: item => store.rerun(item),
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

  getStatus() {
    return JOB_STATUS.map(status => ({
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
        title: t('NAME'),
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
            isMultiCluster={record.isFedManaged}
            to={`/clusters/${cluster}/projects/${record.namespace}/${module}/${name}`}
          />
        ),
      },
      {
        title: t('STATUS'),
        dataIndex: 'status',
        filters: this.getStatus(),
        filteredValue: getFilteredValue('status'),
        isHideable: true,
        search: true,
        width: '20%',
        render: (status, record) => <JobStatus data={record} module={module} />,
      },
      {
        title: t('PROJECT'),
        dataIndex: 'namespace',
        isHideable: true,
        width: '18%',
        render: namespace => (
          <Link to={`/clusters/${cluster}/projects/${namespace}`}>
            {showNameAndAlias(namespace, 'project')}
          </Link>
        ),
      },
      {
        title: t('LAST_RUN_TIME'),
        dataIndex: 'updateTime',
        sorter: true,
        sortOrder: getSortOrder('updateTime'),
        isHideable: true,
        width: '20%',
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
