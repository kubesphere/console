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
import classNames from 'classnames'
import { when, reaction, toJS } from 'mobx'
import { observer } from 'mobx-react'
import { get, isEmpty } from 'lodash'
import { Text } from 'components/Base'
import JobStatus from 'projects/components/JobStatus'
import WorkloadStore from 'stores/workload'
import WebsocketStore from 'stores/websocket'
import ContainerStore from 'stores/container'
import { PATTERN_UTC_TIME } from 'utils/constants'
import { CLUSTER_CREATING_STEPS } from '../constants'

import styles from './index.scss'

@observer
export default class Logs extends Component {
  constructor(props) {
    super(props)

    this.state = {
      showContent: false,
    }

    this.logRef = React.createRef()

    this.workloadStore = new WorkloadStore('jobs')

    this.containerStore = new ContainerStore()

    this.websocket = new WebsocketStore()

    this.jobNameDisposer = when(
      () => !isEmpty(get(this.props.detail, 'status.jobInfo.name')),
      () => this.watchJob()
    )
    this.podNameDisposer = when(
      () => !isEmpty(get(this.props.detail, 'status.jobInfo.pods[0].name')),
      () => this.watchLogs()
    )
  }

  componentWillUnmount() {
    this.websocket.close()
    this.jobDisposer && this.jobDisposer()
    this.jobNameDisposer && this.jobNameDisposer()
    this.podNameDisposer && this.podNameDisposer()
    this.containerStore.stopWatchLogs()
  }

  watchLogs = () => {
    const jobDetail = get(this.props.detail, 'status.jobInfo')
    this.containerStore.watchLogs(
      {
        namespace: jobDetail.namespace,
        podName: get(jobDetail, `pods[0].name`),
        container: get(jobDetail, `pods[0].containers[0].name`),
        timestamps: true,
        follow: true,
      },
      this.scrollToBottom
    )
  }

  watchJob = () => {
    const jobDetail = get(this.props.detail, 'status.jobInfo')
    const url = this.workloadStore.getWatchUrl(jobDetail)

    if (url) {
      this.websocket.watch(url)

      this.jobDisposer = reaction(
        () => this.websocket.message,
        message => {
          if (message.type === 'MODIFIED' || message.type === 'ADDED') {
            this.workloadStore.detail = this.workloadStore.mapper(
              toJS(message.object)
            )
          }
        }
      )
    }
  }

  handleToggle = () => {
    this.setState(({ showContent }) => ({
      showContent: !showContent,
    }))
  }

  scrollToBottom = () => {
    const ref = this.logRef.current
    if (ref) {
      ref.scrollTop = ref.scrollHeight
    }
  }

  renderTitle() {
    const { showContent } = this.state
    const conditions = get(this.props.detail, 'status.Conditions', [])
    const lastStep = CLUSTER_CREATING_STEPS[Math.max(conditions.length - 1, 0)]
    const jobDetail = toJS(this.workloadStore.detail)

    const status = jobDetail.startTime ? (
      <JobStatus data={jobDetail} module="jobs" />
    ) : (
      '-'
    )

    return (
      <div
        className={classNames(styles.title, { [styles.isOpen]: showContent })}
        onClick={this.handleToggle}
      >
        <Text
          icon="log"
          title={t('LOGS')}
          description={t('CURRENT_STEP', {
            step: t(lastStep.toUpperCase().replace(/\s+/g, '_')),
          })}
        />
        <Text title={status} description={t('STATUS')} />
      </div>
    )
  }

  renderContent() {
    const { data } = this.containerStore.logs
    const { showContent } = this.state

    const logs = isEmpty(data) ? t('FETCHING_LOGS') : data

    const items = String(logs)
      .replace(/\\r\\n/g, '\n')
      .split('\n')

    return (
      <div
        className={classNames(styles.content, {
          [styles.visible]: showContent,
        })}
      >
        <div className={styles.logs} ref={this.logRef}>
          {items.map((text, index) => {
            const match = text.match(PATTERN_UTC_TIME)
            const key = match ? match[0] : index
            const content = match ? text.replace(match[0], '') : text
            return <p key={key} dangerouslySetInnerHTML={{ __html: content }} />
          })}
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className={styles.wrapper}>
        {this.renderTitle()}
        {this.renderContent()}
      </div>
    )
  }
}
