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
import { capitalize } from 'lodash'

import { getLocalTime } from 'utils'
import { getAlertMessageDesc } from 'utils/alerting'
import AlertMessageStore from 'stores/alerting/message'

import { Empty, Avatar, Status } from 'components/Base'
import EmptyList from 'components/Cards/EmptyList'
import BaseTable from 'components/Tables/Base'
import Base from 'core/containers/Base/List'

class UnresolvedMessage extends Base {
  init() {
    this.store = new AlertMessageStore(this.level)
  }

  get level() {
    const { namespace } = this.params
    return namespace ? 'workload' : 'node'
  }

  get module() {
    return 'alert-message'
  }

  get params() {
    return this.props.match.params
  }

  get name() {
    return 'message'
  }

  getData(params) {
    this.store.fetchList({
      status: 'triggered',
      ...this.props.match.params,
      ...params,
    })
  }

  getTableProps() {
    return {
      searchType: 'keyword',
      placeholder: t('Please input a monitoring target to find'),
      onFetch: this.handleFetch,
      selectActions: [],
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
          to={`${this.prefix}/${id}`}
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

  renderEmpty() {
    return (
      <EmptyList
        icon="bell"
        title={t('NO_RESOURCE', { resource: t('triggered alerting messages') })}
      />
    )
  }

  renderHeader() {}

  renderTable() {
    const {
      data,
      filters = {},
      keyword,
      selectedRowKeys,
      isLoading,
      total,
      page,
      limit,
    } = this.list
    const pagination = { total, page, limit }
    const extraProps = { emptyText: <Empty /> }

    const isEmptyList = isLoading === false && total === 0 && !keyword
    if (isEmptyList) {
      return this.renderEmpty()
    }

    return (
      <BaseTable
        data={data}
        columns={this.getColumns()}
        filters={filters}
        keyword={keyword}
        pagination={pagination}
        isLoading={isLoading}
        rowKey={this.rowKey}
        selectedRowKeys={toJS(selectedRowKeys)}
        extraProps={extraProps}
        {...this.getEnabledTableProps()}
      />
    )
  }
}

export default inject('rootStore')(observer(UnresolvedMessage))
export const Component = UnresolvedMessage
