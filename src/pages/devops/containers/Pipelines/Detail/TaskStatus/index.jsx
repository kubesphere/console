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
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { observer, inject } from 'mobx-react'
import { reaction, toJS } from 'mobx'
import { get, isEmpty } from 'lodash'
import { Button } from '@kube-design/components'
import {
  addFullScreenChangeEvents,
  removeFullScreenChangeEvents,
  enterFullScreen,
} from 'utils/dom'

import { Modal } from 'components/Base'
import Status from 'devops/components/Status'
import { getPipelineStatus } from 'utils/status'
import PipelineContent from 'devops/components/PipelineStatus'

import PipelineLog from '../PipelineLogDialog'
import style from './index.scss'

@inject('rootStore', 'detailStore')
@observer
export default class TaskStatus extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isFullScreen: false,
      showLog: false,
      showErrorLog: false,
    }
    this.store = props.detailStore || {}
    this.updateReaction = reaction(() => this.store.runDetail, this.handleFetch)
  }

  get enabledActions() {
    const { cluster, devops } = this.props.match.params

    return globals.app.getActions({
      module: 'pipelines',
      cluster,
      devops,
    })
  }

  get hasRuning() {
    const { runDetail } = this.store
    const state = get(runDetail, 'state')

    return state && state !== 'FINISHED' && state !== 'PAUSED'
  }

  get isQueued() {
    const { runDetail } = this.store
    const state = get(runDetail, 'state', '')
    return state === 'QUEUED'
  }

  componentDidMount() {
    this.handleFetch()
    addFullScreenChangeEvents(this.toggleFullScreenState)
  }

  componentWillUnmount() {
    this.updateReaction()
    removeFullScreenChangeEvents(this.toggleFullScreenState)
  }

  static childContextTypes = {
    onProceed: PropTypes.func,
    onBreak: PropTypes.func,
    result: PropTypes.string,
  }

  getChildContext() {
    return {
      onProceed: this.handleProceed,
      onBreak: this.handleBreak,
      result: this.store.runDetail.result,
    }
  }

  handleFetch = () => {
    const { runDetail } = this.store
    if (!isEmpty(toJS(runDetail)) && !this.isQueued) {
      const { params } = this.props.match
      this.store.getNodesStatus(params)
    }
  }

  toggleFullScreenState = () => {
    const { isFullScreen } = this.state
    this.setState({ isFullScreen: !isFullScreen })
  }

  handleEnterFullScreen = () => {
    enterFullScreen(this.container)
    this.setState({ isFullScreen: true })
  }

  showLog = () => {
    this.setState({ showLog: true })
  }

  showErrorLog = () => {
    this.setState({ showErrorLog: true })
  }

  hideLog = () => {
    this.setState({ showLog: false })
  }

  handleDownloadLogs = () => {
    const { params } = this.props.match

    this.store.handleDownloadLogs(params)
  }

  handleProceed = async (_params, callBack) => {
    try {
      const { params } = this.props.match
      await this.store.handleProceed({ ..._params, ...params })
      await this.store.getRunDetail(params)
    } finally {
      callBack && callBack()
    }
  }

  handleBreak = async (_params, callBack) => {
    try {
      const { params } = this.props.match
      await this.store.handleBreak({ ..._params, ...params })
      await this.store.getRunDetail(params)
    } finally {
      callBack && callBack()
    }
  }

  renderBtnGroup() {
    return (
      <div className={style.pipelineCard__btnGroup}>
        <span onClick={this.handleEnterFullScreen}>
          <Button icon="maximize" type="flat" />
        </span>
        <Button onClick={this.showLog}>{t('Show Logs')}</Button>
      </div>
    )
  }

  renderLoadingCard = () => (
    <div className={style.card}>
      <div>
        <span className={classNames(style.runningIcon, style.icon)} />
      </div>
      <div className={style.title}>{t('Pipeline initialization')}</div>
      <div className={style.desc}>{t('PIPELINE_DESC')}</div>
      <div className={style.btn}>
        <Button onClick={this.showErrorLog}>{t('Show Logs')}</Button>
      </div>
    </div>
  )

  renderQueuedCard = runDetail => (
    <div className={style.card}>
      <div>
        <span className={classNames(style.QueuedIcon, style.icon)} />
      </div>
      <div className={style.title}>{t('PIPELINE_QUEUED_TITLE')}</div>
      <div className={style.desc}>
        {get(runDetail, 'causeOfBlockage') || t('PIPELINE_QUEUED_DESC')}
      </div>
    </div>
  )

  render() {
    const { showLog, showErrorLog } = this.state
    const { nodesStatus, runDetailLogs, runDetail } = this.store

    if (nodesStatus.length === 0) {
      if (this.isQueued) {
        return this.renderQueuedCard(runDetail)
      }
      if (this.hasRuning && !showErrorLog) {
        return this.renderLoadingCard()
      }
      return (
        <div className={style.pipelineCard}>
          <div className={style.pipelineCard__toolbar}>
            {this.hasRuning ? (
              <span className={style.running_tips}>
                <Status hasLabel={false} {...getPipelineStatus(runDetail)} />
                {t('PIPELINE_PREPAIR_DESC')}
              </span>
            ) : null}
            <div className={style.pipelineCard__btnGroup}>
              <Button onClick={this.handleDownloadLogs}>
                {t('Download Logs')}
              </Button>
            </div>
          </div>
          <div
            className={style.pipelineCard__main}
            ref={dom => {
              this.container = dom
            }}
          >
            <pre>{runDetailLogs}</pre>
          </div>
        </div>
      )
    }
    return (
      <React.Fragment>
        <div className={style.pipelineCard}>
          <div className={style.pipelineCard__toolbar}>
            {this.renderBtnGroup()}
          </div>
          <div
            className={style.pipelineCard__main}
            ref={dom => {
              this.container = dom
            }}
          >
            <PipelineContent jsonData={nodesStatus} />
          </div>
        </div>
        <Modal
          width={1162}
          onCancel={this.hideLog}
          title={t('Pipeline Run Logs')}
          visible={showLog}
          closable={false}
          cancelText={t('Close')}
        >
          <PipelineLog
            handleDownloadLogs={this.handleDownloadLogs}
            params={this.props.match.params}
            nodes={nodesStatus}
          />
        </Modal>
      </React.Fragment>
    )
  }
}
