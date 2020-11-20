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
import { observer } from 'mobx-react'
import { observable, action, toJS } from 'mobx'
import moment from 'moment-mini'
import { min, isString, includes } from 'lodash'
import memoizee from 'memoizee'
import AnsiUp from 'ansi_up'

import LogQueryStore from 'stores/logging/query'
import HistogramStore from 'stores/logging/histogram'

import { Icon, Select, Tooltip } from '@kube-design/components'
import Table from 'components/Tables/Visible'
import { markAll, esMark, mark } from 'utils/log'

import TimeBar from 'components/Charts/Bar/TimeBar'
import SearchInput from '../SearchInput'

import styles from './index.scss'

const converter = new AnsiUp()

const DefaultRealTimeConfig = {
  duration: 600,
  step: '10s',
}

const getSecond = step => {
  const [, count = 0, unit = 's'] = step.match(/(\d+)(\w+)/)
  const unitMap = {
    s: 1,
    m: 60,
    h: 60 * 60,
    d: 60 * 60 * 24,
  }
  return count * unitMap[unit]
}

const stepLevelList = ['m', 'h', 'd', 'M', 'y']

@observer
export default class LogSearchModal extends React.Component {
  queryStore = new LogQueryStore({
    size: 50,
  })

  histogramStore = new HistogramStore()

  markMemoizee = memoizee(markAll, {
    normalizer: ([log, args = [], handler = () => {}]) =>
      `${log}+${args.toString()})+${handler.name}`,
    maxAge: 3000,
  })

  @observable
  tableCols = [
    {
      thead: t('Time'),
      key: 'time',
      content: data => `[${moment(data.time).format('YYYY-MM-DD HH:mm:ss')}]`,
      hidden: false,
    },
    {
      thead: t('Project'),
      key: 'project',
      content: this.renderHightLightMatchTd({
        resKey: 'namespace',
        searchKey: ['namespace_query'],
      }),
      hidden: false,
    },
    {
      thead: t('Pod'),
      key: 'pod',
      hidden: false,
      content: this.renderHightLightMatchTd({
        resKey: 'pod',
        searchKey: ['pod_query', 'workload_query'],
      }),
    },
    {
      thead: t('Container'),
      key: 'container',
      hidden: true,
      content: this.renderHightLightMatchTd({
        resKey: 'container',
        searchKey: ['container_query'],
      }),
    },
    {
      thead: t('Log'),
      key: 'log',
      className: styles.logItem,
      content: this.renderHightLightMatchLogTd({
        resKey: 'log',
        searchKey: ['log_query'],
        handler: esMark,
      }),
      mustShow: true,
    },
  ]

  @observable
  logs = []

  state = {
    showHistogram: true,
    polling: false,
    pollingFrequency: 5000,
  }

  tableRef = React.createRef()

  frequencyOptions = [5, 10, 15].map(second => ({
    value: second * 1000,
    label: `${t('TIME_S', { num: second })}`,
  }))

  queryModeOptions = [1, 0].map(mode => ({
    value: mode,
    label: mode ? t('Exact Query') : t('Fuzzy Query'),
  }))

  get defaultDuration() {
    return {
      start_time: 0,
      end_time: Date.now(),
      interval: '1d',
    }
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
          const key = queryMode
            ? queryKey.replace(/([^(log)]+)_query/, '$1s')
            : queryKey
          const preQueryValue = searchQuery[key]
          searchQuery[key] = preQueryValue
            ? `${preQueryValue},${newQueryValue}`
            : newQueryValue
          return searchQuery
        },
        { cluster }
      )
  }

  get duration() {
    const { searchInputState } = this.props || {}
    const now = Date.now()
    const { start, end, step } = searchInputState

    if (start) {
      return {
        start_time: min([start * 1000, now]),
        end_time: min([end * 1000, now]),
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
    this.markMemoizee.clear()
  }

  @action
  async refreshQuery() {
    this.queryStore.from = 0
    const query = this.getQueryParams()
    const result = await this.fetchQuery({ ...query, ...this.duration })
    this.logs = result.reverse()
    this.scrollTo(this.logs.length)
  }

  @action
  async fetchQuery(params) {
    await this.queryStore.fetch(params)
    return this.queryStore.records
  }

  @action
  fetchHistogram() {
    const query = this.getQueryParams()
    this.histogramStore.interval = this.duration.interval
    this.histogramStore.fetch({ ...query, ...this.duration })
  }

  @action
  selectedDurationParameter = ({ time: startTime = 0 }) => {
    const { interval } = this.histogramStore
    const { searchInputState } = this.props
    searchInputState.end = Math.ceil(startTime / 1000) + getSecond(interval)
    searchInputState.start = Math.ceil(startTime / 1000)
    searchInputState.step = this.getNextStepLevel(interval)
    this.fetchHistogram()
    this.refreshQuery()
  }

  @action
  onTableScrollTop = ({ scrollTop }) => {
    const { from, size, total } = this.queryStore
    if (scrollTop === 0 && total > from + size) {
      this.loadMoreLogs()
    }
  }

  @action
  async loadMoreLogs() {
    const from = this.queryStore.from + this.queryStore.size

    const newLogs = await this.fetchQuery({
      ...this.queryStore.preParams,
      ...{ from },
    })
    this.logs = [...newLogs.reverse(), ...this.logs]
    this.scrollTo(newLogs.length)
  }

  getNextStepLevel(interval) {
    const [, current = 'm'] = interval.match(/\d+(\w+)$/)
    const level = stepLevelList.findIndex(step => step === current)
    return level < 1 ? `1${stepLevelList[0]}` : `1${stepLevelList[level - 1]}`
  }

  onSearchParamsChange = () => {
    this.stopPolling()
    this.fetchHistogram()
    this.refreshQuery()
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

  renderHightLightMatchTd({ resKey, searchKey, handler = mark }) {
    return data => {
      const queryResult = data[resKey] || ''

      const querys = this.props.searchInputState.query
        .filter(({ key, value }) => value && includes(searchKey, key))
        .map(({ value }) => value)

      const markedResult = this.markMemoizee(queryResult, querys, handler)

      return (
        <span>
          {markedResult.map((log, index) =>
            isString(log) ? (
              log
            ) : (
              <span key={index} className={styles.hightLightMatch}>
                {log.hightLighted}
              </span>
            )
          )}
        </span>
      )
    }
  }

  renderHightLightMatchLogTd({ resKey, searchKey, handler = mark }) {
    return data => {
      const queryResult = converter.ansi_to_html(data[resKey] || '')

      const querys = this.props.searchInputState.query
        .filter(({ key, value }) => value && includes(searchKey, key))
        .map(({ value }) => value)

      const markedResult = this.markMemoizee(queryResult, querys, handler)

      return (
        <span
          dangerouslySetInnerHTML={{
            __html: markedResult.map((log, index) =>
              isString(log) ? (
                log
              ) : (
                <span key={index} className={styles.hightLightMatch}>
                  {log.hightLighted}
                </span>
              )
            ),
          }}
        />
      )
    }
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
  async addPollingQuery() {
    const query = this.getQueryParams()
    const duration = {
      from: 0,
      start_time: Date.now() - this.state.pollingFrequency,
      end_time: Date.now(),
    }
    const logs = await this.fetchQuery({ ...query, ...duration })
    this.logs.push(...logs.reverse())
    this.scrollTo(this.logs.length)
  }

  scrollTo(index) {
    const tableRef = this.tableRef.current
    tableRef.scrollToRow(index)
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

  selectLog = log => {
    this.props.detailState.setState({ ...log })
    this.props.formStepState.next()
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
        </div>
      </div>
    )
  }

  clusterRenderer = option => `${t('Cluster')}: ${option.label}`

  renderSearchBar() {
    return (
      <div className={styles.searchBar}>
        {globals.app.isMultiCluster && (
          <Select
            value={this.props.searchInputState.cluster}
            onChange={this.changeClusterChange}
            className={styles.select}
            valueRenderer={this.clusterRenderer}
            options={this.props.clustersOpts}
          />
        )}
        <SearchInput
          className={styles.searchInput}
          onChange={this.onSearchParamsChange}
          params={this.props.searchInputState}
          dropDownItems={{
            log_query: {
              icon: 'magnifier',
              text: t('Keyword'),
            },
            namespace_query: {
              icon: 'project',
              text: t('Project'),
            },
            workload_query: {
              icon: 'backup',
              text: t('Workload'),
            },
            pod_query: {
              icon: 'pod',
              text: t('Pod'),
            },
            container_query: {
              icon: 'docker',
              text: t('Container'),
            },
          }}
        />
        <Select
          className={styles.select}
          value={this.props.searchInputState.queryMode}
          onChange={this.changeQueryMode}
          options={this.queryModeOptions}
        />
      </div>
    )
  }

  renderToolBar() {
    const { showHistogram, polling, pollingFrequency } = this.state
    const params = { ...this.duration, ...this.getQueryParams() }

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
          <a href={this.queryStore.exportLinkFactory(params)} download>
            <span className={styles.exportBtn}>
              <Tooltip content={t('LOG_EXPORT')}>
                <Icon name={'export'} type="light" size={16} />
              </Tooltip>
            </span>
          </a>
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
    return (
      <div className={styles.chartContainer}>
        <div className={styles.recentSummary}>
          <h2 className={styles.count}>{this.histogramStore.logsCount}</h2>
          <p>{t('Search Result')}</p>
        </div>
        <div className={styles.chart}>
          <TimeBar
            xKey={'time'}
            data={toJS(this.histogramStore.histograms)}
            legend={[['count', t('Log statistics')]]}
            interval={this.histogramStore.interval}
            onBarClick={this.selectedDurationParameter}
          />
        </div>
      </div>
    )
  }

  renderTable() {
    return (
      <div className={styles.table}>
        <Table
          onScroll={this.onTableScrollTop}
          onTrClick={this.selectLog}
          cols={this.tableCols}
          data={this.logs}
          tableRef={this.tableRef}
        />
      </div>
    )
  }
}
