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
import classNames from 'classnames'
import { Icon } from '@kube-design/components'
import Cascader from './index'

import styles from './index.scss'

export default class Item extends Component {
  get popperProps() {
    return {
      trigger: 'hover',
      placement: 'right',
      hideInterval: 0,
      modifiers: {
        flip: {
          enabled: false,
        },
        preventOverflow: {
          escapeWithReference: true,
        },
      },
    }
  }

  handleClick = () => {
    const { data, onSelect } = this.props

    if (!data.children) {
      onSelect(data.value)
    }
  }

  render() {
    const { data, onSelect } = this.props
    return (
      <Cascader
        options={data.children}
        popperProps={this.popperProps}
        onSelect={onSelect}
      >
        <div
          className={classNames(styles.item, {
            [styles.hasChildren]: data.children,
          })}
          onClick={this.handleClick}
        >
          {data.label}
          {data.children && <Icon name="chevron-right" type="light" />}
        </div>
      </Cascader>
    )
  }
}
