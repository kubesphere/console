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

import { Status } from 'components/Base'
import { getDisplayName, getLocalTime, memoryFormat } from 'utils'
import { trigger } from 'utils/action'
import VolumeSnapshotContent from 'stores/volumeSnapshotContent'

import DetailPage from 'projects/containers/Base/Detail'

import getRoutes from './routes'

@inject('rootStore')
@observer
@trigger
export default class VolumeDetail extends React.Component {
  store = new VolumeSnapshotContent()

  componentDidMount() {
    this.fetchData()
  }

  get name() {
    return 'VOLUME_SNAPSHOT_CONTENT'
  }

  get module() {
    return 'snapshot-content'
  }

  get authKey() {
    return 'volumes'
  }

  get listUrl() {
    const { cluster } = this.props.match.params

    return `/clusters/${cluster}/volume-snapshots/${this.module}`
  }

  fetchData = async () => {
    await this.store.fetchDetail(this.props.match.params)
  }

  getOperations = () => {
    const { cluster, namespace } = this.props.match.params

    return [
      {
        key: 'view',
        icon: 'eye',
        text: t('VIEW_YAML'),
        action: 'view',
        onClick: async () => {
          this.trigger('resource.yaml.edit', {
            readOnly: true,
            detail: this.store.detail,
            yaml: this.store.detail._originData,
          })
        },
      },
      {
        key: 'edit',
        icon: 'pen',
        text: t('EDIT_INFORMATION'),
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
        key: 'delete',
        icon: 'trash',
        text: t('DELETE'),
        action: 'delete',
        onClick: () =>
          this.trigger('resource.delete', {
            type: this.name,
            detail: this.store.detail,
            success: this.returnTolist,
          }),
      },
    ]
  }

  getAttrs = () => {
    const { detail = {} } = this.store
    const {
      createTime,
      creator,
      status,
      restoreSize,
      snapshotClassName,
      snapshotHandle,
      driver,
      deletionPolicy,
    } = detail

    if (isEmpty(detail)) return null

    return [
      {
        name: t('STATUS'),
        value: (
          <div>
            <Status type={status} name={t(status.toUpperCase())} />
          </div>
        ),
      },
      {
        name: t('CAPACITY'),
        value: `${memoryFormat(restoreSize, 'Gi')}Gi`,
      },
      {
        name: t('VOLUME_SNAPSHOT_CLASS'),
        value: snapshotClassName,
      },
      {
        name: t('SNAPSHOT_HANDLE'),
        value: snapshotHandle,
      },
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
      {
        name: t('CREATOR'),
        value: creator === '' ? '-' : creator,
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
          label: t('VOLUME_SNAPSHOT_CONTENT_PL'),
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
