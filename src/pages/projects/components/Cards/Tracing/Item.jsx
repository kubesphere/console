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

import { sortBy } from 'lodash'
import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { getLocalTime } from 'utils'
import { formatRelativeDate } from 'utils/tracing'

import { Icon } from '@kube-design/components'

import styles from './index.scss'

const isErrorTag = ({ key, value }) =>
  key === 'error' && (value === true || value === 'true')

export default class TracingItem extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    onClick: PropTypes.func,
    detail: PropTypes.object,
    durationPercent: PropTypes.number,
  }

  static defaultProps = {
    onClick() {},
    durationPercent: 0,
    detail: {},
  }

  handleClick = () => {
    const { onClick, detail } = this.props
    onClick(detail)
  }

  render() {
    const { className, detail } = this.props

    if (!detail) {
      return null
    }

    const {
      duration,
      durationPercent,
      services,
      startTime,
      spans,
      traceName,
      serviceColorMap,
    } = detail

    const mDate = getLocalTime(startTime / 1000)
    const timeStr = mDate.format('HH:mm:ss')
    const fromNow = mDate.fromNow()
    const numSpans = spans.length
    const numErredSpans = spans.filter(sp => sp.tags.some(isErrorTag)).length

    return (
      <div
        className={classnames(styles.item, className)}
        onClick={this.handleClick}
      >
        <div className={styles.header}>
          <div className={styles.title}>{traceName}</div>

          <div className={styles.duration}>
            <Icon name="timed-task" />
            {`${duration / 1000} ms`}
          </div>
          <div
            className={styles.durationBar}
            style={{
              width: `${durationPercent}%`,
              borderTopRightRadius: durationPercent === 100 ? 4 : 0,
            }}
          />
        </div>
        <div className={styles.content}>
          <div className={styles.spanWrapper}>
            <div className={styles.spans}>
              {numSpans === 1
                ? t('NUM_SPAN_SI', { num: numSpans })
                : t('NUM_SPAN_PL', { num: numSpans })}
            </div>
            {numErredSpans > 0 && (
              <div className={styles.errorSpans}>
                {numErredSpans === 1
                  ? t('NUM_ERROR_SI', { num: numErredSpans })
                  : t('NUM_ERROR_PL', { num: numErredSpans })}
              </div>
            )}
          </div>
          <ul className={styles.services}>
            {sortBy(services, 'name').map(service => (
              <li key={service.name}>
                <span
                  className={styles.tag}
                  style={{ backgroundColor: serviceColorMap[service.name] }}
                />
                {`${service.name} (${service.numberOfSpans})`}
              </li>
            ))}
          </ul>
          <div className={styles.startTime}>
            <p>
              {formatRelativeDate(startTime / 1000)}
              &nbsp;&nbsp;|&nbsp;&nbsp;
              <strong>{timeStr}</strong>
            </p>
            <p>{fromNow}</p>
          </div>
        </div>
      </div>
    )
  }
}
