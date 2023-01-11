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
import { get, omit, debounce, isEmpty } from 'lodash'
import { Link } from 'react-router-dom'
import { toJS } from 'mobx'
import { parse } from 'qs'
import { observer, inject } from 'mobx-react'
import { Button, Notify } from '@kube-design/components'

import { getLocalTime, formatUsedTime } from 'utils'

import Status from 'devops/components/Status'
import { getPipelineStatus } from 'utils/status'
import { ReactComponent as ForkIcon } from 'assets/fork.svg'

import { trigger } from 'utils/action'
import Table from 'components/Tables/List'
import EmptyCard from 'devops/components/Cards/EmptyCard'

@inject('rootStore', 'detailStore')
@observer
@trigger
export default class Activity extends React.Component {
  name = 'Activity'

  store = this.props.detailStore || {}

  refreshTimer = setInterval(() => this.getData(), 4000)

  get enabledActions() {
    const { devops, cluster } = this.props.match.params
    return globals.app.getActions({
      module: 'pipelineruns',
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

  get isMultiBranch() {
    return !isEmpty(toJS(this.store.detail.branchNames))
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
    // The data of the current list is asynchronous, so there is no need to state as a judgment condition
    if (this.isRuning) {
      this.getData()
    } else {
      clearInterval(this.refreshTimer)
      this.refreshTimer = null
    }
  }

  handleRunning = debounce(async () => {
    const { params } = this.props.match
    await this.store.fetchDetail(params)
    const { detail } = this.store
    const hasParameters = !isEmpty(toJS(detail.parameters))
    const hasBranches = !isEmpty(toJS(detail.branchNames))

    if (hasBranches || hasParameters) {
      this.trigger('pipeline.params', {
        devops: params.devops,
        cluster: params.cluster,
        params,
        branches: toJS(detail.branchNames),
        parameters: toJS(detail.parameters),
        success: () => {
          Notify.success({ content: `${t('PIPELINE_RUN_START_SI')}` })
          this.handleFetch()
        },
      })
    } else {
      Notify.success({ content: `${t('PIPELINE_RUN_START_SI')}` })
      await this.props.detailStore.runBranch(params)
      this.handleFetch()
    }
  }, 500)

  handleFetch = (params, refresh) => {
    this.routing.query(params, refresh)
  }

  handleReplay = record => async () => {
    const { params } = this.props.match

    await this.props.detailStore.handleActivityReplay({
      ...params,
      url: this.getActivityDetailLinks(record),
    })

    Notify.success({ content: `${t('PIPELINE_RUN_START_SI')}` })
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
      content: t('SCAN_REPO_SUCCESSFUL'),
    })

    this.handleFetch()
  }

  handleStop = record => async () => {
    const { params } = this.props.match

    await this.props.detailStore.handleActivityStop({
      url: this.getActivityDetailLinks(record),
      ...params,
    })

    Notify.success({
      content: t('STOP_PIPELINE_SUCCESSFUL'),
    })

    this.handleFetch()
  }

  getActivityDetailLinks = record => {
    const branchName = get(record, '_originData.spec.scm.refName')

    if (branchName) {
      // multi-branch
      return `branches/${encodeURIComponent(branchName)}/runs/${record.id}`
    }
    return `runs/${record.id}`
  }

  getRunhref = record => {
    const branchName = get(record, '_originData.spec.scm.refName')
    const runName = get(record, '_originData.metadata.name')

    if (branchName && !this.isAtBranchDetailPage) {
      return `${this.prefix}/branch/${record.pipeline}/run/${runName}`
    }

    return `${this.prefix}/run/${runName}`
  }

  getColumns = () => [
    {
      title: t('STATUS'),
      width: '15%',
      key: 'status',
      render: record =>
        getPipelineStatus(record)?.type === 'nostatus' || !record.result ? (
          <Status {...getPipelineStatus(record)} />
        ) : (
          <Link className="item-name" to={this.getRunhref(record)}>
            <Status {...getPipelineStatus(record)} />
          </Link>
        ),
    },
    {
      title: t('RUN_ID'),
      width: '10%',
      key: 'run',
      render: record =>
        record.result === 'ABORTED' || !record.result ? (
          <span>{record.id}</span>
        ) : (
          <Link className="item-name" to={this.getRunhref(record)}>
            {record.id}
          </Link>
        ),
    },
    {
      title: t('COMMIT'),
      dataIndex: 'commitId',
      width: '10%',
      render: commitId => (commitId && commitId.slice(0, 6)) || '-',
    },
    // when it's in branch detail page, the branch column should be hidden
    // when it's a non-multi-branch Pipeline, the branch column should be hidden
    ...(this.isAtBranchDetailPage || !this.isMultiBranch
      ? []
      : [
          {
            title: t('BRANCH_SI'),
            width: '15%',
            key: 'branch',
            render: record => {
              const branchName = get(record, '_originData.spec.scm.refName', '')

              if (branchName) {
                return (
                  <Link
                    className="item-name"
                    to={`${this.prefix}/branch/${branchName}/activity`}
                  >
                    <ForkIcon style={{ width: '20px', height: '20px' }} />{' '}
                    {decodeURIComponent(branchName)}
                  </Link>
                )
              }
              return '-'
            },
          },
        ]),
    {
      title: t('LAST_MESSAGE'),
      dataIndex: 'causes',
      width: '25%',
      render: causes => get(causes, '[0].shortDescription', ''),
    },
    {
      title: t('DURATION'),
      dataIndex: 'durationInMillis',
      width: '10%',
      render: durationInMillis =>
        durationInMillis ? formatUsedTime(durationInMillis) : '-',
    },
    {
      title: t('UPDATE_TIME_TCAP'),
      dataIndex: 'startTime',
      width: '20%',
      render: time =>
        time ? getLocalTime(time).format('YYYY-MM-DD HH:mm:ss') : '-',
    },
    {
      isHideable: false,
      width: '10%',
      key: 'action',
      render: record => {
        if (
          (record.branch && !record.commitId) ||
          !this.enabledActions.includes('edit') ||
          !record.id
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
            text: t('RUN'),
            action: 'edit',
            onClick: this.handleRunning,
          },
        ]

  render() {
    const { activityList } = this.store
    const { data, isLoading, total, page, limit, filters } = activityList
    const omitFilters = omit(filters, 'page', 'workspace')
    const pagination = { total, page, limit }
    const isEmptyList = total === 0

    if (isEmptyList) {
      const { detail } = this.store
      const runnable = this.enabledActions.includes('edit')
      const isMultibranch = !isEmpty(toJS(detail.branchNames))
      const isBranchInRoute = get(this.props, 'match.params.branch')

      if (isMultibranch && !isEmpty(isMultibranch) && !isBranchInRoute) {
        return (
          <EmptyCard desc={t('NO_PIPELINE_CONFIG_FILE_TIP')}>
            {runnable && (
              <Button type="control" onClick={this.handleScanRepository}>
                {t('SCAN_REPOSITORY')}
              </Button>
            )}
          </EmptyCard>
        )
      }
      return (
        <EmptyCard desc={t('ACTIVITY_EMPTY_TIP')}>
          {runnable && (
            <Button type="control" onClick={this.handleRunning}>
              {t('RUN')}
            </Button>
          )}
        </EmptyCard>
      )
    }

    return (
      <Table
        data={toJS(data)}
        columns={this.getColumns()}
        rowKey="uid"
        filters={omitFilters}
        pagination={pagination}
        isLoading={isLoading}
        onFetch={this.handleFetch}
        actions={this.getActions()}
        hideSearch
        enabledActions={this.enabledActions}
      />
    )
  }
}
