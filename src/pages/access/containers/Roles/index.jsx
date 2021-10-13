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
import { toJS } from 'mobx'

import { Avatar } from 'components/Base'
import Banner from 'components/Cards/Banner'
import Table from 'components/Tables/List'
import withList, { ListPage } from 'components/HOCs/withList'

import { getLocalTime } from 'utils'
import { ICON_TYPES } from 'utils/constants'

import RoleStore from 'stores/role'

@withList({
  store: new RoleStore('globalroles'),
  module: 'globalroles',
  authKey: 'roles',
  name: 'PLATFORM_ROLE',
})
export default class Roles extends React.Component {
  componentDidMount() {
    this.props.store.fetchRoleTemplates(this.props.match.params)
  }

  showAction = record => !globals.config.presetGlobalRoles.includes(record.name)

  get itemActions() {
    const { trigger, store, name, module, routing } = this.props
    return [
      {
        key: 'edit',
        icon: 'pen',
        text: t('EDIT_INFORMATION'),
        action: 'edit',
        show: this.showAction,
        onClick: item =>
          trigger('resource.baseinfo.edit', {
            detail: item,
            success: routing.query,
          }),
      },
      {
        key: 'editRole',
        icon: 'pen',
        text: t('EDIT_PERMISSIONS'),
        action: 'edit',
        show: this.showAction,
        onClick: item =>
          trigger('role.edit', {
            module,
            detail: item,
            roleTemplates: toJS(store.roleTemplates.data),
            success: routing.query,
          }),
      },
      {
        key: 'delete',
        icon: 'trash',
        text: t('DELETE'),
        action: 'delete',
        show: this.showAction,
        onClick: item =>
          trigger('role.delete', {
            detail: item,
            type: name,
            success: routing.query,
          }),
      },
    ]
  }

  get tableActions() {
    const { tableProps } = this.props
    return {
      ...tableProps.tableActions,
      onCreate: this.showCreate,
      selectActions: [],
    }
  }

  getColumns = () => {
    const { getSortOrder, module } = this.props
    return [
      {
        title: t('NAME'),
        dataIndex: 'name',
        width: '25%',
        render: (name, record) => (
          <Avatar
            icon={ICON_TYPES[module]}
            to={`/access/roles/${name}`}
            title={name}
            desc={record.aliasName}
          />
        ),
      },
      {
        title: t('DESCRIPTION'),
        key: 'description',
        dataIndex: 'description',
        isHideable: true,
        width: '55%',
      },
      {
        title: t('CREATION_TIME_TCAP'),
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
    const { store, trigger, getData } = this.props
    return trigger('role.create', {
      title: t('CREATE_PLATFORM_ROLE'),
      roleTemplates: toJS(store.roleTemplates.data),
      success: getData,
    })
  }

  render() {
    const { bannerProps, tableProps } = this.props
    return (
      <ListPage {...this.props} noWatch>
        <Banner {...bannerProps} tabs={this.tabs} />
        <Table
          {...tableProps}
          tableActions={this.tableActions}
          itemActions={this.itemActions}
          columns={this.getColumns()}
          searchType="name"
        />
      </ListPage>
    )
  }
}
