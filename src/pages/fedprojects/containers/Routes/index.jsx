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
import { Avatar, Status } from 'components/Base'
import Banner from 'components/Cards/Banner'
import Table from 'components/Tables/List'
import { withProjectList, ListPage } from 'components/HOCs/withList'

import { getLocalTime, getDisplayName, getDocsUrl } from 'utils'
import { ICON_TYPES } from 'utils/constants'

import FederatedStore from 'stores/federated'
import IngressStore from 'stores/ingress'

@withProjectList({
  store: new FederatedStore(new IngressStore()),
  module: 'ingresses',
  name: 'ROUTE',
})
export default class Routers extends React.Component {
  get tips() {
    return [
      {
        title: t('PREREQUESTS_FOR_USE_ROUTE_Q'),
        description: t('PREREQUESTS_FOR_USE_ROUTE_A'),
        more: getDocsUrl('internet'),
      },
      {
        title: t('ACCESS_TYPES_OF_ROUTE_Q'),
        description: t('ACCESS_TYPES_OF_ROUTE_A'),
      },
    ]
  }

  get itemActions() {
    const { trigger, name } = this.props
    return [
      {
        key: 'edit',
        icon: 'pen',
        text: t('EDIT_INFORMATION'),
        action: 'edit',
        onClick: item => {
          trigger('resource.baseinfo.edit', {
            detail: item,
          })
        },
      },
      {
        key: 'editYaml',
        icon: 'pen',
        text: t('EDIT_YAML'),
        action: 'edit',
        onClick: item =>
          trigger('resource.yaml.edit', {
            detail: item,
          }),
      },
      {
        key: 'editRules',
        icon: 'firewall',
        text: t('EDIT_ROUTING_RULES'),
        action: 'edit',
        onClick: async item => {
          const detail = await this.props.store.fetchDetail(item)
          trigger('fedproject.router.rules.edit', {
            isFederated: true,
            detail,
            projectDetail: this.props.projectStore.detail,
          })
        },
      },
      {
        key: 'editAnnotations',
        icon: 'firewall',
        text: t('EDIT_ANNOTATIONS'),
        action: 'edit',
        onClick: async item => {
          const detail = await this.props.store.fetchDetail(item)
          trigger('router.annotations.edit', {
            detail,
          })
        },
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

  getColumns = () => {
    const { module, getSortOrder } = this.props
    return [
      {
        title: t('NAME'),
        dataIndex: 'name',
        sorter: true,
        sortOrder: getSortOrder('name'),
        render: (name, record) => (
          <Avatar
            icon={ICON_TYPES[module]}
            iconSize={40}
            title={getDisplayName(record)}
            desc={record.description || '-'}
            to={record.deletionTime ? null : `${this.props.match.url}/${name}`}
            isMultiCluster={true}
          />
        ),
      },
      {
        title: t('STATUS'),
        dataIndex: 'status',
        isHideable: true,
        width: '22%',
        render: status => <Status type={status} name={t(status)} flicker />,
      },
      {
        title: t('APP'),
        dataIndex: 'app',
        isHideable: true,
        width: '22%',
      },
      {
        title: t('CREATION_TIME_TCAP'),
        dataIndex: 'createTime',
        isHideable: true,
        width: 150,
        render: time => getLocalTime(time).format('YYYY-MM-DD HH:mm:ss'),
      },
    ]
  }

  showCreate = () => {
    const { match, module, projectStore } = this.props
    return this.props.trigger('router.create', {
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
          columns={this.getColumns()}
          onCreate={this.showCreate}
          searchType="name"
        />
      </ListPage>
    )
  }
}
