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
import { Loading } from '@kube-design/components'

import { getDisplayName } from 'utils'
import { trigger } from 'utils/action'
import { toJS } from 'mobx'
import StorageClassStore from 'stores/storageClass'

import DetailPage from 'clusters/containers/Base/Detail'

import routes from './routes'

@inject('rootStore')
@observer
@trigger
export default class StorageClassDetail extends React.Component {
  store = new StorageClassStore()

  componentDidMount() {
    this.store.fetchList({ limit: -1 })
    this.fetchData()
  }

  get defaultStorageClass() {
    const { data } = toJS(this.store.list)

    const defaultStorageClass = data.find(item => item.default) || {}

    return defaultStorageClass
  }

  get name() {
    return 'STORAGE_CLASS'
  }

  get module() {
    return 'storageclasses'
  }

  get listUrl() {
    const { cluster } = this.props.match.params
    return `/clusters/${cluster}/storageclasses`
  }

  fetchData = () => {
    const { params } = this.props.match
    this.store.fetchDetail(params)
  }

  getOperations = () => [
    {
      key: 'editYaml',
      type: 'default',
      text: t('EDIT_YAML'),
      action: 'edit',
      onClick: () =>
        this.trigger('resource.yaml.edit', {
          detail: toJS(this.store.detail),
          readOnly: false,
          success: this.fetchData,
        }),
    },
    {
      key: 'setDefault',
      icon: 'pen',
      text: t('SET_AS_DEFAULT_STORAGE_CLASS'),
      action: 'edit',
      onClick: () =>
        this.trigger('storageclass.set.default', {
          detail: toJS(this.store.detail),
          defaultStorageClass: this.defaultStorageClass.name,
          success: this.fetchData,
        }),
    },
    {
      key: 'funcManage',
      icon: 'slider',
      text: t('STORAGE_MANAGEMENT'),
      action: 'edit',
      onClick: () =>
        this.trigger('storageclass.volume.function.update', {
          detail: toJS(this.store.detail),
          StorageClassStore: this.store,
          success: this.fetchData,
        }),
    },
    {
      key: 'delete',
      icon: 'trash',
      text: t('DELETE'),
      action: 'delete',
      type: 'danger',
      onClick: () =>
        this.trigger('resource.delete', {
          type: this.name,
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
        name: t('PROVISIONER'),
        value: detail.provisioner,
      },
      {
        name: t('DEFAULT_STORAGE_CLASS'),
        value: detail.default ? t('YES') : '-',
      },
      {
        name: t('ALLOW_VOLUME_EXPANSION'),
        value: detail.allowVolumeExpansion ? t('TRUE') : t('FALSE'),
      },
      {
        name: t('RECLAIM_POLICY'),
        value: detail.reclaimPolicy,
      },
      {
        name: t('ALLOW_VOLUME_SNAPSHOT'),
        value: detail.supportSnapshot ? t('TRUE') : t('FALSE'),
      },
    ]
  }

  returnTolist = () => {
    this.props.rootStore.routing.push(this.listUrl)
  }

  render() {
    const stores = { detailStore: this.store }

    if (this.store.isLoading && !this.store.detail.name) {
      return <Loading className="ks-page-loading" />
    }

    const sideProps = {
      module: this.module,
      name: getDisplayName(this.store.detail),
      desc: this.store.detail.description,
      operations: this.getOperations(),
      attrs: this.getAttrs(),
      breadcrumbs: [
        {
          label: t('STORAGE_CLASS_PL'),
          url: this.listUrl,
        },
      ],
    }

    return <DetailPage stores={stores} routes={routes} {...sideProps} />
  }
}
