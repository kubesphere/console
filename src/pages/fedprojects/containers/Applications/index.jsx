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

import { Status, Avatar } from 'components/Base'
import { withProjectList, ListPage } from 'components/HOCs/withList'
import Table from 'components/Tables/List'
import Banner from 'components/Cards/Banner'

import ClusterWrapper from 'components/Clusters/ClusterWrapper'

import { getLocalTime, getDisplayName } from 'utils'

import FederatedStore from 'stores/federated'
import AppStore from 'stores/application/crd'

@withProjectList({
  store: new FederatedStore(new AppStore()),
  module: 'applications',
  name: 'Application',
})
export default class CRDApps extends React.Component {
  get tips() {
    return [
      {
        title: t('HOW_TO_USE_APPLICATION_GOVE_Q'),
        description: t('HOW_TO_USE_APPLICATION_GOVE_A'),
        closable: false,
      },
    ]
  }

  get canCreate() {
    const { cluster, namespace: project } = this.props.match.params
    const canCreateDeployment = globals.app
      .getActions({
        cluster,
        project,
        module: 'deployments',
      })
      .includes('create')

    const canCreateService = globals.app
      .getActions({
        cluster,
        project,
        module: 'services',
      })
      .includes('create')

    return canCreateDeployment && canCreateService
  }

  getColumns = () => {
    return [
      {
        title: t('Name'),
        dataIndex: 'name',
        render: (name, record) => (
          <Avatar
            title={getDisplayName(record)}
            avatar={record.icon || '/assets/default-app.svg'}
            to={record.deletionTime ? null : `${this.props.match.url}/${name}`}
            desc={get(record, 'annotations["kubesphere.io/description"]', '-')}
          />
        ),
      },
      {
        title: t('Status'),
        dataIndex: 'status',
        isHideable: true,
        width: '20%',
        render: (status, record) =>
          status === 'Deleting' ? (
            <Status type={status} name={t(status)} flicker />
          ) : (
            <ClusterWrapper
              clusters={record.clusters}
              clustersDetail={this.props.projectStore.detail.clusters}
            >
              {cluster => this.renderStatus({ cluster, record })}
            </ClusterWrapper>
          ),
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
        isHideable: true,
        width: 180,
        render: time => getLocalTime(time).format('YYYY-MM-DD HH:mm:ss'),
      },
    ]
  }

  renderStatus({ cluster, record }) {
    const data = get(record, `resources[${cluster.name}]`)

    if (!data) {
      return t('waiting')
    }

    return <Status name={t(data.status)} type={data.status} />
  }

  showCreate = () => {
    const { match, module, getData, projectStore } = this.props
    return this.props.trigger('crd.app.create', {
      module,
      isFederated: true,
      namespace: match.params.namespace,
      projectDetail: projectStore.detail,
      success: getData,
    })
  }

  get tableActions() {
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
      ...tableProps.tableActions,
      actions,
      onCreate: null,
      selectActions: [],
    }
  }

  getTableProps() {
    return {
      tableActions: this.tableActions,
      emptyProps: {
        title: t('Composing Apps'),
        desc: t('COMPOSING_APP_DESC'),
      },
      searchType: 'name',
    }
  }

  render() {
    const { bannerProps, tableProps } = this.props
    return (
      <ListPage {...this.props} isFederated>
        <Banner
          {...bannerProps}
          tips={this.tips}
          description={t('APPLICATIONS_DESC')}
        />
        <Table
          {...tableProps}
          {...this.getTableProps()}
          columns={this.getColumns()}
        />
      </ListPage>
    )
  }
}
