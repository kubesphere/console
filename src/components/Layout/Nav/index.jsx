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

import { trimEnd } from 'lodash'

import NavItem from './NavItem'

import styles from './index.scss'

class Nav extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    navs: PropTypes.array.isRequired,
    prefix: PropTypes.string,
    checkSelect: PropTypes.func,
    onItemClick: PropTypes.func,
    innerRef: PropTypes.object,
  }

  static defaultProps = {
    className: '',
    prefix: '',
    checkSelect() {},
    onItemClick() {},
  }

  constructor(props) {
    super(props)

    this.state = {
      openedNav: this.getOpenedNav(),
    }
  }

  get currentPath() {
    const {
      location: { pathname },
      match: { url },
    } = this.props

    const length = trimEnd(url, '/').length
    return pathname.slice(length + 1)
  }

  getOpenedNav() {
    let name = ''
    const { navs } = this.props
    const current = this.currentPath
    navs.forEach(nav => {
      nav.items.forEach(item => {
        if (
          item.children &&
          item.children.some(child => {
            if (child.name === current) {
              return true
            }
            if (child.tabs) {
              return child.tabs.some(tab => tab.name === current)
            }

            return false
          })
        ) {
          name = item.name
        }
      })
    })

    return name
  }

  handleItemOpen = name => {
    this.setState(({ openedNav }) => ({
      openedNav: openedNav === name ? '' : name,
    }))
  }

  render() {
    const {
      className,
      navs,
      match,
      innerRef,
      onItemClick,
      disabled,
    } = this.props

    const { openedNav } = this.state
    const current = this.currentPath
    const prefix = trimEnd(match.url, '/')

    return (
      <div ref={innerRef} className={className}>
        {navs.map(nav => (
          <div key={nav.cate} className={styles.subNav}>
            {nav.title && <p>{t(nav.title)}</p>}
            <ul>
              {nav.items.map(item => (
                <NavItem
                  key={item.name}
                  item={item}
                  prefix={prefix}
                  current={current}
                  onClick={onItemClick}
                  isOpen={item.name === openedNav}
                  onOpen={this.handleItemOpen}
                  disabled={disabled}
                />
              ))}
            </ul>
          </div>
        ))}
      </div>
    )
  }
}

export default Nav
