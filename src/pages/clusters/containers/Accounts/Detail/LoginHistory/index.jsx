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

import { Table } from '@pitrix/lego-ui'
import { Card } from 'components/Base'
import { getLocalTime } from 'utils'

import styles from './index.scss'

class LoginHistory extends React.Component {
  get store() {
    return this.props.detailStore
  }

  componentDidMount() {
    this.store.fetchLogs(this.props.match.params)
  }

  getColumns = () => [
    {
      title: t('Time'),
      dataIndex: 'login_time',
      width: '50%',
      render: time => getLocalTime(time).format(`YYYY-MM-DD HH:mm:ss`),
    },
  ]

  renderContent() {
    const { data, isLoading } = this.store.logs

    return (
      <Table
        className={styles.table}
        dataSource={toJS(data)}
        rowKey="login_time"
        columns={this.getColumns()}
        loading={isLoading}
      />
    )
  }

  render() {
    return (
      <Card title={t('Login History')} empty={t('No Login History')}>
        {this.renderContent()}
      </Card>
    )
  }
}

export default inject('rootStore')(observer(LoginHistory))
export const Component = LoginHistory
