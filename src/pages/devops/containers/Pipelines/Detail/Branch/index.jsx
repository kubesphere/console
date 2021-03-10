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

import { result, get, omit, isEmpty } from 'lodash'
import React from 'react'
import { toJS } from 'mobx'
import { observer, inject } from 'mobx-react'
import { parse } from 'qs'
import { Link } from 'react-router-dom'
import { Button, Notify } from '@kube-design/components'
import Status from 'devops/components/Status'
import Health from 'devops/components/Health'
import { getLocalTime } from 'utils'
import { getPipelineStatus } from 'utils/status'
import { ReactComponent as ForkIcon } from 'assets/fork.svg'

import Table from 'components/Tables/List'
import EmptyCard from 'devops/components/Cards/EmptyCard'

@inject('rootStore', 'detailStore')
@observer
export default class Branch extends React.Component {
  name = 'branch'

  store = this.props.detailStore || {}

  refreshTimer = setInterval(() => this.refreshHandler(), 4000)

  get enabledActions() {
    const { cluster, devops } = this.props.match.params

    return globals.app.getActions({
      module: 'pipelines',
      cluster,
      devops,
    })
  }

  get isRuning() {
    const data = get(toJS(this.store), 'branchList.data', [])
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
        this.store.getBranches({
          ...params,
          ...query,
        })
      }
    })
  }

  refreshHandler = () => {
    if (this.isRuning) {
      this.getData()
    } else {
      clearInterval(this.refreshTimer)
      this.refreshTimer = null
    }
  }

  componentDidUpdate() {
    if (this.refreshTimer === null && this.isRuning) {
      clearInterval(this.refreshTimer)
      this.refreshTimer = setInterval(() => this.refreshHandler(), 4000)
    }
  }

  componentWillUnmount() {
    clearInterval(this.refreshTimer)
    this.unsubscribe && this.unsubscribe()
  }

  getData() {
    const { params } = this.props.match
    const query = parse(location.search.slice(1))

    this.store.getBranches({
      ...params,
      ...query,
    })
  }

  handleFetch = (params, refresh) => {
    this.routing.query(params, refresh)
  }

  handleScanRepository = async () => {
    const { params } = this.props.match
    const { detail } = this.props.detailStore

    await this.props.detailStore.scanRepository({
      devops: params.devops,
      cluster: params.cluster,
      name: detail.name,
    })

    this.store.fetchDetail(params)

    Notify.success({
      content: t('Scan repo success'),
    })
  }

  get routing() {
    return this.props.rootStore.routing
  }

  get prefix() {
    return this.props.match.url
  }

  getColumns = () => [
    {
      title: t('Status'),
      dataIndex: 'status',
      width: '20%',
      render: (status, record) => (
        <Status {...getPipelineStatus(get(record, 'latestRun', {}))} />
      ),
    },
    {
      title: t('Name'),
      dataIndex: 'name',
      width: '20%',
      render: name => (
        <Link className="item-name" to={`${this.prefix}/${name}/activity`}>
          <ForkIcon style={{ width: '20px', height: '20px' }} />{' '}
          {decodeURIComponent(name)}
        </Link>
      ),
    },
    {
      title: t('WeatherScore'),
      dataIndex: 'weatherScore',
      width: '20%',
      render: weatherScore => <Health score={weatherScore} />,
    },
    {
      title: t('Last Message'),
      dataIndex: 'latestRun',
      width: '20%',
      render: latestRun => result(latestRun, 'causes[0].shortDescription', ''),
    },
    {
      title: t('Updated Time'),
      dataIndex: 'updateTime',
      width: '20%',
      render: (updateTime, record) =>
        getLocalTime(record.latestRun.startTime).format('YYYY-MM-DD HH:mm:ss'),
    },
  ]

  render() {
    const { data, filters, isLoading, total, page, limit } = toJS(
      this.store.branchList
    )

    const isEmptyList = isLoading === false && total === 0
    const omitFilters = omit(filters, 'page', 'workspace')
    const runnable = this.enabledActions.includes('edit')
    const pagination = { total, page, limit }

    if (isEmptyList && !filters.page) {
      return (
        <EmptyCard desc={t('No branches found')}>
          {runnable && (
            <Button type="control" onClick={this.handleScanRepository}>
              {t('Scan Repository')}
            </Button>
          )}
        </EmptyCard>
      )
    }

    return (
      <Table
        rowKey="displayName"
        data={data}
        columns={this.getColumns()}
        filters={omitFilters}
        pagination={pagination}
        isLoading={isLoading}
        onFetch={this.handleFetch}
        hideSearch
      />
    )
  }
}
