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
import { capitalize, get } from 'lodash'
import { Link } from 'react-router-dom'
import classNames from 'classnames'

import { Text, Status } from 'components/Base'
import Banner from 'components/Cards/Banner'
import withList, { ListPage } from 'components/HOCs/withList'

import Table from 'components/Tables/List'

import { getLocalTime } from 'utils'
import { MODULE_KIND_MAP } from 'utils/constants'
import { getAlertingResource } from 'utils/alerting'

import { SEVERITY_LEVEL } from 'configs/alerting/metrics/rule.config'

import MessageStore from 'stores/alerting/message'
import styles from './index.scss'

export const severityOptions = [
  {
    label: t('CRITICAL_ALERT'),
    value: 'critical',
    bgColor: '#CA2621',
    color: '#FFFFFF',
  },
  {
    label: t('ERROR_ALERT'),
    value: 'error',
    color: '#FFFFFF',
    bgColor: '#F5A623',
  },
  {
    label: t('WARNING_ALERT'),
    value: 'warning',
    color: '#36435C',
    bgColor: '#D8DEE5',
  },
]
@withList({
  store: new MessageStore(),
  module: 'alerts',
  name: 'ALERTING_MESSAGE',
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
    return {
      value: this.state.type,
      onChange: this.handleTabChange,
      options: [
        {
          value: 'custom',
          label: t('ALERTS_FROM_CUSTOM_POLICIES'),
          count: this.props.store.ruleCount,
        },
        {
          value: 'builtin',
          label: t('ALERTS_FROM_BUILT_IN_POLICIES'),
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

  get tips() {
    return [
      {
        title: t('REQUESTS_FOR_TRIGGER_AN_ALARM_Q'),
        description: t('REQUESTS_FOR_TRIGGER_AN_ALARM_A'),
      },
    ]
  }

  getData = params => {
    this.props.store.fetchList({
      ...this.props.match.params,
      ...params,
      sortBy: 'activeAt',
      type: this.state.type,
    })
  }

  getPrefix({ cluster, namespace } = {}) {
    const {
      cluster: _cluster,
      namespace: _namespace,
      workspace,
    } = this.props.match.params
    cluster = cluster || _cluster
    namespace = namespace || _namespace
    return `${workspace ? `/${workspace}` : ''}/clusters/${cluster}${
      namespace ? `/projects/${namespace}` : ''
    }`
  }

  getTableProps() {
    const { tableProps } = this.props
    return {
      tableActions: {
        ...tableProps.tableActions,
        selectActions: [],
      },
      emptyProps: {
        desc: t('ALERTING_MESSAGE_EMPTY_DESC'),
      },
    }
  }

  getResourceType = type => {
    const str = capitalize(type)
    return t('ALERT_TYPE', { type: t(str) })
  }

  getAlertingTypes() {
    return SEVERITY_LEVEL.map(level => ({
      text: t(level.label),
      value: level.value,
    }))
  }

  getStatus() {
    return ['pending', 'firing'].map(status => ({
      text: t(`ALERT_RULE_${status.toUpperCase()}`),
      value: status,
    }))
  }

  getColumns = () => {
    const { getFilteredValue, getSortOrder } = this.props
    return [
      {
        title: t('MESSAGE'),
        dataIndex: 'name',
        render: (_, record) => (
          <Text
            icon="loudspeaker"
            title={get(record, 'annotations.summary')}
            description={
              get(record, 'annotations.message') ||
              get(record, 'annotations.description', '-')
            }
          />
        ),
      },
      {
        title: t('STATUS'),
        dataIndex: 'state',
        filters: this.getStatus(),
        filteredValue: getFilteredValue('state'),
        isHideable: true,
        search: true,
        width: '12%',
        render: state => (
          <Status
            type={state}
            name={t(`ALERT_RULE_${state.toUpperCase()}`, {
              defaultValue: state,
            })}
          />
        ),
      },
      {
        title: t('SEVERITY'),
        dataIndex: 'labels.severity',
        filters: this.getAlertingTypes(),
        filteredValue: getFilteredValue('labels.severity'),
        isHideable: true,
        search: true,
        width: '12%',
        render: severity => {
          const level = severityOptions.find(item => item.value === severity)
          if (level) {
            return (
              <span
                style={{
                  backgroundColor: level.bgColor,
                  color: level.color,
                  fontWeight: 600,
                  padding: '0px 4px',
                }}
              >
                {t(level.label)}
              </span>
            )
          }
          return '-'
        },
      },
      {
        title: t('ALERTING_POLICY'),
        dataIndex: 'ruleName',
        isHideable: true,
        width: '12%',
        render: (_, record) => {
          const ruleName = get(record, 'labels.rule_group')
          return (
            <Link
              to={
                this.state.type === 'builtin'
                  ? `${this.getPrefix()}/alert-rules/builtin/${ruleName}`
                  : `${this.getPrefix()}/alert-rules/${ruleName}`
              }
            >
              {ruleName}
            </Link>
          )
        },
      },
      {
        title: t('MONITORING_TARGET'),
        dataIndex: 'labels',
        isHideable: true,
        width: '16%',
        render: labels => {
          const { rule_type } = labels
          if (rule_type !== 'template') {
            return '-'
          }

          const { module, name, namespace } = getAlertingResource(labels)
          if (!module) {
            return '-'
          }

          if (module === 'hpas') {
            return (
              <span>
                {t(MODULE_KIND_MAP[module])}: {name}
              </span>
            )
          }
          return (
            <Link to={`${this.getPrefix({ namespace })}/${module}/${name}`}>
              {t(MODULE_KIND_MAP[module])}: {name}
            </Link>
          )
        },
      },
      {
        title: t('TRIGGER_TIME'),
        dataIndex: 'activeAt',
        isHideable: true,
        width: 200,
        sorter: true,
        sortOrder: getSortOrder('activeAt'),
        render: time => getLocalTime(time).format('YYYY-MM-DD HH:mm:ss'),
      },
    ]
  }

  render() {
    const { bannerProps, tableProps } = this.props
    return (
      <ListPage {...this.props} getData={this.getData} noWatch>
        <Banner
          {...bannerProps}
          tips={this.tips}
          tabs={this.tabs}
          icon="loudspeaker"
          title={t('ALERTING_MESSAGE_PL')}
          description={t('ALERT_MESSAGE_DESC')}
          className={classNames(styles.tab_button, bannerProps.className)}
        />
        <Table
          {...tableProps}
          {...this.getTableProps()}
          rowKey="id"
          itemActions={[]}
          columns={this.getColumns()}
          onCreate={this.showCreate}
        />
      </ListPage>
    )
  }
}
