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
import ProjectStore from 'stores/project'

import DetailPage from 'clusters/containers/Base/Detail'
import { Status } from 'components/Base'

import routes from './routes'

@inject('rootStore')
@observer
@trigger
export default class ProjectDetail extends React.Component {
  store = new ProjectStore()

  componentDidMount() {
    this.fetchData()
  }

  get module() {
    return 'projects'
  }

  get name() {
    return 'Project'
  }

  get listUrl() {
    const { cluster } = this.props.match.params
    return `/clusters/${cluster}/projects`
  }

  get routing() {
    return this.props.rootStore.routing
  }

  fetchData = () => {
    this.store.fetchDetail(this.props.match.params)
  }

  getOperations = () => {
    return [
      {
        key: 'edit',
        icon: 'pen',
        text: t('Edit Info'),
        action: 'edit',
        type: 'control',
        onClick: () =>
          this.trigger('resource.baseinfo.edit', {
            type: t(this.name),
            detail: toJS(this.store.detail),
            success: this.fetchData,
          }),
      },
      {
        key: 'editQuota',
        icon: 'pen',
        text: t('Edit Quota'),
        action: 'edit',
        onClick: () =>
          this.trigger('project.quota.edit', {
            type: t(this.name),
            detail: toJS(this.store.detail),
          }),
      },
      {
        key: 'delete',
        icon: 'trash',
        text: t('Delete'),
        action: 'delete',
        type: 'danger',
        show: this.store.detail.workspace !== globals.config.systemWorkspace,
        onClick: () =>
          this.trigger('resource.delete', {
            type: t(this.name),
            detail: this.store.detail,
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
        name: t('Status'),
        value: <Status type={detail.status} name={t(detail.status)} />,
      },
      {
        name: t('Cluster'),
        value: this.props.match.params.cluster,
      },
      {
        name: t('Workspace'),
        value: detail.workspace,
      },
      {
        name: t('Created Time'),
        value: getLocalTime(detail.createTime).format('YYYY-MM-DD HH:mm:ss'),
      },
      {
        name: t('Creator'),
        value: detail.creator || '-',
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
          label: t('NAV_PROJECTS'),
          url: this.listUrl,
        },
      ],
    }

    return <DetailPage stores={stores} routes={routes} {...sideProps} />
  }
}
