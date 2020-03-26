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
import { isEmpty } from 'lodash'
import { observer, inject } from 'mobx-react'
import { Loading } from '@pitrix/lego-ui'

import { Modal } from 'components/Base'
import { getDisplayName } from 'utils'
import { trigger } from 'utils/action'
import { toJS } from 'mobx'
import StorageClassStore from 'stores/storageClass'

import SetDefaultStorageClassModal from 'components/Modals/SetDefaultStorageClass'
import DetailPage from 'clusters/containers/Base/Detail'

import routes from './routes'

@inject('rootStore')
@observer
@trigger
export default class StorageClassDetail extends React.Component {
  store = new StorageClassStore()

  componentDidMount() {
    this.store.fetchList({ limit: Infinity })
    this.fetchData()
  }

  get defaultStorageClass() {
    const { data } = toJS(this.store.list)

    const defaultStorageClass = data.find(item => item.default) || {}

    return defaultStorageClass
  }

  get name() {
    return 'Storage Class'
  }

  get listUrl() {
    const { cluster } = this.props.match.params
    return `/clusters/${cluster}/storageclasses`
  }

  fetchData = () => {
    this.store.fetchDetail(this.props.match.params)
  }

  getOperations = () => [
    {
      key: 'viewYaml',
      type: 'default',
      text: t('View YAML'),
      action: 'view',
      onClick: () =>
        this.trigger('resource.yaml.edit', {
          detail: this.store.detail,
          readonly: true,
        }),
    },
    {
      key: 'setDefault',
      icon: 'pen',
      text: t('Set as default storage class'),
      action: 'edit',
      onClick: () => {
        this.setDefaultModal = Modal.open({
          onOk: this.handleSetDefaultStorageClass,
          modal: SetDefaultStorageClassModal,
        })
      },
    },
    {
      key: 'delete',
      icon: 'trash',
      text: t('Delete'),
      action: 'delete',
      onClick: () =>
        this.trigger('resource.delete', {
          type: t(this.name),
          resource: this.store.detail.name,
          detail: toJS(this.store.detail),
          success: this.returnTolist,
        }),
    },
  ]

  getAttrs = () => {
    const { detail = {} } = this.store

    if (isEmpty(detail)) return null

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

  returnTolist = () => {
    this.props.rootStore.routing.push(this.listUrl)
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
        Modal.close(this.setDefaultModal)
        this.fetchData()
      })
  }

  render() {
    const stores = { detailStore: this.store }

    if (this.store.isLoading) {
      return <Loading className="ks-page-loading" />
    }

    const sideProps = {
      module: this.module,
      name: getDisplayName(this.store.detail),
      desc: t(`STORAGE CLASS_DESC`),
      operations: this.getOperations(),
      attrs: this.getAttrs(),
      breadcrumbs: [
        {
          label: t('Storage Classes'),
          url: this.listUrl,
        },
      ],
    }

    return <DetailPage stores={stores} routes={routes} sideProps={sideProps} />
  }
}
