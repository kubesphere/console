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
import PV from 'stores/pv'

import DetailPage from 'projects/containers/Base/Detail'

import getRoutes from './routes'

@inject('rootStore')
@observer
@trigger
export default class VolumeDetail extends React.Component {
  store = new PV()

  componentDidMount() {
    this.fetchData()
  }

  get name() {
    return 'PERSISTENT_VOLUME'
  }

  get module() {
    return 'persistentvolumes'
  }

  get authKey() {
    return 'persistentvolumes'
  }

  get listUrl() {
    const { cluster } = this.props.match.params

    return `/clusters/${cluster}/volumes/PV`
  }

  get isFedManaged() {
    return this.store.detail.isFedManaged
  }

  fetchData = async () => {
    await this.store.fetchDetail(this.props.match.params)
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
      key: 'viewYaml',
      icon: 'eye',
      text: t('VIEW_YAML'),
      action: 'view',
      onClick: () =>
        this.trigger('resource.yaml.edit', {
          detail: this.store.detail,
          readOnly: true,
        }),
    },
    {
      key: 'delete',
      icon: 'trash',
      text: t('DELETE'),
      action: 'delete',
      type: 'danger',
      disabled:
        ['Bound', 'Released'].indexOf(get(this.store.detail, 'phase')) > -1,
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
      phase,
      storageClassName,
      volumeHandle,
      persistentVolumeReclaimPolicy,
      accessModes = ['-'],
      capacity,
      volumeMode,
    } = detail
    if (isEmpty(toJS(detail))) return null

    return [
      {
        name: t('STATUS'),
        value: (
          <div>
            <Status type={phase} name={t(`PV_STATUS_${phase.toUpperCase()}`)} />
          </div>
        ),
      },
      {
        name: t('CAPACITY'),
        value: capacity,
      },
      {
        name: t('ACCESS_MODE_TCAP'),
        value: accessModes.join(','),
      },
      {
        name: t('STORAGE_CLASS'),
        value: storageClassName,
      },
      {
        name: t('VOLUME_HANDLE'),
        value: volumeHandle,
      },
      {
        name: t('RECLAIM_POLICY'),
        value: persistentVolumeReclaimPolicy,
      },
      {
        name: t('VOLUME_MODE'),
        value: t(`VOLUME_MODE_${volumeMode.toUpperCase()}`),
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
      operations: this.isFedManaged ? [] : this.getOperations(),
      icon: 'storage',
      breadcrumbs: [
        {
          label: t('PERSISTENT_VOLUME_PL'),
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
