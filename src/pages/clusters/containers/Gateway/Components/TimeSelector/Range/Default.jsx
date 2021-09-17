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

import { getTimeOptions } from '../utils'

import styles from './index.scss'

const TimeOps = ['1m', '5m', '10m', '30m', '1h', '3h', '6h', '12h']

export default class DefaultRange extends React.Component {
  static propTypes = {
    duration: PropTypes.string,
    onChange: PropTypes.func,
  }

  static defaultProps = {
    duration: '10m',
    onChange() {},
  }

  handleClick = e => {
    const { value } = e.target.dataset
    if (value) {
      this.props.onChange({
        duration: value,
      })
    }
  }

  render() {
    const options = getTimeOptions(TimeOps)
    const { duration } = this.props
    return (
      <div className={styles.default}>
        <div className={styles.title}>{t('SELECT_TIME_RANGE')}</div>
        <ul onClick={this.handleClick}>
          {options.map(({ label, value }) => (
            <li
              key={label}
              data-value={value}
              className={classnames({
                [styles.cur]: value === duration,
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
