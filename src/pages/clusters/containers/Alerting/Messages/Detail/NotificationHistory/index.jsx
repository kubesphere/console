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
import { computed, toJS } from 'mobx'
import { observer, inject } from 'mobx-react'
import { isEmpty, get } from 'lodash'

import { getLocalTime } from 'utils'

import { Icon, Table } from '@pitrix/lego-ui'
import { Card } from 'components/Base'

import styles from './index.scss'

class NotificationHistory extends React.Component {
  get module() {
    return this.props.module
  }

  get routing() {
    return this.props.rootStore.routing
  }

  get params() {
    return this.props.match.params
  }

  get store() {
    return this.props.detailStore
  }

  @computed
  get detail() {
    const data = toJS(this.store.notifications.data) || []
    return data[0] || {}
  }

  @computed
  get notificationTime() {
    return get(this.detail, 'create_time.seconds')
  }

  componentDidMount() {
    this.fetchData()
  }

  fetchData = () => {
    const { ruleId, resource_name } = this.store.detail
    const params = {
      ruleId,
      resourceName: resource_name,
      recent: true,
      status: 'sent_success,sent_failed',
      ...this.params,
    }
    this.store.fetchNotifications(params)
  }

  getColumns = () => [
    {
      title: t('Time'),
      dataIndex: 'time',
      width: '35%',
      render: () =>
        getLocalTime(this.notificationTime * 1000).format(
          'YYYY-MM-DD HH:mm:ss'
        ),
    },
    {
      title: t('Receiver'),
      dataIndex: 'address',
      width: '35%',
      render: receiver => receiver || '-',
    },
    {
      title: t('Status'),
      dataIndex: 'status',
      render: status => t(status) || '-',
    },
  ]

  renderHeader() {
    const { total } = this.store.notifications

    return (
      <div className={styles.header}>
        <Icon name="loudspeaker" size={20} />
        {t('NOTIFY_CURRENT_COUNT', { count: total })}
      </div>
    )
  }

  render() {
    const { isLoading } = this.store.notifications
    const data = this.detail.notificationStatus

    return (
      <Card
        title={t('Recent Notification')}
        loading={isLoading}
        isEmpty={isEmpty(data)}
        empty={t('No Relevant Data')}
      >
        {this.renderHeader()}
        <Table
          className={styles.table}
          dataSource={data}
          columns={this.getColumns()}
        />
      </Card>
    )
  }
}

export default inject('rootStore', 'detailStore')(observer(NotificationHistory))
export const Component = NotificationHistory
