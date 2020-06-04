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
import { capitalize } from 'lodash'

import { Avatar, Status } from 'components/Base'
import Banner from 'components/Cards/Banner'
import withList, { ListPage } from 'components/HOCs/withList'

import Table from 'components/Tables/List'

import { getLocalTime } from 'utils'
import { getAlertMessageDesc } from 'utils/alerting'

import MessageStore from 'stores/alerting/message'

@withList({
  store: new MessageStore('workload'),
  module: 'alert-message',
  name: 'Alerting Message',
  authKey: 'alerting',
})
export default class AlertingPolicy extends React.Component {
  state = {
    type: 'unresolved',
  }

  handleTabChange = type => {
    this.setState({ type }, () => {
      this.getData()
    })
  }

  getData = params => {
    this.props.store.fetchList({
      status: this.state.type === 'all' ? 'resumed,triggered' : 'triggered',
      ...this.props.match.params,
      ...params,
    })
  }

  get tabs() {
    return {
      value: this.state.type,
      onChange: this.handleTabChange,
      options: [
        {
          value: 'unresolved',
          label: t('Unresolved'),
        },
        {
          value: 'all',
          label: t('All'),
        },
      ],
    }
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
    const { trigger } = this.props
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
          }),
      },
    ]
  }

  getTableProps() {
    const { tableProps } = this.props
    return {
      ...tableProps.tableActions,
      searchType: 'keyword',
      placeholder: t('Please input a monitoring target to find'),
      selectActions: [],
      emptyProps: {
        desc: t('ALERT_MESSAGE_DESC'),
      },
    }
  }

  getLevel = severity => {
    const str = capitalize(severity)
    return <Status type={str} name={t(str)} />
  }

  getResourceType = type => {
    const str = capitalize(type)
    return t('ALERT_TYPE', { type: t(str) })
  }

  getColumns = () => [
    {
      title: t('Alerting Message'),
      dataIndex: 'id',
      width: '30%',
      render: (id, record) => (
        <Avatar
          icon="loudspeaker"
          title={getAlertMessageDesc(record)}
          to={`${this.props.match.url}/${id}`}
        />
      ),
    },
    {
      title: t('Level'),
      dataIndex: 'severity',
      width: '15%',
      render: severity => this.getLevel(severity),
    },
    {
      title: t('Type'),
      dataIndex: 'resourceType',
      isHideable: true,
      width: '20%',
      render: type => this.getResourceType(type),
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
          tabs={this.tabs}
          icon="loudspeaker"
          title={t('Alerting Messages')}
          description={t('ALERT_MESSAGE_DESC')}
        />
        <Table
          {...tableProps}
          {...this.getTableProps()}
          itemActions={this.itemActions}
          columns={this.getColumns()}
          onCreate={this.showCreate}
        />
      </ListPage>
    )
  }
}
