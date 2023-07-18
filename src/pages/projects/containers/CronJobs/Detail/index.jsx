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
import { getCronJobStatus } from 'utils/status'
import { trigger } from 'utils/action'
import WorkloadStore from 'stores/workload'

import DetailPage from 'projects/containers/Base/Detail'

import getRoutes from './routes'

@inject('rootStore')
@observer
@trigger
export default class JobDetail extends React.Component {
  store = new WorkloadStore(this.module)

  componentDidMount() {
    this.fetchData()
  }

  get module() {
    return 'cronjobs'
  }

  get name() {
    return 'CRONJOB'
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
      key: 'start',
      icon: 'start',
      text: t('START'),
      action: 'edit',
      onClick: this.handleSwitch(true),
      show: this.store.detail.suspend,
    },
    {
      key: 'pause',
      icon: 'stop',
      text: t('PAUSE'),
      action: 'edit',
      onClick: this.handleSwitch(false),
      show: !this.store.detail.suspend,
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
      type: 'danger',
      onClick: () =>
        this.trigger('resource.delete', {
          type: this.name,
          detail: this.store.detail,
          success: () => this.routing.push(this.listUrl),
        }),
    },
  ]

  handleSwitch = params => () => {
    this.store.switch(this.store.detail, params).then(() => {
      this.fetchData()
    })
  }

  getAttrs = () => {
    const { detail } = this.store
    const { spec = {} } = detail
    const status = getCronJobStatus(detail)

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
        name: t('STATUS'),
        value: t(status),
      },
      {
        name: t('SCHEDULE'),
        value: spec.schedule,
      },
      {
        name: t('MAXIMUM_DELAY'),
        value: spec.startingDeadlineSeconds,
      },
      {
        name: t('SUCCESSFUL_JOBS_RETAINED'),
        value: spec.successfulJobsHistoryLimit,
      },
      {
        name: t('FAILED_JOBS_RETAINED'),
        value: spec.failedJobsHistoryLimit,
      },
      {
        name: t('CONCURRENCY_POLICY'),
        value:
          spec.concurrencyPolicy === 'Allow'
            ? t('RUN_JOBS_CONCURRENTLY')
            : spec.concurrencyPolicy === 'Forbid'
            ? t('SKIP_NEW_JOB')
            : t('SKIP_OLD_JOB'),
      },
      {
        name: t('CREATION_TIME_TCAP'),
        value: getLocalTime(detail.createTime).format('YYYY-MM-DD HH:mm:ss'),
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
          label: t(`${this.name}_PL`),
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
