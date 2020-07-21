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
import UserStore from 'stores/user'
import RoleStore from 'stores/role'

import { Avatar, Status } from 'components/Base'
import Banner from 'components/Cards/Banner'
import Table from 'components/Tables/List'
import withList, { ListPage } from 'components/HOCs/withList'

import { getLocalTime } from 'utils'

@withList({
  store: new UserStore(),
  module: 'users',
  authKey: 'members',
  name: 'Member',
})
export default class Accounts extends React.Component {
  roleStore = new RoleStore('workspaceroles')

  get canViewRoles() {
    const { workspace } = this.props.match.params
    return globals.app.hasPermission({
      workspace,
      module: 'roles',
      action: 'view',
    })
  }

  componentDidMount() {
    this.canViewRoles &&
      this.roleStore.fetchList({ ...this.props.match.params, limit: -1 })
  }

  showAction(record) {
    return globals.user.username !== record.name
  }

  get itemActions() {
    const { trigger, getData } = this.props

    return [
      {
        key: 'modify',
        icon: 'pen',
        text: t('Modify Member Role'),
        action: 'edit',
        show: this.showAction,
        onClick: item =>
          trigger('member.edit', {
            detail: item,
            ...this.props.match.params,
            roles: toJS(this.roleStore.list.data),
            role: item.workspacerole,
            success: getData,
          }),
      },
      {
        key: 'delete',
        icon: 'trash',
        text: t('Remove Member'),
        action: 'delete',
        show: this.showAction,
        onClick: item =>
          trigger('member.remove', {
            detail: item,
            success: getData,
            ...this.props.match.params,
          }),
      },
    ]
  }

  get tableActions() {
    const { tableProps, routing, getData, trigger } = this.props
    return {
      ...tableProps.tableActions,
      actions: [
        {
          key: 'invite',
          type: 'control',
          text: t('Invite Member'),
          action: 'create',
          onClick: () =>
            trigger('member.invite', {
              ...this.props.match.params,
              roleModule: this.roleStore.module,
              roles: toJS(this.roleStore.list.data),
              title: t('Invite members to the workspace'),
              desc: t('INVITE_WORKSPACE_MEMBER_DESC'),
              searchPlaceholder: t(
                'INVITE_WORKSPACE_MEMBER_SEARCH_PLACEHODLER'
              ),
              success: routing.query,
            }),
        },
      ],
      selectActions: [
        {
          key: 'delete',
          type: 'danger',
          text: t('Remove Members'),
          action: 'delete',
          onClick: () =>
            trigger('member.remove.batch', {
              ...this.props.match.params,
              success: getData,
            }),
        },
      ],
      getCheckboxProps: record => ({
        disabled: !this.showAction(record),
        name: record.name,
      }),
      emptyProps: {
        desc: t('INVITE_WORKSPACE_MEMBER_DESC'),
      },
    }
  }

  getColumns = () => {
    const { prefix } = this.props
    return [
      {
        title: t('Member Name'),
        dataIndex: 'username',
        width: '40%',
        render: (name, record) => (
          <Avatar
            to={`${prefix}/${name}`}
            avatar={record.avatar_url || '/assets/default-user.svg'}
            title={name}
            desc={record.email}
          />
        ),
      },
      {
        title: t('Status'),
        dataIndex: 'status',
        isHideable: true,
        width: '19%',
        render: status => (
          <Status type={status} name={t(`USER_${status.toUpperCase()}`)} />
        ),
      },
      {
        title: t('Role'),
        dataIndex: 'workspacerole',
        isHideable: true,
        width: '19%',
      },
      {
        title: t('Last Login Time'),
        dataIndex: 'last_login_time',
        isHideable: true,
        width: '19%',
        render: login_time => (
          <p>
            {login_time
              ? getLocalTime(login_time).format('YYYY-MM-DD HH:mm:ss')
              : t('Not logged in yet')}
          </p>
        ),
      },
    ]
  }

  render() {
    const { bannerProps, tableProps } = this.props
    return (
      <ListPage {...this.props} noWatch>
        <Banner
          {...bannerProps}
          tabs={this.tabs}
          title={t('Workspace Members')}
          description={t('WORKSPACE_MEMBER_DESC')}
        />
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
