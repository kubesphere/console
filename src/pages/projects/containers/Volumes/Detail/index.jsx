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
import { get } from 'lodash'

import VolumeStore from 'stores/volume'

import StorageClass from 'stores/storageClass'
import Base from 'core/containers/Base/Detail'
import { Status } from 'components/Base'
import EditBasicInfoModal from 'components/Modals/EditBasicInfo'
import EditYamlModal from 'components/Modals/EditYaml'
import ExpandModal from 'projects/components/Modals/ExpandVolume'

class VolumeDetail extends Base {
  get name() {
    return 'Volume'
  }

  get listUrl() {
    const { storage } = this.props.match.params
    return storage
      ? `/infrastructure/storageclasses/${storage}/`
      : `/projects/${this.namespace}/${this.module}`
  }

  init() {
    this.store = new VolumeStore()
    this.storageclass = new StorageClass()
  }

  fetchData = async params => {
    try {
      await this.store.fetchDetail(this.params, params)

      this.store.fetchVolumeMountStatus()
    } catch (e) {
      this.catch(e)
    }

    const { namespace, storageClassName } = this.store.detail
    await this.storageclass.fetchDetail({
      namespace,
      name: storageClassName,
    })
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
      key: 'expand',
      text: t('Expand Volume'),
      icon: 'scaling',
      action: 'edit',
      disabled: !get(this.storageclass, 'detail.allowVolumeExpansion', false),
      onClick: this.showModal('expand'),
    },
    {
      key: 'editYaml',
      icon: 'pen',
      text: t('Edit YAML'),
      action: 'edit',
      onClick: this.showModal('editYaml'),
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

    const phase = detail.phase || ''

    const storageClassName =
      detail.storageClassName ||
      get(detail, "annotations['volume.beta.kubernetes.io/storage-class']")

    return [
      {
        name: t('Project'),
        value: detail.namespace,
      },
      {
        name: t('Status'),
        value: (
          <Status
            type={phase}
            name={t(`VOLUME_STATUS_${phase.toUpperCase()}`)}
          />
        ),
      },
      {
        name: t('Capacity'),
        value: get(detail, 'capacity', '-'),
      },
      {
        name: t('Access Mode'),
        value: get(detail, 'accessMode', '-'),
      },
      {
        name: t('Storage Class'),
        value: storageClassName,
      },
      {
        name: t('Provisioner'),
        value: get(
          detail,
          "annotations['volume.beta.kubernetes.io/storage-provisioner']",
          '-'
        ),
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
    const { editBaseInfo, editYaml, expand } = this.state

    const originData = toJS(detail._originData)
    const storageClassSizeConfig = this.storageclass.getStorageSizeConfig()

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
        <ExpandModal
          visible={expand}
          onCancel={this.hideModal('expand')}
          onOk={this.handleEdit('expand')}
          isExpanding={isSubmitting}
          shouldAlertVisible={detail.inUse}
          detail={originData}
          max={storageClassSizeConfig.max}
          min={storageClassSizeConfig.min}
          step={storageClassSizeConfig.step}
        />
      </div>
    )
  }
}

export default inject('rootStore')(observer(VolumeDetail))
export const Component = VolumeDetail
