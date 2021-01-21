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

import { Tag } from '@kube-design/components'

import { Text } from 'components/Base'
import Banner from 'components/Cards/Banner'
import withList, { ListPage } from 'components/HOCs/withList'

import Table from 'components/Tables/List'

import { getLocalTime } from 'utils'

import { SEVERITY_LEVEL } from 'configs/alerting/metrics/rule.config'

import MessageStore from 'stores/alerting/message'

@withList({
  store: new MessageStore(),
  module: 'alerts',
  name: 'Alerting Message',
})
export default class AlertingPolicy extends React.Component {
  getData = params => {
    this.props.store.fetchList({
      ...this.props.match.params,
      ...params,
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

  getRuleLink(ruleName) {
    const { cluster, namespace, workspace } = this.props.match.params
    return `${workspace ? `/${workspace}` : ''}/clusters/${cluster}${
      namespace ? `/projects/${namespace}` : ''
    }/alert-rules/${ruleName}`
  }

  getTableProps() {
    const { tableProps } = this.props
    return {
      tableActions: {
        ...tableProps.tableActions,
        selectActions: [],
      },
      placeholder: t('Search by monitoring target'),
      searchType: 'keyword',
      emptyProps: {
        desc: t('ALERT_MESSAGE_DESC'),
      },
    }
  }

  getResourceType = type => {
    const str = capitalize(type)
    return t('ALERT_TYPE', { type: t(str) })
  }

  getColumns = () => [
    {
      title: t('Alerting Message'),
      dataIndex: 'value',
      width: '30%',
      render: (value, record) => (
        <Text
          icon="loudspeaker"
          title={get(record, 'annotations.summary')}
          description={get(record, 'annotations.message', '-')}
        />
      ),
    },
    {
      title: t('Level'),
      dataIndex: 'labels.severity',
      width: '15%',
      render: severity => {
        const level = SEVERITY_LEVEL.find(item => item.value === severity)
        if (level) {
          return <Tag type={level.type}>{t(level.label)}</Tag>
        }
        return <Tag>{severity}</Tag>
      },
    },
    {
      title: t('Alerting Policy'),
      dataIndex: 'ruleName',
      isHideable: true,
      width: '20%',
      render: ruleName => (
        <Link to={this.getRuleLink(ruleName)}>{ruleName}</Link>
      ),
    },
    {
      title: t('Time'),
      dataIndex: 'createTime',
      isHideable: true,
      render: time => getLocalTime(time).format('YYYY-MM-DD HH:mm:ss'),
    },
  ]

  render() {
    const { bannerProps, tableProps } = this.props
    return (
      <ListPage {...this.props} getData={this.getData} noWatch>
        <Banner
          {...bannerProps}
          tips={this.tips}
          icon="loudspeaker"
          title={t('Alerting Messages')}
          description={t('ALERT_MESSAGE_DESC')}
        />
        <Table
          {...tableProps}
          {...this.getTableProps()}
          rowKey="value"
          itemActions={this.itemActions}
          columns={this.getColumns()}
          onCreate={this.showCreate}
        />
      </ListPage>
    )
  }
}
