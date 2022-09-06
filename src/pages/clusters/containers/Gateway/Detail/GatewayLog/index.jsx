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

import { observer, inject } from 'mobx-react'

import EmptyList from 'components/Cards/EmptyList'
import SearchInput from 'components/Modals/LogSearch/Logging/SearchInput'
import { computed, observable, toJS, action } from 'mobx'
import { Icon, Select, Tooltip } from '@kube-design/components'
import classnames from 'classnames'
import { isArray, isEmpty, min, includes, isString } from 'lodash-es'

import moment from 'moment-mini'

import Table from 'components/Tables/Visible'
import memoizee from 'memoizee'
import { markAll, esMark, mark } from 'utils/log'
import AnsiUp from 'ansi_up'
import styles from './index.scss'

const converter = new AnsiUp()

const DefaultRealTimeConfig = {
  duration: 600,
}

@inject('detailStore')
@observer
export default class GatewayLog extends React.Component {
  @observable
  searchInputState = {
    query: [],
    start: '',
    end: '',
    durationAlias: '',
    nextParamsKey: '',
  }

  tableRef = React.createRef()

  state = {
    polling: false,
  }

  @observable
  pollingFrequency = 5000

  @observable
  logs = []

  @computed
  get hasValue() {
    return Object.values(toJS(this.searchInputState)).some(item =>
      isArray(item) ? item.some(_item => !isEmpty(toJS(_item))) : !isEmpty(item)
    )
  }

  get defaultDuration() {
    return {
      start_time: 0,
      end_time: Date.now(),
    }
  }

  get duration() {
    const now = Date.now()
    const { start, end } = this.searchInputState

    if (start) {
      return {
        start_time: min([start * 1000, now]),
        end_time: min([end * 1000, now]),
      }
    }
    return this.defaultDuration
  }

  get dropDownContent() {
    return {
      log_query: {
        icon: 'magnifier',
        text: t('KEYWORD'),
      },
      pod_query: {
        icon: 'pod',
        text: t('POD'),
      },
    }
  }

  componentDidMount() {
    this.refreshQuery()
  }

  componentWillUnmount() {
    clearInterval(this.pollingInterval)
  }

  get store() {
    return this.props.detailStore
  }

  @observable
  tableCols = [
    {
      thead: t('TIME'),
      key: 'time',
      dataIndex: 'time',
      mustShow: true,
      content: data => `[${moment(data.time).format('YYYY-MM-DD HH:mm:ss')}]`,
    },
    {
      thead: t('POD'),
      key: 'pod',
      dataIndex: 'pod',
      mustShow: true,
      content: this.renderHightLightMatchTd({
        resKey: 'pod',
        searchKey: ['pod_query'],
      }),
    },
    {
      thead: t('MESSAGE'),
      key: 'log',
      dataIndex: 'log',
      className: styles.logItem,
      content: this.renderHightLightMatchLogTd({
        resKey: 'log',
        searchKey: ['log_query'],
        handler: esMark,
      }),
      mustShow: true,
    },
  ]

  markMemoizee = memoizee(markAll, {
    normalizer: ([log, args = [], handler = () => {}]) =>
      `${log}+${args.toString()})+${handler.name}`,
    maxAge: 3000,
  })

  renderHightLightMatchTd = ({ resKey, searchKey, handler = mark }) => {
    return data => {
      const queryResult = data[resKey] || ''

      const querys = this.searchInputState.query
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

  renderHightLightMatchLogTd = ({ resKey, searchKey, handler = mark }) => {
    return data => {
      const queryResult = converter.ansi_to_html(data[resKey] || '')

      const querys = this.searchInputState.query
        .filter(({ key, value }) => value && includes(searchKey, key))
        .map(({ value }) => value)

      const markedResult = this.markMemoizee(queryResult, querys, handler)
      const result = markedResult.map(log =>
        isString(log)
          ? log
          : `<span class="${styles.hightLightMatch}">${log.hightLighted}</span>`
      )
      return (
        <span
          dangerouslySetInnerHTML={{
            __html: result.join(''),
          }}
        />
      )
    }
  }

  getQueryParams() {
    const { query: inputQuery } = this.searchInputState
    return inputQuery
      .filter(({ key }) => key)
      .reduce((searchQuery, query) => {
        const queryKey = query.key
        const newQueryValue = query.value
        const key = queryKey
        const preQueryValue = searchQuery[key]
        searchQuery[key] = preQueryValue
          ? `${preQueryValue},${newQueryValue}`
          : newQueryValue
        return searchQuery
      }, {})
  }

  @action
  async refreshQuery() {
    const query = this.getQueryParams()
    const result = await this.fetchLog({
      ...query,
      from: 0,
      size: 50,
      ...this.duration,
    })
    this.logs = result.reverse()
    this.scrollTo(this.logs.length)
  }

  @action
  async fetchLog(params) {
    const { cluster, namespace, gatewayName } = this.props.match.params
    return await this.store.getGatewayLogs({
      cluster,
      namespace,
      gatewayName,
      ...params,
    })
  }

  @action
  async loadMoreLogs() {
    const from = this.store.logs.from + this.store.logs.size
    const query = this.getQueryParams()
    const newLogs = await this.fetchLog({
      ...query,
      ...this.duration,
      from,
      size: 50,
    })
    this.logs = [...newLogs.reverse(), ...this.logs]
    this.scrollTo(newLogs.length)
  }

  scrollTo = index => {
    try {
      const tableRef = this.tableRef.current
      tableRef.scrollToRow(index)
    } catch {}
  }

  @action
  onTableScrollTop = ({ scrollTop }) => {
    const { from, size, total } = this.store.logs

    if (scrollTop === 0 && total > from + size) {
      this.loadMoreLogs()
    }
  }

  initQuery = () => {
    this.searchInputState = {
      query: [],
      start: '',
      end: '',
      durationAlias: '',
      nextParamsKey: '',
    }
  }

  togglePolling = () => {
    this.state.polling ? this.stopPolling() : this.startPolling()
  }

  stopPolling() {
    clearTimeout(this.pollingInterval)
    this.setState({ polling: false })
  }

  startPolling() {
    this.setState({ polling: true })
    this.pollingFunc()
    if (this.pollingInterval) {
      clearTimeout(this.pollingInterval)
    }
    this.pollingInterval = setInterval(this.pollingFunc, this.pollingFrequency)
  }

  @action
  changeFrequency = value => {
    this.pollingFrequency = value
    if (this.state.polling) {
      clearTimeout(this.pollingInterval)
      this.startPolling()
    }
  }

  @action
  pollingFunc = () => {
    const { duration } = DefaultRealTimeConfig
    this.searchInputState.end = Math.ceil(Date.now() / 1000)
    this.searchInputState.start = this.searchInputState.end - duration
    this.searchInputState.durationAlias = `${duration / 60}m`
    this.refreshQuery()
  }

  onSearchParamsChange = () => {
    this.stopPolling()
    this.refreshQuery()
  }

  renderOperation() {
    const intervalOpts = [5, 10, 20].map(second => ({
      label: t('REFRESH_INTERVAL_VALUE', { value: second }),
      value: second * 1000,
    }))

    const params = { ...this.duration, ...this.getQueryParams() }

    return (
      <div className={styles.filter}>
        <div
          className={classnames(styles.filterButton, styles.pollingBtn)}
          onClick={this.togglePolling}
        >
          <Icon name={this.state.polling ? 'stop' : 'start'} type="light" />
        </div>
        <Select
          prefixIcon={<Icon type={'light'} name="timed-task" size={20} />}
          className={classnames(styles.filterButton, styles.frequencyOpts)}
          defaultValue={5000}
          options={intervalOpts}
          onChange={this.changeFrequency}
        />

        <a href={this.store.exportLinkFactory(params)} download>
          <span className={classnames(styles.filterButton, styles.exportBtn)}>
            <Tooltip content={t('EXPORT_LOGS')}>
              <Icon name={'export'} type="light" />
            </Tooltip>
          </span>
        </a>
      </div>
    )
  }

  handleRefresh = () => {
    this.refreshQuery()
  }

  clearFilter = () => {
    this.initQuery()
    this.refreshQuery()
  }

  renderEmpty = () => {
    return (
      <div className={styles.emptyText}>
        <span className={styles.emptyTipIcon}>
          <Icon name="exclamation" size={48} />
        </span>
        <div>{t('NO_MATCHING_RESULT_FOUND')}</div>
        <p>
          {t('YOU_CAN_TRY_TO')}
          <span
            className={styles.action}
            onClick={this.handleRefresh}
            data-test="table-empty-refresh"
          >
            {t('REFRESH_DATA')}
          </span>
          {t('OR')}
          <span
            className={styles.action}
            onClick={this.clearFilter}
            data-test="table-empty-clear-filter"
          >
            {t('CLEAR_SEARCH_CONDITIONS')}
          </span>
        </p>
      </div>
    )
  }

  render() {
    if (!globals.app.hasKSModule('logging')) {
      return (
        <EmptyList
          className="no-shadow"
          icon="cluster"
          title={t('LOGGING_DISABLED')}
        />
      )
    }

    return (
      <div>
        <div className={styles.title}>
          <div
            className={classnames(styles.search, {
              [styles.focus]: this.hasValue,
            })}
          >
            <Icon className={styles.isLeft} name="magnifier" size={20} />
            <SearchInput
              className={styles.searchInput}
              onChange={this.onSearchParamsChange}
              params={this.searchInputState}
              dropdownClass={styles.dropdownClass}
              iconThem="light"
              enableClear
              dropDownItems={this.dropDownContent}
              showStep={false}
            />
            <Icon
              className={classnames(styles.clearIcon, {
                [styles.hideIcon]: !this.hasValue,
              })}
              name="close"
              onClick={this.initQuery}
            />
          </div>
          {this.renderOperation()}
        </div>
        <div className={styles.body}>
          {isEmpty(toJS(this.logs)) ? (
            this.renderEmpty()
          ) : (
            <Table
              onScroll={this.onTableScrollTop}
              cols={this.tableCols}
              data={toJS(this.logs)}
              tableRef={this.tableRef}
              trCLassName={styles.trCLassName}
              body={styles.bodyClassName}
              header={styles.headerClassName}
            />
          )}
        </div>
      </div>
    )
  }
}
