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

import ConfigMapStore from 'stores/configmap'

import Base from 'core/containers/Base/Detail'
import EditBasicInfoModal from 'components/Modals/EditBasicInfo'
import EditYamlModal from 'components/Modals/EditYaml'
import EditConfigMapModal from 'projects/components/Modals/ConfigMapEdit'

class ConfigMapDetail extends Base {
  get name() {
    return 'ConfigMap'
  }

  init() {
    this.store = new ConfigMapStore()
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
      key: 'editYaml',
      icon: 'pen',
      text: t('Edit YAML'),
      action: 'edit',
      onClick: this.showModal('editYaml'),
    },
    {
      key: 'editConfigMap',
      icon: 'pen',
      text: t('Modify Config'),
      action: 'edit',
      onClick: this.showModal('editConfigMap'),
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
    const { editBaseInfo, editYaml, editConfigMap } = this.state

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
        <EditYamlModal
          visible={editYaml}
          detail={originData}
          onOk={this.handleEdit('editYaml', 'update')}
          onCancel={this.hideModal('editYaml')}
          isSubmitting={isSubmitting}
        />
        <EditConfigMapModal
          visible={editConfigMap}
          detail={originData}
          onOk={this.handleEdit('editConfigMap', 'update')}
          onCancel={this.hideModal('editConfigMap')}
          isSubmitting={isSubmitting}
        />
      </div>
    )
  }
}

export default inject('rootStore')(observer(ConfigMapDetail))
export const Component = ConfigMapDetail
