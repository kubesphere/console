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
import { Icon } from '@kube-design/components'
import { action } from 'mobx'
import { observer } from 'mobx-react'
import Status from 'devops/components/Status'
import { getPipelineStatus } from 'utils/status'
import LogStore from 'stores/devops/log'

import { formatUsedTime } from 'utils'

import styles from './index.scss'

@observer
export default class LogItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isExpand: false,
    }
    this.store = new LogStore()
  }

  componentDidMount() {
    this.timer = setInterval(this.handleRefresh, 4000)
    this.handleExpandByFail()
  }

  componentDidUpdate(prevProps) {
    if (
      this.state.isExpand &&
      prevProps.refreshFlag !== this.props.refreshFlag
    ) {
      this.store.handleResetStepLog()
      this.getLog()
    }
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  handleExpandByFail = () => {
    const step = this.props.step
    if (step && step.result !== 'SUCCESS') {
      this.toggleExpand()
    }
  }

  handleRefresh = () => {
    const { step } = this.props
    const { hasMore } = this.store.stepLogData

    if (this.state.isExpand && (hasMore || step.state !== 'FINISHED')) {
      this.getLog()
    }
  }

  toggleExpand = () => {
    const { log } = this.store.stepLogData
    const { isExpand } = this.state

    if (!isExpand && !log) {
      this.getLog()
    }
    this.setState({ isExpand: !isExpand })
  }

  @action
  getLog() {
    const { step, params, nodeId } = this.props

    this.store.getStepLog({ ...params, nodeId, stepId: step.id })
  }

  render() {
    const { step } = this.props
    const { log } = this.store.stepLogData

    return (
      <div className={styles.LogItem}>
        <div
          className={classNames(styles.LogItem__title)}
          onClick={this.toggleExpand}
        >
          <Icon
            name={this.state.isExpand ? 'caret-down' : 'caret-right'}
            size={16}
          />
          {step.displayName}
          <span className={styles.logitem_status}>
            <span>{formatUsedTime(step.durationInMillis)}</span>
            <Status {...getPipelineStatus(step)} />
          </span>
        </div>
        <div>
          {this.state.isExpand ? (
            <pre className={styles.LogItem_content}>{log}</pre>
          ) : null}
        </div>
      </div>
    )
  }
}
