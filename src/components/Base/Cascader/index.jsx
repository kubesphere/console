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

import Options from './Options'

import styles from './index.scss'

export default class Cascader extends Component {
  static defaultProps = {
    options: [],
    children: '',
    onSelect() {},
  }

  state = {
    isOpen: false,
  }

  ref = React.createRef()

  componentDidMount() {
    document.addEventListener('click', this.handleDOMClick)
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleDOMClick)
  }

  handleDOMClick = e => {
    if (this.ref && !this.ref.current.contains(e.target)) {
      this.setState({ isOpen: false })
    }
  }

  handleSelect = data => {
    this.props.onSelect(data)
    this.setState({ isOpen: false })
  }

  triggerOpen = () => {
    this.setState(({ isOpen }) => ({
      isOpen: !isOpen,
    }))
  }

  getOptionsStyle() {
    const style = {}
    if (this.ref && this.ref.current) {
      const triggerStyle = this.ref.current.getBoundingClientRect()
      style.top = triggerStyle.top + triggerStyle.height + 8
      style.left = triggerStyle.left
    }
    return style
  }

  render() {
    const { children, options } = this.props
    const { isOpen } = this.state

    return (
      <div className={styles.wrapper} ref={this.ref}>
        <div className={styles.trigger} onClick={this.triggerOpen}>
          {children}
        </div>
        {isOpen && (
          <Options
            style={this.getOptionsStyle()}
            options={options}
            level={0}
            onSelect={this.handleSelect}
          />
        )}
      </div>
    )
  }
}
