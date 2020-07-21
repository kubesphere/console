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
import {
  result as _result,
  get,
  omit,
  isEmpty,
  debounce,
  isArray,
  isUndefined,
} from 'lodash'
import { Link } from 'react-router-dom'
import { toJS } from 'mobx'
import { parse } from 'qs'
import { observer, inject } from 'mobx-react'
import { Level, LevelLeft, LevelRight } from '@pitrix/lego-ui'

import { getLocalTime, formatUsedTime } from 'utils'

import BranchSelectModal from 'components/Forms/CICDs/paramsModal'
import { Button, Notify } from 'components/Base'
import Status from 'devops/components/Status'
import { getPipelineStatus } from 'utils/status'
import { ReactComponent as ForkIcon } from 'src/assets/fork.svg'

import Table from '../../Table'
import EmptyCard from '../../EmptyCard'
import styles from './index.scss'

@inject('rootStore')
@observer
export default class Activity extends React.Component {
  constructor(props) {
    super(props)
    this.name = 'Activity'
    this.store = props.detailStore || {}
    this.state = {
      showBranchModal: false,
    }
  }

  componentDidMount() {
    this.unsubscribe = this.routing.history.subscribe(location => {
      if (location.pathname === this.props.match.url) {
        const query = parse(location.search.slice(1))
        this.getData({ ...query })
      }
    })
  }

  componentWillUnmount() {
    this.unsubscribe && this.unsubscribe()
  }

  get enabledActions() {
    const { project_id } = this.props.match.params
    const devops = this.store.getDevops(project_id)
    return globals.app.getActions({
      module: 'pipelines',
      cluster: this.props.match.params.cluster,
      devops,
    })
  }

  get isAtBranchDetailPage() {
    return this.props.match.params.branch
  }

  getData(params) {
    this.store.getActivities({
      ...this.props.match.params,
      ...params,
    })
  }

  hideBranchModal = () => {
    this.setState({ showBranchModal: false })
  }

  handleFetch = (params, refresh) => {
    this.routing.query(params, refresh)
  }

  handleRun = debounce(async () => {
    const { detail } = this.store
    const { params } = this.props.match
    const isMutibranch = detail.branchNames
    const hasParameters = detail.parameters && detail.parameters.length
    if (isMutibranch || hasParameters) {
      this.setState({ showBranchModal: true })
    } else {
      await this.props.detailStore.runBranch(params)
      this.handleFetch()
    }
  }, 500)

  handleRunBranch = async (parameters, branch) => {
    const { params } = this.props.match
    await this.props.detailStore.runBranch({ branch, parameters, ...params })
    this.handleFetch()
    this.setState({ showBranchModal: false })
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

  get isMutibranch() {
    return this.store.detail && !isEmpty(toJS(this.store.detail.scmSource))
  }

  rowKeys = record => `${record.startTime}${record.queueId}`

  handleReplay = record => async () => {
    const { params } = this.props.match

    const url = `devops/${params.project_id}/pipelines/${
      params.name
    }${this.getActivityDetailLinks(record)}`

    await this.props.detailStore.handleActivityReplay({
      url,
      cluster: params.cluster,
    })
    this.handleFetch()
  }

  handleScanRepository = async () => {
    const { params } = this.props.match
    const { detail } = this.props.detailStore

    await this.props.detailStore.scanRepository({
      project_id: params.project_id,
      name: detail.name,
      cluster: params.cluster,
    })
    this.store.fetchDetail(params)
    Notify.success({
      content: t('Scan repo success'),
    })
  }

  handleStop = record => async () => {
    const { params } = this.props.match

    const url = `devops/${params.project_id}/pipelines/${
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

  getFilteredValue = dataIndex => this.store.list.filters[dataIndex]

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
      render: causes => _result(causes, '[0].shortDescription', ''),
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

  getRowKey = record => record.enQueueTime

  getActions = () => [
    {
      type: 'control',
      key: 'run',
      text: t('Run'),
      action: 'edit',
      onClick: this.handleRun,
    },
  ]

  renderModals = () => {
    const { detail } = this.store
    const { params } = this.props.match

    return (
      <BranchSelectModal
        onOk={this.handleRunBranch}
        onCancel={this.hideBranchModal}
        visible={this.state.showBranchModal}
        branches={toJS(detail.branchNames)}
        params={params || {}}
      />
    )
  }

  renderFooter = () => {
    const { detail, activityList } = this.store
    const { total, limit } = activityList

    const isMutibranch = detail.branchNames
    if (!isMutibranch || this.isAtBranchDetailPage) {
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
    const { activityList, detail } = this.store
    const { data, isLoading, total, page, limit, filters } = activityList
    const isMutibranch = detail.branchNames
    const isEmptyList = isLoading === false && data.length === 0

    const omitFilters = omit(filters, 'page')

    const runnable = this.enabledActions.includes('edit')

    if (isEmptyList && !filters.page) {
      if (isMutibranch && !detail.branchNames.length) {
        return (
          <React.Fragment>
            <EmptyCard desc={t('Pipeline config file not found')}>
              {runnable && (
                <Button type="control" onClick={this.handleScanRepository}>
                  {t('Scan Repository')}
                </Button>
              )}
            </EmptyCard>
            {this.renderModals()}
          </React.Fragment>
        )
      }
      return (
        <React.Fragment>
          <EmptyCard desc={t('ACTIVITY_EMPTY_TIP')}>
            {runnable && (
              <Button type="control" onClick={this.handleRun}>
                {t('Run Pipeline')}
              </Button>
            )}
          </EmptyCard>
          {this.renderModals()}
        </React.Fragment>
      )
    }

    const pagination = { total, page, limit }

    const actions = this.getActions().filter(item =>
      this.enabledActions.includes(item.action)
    )

    return (
      <React.Fragment>
        <Table
          data={toJS(data)}
          columns={this.getColumns()}
          rowKey={this.rowKeys}
          filters={omitFilters}
          pagination={pagination}
          isLoading={isLoading}
          onFetch={this.handleFetch}
          actions={actions}
          footer={this.renderFooter()}
          disableSearch
        />
        {this.renderModals()}
      </React.Fragment>
    )
  }
}
