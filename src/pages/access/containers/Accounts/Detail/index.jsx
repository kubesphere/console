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
import { get, isEmpty } from 'lodash'
import { Loading } from '@kube-design/components'

import { getLocalTime } from 'utils'
import { trigger } from 'utils/action'
import UserStore from 'stores/user'

import DetailPage from 'core/containers/Base/Detail'

import routes from './routes'

@inject('rootStore')
@observer
@trigger
export default class AccountDetail extends React.Component {
  store = new UserStore()

  componentDidMount() {
    this.fetchData()
  }

  get module() {
    return 'accounts'
  }

  get authKey() {
    return 'users'
  }

  get name() {
    return 'Account'
  }

  get listUrl() {
    return '/access/accounts'
  }

  get routing() {
    return this.props.rootStore.routing
  }

  get detailDesc() {
    if (globals.config.presetUsers.includes('admin')) {
      return t(get(this.store.detail, 'description'))
    }
    return get(this.store.detail, 'description')
  }

  get showEdit() {
    const name = this.store.detail.name
    return !globals.config.presetUsers.includes(name)
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
      show: this.showEdit,
      onClick: () =>
        this.trigger('user.edit', {
          detail: toJS(this.store.detail),
          success: this.fetchData,
        }),
    },
    {
      key: 'modifyPassword',
      icon: 'pen',
      text: t('Change Password'),
      action: 'edit',
      show: this.showEdit,
      onClick: () =>
        this.trigger('user.modifypassword', {
          detail: toJS(this.store.detail),
        }),
    },
    {
      key: 'delete',
      icon: 'trash',
      text: t('Delete'),
      action: 'delete',
      type: 'danger',
      show: this.showEdit,
      onClick: () =>
        this.trigger('resource.delete', {
          type: t(this.props.name),
          resource: this.store.detail.username,
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
        name: t('Account Role'),
        value: detail.globalrole,
      },
      {
        name: t('Email'),
        value: detail.email,
      },
      {
        name: t('Last Login Time'),
        value: detail.lastLoginTime
          ? getLocalTime(detail.lastLoginTime).format(`YYYY-MM-DD HH:mm:ss`)
          : t('Not logged in yet'),
      },
    ]
  }

  render() {
    const stores = { detailStore: this.store }

    if (this.store.isLoading && !this.store.detail.username) {
      return <Loading className="ks-page-loading" />
    }

    const sideProps = {
      module: this.module,
      authKey: this.authKey,
      name: get(this.store.detail, 'username'),
      desc: this.detailDesc,
      operations: this.getOperations(),
      attrs: this.getAttrs(),
      breadcrumbs: [
        {
          label: t('NAV_ACCOUNTS'),
          url: this.listUrl,
        },
      ],
    }

    return <DetailPage stores={stores} routes={routes} {...sideProps} />
  }
}
