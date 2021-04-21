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

import { isUndefined } from 'lodash'
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import Indicator from '../Indicator'

import styles from './index.scss'

export default class Status extends PureComponent {
  static propTypes = {
    style: PropTypes.string,
    className: PropTypes.string,
    name: PropTypes.string,
    total: PropTypes.number,
    ready: PropTypes.number,
    type: PropTypes.string,
    flicker: PropTypes.bool,
  }

  static defaultProps = {
    type: 'Running',
    flicker: false,
  }

  render() {
    const { style, className, name, type, total, ready, flicker } = this.props

    return (
      <span className={classNames(styles.status, className)} style={style}>
        <Indicator className={styles.indicator} type={type} flicker={flicker} />
        <span className="font-bold">{name}</span>
        {!isUndefined(total) && !isUndefined(ready) && (
          <span>
            &nbsp;({ready}/{total})
          </span>
        )}
      </span>
    )
  }
}
