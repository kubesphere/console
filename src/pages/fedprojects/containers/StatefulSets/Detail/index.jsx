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

import { Loading } from '@kube-design/components'
import { isEmpty } from 'lodash'
import { toJS } from 'mobx'
import { inject, observer } from 'mobx-react'

import DetailPage from 'projects/containers/Base/Detail'
import React from 'react'
import FederatedStore from 'stores/federated'
import WorkloadStore from 'stores/workload'

import { getDisplayName, getLocalTime, showNameAndAlias } from 'utils'
import { trigger } from 'utils/action'

import getRoutes from './routes'

@inject('rootStore', 'projectStore')
@observer
@trigger
export default class DeploymentDetail extends React.Component {
  store = new FederatedStore(new WorkloadStore(this.module))

  componentDidMount() {
    this.fetchData()
  }

  get module() {
    return 'statefulsets'
  }

  get name() {
    return 'STATEFULSET'
  }

  get listUrl() {
    const { workspace, cluster, namespace } = this.props.match.params

    if (workspace) {
      return `/${workspace}/federatedprojects/${namespace}/${this.module}`
    }

    return `/clusters/${cluster}/${this.module}`
  }

  get routing() {
    return this.props.rootStore.routing
  }

  fetchData = async () => {
    const { params } = this.props.match
    await this.store.fetchDetail(params)
    await this.store.fetchResources({
      ...params,
      clusters: this.store.detail.clusters.map(item => item.name),
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
        this.trigger('federated.workload.template.edit', {
          detail: this.store.detail,
          projectDetail: this.props.projectStore.detail,
          module: this.module,
          ...this.props.match.params,
          success: this.fetchData,
          isFederated: true,
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
      onClick: () =>
        this.trigger('resource.delete', {
          type: this.name,
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
        name: t('PROJECT'),
        value: showNameAndAlias(namespace, 'federatedProject'),
      },
      {
        name: t('APP'),
        value: detail.app,
      },
      {
        name: t('CREATION_TIME_TCAP'),
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
          label: t('STATEFULSET_PL'),
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
