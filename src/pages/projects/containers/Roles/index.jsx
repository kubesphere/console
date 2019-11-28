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

import { get, set } from 'lodash'
import React from 'react'
import { toJS } from 'mobx'
import { observer, inject } from 'mobx-react'
import { getLocalTime } from 'utils'
import { ICON_TYPES } from 'utils/constants'
import { Avatar } from 'components/Base'
import DeleteRoleModal from 'components/Modals/RoleDelete'
import CreateModal from 'components/Modals/RoleCreate'
import Banner from 'components/Cards/Banner'
import FORM_TEMPLATES from 'utils/form.templates'
import RoleStore from 'stores/role'

import Base from 'core/containers/Base/List'

const EditModal = CreateModal

@inject('rootStore')
@observer
class Roles extends Base {
  init() {
    this.store = new RoleStore()

    this.store.fetchRulesInfo()
  }

  get module() {
    return 'roles'
  }

  get name() {
    return 'Project Role'
  }

  get formTemplate() {
    const { namespace } = this.props.match.params
    return FORM_TEMPLATES[this.module]({ namespace })
  }

  get itemActions() {
    return [
      {
        key: 'edit',
        icon: 'pen',
        text: t('Edit'),
        action: 'edit',
        show: record => !globals.config.presetRoles.includes(record.name),
        onClick: this.showModal('editModal'),
      },
      {
        key: 'delete',
        icon: 'trash',
        text: t('Delete'),
        action: 'delete',
        show: record => !globals.config.presetRoles.includes(record.name),
        onClick: this.showModal('deleteModal'),
      },
    ]
  }

  getTableProps() {
    return {
      ...Base.prototype.getTableProps.call(this),
      selectActions: [],
    }
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

  getColumns = () => [
    {
      title: t('Name'),
      dataIndex: 'name',
      sorter: true,
      sortOrder: this.getSortOrder('name'),
      search: true,
      render: name => (
        <Avatar
          icon={ICON_TYPES[this.module]}
          title={name}
          to={`${this.prefix}/${name}`}
        />
      ),
    },
    {
      title: t('Description'),
      key: 'description',
      dataIndex: 'description',
      isHideable: true,
      width: '40%',
      render: (description, record) => {
        const name = get(record, 'name')
        if (description && globals.config.presetRoles.includes(name)) {
          return t(description)
        }
        return description
      },
    },
    {
      title: t('Created Time'),
      dataIndex: 'createTime',
      sorter: true,
      sortOrder: this.getSortOrder('createTime'),
      isHideable: true,
      width: 150,
      render: time => getLocalTime(time).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      key: 'more',
      render: this.renderMore,
    },
  ]

  renderModals() {
    const { editModal, createModal, deleteModal, selectItem = {} } = this.state
    const { isSubmitting, rulesInfo } = this.store

    return (
      <div>
        <DeleteRoleModal
          detail={selectItem}
          module={this.module}
          visible={deleteModal}
          isSubmitting={isSubmitting}
          onOk={this.handleDelete}
          onCancel={this.hideModal('deleteModal')}
        />
        <EditModal
          store={this.store}
          visible={editModal}
          title={t('Edit Project Role')}
          rulesInfo={toJS(rulesInfo)}
          formTemplate={this.getDetailFormTemplate(selectItem)}
          isSubmitting={isSubmitting}
          onOk={this.handleEdit}
          onCancel={this.hideModal('editModal')}
          edit
        />
        <CreateModal
          store={this.store}
          visible={createModal}
          rulesInfo={toJS(rulesInfo)}
          formTemplate={this.formTemplate}
          isSubmitting={isSubmitting}
          onOk={this.handleCreate}
          onCancel={this.hideModal('createModal')}
        />
      </div>
    )
  }

  renderHeader() {
    return (
      <div className="margin-b12">
        <Banner
          icon="role"
          title={t('Project Roles')}
          description={t('PROJECT_ROLE_DESC')}
          module="project_roles"
        />
      </div>
    )
  }
}

export default Roles
