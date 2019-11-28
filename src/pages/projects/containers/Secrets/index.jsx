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

import SecretStore from 'stores/secret'
import { getLocalTime, getDisplayName } from 'utils'
import { ICON_TYPES, SECRET_TYPES } from 'utils/constants'
import { getFormTemplate } from 'utils/form.templates'

import Base from 'core/containers/Base/List'
import { Avatar, Notify } from 'components/Base'
import CreateModal from 'components/Modals/Create'
import EditBasicInfoModal from 'components/Modals/EditBasicInfo'
import SecretEditModal from 'projects/components/Modals/SecretEdit'

import FORM_STEPS from 'configs/steps/secrets'

@inject('rootStore')
@observer
class Secrets extends Base {
  init() {
    this.store = new SecretStore()

    this.initWebsocket()
  }

  get module() {
    return 'secrets'
  }

  get name() {
    return 'Secret'
  }

  get steps() {
    return FORM_STEPS
  }

  get formTemplate() {
    const { namespace } = this.props.match.params
    return getFormTemplate(namespace, this.module)
  }

  get itemActions() {
    return [
      {
        key: 'edit',
        icon: 'pen',
        text: t('Edit'),
        action: 'edit',
        onClick: this.showModal('editModal'),
      },
      {
        key: 'editSecret',
        icon: 'pen',
        text: t('Edit Secret'),
        action: 'edit',
        onClick: this.showModal('editSecretModal'),
      },
      {
        key: 'delete',
        icon: 'trash',
        text: t('Delete'),
        action: 'delete',
        onClick: this.showModal('deleteModal'),
      },
    ]
  }

  getColumns = () => [
    {
      title: t('Name'),
      dataIndex: 'name',
      sorter: true,
      sortOrder: this.getSortOrder('name'),
      search: true,
      render: (name, record) => (
        <Avatar
          icon={ICON_TYPES[this.module]}
          iconSize={40}
          title={getDisplayName(record)}
          desc={record.description || '-'}
          to={`${this.prefix}/${name}`}
        />
      ),
    },
    {
      title: t('Type'),
      dataIndex: 'type',
      isHideable: true,
      width: '24%',
      render: type => t(SECRET_TYPES[type] || type),
    },
    {
      title: t('Config Number'),
      dataIndex: 'data',
      isHideable: true,
      width: '20%',
      render: data => Object.keys(data).length,
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
      width: 20,
      render: this.renderMore,
    },
  ]

  handleEditSecret = data => {
    this.store.update(this.state.selectItem, data).then(() => {
      this.hideModal('editSecretModal')()
      Notify.success({ content: `${t('Updated Successfully')}!` })
      this.routing.query()
    })
  }

  renderExtraModals() {
    const {
      createModal,
      editModal,
      editSecretModal,
      selectItem = {},
    } = this.state

    const { isSubmitting } = this.store

    return (
      <div>
        <CreateModal
          name={this.name}
          module={this.module}
          store={this.store}
          visible={createModal}
          steps={this.steps}
          formTemplate={this.formTemplate}
          isSubmitting={isSubmitting}
          onOk={this.handleCreate}
          onCancel={this.hideModal('createModal')}
        />
        <EditBasicInfoModal
          visible={editModal}
          detail={selectItem._originData}
          isSubmitting={isSubmitting}
          onOk={this.handleEdit}
          onCancel={this.hideModal('editModal')}
        />
        <SecretEditModal
          visible={editSecretModal}
          detail={selectItem}
          onOk={this.handleEditSecret}
          onCancel={this.hideModal('editSecretModal')}
          isSubmitting={this.store.isSubmitting}
        />
      </div>
    )
  }
}

export default Secrets
