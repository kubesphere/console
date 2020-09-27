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
import classnames from 'classnames'

import { Tooltip, Icon } from '@kube-design/components'

import styles from './index.scss'

export default class Item extends PureComponent {
  static propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    tooltips: PropTypes.string,
  }

  static defaultProps = {
    value: '-',
    tooltips: '',
  }

  render() {
    const { name, value, tooltips, className } = this.props
    return (
      <li className={classnames(styles.item, className)}>
        <div className={styles.name}>
          <span>{name}: </span>
          {tooltips !== '' && (
            <Tooltip content={tooltips} placement="topLeft">
              <Icon name="question" size={20} />
            </Tooltip>
          )}
        </div>
        <div className={styles.value}>{value}</div>
      </li>
    )
  }
}
