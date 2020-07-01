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
import moment from 'moment-mini'
import classnames from 'classnames'
import { observer } from 'mobx-react'
import { observable, action } from 'mobx'
import { Link } from 'react-router-dom'
import stripAnsi from 'strip-ansi'

import LogStore from 'stores/logging/query'

import { ReactComponent as BackIcon } from 'src/assets/back.svg'
import { Icon, Select, Tooltip } from '@pitrix/lego-ui'
import DurationSelect from './DurationSelect'

import styles from './index.scss'

@observer
export default class DetailModal extends React.Component {
  constructor(props) {
    super(props)

    const { pod, container, namespace, log, time } = this.props.detailState

    const timestamp = new Date(time).getTime()

    this.logStore = new LogStore({
      sort: 'desc',
      pods: pod,
      namespaces: namespace,
      containers: container,
      size: 100,
      log_query: log,
      startTime: timestamp - 1000,
      endTime: timestamp + 1000,
    })

    this.state = {
      pollingFrequency: 5000,
      polling: false,
    }
  }

  logWindow = React.createRef()

  pollingFrequencyOpts = [5, 10, 15].map(second => ({
    label: `${t('Refresh Rate')}: ${t('TIME_S', { num: second })}`,
    value: second * 1000,
  }))

  @observable
  logs = []

  @action
  changeSearchLog = e => {
    this.logStore.log_query = e.target.value
  }

  @action
  queryLog = () => {
    this.refreshLogs()
  }

  @action
  togglePolling = () => {
    const { polling } = this.state
    polling ? this.stopPolling() : this.startPolling()
    this.setState({
      polling: !polling,
    })
  }

  @action
  async startPolling() {
    const now = Date.now()
    this.logs = await this.fetchLogs({
      end_time: now,
      start_time: now - 1000 * 60,
      from: 0,
    })
    this.interval = setInterval(() => {
      this.addPollingLogs()
    }, this.state.pollingFrequency)
  }

  @action
  async addPollingLogs() {
    const now = Date.now()

    const logs = await this.fetchLogs({
      end_time: now,
      start_time: now - this.state.pollingFrequency,
      from: 0,
    })

    this.logs.unshift(...logs)
    this.scrollToTop()
  }

  scrollToTop() {
    const logWindow = this.logWindow.current
    logWindow.scrollTop = 0
  }

  stopPolling = () => {
    clearInterval(this.interval)
  }

  @action
  onFrequencySelect = frequency => {
    this.setState({
      pollingFrequency: frequency,
    })
  }

  onDurationChange = () => {
    this.refreshLogs()
  }

  onLogScroll = e => {
    const target = e.currentTarget
    const nScrollHight = target.scrollHeight
    const nScrollTop = target.scrollTop
    const nDivHight = target.clientHeight
    if (nScrollTop + nDivHight >= nScrollHight) {
      this.onScrollEnd()
    }
  }

  onScrollEnd() {
    const { from, size, total } = this.logStore
    if (total > from + size) {
      this.loadMoreLogs()
    }
  }

  @action
  async loadMoreLogs() {
    const { from, size } = this.logStore
    this.logStore.from = from + size
    const nextPageLogs = await this.fetchLogs()
    this.logs.push(...nextPageLogs)
  }

  pre = () => {
    this.props.formStepState.pre()
  }

  componentDidMount() {
    this.refreshLogs()
  }

  componentWillUnmount() {
    this.stopPolling()
  }

  @action
  clearQuery = () => {
    this.logStore.log_query = ''
    this.refreshLogs()
  }

  @action
  async refreshLogs() {
    this.logStore.from = 0
    this.setState({
      polling: false,
    })
    this.stopPolling()
    this.logs = await this.fetchLogs()
  }

  async fetchLogs(params = {}) {
    const { cluster } = this.props.searchInputState
    await this.logStore.fetch({ ...params, cluster })
    return this.logStore.records
  }

  closeModal = () => {
    this.props.close && this.props.close()
  }

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.pre} onClick={this.pre}>
            <BackIcon width={16} height={22} />
            <span>{t('Back to previous')}</span>
          </div>
        </div>
        <div className={styles.article}>
          {this.renderSummery()}
          {this.renderLog()}
        </div>
      </div>
    )
  }

  renderLog() {
    const { polling } = this.state
    return (
      <div className={styles.log}>
        <div
          className={classnames(
            styles.toolbar,
            this.state.polling ? styles.pollingMode : ''
          )}
        >
          {this.state.polling || this.renderDurationSelect()}
          {this.renderSearchInput()}
          {this.renderPollingBtn()}
          {this.renderPollingOpts()}
          {this.renderExportBtn()}
        </div>
        <div
          className={styles.terminal}
          onScroll={polling ? null : this.onLogScroll}
          ref={this.logWindow}
        >
          {this.renderTerminal()}
        </div>
      </div>
    )
  }

  renderPollingOpts() {
    return (
      <div className={styles.frequencyOpts}>
        <Select
          options={this.pollingFrequencyOpts}
          value={this.state.pollingFrequency}
          onChange={this.onFrequencySelect}
        />
      </div>
    )
  }

  renderPollingBtn() {
    return (
      <div className={styles.pollingBtn} onClick={this.togglePolling}>
        <Icon type="light" name={this.state.polling ? 'stop' : 'start'} />
      </div>
    )
  }

  renderExportBtn() {
    const {
      pods: pod,
      containers: container,
      log_query,
      startTime: start_time,
      endTime: end_time,
      namespaces,
    } = this.logStore

    const link = this.logStore.exportLinkFactory({
      namespaces,
      pods: pod,
      containers: container,
      log_query,
      start_time,
      end_time,
    })

    return (
      <a href={link} download>
        <div className={styles.pollingBtn}>
          <Tooltip content={t('LOG_EXPORT')}>
            <Icon name={'export'} type="light" />
          </Tooltip>
        </div>
      </a>
    )
  }

  renderDurationSelect() {
    return (
      <div className={styles.duration}>
        <DurationSelect
          duration={this.logStore}
          onChange={this.onDurationChange}
        />
      </div>
    )
  }

  renderSearchInput() {
    return (
      <div className={styles.input}>
        <Icon name="magnifier" type="light" />
        <input
          type="text"
          onKeyUp={this.queryLog}
          value={this.logStore.log_query}
          onChange={this.changeSearchLog}
        />
        <Icon
          className={styles.clearQuery}
          name="close"
          type="light"
          onClick={this.clearQuery}
        />
      </div>
    )
  }

  renderTerminal() {
    return (
      <div className={styles.logWindow}>
        {this.logs.map(({ time, log }) => (
          <p key={`${time}${log}`}>
            <span className={styles.logTime}>
              {moment(time).format('YYYY-MM-DD HH:mm:ss')}:{' '}
              {this.renderHighLightLog(log)}
            </span>
          </p>
        ))}
      </div>
    )
  }

  renderHighLightLog(log) {
    const { log_query } = this.logStore
    const logQuery = log_query.trim()
    const matchIndex = log.toUpperCase().indexOf(logQuery.toUpperCase())
    if (!logQuery || matchIndex === -1) {
      return <span className={styles.queryLog}>{stripAnsi(log)}</span>
    }

    const preString = log.slice(0, matchIndex)
    const highlightLog = (
      <span className={styles.hightLight}>
        {stripAnsi(log.slice(matchIndex, matchIndex + logQuery.length))}
      </span>
    )
    const lastString = log.slice(matchIndex + logQuery.length)
    return (
      <span className={styles.queryLog}>
        {stripAnsi(preString)}
        {highlightLog}
        {stripAnsi(lastString)}
      </span>
    )
  }

  renderLink(link, children) {
    return link ? (
      <Link to={link} onClick={this.closeModal}>
        {children}
      </Link>
    ) : (
      <span className={styles.disableLink}>{children}</span>
    )
  }

  renderSummery() {
    const { detailState } = this.props
    return (
      <div className={styles.summery}>
        <h3>{t('Region Data')}</h3>
        <div className={styles.dataList}>
          <div>
            <h4>{t('Project')}</h4>
            <p>
              <span>
                <Icon name="project" /> {detailState.namespace}
              </span>
            </p>
          </div>
          <div>
            <h4>{t('Pod')}</h4>
            <p>
              <span>
                <Icon name="pod" /> {detailState.pod}
              </span>
            </p>
          </div>
          <div>
            <h4>{t('Container')}</h4>
            <p>
              <span>
                <Icon name="docker" /> {detailState.container}
              </span>
            </p>
          </div>
        </div>
      </div>
    )
  }
}
