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

import { get } from 'lodash'
import React from 'react'
import { toJS } from 'mobx'

import RoleStore from 'stores/role'
import { Avatar } from 'components/Base'
import Banner from 'components/Cards/Banner'
import Table from 'components/Tables/List'
import withList, { ListPage } from 'components/HOCs/withList'

import { getLocalTime } from 'utils'
import { ICON_TYPES } from 'utils/constants'

@withList({
  store: new RoleStore('clusterroles'),
  module: 'clusterroles',
  authKey: 'roles',
  name: 'Cluster Role',
})
export default class Roles extends React.Component {
  componentDidMount() {
    this.props.store.fetchRulesInfo()
  }

  get module() {
    return 'clusterroles'
  }

  get authKey() {
    return 'roles'
  }

  get name() {
    return 'Cluster Role'
  }

  get itemActions() {
    const { trigger, store, module, getData } = this.props
    return [
      {
        key: 'edit',
        icon: 'pen',
        text: t('Edit'),
        action: 'edit',
        show: record =>
          !globals.config.presetClusterRoles.includes(record.name),
        onClick: item =>
          trigger('role.edit', {
            module,
            detail: item,
            title: t('Edit Platform Role'),
            rulesInfo: toJS(store.rulesInfo),
            success: getData,
          }),
      },
      {
        key: 'delete',
        icon: 'trash',
        text: t('Delete'),
        action: 'delete',
        show: record =>
          !globals.config.presetClusterRoles.includes(record.name),
        onClick: item =>
          trigger('role.delete', {
            detail: item,
            success: getData,
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
        search: true,
        width: '25%',
        render: name => (
          <Avatar
            icon={ICON_TYPES[this.module]}
            to={`/access/roles/${name}`}
            title={name}
          />
        ),
      },
      {
        title: t('Description'),
        key: 'description',
        dataIndex: 'description',
        isHideable: true,
        width: '55%',
        render: (description, record) => {
          const name = get(record, 'name')
          if (description && globals.config.presetClusterRoles.includes(name)) {
            return t(description)
          }
          return description
        },
      },
      {
        title: t('Created Time'),
        dataIndex: 'createTime',
        sorter: true,
        sortOrder: getSortOrder('createTime'),
        isHideable: true,
        width: '19%',
        render: time => getLocalTime(time).format('YYYY-MM-DD HH:mm:ss'),
      },
    ]
  }

  showCreate = () => {
    const { module, store, trigger, getData } = this.props
    return trigger('role.create', {
      module,
      title: t('Create Platform Role'),
      rulesInfo: toJS(store.rulesInfo),
      success: getData,
    })
  }

  render() {
    const { bannerProps, tableProps } = this.props
    return (
      <ListPage {...this.props} noWatch>
        <Banner
          {...bannerProps}
          tabs={this.tabs}
          title={t('Platform Roles')}
          description={t('PLATFORM_ROLES_DESC')}
        />
        <Table
          {...tableProps}
          itemActions={this.itemActions}
          columns={this.getColumns()}
          onCreate={this.showCreate}
        />
      </ListPage>
    )
  }
}
