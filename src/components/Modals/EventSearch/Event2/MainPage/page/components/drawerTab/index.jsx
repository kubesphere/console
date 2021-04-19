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
import classnames from 'classnames'
import styles from './index.scss'

export default class DrawerTab extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentIndex: 0,
    }
  }

  handleClick = index => {
    this.setState({
      currentIndex: index,
    })
  }

  render() {
    return (
      <div className={styles.tabContent}>
        <div className={styles.tabHead}>
          <div
            className={classnames(styles.tabItem, {
              [styles.tabItemActive]: this.state.currentIndex === 0,
            })}
            onClick={() => this.handleClick(0)}
          >
            <img src="/assets/logging_drawer_tab1.svg" alt="" />
          </div>
          <div
            className={classnames(styles.tabItem, {
              [styles.tabItemActive]: this.state.currentIndex === 1,
            })}
            onClick={() => this.handleClick(1)}
          >
            <img src="/assets/logging_drawer_tab2.svg" alt="" />
          </div>
        </div>
        {React.Children.map(this.props.children, (element, index) => {
          if (index === this.state.currentIndex) {
            return element
          }
        })}
      </div>
    )
  }
}
