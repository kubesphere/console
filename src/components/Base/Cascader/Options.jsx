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
import Item from './Item'

import styles from './index.scss'

export default class Cascader extends Component {
  static defaultProps = {
    level: 0,
    options: [],
    onSelect() {},
  }

  state = {
    openKey: '',
  }

  handleClick = value => {
    this.setState({ openKey: value })
  }

  render() {
    const { openKey } = this.state
    const { style, options, level, onSelect } = this.props
    return (
      <div className={styles.options} style={style}>
        {options.map(item => (
          <Item
            key={item.value}
            data={item}
            level={level}
            isOpen={item.value === openKey}
            onClick={this.handleClick}
            onSelect={onSelect}
          />
        ))}
      </div>
    )
  }
}
