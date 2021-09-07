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
import classnames from 'classnames'

import { getStep, getTimes, getTimeOptions, getLastTimeStr } from '../utils'

import styles from './index.scss'

const TimeOps = [
  '10m',
  '20m',
  '30m',
  '1h',
  '2h',
  '3h',
  '5h',
  '12h',
  '1d',
  '2d',
  '3d',
  '7d',
]

export default class DefaultRange extends React.Component {
  static propTypes = {
    step: PropTypes.string,
    times: PropTypes.number,
    onChange: PropTypes.func,
  }

  static defaultProps = {
    step: '10m',
    times: 30,
    onChange() {},
  }

  handleClick = e => {
    const { value } = e.target.dataset

    if (value) {
      let times = this.props.times
      let step = getStep(value, times)
      const stepNum = parseInt(step, 10)

      if (stepNum < 1) {
        times = 10
        step = getStep(value, times)
      }

      if (stepNum > 60) {
        step = '60m'
        times = getTimes(value, step)
      }

      this.props.onChange({
        step,
        times,
        start: '',
        end: '',
        lastTime: value,
      })
    }
  }

  render() {
    const { step, times } = this.props
    const options = getTimeOptions(TimeOps)
    const lastTimeStr = getLastTimeStr(step, times)

    return (
      <div className={styles.default}>
        <div className={styles.title}>{t('SELECT_TIME_RANGE')}</div>
        <ul onClick={this.handleClick}>
          {options.map(({ label, value }) => (
            <li
              key={label}
              data-value={value}
              className={classnames({
                [styles.cur]: value === lastTimeStr,
              })}
            >
              {t('LAST_TIME', { value: label })}
            </li>
          ))}
        </ul>
      </div>
    )
  }
}
