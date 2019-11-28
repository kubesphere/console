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
    return 'Project Role'
  }

  get authKey() {
    return 'roles'
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

  get formTemplate() {
    const { namespace } = this.props.match.params
    return FORM_TEMPLATES[this.module]({ namespace })
  }

  @computed
  get detailDesc() {
    const name = this.store.detail.name
    const desc = get(this.store.detail, 'description')

    if (globals.config.presetRoles.includes(name)) {
      return t(desc)
    }

    return desc
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
    const enableEdit = !globals.config.presetRoles.includes(name)

    return [
      {
        key: 'edit',
        type: 'control',
        text: t('EDIT'),
        action: 'edit',
        show: enableEdit,
        onClick: this.showModal('editBaseInfo'),
      },
      {
        key: 'delete',
        type: 'danger',
        text: t('Delete'),
        action: 'delete',
        show: enableEdit,
        onClick: this.showModal('deleteModule'),
      },
    ]
  }

  getAttrs = () => {
    const detail = toJS(this.store.detail)

    return [
      {
        name: t('Project'),
        value: detail.namespace,
      },
      {
        name: t('Created Time'),
        value: this.createTime,
      },
      {
        name: t('Updated Time'),
        value: this.updateTime,
      },
      {
        name: t('Creator'),
        value: this.creator,
      },
    ]
  }

  renderModals() {
    const { detail, rulesInfo, isSubmitting } = this.store
    const { deleteModule, editBaseInfo } = this.state

    return (
      <div>
        <DeleteRoleModal
          detail={detail}
          module={this.module}
          visible={deleteModule}
          onOk={this.handleDelete}
          onCancel={this.hideModal('deleteModule')}
          isSubmitting={isSubmitting}
        />
        <EditModal
          store={this.store}
          visible={editBaseInfo}
          title={t('Edit Member Role')}
          rulesInfo={toJS(rulesInfo)}
          formTemplate={this.getDetailFormTemplate(detail)}
          onOk={this.handleEdit('editBaseInfo')}
          onCancel={this.hideModal('editBaseInfo')}
          isSubmitting={isSubmitting}
          edit
        />
      </div>
    )
  }
}
