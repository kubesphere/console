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

import { Table, Pagination } from '@kube-design/components'
import { Card, Indicator } from 'components/Base'
import { getLocalTime } from 'utils'

import styles from './index.scss'

@inject('rootStore', 'detailStore')
@observer
export default class LoginHistory extends React.Component {
  get store() {
    return this.props.detailStore
  }

  componentDidMount() {
    this.fetchData()
  }

  fetchData = (params = {}) => {
    const { name } = this.store.detail
    this.store.fetchLoginRecords({ name, ...params })
  }

  handlePagination = page => {
    this.fetchData({ page })
  }

  getColumns = () => [
    {
      title: t('TIME'),
      dataIndex: 'createTime',
      render: time => getLocalTime(time).format(`YYYY-MM-DD HH:mm:ss`),
    },
    {
      title: t('STATUS'),
      dataIndex: 'spec.success',
      render: success => (
        <div className={styles.status}>
          <Indicator type={success ? 'success' : 'failed'} />{' '}
          <span>{success ? t('SUCCESSFUL') : t('FAILED')}</span>
        </div>
      ),
    },
    {
      title: t('SOURCE_IP_ADDRESS'),
      dataIndex: 'spec.sourceIP',
    },
    {
      title: t('REASON'),
      dataIndex: 'spec.reason',
    },
  ]

  renderContent() {
    const { data } = toJS(this.store.records)

    return (
      <Table
        className={styles.table}
        dataSource={data}
        rowKey="login_time"
        columns={this.getColumns()}
      />
    )
  }

  render() {
    const { page, total, limit } = this.store.records
    return (
      <Card title={t('LOGIN_HISTORY')} empty={t('NO_LOGIN_HISTORY')}>
        {this.renderContent()}
        {total > limit && (
          <div className="margin-t12 text-right">
            <Pagination
              page={page}
              total={total}
              limit={limit}
              onChange={this.handlePagination}
            />
          </div>
        )}
      </Card>
    )
  }
}
