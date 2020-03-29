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

import UserStore from 'stores/user'

import { Avatar } from 'components/Base'
import Banner from 'components/Cards/Banner'
import UserStatus from 'components/UserStatus'
import Table from 'components/Tables/List'
import withList, { ListPage } from 'components/HOCs/withList'

import { getLocalTime } from 'utils'

@withList({
  store: new UserStore(),
  module: 'accounts',
  name: 'User',
  rowKey: 'username',
})
export default class Accounts extends React.Component {
  checkActionEnable(record) {
    return (
      !globals.config.presetUsers.includes(record.username) &&
      globals.user.username !== record.username
    )
  }

  get itemActions() {
    const { trigger, getData } = this.props
    return [
      {
        key: 'edit',
        icon: 'pen',
        text: t('Edit'),
        action: 'edit',
        show: this.checkActionEnable,
        onClick: item =>
          trigger('user.edit', {
            detail: item,
            success: getData,
          }),
      },
      {
        key: 'delete',
        icon: 'trash',
        text: t('Delete'),
        action: 'delete',
        show: this.checkActionEnable,
        onClick: item =>
          trigger('resource.delete', {
            type: t('User'),
            resource: item.username,
            detail: item,
            success: getData,
          }),
      },
    ]
  }

  getColumns = () => [
    {
      title: t('Name'),
      dataIndex: 'username',
      search: true,
      render: (name, record) => (
        <Avatar
          avatar={record.avatar_url || '/assets/default-user.svg'}
          title={name}
          desc={record.email}
          to={`/access/accounts/${name}`}
        />
      ),
    },
    {
      title: t('Status'),
      dataIndex: 'status',
      isHideable: true,
      width: '20%',
      render: status => <UserStatus status={status} />,
    },
    {
      title: t('Platform Role'),
      dataIndex: 'cluster_role',
      isHideable: true,
      width: '20%',
      render: role => role || '-',
    },
    {
      title: t('Last login time'),
      dataIndex: 'last_login_time',
      isHideable: true,
      width: '20%',
      render: time =>
        time
          ? getLocalTime(time).format('YYYY-MM-DD HH:mm:ss')
          : t('Not logged in yet'),
    },
  ]

  showCreate = () =>
    this.props.trigger('user.create', {
      success: this.props.getData,
    })

  render() {
    const { bannerProps, tableProps } = this.props
    return (
      <ListPage {...this.props}>
        <Banner
          {...bannerProps}
          tabs={this.tabs}
          title={t('NAV_ACCOUNTS')}
          description={t('ACCOUNTS_MANAGEMENT_DESC')}
        />
        <Table
          {...tableProps}
          itemActions={this.itemActions}
          columns={this.getColumns()}
          onCreate={this.showCreate}
          searchType={'keyword'}
        />
      </ListPage>
    )
  }
}
