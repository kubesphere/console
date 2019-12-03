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
import PropTypes from 'prop-types'
import Fuse from 'fuse.js'
import FieldsInput from 'components/Modals/LogSearch/components/FieldsInput'

/**
 * Control and provide fields Hint for User, A business component
 */
class FieldsHintInput extends Component {
  static propTypes = {
    inputClassName: PropTypes.string,
    fields: PropTypes.array,
    hideTips: PropTypes.bool,
    onFieldChange: PropTypes.func,
    onTextEmpty: PropTypes.func,
  }

  hinter = this.initHinter()

  initHinter() {
    const fieldsOpts = this.props.supportFields.map(field => ({
      label: `${field.key}(${field.des}):`,
      value: {
        key: field.key,
      },
      reg: field.valueRegex,
    }))

    return new Fuse(fieldsOpts, { keys: ['label'] })
  }

  get options() {
    const { text } = this.state
    const [, key, value = ''] = text.match(/(.*)?:(.*)/) || ['', text]

    const keyOptions = this.hinter
      .search(key)
      .filter(option => !value || !option.reg || option.reg.test(value))
      .map(option => ({
        label: `${option.label}${value}`,
        value: {
          ...option.value,
          value: value || '',
        },
      }))

    const completeOptions = (this.hinter.list || [])
      .filter(option => !option.reg || option.reg.test(text))
      .map(option => ({
        label: `${option.label}${text}`,
        value: {
          ...option.value,
          value: text || '',
        },
      }))

    return [...keyOptions, ...completeOptions]
  }

  formatFields(fields) {
    return fields.map(field => ({
      label: `${field.key}: ${field.value}`,
      value: field,
    }))
  }

  state = {
    text: '',
    selectOptionIndex: 0,
  }

  /**
   * reset select index and hints
   * export event when text is empty
   */
  handleTextChange = (e, text) => {
    text ? this.props.onTextInput() : this.props.onTextEmpty()
    this.setState({ text, selectOptionIndex: 0 })
  }

  onFocus = () => {
    this.props.onFocus(this.state.text)
  }

  nav = step => {
    const { length } = this.options

    if (length) {
      this.setState(preState => {
        const { selectOptionIndex } = preState
        const nextIndex = (selectOptionIndex + step + length) % length
        return {
          selectOptionIndex: nextIndex,
        }
      })
    }
  }

  handleFiledSelect = field => {
    if (field.value) {
      this.props.onFieldsChange([...this.props.fields, field])
      this.handleTextChange(null, '')
    } else {
      this.handleTextChange(null, `${field.key}:`)
    }
  }

  handleFieldsChange = fields => {
    this.props.onFieldsChange(fields)
  }

  render() {
    const { selectOptionIndex, text } = this.state
    const { inputClassName, optionsClassName, hideTips } = this.props

    return (
      <FieldsInput
        text={text}
        inputClassName={inputClassName}
        optionsClassName={optionsClassName}
        fields={this.formatFields(this.props.fields)}
        options={this.options}
        selectOptionIndex={selectOptionIndex}
        inputProps={{
          placeholder: t('LOG_SEARCH_BAR_PLACEHOLDER'),
          onFocus: this.onFocus,
          onChange: this.handleTextChange,
        }}
        hideTips={hideTips}
        onNav={this.nav}
        onFieldsChange={this.handleFieldsChange}
        onOptionSelect={this.handleFiledSelect}
      />
    )
  }
}

export default FieldsHintInput
