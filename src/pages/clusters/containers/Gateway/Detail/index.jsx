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
import { toJS } from 'mobx'
import { observer, inject } from 'mobx-react'
import { isEmpty } from 'lodash'
import { Loading } from '@kube-design/components'

import { getLocalTime } from 'utils'

import { trigger } from 'utils/action'
import GatewayStore from 'stores/gateway'

import DetailPage from 'clusters/containers/Base/Detail'

import getRoutes from './routes'

@inject('rootStore')
@observer
@trigger
export default class NodeDetail extends React.Component {
  store = new GatewayStore()

  componentDidMount() {
    this.fetchData()
  }

  get module() {
    return 'gateways'
  }

  get detail() {
    return this.store.gateway.data
  }

  get listUrl() {
    const { workspace } = this.props.match.params
    let url = ''
    if (workspace) {
      url = `${this.props.match.url.split('gateways')[0]}gateways`
    } else {
      url = `${this.props.match.url.split('gateways')[0]}gateways/cluster`
    }

    return url
  }

  fetchData = () => {
    const { cluster, namespace } = this.props.match.params
    this.store.getGateway({ cluster, namespace })
  }

  getOperations = () => {
    const { cluster, namespace } = this.props.match.params
    const detail = toJS(this.detail)
    return [
      {
        key: 'edit',
        icon: 'pen',
        text: t('EDIT'),
        action: 'manage',

        onClick: () =>
          this.trigger('gateways.edit', {
            cluster,
            namespace,
            detail: toJS(this.detail._originData),
            success: this.fetchData,
          }),
      },
      {
        key: 'update',
        icon: 'update',
        text: t('Update Gateway'),
        action: 'manage',
        disabled: !isEmpty(detail.createTime),
        onClick: () =>
          this.trigger('gateways.edit', {
            cluster,
            namespace,
            detail: toJS(this.detail._originData),
            success: this.fetchData,
          }),
      },
      {
        key: 'delete',
        icon: 'trash',
        text: t('DELETE'),
        action: 'delete',
        onClick: () =>
          trigger('gateways.delete', {
            cluster,
            namespace,
            detail: toJS(this.detail),
            success: this.getData,
          }),
      },
    ]
  }

  getAttrs = () => {
    const detail = toJS(this.detail)
    const { cluster } = this.props.match.params

    if (isEmpty(detail)) {
      return
    }

    return [
      {
        name: t('CLUSTER'),
        value: cluster,
      },
      {
        name: t('Create Time'),
        value: getLocalTime(detail.createTime).format('YYYY-MM-DD HH:mm:ss'),
      },
      {
        name: t('UPDATED_AT'),
        value: getLocalTime(detail.updateTime).format('YYYY-MM-DD HH:mm:ss'),
      },
      {
        name: t('CREATOR'),
        value: detail.creator,
      },
    ]
  }

  render() {
    const stores = { detailStore: this.store }
    const { workspace } = this.props.match.params
    if (this.store.gateway.isLoading && !this.store.gateway.name) {
      return <Loading className="ks-page-loading" />
    }

    const sideProps = {
      module: this.module,
      name: this.detail.name,
      operations: this.getOperations(),
      attrs: this.getAttrs(),
      breadcrumbs: [
        {
          label: workspace ? t('PROJECT_GATEWAY') : t('CLUSTER_GATEWAY'),
          url: this.listUrl,
        },
      ],
    }

    return (
      <DetailPage
        stores={stores}
        routes={getRoutes(this.props.match.path)}
        {...sideProps}
      />
    )
  }
}
