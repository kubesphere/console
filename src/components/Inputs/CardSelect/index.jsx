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

import React, { Component } from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import { Icon } from '@pitrix/lego-ui'
import { isArray } from 'lodash'
import styles from './index.scss'

export default class CardSelect extends Component {
  static propTypes = {
    options: PropTypes.array,
    value: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
    selectedClassName: PropTypes.string,
    iconSize: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  }

  static defaultProps = {
    selectedClassName: styles.selected,
  }

  handleClick = e => {
    const targetValue = e.currentTarget.dataset.value
    const { value, onChange } = this.props

    if (isArray(value)) {
      if (value.includes(targetValue)) {
        onChange(value.filter(item => item !== targetValue))
      } else {
        onChange([...value, targetValue])
      }
    } else {
      onChange(targetValue)
    }
  }

  selectedCheck = optValue => {
    const { value } = this.props
    return isArray(value) ? value.includes(optValue) : optValue === value
  }

  render() {
    const { className, options, selectedClassName } = this.props
    return (
      <ul className={classnames(styles.container, className)}>
        {options.map(
          ({ icon = 'picture', image, label, value, description }) => (
            <li
              key={value}
              data-value={value}
              onClick={this.handleClick}
              className={classnames({
                [selectedClassName]: this.selectedCheck(value),
              })}
            >
              <figure>
                {image ? <img src={image} /> : <Icon name={icon} />}
              </figure>
              <h3>{label}</h3>
              {description && <p>{description}</p>}
            </li>
          )
        )}
      </ul>
    )
  }
}
