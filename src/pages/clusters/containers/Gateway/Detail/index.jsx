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

import { getLocalTime, showNameAndAlias } from 'utils'

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
    return this.store.gateway.data || {}
  }

  get cluster() {
    const { cluster } = this.props.match.params
    const url = this.props.location.pathname

    return url.indexOf('federatedprojects') > -1
      ? localStorage.getItem('federated-cluster')
      : cluster
  }

  get namespace() {
    return this.props.match.params.namespace
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
    this.store.getGateway({ cluster: this.cluster, namespace: this.namespace })
  }

  getOperations = () => {
    const detail = toJS(this.detail)

    const baseOpt = [
      {
        key: 'edit',
        icon: 'pen',
        text: t('EDIT'),
        action: 'manage',

        onClick: () =>
          this.trigger('gateways.edit', {
            cluster: this.cluster,
            namespace: this.namespace,
            detail: toJS(this.detail._originData),
            success: this.fetchData,
          }),
      },
      {
        key: 'update',
        icon: 'update',
        text: t('UPDATE'),
        action: 'manage',
        disabled: !isEmpty(detail.createTime),
        onClick: () =>
          this.trigger('gateways.edit', {
            cluster: this.cluster,
            namespace: this.namespace,
            detail: toJS(this.detail._originData),
            success: this.fetchData,
          }),
      },
      {
        key: 'delete',
        icon: 'trash',
        text: t('DISABLE'),
        action: 'delete',
        onClick: () =>
          this.trigger('gateways.delete', {
            cluster: this.cluster,
            namespace: this.namespace,
            detail: toJS(this.detail),
            success: () => {
              location.replace(this.listUrl)
            },
          }),
      },
    ]

    !isEmpty(detail.createTime) && baseOpt.splice(1, 1)

    return baseOpt
  }

  getAttrs = () => {
    const detail = toJS(this.detail) || {}

    if (isEmpty(detail)) {
      return
    }

    return [
      {
        name: t('CLUSTER'),
        value: showNameAndAlias(this.cluster, 'cluster'),
      },
      {
        name: t('CREATION_TIME'),
        value: getLocalTime(detail.createTime).format('YYYY-MM-DD HH:mm:ss'),
      },
      {
        name: t('UPDATE_TIME_TCAP'),
        value: getLocalTime(detail.updateTime).format('YYYY-MM-DD HH:mm:ss'),
      },
      {
        name: t('CREATOR'),
        value: detail.creator,
      },
    ]
  }

  componentWillUnmount() {
    localStorage.removeItem('federated-cluster')
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
