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

import { trigger } from 'utils/action'
import UserStore from 'stores/user'
import WorkspaceStore from 'stores/workspace'

import DetailPage from 'core/containers/Base/Detail'

import routes from './routes'

@inject('rootStore')
@observer
@trigger
export default class MemberDetail extends React.Component {
  store = new UserStore()

  workspaceStore = new WorkspaceStore()

  componentDidMount() {
    this.fetchData()
  }

  get workspace() {
    return this.props.match.params.workspace
  }

  get module() {
    return this.store.module
  }

  get authKey() {
    return 'members'
  }

  get name() {
    return 'Workspace Member'
  }

  get listUrl() {
    return `/workspaces/${this.workspace}/members`
  }

  get routing() {
    return this.props.rootStore.routing
  }

  fetchData = () => {
    this.store.fetchDetail(this.props.match.params)
  }

  getOperations = () => [
    {
      key: 'delete',
      icon: 'trash',
      text: t('Remove from Workspace'),
      action: 'delete',
      type: 'danger',
      show: this.store.detail.name !== globals.user.username,
      onClick: () =>
        this.trigger('member.remove', {
          detail: toJS(this.store.detail),
          success: () => this.routing.push(this.listUrl),
          ...this.props.match.params,
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
        name: t('Workspace'),
        value: this.workspace,
      },
      {
        name: t('Workspace Role'),
        value: detail.workspacerole,
      },
      {
        name: t('Email'),
        value: detail.email,
      },
    ]
  }

  render() {
    const stores = {
      detailStore: this.store,
      workspaceStore: this.workspaceStore,
    }

    if (this.store.isLoading && !this.store.detail.name) {
      return <Loading className="ks-page-loading" />
    }

    const sideProps = {
      module: this.module,
      authKey: this.authKey,
      name: this.store.detail.name,
      desc: this.store.detail.email,
      operations: this.getOperations(),
      attrs: this.getAttrs(),
      breadcrumbs: [
        {
          label: t('Workspace Members'),
          url: this.listUrl,
        },
      ],
    }

    return <DetailPage stores={stores} routes={routes} {...sideProps} />
  }
}
