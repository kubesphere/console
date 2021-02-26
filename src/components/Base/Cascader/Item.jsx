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
import Options from './Options'

import styles from './index.scss'

export default class Item extends Component {
  ref = React.createRef()

  getOptionsStyle() {
    const style = {}
    if (this.ref && this.ref.current) {
      const { data } = this.props
      if (data.children) {
        const len = Math.min(data.children.length, 8)
        const triggerStyle = this.ref.current.getBoundingClientRect()
        const parentStyle = this.ref.current.parentNode.getBoundingClientRect()
        if (triggerStyle.top - parentStyle.top > parentStyle.height / 2) {
          style.top = triggerStyle.top - 4 - (len - 1) * 32
        } else {
          style.top = triggerStyle.top - 4
        }
        style.left = triggerStyle.left + triggerStyle.width
      }
    }
    return style
  }

  handleClick = () => {
    const { data, onClick } = this.props
    onClick(data.value)
  }

  handleSelect = () => {
    const { data, onSelect } = this.props
    onSelect(data.value)
  }

  render() {
    const { data, level, isOpen, onSelect } = this.props

    if (!data.children) {
      return (
        <div className={styles.item} onClick={this.handleSelect}>
          {data.label}
        </div>
      )
    }

    return (
      <div ref={this.ref}>
        <div
          className={classNames(styles.item, styles.hasChildren, {
            [styles.isOpen]: isOpen,
          })}
          onClick={this.handleClick}
        >
          {data.label}
          <Icon name="chevron-right" type="light" />
        </div>
        {isOpen && (
          <Options
            level={level + 1}
            options={data.children}
            onSelect={onSelect}
            style={this.getOptionsStyle()}
          />
        )}
      </div>
    )
  }
}
