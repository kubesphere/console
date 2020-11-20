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
import { observable, computed, action } from 'mobx'
import AnsiUp from 'ansi_up'
import { get } from 'lodash'
import { Icon, Select, Tooltip } from '@kube-design/components'

import PodStore from 'stores/pod'
import ProjectStore from 'stores/project'
import LogStore from 'stores/logging/query'

import { ReactComponent as BackIcon } from 'assets/back.svg'

import DurationSelect from './DurationSelect'

import styles from './index.scss'

const converter = new AnsiUp()

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
      startTime: timestamp - 1000,
      endTime: timestamp + 1000,
    })

    this.podStore = new PodStore()

    this.projectStore = new ProjectStore()

    this.state = {
      pollingFrequency: 5000,
      polling: false,
      query: log,
    }
  }

  logWindow = React.createRef()

  pollingFrequencyOpts = [5, 10, 15].map(second => ({
    label: `${t('Refresh Rate')}: ${t('TIME_S', { num: second })}`,
    value: second * 1000,
  }))

  @observable
  logs = []

  @computed
  get podLink() {
    const { namespace } = this.props.detailState
    const { cluster } = this.props.searchInputState
    const { pods } = this.logStore
    const { workspace } = this.projectStore.detail

    if (!workspace) {
      return ''
    }

    return `/${workspace}/clusters/${cluster}/projects/${namespace}/pods/${pods}`
  }

  @computed
  get containerLink() {
    const { namespace } = this.props.detailState
    const { cluster } = this.props.searchInputState
    const { pods, containers } = this.logStore
    const { workspace } = this.projectStore.detail

    if (!workspace) {
      return ''
    }

    return `/${workspace}/clusters/${cluster}/projects/${namespace}/pods/${pods}/containers/${containers}`
  }

  @computed
  get PodOpts() {
    return this.podStore.list.data.map(pod => ({
      label: pod.name || t('All'),
      value: pod.name || '',
    }))
  }

  @computed
  get ContainersOpts() {
    const selectPod = this.logStore.pods
    const containers = this.getPodContainers(selectPod)
    return containers.map(container => ({
      label: container.name,
      value: container.name,
    }))
  }

  @action
  changePod = pod => {
    this.logStore.pods = pod || ''
    const container = get(this.getPodContainers(pod), '[0].name', '')
    this.changeContainer(container)
  }

  @action
  changeContainer = container => {
    this.logStore.containers = container
    this.logStore.log_query = ''
    this.refreshLogs()
  }

  changeSearchLog = e => {
    this.setState({ query: e.target.value })
  }

  queryLog = e => {
    if (e.keyCode === 13) {
      this.refreshLogs()
    }
  }

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
    this.scrollToBottom()
  }

  scrollToBottom() {
    const logWindow = this.logWindow.current
    logWindow.scrollTop = logWindow.scrollHeight
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
      const { from, size, total } = this.logStore
      if (total > from + size) {
        this.loadMoreLogs()
      }
    }
  }

  @action
  async loadMoreLogs() {
    const { from, size } = this.logStore
    this.logStore.from = from + size
    const nextPageLogs = await this.fetchLogs()
    this.logs.push(...nextPageLogs)
  }

  getPodContainers(podName) {
    const podDetail =
      this.podStore.list.data.find(pod => pod.name === podName) || {}
    return get(podDetail, 'containers', [])
  }

  pre = () => {
    this.props.formStepState.pre()
  }

  componentDidMount() {
    this.fetchPods()
    this.fetchProject()
    this.initialFetch()
  }

  componentWillUnmount() {
    this.stopPolling()
  }

  clearQuery = () => {
    this.setState({ query: '' }, () => {
      this.refreshLogs()
    })
  }

  @action
  async initialFetch() {
    this.logs = await this.fetchLogs()
  }

  @action
  async refreshLogs() {
    this.logStore.from = 0
    this.logStore.log_query = this.state.query
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

  fetchProject() {
    const { namespace } = this.props.detailState
    const { cluster } = this.props.searchInputState
    this.projectStore.fetchDetail(
      { name: namespace, namespace, cluster },
      () => {}
    )
  }

  fetchPods() {
    const { namespace } = this.props.detailState
    const { cluster } = this.props.searchInputState
    this.podStore.fetchList({
      cluster,
      namespace,
      limit: -1,
    })
  }

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.article}>
          {this.renderSummary()}
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
    const { cluster } = this.props.searchInputState

    const link = this.logStore.exportLinkFactory({
      cluster,
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
          value={this.state.query}
          onChange={this.changeSearchLog}
        />
        {this.state.query && (
          <Icon
            className={styles.clearQuery}
            name="close"
            type="light"
            onClick={this.clearQuery}
          />
        )}
      </div>
    )
  }

  renderTerminal() {
    return (
      <div className={styles.logWindow}>
        {this.logs.reverse().map(({ time, log }) => (
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
    const { query } = this.state
    const logQuery = query.trim()
    const matchIndex = log.toUpperCase().indexOf(logQuery.toUpperCase())
    if (!logQuery || matchIndex === -1) {
      return (
        <span
          className={styles.queryLog}
          dangerouslySetInnerHTML={{ __html: converter.ansi_to_html(log) }}
        />
      )
    }
    return (
      <span className={styles.queryLog}>
        <span
          dangerouslySetInnerHTML={{
            __html: converter.ansi_to_html(log.slice(0, matchIndex)),
          }}
        />
        {
          <span
            className={styles.hightLight}
            dangerouslySetInnerHTML={{
              __html: converter.ansi_to_html(
                log.slice(matchIndex, matchIndex + logQuery.length)
              ),
            }}
          />
        }
        <span
          dangerouslySetInnerHTML={{
            __html: converter.ansi_to_html(
              log.slice(matchIndex + logQuery.length)
            ),
          }}
        />
      </span>
    )
  }

  renderLink(link, children) {
    return link ? (
      <a href={link} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    ) : (
      children
    )
  }

  renderSummary() {
    const { detailState } = this.props
    return (
      <div className={styles.summery}>
        <div className={styles.header}>
          <div className={styles.pre} onClick={this.pre}>
            <BackIcon width={16} height={22} />
            <span>{t('Back to previous')}</span>
          </div>
        </div>
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
            <div className={styles.selectContainer}>
              <Select
                prefixIcon={<Icon name="pod" />}
                value={this.logStore.pods}
                onChange={this.changePod}
                options={this.PodOpts}
              />
              <div className={styles.resourceIcon}>
                {this.renderLink(
                  this.podLink,
                  <Icon name="cogwheel" size={16} />
                )}
              </div>
            </div>
          </div>
          <div>
            <h4>{t('Container')}</h4>
            <div className={styles.selectContainer}>
              <Select
                prefixIcon={<Icon name="docker" />}
                value={this.logStore.containers}
                options={this.ContainersOpts}
                onChange={this.changeContainer}
              />
              <div className={styles.resourceIcon}>
                {this.renderLink(
                  this.containerLink,
                  <Icon name="cogwheel" size={16} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
