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

import styles from './index.scss'

export default class Bar extends React.Component {
  static propTypes = {
    value: PropTypes.number.isRequired,
    className: PropTypes.string,
  }

  static defaultProps = {
    value: 0,
  }

  render() {
    const { value, className, text, rightText } = this.props

    const style = {
      width: `${value * 100}%`,
    }

    let type = 'default'
    if (value >= 0.8) {
      type = 'warning'
    }
    if (value >= 0.95) {
      type = 'danger'
    }

    const textStyle = {
      left: value > 0.35 ? `${(value / 2) * 100}%` : `${(value + 0.01) * 100}%`,
      transform: value > 0.35 ? 'translateX(-50%)' : '',
      color: value > 0.35 ? '#fff' : '#79879c',
    }

    return (
      <div className={classnames(styles.wrapper, className)}>
        <div className={classnames(styles.bar, styles[type])} style={style} />
        {text && !!value && (
          <span className={styles.text} style={textStyle}>
            {text}
          </span>
        )}
        {rightText && <span className={styles.rightText}>{rightText}</span>}
      </div>
    )
  }
}
