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
import { get, omit, isEmpty } from 'lodash'
import { toJS } from 'mobx'
import { observer, inject } from 'mobx-react'
import { parse } from 'qs'
import { getLocalTime } from 'utils'
import Status from 'devops/components/Status'
import { getPipelineStatus } from 'utils/status'
import Health from 'devops/components/Health'
import classNames from 'classnames'
import Link from 'components/Layout/Nav/Link'

import Table from 'components/Tables/List'
import EmptyCard from 'devops/components/Cards/EmptyCard'
import styles from './index.scss'

@inject('rootStore', 'detailStore')
@observer
export default class Pullrequest extends React.Component {
  name = 'PullRequest'

  store = this.props.detailStore || {}

  refreshTimer = setInterval(() => this.getData(), 4000)

  get isRuning() {
    const data = get(toJS(this.store), 'pullRequestList.data', [])
    const runingData = data.filter(item => {
      const state = get(item, 'latestRun.state')
      return state && state !== 'FINISHED' && state !== 'PAUSED'
    })
    return !isEmpty(runingData)
  }

  componentDidMount() {
    const { params } = this.props.match

    this.unsubscribe = this.routing.history.subscribe(location => {
      if (location.pathname === this.props.match.url) {
        const query = parse(location.search.slice(1))
        this.store.getPullRequest({
          ...params,
          ...query,
        })
      }
    })
  }

  refreshHandler = () => {
    // The data of the current list is asynchronous, so there is no need to state as a judgment condition
    if (this.isRuning) {
      this.getData()
    } else {
      clearInterval(this.refreshTimer)
      this.refreshTimer = null
    }
  }

  componentDidUpdate() {
    if (this.refreshTimer === null && this.isRuning) {
      this.refreshTimer = setInterval(() => this.refreshHandler(), 4000)
    }
  }

  componentWillUnmount() {
    clearInterval(this.refreshTimer)
    this.unsubscribe && this.unsubscribe()
  }

  getData = () => {
    const { params } = this.props.match
    const query = parse(location.search.slice(1))

    this.store.getPullRequest({
      ...params,
      ...query,
    })
  }

  handleFetch = (params, refresh) => {
    this.routing.query(params, refresh)
  }

  get routing() {
    return this.props.rootStore.routing
  }

  get prefix() {
    const { workspace, devops, name, cluster } = this.props.match.params
    return `/${workspace}/clusters/${cluster}/devops/${devops}/pipelines/${name}`
  }

  getFilteredValue = dataIndex => this.store.list.filters[dataIndex]

  getColumns = () => [
    {
      title: t('STATUS'),
      width: '15%',
      render: record => (
        <Status {...getPipelineStatus(get(record, 'latestRun', {}))} />
      ),
    },
    {
      title: t('NAME'),
      dataIndex: 'name',
      width: '15%',
      render: (name, record) => (
        <Link
          className={classNames('item-name', {
            [styles.itemNameDisabled]: record.disabled,
          })}
          to={`${this.prefix}/branch/${name}/`}
          disabled={record.disabled}
        >
          {name}
        </Link>
      ),
    },
    {
      title: t('HEALTH_STATUS'),
      dataIndex: 'weatherScore',
      width: '15%',
      render: weatherScore => <Health score={weatherScore} />,
    },
    {
      title: t('LAST_MESSAGE'),
      width: '20%',
      render: record => get(record, 'pullRequest.title', ''),
    },
    {
      title: t('AUTHOR'),
      width: '15%',
      render: record => get(record, 'pullRequest.author', ''),
    },
    {
      title: t('TIME'),
      dataIndex: 'latestRun',
      width: '20%',
      render: latestRun =>
        getLocalTime(latestRun.startTime).format('YYYY-MM-DD HH:mm:ss'),
    },
  ]

  getRowKey = record => record.enQueueTime

  render() {
    const { pullRequestList } = this.store
    const { data, isLoading, total, page, limit, filters } = pullRequestList
    const isEmptyList = isLoading === false && total === 0 && data.length > 0
    const pagination = { total, page, limit }
    const omitFilters = omit(filters, 'page', 'workspace')

    if (isEmptyList && !filters.page) {
      return <EmptyCard name={this.name} />
    }

    return (
      <Table
        data={toJS(data)}
        columns={this.getColumns()}
        rowKey="displayName"
        filters={omitFilters}
        pagination={pagination}
        isLoading={isLoading}
        onFetch={this.handleFetch}
        hideSearch
      />
    )
  }
}
