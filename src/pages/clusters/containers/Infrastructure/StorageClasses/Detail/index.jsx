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

import StorageClassStore from 'stores/storageClass'

import { Notify } from 'components/Base'
import Base from 'core/containers/Base/Detail'
import SetDefaultStorageClassModal from 'components/Modals/SetDefaultStorageClass'
import EditYamlModal from 'components/Modals/EditYaml'

class StorageClassDetail extends Base {
  constructor(props) {
    super(props)

    this.state.setDefaultStorageClass = false

    this.store.fetchList({ limit: Infinity })
  }

  get authKey() {
    return 'storageclasses'
  }

  get name() {
    return 'Storage Class'
  }

  get listUrl() {
    return '/infrastructure/storageclasses'
  }

  get defaultStorageClass() {
    const { data } = toJS(this.store.list)

    const defaultStorageClass = data.find(item => item.default) || {}

    return defaultStorageClass
  }

  init() {
    this.store = new StorageClassStore(this.module)
  }

  fetchData = () => {
    this.store.fetchDetail(this.props.match.params).catch(this.catch)
  }

  handleDelete = () => {
    const { detail } = this.store
    this.store.delete(detail).then(() => {
      this.hideModal('deleteModule')()
      this.routing.push('/infrastructure/storageclasses')
    })
  }

  handleSetDefaultStorageClass = () => {
    const detail = toJS(this.store.detail)
    const defaultStorageClass = this.defaultStorageClass.name

    if (defaultStorageClass) {
      this.store.patch(
        { name: defaultStorageClass },
        {
          metadata: {
            annotations: {
              'storageclass.kubernetes.io/is-default-class': 'false',
            },
          },
        }
      )
    }

    this.store
      .patch(detail, {
        metadata: {
          annotations: {
            'storageclass.kubernetes.io/is-default-class': 'true',
          },
        },
      })
      .then(() => {
        this.hideModal('setDefaultStorageClass')()
        this.fetchData()
      })
  }

  validateSelect({ callback }) {
    return (...args) => {
      const { data = [] } = toJS(this.store.list)

      const { associationPVCCount = 0 } =
        data.find(
          storageClass => storageClass.name === this.store.detail.name
        ) || {}

      return associationPVCCount ? this.notifyDeleteTips() : callback(...args)
    }
  }

  notifyDeleteTips() {
    Notify.error({ content: `${t('DEPENDENT_STORAGE_CLASS_DELETE_TIPS')}!` })
  }

  getOperations = () => [
    {
      key: 'viewYaml',
      type: 'default',
      text: t('View YAML'),
      action: 'view',
      onClick: this.showModal('viewYaml'),
    },
    {
      key: 'setDefault',
      icon: 'pen',
      text: t('Set as default storage class'),
      action: 'edit',
      onClick: this.showModal('setDefaultStorageClass'),
    },
    {
      key: 'delete',
      icon: 'trash',
      text: t('Delete'),
      action: 'delete',
      onClick: this.validateSelect({
        callback: this.showModal('deleteModule'),
      }),
    },
  ]

  getAttrs = () => {
    const detail = toJS(this.store.detail)

    return [
      {
        name: t('Provisioner'),
        value: detail.provisioner,
      },
      {
        name: t('Default Storage Class'),
        value: detail.default ? t('True') : t('False'),
      },
      {
        name: t('Scalable'),
        value: detail.allowVolumeExpansion ? t('True') : t('False'),
      },
      {
        name: t('Reclaim Policy'),
        value: detail.reclaimPolicy,
      },
    ]
  }

  renderExtraModals() {
    const { detail } = this.store
    const { viewYaml, setDefaultStorageClass } = this.state

    return (
      <div>
        <SetDefaultStorageClassModal
          visible={setDefaultStorageClass}
          onOk={this.handleSetDefaultStorageClass}
          onCancel={this.hideModal('setDefaultStorageClass')}
          isSubmitting={this.store.isSubmitting}
        />
        <EditYamlModal
          visible={viewYaml}
          detail={toJS(detail._originData)}
          onCancel={this.hideModal('viewYaml')}
          readOnly
        />
      </div>
    )
  }
}

export default inject('rootStore')(observer(StorageClassDetail))
export const Component = StorageClassDetail
