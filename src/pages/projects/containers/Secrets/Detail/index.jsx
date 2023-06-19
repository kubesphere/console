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
import { SECRET_TYPES } from 'utils/constants'
import SecretStore from 'stores/secret'

import DetailPage from 'projects/containers/Base/Detail'

import getRoutes from './routes'

@inject('rootStore')
@observer
@trigger
export default class SecretDetail extends React.Component {
  store = new SecretStore()

  showSetDefault = record =>
    record.type === 'kubernetes.io/dockerconfigjson' && !record.isDefault

  componentDidMount() {
    this.fetchData()
  }

  get module() {
    return 'secrets'
  }

  get name() {
    return 'SECRET'
  }

  get routing() {
    return this.props.rootStore.routing
  }

  get listUrl() {
    const { isFedManaged } = toJS(this.store.detail)

    const { workspace, cluster, namespace } = this.props.match.params
    if (workspace) {
      if (isFedManaged) {
        return `/${workspace}/federatedprojects/${namespace}/${this.module}`
      }

      return `/${workspace}/clusters/${cluster}/projects/${namespace}/${this.module}`
    }
    return `/clusters/${cluster}/${this.module}`
  }

  get isFedManaged() {
    return this.store.detail.isFedManaged
  }

  fetchData = () => {
    this.store.fetchDetail(this.props.match.params)
  }

  getOperations = () => {
    return [
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
        key: 'editSecret',
        icon: 'pen',
        text: t('EDIT_SETTINGS'),
        action: 'edit',
        onClick: () =>
          this.trigger('secret.edit', {
            detail: this.store.detail,
            success: this.fetchData,
          }),
      },
      this.showSetDefault(this.store.detail)
        ? {
            key: 'default',
            icon: 'star',
            text: t('SET_DEFAULT_REPOSITORY'),
            action: 'edit',
            onClick: () => {
              this.trigger('secret.default', {
                detail: this.store.detail,
                cluster: this.props.match.params.cluster,
                success: () => {
                  this.fetchData()
                },
              })
            },
          }
        : undefined,
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
    ].filter(Boolean)
  }

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
        name: t('TYPE'),
        value: t(SECRET_TYPES[detail.type] || detail.type),
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
      operations: this.isFedManaged ? [] : this.getOperations(),
      attrs: this.getAttrs(),
      breadcrumbs: [
        {
          label: t('SECRET_PL'),
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
