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
import { get } from 'lodash'

import { SimpleCircle } from 'components/Charts'

import styles from './index.scss'

export default class StatusCircle extends React.Component {
  static propTypes = {
    theme: PropTypes.string,
    className: PropTypes.string,
    name: PropTypes.string,
    legend: PropTypes.array,
    used: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    total: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    unit: PropTypes.string,
    showRate: PropTypes.bool,
    onClick: PropTypes.func,
  }

  static defaultProps = {
    theme: 'dark',
    name: 'Status',
    legend: ['USED', 'TOTAL'],
    used: 0,
    total: 0,
    unit: '',
    showRate: false,
  }

  get usageRate() {
    const { used, total } = this.props
    return total
      ? parseInt((parseFloat(used) / parseFloat(total)) * 100, 10)
      : 0
  }

  handleClick = () => {
    const { onClick } = this.props
    onClick && onClick()
  }

  render() {
    const {
      theme,
      className,
      name,
      legend,
      used,
      total,
      unit,
      showRate,
      onClick,
    } = this.props
    const nameText = t(name)
    const usedText = t(get(legend, '[0]', ''))
    const totalText = t(get(legend, '[1]', ''))

    return (
      <div
        className={classnames(styles.card, className, styles[theme], {
          [styles.cursor]: !!onClick,
        })}
        onClick={this.handleClick}
      >
        <img className={styles.cardImg} src="/assets/banner-icon-1.svg" />
        <div className={styles.chart}>
          <SimpleCircle
            theme={theme}
            width="100%"
            height="100%"
            title={nameText}
            legend={legend}
            value={parseFloat(used)}
            total={parseFloat(total)}
            unit={unit}
            showRate={showRate}
          />
        </div>
        <div className={styles.status}>
          <div className={styles.title}>{nameText}</div>
          <div className={styles.detail}>
            <p>
              <label>{usedText}:</label> {used} {unit}
            </p>
            <p>
              <label>{totalText}:</label> {total} {unit}
            </p>
          </div>
        </div>
      </div>
    )
  }
}
