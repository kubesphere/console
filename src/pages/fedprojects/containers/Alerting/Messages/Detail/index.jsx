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
import { capitalize, isEmpty } from 'lodash'
import { Loading } from '@pitrix/lego-ui'

import { getAlertMessageDesc } from 'utils/alerting'
import { getLocalTime } from 'utils'
import { trigger } from 'utils/action'
import AlertMessageStore from 'stores/alerting/message'
import AlertPolicyStore from 'stores/alerting/policy'

import DetailPage from 'projects/containers/Base/Detail'

import routes from './routes'

@inject('rootStore')
@observer
@trigger
export default class AlertPolicyDetail extends React.Component {
  store = new AlertMessageStore('workload')

  policyStore = new AlertPolicyStore('workload')

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
    return `/cluster/${cluster}/projects/${namespace}/alert-messages`
  }

  get routing() {
    return this.props.rootStore.routing
  }

  get params() {
    return this.props.match.params
  }

  fetchData = params => {
    this.store.fetchDetail({ ...this.params, ...params })
  }

  getOperations = () => [
    {
      key: 'comment',
      type: 'default',
      text: t('ALERT_COMMENT'),
      action: 'record',
      onClick: () =>
        this.trigger('alerting.message.comment', {
          detail: this.store.detail,
          success: this.fetchData,
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
        name: t('Alerting Level'),
        value: t(detail.severity),
      },
      {
        name: t('Alerting Status'),
        value: detail.status === 'resumed' ? t('resumed') : t('triggered'),
      },
      {
        name: t('Alerting Type'),
        value: t('ALERT_TYPE', { type: t(capitalize(detail.resourceType)) }),
      },
      {
        name: this.isRecovery ? t('Recovery Time') : t('Alerting Time'),
        value: getLocalTime(detail.createTime).format('YYYY-MM-DD HH:mm:ss'),
      },
    ]
  }

  render() {
    const stores = { detailStore: this.store }

    if (this.store.isLoading && !this.store.detail.name) {
      return <Loading className="ks-page-loading" />
    }

    const { ruleName, name } = this.store.detail

    const sideProps = {
      module: this.module,
      name: t(ruleName) || name,
      desc: getAlertMessageDesc(this.store.detail),
      operations: this.getOperations(),
      attrs: this.getAttrs(),
      breadcrumbs: [
        {
          label: t('Alerting Messages'),
          url: this.listUrl,
        },
      ],
    }

    return <DetailPage stores={stores} routes={routes} {...sideProps} />
  }
}
