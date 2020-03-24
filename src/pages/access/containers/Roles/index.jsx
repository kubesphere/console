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

import RoleStore from 'stores/role'
import Base from 'core/containers/Base/List'
import { Avatar } from 'components/Base'
import DeleteRoleModal from 'components/Modals/RoleDelete'
import CreateModal from 'components/Modals/RoleCreate'
import { getLocalTime } from 'utils'
import { ICON_TYPES } from 'utils/constants'
import FORM_TEMPLATES from 'utils/form.templates'

import styles from './index.scss'

const EditModal = CreateModal

@inject('rootStore')
@observer
export default class Roles extends Base {
  init() {
    this.store = new RoleStore(this.module)

    this.store.fetchRulesInfo()
  }

  get module() {
    return 'clusterroles'
  }

  get authKey() {
    return 'roles'
  }

  get name() {
    return 'Cluster Role'
  }

  get className() {
    return styles.wrapper
  }

  get formTemplate() {
    return FORM_TEMPLATES[this.module]()
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

  get itemActions() {
    return [
      {
        key: 'edit',
        icon: 'pen',
        text: t('Edit'),
        action: 'edit',
        show: record =>
          !globals.config.presetClusterRoles.includes(record.name),
        onClick: this.showModal('editModal'),
      },
      {
        key: 'delete',
        icon: 'trash',
        text: t('Delete'),
        action: 'delete',
        show: record =>
          !globals.config.presetClusterRoles.includes(record.name),
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

  getColumns = () => [
    {
      title: t('Name'),
      dataIndex: 'name',
      search: true,
      width: '25%',
      render: name => (
        <Avatar
          icon={ICON_TYPES[this.module]}
          to={`${this.prefix}/${name}`}
          title={name}
        />
      ),
    },
    {
      title: t('Description'),
      key: 'description',
      dataIndex: 'description',
      isHideable: true,
      width: '55%',
      render: (description, record) => {
        const name = get(record, 'name')
        if (description && globals.config.presetClusterRoles.includes(name)) {
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
      width: '19%',
      render: time => getLocalTime(time).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      key: 'more',
      width: 20,
      render: this.renderMore,
    },
  ]

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
          <div className="h4">{t('Platform Roles')}</div>
          <p>{t('PLATFORM_ROLES_DESC')}</p>
        </div>
      </div>
    )
  }

  renderModals() {
    const { editModal, createModal, deleteModal, selectItem } = this.state
    return (
      <div>
        <DeleteRoleModal
          detail={selectItem}
          module={this.module}
          visible={deleteModal}
          onOk={this.handleDelete}
          onCancel={this.hideModal('deleteModal')}
          isSubmitting={this.store.isSubmitting}
        />
        <EditModal
          store={this.store}
          module={this.module}
          title={t('Edit Platform Role')}
          rulesInfo={toJS(this.store.rulesInfo)}
          formTemplate={this.getDetailFormTemplate(selectItem)}
          visible={editModal}
          onOk={this.handleEdit}
          onCancel={this.hideModal('editModal')}
          isSubmitting={this.store.isSubmitting}
          edit
        />
        <CreateModal
          store={this.store}
          module={this.module}
          title={t('Create Platform Role')}
          rulesInfo={toJS(this.store.rulesInfo)}
          formTemplate={this.formTemplate}
          visible={createModal}
          isSubmitting={this.store.isSubmitting}
          onOk={this.handleCreate}
          onCancel={this.hideModal('createModal')}
        />
      </div>
    )
  }
}
