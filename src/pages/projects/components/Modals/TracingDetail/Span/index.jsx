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
import { Icon, Columns, Column } from '@kube-design/components'
import { isErrorSpan, formatDuration } from 'utils/tracing'

import styles from './index.scss'

function toPercent(value) {
  return `${(value * 100).toFixed(1)}%`
}

export default class Span extends React.Component {
  handleClick = () => {
    const { onClick, span } = this.props
    onClick(span)
  }

  render() {
    const { span, color, getViewedBounds, selected } = this.props
    const showErrorIcon = isErrorSpan(span)

    const label = formatDuration(span.duration)

    const viewBounds = getViewedBounds(
      span.startTime,
      span.startTime + span.duration
    )

    let hintSide
    if (viewBounds.start > 1 - viewBounds.end) {
      hintSide = 'Left'
    } else {
      hintSide = 'Right'
    }

    return (
      <li
        className={classNames(styles.wrapper, { [styles.selected]: selected })}
        onClick={this.handleClick}
      >
        <Columns className="is-gapless">
          <Column className="is-3">
            <div className={styles.nameWrapper}>
              <span
                className={styles.padder}
                style={{ paddingLeft: 12 * (span.depth + 1) }}
              />
              <a className={styles.name} style={{ borderColor: color }}>
                <span className={styles.svc}>
                  {showErrorIcon && (
                    <Icon
                      name="error"
                      color={{
                        primary: '#fff',
                        secondary: '#ea4641',
                      }}
                    />
                  )}
                  {span.process.serviceName}{' '}
                </span>
                <span className={styles.endpoint}>{span.operationName}</span>
              </a>
            </div>
          </Column>
          <Column className="margin-l12 margin-r12">
            <div className={styles.barWrapper}>
              <div
                className={styles.bar}
                style={{
                  backgroundColor: color,
                  left: toPercent(viewBounds.start),
                  width: toPercent(viewBounds.end - viewBounds.start),
                }}
              >
                <div
                  className={classNames(
                    styles.barLabel,
                    styles[`barLabel${hintSide}`]
                  )}
                >
                  {label}
                </div>
              </div>
            </div>
          </Column>
        </Columns>
      </li>
    )
  }
}
