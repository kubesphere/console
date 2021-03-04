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
import { Loading, Tag } from '@kube-design/components'

import { Status } from 'components/Base'

import { getDisplayName, getLocalTime } from 'utils'
import { trigger } from 'utils/action'
import { SEVERITY_LEVEL } from 'configs/alerting/metrics/rule.config'
import AlertingPolicyStore from 'stores/alerting/policy'

import DetailPage from 'clusters/containers/Base/Detail'

import Health from './Health'

import getRoutes from './routes'

@inject('rootStore')
@observer
@trigger
export default class AlertPolicyDetail extends React.Component {
  store = new AlertingPolicyStore()

  componentDidMount() {
    this.fetchData()
  }

  get module() {
    return 'alert-rules'
  }

  get name() {
    return 'alerting policy'
  }

  get type() {
    return this.props.match.url.indexOf('alert-rules/builtin') > 0
      ? 'builtin'
      : ''
  }

  get listUrl() {
    const { cluster, namespace, workspace } = this.props.match.params
    const type = this.type
    return `${workspace ? `/${workspace}` : ''}/clusters/${cluster}${
      namespace ? `/projects/${namespace}` : ''
    }/alert-rules${type ? `?type=${type}` : ''}`
  }

  get routing() {
    return this.props.rootStore.routing
  }

  fetchData = params => {
    const { cluster, namespace, name } = this.props.match.params
    if (this.store.fetchDetail) {
      this.store.fetchDetail({
        cluster,
        namespace,
        name,
        type: this.type,
        ...params,
      })
    }
  }

  getOperations = () => [
    {
      key: 'edit',
      icon: 'pen',
      text: t('Edit'),
      type: 'control',
      action: 'edit',
      onClick: () =>
        this.trigger('alerting.policy.create', {
          detail: toJS(this.store.detail),
          module: this.store.module,
          cluster: this.props.match.params.cluster,
          title: `${t('Edit ')}${t('alerting policy')}`,
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
    const severity = get(detail, 'labels.severity')
    const level = SEVERITY_LEVEL.find(item => item.value === severity)
    const alerts = get(detail, 'alerts', [])
    const time = get(alerts, `${alerts.length - 1}.activeAt`)

    return [
      {
        name: t('Status'),
        value: (
          <Status
            type={detail.state}
            name={t(`ALERT_RULE_${detail.state.toUpperCase()}`, {
              defaultValue: detail.state,
            })}
          />
        ),
      },
      {
        name: t('Alerting Type'),
        value: level ? (
          <Tag type={level.type}>{t(level.label)}</Tag>
        ) : (
          <Tag>{severity}</Tag>
        ),
      },
      {
        name: t('Health Status'),
        value: <Health detail={detail} />,
      },
      {
        name: t('Alerting Duration'),
        value: detail.duration,
      },
      {
        name: t('Alert Active Time'),
        value: time ? getLocalTime(time).format('YYYY-MM-DD HH:mm:ss') : '-',
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
      operations: this.type === 'builtin' ? [] : this.getOperations(),
      attrs: this.getAttrs(),
      breadcrumbs: [
        {
          label: t('Alerting Policies'),
          url: this.listUrl,
        },
      ],
    }

    return (
      <DetailPage
        stores={stores}
        routes={getRoutes(this.props.match.path)}
        {...sideProps}
      />
    )
  }
}
