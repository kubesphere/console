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
import { TextArea as TextAreaLegoUi } from '@pitrix/lego-ui'

import classNames from 'classnames'
import styles from './index.scss'

export default class TextArea extends React.Component {
  static propTypes = {
    name: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    autoResize: PropTypes.bool,
    maxHeight: PropTypes.number,
    maxLength: PropTypes.number,
  }

  static defaultProps = {
    name: '',
    placeholder: '',
    value: '',
    onChange() {},
    autoResize: false,
    maxHeight: 600,
  }

  ref = React.createRef()

  componentDidMount() {
    this.autoResize()
  }

  handleChange = e => {
    this.autoResize()
    const { onChange, maxLength } = this.props
    let value = e.target.value
    if (maxLength && value.length > maxLength) {
      value = value.slice(0, maxLength)
    }
    onChange && onChange(value)
  }

  autoResize() {
    const { maxHeight, autoResize } = this.props
    if (!autoResize) {
      return false
    }
    const node = this.ref.current.node
    node.style.height = ''
    if (node.scrollHeight > maxHeight) {
      node.style.height = `${maxHeight}px`
      node.style.overflow = 'auto'
    } else {
      node.style.height = `${node.scrollHeight}px`
      node.style.overflow = 'hidden'
    }
  }

  render() {
    const { className, autoResize, maxHeight, ...rest } = this.props

    const props = {
      ...rest,
      onChange: this.handleChange,
    }

    const style = autoResize
      ? classNames(className, styles.textareaAuto)
      : classNames(className)

    return <TextAreaLegoUi className={style} ref={this.ref} {...props} />
  }
}
