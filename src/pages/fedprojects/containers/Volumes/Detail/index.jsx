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

import { getDisplayName } from 'utils'
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
    return 'Volume'
  }

  get module() {
    return 'volumes'
  }

  get listUrl() {
    const {
      params: { workspace, namespace },
    } = this.props.match

    return `/${workspace}/federatedprojects/${namespace}/${this.module}`
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
    const { createTime, creator, resource, namespace } = detail
    if (isEmpty(detail)) return null

    const storageClassName =
      resource.storageClassName ||
      get(resource, "annotations['volume.beta.kubernetes.io/storage-class']")

    return [
      {
        name: t('Project'),
        value: namespace,
      },
      {
        name: t('Capacity'),
        value: resource.capacity,
      },
      {
        name: t('Access Mode'),
        value: resource.accessMode,
      },
      {
        name: t('Storage Class'),
        value: storageClassName,
      },
      {
        name: t('Provisioner'),
        value: get(
          resource,
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
      authKey: this.module,
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
        {...sideProps}
        routes={getRoutes(this.props.match.path)}
      />
    )
  }
}
