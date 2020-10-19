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
import { Loading } from '@kube-design/components'

import { getDisplayName, getLocalTime } from 'utils'
import { getJobStatus } from 'utils/status'
import { trigger } from 'utils/action'
import WorkloadStore from 'stores/workload'
import RecordStore from 'stores/workload/record'
import ResourceStore from 'stores/workload/resource'

import DetailPage from 'projects/containers/Base/Detail'

import getRoutes from './routes'

@inject('rootStore')
@observer
@trigger
export default class JobDetail extends React.Component {
  store = new WorkloadStore(this.module)

  resourceStore = new ResourceStore(this.module)

  recordStore = new RecordStore()

  componentDidMount() {
    this.fetchData()
  }

  get module() {
    return 'jobs'
  }

  get name() {
    return 'Job'
  }

  get routing() {
    return this.props.rootStore.routing
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
      key: 'rerun',
      icon: 'refresh',
      text: t('Rerun'),
      action: 'edit',
      onClick: this.handleRerun,
    },
    {
      key: 'viewYaml',
      icon: 'eye',
      text: t('View YAML'),
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

  handleRerun = () => {
    const { detail } = this.store
    this.store.rerun(detail).then(() => {
      this.fetchData()
    })
  }

  getAttrs = () => {
    const { cluster, namespace } = this.props.match.params
    const detail = toJS(this.store.detail)
    const { spec = {} } = detail
    const status = getJobStatus(detail)

    return [
      {
        name: t('Cluster'),
        value: cluster,
      },
      {
        name: t('Project'),
        value: namespace,
      },
      {
        name: t('Status'),
        value: t(status),
      },
      {
        name: t('backoffLimit'),
        value: spec.backoffLimit,
      },
      {
        name: t('completions'),
        value: spec.completions,
      },
      {
        name: t('parallelism'),
        value: spec.parallelism,
      },
      {
        name: t('activeDeadlineSeconds'),
        value: spec.activeDeadlineSeconds,
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
    const stores = {
      detailStore: this.store,
      resourceStore: this.resourceStore,
      recordStore: this.recordStore,
    }

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
