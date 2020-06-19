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
import { Loading } from '@pitrix/lego-ui'

import { getDisplayName, getLocalTime } from 'utils'
import { trigger } from 'utils/action'
import FederatedStore from 'stores/federated'
import RouterStore from 'stores/router'

import DetailPage from 'projects/containers/Base/Detail'

import getRoutes from './routes'

@inject('rootStore', 'projectStore')
@observer
@trigger
export default class RouteDetail extends React.Component {
  store = new FederatedStore(new RouterStore())

  componentDidMount() {
    this.fetchData()
  }

  get module() {
    return 'ingresses'
  }

  get name() {
    return 'Route'
  }

  get routing() {
    return this.props.rootStore.routing
  }

  get listUrl() {
    const {
      params: { workspace, namespace },
    } = this.props.match

    return `/${workspace}/federatedprojects/${namespace}/${this.module}`
  }

  fetchData = () => {
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
    // {
    //   key: 'editRules',
    //   icon: 'firewall',
    //   text: t('Edit Rules'),
    //   action: 'edit',
    //   onClick: () =>
    //     this.trigger('router.rules.edit', {
    //       isFederared: true,
    //       detail: this.store.detail,
    //       success: this.fetchData,
    //     }),
    // },
    // {
    //   key: 'editAnnotations',
    //   icon: 'firewall',
    //   text: t('Edit Annotations'),
    //   action: 'edit',
    //   onClick: () =>
    //     this.trigger('router.annotations.edit', {
    //       isFederared: true,
    //       detail: this.store.detail,
    //       success: this.fetchData,
    //     }),
    // },
    {
      key: 'delete',
      icon: 'trash',
      text: t('Delete'),
      action: 'delete',
      type: 'danger',
      onClick: () =>
        this.trigger('resource.delete', {
          type: t(this.name),
          detail: this.store.detail,
          success: () => this.routing.push(this.listUrl),
        }),
    },
  ]

  getAttrs = () => {
    const detail = toJS(this.store.detail)
    const { namespace } = this.props.match.params

    if (isEmpty(detail)) {
      return
    }

    return [
      {
        name: t('Project'),
        value: namespace,
      },
      {
        name: t('Application'),
        value: detail.application,
      },
      {
        name: t('Created Time'),
        value: getLocalTime(detail.createTime).format('YYYY-MM-DD HH:mm:ss'),
      },
      {
        name: t('Creator'),
        value: detail.creator,
      },
    ]
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
          label: t(`${this.name}s`),
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
