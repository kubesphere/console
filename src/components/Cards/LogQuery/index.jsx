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

import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { debounce } from 'lodash'
import moment from 'moment-mini'
import stripAnsi from 'strip-ansi'
import classnames from 'classnames'

import CustomRange from 'components/Cards/Monitoring/Controller/TimeSelector/Range/Custom'
import { Select, Icon, Tooltip } from '@kube-design/components'
import { Card } from 'components/Base'

import { dateI18n, getLastTimeRange } from './utils'

import styles from './index.scss'

@observer
class LogCollectionDetailContainers extends Component {
  get store() {
    return this.props.store
  }

  timer = 0

  defaultRecent = '7d'

  defaultInterval = 5000

  logContainerRef = React.createRef()

  state = {
    interval: this.defaultInterval,
    polling: false,
    recent: this.defaultRecent,
    startTime: 0,
    endTime: 0,
    timeRangeSelectorVisible: false,
  }

  intervalOpts = [5, 10, 20].map(second => ({
    label: t('REFRESH_INTERVAL_VALUE', { value: second }),
    value: second * 1000,
  }))

  recentOpts = ['30m', '1h', '2h', '5h', '1d', '2d', '7d']

  componentDidMount() {
    this.props.realTime ? this.startPolling() : this.refreshLog()
  }

  componentWillUnmount() {
    this.stopPolling()
  }

  stopPolling() {
    this.setState({
      polling: false,
    })
    clearTimeout(this.timer)
  }

  startPolling() {
    this.setState(
      pre => ({
        polling: true,
        recent: pre.recent || this.defaultRecent,
      }),
      this.polling
    )
  }

  polling = () => {
    this.refreshLog()
    const { interval } = this.state

    this.timer = setTimeout(this.polling, interval)
  }

  togglePolling = () => {
    const { polling } = this.state
    polling ? this.stopPolling() : this.startPolling()
  }

  refreshLog = () => {
    const { recent } = this.state
    const { startTime, endTime } = recent
      ? getLastTimeRange(recent)
      : this.state
    this.store.fetch({
      start_time: startTime,
      end_time: endTime,
      from: 0,
    })
  }

  debouncedRefreshLog = debounce(this.refreshLog, 200)

  onIntervalChange = interval => {
    this.setState({
      interval,
    })
  }

  onKeyWordChange = e => {
    this.store.setQuery(e.target.value)
    this.debouncedRefreshLog()
  }

  changeRecent = e => {
    const { recent } = e.target.dataset
    this.setState(
      {
        recent,
        timeRangeSelectorVisible: false,
      },
      this.refreshLog
    )
  }

  changeLogRange = ({ start, end }) => {
    this.setState(
      {
        recent: '',
        timeRangeSelectorVisible: false,
        startTime: start * 1000,
        endTime: end * 1000,
      },
      this.refreshLog
    )
    this.stopPolling()
  }

  onScroll = debounce(() => {
    const container = this.logContainerRef.current || {}
    const { scrollHeight, scrollTop, clientHeight } = container

    if (scrollTop + clientHeight >= scrollHeight && scrollHeight) {
      this.stopPolling()
      this.store.haveMore && this.store.loadMoreLogs()
    }
  })

  toggleRange = () => {
    this.setState(preState => ({
      timeRangeSelectorVisible: !preState.timeRangeSelectorVisible,
    }))
  }

  render() {
    const { className } = this.props
    const { timeRangeSelectorVisible } = this.state
    return (
      <Card className={className}>
        <div className={styles.wrapper}>
          <div className={styles.toolbar}>
            <div className={styles.toolbarContent}>
              {this.renderFilter()}
              {this.renderSearchInput()}
              {timeRangeSelectorVisible && this.renderRange()}
            </div>
          </div>

          <div
            className={styles.logList}
            ref={this.logContainerRef}
            onScroll={this.onScroll}
          >
            {this.renderLogs()}
          </div>
        </div>
      </Card>
    )
  }

  renderFilter() {
    const { polling, recent } = this.state
    const { realTime } = this.props

    return (
      <div className={styles.filter}>
        {realTime && (
          <Select
            className={classnames(styles.filterButton, styles.frequencyOpts)}
            value={this.state.interval}
            options={this.intervalOpts}
            onChange={this.onIntervalChange}
          />
        )}
        <div className={styles.filterButton} onClick={this.toggleRange}>
          {recent ? this.renderRecentRange() : this.renderLogRange()}
        </div>
        {realTime && (
          <div className={classnames(styles.filterButton, styles.pollingBtn)}>
            <Icon
              name={polling ? 'stop' : 'start'}
              type="light"
              onClick={this.togglePolling}
            />
          </div>
        )}
        {this.renderExportBtn()}
      </div>
    )
  }

  renderExportBtn() {
    const { recent } = this.state
    const { startTime: start_time, endTime: end_time } = recent
      ? getLastTimeRange(recent)
      : this.state

    const { containers: container, pods: pod } = this.store
    const { cluster, namespaces: namespace } = this.store.pathParams

    const link = this.store.exportLinkFactory({
      pod,
      cluster,
      namespace,
      container,
      start_time,
      end_time,
      log_query: this.store.log_query,
    })
    return (
      <Tooltip content={t('EXPORT_LOGS')}>
        <a href={link} download>
          <span className={classnames(styles.filterButton, styles.exportBtn)}>
            <Icon name={'export'} />
          </span>
        </a>
      </Tooltip>
    )
  }

  renderLogRange() {
    const { startTime, endTime } = this.state
    const format = 'YYYY.MM.DD HH:mm:ss'
    return `${moment(startTime).format(format)} ~ ${moment(endTime).format(
      format
    )}`
  }

  renderRecentRange() {
    const { recent } = this.state
    return `${t('LAST')} ${dateI18n(recent)}`
  }

  renderRange() {
    return (
      <div className={styles.timeRange}>
        <div className={styles.range}>{this.renderRecentOpts()}</div>
        <div>{this.renderCustomRange()}</div>
      </div>
    )
  }

  renderCustomRange() {
    return (
      <CustomRange
        showStep={false}
        onSubmit={this.changeLogRange}
        onCancel={this.toggleRange}
      />
    )
  }

  renderRecentOpts() {
    return (
      <div className={styles.recentOpts}>
        <h3>{t('SELECT_TIME_RANGE')}</h3>
        <ul>
          {this.recentOpts.map(recent => (
            <li
              key={recent}
              className={classnames({
                [styles.select]: recent === this.state.recent,
              })}
              data-recent={recent}
              onClick={this.changeRecent}
            >
              {t('LAST')} {dateI18n(recent)}
            </li>
          ))}
        </ul>
      </div>
    )
  }

  renderSearchInput() {
    return (
      <div className={styles.searchBar}>
        <Icon className={styles.icon} type="light" name="magnifier" />
        <input
          className={styles.input}
          placeholder={t('SEARCH')}
          onChange={this.onKeyWordChange}
          value={this.store.log_query}
          type="text"
        />
      </div>
    )
  }

  renderLogs() {
    return this.store.records.map((record, index) => (
      <p className={styles.record} key={index}>
        <span className={styles.time}>
          {moment(record.time).format('YYYY-MM-DD HH:mm:ss.SSS: ')}
        </span>
        <span className={styles.log}>{this.renderHighlight(record.log)}</span>
      </p>
    ))
  }

  renderHighlight(log) {
    const { log_query: logQuery } = this.store
    if (!logQuery) {
      return stripAnsi(log)
    }
    const className = styles.hightLight
    return log.split(this.store.log_query).reduce((logs, logChip, index) =>
      [].concat(
        stripAnsi(logs),
        <span className={className} key={index}>
          {stripAnsi(logQuery)}
        </span>,
        stripAnsi(logChip)
      )
    )
  }
}

export default LogCollectionDetailContainers
