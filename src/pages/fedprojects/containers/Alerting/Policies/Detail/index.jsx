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
import { Loading } from '@pitrix/lego-ui'

import { getDisplayName, getLocalTime } from 'utils'
import { trigger } from 'utils/action'
import AlertingPolicyStore from 'stores/alerting/policy'

import DetailPage from 'projects/containers/Base/Detail'

import routes from './routes'

@inject('rootStore')
@observer
@trigger
export default class AlertPolicyDetail extends React.Component {
  store = new AlertingPolicyStore('workload')

  componentDidMount() {
    this.fetchData()
  }

  get module() {
    return 'alerting'
  }

  get name() {
    return 'alerting policy'
  }

  get listUrl() {
    const { cluster, namespace } = this.props.match.params
    return `/cluster/${cluster}/projects/${namespace}/alert-policies`
  }

  get routing() {
    return this.props.rootStore.routing
  }

  fetchData = params => {
    const { cluster, namespace, name } = this.props.match.params
    if (this.store.fetchDetail) {
      this.store.fetchDetail({ cluster, namespace, name, ...params })
    }
  }

  getOperations = () => [
    {
      key: 'edit',
      icon: 'pen',
      text: t('Edit Info'),
      type: 'control',
      action: 'edit',
      onClick: () =>
        this.trigger('alerting.policy.edit', {
          type: t(this.name),
          detail: toJS(this.store.ksFormatDetail),
          success: this.fetchData,
        }),
    },
    {
      key: 'changeStatus',
      icon: 'pen',
      text: t('Change Status'),
      action: 'edit',
      onClick: () =>
        this.trigger('alerting.status.edit', {
          detail: this.store.detail,
          success: this.fetchData,
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

  getAttrs = () => {
    const detail = toJS(this.store.detail)

    if (isEmpty(detail)) {
      return
    }

    return [
      {
        name: t('Status'),
        value: detail.disabled ? t('disabled') : t('active'),
      },
      {
        name: t('Created Time'),
        value: getLocalTime(detail.createTime).format('YYYY-MM-DD HH:mm:ss'),
      },
      {
        name: t('Creator'),
        value: get(detail, 'creator', t('unknown')),
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
          label: t('Alerting Policies'),
          url: this.listUrl,
        },
      ],
    }

    return <DetailPage stores={stores} routes={routes} {...sideProps} />
  }
}
