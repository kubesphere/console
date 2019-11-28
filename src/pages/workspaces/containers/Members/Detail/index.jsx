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
import { observer, inject } from 'mobx-react'
import { toJS } from 'mobx'

import WorkspaceMemberStore from 'stores/workspace/member'

import Base from 'core/containers/Base/Detail'
import { Notify } from 'components/Base'
import DeleteModal from 'components/Modals/Delete'
import BaseInfo from './BaseInfo'

@inject('rootStore')
@observer
export default class MemberDetail extends Base {
  get workspace() {
    return this.props.match.params.workspace
  }

  get name() {
    return 'Workspace Member'
  }

  get authKey() {
    return 'members'
  }

  get listUrl() {
    return `/workspaces/${this.workspace}/members`
  }

  init() {
    this.store = new WorkspaceMemberStore()
  }

  getOperations = () => [
    {
      key: 'delete',
      type: 'default',
      text: t('Remove from Workspace'),
      action: 'delete',
      onClick: this.showModal('deleteModule'),
    },
  ]

  getAttrs = () => {
    const { detail } = toJS(this.store)

    return [
      {
        name: t('Workspace'),
        value: this.workspace,
      },
      {
        name: t('Workspace Role'),
        value: detail.workspace_role,
      },
      {
        name: t('Email'),
        value: detail.email,
      },
    ]
  }

  handleDelete = () => {
    const { workspace, member } = this.props.match.params
    this.store.deleteMember({ workspace }, [member]).then(() => {
      this.hideModal('deleteModule')()
      Notify.success({ content: `${t('Deleted Successfully')}!` })
    })
  }

  renderSider() {
    const { detail } = toJS(this.store)

    return (
      <BaseInfo
        iconSrc={detail.avatar_url}
        name={detail.username}
        desc={detail.description}
        operations={this.getEnabledOperations()}
        attrs={this.getAttrs()}
      />
    )
  }

  renderModals() {
    const { deleteModule } = this.state
    const { detail } = toJS(this.store)

    return (
      <div>
        <DeleteModal
          desc={t.html('REMOVE_USER_TIP', {
            resource: detail.username,
          })}
          visible={deleteModule}
          onOk={this.handleDelete}
          onCancel={this.hideModal('deleteModule')}
        />
        {this.renderExtraModals()}
      </div>
    )
  }
}
