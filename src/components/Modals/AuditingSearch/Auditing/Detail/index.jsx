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

import React, { Fragment } from 'react'
import { Select, Icon, Tooltip } from '@pitrix/lego-ui'
import { min } from 'lodash'
import moment from 'moment-mini'
import classnames from 'classnames'
import { observer } from 'mobx-react'
import { action, observable, toJS } from 'mobx'

import SearchInput from 'components/Modals/LogSearch/Logging/SearchInput'
import Table from 'components/Tables/Visible'
import TimeBar from 'components/Charts/Bar/TimeBar'
import AuditingStore from 'stores/auditing'

import MetadataModal from './MetadataModal'
import {
  queryKeyMapping,
  toArray,
  queryModeOptions,
  dropDownItems,
  getSecond,
  httpcodes,
} from '../utils'

import styles from './index.scss'

const DefaultRealTimeConfig = {
  duration: 600,
  step: '10s',
}

const stepLevelList = ['m', 'h', 'd', 'M', 'y']

@observer
export default class Detail extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      detail: {},
      eventMetadata: [],
      showHistogram: true,
      polling: false,
      pollingFrequency: 5000,
    }

    this.frequencyOptions = [5, 10, 15].map(second => ({
      value: second * 1000,
      label: `${t('TIME_S', { num: second })}`,
    }))

    this.store = new AuditingStore({ size: 50 })
    this.tableRef = React.createRef()
  }

  get defaultDuration() {
    return {
      start_time: 0,
      end_time: Math.ceil(Date.now() / 1000),
      interval: '1d',
    }
  }

  get duration() {
    const { searchInputState } = this.props || {}
    const now = Math.ceil(Date.now() / 1000)
    const { start, end, step } = searchInputState

    if (start) {
      return {
        start_time: min([Math.ceil(start), now]),
        end_time: min([Math.ceil(end), now]),
        interval: step,
      }
    }
    return this.defaultDuration
  }

  componentDidMount() {
    this.refreshQuery()
    this.fetchHistogram()
  }

  componentWillUnmount() {
    this.stopPolling()
  }

  @observable
  logs = []

  @observable
  tableCols = [
    {
      thead: t('Time'),
      key: 'Time',
      content: ({ RequestReceivedTimestamp }) =>
        `[${moment(RequestReceivedTimestamp).format('YYYY-MM-DD HH:mm:ss')}]`,
      hidden: false,
      className: styles.timecol,
    },
    {
      thead: t('verb'),
      key: 'verb',
      hidden: false,
      content: ({ Verb }) => Verb,
      className: styles.Verbcol,
    },
    {
      thead: t('Status Code'),
      key: 'Status Code',
      hidden: false,
      content: ({ ResponseStatus: { code } = {} }) => httpcodes[code],
      className: styles.statuscol,
    },
    {
      thead: t('Workspace'),
      key: 'Workspace',
      hidden: false,
      content: ({ Workspace }) => Workspace,
      className: styles.workspacecol,
    },
    {
      thead: t('Project'),
      key: 'Project',
      hidden: false,
      content: ({ ObjectRef: { Namespace } = {} }) => Namespace,
      className: styles.namespacecol,
    },
    {
      thead: t('Reason'),
      key: 'reason',
      hidden: true,
      content: ({ ResponseStatus: { reason } = {} }) => reason,
      className: styles.reasoncol,
    },
    {
      thead: t('Resources'),
      key: 'resources',
      hidden: false,
      content: ({ ObjectRef = {} }) => (
        <Fragment>
          <div className={styles.kind}>{ObjectRef.Resource}</div>
          <div className={styles.name}>{ObjectRef.Name}</div>
        </Fragment>
      ),
      className: styles.namecol,
    },
    {
      thead: t('Subresource'),
      key: 'Subresource',
      hidden: true,
      content: ({ ObjectRef: { Subresource } = {} }) => Subresource,
      className: styles.subresourcecol,
    },
    {
      thead: t('Operation Account'),
      key: 'Operation Account',
      hidden: false,
      content: ({ User: { Username } = {} }) => Username,
      className: styles.usernamecol,
    },
    {
      thead: t('Source IP'),
      key: 'sourceIP',
      hidden: true,
      content: ({ SourceIPs }) => SourceIPs,
      className: styles.messagecol,
    },
  ]

  @action
  async refreshQuery() {
    this.store.from = 0
    const query = this.getQueryParams()
    this.logs = await this.fetchQuery({ ...query, ...this.duration })
  }

  @action
  selectedDurationParameter = ({ time: startTime = 0 }) => {
    const { interval } = this.store
    const { searchInputState } = this.props
    searchInputState.end = Math.ceil(startTime / 1000) + getSecond(interval)
    searchInputState.start = Math.ceil(startTime / 1000)
    searchInputState.step = this.getNextStepLevel(interval)
    this.fetchHistogram()
    this.refreshQuery()
  }

  @action
  onTableScrollEnd = () => {
    const { from, size, total } = this.store
    if (total > from + size) {
      this.loadMoreLogs()
    }
  }

  @action
  async loadMoreLogs() {
    const from = this.store.from + this.store.size

    const newLogs = await this.fetchQuery({
      ...this.store.preParams,
      ...{ from },
    })
    this.logs.push(...newLogs)
  }

  getNextStepLevel(interval) {
    const [, current = 'm'] = interval.match(/\d+(\w+)$/)
    const level = stepLevelList.findIndex(step => step === current)
    return level < 1 ? `1${stepLevelList[0]}` : `1${stepLevelList[level - 1]}`
  }

  @action
  async fetchQuery(pars) {
    const { cluster } = this.props.searchInputState
    const params = { ...pars, cluster }
    await this.store.fetchQuery(params)
    return this.store.data
  }

  @action
  fetchHistogram() {
    const query = this.getQueryParams()
    this.store.interval = this.duration.interval
    this.store.fetchHistogram({ ...query, ...this.duration })
  }

  getQueryParams() {
    const {
      query: inputQuery,
      queryMode,
      cluster,
    } = this.props.searchInputState
    return inputQuery
      .filter(({ key }) => key)
      .reduce(
        (searchQuery, query) => {
          const queryKey = query.key
          const newQueryValue = query.value
          const key = queryMode ? queryKey : queryKeyMapping[queryKey]
          const preQueryValue = searchQuery[key]
          searchQuery[key] = preQueryValue
            ? `${preQueryValue},${newQueryValue}`
            : newQueryValue
          return searchQuery
        },
        { cluster }
      )
  }

  onSearchParamsChange = () => {
    this.stopPolling()
    this.refreshQuery()
    this.fetchHistogram()
  }

  @action
  toggleHistogram = () => {
    this.setState(({ showHistogram }) => ({
      showHistogram: !showHistogram,
    }))
  }

  @action
  togglePolling = () => {
    const { polling } = this.state
    polling ? this.stopPolling() : this.startPolling()
    this.setState({
      polling: !polling,
    })
  }

  startPolling() {
    this.poll()
    this.pollingInterval = setInterval(this.poll, this.state.pollingFrequency)
  }

  poll = () => {
    const { searchInputState } = this.props
    const { duration, step } = DefaultRealTimeConfig
    searchInputState.end = Math.ceil(Date.now() / 1000)
    searchInputState.start = searchInputState.end - duration
    searchInputState.step = step
    searchInputState.durationAlias = `${duration / 60}m`
    this.fetchHistogram()
    this.refreshQuery()
  }

  stopPolling() {
    this.setState({
      polling: false,
    })
    clearInterval(this.pollingInterval)
  }

  @action
  changeFrequency = value => {
    this.setState({
      pollingFrequency: value,
    })
    if (this.state.polling) {
      this.stopPolling()
      this.startPolling()
    }
  }

  changeQueryMode = mode => {
    this.props.searchInputState.queryMode = mode
    this.onSearchParamsChange()
  }

  changeClusterChange = cluster => {
    this.props.searchInputState.setCluster(cluster)
    this.onSearchParamsChange()
  }

  onCancel = () => {
    this.setState({ visible: false })
  }

  openDetailsModal = record => {
    this.setState({
      detail: record,
      eventMetadata: toArray(record),
      visible: true,
    })
  }

  clusterRenderer = option => `${t('Cluster')}: ${option.label}`

  renderSearchBar() {
    const { searchInputState, clustersOpts } = this.props
    return (
      <div className={styles.searchBar}>
        <span className={styles.clusterSelect}>
          <Select
            value={searchInputState.cluster}
            onChange={this.changeClusterChange}
            className={styles.queryModeOptions}
            valueRenderer={this.clusterRenderer}
            options={clustersOpts}
          />
        </span>
        <SearchInput
          className={styles.searchInput}
          placeholder={t('search condition')}
          onChange={this.onSearchParamsChange}
          params={searchInputState}
          dropDownItems={dropDownItems}
        />
        <span className={styles.queryModeSelect}>
          <Select
            value={searchInputState.queryMode}
            onChange={this.changeQueryMode}
            className={styles.queryModeOptions}
            options={queryModeOptions}
          />
        </span>
      </div>
    )
  }

  renderToolBar() {
    const { showHistogram, polling, pollingFrequency } = this.state

    return (
      <div className={styles.toolbar}>
        <div>
          {t('Time topology')}
          <span
            className={styles.showHistogramBtn}
            onClick={this.toggleHistogram}
          >
            {showHistogram ? t('Display') : t('Hidden')}
            <Icon name="caret-down" type="light" />
          </span>
        </div>
        <div>
          <span className={styles.pollingBtn} onClick={this.togglePolling}>
            <Tooltip
              content={
                polling ? t('STOP_REAL_TIME_LOG') : t('START_REAL_TIME_LOG')
              }
            >
              <Icon name={polling ? 'stop' : 'start'} type="light" size={16} />
            </Tooltip>
          </span>
          <span className={styles.frequencyOpts}>
            <span> {t('Refresh Rate')}:</span>
            <Select
              value={pollingFrequency}
              onChange={this.changeFrequency}
              className={styles.frequencyOptions}
              options={this.frequencyOptions}
            />
          </span>
        </div>
      </div>
    )
  }

  renderTimeChart() {
    const { logsCount, histogramData, interval } = this.store
    const { buckets = [] } = toJS(histogramData) || {}
    return (
      <div className={styles.chartContainer}>
        <div className={styles.recentSummary}>
          <h2 className={styles.count}>{logsCount}</h2>
          <p>{t('Search Result')}</p>
        </div>
        <div className={styles.chart}>
          <TimeBar
            xKey={'time'}
            data={buckets}
            legend={[['count', t('Auditing statistics')]]}
            interval={interval}
            onBarClick={this.selectedDurationParameter}
          />
        </div>
      </div>
    )
  }

  renderTable = () => {
    const trKeyGetter = (tr, index) => index

    return (
      <div className={styles.table}>
        <Table
          onScrollEnd={this.onTableScrollEnd}
          trCLassName={styles.tr}
          onTrClick={this.openDetailsModal}
          trKeyGetter={trKeyGetter}
          cols={this.tableCols}
          data={this.logs}
          tableRef={this.tableRef}
          body={styles.body}
        />
      </div>
    )
  }

  render() {
    const { showHistogram } = this.state
    return (
      <div className={styles.container}>
        {this.renderSearchBar()}
        <div className={styles.searchResult}>
          {this.renderToolBar()}
          {showHistogram && this.renderTimeChart()}
          {this.renderTable()}
          {this.renderDetailModal()}
        </div>
      </div>
    )
  }

  renderDetailModal() {
    const { visible, detail, eventMetadata, showHistogram } = this.state

    if (!visible) {
      return null
    }

    return (
      <Fragment>
        <div className={styles.mask} onClick={this.onCancel} />
        <div
          className={classnames(styles.detail, {
            [styles.visibleHeight]: showHistogram,
          })}
        >
          <MetadataModal detail={detail} eventMetadata={eventMetadata} />
        </div>
      </Fragment>
    )
  }
}
