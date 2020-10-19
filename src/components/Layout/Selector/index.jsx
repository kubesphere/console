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

import { Icon, Dropdown, Loading, Menu } from '@kube-design/components'

import styles from './index.scss'

export default class Selector extends React.Component {
  static propTypes = {
    icon: PropTypes.string,
    defaultIcon: PropTypes.string,
    value: PropTypes.string,
    type: PropTypes.string,
    loading: PropTypes.bool,
    options: PropTypes.array,
    onSelect: PropTypes.func,
    onScrollBottom: PropTypes.func,
  }

  static defaultProps = {
    icon: '',
    defaultIcon: '',
    value: '',
    type: '',
    loading: false,
    options: [],
    onSelect() {},
    onScrollBottom() {},
  }

  constructor(props) {
    super(props)

    this.contentRef = React.createRef()
  }

  componentDidMount() {
    if (this.contentRef.current) {
      this.$dropdownContent = this.contentRef.current.querySelector(
        '.dropdown-content'
      )
      this.$dropdownContent.addEventListener('scroll', this.handleScroll)
    }
  }

  componentWillUnmount() {
    if (this.$dropdownContent) {
      this.$dropdownContent.removeEventListener('scroll', this.handleScroll)
    }
  }

  componentDidUpdate() {
    if (this.contentRef.current) {
      const $menu = this.contentRef.current.querySelector(
        '.dropdown-content > .menu-wrapper'
      )

      if ($menu && this.$dropdownContent) {
        this.threshold = $menu.offsetHeight - this.$dropdownContent.offsetHeight
      }
    }
  }

  get isMulti() {
    return this.props.options.length > 1
  }

  handleScroll = e => {
    if (this.threshold && e.target.scrollTop >= this.threshold - 2) {
      this.props.onScrollBottom()
    }
  }

  handleMenuClick = (e, key) => {
    this.props.onSelect(key)
  }

  renderList() {
    const { defaultIcon, options, loading } = this.props

    if (!this.isMulti) {
      return null
    }

    return (
      <div className="menu-wrapper">
        <Menu width={220} onClick={this.handleMenuClick}>
          {options.map(option => (
            <Menu.MenuItem key={option.value}>
              <img src={defaultIcon} alt="" />
              {option.label}
            </Menu.MenuItem>
          ))}
        </Menu>
        <div className={styles.bottom}>
          {loading && <Loading size="small" />}
        </div>
      </div>
    )
  }

  render() {
    const { icon, defaultIcon, value, type, options } = this.props

    const option = options.find(item => item.value === value) || {}

    return (
      <div ref={this.contentRef}>
        <Dropdown theme="dark" content={this.renderList()}>
          <div
            className={classNames(styles.titleWrapper, {
              [styles.multi]: this.isMulti,
            })}
          >
            <div className={styles.icon}>
              <img src={icon || defaultIcon} alt="" />
            </div>
            <div className={styles.text}>
              <p>{type}</p>
              <div className="h6">{option.label || value}</div>
            </div>
            {this.isMulti && (
              <div className={styles.arrow}>
                <Icon name="caret-down" type="light" />
              </div>
            )}
          </div>
        </Dropdown>
      </div>
    )
  }
}
