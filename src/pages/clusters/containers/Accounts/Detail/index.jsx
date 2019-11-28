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
import { get } from 'lodash'

import { getLocalTime } from 'utils'
import UserStore from 'stores/user'
import RoleStore from 'stores/role'

import Base from 'core/containers/Base/Detail'
import EditModal from 'components/Modals/UserCreate'
import ModifyPasswordModal from 'components/Modals/ModifyPassword'
import DeleteModal from 'components/Modals/Delete'

class AccountDetail extends Base {
  state = {
    editBaseInfo: false,
    modifyPassword: false,
    deleteUser: false,
  }

  get authKey() {
    return 'accounts'
  }

  get name() {
    return 'Account'
  }

  get detailName() {
    return get(this.store.detail, 'username')
  }

  get detailDesc() {
    if (globals.config.presetUsers.includes('admin')) {
      return t(get(this.store.detail, 'description'))
    }
    return get(this.store.detail, 'description')
  }

  get listUrl() {
    return '/accounts'
  }

  get showEdit() {
    const userName = this.store.detail.username
    return !globals.config.presetUsers.includes(userName)
  }

  init() {
    this.store = new UserStore(this.module)
    this.clusterRoleStore = new RoleStore('clusterroles')
  }

  fetchData = () => {
    this.clusterRoleStore.fetchList({ limit: -1, order: 'createTime' })
    this.store.fetchDetail(this.props.match.params).catch(this.catch)
  }

  handleEdit = data => {
    this.store.update(data).then(() => {
      this.hideModal('editBaseInfo')()
      this.store.fetchDetail(this.props.match.params)
    })
  }

  handleModifyPassword = data => {
    this.store.update(data).then(() => {
      this.hideModal('modifyPassword')()
      this.store.fetchDetail(this.props.match.params)
    })
  }

  getOperations = () => [
    {
      show: this.showEdit,
      key: 'edit',
      type: 'control',
      text: t('Edit'),
      action: 'edit',
      onClick: this.showModal('editBaseInfo'),
    },
    {
      show: this.showEdit,
      key: 'modifyPassword',
      icon: 'pen',
      text: t('Modify Password'),
      action: 'edit',
      onClick: this.showModal('modifyPassword'),
    },
    {
      show: this.showEdit,
      key: 'delete',
      icon: 'trash',
      text: t('Delete'),
      action: 'delete',
      onClick: this.showModal('deleteUser'),
    },
  ]

  getAttrs = () => {
    const detail = toJS(this.store.detail)

    return [
      {
        name: t('Platform Role'),
        value: detail.cluster_role,
      },
      {
        name: t('Email'),
        value: detail.email,
      },
      {
        name: t('Last Login Time'),
        value: detail.last_login_time
          ? getLocalTime(detail.last_login_time).format(`YYYY-MM-DD HH:mm:ss`)
          : t('Not logged in yet'),
      },
    ]
  }

  renderExtraModals() {
    const detail = toJS(this.store.detail)
    const { editBaseInfo, modifyPassword, deleteUser } = this.state

    return (
      <div>
        <EditModal
          store={this.store}
          clusterRoles={toJS(this.clusterRoleStore.list.data)}
          detail={detail}
          visible={editBaseInfo}
          onOk={this.handleEdit}
          onCancel={this.hideModal('editBaseInfo')}
          isSubmitting={this.store.isSubmitting}
        />
        <ModifyPasswordModal
          detail={detail}
          visible={modifyPassword}
          onOk={this.handleModifyPassword}
          onCancel={this.hideModal('modifyPassword')}
          isSubmitting={this.store.isSubmitting}
        />
        <DeleteModal
          type={t('User')}
          resource={detail.username}
          visible={deleteUser}
          onOk={this.handleDelete}
          onCancel={this.hideModal('deleteUser')}
          isSubmitting={this.store.isSubmitting}
        />
      </div>
    )
  }
}

export default inject('rootStore')(observer(AccountDetail))
export const Component = AccountDetail
