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

import { getLocalTime, getDisplayName } from 'utils'
import { ICON_TYPES } from 'utils/constants'

import RoleStore from 'stores/role'

@withList({
  store: new RoleStore('workspaceroles'),
  module: 'workspaceroles',
  authKey: 'roles',
  name: 'WORKSPACE_ROLE',
})
export default class Roles extends React.Component {
  componentDidMount() {
    this.props.store.fetchRoleTemplates(this.props.match.params)
  }

  get workspace() {
    return this.props.match.params.workspace
  }

  showAction = record =>
    !globals.config.presetWorkspaceRoles.includes(
      record.name.slice(this.workspace.length + 1)
    )

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
            workspace: this.props.match.params.workspace,
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
    const { getSortOrder } = this.props
    const { workspace } = this.props.match.params
    return [
      {
        title: t('NAME'),
        dataIndex: 'name',
        width: '25%',
        render: (name, record) => (
          <Avatar
            icon={ICON_TYPES[this.module]}
            to={`/workspaces/${workspace}/roles/${name}`}
            title={getDisplayName(record)}
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
    const { match, store, trigger, getData } = this.props
    return trigger('role.create', {
      title: t('CREATE_WORKSPACE_ROLE'),
      roleTemplates: toJS(store.roleTemplates.data),
      workspace: match.params.workspace,
      success: getData,
    })
  }

  get emptyProps() {
    return {
      desc: t('WORKSPACE_ROLE_EMPTY_DESC'),
    }
  }

  render() {
    const { bannerProps, tableProps } = this.props
    return (
      <ListPage {...this.props} noWatch>
        <Banner
          {...bannerProps}
          tabs={this.tabs}
          title={t('WORKSPACE_ROLE_PL')}
        />
        <Table
          {...tableProps}
          emptyProps={this.emptyProps}
          tableActions={this.tableActions}
          itemActions={this.itemActions}
          columns={this.getColumns()}
          searchType="name"
        />
      </ListPage>
    )
  }
}
