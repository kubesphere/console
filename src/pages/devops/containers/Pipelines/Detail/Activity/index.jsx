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
import { get, omit, debounce, isArray, isUndefined, isEmpty } from 'lodash'
import { Link } from 'react-router-dom'
import { toJS } from 'mobx'
import { parse } from 'qs'
import { observer, inject } from 'mobx-react'
import {
  Button,
  Notify,
  Level,
  LevelLeft,
  LevelRight,
} from '@kube-design/components'

import { getLocalTime, formatUsedTime } from 'utils'

import Status from 'devops/components/Status'
import { getPipelineStatus } from 'utils/status'
import { ReactComponent as ForkIcon } from 'assets/fork.svg'

import { trigger } from 'utils/action'
import Table from 'components/Tables/List'
import EmptyCard from 'devops/components/Cards/EmptyCard'

import styles from './index.scss'

@inject('rootStore', 'detailStore')
@observer
@trigger
export default class Activity extends React.Component {
  name = 'Activity'

  store = this.props.detailStore || {}

  refreshTimer = setInterval(() => this.refreshHandler(), 4000)

  get enabledActions() {
    const { devops, cluster } = this.props.match.params
    return globals.app.getActions({
      module: 'pipelines',
      cluster,
      devops,
    })
  }

  get isRuning() {
    const data = get(toJS(this.store), 'activityList.data', [])
    const runingData = data.filter(
      item => item.state !== 'FINISHED' && item.state !== 'PAUSED'
    )
    return !isEmpty(runingData)
  }

  get isAtBranchDetailPage() {
    return this.props.match.params.branch
  }

  get prefix() {
    const { url } = this.props.match
    const _arr = url.split('/')
    _arr.pop()
    return _arr.join('/')
  }

  get routing() {
    return this.props.rootStore.routing
  }

  componentDidMount() {
    const { params } = this.props.match

    this.unsubscribe = this.routing.history.subscribe(location => {
      if (location.pathname === this.props.match.url) {
        const query = parse(location.search.slice(1))
        this.store.getActivities({
          ...params,
          ...query,
        })
      }
    })
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

  getData = () => {
    const { params } = this.props.match
    const query = parse(location.search.slice(1))

    this.store.getActivities({
      ...params,
      ...query,
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

  handleRunning = debounce(async () => {
    const { detail } = this.store
    const { params } = this.props.match
    const isMultibranch = detail.branchNames
    const hasParameters = detail.parameters && detail.parameters.length

    if (isMultibranch || hasParameters) {
      this.trigger('pipeline.params', {
        devops: params.devops,
        cluster: params.cluster,
        params,
        branches: toJS(detail.branchNames),
        parameters: toJS(detail.parameters),
        success: () => {
          Notify.success({ content: `${t('Run Start')}` })
          this.handleFetch()
        },
      })
    } else {
      Notify.success({ content: `${t('Run Start')}` })
      await this.props.detailStore.runBranch(params)
      this.handleFetch()
    }
  }, 500)

  handleFetch = (params, refresh) => {
    this.routing.query(params, refresh)
  }

  handleReplay = record => async () => {
    const { params } = this.props.match

    const url = `devops/${params.devops}/pipelines/${
      params.name
    }${this.getActivityDetailLinks(record)}`

    await this.props.detailStore.handleActivityReplay({
      url,
      cluster: params.cluster,
    })

    Notify.success({ content: `${t('Run Start')}` })
    this.handleFetch()
  }

  handleScanRepository = async () => {
    const { params } = this.props.match
    const { detail } = this.props.detailStore

    await this.props.detailStore.scanRepository({
      devops: params.devops,
      name: detail.name,
      cluster: params.cluster,
    })

    this.store.fetchDetail(params)

    Notify.success({
      content: t('Scan repo success'),
    })

    this.handleFetch()
  }

  handleStop = record => async () => {
    const { params } = this.props.match

    const url = `devops/${params.devops}/pipelines/${
      params.name
    }${this.getActivityDetailLinks(record)}`

    await this.props.detailStore.handleActivityStop({
      url,
      cluster: params.cluster,
    })

    Notify.success({
      content: t('Stop Job Successfully, Status updated later'),
    })

    this.handleFetch()
  }

  getActivityDetailLinks = record => {
    const matchArray = get(record, '_links.self.href', '').match(
      /\/pipelines\/\S*?(?=\/)\/branches\/(\S*?(?=\/)?)\//
    )
    if (isArray(matchArray)) {
      return `/branches/${encodeURIComponent(record.pipeline)}/runs/${
        record.id
      }`
    }
    return `/runs/${record.id}`
  }

  getRunhref = record => {
    const matchArray = get(record, '_links.self.href', '').match(
      /\/pipelines\/\S*?(?=\/)\/branches\/(\S*?(?=\/)?)\//
    )
    if (isArray(matchArray) && !this.isAtBranchDetailPage) {
      return `${this.prefix}/branch/${record.pipeline}/run/${record.id}`
    }
    return `${this.prefix}/run/${record.id}`
  }

  getColumns = () => [
    {
      title: t('Status'),
      width: '15%',
      key: 'status',
      render: record => (
        <Link className="item-name" to={this.getRunhref(record)}>
          <Status {...getPipelineStatus(record)} />
        </Link>
      ),
    },
    {
      title: t('Run'),
      width: '10%',
      key: 'run',
      render: record => (
        <Link className="item-name" to={this.getRunhref(record)}>
          {record.id}
        </Link>
      ),
    },
    {
      title: t('Commit'),
      dataIndex: 'commitId',
      width: '10%',
      render: commitId => (commitId && commitId.slice(0, 6)) || '-',
    },
    ...(this.props.match.params.branch
      ? []
      : [
          {
            title: t('Branch'),
            width: '15%',
            key: 'branch',
            render: record => {
              const matchArray = get(record, '_links.self.href', '').match(
                /\/pipelines\/\S*?(?=\/)\/branches\/(\S*?(?=\/)?)\//
              )
              if (isArray(matchArray)) {
                return (
                  <Link
                    className="item-name"
                    to={`${this.prefix}/branch/${record.pipeline}/activity`}
                  >
                    <ForkIcon style={{ width: '20px', height: '20px' }} />{' '}
                    {decodeURIComponent(record.pipeline)}
                  </Link>
                )
              }
              return '-'
            },
          },
        ]),
    {
      title: t('Last Message'),
      dataIndex: 'causes',
      width: '25%',
      render: causes => get(causes, '[0].shortDescription', ''),
    },
    {
      title: t('Duration'),
      dataIndex: 'durationInMillis',
      width: '10%',
      render: durationInMillis =>
        durationInMillis ? formatUsedTime(durationInMillis) : '-',
    },
    {
      title: t('Updated Time'),
      dataIndex: 'startTime',
      width: '20%',
      render: time => getLocalTime(time).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      isHideable: false,
      width: '10%',
      key: 'action',
      render: record => {
        if (
          (record.branch && !record.commitId) ||
          !this.enabledActions.includes('edit')
        ) {
          return null
        }
        if (record.state === 'FINISHED') {
          return (
            <Button
              onClick={this.handleReplay(record)}
              icon="restart"
              type="flat"
            />
          )
        }
        return (
          <Button onClick={this.handleStop(record)} icon="stop" type="flat" />
        )
      },
    },
  ]

  getActions = () =>
    this.isAtBranchDetailPage
      ? null
      : [
          {
            type: 'control',
            key: 'run',
            text: t('Run'),
            action: 'edit',
            onClick: this.handleRunning,
          },
        ]

  renderFooter = () => {
    const { detail, activityList } = this.store
    const { total, limit } = activityList
    const isMultibranch = detail.branchNames

    if (!isMultibranch || this.isAtBranchDetailPage) {
      return null
    }

    if (total < limit) {
      return null
    }

    return () => (
      <Level>
        {!isUndefined(total) && (
          <LevelLeft>{t('TOTAL_ITEMS', { num: total })}</LevelLeft>
        )}
        <LevelRight>
          <Link className={styles.clickable} to="./branch">
            {t('PIPELINES_FOOTER_SEE_MORE')}
          </Link>
        </LevelRight>
      </Level>
    )
  }

  render() {
    const { activityList } = this.store
    const { data, isLoading, total, page, limit, filters } = activityList
    const omitFilters = omit(filters, 'page', 'workspace')
    const pagination = { total, page, limit }
    const isEmptyList = total === 0

    if (isEmptyList) {
      const { detail } = this.store
      const runnable = this.enabledActions.includes('edit')
      const isMultibranch = detail.branchNames
      const isBranchInRoute = get(this.props, 'match.params.branch')

      if (isMultibranch && !isEmpty(isMultibranch) && !isBranchInRoute) {
        return (
          <EmptyCard desc={t('Pipeline config file not found')}>
            {runnable && (
              <Button type="control" onClick={this.handleScanRepository}>
                {t('Scan Repository')}
              </Button>
            )}
          </EmptyCard>
        )
      }
      return (
        <EmptyCard desc={t('ACTIVITY_EMPTY_TIP')}>
          {runnable && (
            <Button type="control" onClick={this.handleRunning}>
              {t('Run Pipeline')}
            </Button>
          )}
        </EmptyCard>
      )
    }

    const rowKey = get(data[0], 'time') ? 'time' : 'endTime'

    return (
      <Table
        data={toJS(data)}
        columns={this.getColumns()}
        rowKey={rowKey}
        filters={omitFilters}
        pagination={pagination}
        isLoading={isLoading}
        onFetch={this.handleFetch}
        actions={this.getActions()}
        footer={this.renderFooter()}
        hideSearch
        enabledActions={this.enabledActions}
      />
    )
  }
}
