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
import { isEmpty, get } from 'lodash'
import { observer, inject } from 'mobx-react'
import { Loading } from '@pitrix/lego-ui'

import { Status } from 'components/Base'
import { getDisplayName } from 'utils'
import { trigger } from 'utils/action'
import { toJS } from 'mobx'
import Volume from 'stores/volume'
import StorageClass from 'stores/storageClass'

import DetailPage from 'clusters/containers/Base/Detail'

import getRoutes from './routes'

@inject('rootStore')
@observer
@trigger
export default class VolumeDetail extends React.Component {
  store = new Volume()
  storageclass = new StorageClass()

  componentDidMount() {
    this.fetchData()
  }

  get name() {
    return 'Volume'
  }

  get authKey() {
    return 'volumes'
  }

  get listUrl() {
    const {
      params: { cluster, namespace },
      path,
    } = this.props.match
    if (path.startsWith('/clusters')) {
      return `/clusters/${cluster}/volumes`
    }

    return `/cluster/${cluster}/projects/${namespace}/volumes`
  }

  get pvcDetailInKs() {
    const { name } = this.props.match.params
    return this.store.list.data.find(pvc => pvc.name === name) || {}
  }

  fetchData = async () => {
    const { cluster, namespace, name } = this.props.match.params
    await this.store.fetchDetail(this.props.match.params)

    await this.store.fetchList({ limit: Infinity, cluster, namespace, name })

    const { storageClassName } = this.store.detail
    await this.storageclass.fetchDetail({
      cluster,
      name: storageClassName,
    })
  }

  getOperations = () => [
    {
      key: 'edit',
      icon: 'pen',
      text: t('Edit Info'),
      action: 'edit',
      onClick: () =>
        this.trigger('resource.baseinfo.edit', {
          type: t(this.name),
          detail: toJS(this.store.detail),
          success: this.fetchData,
        }),
    },
    {
      key: 'editYaml',
      icon: 'pen',
      text: t('Edit YAML'),
      action: 'edit',
      onClick: () =>
        this.trigger('resource.yaml.edit', {
          detail: this.store.detail,
          success: this.fetchData,
        }),
    },
    {
      key: 'clone',
      type: 'control',
      text: t('Volume Clone'),
      icon: 'copy',
      action: 'create',
      onClick: () => {
        this.trigger('volume.clone', {
          store: this.store,
        })
      },
    },
    {
      key: 'snapshot',
      type: 'control',
      text: t('Create Snapshot'),
      icon: 'copy',
      action: 'create',
      disabled: !get(this.pvcDetailInKs, 'allowSnapshot', false),
      onClick: () => {
        this.trigger('volume.create.snapshot', {
          store: this.store,
        })
      },
    },
    {
      key: 'expand',
      text: t('Expand Volume'),
      icon: 'scaling',
      action: 'edit',
      disabled: !get(this.storageclass, 'detail.allowVolumeExpansion', false),
      onClick: () => {
        const { detail, isSubmitting } = this.store
        const originData = toJS(detail._originData)
        const storageClassSizeConfig = this.storageclass.getStorageSizeConfig()

        this.trigger('volume.expand', {
          store: this.store,
          isExpanding: isSubmitting,
          shouldAlertVisible: detail.inUse,
          detail: originData,
          max: storageClassSizeConfig.max,
          min: storageClassSizeConfig.min,
          step: storageClassSizeConfig.step,
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
    const {
      createTime,
      creator,
      phase,
      capacity,
      namespace,
      accessMode = '-',
    } = detail
    if (isEmpty(detail)) return null

    const storageClassName =
      detail.storageClassName ||
      get(detail, "annotations['volume.beta.kubernetes.io/storage-class']")

    return [
      {
        name: t('Project'),
        value: namespace,
      },
      {
        name: t('Status'),
        value: (
          <div>
            <Status
              type={phase}
              name={t(`VOLUME_STATUS_${phase.toUpperCase()}`)}
            />
          </div>
        ),
      },
      {
        name: t('Capacity'),
        value: capacity,
      },
      {
        name: t('Access Mode'),
        value: accessMode,
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
        name: t('Create Time'),
        value: createTime,
      },
      {
        name: t('Creator'),
        value: creator,
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
      attrs: this.getAttrs(),
      operations: this.getOperations(),
      icon: 'storage',
      breadcrumbs: [
        {
          label: t('Volumes'),
          url: this.listUrl,
        },
      ],
    }

    return (
      <DetailPage
        stores={stores}
        sideProps={sideProps}
        routes={getRoutes(this.props.match.path)}
      />
    )
  }
}
