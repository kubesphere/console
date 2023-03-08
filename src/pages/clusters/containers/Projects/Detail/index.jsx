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
import { get, isEmpty, omit } from 'lodash'
import { Loading } from '@kube-design/components'

import { getDisplayName, getLocalTime, showNameAndAlias } from 'utils'
import { trigger } from 'utils/action'
import ProjectStore from 'stores/project'
import QuotaStore from 'stores/quota'
import LimitRangeStore from 'stores/limitrange'

import DetailPage from 'clusters/containers/Base/Detail'
import { Status } from 'components/Base'

import routes from './routes'

@inject('rootStore')
@observer
@trigger
export default class ProjectDetail extends React.Component {
  store = new ProjectStore()

  quotaStore = new QuotaStore()

  limitRangeStore = new LimitRangeStore()

  componentDidMount() {
    this.fetchData()

    this.quotaStore.fetch(this.params)
    this.limitRangeStore.fetchListByK8s(this.params)
  }

  get module() {
    return 'projects'
  }

  get name() {
    return 'PROJECT'
  }

  get listUrl() {
    const { cluster } = this.props.match.params
    return `/clusters/${cluster}/projects`
  }

  get routing() {
    return this.props.rootStore.routing
  }

  get isFedManaged() {
    return this.store.detail.isFedManaged
  }

  get params() {
    return get(this.props.match, 'params', {})
  }

  fetchData = () => {
    this.store.fetchDetail(this.props.match.params)
  }

  getOperations = () => {
    const type = this.name
    const detail = toJS(this.store.detail)
    const limitRanges = this.limitRangeStore.list.data
    return [
      {
        key: 'edit',
        icon: 'pen',
        text: t('EDIT_INFORMATION'),
        action: 'edit',
        type: 'control',
        onClick: () =>
          this.trigger('resource.baseinfo.edit', {
            type,
            detail: omit(detail, 'workspace'),
            success: this.fetchData,
          }),
      },
      {
        key: 'editQuota',
        icon: 'pen',
        text: t('EDIT_PROJECT_QUOTAS'),
        action: 'edit',
        onClick: () =>
          this.trigger('project.quota.edit', {
            type,
            detail,
            success: () => this.quotaStore.fetch(this.params),
          }),
      },
      {
        key: 'edit-default-resource',
        icon: 'pen',
        action: 'edit',
        text: t('EDIT_DEFAULT_CONTAINER_QUOTAS'),
        onClick: () =>
          this.trigger('project.default.resource', {
            ...this.props.match.params,
            store: this.limitRangeStore,
            detail: limitRanges[0],
            success: () => this.limitRangeStore.fetchListByK8s(this.params),
          }),
      },
      {
        key: 'delete',
        icon: 'trash',
        text: t('DELETE'),
        action: 'delete',
        type: 'danger',
        show: this.store.detail.workspace !== globals.config.systemWorkspace,
        onClick: () =>
          this.trigger('resource.delete', {
            type,
            detail: omit(detail, 'workspace'),
            success: () => this.routing.push(this.listUrl),
          }),
      },
    ]
  }

  getAttrs = () => {
    const detail = toJS(this.store.detail)

    if (isEmpty(detail)) {
      return
    }

    return [
      {
        name: t('STATUS'),
        value: <Status type={detail.status} name={t(detail.status)} />,
      },
      {
        name: t('CLUSTER'),
        value: showNameAndAlias(this.props.match.params.cluster, 'cluster'),
      },
      {
        name: t('WORKSPACE'),
        value: showNameAndAlias(detail.workspace, 'workspace'),
      },
      {
        name: t('CREATION_TIME_TCAP'),
        value: getLocalTime(detail.createTime).format('YYYY-MM-DD HH:mm:ss'),
      },
      {
        name: t('CREATOR'),
        value: detail.creator || '-',
      },
    ]
  }

  render() {
    const stores = {
      detailStore: this.store,
      quotaStore: this.quotaStore,
      limitRangeStore: this.limitRangeStore,
    }

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
          label: t('PROJECT_PL'),
          url: this.listUrl,
        },
      ],
    }

    return <DetailPage stores={stores} routes={routes} {...sideProps} />
  }
}
