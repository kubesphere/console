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
import { toJS } from 'mobx'
import { Avatar, Status } from 'components/Base'
import Banner from 'components/Cards/Banner'
import withList, { ListPage } from 'components/HOCs/withList'
import Table from 'components/Tables/List'

import { getLocalTime } from 'utils'

import UserStore from 'stores/user'
import RoleStore from 'stores/role'

@withList({
  store: new UserStore(),
  module: 'users',
  authKey: 'members',
  name: 'DevOps Member',
  rowKey: 'username',
  injectStores: ['rootStore', 'devopsStore'],
})
export default class Members extends React.Component {
  roleStore = new RoleStore()

  componentDidMount() {
    this.roleStore.fetchList({
      devops: this.devopsName,
      cluster: this.cluster,
      limit: -1,
    })
  }

  getData = () => {
    this.props.store.fetchList({
      devops: this.devopsName,
      cluster: this.cluster,
    })
  }

  get cluster() {
    return this.props.match.params.cluster
  }

  get devopsName() {
    return this.props.devopsStore.project_name
  }

  get workspace() {
    return get(
      this.props.devopsStore,
      'itemDetail.metadata.labels["kubesphere.io/workspace"]'
    )
  }

  get tips() {
    return [
      {
        title: t('HOW_TO_INVITE_MEMBER_Q'),
        description: t('HOW_TO_INVITE_MEMBER_A'),
      },
    ]
  }

  showAction(record) {
    return globals.user.username !== record.name
  }

  get itemActions() {
    const { trigger } = this.props
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
            devops: this.devopsName,
            roles: toJS(this.roleStore.list.data),
            role: item.role,
            success: this.getData,
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
            devops: this.devopsName,
            success: this.getData,
            ...this.props.match.params,
          }),
      },
    ]
  }

  get tableActions() {
    const { trigger, tableProps } = this.props

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
              devops: this.devopsName,
              namespace: this.workspace,
              workspace: this.workspace,
              cluster: this.cluster,
              roles: toJS(this.roleStore.list.data),
              roleModule: this.roleStore.module,
              title: t('Invite members to the project'),
              desc: t('INVITE_MEMBER_DESC'),
              searchPlaceholder: t('INVITE_MEMBER_SEARCH_PLACEHODLER'),
              success: this.getData,
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
              success: this.getData,
              devops: this.devopsName,
              ...this.props.match.params,
            }),
        },
      ],
      getCheckboxProps: record => ({
        disabled: !this.showAction(record),
        name: record.name,
      }),
      emptyProps: {
        desc: t('INVITE_MEMBER_DESC_DEVOPS'),
      },
    }
  }

  getColumns = () => [
    {
      title: t('Member Name'),
      dataIndex: 'username',
      sorter: true,
      search: true,
      render: (name, record) => (
        <Avatar
          avatar={record.avatar_url || '/assets/default-user.svg'}
          title={name}
          desc={record.email || '-'}
          noLink
        />
      ),
    },
    {
      title: t('Status'),
      dataIndex: 'status',
      isHideable: true,
      width: '19%',
      render: status => (
        <Status
          type={status}
          name={status ? t(`USER_${status.toUpperCase()}`) : ''}
        />
      ),
    },
    {
      title: t('Role'),
      dataIndex: 'role',
      isHideable: true,
      width: '19%',
    },
    {
      title: t('Last Login Time'),
      dataIndex: 'last_login_time',
      isHideable: true,
      width: 150,
      render: login_time => (
        <p>
          {login_time
            ? getLocalTime(login_time).format('YYYY-MM-DD HH:mm:ss')
            : t('Not logged in yet')}
        </p>
      ),
    },
  ]

  render() {
    const { bannerProps, tableProps } = this.props
    return (
      <ListPage {...this.props} getData={this.getData} noWatch>
        <Banner
          {...bannerProps}
          tabs={this.tabs}
          description={t('DEVOPS_PROJECT_MEM_DESC')}
        />
        <Table
          {...tableProps}
          searchType="name"
          tableActions={this.tableActions}
          itemActions={this.itemActions}
          columns={this.getColumns()}
        />
      </ListPage>
    )
  }
}
