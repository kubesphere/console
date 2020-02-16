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

import { isEmpty, isArray } from 'lodash'
import React from 'react'
import { toJS } from 'mobx'
import { observer, inject } from 'mobx-react'
import { getLocalTime } from 'utils'
import { Avatar } from 'components/Base'
import UserStatus from 'components/UserStatus'
import EmptyTable from 'components/Cards/EmptyTable'
import DeleteModal from 'components/Modals/Delete'
import ModifyMemberModal from 'components/Modals/ModifyMember'
import InviteMemberModal from 'components/Modals/InviteMember'
import Banner from 'components/Cards/Banner'

import Base from 'core/containers/Base/List'
import MemberStore from 'stores/workspace/member'
import RoleStore from 'stores/workspace/role'

@inject('rootStore')
@observer
class Members extends Base {
  init() {
    this.store = new MemberStore()
    this.roleStore = new RoleStore()

    this.roleStore.fetchList(this.props.match.params)
  }

  get module() {
    return 'users'
  }

  get authKey() {
    return 'members'
  }

  get name() {
    return 'Member'
  }

  get rowKey() {
    return 'username'
  }

  get itemActions() {
    return [
      {
        key: 'modify',
        icon: 'pen',
        text: t('Modify Member Role'),
        action: 'edit',
        onClick: this.showModal('modifyModal'),
      },
      {
        key: 'delete',
        icon: 'trash',
        text: t('Remove Member'),
        action: 'delete',
        onClick: this.showModal('deleteModal'),
      },
    ]
  }

  getData(params) {
    this.store.fetchList({ ...this.props.match.params, ...params })
  }

  handlePaging = params => this.list.paging(params)

  getTableProps() {
    return {
      hideSearch: true,
      onFetch: this.handleFetch,
      onPaging: this.handlePaging,
      onSelectRowKeys: this.handleSelectRowKeys,
      onDelete: this.showModal('batchDeleteModal'),
      actions: [
        {
          key: 'invite',
          type: 'control',
          text: t('Invite Member'),
          action: 'create',
          onClick: this.showModal('inviteModal'),
        },
      ],
      selectActions: [
        {
          key: 'delete',
          type: 'danger',
          text: t('Remove Members'),
          action: 'delete',
          onClick: this.showModal('batchDeleteModal'),
        },
      ],
      getCheckboxProps: record => ({
        disabled: record.username === globals.user.username,
        name: record.username,
      }),
    }
  }

  getEmptyProps() {
    return {
      createText: t('Invite Member'),
    }
  }

  getColumns = () => [
    {
      title: t('Member Name'),
      dataIndex: 'username',
      search: true,
      width: '40%',
      render: (name, record) => (
        <Avatar
          to={`${this.prefix}/${name}`}
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
      render: status => <UserStatus status={status} />,
    },
    {
      title: t('Role'),
      dataIndex: 'workspace_role',
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
    {
      key: 'more',
      render: (field, record) => {
        if (record.username === globals.user.username) {
          return null
        }
        return this.renderMore(field, record)
      },
    },
  ]

  handleInvite = (username, role) =>
    this.store
      .addMember(this.props.match.params, [{ username, workspace_role: role }])
      .then(() => {
        this.routing.query()
      })

  handleModify = (member, role) => {
    const data = []
    if (isArray(member)) {
      member.forEach(item => {
        data.push({ username: item.username, workspace_role: role })
      })
    } else {
      data.push({ username: member.username, workspace_role: role })
    }

    this.store.changeMemberRole(this.props.match.params, data).then(() => {
      if (isArray(member)) {
        this.store.setSelectRowKeys([])
      }
      this.hideModal('modifyModal')()
      this.routing.query()
    })
  }

  handleDelete = () => {
    const { selectItem } = this.state

    this.store
      .deleteMember(this.props.match.params, [selectItem.username])
      .then(() => {
        this.hideModal('deleteModal')()
        this.routing.query()
      })
  }

  handleBatchDelete = () => {
    const { selectedRowKeys } = this.store.list

    if (selectedRowKeys.length > 0) {
      this.store
        .deleteMember(this.props.match.params, selectedRowKeys)
        .then(() => {
          this.hideModal('batchDeleteModal')()
          this.store.setSelectRowKeys([])
          this.routing.query()
        })
    }
  }

  renderEmpty() {
    const onCreate = this.enabledActions.includes('create')
      ? this.showModal('inviteModal')
      : null

    return (
      <EmptyTable
        name={this.name}
        onCreate={onCreate}
        {...this.getEmptyProps()}
      />
    )
  }

  renderModals() {
    const {
      modifyModal,
      inviteModal,
      deleteModal,
      batchDeleteModal,
      selectItem = {},
    } = this.state

    const { selectedRowKeys, originData: members } = toJS(this.store.list)
    const roles = toJS(this.roleStore.list.data)

    const users = !isEmpty(selectItem)
      ? [selectItem]
      : selectedRowKeys.map(rowKey =>
          members.find(member => member.username === rowKey)
        )

    const usernames = this.list.selectedRowKeys.join(', ')

    return (
      <div>
        <DeleteModal
          title={t('Sure to remove')}
          desc={t.html('REMOVE_MEMBER_TIP', {
            resource: selectItem[this.rowKey],
          })}
          resource={selectItem[this.rowKey]}
          visible={deleteModal}
          onOk={this.handleDelete}
          onCancel={this.hideModal('deleteModal')}
          isSubmitting={this.store.isSubmitting}
        />
        {this.list.selectedRowKeys && (
          <DeleteModal
            visible={batchDeleteModal}
            title={t('Sure to remove')}
            desc={t.html('REMOVE_MEMBER_TIP', { resource: usernames })}
            resource={usernames}
            onOk={this.handleBatchDelete}
            onCancel={this.hideModal('batchDeleteModal')}
            isSubmitting={this.store.isSubmitting}
          />
        )}
        {this.enabledActions.includes('edit') && (
          <ModifyMemberModal
            roles={roles}
            users={users}
            visible={modifyModal}
            onOk={this.handleModify}
            onCancel={this.hideModal('modifyModal')}
            isSubmitting={this.store.isSubmitting}
          />
        )}
        {this.enabledActions.includes('create') && (
          <InviteMemberModal
            visible={inviteModal}
            roles={roles}
            users={members}
            title={t('Invite members to the workspace')}
            desc={t('INVITE_WORKSPACE_MEMBER_DESC')}
            searchPlaceholder={t('INVITE_WORKSPACE_MEMBER_SEARCH_PLACEHODLER')}
            onOk={this.handleInvite}
            onCancel={this.hideModal('inviteModal')}
          />
        )}
      </div>
    )
  }

  renderHeader() {
    return (
      <div className="margin-b12">
        <Banner
          title={t('Workspace Members')}
          icon="group"
          description={t('WORKSPACE_MEMBER_DESC')}
          module={this.module}
        />
      </div>
    )
  }
}

export default Members
