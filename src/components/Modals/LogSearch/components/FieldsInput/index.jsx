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
import { get } from 'lodash'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import SearchBar from '../SearchBar'
import styles from './index.scss'

/**
 * Render the SearchBar and fields hint
 */
class FieldsInput extends Component {
  static propTypes = {
    className: PropTypes.string,
    fields: PropTypes.array,
    onOptionSelect: PropTypes.func,
    onFieldRemove: PropTypes.func,
    options: PropTypes.array,
  }

  static defaultProps = {
    fields: [],
    onOptionSelect() {},
    options: [],
  }

  handleKeyUp = e => {
    const { keyCode } = e
    const hotkeyHandler = this.keyupHandlerMap[keyCode]
    hotkeyHandler && hotkeyHandler()
  }

  handleNavUp = () => {
    this.props.onNav(-1)
  }

  handleNavDown = () => {
    this.props.onNav(+1)
  }

  handleOptionClick = e => {
    const { index } = e.currentTarget.dataset
    this.selectOption(index)
  }

  handleOnEnter = () => {
    const { selectOptionIndex } = this.props
    this.selectOption(selectOptionIndex)
  }

  handlerRemove = fields => {
    this.props.onFieldsChange(fields.map(filed => filed.value))
  }

  handleClear = () => {
    this.props.onFieldsChange([])
  }

  selectOption(index) {
    const { options, onOptionSelect } = this.props
    if (options.length) {
      onOptionSelect(get(options, `[${index}].value`), index)
    }
  }

  keyupHandlerMap = {
    38: this.handleNavUp,
    40: this.handleNavDown,
    13: this.handleOnEnter,
    14: this.handleOnEnter,
  }

  render() {
    const { className, hideTips } = this.props

    return (
      <div className={classnames(styles.wrapper, className)}>
        {this.renderSearchBar()}
        {hideTips || this.renderOptions()}
      </div>
    )
  }

  renderSearchBar() {
    const { fields, text, inputClassName, inputProps } = this.props

    return (
      <SearchBar
        text={text}
        fields={fields}
        className={inputClassName}
        onClear={this.handleClear}
        onFieldRemove={this.handlerRemove}
        {...inputProps}
        onKeyUp={this.handleKeyUp}
      />
    )
  }

  renderOptions() {
    const { optionsClassName, options, selectOptionIndex } = this.props
    return (
      <div className={classnames(styles.options, optionsClassName)}>
        {options.map((option, index) => (
          <div
            className={classnames({
              [styles.active]: index === selectOptionIndex,
            })}
            data-index={index}
            onClick={this.handleOptionClick}
            key={index}
          >
            {option.label}
          </div>
        ))}
      </div>
    )
  }
}

export default FieldsInput
