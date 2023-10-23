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
import { noop } from 'lodash'
import AutosizeInput from 'react-input-autosize'
import { Notify } from '@kube-design/components'

import { PATTERN_TAG } from 'utils/constants'

import styles from './index.scss'

class Autosuggest extends Component {
  static propTypes = {
    onChange: PropTypes.func,

    onDelete: PropTypes.func,
    prefixCls: PropTypes.string,
    className: PropTypes.string,
    style: PropTypes.string,
    placeholder: PropTypes.string,
  }

  static defaultProps = {
    prefixCls: 'autosuggest',
    onAdd: noop,
    onDelete: noop,
    onChange: noop,
  }

  state = {
    value: '',
  }

  focus = () => {
    this.inputBox.focus()
  }

  handleChange = event => {
    const { value } = event.target
    const { onChange } = this.props

    this.setState({ value })
    onChange(event, value)
  }

  handlePressEnter = event => {
    event.stopPropagation()
    const { onAdd, onDelete } = this.props
    const { value } = this.state

    if (event.key === 'Enter') {
      if (value.trim() !== '') {
        if (!PATTERN_TAG.test(value) || value.length > 63) {
          Notify.error({ content: t('PATTERN_TAG_VALUE_INVALID_TIP') })
          return
        }
        this.setState({ value: '' }, () => {
          onAdd(value)
        })
      }
    } else if (event.key === 'Backspace') {
      onDelete()
    }
  }

  handEnter = event => {
    event.stopPropagation()
    const { onAdd } = this.props
    const { value } = this.state
    if (value.trim() !== '') {
      if (!PATTERN_TAG.test(value) || value.length > 63) {
        Notify.error({ content: t('PATTERN_TAG_VALUE_INVALID_TIP') })
        return
      }
      this.setState({ value: '' }, () => {
        onAdd(value)
      })
    }
  }

  render() {
    const { value } = this.state
    const { style, placeholder } = this.props

    return (
      <div
        style={style}
        className={styles.autosuggest}
        ref={n => {
          this.autosuggest = n
        }}
      >
        <AutosizeInput
          className={styles.autosuggestInput}
          type="text"
          onKeyDown={this.handlePressEnter}
          onBlur={this.handEnter}
          onChange={this.handleChange}
          placeholder={placeholder}
          ref={n => {
            this.inputBox = n
          }}
          value={value}
        />
      </div>
    )
  }
}

export default Autosuggest
