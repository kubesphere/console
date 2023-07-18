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
import { debounce, isEmpty, isUndefined } from 'lodash'
import isEqual from 'react-fast-compare'
import classNames from 'classnames'
import { Icon, Dropdown } from '@kube-design/components'

import styles from './index.scss'

export default class Select extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    value: PropTypes.any,
    defaultValue: PropTypes.any,
    options: PropTypes.array.isRequired,
    onChange: PropTypes.func,
  }

  static defaultProps = {
    className: '',
    defaultValue: '',
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

  triggerChange = debounce(() => {
    const { onChange } = this.props

    onChange(this.state.value)
  })

  handleClick = value => {
    this.setState({ value, showOptions: false }, () => {
      this.triggerChange()
    })
  }

  toggleShowOptions = () => {
    this.setState({
      showOptions: !this.state.showOptions,
    })
  }

  handleShowOptions = () => {
    this.setState({ showOptions: true })
  }

  handleHideOptions = () => {
    this.setState({ showOptions: false })
  }

  renderOption(option, selected) {
    const onClick = () => this.handleClick(option.value)
    return (
      <div
        key={option.uid || option.value}
        onClick={onClick}
        className={classNames(styles.option, { [styles.selected]: selected })}
      >
        <div className={styles.optionCol}>
          <span className={styles.optionLabel}>{option.label}</span>
          {option.isDefault && (
            <span className={styles.defaultTag}>{t('DEFAULT')}</span>
          )}
        </div>
      </div>
    )
  }

  renderOptions() {
    const { options, disabled } = this.props
    const { value } = this.state

    if (disabled || isEmpty(options)) {
      return null
    }

    const selectOption = options.find(item => isEqual(item.value, value))

    return (
      <div className={styles.options}>
        {selectOption && this.renderOption(selectOption, true)}
        {options
          .filter(item => !isEqual(item.value, value))
          .map(option => this.renderOption(option))}
      </div>
    )
  }

  renderControl() {
    const { value, defaultValue, placeholder, options, disabled } = this.props

    const _value = value || defaultValue

    const option =
      options.find(item => isEqual(item.value, _value)) || placeholder || {}

    return (
      <div className={styles.control}>
        <span className={styles.label}>{option.label}</span>
        {!disabled && (
          <Icon
            className={classNames(styles.rightIcon, {
              [styles.rightIcon_toggle]: this.state.showOptions,
            })}
            name="chevron-down"
            size={20}
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
        onClick={this.toggleShowOptions}
      >
        <Dropdown
          closeAfterClick={false}
          visible={this.state.showOptions}
          onOpen={this.handleShowOptions}
          onClose={this.handleHideOptions}
          content={this.renderOptions()}
        >
          {this.renderControl()}
        </Dropdown>
      </div>
    )
  }
}
