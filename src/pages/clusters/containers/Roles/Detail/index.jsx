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

import { set, get } from 'lodash'
import React from 'react'
import { computed, toJS } from 'mobx'
import { observer, inject } from 'mobx-react'

import FORM_TEMPLATES from 'utils/form.templates'
import RoleStore from 'stores/role'

import Base from 'core/containers/Base/Detail'
import DeleteRoleModal from 'components/Modals/RoleDelete'
import EditModal from 'components/Modals/RoleCreate'

@inject('rootStore')
@observer
export default class RolesDetail extends Base {
  get name() {
    return 'Platform Role'
  }

  get authKey() {
    return 'roles'
  }

  get listUrl() {
    return '/roles'
  }

  @computed
  get detailDesc() {
    const name = this.store.detail.name
    const desc = get(this.store.detail, 'description')

    if (globals.config.presetClusterRoles.includes(name)) {
      return t(desc)
    }

    return desc
  }

  get formTemplate() {
    return FORM_TEMPLATES[this.module]()
  }

  init() {
    this.store = new RoleStore(this.module)

    this.store.fetchRulesInfo()
  }

  fetchData = () => {
    this.store.fetchDetail(this.props.match.params).catch(this.catch)
    this.store.fetchRules(this.props.match.params)
    this.store.fetchUsers(this.props.match.params)
  }

  getDetailFormTemplate(data) {
    if (!data) {
      return {}
    }

    const formTemplate = this.formTemplate

    set(formTemplate, 'metadata.name', data.name)
    set(
      formTemplate,
      "metadata.annotations['kubesphere.io/description']",
      get(data, 'description')
    )

    return formTemplate
  }

  getOperations = () => {
    const { name } = this.props.match.params
    const enableEdit = !globals.config.presetClusterRoles.includes(name)

    return [
      {
        key: 'edit',
        type: 'control',
        text: t('Edit'),
        action: 'edit',
        show: enableEdit,
        onClick: this.showModal('editBaseInfo'),
      },
      {
        key: 'delete',
        type: 'danger',
        value: 'delete',
        text: t('Delete'),
        action: 'delete',
        show: enableEdit,
        onClick: this.showModal('deleteModule'),
      },
    ]
  }

  getAttrs = () => [
    {
      name: t('Created Time'),
      value: this.createTime,
    },
    {
      name: t('Creator'),
      value: this.creator,
    },
  ]

  renderModals() {
    const { detail } = this.store
    const { deleteModule, editBaseInfo } = this.state

    return (
      <div>
        <DeleteRoleModal
          detail={detail}
          module={this.module}
          visible={deleteModule}
          onOk={this.handleDelete}
          onCancel={this.hideModal('deleteModule')}
          isSubmitting={this.store.isSubmitting}
        />
        <EditModal
          visible={editBaseInfo}
          store={this.store}
          module={this.module}
          title={t('Edit Platform Role')}
          rulesInfo={toJS(this.store.rulesInfo)}
          formTemplate={this.getDetailFormTemplate(detail)}
          onOk={this.handleEdit('editBaseInfo')}
          onCancel={this.hideModal('editBaseInfo')}
          isSubmitting={this.store.isSubmitting}
          edit
        />
      </div>
    )
  }
}
