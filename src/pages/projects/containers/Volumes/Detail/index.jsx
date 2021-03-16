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
import { Loading } from '@kube-design/components'

import { Status } from 'components/Base'
import { getDisplayName, getLocalTime } from 'utils'
import { trigger } from 'utils/action'
import { toJS } from 'mobx'
import Volume from 'stores/volume'
import StorageClass from 'stores/storageClass'
import StorageClassCapability from 'stores/storageclasscapabilities'

import DetailPage from 'projects/containers/Base/Detail'

import getRoutes from './routes'

@inject('rootStore')
@observer
@trigger
export default class VolumeDetail extends React.Component {
  store = new Volume()

  storageclass = new StorageClass()

  storageclasscapabilities = new StorageClassCapability()

  componentDidMount() {
    this.fetchData()
  }

  get name() {
    return 'Volume'
  }

  get module() {
    return 'volumes'
  }

  get authKey() {
    return 'volumes'
  }

  get listUrl() {
    const { isFedManaged } = toJS(this.store.detail)

    const { workspace, cluster, namespace } = this.props.match.params
    if (workspace) {
      if (isFedManaged) {
        return `/${workspace}/federatedprojects/${namespace}/${this.module}`
      }

      return `/${workspace}/clusters/${cluster}/projects/${namespace}/${this.module}`
    }
    return `/clusters/${cluster}/${this.module}`
  }

  get isFedManaged() {
    return this.store.detail.isFedManaged
  }

  fetchData = async () => {
    const { cluster } = this.props.match.params
    await this.store.fetchDetail(this.props.match.params)

    const { storageClassName } = this.store.detail
    await this.storageclass.fetchDetail({
      cluster,
      name: storageClassName,
    })

    await this.storageclasscapabilities.fetchDetail({
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
      text: t('Clone Volume'),
      icon: 'copy',
      action: 'create',
      disabled: !get(
        this.storageclasscapabilities,
        'detail.volumeFeature.clone',
        false
      ),
      onClick: () => {
        this.trigger('volume.clone', {})
      },
    },
    {
      key: 'snapshot',
      type: 'control',
      text: t('Create Snapshot'),
      icon: 'copy',
      action: 'create',
      disabled: !get(
        this.storageclasscapabilities,
        'detail.snapshotFeature.create',
        false
      ),
      onClick: () => {
        this.trigger('volume.create.snapshot', {})
      },
    },
    {
      key: 'expand',
      text: t('Expand Volume'),
      icon: 'scaling',
      action: 'edit',
      disabled: !get(
        this.storageclasscapabilities,
        'detail.supportExpandVolume',
        false
      ),
      onClick: () => {
        const { detail, isSubmitting } = this.store
        const originData = toJS(detail._originData)
        const storageClassSizeConfig = this.storageclass.getStorageSizeConfig()

        this.trigger('volume.expand', {
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
      type: 'danger',
      onClick: () =>
        this.trigger('resource.delete', {
          type: t(this.name),
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
        value: getLocalTime(createTime).format('YYYY-MM-DD HH:mm:ss'),
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
      authKey: this.authKey,
      name: getDisplayName(this.store.detail),
      desc: this.store.detail.description,
      attrs: this.getAttrs(),
      operations: this.isFedManaged ? [] : this.getOperations(),
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
        {...sideProps}
        routes={getRoutes(this.props.match.path)}
      />
    )
  }
}
