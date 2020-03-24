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
import { observer, inject } from 'mobx-react'

import UserStore from 'stores/user'
import RoleStore from 'stores/role'

import { Avatar, Notify } from 'components/Base'
import UserStatus from 'components/UserStatus'
import CreateModal from 'components/Modals/UserCreate'

import { getLocalTime } from 'utils'

import Base from 'core/containers/Base/List'

import styles from './index.scss'

const EditModal = CreateModal

@inject('rootStore')
@observer
export default class Accounts extends Base {
  init() {
    this.store = new UserStore()

    this.clusterRoleStore = new RoleStore('clusterroles')

    this.clusterRoleStore.fetchList({ limit: -1, order: 'createTime' })
  }

  get name() {
    return 'User'
  }

  get authKey() {
    return 'accounts'
  }

  get rowKey() {
    return 'username'
  }

  get className() {
    return styles.wrapper
  }

  getTableProps() {
    return {
      ...Base.prototype.getTableProps.call(this),
      searchType: 'keyword',
    }
  }

  checkActionEnable(record) {
    return (
      !globals.config.presetUsers.includes(record.username) &&
      globals.user.username !== record.username
    )
  }

  get itemActions() {
    return [
      {
        key: 'edit',
        icon: 'pen',
        text: t('Edit'),
        action: 'edit',
        show: this.checkActionEnable,
        onClick: this.showModal('editModal'),
      },
      {
        key: 'delete',
        icon: 'trash',
        text: t('Delete'),
        action: 'delete',
        show: this.checkActionEnable,
        onClick: this.showModal('deleteModal'),
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
          to={`${this.prefix}/${name}`}
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
    {
      key: 'more',
      width: 20,
      render: this.renderMore,
    },
  ]

  handleEdit = data => {
    this.store.update(data, this.state.selectItem).then(() => {
      this.hideModal('editModal')()
      Notify.success({ content: `${t('Updated Successfully')}!` })
      this.routing.query()
    })
  }

  renderHeader() {
    return (
      <div className={styles.header}>
        <img className={styles.leftIcon} src="/assets/noicon.svg" alt="" />
        <img
          className={styles.rightIcon}
          src="/assets/banner-icon-2.svg"
          alt=""
        />
        <div className={styles.title}>
          <div className="h4">{t('NAV_ACCOUNTS')}</div>
          <p>{t('ACCOUNTS_MANAGEMENT_DESC')}</p>
        </div>
      </div>
    )
  }

  renderExtraModals() {
    const { createModal, editModal, selectItem } = this.state
    const clusterRoles = toJS(this.clusterRoleStore.list.data)

    return (
      <div>
        <CreateModal
          store={this.store}
          clusterRoles={clusterRoles}
          visible={createModal}
          onOk={this.handleCreate}
          onCancel={this.hideModal('createModal')}
          isSubmitting={this.store.isSubmitting}
        />
        <EditModal
          store={this.store}
          clusterRoles={clusterRoles}
          detail={selectItem}
          visible={editModal}
          onOk={this.handleEdit}
          onCancel={this.hideModal('editModal')}
          isSubmitting={this.store.isSubmitting}
        />
      </div>
    )
  }
}
