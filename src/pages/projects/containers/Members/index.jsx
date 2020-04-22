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
import { Avatar, Status } from 'components/Base'
import EmptyTable from 'components/Cards/EmptyTable'
import DeleteModal from 'components/Modals/Delete'
import ModifyMemberModal from 'components/Modals/ModifyMember'
import InviteMemberModal from 'components/Modals/InviteMember'
import Banner from 'components/Cards/Banner'
import Base from 'core/containers/Base/List'

import RoleStore from 'stores/role'

@inject('rootStore')
@observer
class Members extends Base {
  init() {
    this.store = this.props.rootStore.project

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

  get workspace() {
    return this.store.data.workspace
  }

  get rowKey() {
    return 'username'
  }

  get list() {
    return this.store.members
  }

  get tips() {
    return [
      {
        title: t('HOW_TO_INVITE_MEMBER_Q'),
        description: t('HOW_TO_INVITE_MEMBER_A'),
      },
    ]
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
    this.store.fetchMembers({ ...this.props.match.params, ...params })
  }

  handlePaging = params => this.list.paging(params)

  getEmptyProps() {
    return {
      createText: t('Invite Member'),
    }
  }

  getTableProps() {
    return {
      hideSearch: true,
      onFetch: this.handleFetch,
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

  getColumns = () => [
    {
      title: t('Member Name'),
      dataIndex: 'username',
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
        <Status type={status} name={t(`USER_${status.toUpperCase()}`)} />
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
    {
      key: 'more',
      width: 20,
      render: (field, record) => {
        if (record.username === globals.user.username) {
          return null
        }
        return this.renderMore(field, record)
      },
    },
  ]

  handleInvite = (userName, role) => {
    const { namespace } = this.props.match.params
    this.store.addMember(namespace, userName, role).then(() => {
      this.routing.query()
    })
  }

  handleModify = (member, role) => {
    const { namespace } = this.props.match.params

    const promises = []
    if (isArray(member)) {
      member.forEach(item => {
        promises.push(this.store.changeMemberRole(namespace, item, role))
      })
    } else {
      promises.push(this.store.changeMemberRole(namespace, member, role))
    }

    Promise.all(promises).then(() => {
      if (isArray(member)) {
        this.store.setSelectRowKeys('members', [])
      }
      this.hideModal('modifyModal')()
      this.routing.query()
    })
  }

  handleDelete = () => {
    const { selectItem } = this.state
    const { namespace } = this.props.match.params

    this.store.deleteMember(namespace, selectItem).then(() => {
      this.hideModal('deleteModal')()
      this.routing.query()
    })
  }

  handleSelectRowKeys = params => {
    this.store.setSelectRowKeys('members', params)
  }

  handleBatchDelete = () => {
    const { namespace } = this.props.match.params
    const { selectedRowKeys } = this.store.members

    if (selectedRowKeys.length > 0) {
      this.store.batchDeleteMembers(namespace, selectedRowKeys).then(() => {
        this.hideModal('batchDeleteModal')()
        this.store.setSelectRowKeys('members', [])
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

    const { selectedRowKeys, originData: members } = toJS(this.store.members)
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
        <ModifyMemberModal
          roles={roles}
          users={users}
          visible={modifyModal}
          onOk={this.handleModify}
          onCancel={this.hideModal('modifyModal')}
          isSubmitting={this.store.isSubmitting}
        />
        <InviteMemberModal
          visible={inviteModal}
          workspace={this.workspace}
          roles={roles}
          users={members}
          onOk={this.handleInvite}
          onCancel={this.hideModal('inviteModal')}
          isSubmitting={this.store.isSubmitting}
        />
      </div>
    )
  }

  renderHeader() {
    return (
      <div className="margin-b12">
        <Banner
          icon="group"
          title={t('Project Members')}
          description={t('PROJECT_MEMBERS_DESC')}
          module="project_roles"
          tips={this.tips}
        />
      </div>
    )
  }
}

export default Members
