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

import { Avatar, Status, Text } from 'components/Base'
import Banner from 'components/Cards/Banner'
import { withProjectList, ListPage } from 'components/HOCs/withList'
import Table from 'components/Tables/List'

import { getLocalTime, getDisplayName } from 'utils'
import { ICON_TYPES } from 'utils/constants'

import FederatedStore from 'stores/federated'
import ServiceStore from 'stores/service'

@withProjectList({
  store: new FederatedStore(new ServiceStore()),
  module: 'services',
  name: 'Service',
})
export default class Services extends React.Component {
  get tips() {
    return [
      {
        title: t('SERVICE_TYPES_Q'),
        description: t('SERVICE_TYPES_A'),
      },
      {
        title: t('SCENARIOS_FOR_SERVICES_Q'),
        description: t('SCENARIOS_FOR_SERVICES_A'),
      },
    ]
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
        key: 'delete',
        icon: 'trash',
        text: t('Delete'),
        action: 'delete',
        onClick: item =>
          trigger('service.delete', {
            type: t(name),
            detail: item,
            isFederated: true,
          }),
      },
    ]
  }

  get tableActions() {
    const { tableProps, name, trigger } = this.props
    return {
      ...tableProps.tableActions,
      selectActions: [
        {
          key: 'delete',
          type: 'danger',
          text: t('Delete'),
          action: 'delete',
          onClick: () =>
            trigger('service.batch.delete', {
              type: t(name),
              rowKey: 'name',
              isFederated: true,
            }),
        },
      ],
    }
  }

  getColumns = () => {
    const { module } = this.props
    return [
      {
        title: t('Name'),
        dataIndex: 'name',
        render: (name, record) => (
          <Avatar
            icon={ICON_TYPES[module]}
            iconSize={40}
            title={getDisplayName(record)}
            desc={record.description || '-'}
            isMultiCluster={true}
            to={record.deletionTime ? null : `${this.props.match.url}/${name}`}
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
        title: t('Service Type'),
        dataIndex: 'annotations["kubesphere.io/serviceType"]',
        isHideable: true,
        render: (serviceType, record) => (
          <Text
            title={
              serviceType
                ? t(`SERVICE_TYPE_${serviceType.toUpperCase()}`)
                : t('Custom Creation')
            }
            description={record.type || '-'}
          />
        ),
      },
      {
        title: t('Application'),
        dataIndex: 'app',
        isHideable: true,
        width: '22%',
      },
      {
        title: t('Created Time'),
        dataIndex: 'createTime',
        isHideable: true,
        width: 150,
        render: time => getLocalTime(time).format('YYYY-MM-DD HH:mm:ss'),
      },
    ]
  }

  showCreate = () => {
    const { match, module, projectStore } = this.props
    return this.props.trigger('service.create', {
      module,
      isFederated: true,
      projectDetail: projectStore.detail,
      namespace: match.params.namespace,
    })
  }

  render() {
    const { bannerProps, tableProps } = this.props
    return (
      <ListPage {...this.props} isFederated>
        <Banner {...bannerProps} tips={this.tips} />
        <Table
          {...tableProps}
          itemActions={this.itemActions}
          tableActions={this.tableActions}
          columns={this.getColumns()}
          onCreate={this.showCreate}
          searchType="name"
        />
      </ListPage>
    )
  }
}
