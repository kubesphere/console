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
import { get } from 'lodash'
import { Link } from 'react-router-dom'
import { Avatar, Status } from 'components/Base'
import { withProjectList, ListPage } from 'components/HOCs/withList'
import Table from 'components/Tables/List'

import { getLocalTime } from 'utils'

import OpAppStore from 'stores/openpitrix/application'
import Banner from './Banner'

@withProjectList({
  store: new OpAppStore(),
  module: 'applications',
  name: 'Application',
})
export default class OPApps extends React.Component {
  type = 'template'

  get prefix() {
    const { workspace, cluster, namespace } = this.props.match.params
    return `/${workspace}/clusters/${cluster}/projects/${namespace}/applications/${
      this.type
    }`
  }

  get canCreate() {
    const { cluster, namespace } = this.props.match.params
    return (
      globals.app.enableAppStore &&
      globals.app.hasPermission({
        cluster,
        project: namespace,
        module: 'applications',
        action: 'create',
      })
    )
  }

  get itemActions() {
    const { routing, trigger } = this.props
    return [
      {
        key: 'edit',
        icon: 'pen',
        text: t('Edit'),
        action: 'edit',
        onClick: item =>
          trigger('openpitrix.app.edit', {
            detail: item,
            success: routing.query,
          }),
      },
      {
        key: 'delete',
        icon: 'trash',
        text: t('Delete'),
        action: 'delete',
        onClick: item =>
          trigger('resource.delete', {
            type: t(this.name),
            detail: item,
            success: routing.query,
          }),
      },
    ]
  }

  getColumns = () => {
    const { getSortOrder } = this.props
    return [
      {
        title: t('Name'),
        dataIndex: 'name',
        render: (name, record) => (
          <Avatar
            isApp
            to={`${this.prefix}/${record.cluster_id}`}
            avatar={get(record, 'app.icon')}
            iconLetter={name}
            iconSize={40}
            title={name}
            desc={record.description}
          />
        ),
      },
      {
        title: t('Status'),
        dataIndex: 'status',
        isHideable: true,
        width: '16%',
        render: (status, record) => (
          <Status
            name={t(record.transition_status || status)}
            type={record.transition_status || status}
          />
        ),
      },
      {
        title: t('Application'),
        dataIndex: 'app.name',
        isHideable: true,
        width: '16%',
        render: (name, record) => (
          <Link to={`/apps/${get(record, 'version.app_id')}`}>{name}</Link>
        ),
      },
      {
        title: t('Version'),
        dataIndex: 'version.name',
        isHideable: true,
        width: '16%',
      },
      {
        title: t('Last Updated Time'),
        dataIndex: 'status_time',
        sorter: true,
        sortOrder: getSortOrder('status_time'),
        isHideable: true,
        width: 180,
        render: (time, record) =>
          getLocalTime(record.update_time || record.status_time).format(
            'YYYY-MM-DD HH:mm:ss'
          ),
      },
    ]
  }

  showDeploy = () => {
    const { match, module, projectStore, trigger } = this.props
    return this.props.trigger('app.deploy', {
      module,
      namespace: match.params.namespace,
      cluster: match.params.cluster,
      workspace: get(projectStore, 'detail.workspace'),
      runtime_id: get(projectStore, 'detail.opRuntime'),
      routing: this.props.rootStore.routing,
      trigger,
    })
  }

  getTableProps() {
    const { tableProps } = this.props
    const actions = this.canCreate
      ? [
          {
            key: 'deploy',
            type: 'control',
            text: t('Deploy New Application'),
            onClick: this.showDeploy,
          },
        ]
      : []

    return {
      tableActions: {
        ...tableProps.tableActions,
        actions,
        onCreate: null,
        selectActions: [],
      },
      emptyProps: {
        desc: t('APP_DEPLOYMENT_DESC'),
      },
      searchType: 'keyword',
    }
  }

  render() {
    const { bannerProps, tableProps, match } = this.props
    return (
      <ListPage {...this.props}>
        <Banner {...bannerProps} match={match} type={this.type} />
        <Table
          {...tableProps}
          {...this.getTableProps()}
          itemActions={this.itemActions}
          columns={this.getColumns()}
        />
      </ListPage>
    )
  }
}
