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
import { isEmpty } from 'lodash'
import { observer, inject } from 'mobx-react'
import { Loading } from '@kube-design/components'
import { Link } from 'react-router-dom'

import { getDisplayName, getLocalTime } from 'utils'
import { trigger } from 'utils/action'
import SubnetStore from 'stores/kubeovn/subnet'
import DetailPage from 'clusters/containers/Base/Detail'

import getRoutes from './routes'

@inject('rootStore')
@observer
@trigger
export default class SubnetsDetail extends React.Component {
  module = 'subnets'

  store = new SubnetStore()

  componentDidMount() {
    this.fetchData()
  }

  get listUrl() {
    const { cluster } = this.props.match.params
    return `/clusters/${cluster}/${this.module}`
  }

  get routing() {
    return this.props.rootStore.routing
  }

  get cluster() {
    return this.props.match.params.cluster
  }

  fetchData = () => {
    const { params } = this.props.match
    this.store.fetchDetail(params)
  }

  returnTolist = () => {
    this.props.rootStore.routing.push(this.listUrl)
  }

  getOperations = () => [
    {
      key: 'viewYaml',
      type: 'default',
      text: t('View YAML'),
      action: 'view',
      onClick: () =>
        this.trigger('resource.yaml.edit', {
          detail: toJS(this.store.detail),
          readOnly: true,
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
          readOnly: true,
        }),
    },
  ]

  getAttrs = () => {
    const { detail = {} } = this.store
    const { cluster } = this.props.match.params

    if (isEmpty(detail)) return null

    return [
      {
        name: t('Cluster'),
        value: cluster,
      },
      {
        name: t('cidrBlock'),
        value: detail.cidr,
      },
      {
        name: t('Protocol'),
        value: detail.protocol,
      },
      {
        name: t('Default_Subnet'),
        value: detail.default ? t('True') : t('False'),
      },
      {
        name: t('Namespaces'),
        value: this.renderNamespaces(),
      },
      {
        name: t('Created Time'),
        value: getLocalTime(detail.createTime).format('YYYY-MM-DD HH:mm:ss'),
      },
      {
        name: t('Updated Time'),
        value: getLocalTime(detail.updateTime).format('YYYY-MM-DD HH:mm:ss'),
      },
      {
        name: t('Creator'),
        value: detail.creator || '-',
      },
    ]
  }

  renderNamespaces() {
    const { namespaces, cluster } = this.store.detail

    if (namespaces.length === 0) {
      return '-'
    }

    return namespaces.map((namespace, index) => (
      <p key="namespace">
        <Link to={`/clusters/${cluster}/projects/${namespace}`} key={index}>
          {namespace}
        </Link>
      </p>
    ))
  }

  render() {
    const stores = { detailStore: this.store }

    if (this.store.isLoading && !this.store.detail.name) {
      return <Loading className="ks-page-loading" />
    }

    const sideProps = {
      module: this.module,
      name: getDisplayName(this.store.detail),
      desc: this.store.detail.description,
      operations: this.getOperations(),
      attrs: this.getAttrs(),
      breadcrumbs: [
        {
          label: t(this.name),
          url: `/clusters/${this.cluster}/${this.module}`,
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
