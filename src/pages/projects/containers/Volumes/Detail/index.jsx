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
import { isEmpty, get, isUndefined } from 'lodash'
import { observer, inject } from 'mobx-react'
import { Loading } from '@kube-design/components'

import { Status } from 'components/Base'
import {
  getDisplayName,
  getLocalTime,
  compareVersion,
  showNameAndAlias,
} from 'utils'
import { trigger } from 'utils/action'
import { toJS, observable } from 'mobx'
import Volume from 'stores/volume'
import StorageClass from 'stores/storageClass'

import DetailPage from 'projects/containers/Base/Detail'

import getRoutes from './routes'

@inject('rootStore')
@observer
@trigger
export default class VolumeDetail extends React.Component {
  store = new Volume()

  storageclass = new StorageClass()

  @observable
  ksVersion = ''

  componentDidMount() {
    this.fetchData()
  }

  get name() {
    return 'PERSISTENT_VOLUME_CLAIM'
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

  get disableClone() {
    return this.getDisAllowToDo('storageclass.kubesphere.io/allow-clone')
  }

  get disableSnapshot() {
    return (
      compareVersion(`${this.ksVersion}`, 'v3.3') < 0 ||
      this.getDisAllowToDo('storageclass.kubesphere.io/allow-snapshot')
    )
  }

  get allowExpand() {
    const value = get(this.storageclass.detail, 'allowVolumeExpansion', false)
    const isPending = this.store.detail.phase === 'Pending'
    return isPending ? true : !value
  }

  getDisAllowToDo = key => {
    try {
      const value = toJS(this.storageclass).detail.annotations[key]
      const isPending = this.store.detail.phase === 'Pending'
      return isUndefined(value) || isPending ? true : !JSON.parse(value)
    } catch (err) {
      return true
    }
  }

  fetchData = async () => {
    const { params } = this.props.match
    const { cluster } = params
    await this.store.fetchDetail(this.props.match.params)

    const { storageClassName } = this.store.detail
    await this.storageclass.fetchDetail({
      cluster,
      name: storageClassName,
    })
    this.ksVersion = await this.store.getKsVersion(params)
  }

  getOperations = () => [
    {
      key: 'edit',
      icon: 'pen',
      text: t('EDIT_INFORMATION'),
      action: 'edit',
      onClick: () =>
        this.trigger('resource.baseinfo.edit', {
          type: this.name,
          detail: toJS(this.store.detail),
          success: this.fetchData,
        }),
    },
    {
      key: 'editYaml',
      icon: 'pen',
      text: t('EDIT_YAML'),
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
      text: t('CLONE'),
      icon: 'copy',
      action: 'create',
      disabled: this.disableClone,
      onClick: () => {
        this.trigger('volume.clone', {})
      },
    },
    {
      key: 'snapshot',
      type: 'control',
      text: t('CREATE_SNAPSHOT'),
      icon: 'copy',
      action: 'create',
      disabled: this.disableSnapshot,
      onClick: () => {
        this.trigger('volume.create.snapshot', {
          detail: this.store.detail,
        })
      },
    },
    {
      key: 'expand',
      text: t('EXPAND'),
      icon: 'scaling',
      action: 'edit',
      disabled: this.allowExpand,
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
        name: t('PROJECT'),
        value: showNameAndAlias(namespace, 'project'),
      },
      {
        name: t('STATUS'),
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
        name: t('CAPACITY'),
        value: capacity,
      },
      {
        name: t('ACCESS_MODE_TCAP'),
        value: accessMode,
      },
      {
        name: t('STORAGE_CLASS'),
        value: storageClassName,
      },
      {
        name: t('PROVISIONER'),
        value: get(
          detail,
          "annotations['volume.beta.kubernetes.io/storage-provisioner']",
          '-'
        ),
      },
      {
        name: t('PERSISTENT_VOLUME'),
        value: get(detail, '_originData.spec.volumeName', ''),
      },
      {
        name: t('CREATION_TIME_TCAP'),
        value: getLocalTime(createTime).format('YYYY-MM-DD HH:mm:ss'),
      },
      {
        name: t('CREATOR'),
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
      operations: this.getOperations(),
      icon: 'storage',
      breadcrumbs: [
        {
          label: t('PERSISTENT_VOLUME_CLAIM_PL'),
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
