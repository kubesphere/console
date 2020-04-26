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
})
export default class Projects extends React.Component {
  get itemActions() {
    const { trigger } = this.props
    const showAction = record =>
      record.isFedManaged
        ? !record.cluster || record.cluster === 'gondor'
        : true

    return [
      {
        key: 'edit',
        icon: 'pen',
        text: t('Edit'),
        action: 'edit',
        show: showAction,
        onClick: item => trigger('resource.baseinfo.edit', { detail: item }),
      },
      {
        key: 'quotaEdit',
        icon: 'pen',
        text: t('Edit Quota'),
        action: 'edit',
        show: showAction,
        onClick: item =>
          trigger('project.qutoa.edit', {
            type: t('Project'),
            detail: item,
          }),
      },
      {
        key: 'delete',
        icon: 'trash',
        text: t('Delete'),
        action: 'delete',
        show: showAction,
        onClick: item =>
          trigger('resource.delete', {
            type: t('Project'),
            detail: item,
          }),
      },
    ]
  }

  get tips() {
    return [
      {
        title: t('PROJECT_TYPES_Q'),
        description: t('PROJECT_TYPES_A'),
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
                : `/cluster/${record.cluster || 'gondor'}/projects/${name}`
            }
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
    const { query, bannerProps, tableProps } = this.props
    return (
      <ListPage {...this.props}>
        <Banner {...bannerProps} tips={this.tips} />
        <Table
          {...tableProps}
          itemActions={this.itemActions}
          columns={this.getColumns()}
          onCreate={this.showCreate}
          searchType={'keyword'}
          cluster={query.cluster}
          getCheckboxProps={this.getCheckboxProps}
        />
      </ListPage>
    )
  }
}
