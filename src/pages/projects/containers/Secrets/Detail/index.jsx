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

import { SECRET_TYPES } from 'utils/constants'
import SecretStore from 'stores/secret'

import Base from 'core/containers/Base/Detail'
import EditBasicInfoModal from 'components/Modals/EditBasicInfo'
import SecretEditModal from 'projects/components/Modals/SecretEdit'

class SecretDetail extends Base {
  get name() {
    return 'Secret'
  }

  init() {
    this.store = new SecretStore()
  }

  getOperations = () => [
    {
      key: 'edit',
      type: 'control',
      text: t('EDIT'),
      action: 'edit',
      onClick: this.showModal('editBaseInfo'),
    },
    {
      key: 'editSecret',
      icon: 'pen',
      text: t('Edit Secret'),
      action: 'edit',
      onClick: this.showModal('editSecret'),
    },
    {
      key: 'delete',
      icon: 'trash',
      text: t('Delete'),
      action: 'delete',
      onClick: this.showModal('deleteModule'),
    },
  ]

  getAttrs = () => {
    const detail = toJS(this.store.detail)

    return [
      {
        name: t('Project'),
        value: detail.namespace,
      },
      {
        name: t('Type'),
        value: t(SECRET_TYPES[detail.type] || detail.type),
      },
      {
        name: t('Created Time'),
        value: this.createTime,
      },
      {
        name: t('Creator'),
        value: this.creator,
      },
    ]
  }

  renderExtraModals() {
    const { detail, isSubmitting } = this.store
    const { editBaseInfo, editSecret } = this.state

    const originData = toJS(detail._originData)

    return (
      <div>
        <EditBasicInfoModal
          visible={editBaseInfo}
          detail={originData}
          onOk={this.handleEdit('editBaseInfo')}
          onCancel={this.hideModal('editBaseInfo')}
          isSubmitting={isSubmitting}
        />
        <SecretEditModal
          visible={editSecret}
          detail={detail}
          onOk={this.handleEdit('editSecret', 'update')}
          onCancel={this.hideModal('editSecret')}
          isSubmitting={isSubmitting}
        />
      </div>
    )
  }
}

export default inject('rootStore')(observer(SecretDetail))
export const Component = SecretDetail
