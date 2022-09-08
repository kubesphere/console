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
import { Notify } from '@kube-design/components'
import { Avatar, Status } from 'components/Base'
import Banner from 'components/Cards/Banner'
import Table from 'components/Tables/List'
import withList, { ListPage } from 'components/HOCs/withList'
import { get } from 'lodash'
import { getLocalTime } from 'utils'

@withList({
  store: new UserStore(),
  module: 'users',
  name: 'USER',
})
export default class Accounts extends React.Component {
  showAction(record) {
    return (
      !globals.config.presetUsers.includes(record.name) &&
      globals.user.username !== record.name
    )
  }

  handleStatus = async item => {
    const { routing, store } = this.props

    await store.handlechangeStatus(item)

    Notify.success({ content: t('UPDATE_SUCCESSFUL') })
    routing.query()
  }

  handleBatchOperation = async type => {
    const { store, routing } = this.props

    await store.batchChangeStatus(type)

    Notify.success({ content: t('UPDATE_SUCCESSFUL') })
    routing.query()
  }

  get itemActions() {
    const { name, trigger, getData, routing } = this.props

    return [
      {
        key: 'edit',
        icon: 'pen',
        text: t('EDIT'),
        action: 'edit',
        show: this.showAction,
        onClick: item =>
          trigger('user.edit', {
            detail: item,
            success: getData,
          }),
      },
      {
        key: 'status',
        icon: item => (item.status === 'Active' ? 'stop' : 'start'),
        text: item => (item.status === 'Active' ? t('DISABLE') : t('ENABLE')),
        action: 'edit',
        show: this.showAction,
        onClick: this.handleStatus,
      },
      {
        key: 'delete',
        icon: 'trash',
        text: t('DELETE'),
        action: 'delete',
        show: this.showAction,
        onClick: item =>
          trigger('resource.delete', {
            type: name,
            resource: item.username,
            detail: item,
            success: routing.query,
          }),
      },
    ]
  }

  handledisabled = () => {
    const { tableProps } = this.props
    const { selectedRowKeys, data } = tableProps
    const list = data.filter(item => selectedRowKeys.includes(item.name))

    if (list.every(item => item.status === 'Active')) {
      return { activeStatus: true, disabledStatus: false }
    }

    if (list.every(item => item.status === 'Disabled')) {
      return { activeStatus: false, disabledStatus: true }
    }

    return { activeStatus: false, disabledStatus: false }
  }

  get tableActions() {
    const { tableProps } = this.props
    const { activeStatus, disabledStatus } = this.handledisabled()
    return {
      ...tableProps.tableActions,
      onCreate: this.showCreate,
      selectActions: [
        ...get(tableProps, 'tableActions.selectActions', {}),
        {
          key: 'active',
          type: 'default',
          text: t('ENABLE'),
          action: 'edit',
          disabled: activeStatus,
          onClick: () => {
            this.handleBatchOperation('active')
          },
        },
        {
          key: 'disabled',
          type: 'default',
          text: t('DISABLE'),
          action: 'edit',
          disabled: disabledStatus,
          onClick: () => {
            this.handleBatchOperation('disabled')
          },
        },
      ],
      getCheckboxProps: record => ({
        disabled: !this.showAction(record),
        name: record.name,
      }),
    }
  }

  getColumns = () => [
    {
      title: t('USERNAME'),
      dataIndex: 'username',
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
      title: t('STATUS'),
      dataIndex: 'status',
      isHideable: true,
      width: '20%',
      render: status => (
        <Status type={status} name={t(`USER_${status.toUpperCase()}`)} />
      ),
    },
    {
      title: t('PLATFORM_ROLE'),
      dataIndex: 'globalrole',
      isHideable: true,
      width: '20%',
      render: role => role || '-',
    },
    {
      title: t('LAST_LOGIN'),
      dataIndex: 'lastLoginTime',
      isHideable: true,
      width: '20%',
      render: time =>
        time
          ? getLocalTime(time).format('YYYY-MM-DD HH:mm:ss')
          : t('NOT_LOGIN_YET'),
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
