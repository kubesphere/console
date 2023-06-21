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

import { Status } from 'components/Base'

import { getDisplayName, getLocalTime } from 'utils'
import { trigger } from 'utils/action'

import AlertingPolicyStore from 'stores/alerting/policy'

import DetailPage from 'clusters/containers/Base/Detail'

import getRoutes from './routes'
import styles from './index.scss'

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
    return 'ALERTING_POLICY'
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

  get resetPolicy() {
    const { match } = this.props
    const detail = toJS(this.store.detail)

    return {
      key: 'reset',
      icon: 'restart',
      text: t('RESET'),
      action: 'edit',
      onClick: () =>
        this.trigger('alerting.rule.reset', {
          type: this.type,
          cluster: match.params.cluster,
          detail,
          success: this.fetchData,
        }),
    }
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

  getOperations = () => {
    const { cluster, namespace } = this.props.match.params
    const detail = toJS(this.store.detail)
    const enabled = JSON.parse(detail.enabled)

    const commonActions = [
      {
        key: 'edit',
        icon: 'pen',
        text: t('EDIT_INFORMATION'),
        action: 'edit',
        onClick: () =>
          this.trigger('alerting.baseinfo.edit', {
            type: this.type,
            cluster,
            namespace,
            detail: toJS(this.store.detail),
            module: this.store.module,
            title: t('EDIT_ALERTING_POLICY'),
            success: this.fetchData,
          }),
      },
      {
        key: 'disablePolicy',
        icon: enabled ? 'stop' : 'start',
        text: enabled ? t('DISABLE') : t('ENABLE'),
        action: 'edit',
        onClick: () => {
          this.trigger(
            enabled ? 'alerting.rule.update' : 'enable.alerting.rule',
            {
              type: this.type,
              resourceName: this.name,
              cluster,
              namespace,
              detail,
              success: this.fetchData,
              enabled,
              title: enabled
                ? t('DISABLE_ALERTING_POLICY')
                : t('ENABLE_ALERTING_POLICY'),
            }
          )
        },
      },
      {
        key: 'editRule',
        icon: 'wrench',
        text: t('EDIT_ALERT_RULES'),
        action: 'edit',
        onClick: () => {
          this.trigger('alerting.rule.edit', {
            type: this.type,
            cluster,
            namespace,
            detail,
            success: this.fetchData,
          })
        },
      },
      {
        key: 'editYaml',
        icon: 'pen',
        text: t('EDIT_YAML'),
        action: 'edit',
        onClick: () =>
          this.trigger('alerting.yaml.edit', {
            type: this.type,
            detail,
            cluster,
            namespace,
            title: t('EDIT_ALERTING_POLICY'),
            success: this.fetchData,
          }),
      },
    ]

    if (this.type === 'builtin') {
      commonActions.push(this.resetPolicy)
    } else {
      commonActions.push({
        key: 'delete',
        icon: 'trash',
        text: t('DELETE'),
        action: 'delete',
        type: 'danger',
        onClick: () =>
          this.trigger('alerting.rule.delete', {
            type: this.name,
            cluster,
            namespace,
            detail: this.store.detail,
            success: () => this.routing.push(this.listUrl),
          }),
      })
    }

    return commonActions
  }

  getAttrs = () => {
    const detail = toJS(this.store.detail)

    if (isEmpty(detail)) {
      return
    }
    const enabled = get(detail, 'enabled')
    const createTime = get(detail, 'createTime')

    const period = get(detail, 'interval', '')
    const intervalText = {
      s: 'TIME_S',
      m: 'TIME_M',
      h: 'TIME_H',
    }

    const creator = get(detail, 'creator')

    const evaluationTime = get(detail, 'evaluationTime')

    return [
      {
        name: t('POLICY_STATUS'),
        value: (
          <Status
            className={styles.icon}
            type={JSON.parse(enabled) ? 'active' : 'disabled'}
            name={JSON.parse(enabled) ? t('ENABLED') : t('DISABLED')}
          />
        ),
      },
      {
        name: t('CHECK_INTERVAL'),
        value:
          period !== ''
            ? t(intervalText[period.slice(-1)], { num: period.slice(0, -1) })
            : '-',
      },
      {
        name: t('TIME_SPENT'),
        value:
          evaluationTime !== '-' ? t('TIME_S', { num: evaluationTime }) : '-',
      },
      {
        name: t('CREATION_TIME_TCAP'),
        value: getLocalTime(createTime).format('YYYY-MM-DD HH:mm:ss'),
      },
      {
        name: t('CREATOR'),
        value: creator !== '' ? creator : '-',
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
      icon: <img src="/assets/bell_gear_duotone.svg" />,
      breadcrumbs: [
        {
          label: t('ALERTING_POLICY_PL'),
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
