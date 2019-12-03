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
import PropTypes from 'prop-types'
import { Icon, Tooltip } from '@pitrix/lego-ui'
import classnames from 'classnames'

import moment from 'moment-mini'

import styles from './index.scss'

class LogContext extends Component {
  static propTypes = {
    log: PropTypes.object,
  }

  get dockerLink() {
    const { host, namespace, pod, container } = this.props.log
    return `/infrastructure/nodes/${host}/projects/${namespace}/pods/${pod}/containers/${container}`
  }

  render() {
    const { context } = this.props
    const { time: targetTime, log: targetLog } = this.props.log

    return (
      <div className={styles.wrapper}>
        <header>
          <h2>{t('LOG_CONTEXT')}</h2>
          <Tooltip content={t('LOCATE_RESOURCES')}>
            <a href={this.dockerLink} target="_blank">
              <Icon
                className={styles.target}
                name="target"
                onClick={this.handleTargetClick}
              />
            </a>
          </Tooltip>
        </header>
        <div className={styles.logs}>
          {context.map(({ time, log }, index) => (
            <p
              key={index}
              className={classnames({
                [styles.active]: time === targetTime && log === targetLog,
              })}
            >
              <small>[{moment(time).format('YYYY-MM-DD HH:mm:ss.SSS')}]</small>{' '}
              <span>{log}</span>
            </p>
          ))}
        </div>
      </div>
    )
  }
}

export default LogContext
