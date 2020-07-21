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

import { Tooltip, Icon } from '@pitrix/lego-ui'
import { Avatar } from 'components/Base'
import Banner from 'components/Cards/Banner'
import withList, { ListPage } from 'components/HOCs/withList'

import Table from 'components/Tables/List'

import { getLocalTime, getDisplayName } from 'utils'
import { getMonitoringRuleInfo } from 'utils/alerting'

import PolicyStore from 'stores/alerting/policy'

@withList({
  store: new PolicyStore('workload'),
  module: 'alerting-policy',
  name: 'Alerting Policy',
  authKey: 'alerting',
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
    const { trigger, routing } = this.props
    return [
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
      title: t('Monitoring Rules'),
      dataIndex: 'metrics',
      isHideable: true,
      width: '24%',
      render: metrics => {
        const monitorRule = getMonitoringRuleInfo(metrics)
        return (
          <div>
            {Object.entries(monitorRule).map(([key, value]) => (
              <Tooltip
                key={key}
                content={
                  <div>
                    {value.map(item => (
                      <p key={item}>{t(item)}</p>
                    ))}
                  </div>
                }
              >
                <Icon name={key} size={24} />
              </Tooltip>
            ))}
          </div>
        )
      },
    },
    {
      title: t('Recent Alert Time'),
      dataIndex: 'recentAlertTime',
      isHideable: true,
      width: '24%',
      render: time =>
        time ? getLocalTime(time).format('YYYY-MM-DD HH:mm:ss') : '-',
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
          searchType="keyword"
          itemActions={this.itemActions}
          columns={this.getColumns()}
          onCreate={this.showCreate}
        />
      </ListPage>
    )
  }
}
