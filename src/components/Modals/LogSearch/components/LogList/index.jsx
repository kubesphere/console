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

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment-mini'
import { Icon, Loading } from '@pitrix/lego-ui'
import { debounce, get } from 'lodash'

import styles from './index.scss'

const LOG_TIME_FORMATTER = 'YYYY-MM-DD HH:mm:ss'

export default class LogList extends PureComponent {
  static propTypes = {
    logs: PropTypes.array,
    rowStyle: PropTypes.object,
    onRowClick: PropTypes.func,
  }

  static defaultProps = {
    logs: [],
    rowStyle: {},
    onRowClick() {},
  }

  getSnapshotBeforeUpdate() {
    const target = this.container.current
    if (!target) {
      return null
    }

    return {
      isScrollAtBottom:
        target.offsetHeight + target.scrollTop === target.scrollHeight,
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (snapshot && snapshot.isScrollAtBottom) {
      this.scrollToBottom()
    }
  }

  scrollToBottom() {
    const current = this.container.current || {}
    current.scrollTop = current.scrollHeight
  }

  handleScroll = e => {
    this.handlerScrollTop(e.target.scrollTop)
  }

  handlerScrollTop = debounce(top => {
    top === 0 && this.props.onScrollTop()
  }, 300)

  handleLogClick = e => {
    const index = get(e, 'currentTarget.dataset.index')
    this.props.onLogSelect(index)
  }

  container = React.createRef()

  render() {
    const { logs, rowStyle, loadingMore } = this.props

    return (
      <div
        className={styles.wrapper}
        ref={this.container}
        onScroll={this.handleScroll}
      >
        <div className={styles.loadingPre}>
          {loadingMore && <Loading spinning={true} />}
        </div>
        {logs.map(({ time, log }, index) => (
          <p
            onClick={this.handleLogClick}
            style={rowStyle}
            key={index}
            data-index={index}
          >
            <span className={styles.time}>
              [{moment(time).format(LOG_TIME_FORMATTER)}]
            </span>
            {log}
            <Icon
              type="light"
              name="magnifier"
              className={styles.logDetailIcon}
            />
          </p>
        ))}
      </div>
    )
  }
}
