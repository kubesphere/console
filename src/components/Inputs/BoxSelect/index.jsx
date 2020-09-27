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
import classNames from 'classnames'

import { Icon } from '@kube-design/components'

import styles from './index.scss'

export default class BoxSelect extends React.Component {
  static propTypes = {
    options: PropTypes.array,
    value: PropTypes.array,
    onChange: PropTypes.func,
  }

  static defaultProps = {
    options: [],
    value: [],
    onChange() {},
  }

  handleClick = e => {
    const targetValue = e.currentTarget.dataset.value
    const { value, onChange } = this.props

    if (value.includes(targetValue)) {
      onChange(value.filter(item => item !== targetValue))
    } else {
      onChange([...value, targetValue])
    }
  }

  render() {
    const { options, value } = this.props
    return (
      <ul className={styles.wrapper}>
        {options.map(option => (
          <li
            className={classNames({
              [styles.select]: value.includes(option.value),
            })}
            key={option.value}
            data-value={option.value}
            onClick={this.handleClick}
          >
            {option.icon && <Icon name={option.icon} size={24} />}
            {option.label}
          </li>
        ))}
      </ul>
    )
  }
}
