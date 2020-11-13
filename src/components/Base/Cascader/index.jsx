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
import { isEmpty } from 'lodash'
import { Popper } from '@kube-design/components'
import Item from './Item'

import styles from './index.scss'

export default class Cascader extends Component {
  popper = React.createRef()

  handleSelect = data => {
    this.props.onSelect(data)
    this.popper.current && this.popper.current.hidePopper()
  }

  renderOptions() {
    const { options } = this.props
    return (
      <div className={styles.options}>
        {options.map(item => (
          <Item key={item.value} data={item} onSelect={this.handleSelect} />
        ))}
      </div>
    )
  }

  render() {
    const {
      children,
      options,
      popperProps = { trigger: 'click', placement: 'bottomLeft' },
    } = this.props

    if (isEmpty(options)) {
      return children
    }

    return (
      <Popper
        ref={this.popper}
        className={styles.wrapper}
        content={this.renderOptions()}
        {...popperProps}
        showArrow={false}
      >
        {children}
      </Popper>
    )
  }
}
