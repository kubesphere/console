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

import { getDisplayName, getLocalTime, showNameAndAlias } from 'utils'
import { trigger } from 'utils/action'
import WorkloadStore from 'stores/workload'
import HpaStore from 'stores/workload/hpa'

import DetailPage from 'projects/containers/Base/Detail'

import getRoutes from './routes'

@inject('rootStore')
@observer
@trigger
export default class DeploymentDetail extends React.Component {
  store = new WorkloadStore(this.module)

  hpaStore = new HpaStore()

  componentDidMount() {
    this.fetchData()
  }

  get module() {
    return 'deployments'
  }

  get name() {
    return 'DEPLOYMENT'
  }

  get listUrl() {
    const { workspace, cluster, namespace } = this.props.match.params
    if (workspace) {
      return `/${workspace}/clusters/${cluster}/projects/${namespace}/${this.module}`
    }
    return `/clusters/${cluster}/${this.module}`
  }

  get routing() {
    return this.props.rootStore.routing
  }

  get isFedManaged() {
    return this.store.detail.isFedManaged
  }

  fetchData = async () => {
    const { params } = this.props.match
    await this.store.fetchDetail(params)
  }

  fetchHPA = () => {
    const { cluster, namespace, name } = this.store.detail

    const { annotations = {} } = this.store.detail
    const params = {
      cluster,
      namespace,
      name: annotations['kubesphere.io/relatedHPA'] || name,
    }

    this.hpaStore.fetchDetail(params)
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
      key: 'rollBack',
      icon: 'timed-task',
      text: t('ROLL_BACK'),
      action: 'edit',
      onClick: () =>
        this.trigger('workload.revision.rollback', {
          detail: this.store.detail,
          success: this.fetchData,
        }),
    },
    {
      key: 'editHpa',
      icon: 'firewall',
      text: t('EDIT_AUTOSCALING'),
      action: 'edit',
      onClick: () =>
        this.trigger('workload.hpa.edit', {
          detail: this.store.detail,
          success: this.fetchHPA,
        }),
    },
    {
      key: 'editConfigTemplate',
      icon: 'storage',
      text: t('EDIT_SETTINGS'),
      action: 'edit',
      onClick: () =>
        this.trigger('workload.template.edit', {
          detail: this.store.detail,
          ...this.props.match.params,
          success: this.fetchData,
          supportGpuSelect: true,
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
      key: 'redeploy',
      icon: 'restart',
      text: t('RECREATE'),
      action: 'edit',
      onClick: () =>
        this.trigger('workload.redeploy', {
          module: this.module,
          detail: this.store.detail,
        }),
    },
    {
      key: 'delete',
      icon: 'trash',
      text: t('DELETE'),
      action: 'delete',
      onClick: () =>
        this.trigger('workload.delete', {
          type: this.name,
          detail: this.store.detail,
          success: () => this.routing.push(this.listUrl),
        }),
    },
  ]

  getAttrs = () => {
    const detail = toJS(this.store.detail)
    const { cluster, namespace } = this.props.match.params

    if (isEmpty(detail)) {
      return
    }

    return [
      {
        name: t('CLUSTER'),
        value: showNameAndAlias(cluster, 'cluster'),
      },
      {
        name: t('PROJECT'),
        value: showNameAndAlias(namespace, 'project'),
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
    const stores = { detailStore: this.store, hpaStore: this.hpaStore }

    if (this.store.isLoading && !this.store.detail.name) {
      return <Loading className="ks-page-loading" />
    }

    const sideProps = {
      module: this.module,
      name: getDisplayName(this.store.detail),
      desc: this.store.detail.description,
      operations: this.isFedManaged ? [] : this.getOperations(),
      attrs: this.getAttrs(),
      breadcrumbs: [
        {
          label: t('DEPLOYMENT_PL'),
          url: this.listUrl,
        },
      ],
    }

    return (
      <DetailPage
        stores={stores}
        {...sideProps}
        routes={getRoutes(this.props.match.path)}
        watch
      />
    )
  }
}
