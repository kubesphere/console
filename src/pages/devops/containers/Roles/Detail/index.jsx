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

import { getDisplayName, getLocalTime } from 'utils'
import { trigger } from 'utils/action'
import RoleStore from 'stores/role'

import DetailPage from 'core/containers/Base/Detail'

import getRoutes from './routes'

@inject('rootStore')
@observer
@trigger
export default class RoleDetail extends React.Component {
  store = new RoleStore()

  componentDidMount() {
    this.fetchData()
    this.store.fetchRoleTemplates(this.props.match.params)
  }

  get module() {
    return 'roles'
  }

  get name() {
    return 'DevOps Role'
  }

  get routing() {
    return this.props.rootStore.routing
  }

  get listUrl() {
    const { workspace, cluster, namespace } = this.props.match.params

    return `/${workspace}/clusters/${cluster}/devops/${namespace}/${this.module}`
  }

  get showEdit() {
    const { name } = this.props.match.params
    return !globals.config.presetDevOpsRoles.includes(name)
  }

  fetchData = () => {
    this.store.fetchDetail(this.props.match.params)
  }

  getOperations = () => {
    const { detail } = this.store

    return [
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
        key: 'editRole',
        icon: 'pen',
        text: t('Edit Authorization'),
        action: 'edit',
        show: this.showEdit,
        onClick: () =>
          this.trigger('role.edit', {
            module: 'devopsroles',
            detail: toJS(this.store.detail),
            roleTemplates: toJS(this.store.roleTemplates.data),
            success: this.fetchData,
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
          this.trigger('role.delete', {
            detail,
            type: t(this.name),
            cluster: this.props.match.params.cluster,
            namespace: this.props.match.params.namespace,
            success: () => this.routing.push(this.listUrl),
          }),
      },
    ]
  }

  getAttrs = () => {
    const detail = toJS(this.store.detail)
    const { cluster, namespace } = this.props.match.params

    if (isEmpty(detail)) {
      return
    }

    return [
      {
        name: t('Cluster'),
        value: cluster,
      },
      {
        name: t('DevOps Project'),
        value: namespace,
      },
      {
        name: t('Created Time'),
        value: getLocalTime(detail.createTime).format('YYYY-MM-DD HH:mm:ss'),
      },
      {
        name: t('Updated Time'),
        value: getLocalTime(detail.updateTime).format('YYYY-MM-DD HH:mm:ss'),
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
          label: t('DevOps Roles'),
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
