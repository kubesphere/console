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
import { Loading, Tooltip, Icon } from '@kube-design/components'

import VolumeStore from 'stores/volume'
import { Status } from 'components/Base'
import { getDisplayName, getLocalTime } from 'utils'
import { trigger } from 'utils/action'
import { toJS } from 'mobx'
import VolumeSnapshotStore from 'stores/volumeSnapshot'

import DetailPage from 'projects/containers/Base/Detail'

import getRoutes from './routes'

@inject('rootStore')
@observer
@trigger
export default class VolumeSnapshotDetail extends React.Component {
  store = new VolumeSnapshotStore()

  componentDidMount() {
    this.fetchData()
  }

  get name() {
    return 'VOLUME_SNAPSHOT'
  }

  get module() {
    return 'volume-snapshots'
  }

  get listUrl() {
    const { workspace, cluster, namespace } = this.props.match.params
    if (workspace) {
      return `/${workspace}/clusters/${cluster}/projects/${namespace}/${this.module}`
    }
    return `/clusters/${cluster}/${this.module}`
  }

  fetchData = () => {
    this.store.fetchDetail(this.props.match.params)
  }

  showApply = () => {
    const { cluster, namespace } = this.props.match.params
    return globals.app.hasPermission({
      module: 'volumes',
      action: 'create',
      project: namespace,
      cluster,
    })
  }

  getOperations = () => [
    {
      key: 'apply',
      icon: 'storage',
      text: t('CREATE_VOLUME'),
      show: this.showApply() && this.store.detail.backupStatus === 'success',
      onClick: () => {
        const { cluster, namespace } = this.props.match.params
        this.trigger('volume.create', {
          fromSnapshot: true,
          module: 'persistentvolumeclaims',
          cluster,
          namespace,
          store: new VolumeStore(),
          noCodeEdit: true,
          extendformTemplate: {
            spec: {
              resources: {
                requests: {
                  storage: get(this.store, 'detail.restoreSize'),
                },
              },
              storageClassName: get(this.store, 'detail.snapshotClassName'),
              dataSource: {
                name: get(this.store, 'detail.name'),
                kind: 'VolumeSnapshot',
                apiGroup: 'snapshot.storage.k8s.io',
              },
            },
          },
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
      restoreSize,
      backupStatus = '',
      creator,
      errorMessage,
      namespace,
    } = detail
    if (isEmpty(detail)) return null

    return [
      {
        name: t('STATUS'),
        value: (
          <div>
            <Status
              type={backupStatus}
              name={t(`CREATE_STATUS_${backupStatus.toUpperCase()}`)}
            />{' '}
            {!isEmpty(errorMessage) && (
              <Tooltip content={errorMessage}>
                <Icon name={'question'} />
              </Tooltip>
            )}
          </div>
        ),
      },
      {
        name: t('CAPACITY'),
        value: restoreSize,
      },
      {
        name: t('CREATOR'),
        value: creator,
      },
      {
        name: t('PROJECT'),
        value: namespace,
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
      name: getDisplayName(this.store.detail),
      operations: this.getOperations(),
      attrs: this.getAttrs(),
      icon: 'snapshot',
      breadcrumbs: [
        {
          label: t('VOLUME_SNAPSHOT_PL'),
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
