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
import classNames from 'classnames'
import { throttle, isEmpty, isArray } from 'lodash'
import { action, observable, computed, toJS, reaction } from 'mobx'
import { observer } from 'mobx-react'
import { Button } from '@kube-design/components'
import Status from 'devops/components/Status'
import { getPipelineStatus } from 'utils/status'
import { formatUsedTime } from 'utils'
import RunStore from 'stores/devops/run'

import LogItem from './logItem'
import styles from './index.scss'
import FullLogs from './FullLogs'

@observer
export default class PipelineLog extends React.Component {
  constructor(props) {
    super(props)
    this.store = new RunStore()

    this.reaction = reaction(
      () => this.isEmptySteps,
      () => {
        clearInterval(this.getIndexLogInterval)
        if (this.isEmptySteps && Array.isArray(this.activeStage.steps)) {
          this.getIndexLogInterval = setInterval(this.getPipelineIndexLog, 4000)
        }
      }
    )
  }

  @observable
  isShowLog = false

  async componentDidMount() {
    await this.getPipelineIndexLog()
    this.handleExpandErrorStep()
  }

  @computed
  get activeStage() {
    const { nodes } = this.props
    const activeStageTemp = toJS(nodes[this.activeNodeIndex[0]])

    return isArray(activeStageTemp) && !isEmpty(activeStageTemp)
      ? activeStageTemp[this.activeNodeIndex[1]]
      : activeStageTemp
  }

  @computed
  get isEmptySteps() {
    return isEmpty(this.activeStage.steps)
  }

  get params() {
    const { params, runId } = this.props
    return { ...params, runId }
  }

  @observable
  activeNodeIndex = [0, 0] // lineindex, columnIndex

  @observable
  refreshFlag = true

  logRefresh = null

  @action
  updateActiveTabs = (lineindex, columnIndex) => () => {
    this.activeNodeIndex = [lineindex, columnIndex]
  }

  @action
  async getPipelineIndexLog() {
    await this.store.getRunStatusLogs(this.params)
  }

  handleDownloadLogs = () => {
    this.props.handleDownloadLogs()
  }

  handleExpandErrorStep = () => {
    const nodes = toJS(this.props.nodes)
    const errorNodeIdex = [0]

    if (isArray(nodes)) {
      nodes.forEach((item, index) => {
        if (isArray(item)) {
          const a = item.findIndex(_item => _item.result !== 'SUCCESS')
          errorNodeIdex[0] = index
          errorNodeIdex[1] = a > -1 ? a : 0
          return false
        }
        if (item.result !== 'SUCCESS') {
          errorNodeIdex[0] = index
          return false
        }
      })
    }

    this.activeNodeIndex = [...errorNodeIdex]
  }

  handleRefresh = throttle(() => {
    this.refreshFlag = !this.refreshFlag
  }, 1000)

  renderLeftTab(stage, index) {
    if (Array.isArray(stage)) {
      return (
        <div key={stage.id} key={index} className={styles.stageContainer}>
          <div className={styles.cutTitle}>{t('STAGE')}</div>
          {stage.map((_stage, _index) => (
            <div
              key={_stage.id}
              onClick={this.updateActiveTabs(index, _index)}
              className={classNames(styles.leftTab, {
                [styles.leftTab__active]:
                  this.activeNodeIndex[0] === index &&
                  this.activeNodeIndex[1] === _index,
              })}
            >
              <Status {...getPipelineStatus(_stage)} hasLabel={false} />
              {_stage.displayName}
            </div>
          ))}
        </div>
      )
    }
    return (
      <div key={stage.id} className={styles.stageContainer}>
        <div className={styles.cutTitle}>{t('STAGE')}</div>
        <div
          className={classNames(styles.leftTab, {
            [styles.leftTab__active]: this.activeNodeIndex[0] === index,
          })}
          onClick={this.updateActiveTabs(index, 0)}
        >
          <Status {...getPipelineStatus(stage)} hasLabel={false} />
          {stage.displayName}
        </div>
      </div>
    )
  }

  handleVisableLog = () => {
    this.isShowLog = !this.isShowLog
  }

  renderLogContent() {
    const { runDetailLogs } = this.store

    if (this.isEmptySteps) {
      if (this.activeStage.state !== 'FINISHED') {
        return null
      }
      return <pre className={styles.LogItem_content}>{runDetailLogs}</pre>
    }
    return this.activeStage.steps.map(step => (
      <LogItem
        key={step.id}
        step={step}
        nodeId={this.activeStage.id}
        params={this.params}
        refreshFlag={this.refreshFlag}
      />
    ))
  }

  render() {
    const { nodes } = this.props
    const _nodes = toJS(nodes)

    if (this.isShowLog) {
      return (
        <FullLogs
          store={this.store}
          isShowLog={this.isShowLog}
          params={this.params}
          handleVisableLog={this.handleVisableLog}
        />
      )
    }

    const time = this.activeStage?.durationInMillis ?? ''

    return (
      <div className={styles.container}>
        <div className={styles.left}>
          {_nodes.map((stage, index) => this.renderLeftTab(stage, index))}
        </div>
        <div className={styles.right}>
          <div className={styles.header}>
            <span>
              {t('DURATION_VALUE', {
                value: time ? formatUsedTime(time) : '-',
              })}
            </span>
            <Button onClick={this.handleDownloadLogs}>
              {t('DOWNLOAD_LOGS')}
            </Button>
            <Button onClick={this.handleVisableLog}>{t('VIEW_LOGS')}</Button>
            <Button onClick={this.handleRefresh}>{t('REFRESH')}</Button>
          </div>
          <div className={styles.logContainer}>{this.renderLogContent()}</div>
        </div>
      </div>
    )
  }
}
