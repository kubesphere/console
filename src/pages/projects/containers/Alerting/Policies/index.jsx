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
import { get } from 'lodash'

import { Tag } from '@kube-design/components'
import { Avatar, Status } from 'components/Base'
import Banner from 'components/Cards/Banner'
import withList, { ListPage } from 'components/HOCs/withList'

import Table from 'components/Tables/List'

import { getLocalTime, getDisplayName } from 'utils'
import { SEVERITY_LEVEL } from 'configs/alerting/metrics/rule.config'

import PolicyStore from 'stores/alerting/policy'

@withList({
  store: new PolicyStore(),
  module: 'rules',
  name: 'Alerting Policy',
})
export default class AlertingPolicy extends React.Component {
  get tips() {
    return [
      {
        title: t('REQUESTS_FOR_PUSH_AN_ALARM_Q'),
        description: t('REQUESTS_FOR_PUSH_AN_ALARM_A'),
      },
      {
        title: t('HOW_TO_SUPRESS_AN_ALARM_Q'),
        description: t('HOW_TO_SUPRESS_AN_ALARM_A'),
      },
    ]
  }

  get itemActions() {
    const { trigger, routing, match, getData, module } = this.props
    return [
      {
        key: 'edit',
        icon: 'pen',
        text: t('Edit'),
        action: 'edit',
        onClick: item =>
          trigger('alerting.policy.create', {
            detail: item,
            module,
            cluster: match.params.cluster,
            namespace: match.params.namespace,
            title: `${t('Edit ')}${t('alerting policy')}`,
            success: getData,
          }),
      },
      {
        key: 'delete',
        icon: 'trash',
        text: t('Delete'),
        action: 'delete',
        onClick: item =>
          trigger('resource.delete', {
            type: t(this.name),
            detail: item,
            success: routing.query,
          }),
      },
    ]
  }

  getColumns = () => [
    {
      title: t('Name'),
      dataIndex: 'name',
      render: (name, record) => (
        <Avatar
          icon="wrench"
          title={getDisplayName(record)}
          desc={record.desc}
          to={`${this.props.match.url}/${name}`}
        />
      ),
    },
    {
      title: t('Status'),
      dataIndex: 'state',
      isHideable: true,
      width: '16%',
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
      title: t('Alerting Type'),
      dataIndex: 'labels.severity',
      isHideable: true,
      width: '16%',
      render: severity => {
        const level = SEVERITY_LEVEL.find(item => item.value === severity)
        if (level) {
          return <Tag type={level.type}>{t(level.label)}</Tag>
        }
        return <Tag>{severity}</Tag>
      },
    },
    {
      title: t('Recent Alert Time'),
      dataIndex: 'alerts',
      isHideable: true,
      width: '16%',
      render: (alerts = []) => {
        const time = get(alerts, `${alerts.length - 1}.activeAt`)
        return time ? getLocalTime(time).format('YYYY-MM-DD HH:mm:ss') : '-'
      },
    },
  ]

  showCreate = () => {
    const { match, getData, module } = this.props
    return this.props.trigger('alerting.policy.create', {
      module,
      cluster: match.params.cluster,
      namespace: match.params.namespace,
      title: `${t('Add ')}${t('alerting policy')}`,
      success: getData,
    })
  }

  render() {
    const { bannerProps, tableProps } = this.props
    return (
      <ListPage {...this.props} noWatch>
        <Banner
          {...bannerProps}
          tips={this.tips}
          title={t('Alerting Policies')}
          description={t('ALERT_POLICY_DESC')}
        />
        <Table
          {...tableProps}
          searchType="name"
          itemActions={this.itemActions}
          columns={this.getColumns()}
          onCreate={this.showCreate}
        />
      </ListPage>
    )
  }
}
