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
import VolumeSnapshotClassesStore from 'stores/volumeSnapshotClasses'

import DetailPage from 'projects/containers/Base/Detail'

import getRoutes from './routes'

@inject('rootStore')
@observer
@trigger
export default class VolumeDetail extends React.Component {
  store = new VolumeSnapshotClassesStore()

  state = {
    detail: {},
  }

  componentDidMount() {
    this.fetchData()
  }

  get name() {
    return 'VOLUME_SNAPSHOT_CLASS'
  }

  get module() {
    return 'volume-snapshot-classes'
  }

  get authKey() {
    return 'volumes'
  }

  get listUrl() {
    const { cluster } = this.props.match.params

    return `/clusters/${cluster}/${this.module}`
  }

  fetchData = async () => {
    const detail = await this.store.fetchDetail(this.props.match.params)
    this.setState({
      detail,
    })
  }

  getOperations = () => {
    const { cluster, namespace } = this.props.match.params
    const { detail } = this.state

    return [
      {
        key: 'edit',
        icon: 'pen',
        text: t('EDIT_INFORMATION'),
        action: 'edit',
        onClick: () => {
          this.trigger('volume.snapshotContent.baseInfo.edit', {
            store: this.store,
            cluster,
            namespace,
            detail: this.store.detail,
            success: this.fetchData,
          })
        },
      },
      {
        key: 'editYaml',
        icon: 'pen',
        text: t('EDIT_YAML'),
        action: 'edit',
        onClick: async () => {
          this.trigger('volume.snapshot.yaml.edit', {
            store: this.store,
            detail,
            yaml: detail._originData,
            success: this.fetchData,
          })
        },
      },
      {
        key: 'delete',
        icon: 'trash',
        text: t('DELETE'),
        action: 'delete',
        onClick: () =>
          this.trigger('resource.delete', {
            title: t('DETELE_VOLUME_SNAPSHOT_CLASS'),
            type: this.name,
            detail,
            success: this.returnTolist,
          }),
      },
    ]
  }

  getAttrs = () => {
    const { detail = {} } = this.store
    const { createTime, driver, deletionPolicy } = detail

    if (isEmpty(detail)) return null

    return [
      {
        name: t('PROVISIONER'),
        value: driver,
      },
      {
        name: t('DELETION_POLICY'),
        value: deletionPolicy,
      },
      {
        name: t('CREATION_TIME_TCAP'),
        value: getLocalTime(createTime).format('YYYY-MM-DD HH:mm:ss'),
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
          label: t('VOLUME_SNAPSHOT_CLASS_PL'),
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
