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

import { getDisplayName, getLocalTime } from 'utils'
import { trigger } from 'utils/action'
import { toJS } from 'mobx'
import Volume from 'stores/volume'
import FederatedStore from 'stores/federated'
import StorageClass from 'stores/storageClass'

import DetailPage from 'projects/containers/Base/Detail'

import getRoutes from './routes'

@inject('rootStore', 'projectStore')
@observer
@trigger
export default class VolumeDetail extends React.Component {
  store = new FederatedStore(new Volume())

  storageclass = new StorageClass()

  componentDidMount() {
    this.fetchData()
  }

  get name() {
    return 'PERSISTENT_VOLUME_CLAIM'
  }

  get module() {
    return 'volumes'
  }

  get listUrl() {
    const { workspace, cluster, namespace } = this.props.match.params

    if (workspace) {
      return `/${workspace}/federatedprojects/${namespace}/${this.module}`
    }

    return `/clusters/${cluster}/${this.module}`
  }

  fetchData = async () => {
    const { params } = this.props.match
    const clusters = this.props.projectStore.detail.clusters.map(
      item => item.name
    )
    this.store.fetchDetail(params)
    this.store.fetchResources({
      ...params,
      clusters,
    })
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
      key: 'editConfigTemplate',
      icon: 'storage',
      text: t('EDIT_SETTINGS'),
      action: 'edit',
      onClick: () =>
        this.trigger('volume.template.edit', {
          module: this.module,
          detail: this.store.detail,
          ...this.props.match.params,
          success: this.fetchData,
          isFederated: true,
          isEdit: true,
          projectDetail: this.props.projectStore.detail,
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

    const {
      createTime,
      creator,
      namespace,
      capacity,
      accessMode,
      storageClassName,
      annotations = {},
    } = detail

    return [
      {
        name: t('PROJECT'),
        value: namespace,
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
        value:
          storageClassName ||
          annotations['volume.beta.kubernetes.io/storage-class'],
      },
      {
        name: t('PROVISIONER'),
        value:
          annotations['volume.beta.kubernetes.io/storage-provisioner'] || '-',
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
      authKey: this.module,
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
