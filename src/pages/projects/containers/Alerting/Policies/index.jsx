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
import { Avatar, Status } from 'components/Base'
import Banner from 'components/Cards/Banner'
import withList, { ListPage } from 'components/HOCs/withList'

import Table from 'components/Tables/List'
import { get } from 'lodash'
import { getDisplayName, getLocalTime } from 'utils'
import { ALERTING_STATUS } from 'utils/alerting'
import { SEVERITY_LEVEL } from 'configs/alerting/metrics/rule.config'

import PolicyStore from 'stores/alerting/policy'
import { toJS } from 'mobx'
import classNames from 'classnames'
import AlertStatus from './AlertingStatus'
import styles from './index.scss'

@withList({
  store: new PolicyStore(),
  module: 'rules',
  authKey: 'alert-rules',
  name: 'ALERTING_POLICY',
})
export default class AlertingPolicy extends React.Component {
  state = {
    type: location.search.indexOf('type=builtin') > 0 ? 'builtin' : 'custom',
  }

  componentDidMount() {
    const { cluster, namespace } = this.props.match.params
    !namespace && this.props.store.fetchCount({ cluster })
  }

  get tabs() {
    const { namespace } = this.props.match.params

    if (namespace) {
      return {}
    }

    return {
      value: this.state.type,
      onChange: this.handleTabChange,
      options: [
        {
          value: 'custom',
          label: t('CUSTOM_POLICIES'),
          count: this.props.store.ruleCount,
        },
        {
          value: 'builtin',
          label: t('BUILT_IN_POLICIES'),
          count: this.props.store.builtinRuleCount,
        },
      ],
    }
  }

  handleTabChange = type => {
    this.setState({ type }, () => {
      this.props.store.list.reset()
      this.getData()
    })
  }

  getData = async ({ silent, ...params } = {}) => {
    const store = this.props.store

    silent && (store.list.silent = true)
    await store.fetchList({
      ...this.props.match.params,
      ...params,
      type: this.state.type,
    })
    store.list.silent = false
  }

  get tips() {
    return [
      {
        title: t('REQUESTS_FOR_PUSH_AN_ALARM_Q'),
        description: t('REQUESTS_FOR_PUSH_AN_ALARM_A'),
      },
    ]
  }

  get itemActions() {
    const { trigger, routing, match, name } = this.props
    const { type } = this.state

    const commonActions = [
      {
        key: 'edit',
        icon: 'pen',
        text: t('EDIT_INFORMATION'),
        action: 'edit',
        onClick: item => {
          trigger('alerting.baseinfo.edit', {
            type,
            detail: item,
            module,
            cluster: match.params.cluster,
            namespace: match.params.namespace,
            title: t('EDIT_ALERTING_POLICY'),
            success: routing.query,
          })
        },
      },
      {
        key: 'editYaml',
        icon: 'pen',
        text: t('EDIT_YAML'),
        action: 'edit',
        onClick: item =>
          trigger('alerting.yaml.edit', {
            type,
            detail: item,
            cluster: match.params.cluster,
            namespace: match.params.namespace,
            title: t('EDIT_ALERTING_POLICY'),
            success: routing.query,
          }),
      },
      {
        key: 'editRule',
        icon: 'wrench',
        text: t('EDIT_ALERT_RULES'),
        action: 'edit',
        onClick: item => {
          trigger('alerting.rule.edit', {
            type,
            detail: item,
            cluster: match.params.cluster,
            namespace: match.params.namespace,
            success: routing.query,
          })
        },
      },
      {
        key: 'disablePolicy',
        icon: item => {
          const enabled = JSON.parse(item.enabled)
          return enabled ? 'stop' : 'start'
        },
        text: item => {
          const enabled = JSON.parse(item.enabled)
          return enabled ? t('DISABLE') : t('ENABLE')
        },
        action: 'edit',
        onClick: item => {
          const enabled = JSON.parse(item.enabled)
          trigger(!enabled ? 'enable.alerting.rule' : 'alerting.rule.update', {
            type,
            detail: item,
            cluster: match.params.cluster,
            namespace: match.params.namespace,
            resourceName: name,
            success: routing.query,
            title: enabled
              ? t('DISABLE_ALERTING_POLICY')
              : t('ENABLE_ALERTING_POLICY'),
            enabled,
          })
        },
      },
    ]

    if (type === 'builtin') {
      commonActions.push(this.resetPolicy)
    } else {
      commonActions.push({
        key: 'delete',
        icon: 'trash',
        text: t('DELETE'),
        action: 'delete',
        onClick: item =>
          trigger('alerting.rule.delete', {
            type,
            name,
            cluster: match.params.cluster,
            namespace: match.params.namespace,
            detail: item,
            success: routing.query,
          }),
      })
    }

    return commonActions
  }

  get tableActions() {
    const { tableProps, trigger, name, store, match, routing } = this.props
    const { type } = this.state
    const list = toJS(store.list.data)
    const selectedRowKeys = toJS(store.list.selectedRowKeys)
    const allDisable = list
      .filter(item => selectedRowKeys.includes(item.name))
      .every(item => !JSON.parse(item.enabled))

    const allEnabled = list
      .filter(item => selectedRowKeys.includes(item.name))
      .every(item => JSON.parse(item.enabled))

    return {
      ...tableProps.tableActions,
      selectActions: [
        ...tableProps.tableActions.selectActions,
        {
          key: 'enable',
          text: t('ENABLE'),
          action: 'edit',
          disabled: allEnabled,
          onClick: () => {
            trigger('enable.alerting.rule', {
              type,
              resourceName: name,
              cluster: match.params.cluster,
              namespace: match.params.namespace,
              title: t('ENABLE_ALERTING_POLICY'),
              enabled: false,
              success: routing.query,
              batchMode: true,
            })
          },
        },
        {
          key: 'disable',
          text: t('DISABLE'),
          action: 'edit',
          disabled: allDisable,
          onClick: () => {
            trigger('alerting.rule.update', {
              type,
              resourceName: name,
              cluster: match.params.cluster,
              namespace: match.params.namespace,
              enabled: true,
              success: routing.query,
              batchMode: true,
            })
          },
        },
      ],
    }
  }

  get resetPolicy() {
    const { match, trigger, routing } = this.props
    const { type } = this.state

    return {
      key: 'reset',
      icon: 'restart',
      text: t('RESET'),
      action: 'edit',
      onClick: item =>
        trigger('alerting.rule.reset', {
          type,
          cluster: match.params.cluster,
          detail: item,
          success: routing.query,
        }),
    }
  }

  getStatus() {
    return ALERTING_STATUS.map(status => ({
      text: t(`ALERT_RULE_${status.toUpperCase()}`),
      value: status,
    }))
  }

  getEnableFilter() {
    return [
      {
        text: t('ENABLED'),
        value: 'true',
      },
      {
        text: t('DISABLED'),
        value: 'false',
      },
    ]
  }

  getAlertingTypes() {
    return SEVERITY_LEVEL.map(level => ({
      text: t(level.label),
      value: level.value,
    }))
  }

  getColumns = () => {
    const { getFilteredValue } = this.props
    return [
      {
        title: t('NAME'),
        dataIndex: 'name',
        search: true,
        render: (name, record) => (
          <Avatar
            avatar="/assets/bell_gear_duotone.svg"
            title={getDisplayName(record)}
            desc={record.description}
            className={styles['table-icon']}
            to={
              this.state.type === 'builtin'
                ? `${this.props.match.url}/builtin/${record.name}`
                : `${this.props.match.url}/${name}`
            }
          />
        ),
      },
      {
        title: t('POLICY_STATUS'),
        dataIndex: 'enable',
        filters: this.getEnableFilter(),
        filteredValue: getFilteredValue('enable'),
        isHideable: true,
        search: true,
        width: '16%',
        render: (_, record) => (
          <Status
            className={styles['status_icon']}
            type={JSON.parse(record.enabled) ? 'active' : 'disabled'}
            name={JSON.parse(record.enabled) ? t('ENABLED') : t('DISABLED')}
          />
        ),
      },
      {
        title: t('RULE_STATUS'),
        dataIndex: 'state',
        search: true,
        filters: this.getStatus(),
        isHideable: true,
        width: '16%',
        render: (_, record) => <AlertStatus rulesStats={record.rulesStats} />,
      },
      {
        title: t('TIME_SPENT'),
        dataIndex: 'evaluationTime',
        isHideable: true,
        width: '12%',
        render: value => (
          <span>{value !== '-' ? t('TIME_S', { num: value }) : value}</span>
        ),
      },
      {
        title: t('RECENT_DETECT_TIME'),
        dataIndex: 'lastEvaluation',
        isHideable: true,
        width: '15.8%',
        render: (_, record) => {
          const time = get(
            record._originDataWithStatus,
            'status.lastEvaluation'
          )
          return (
            <span>
              {time ? getLocalTime(time).format(`YYYY-MM-DD HH:mm:ss`) : '-'}
            </span>
          )
        },
      },
    ]
  }

  showCreate = () => {
    const { match, routing, module } = this.props
    return this.props.trigger('alerting.policy.create', {
      module,
      cluster: match.params.cluster,
      namespace: match.params.namespace,
      title: t('CREATE_ALERTING_POLICY'),
      success: routing.query,
    })
  }

  render() {
    const { bannerProps, tableProps } = this.props

    const rowKey = 'name'
    let onCreate = this.showCreate
    const tableActions = this.tableActions

    if (this.state.type === 'builtin') {
      tableActions.selectActions = tableActions.selectActions
        .filter(item => item.action !== 'delete')
        .concat(this.resetPolicy)
      onCreate = null
    }

    return (
      <ListPage {...this.props} getData={this.getData} noWatch>
        <Banner
          {...bannerProps}
          icon={() => <img src="/assets/bell_gear_duotone.svg" />}
          tips={this.tips}
          tabs={this.tabs}
          className={classNames(styles.tab_button, bannerProps.className)}
        />
        <Table
          {...tableProps}
          rowKey={rowKey}
          itemActions={this.itemActions}
          columns={this.getColumns()}
          tableActions={tableActions}
          onCreate={onCreate}
        />
      </ListPage>
    )
  }
}
