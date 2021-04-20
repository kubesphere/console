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
import classNames from 'classnames'

import { isUndefined } from 'lodash'
import styles from './index.scss'

const FLICKER_CONFIG = [
  'updating',
  'upgrading',
  'syncing',
  'building',
  'notrunning',
  'warning',
  'waiting',
  'terminating',
  'released',
  'unfinished',
  'firing',
  'major',
  'deleting',
  'creating',
  'in-review',
]

export default class Indicator extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    type: PropTypes.string,
    flicker: PropTypes.bool,
  }

  static defaultProps = {
    type: 'Running',
  }

  render() {
    const { className, type, flicker } = this.props
    const _flicker = isUndefined(flicker)
      ? FLICKER_CONFIG.includes(type.toLowerCase())
      : flicker

    return (
      <i
        className={classNames(
          styles.icon,
          styles[type.toLowerCase()],
          {
            [styles.flicker]: _flicker,
          },
          className
        )}
      />
    )
  }
}
