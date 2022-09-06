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
import { isFunction } from 'lodash'
import classnames from 'classnames'
import { Icon, Loading, Tooltip } from '@kube-design/components'
import { Empty } from 'components/Base'
import RunStore from 'stores/s2i/run'

import styles from './index.scss'

@observer
export default class Log extends React.Component {
  static defaultProps = {
    logURL: '',
    runState: '',
  }

  constructor() {
    super()
    this.state = {
      showLog: true,
      isContainerPending: false,
      noModuleMsg: null,
    }
    this.store = new RunStore()
    this.refreshTimer = null
    this.LogContent = React.createRef()
  }

  componentDidMount() {
    if (globals.app.hasKSModule('logging')) {
      this.getLog()
    } else {
      this.store.logData.isLoading = false
      this.setState({
        noModuleMsg: t('CONTAINER_LOG_NOT_ENABLED'),
      })
    }
  }

  componentWillUnmount() {
    this.setState({ noModuleMsg: null })
    clearTimeout(this.refreshTimer)
  }

  toggleLog = () => {
    if (this.state.showLog) {
      this.setState({ showLog: false })
      return
    }
    this.setState({ showLog: true })
  }

  getLog = async () => {
    const { logURL, status, cluster } = this.props.runDetail
    const { logData } = this.store
    const isRunning = status === 'Building' || status === 'Unknown'
    clearTimeout(this.refreshTimer)

    if (!logURL) {
      this.refreshTimer = setTimeout(this.getLog, 4000)
      return
    }
    await this.store.getLog(logURL, cluster)

    this.handleScrollToBottom()
    if (logData.hasMore) {
      this.getLog()
      return
    }
    if (isRunning) {
      this.refreshTimer = setTimeout(this.getLog, 4000)
    }
  }

  handleScrollToBottom = () => {
    const LogContent = this.LogContent.current
    if (LogContent) {
      LogContent.scrollTop = LogContent.scrollHeight
    }
  }

  handleRerun = () => {
    const { onRerun } = this.props
    onRerun()
  }

  renderTitle = () => {
    const { status } = this.props.runDetail
    const { builderName, onRerun } = this.props
    if (status === 'Successful') {
      return (
        <React.Fragment>
          <span className={classnames(styles.icon, styles.successful)} />
          <p>
            <span className={styles.taskName}>{builderName}</span>
            {t('BUILD_LOG')}
          </p>
        </React.Fragment>
      )
    }

    if (status === 'Building') {
      return (
        <React.Fragment>
          <span className={classnames(styles.icon, styles.running)} />
          <p>
            {t('TASK')}
            <span className={styles.taskName}>{builderName}</span>
            {t('IN_PROGRESS')}
          </p>
        </React.Fragment>
      )
    }

    if (status === 'Failed') {
      return (
        <React.Fragment>
          <span className={classnames(styles.icon, styles.failed)} />
          <p>
            {t('TASK')}
            <span className={styles.taskName}>{builderName}</span>
            {t('HAS_FAILED')}
            {isFunction(onRerun) ? (
              <Tooltip content={t('RERUN')}>
                <Icon name="refresh" onClick={this.handleRerun} />
              </Tooltip>
            ) : null}
          </p>
        </React.Fragment>
      )
    }
    return (
      <React.Fragment>
        <span className={classnames(styles.icon, styles.unknow)} />
        <p>
          <span className={styles.taskName}>{builderName}</span>
          {t('BUILD_LOG')}
        </p>
      </React.Fragment>
    )
  }

  renderLog() {
    const { log } = this.store.logData
    const { runState } = this.props
    const { noModuleMsg } = this.state
    if (!log) {
      if (runState === 'Running' || runState === 'Unknown') {
        return (
          <Loading>
            <p className={styles.noneLogDesc} />
          </Loading>
        )
      }
      return <p className={styles.noneLogDesc}>{t('NO_DATA')}</p>
    }
    return (
      <pre ref={this.LogContent}>{noModuleMsg || log || t('LOADING_DOTS')}</pre>
    )
  }

  render() {
    if (this.state.isContainerPending) {
      return (
        <div className={styles.logContainer}>
          <Empty desc={'CONTAINER_LOGS_NOT_SUPPORTED'} />
        </div>
      )
    }

    return (
      <div className={styles.logContainer}>
        <div className={styles.title} onClick={this.toggleLog}>
          {this.renderTitle()}
          <Icon
            name={this.state.showLog ? 'chevron-up' : 'chevron-down'}
            size={20}
          />
        </div>
        {this.state.showLog ? this.renderLog() : null}
      </div>
    )
  }
}
