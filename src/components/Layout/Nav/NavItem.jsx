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

import { Icon } from '@pitrix/lego-ui'

import Link from './Link'

import styles from './index.scss'

export default class NavItem extends React.Component {
  static propTypes = {
    item: PropTypes.object,
    current: PropTypes.string,
    prefix: PropTypes.string,
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
  }

  checkSelect = (item = {}) => {
    const { current } = this.props

    if (item.children) {
      return item.children.some(child => this.checkSelect(child))
    }

    if (item.tabs) {
      return item.tabs.some(tab => this.checkSelect(tab))
    }

    return current.startsWith(item.name)
  }

  render() {
    const { item, prefix, disabled, onClick } = this.props

    if (item.children) {
      return (
        <li
          className={classnames({
            [styles.childSelect]: item.open || this.checkSelect(item),
            [styles.disabled]: disabled && !item.showInDisable,
          })}
        >
          <div className={styles.title}>
            <Icon name={item.icon} /> {t(item.title)}
            <Icon name="chevron-down" className={styles.rightIcon} />
          </div>
          <ul className={styles.innerNav}>
            {item.children.map(child => (
              <li
                key={child.name}
                className={classnames({
                  [styles.select]: this.checkSelect(child),
                  [styles.disabled]: disabled && !child.showInDisable,
                })}
              >
                <Link
                  to={`${prefix}/${child.name}`}
                  disabled={disabled && !child.showInDisable}
                >
                  {t(child.title)}
                </Link>
              </li>
            ))}
          </ul>
        </li>
      )
    }

    return (
      <li
        key={item.name}
        className={classnames({
          [styles.select]: this.checkSelect(item),
          [styles.disabled]: disabled && !item.showInDisable,
        })}
      >
        <Link
          to={`${prefix}/${item.name}`}
          onClick={onClick}
          disabled={disabled && !item.showInDisable}
        >
          <Icon name={item.icon} /> {t(item.title)}
        </Link>
      </li>
    )
  }
}
