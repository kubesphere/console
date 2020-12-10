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
import AppRepoStore from 'stores/openpitrix/repo'

import DetailPage from 'core/containers/Base/Detail'

import routes from './routes'

@inject('rootStore')
@observer
@trigger
export default class RepoDetail extends React.Component {
  store = new AppRepoStore()

  componentDidMount() {
    this.fetchData()
  }

  get module() {
    return this.store.module
  }

  get authKey() {
    return 'app-repos'
  }

  get name() {
    return 'App Repo'
  }

  get listUrl() {
    const { workspace } = this.props.match.params
    return `/workspaces/${workspace}/repos`
  }

  get routing() {
    return this.props.rootStore.routing
  }

  get showEdit() {
    const { workspace, name } = this.props.match.params
    return !globals.config.presetWorkspaceRoles.includes(
      name.slice(workspace.length + 1)
    )
  }

  get workspace() {
    return this.props.match.params.workspace
  }

  fetchData = () => {
    this.store.fetchDetail(this.props.match.params)
  }

  getOperations = () => [
    {
      key: 'edit',
      icon: 'pen',
      type: 'control',
      text: t('Edit'),
      action: 'edit',
      onClick: () =>
        this.trigger('openpitrix.repo.edit', {
          detail: toJS(this.store.detail),
          workspace: this.workspace,
          success: this.fetchData,
        }),
    },
    {
      key: 'delete',
      icon: 'trash',
      type: 'danger',
      text: t('Delete'),
      action: 'delete',
      onClick: () =>
        this.trigger('resource.delete', {
          type: t(this.name),
          detail: toJS(this.store.detail),
          success: () => this.routing.push(this.listUrl),
        }),
    },
  ]

  getAttrs = () => {
    const detail = toJS(this.store.detail)

    if (isEmpty(detail)) {
      return
    }

    return [
      {
        name: t('Created Time'),
        value: getLocalTime(detail.createTime).format(`YYYY-MM-DD HH:mm:ss`),
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
      authKey: this.authKey,
      name: this.store.detail.name,
      desc: this.store.detail.description,
      operations: this.getOperations(),
      attrs: this.getAttrs(),
      breadcrumbs: [
        {
          label: t('App Repos'),
          url: this.listUrl,
        },
      ],
    }

    return <DetailPage stores={stores} routes={routes} {...sideProps} />
  }
}
