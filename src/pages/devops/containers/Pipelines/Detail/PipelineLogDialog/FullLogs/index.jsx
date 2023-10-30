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
import { action, computed } from 'mobx'
import { observer } from 'mobx-react'
import { Icon, Loading, Tooltip } from '@kube-design/components'
import styles from './index.scss'

@observer
export default class FullLogs extends React.Component {
  ref = React.createRef()

  store = this.props.store

  logRefreshInterval = null

  state = {
    isRealtime: false,
    isDownloading: false,
  }

  @action
  getPipelineIndexLog(refresh = false) {
    const { params } = this.props
    this.store.getRunStatusLogs(params, refresh)
  }

  @computed
  get isLogFinish() {
    if (this.store.overflow) {
      return true
    }
    const logs = this.store.runDetailLogs.split('\n')
    let index = logs.length - 1
    let start = 0
    let isFinish = false

    while (start < 2) {
      isFinish = logs[index] && logs[index].indexOf('Finished') > -1
      index--
      start++
    }

    return isFinish
  }

  componentDidMount() {
    this.handleGetLogs()
  }

  componentWillUnmount() {
    clearInterval(this.logRefreshInterval)
  }

  scrollToBottom = () => {
    const ref = this.ref.current
    if (ref) {
      ref.scrollTop = ref.scrollHeight
    }
  }

  handleGetLogs = async () => {
    await this.getPipelineIndexLog()
    this.handleAutoRefreshLogs()
  }

  handleDownload = async () => {
    this.setState({ isDownloading: true })
    await this.store.handleDownloadLogs(this.props.params)
    this.setState({ isDownloading: false })
  }

  handleRefreshLogs = async () => {
    await this.getPipelineIndexLog(true)
    await this.handleRealtime()
    this.scrollToBottom()
  }

  handleSetLogsInterval = callback => {
    this.logRefreshInterval = setInterval(async () => {
      await this.getPipelineIndexLog()
      this.scrollToBottom()

      if (this.isLogFinish) {
        clearInterval(this.logRefreshInterval)
        callback && callback()
      }
    }, 2000)
  }

  handleRealtime = () => {
    if (this.state.isRealtime) {
      clearInterval(this.logRefreshInterval)
      this.setState({ isRealtime: false })
    } else {
      this.setState({ isRealtime: true })
      this.handleSetLogsInterval(() => {
        this.setState({ isRealtime: false })
      })
    }
  }

  handleAutoRefreshLogs = () => {
    if (!this.isLogFinish && !this.logRefreshInterval) {
      this.setState({ isRealtime: true })
      this.handleSetLogsInterval(() => {
        this.setState({ isRealtime: false })
      })
    }

    if (this.isLogFinish) {
      this.scrollToBottom()
    }
  }

  renderOperations = () => {
    const { isRealtime, isDownloading } = this.state

    return (
      <div className={styles.operations}>
        <Tooltip content={t('BACK')}>
          <Icon
            name="return"
            color={{ primary: '#fff', secondary: '#fff' }}
            size={20}
            onClick={this.props.handleVisableLog}
            clickable
            changeable
          />
        </Tooltip>
        <span className={styles.split}>|</span>
        <Tooltip
          content={t(isRealtime ? 'STOP_REAL_TIME_LOG' : 'START_REAL_TIME_LOG')}
        >
          <Icon
            name={isRealtime ? 'stop' : 'start'}
            color={{ primary: '#fff', secondary: '#fff' }}
            size={20}
            onClick={this.handleRealtime}
            clickable
            changeable
          />
        </Tooltip>
        <span className={styles.split}>|</span>
        <Tooltip content={t('REFRESH')}>
          <Icon
            name="refresh"
            color={{ primary: '#fff', secondary: '#fff' }}
            size={20}
            onClick={isRealtime ? null : this.handleRefreshLogs}
            clickable
            changeable
            disabled={isRealtime}
          />
        </Tooltip>
        <span className={styles.split}>|</span>
        <Tooltip content={t('DOWNLOAD')}>
          {isDownloading ? (
            <Loading size={16} />
          ) : (
            <Icon
              name="download"
              color={{ primary: '#fff', secondary: '#fff' }}
              size={20}
              onClick={this.handleDownload}
              clickable
              changeable
            />
          )}
        </Tooltip>
      </div>
    )
  }

  render() {
    const { runDetailLogs } = this.store
    return (
      <div className={styles.logs_container}>
        <div className={styles.log} ref={this.ref}>
          {this.renderOperations()}
          <pre className={styles.LogItem_content}>{runDetailLogs}</pre>
        </div>
      </div>
    )
  }
}
