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

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { isFunction, omit, noop } from 'lodash'
import styles from './index.scss'

class Input extends PureComponent {
  static propTypes = {
    name: PropTypes.string,
    type: PropTypes.string,
    className: PropTypes.string,
    size: PropTypes.oneOf(['small', 'default', 'large']),
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    disabled: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
    // Handler
    onChange: PropTypes.func,
    onPressEnter: PropTypes.func,
    onKeyDown: PropTypes.func,
  }

  static defaultProps = {
    type: 'text',
    size: 'default',
    disabled: false,
    onChange: noop,
    onPressEnter: noop,
    onKeyDown: noop,
    defaultValue: '',
  }

  constructor(props) {
    super(props)
    this.state = {
      value: String(props.value || props.defaultValue),
      isFocus: false,
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if ('value' in nextProps && nextProps.value !== prevState.value) {
      return {
        value: nextProps.value,
      }
    }
    return null
  }

  focus = () => {
    this.node.focus()
  }

  blur = () => {
    this.node.blur()
  }

  handleChange = e => {
    const { value } = e.target
    const { value: propsValue, onChange } = this.props
    const newValue = propsValue || value

    this.setState({ value: newValue })
    if (onChange !== noop) {
      onChange(e, value)
    }
  }

  handleKeyDown = e => {
    const { onPressEnter, onKeyDown } = this.props
    if (e.keyCode === 13 && onPressEnter) {
      onPressEnter(e)
    }
    if (onKeyDown) {
      onKeyDown(e)
    }
  }

  render() {
    const { className, size, disabled, children, ...restProps } = this.props
    const { value } = this.state

    return (
      <span
        className={classNames(styles.input, className, {
          [`is-${size}`]: size,
        })}
      >
        {children}
        <input
          {...omit(
            restProps,
            'schemas',
            'onKeyDown',
            'onPressEnter',
            'onChange',
            'value',
            'defaultValue',
            'validateStatus',
            'validateHelp',
            'validateIcon',
            'validateOnChange',
            'validateOnBlur'
          )}
          disabled={isFunction(disabled) ? disabled() : disabled}
          onKeyDown={this.handleKeyDown}
          onChange={this.handleChange}
          value={value}
          ref={node => {
            this.node = node
          }}
          data-test="imageSearch"
        />
        <span className={classNames(styles.border, 'input')} />
      </span>
    )
  }
}

export default Input
