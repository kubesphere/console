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

import { Status } from 'components/Base'
import Avatar from 'apps/components/Avatar'
import { withProjectList, ListPage } from 'components/HOCs/withList'
import Table from 'components/Tables/List'

import { getLocalTime, getDisplayName } from 'utils'

import CRDAppStore from 'stores/application/crd'
import Banner from './Banner'

@withProjectList({
  store: new CRDAppStore(),
  module: 'applications',
  name: 'Application',
})
export default class CRDApps extends React.Component {
  type = 'composing'

  get canCreate() {
    const { workspace, cluster, namespace: project } = this.props.match.params
    const canCreateDeployment = globals.app
      .getActions({
        workspace,
        cluster,
        project,
        module: 'deployments',
      })
      .includes('create')

    const canCreateService = globals.app
      .getActions({
        workspace,
        cluster,
        project,
        module: 'services',
      })
      .includes('create')

    return canCreateDeployment && canCreateService
  }

  getColumns = () => {
    const { getSortOrder } = this.props
    return [
      {
        title: t('Name'),
        dataIndex: 'name',
        sorter: true,
        sortOrder: getSortOrder('name'),
        search: true,
        render: (name, record) => (
          <Avatar
            title={getDisplayName(record)}
            avatar={record.icon || '/assets/default-app.svg'}
            to={`${this.props.match.url}/${name}`}
            desc={get(record, 'annotations["kubesphere.io/description"]', '-')}
          />
        ),
      },
      {
        title: t('Status'),
        dataIndex: 'status',
        isHideable: true,
        width: '20%',
        render: status => <Status name={t(status)} type={status} flicker />,
      },
      {
        title: t('Version'),
        dataIndex: 'version',
        isHideable: true,
        width: '20%',
      },
      {
        title: t('Created Time'),
        dataIndex: 'createTime',
        sorter: true,
        sortOrder: getSortOrder('createTime'),
        isHideable: true,
        width: 180,
        render: time => getLocalTime(time).format('YYYY-MM-DD HH:mm:ss'),
      },
    ]
  }

  showCreate = () => {
    const { match, module, projectStore, getData } = this.props
    return this.props.trigger('crd.app.create', {
      module,
      ...match.params,
      projectDetail: projectStore.detail,
      success: getData,
    })
  }

  getTableProps() {
    const { tableProps } = this.props
    const actions = this.canCreate
      ? [
          {
            key: 'create',
            type: 'control',
            text: t('Create Composing Application'),
            onClick: this.showCreate,
          },
        ]
      : []
    return {
      tableActions: {
        ...tableProps.tableActions,
        actions,
        onCreate: null,
      },
      emptyProps: {
        title: t('Composing Apps'),
        desc: t('COMPOSING_APP_DESC'),
      },
      searchType: 'name',
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
          columns={this.getColumns()}
        />
      </ListPage>
    )
  }
}
