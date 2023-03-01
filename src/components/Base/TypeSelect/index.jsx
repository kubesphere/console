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
import { debounce, isEmpty, isUndefined, isString } from 'lodash'
import isEqual from 'react-fast-compare'
import classNames from 'classnames'
import { Icon } from '@kube-design/components'

import styles from './index.scss'

export default class TypeSelect extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    value: PropTypes.any,
    defaultValue: PropTypes.any,
    options: PropTypes.array.isRequired,
    onChange: PropTypes.func,
  }

  static defaultProps = {
    className: '',
    options: [],
    onChange() {},
  }

  constructor(props) {
    super(props)

    this.state = {
      value: isUndefined(props.value) ? props.defaultValue : props.value,
      showOptions: false,
    }

    this.optionsRef = React.createRef()
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.value !== prevState.value) {
      this.setState({ value: this.props.value })
    }
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleDOMClick)
  }

  handleDOMClick = e => {
    if (
      this.optionsRef &&
      this.optionsRef.current &&
      !this.optionsRef.current.contains(e.target)
    ) {
      this.setState({ showOptions: false })
    }
  }

  triggerChange = debounce(() => {
    const { onChange } = this.props

    onChange(this.state.value)
  })

  handleClick = value => {
    this.setState({ value, showOptions: false }, () => {
      this.triggerChange()
    })
  }

  toggleOptions = () => {
    this.setState(
      ({ showOptions }) => ({
        showOptions: !showOptions,
      }),
      () => {
        document.removeEventListener('click', this.handleDOMClick)
        if (this.state.showOptions) {
          document.addEventListener('click', this.handleDOMClick)
        }
      }
    )
  }

  renderDetail(details) {
    return details.map((detail, index) => (
      <div key={index} className={styles.text}>
        <div>{detail.label}</div>
        {detail.description && <p>{detail.description}</p>}
      </div>
    ))
  }

  renderOption(option, selected) {
    const onClick = () => this.handleClick(option.value)
    return (
      <div
        key={option.uid || option.value}
        onClick={onClick}
        className={classNames(
          styles.option,
          { [styles.selected]: selected },
          { [styles.withIcon]: option.icon }
        )}
      >
        {this.renderIcon(option)}
        <div className={styles.text}>
          <div>{option.label}</div>
          {option.description && <p>{option.description}</p>}
        </div>
        {option.details && this.renderDetail(option.details)}
      </div>
    )
  }

  renderIcon(option) {
    if (!option.icon) {
      return null
    }

    if (isString(option.icon)) {
      return (
        <Icon
          className={styles.leftIcon}
          name={option.icon}
          size={40}
          type="dark"
        />
      )
    }

    return option.icon
  }

  renderOptions() {
    const { options, disabled } = this.props
    const { value, showOptions } = this.state

    if (disabled || !showOptions || isEmpty(options)) {
      return null
    }

    const selectOption = options.find(item => isEqual(item.value, value))

    return (
      <div className={styles.options} ref={this.optionsRef}>
        {selectOption && this.renderOption(selectOption, true)}
        {options
          .filter(item => !isEqual(item.value, value))
          .map(option => this.renderOption(option))}
      </div>
    )
  }

  renderControl() {
    const { placeholder, options, disabled } = this.props
    const { value, showOptions } = this.state
    const option =
      options.find(item => isEqual(item.value, value)) || placeholder || {}

    return (
      <div
        className={classNames(styles.control, {
          [styles.withIcon]: option.icon,
        })}
        onClick={this.toggleOptions}
      >
        {this.renderIcon(option)}
        <div className={styles.text}>
          <div>{option.label}</div>
          {option.description && <p>{option.description}</p>}
        </div>
        {option.details && this.renderDetail(option.details)}
        {!disabled && (
          <Icon
            className={styles.rightIcon}
            name={!showOptions ? 'chevron-down' : 'chevron-up'}
            size="small"
            clickable
          />
        )}
      </div>
    )
  }

  render() {
    const { className, disabled } = this.props
    return (
      <div
        className={classNames(
          styles.wrapper,
          { [styles.disabled]: disabled },
          className
        )}
      >
        {this.renderControl()}
        {this.renderOptions()}
      </div>
    )
  }
}
