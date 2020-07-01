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
import { computed } from 'mobx'
import { observer, inject } from 'mobx-react'
import { parse } from 'qs'
import { capitalize } from 'lodash'

import { getLocalTime } from 'utils'
import { ALERT_MESSAGE_STATUS } from 'utils/constants'
import { getAlertMessageDesc } from 'utils/alerting'
import AlertMessageStore from 'stores/alerting/message'

import { Loading } from '@pitrix/lego-ui'
import { Card, Avatar, Status, Empty } from 'components/Base'
import BaseTable from 'components/Tables/Base'

import styles from './index.scss'

@inject('rootStore', 'detailStore')
@observer
export default class AlertHistory extends React.Component {
  constructor(props) {
    super(props)

    this.messageStore = new AlertMessageStore(
      this.namespace ? 'workload' : 'node'
    )
  }

  get store() {
    return this.props.detailStore
  }

  get module() {
    return this.store.module
  }

  get routing() {
    return this.props.rootStore.routing
  }

  get params() {
    return this.props.match.params
  }

  get namespace() {
    return this.params.namespace
  }

  get prefix() {
    return this.namespace
      ? `/projects/${this.namespace}/alert-message/all`
      : '/monitoring/alert-message/all'
  }

  @computed
  get list() {
    return this.messageStore.list
  }

  getSortOrder = dataIndex =>
    this.list.order === dataIndex && (this.list.reverse ? 'descend' : 'ascend')

  getFilteredValue = dataIndex => this.list.filters[dataIndex]

  componentDidMount() {
    this.unsubscribe = this.routing.history.subscribe(location => {
      if (location.pathname === this.props.match.url) {
        const params = parse(location.search.slice(1))
        this.fetchData(params)
      }
    })
  }

  componentWillUnmount() {
    this.unsubscribe && this.unsubscribe()
  }

  handleFetch = (params, refresh) => {
    this.routing.query(params, refresh)
  }

  fetchData = params => {
    const data = {
      alert_names: this.store.detail.name,
      status: 'resumed,triggered',
      ...this.params,
      ...params,
    }
    this.messageStore.fetchList(data)
  }

  getLevel = severity => {
    const str = capitalize(severity)
    return <Status type={str} name={t(str)} />
  }

  getResourceType = type => {
    const str = capitalize(type)
    return t('ALERT_TYPE', { type: t(str) })
  }

  getStatus() {
    return ALERT_MESSAGE_STATUS.map(status => ({
      text: t(status.text),
      value: status.value,
    }))
  }

  getColumns = () => {
    const status = this.getStatus()

    return [
      {
        title: t('Alerting Message'),
        dataIndex: 'id',
        width: '30%',
        render: (id, record) => (
          <Avatar
            icon="loudspeaker"
            title={getAlertMessageDesc(record)}
            to={`${this.prefix}/${record.id}`}
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
        width: '15%',
        render: type => this.getResourceType(type),
      },
      {
        title: t('Status'),
        dataIndex: 'status',
        filters: status,
        filteredValue: this.getFilteredValue('status'),
        width: '15%',
        render: val => {
          const cur = status.find(item => item.value === val) || {}
          return t(cur.text || val)
        },
      },
      {
        title: t('Time'),
        dataIndex: 'createTime',
        isHideable: true,
        render: time => getLocalTime(time).format('YYYY-MM-DD HH:mm:ss'),
      },
    ]
  }

  render() {
    const { data, isLoading, filters, total, page, limit } = this.list
    const pagination = { total, page, limit }
    const extraProps = { emptyText: <Empty /> }

    return (
      <Card title={t('Alerting History')}>
        <Loading spinning={isLoading}>
          <BaseTable
            className={styles.table}
            searchType="keyword"
            filters={filters}
            data={data}
            columns={this.getColumns()}
            pagination={pagination}
            onFetch={this.handleFetch}
            selectedRowKeys={[]}
            selectActions={[]}
            extraProps={extraProps}
          />
        </Loading>
      </Card>
    )
  }
}
