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

import { isEmpty } from 'lodash'
import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { Input, Control, Icon } from '@pitrix/lego-ui'

import styles from './index.scss'

export default class Search extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    placeholder: PropTypes.string,
    onSearch: PropTypes.func,
    disabled: PropTypes.bool,
  }

  static defaultProps = {
    onSearch() {},
    disabled: false,
  }

  constructor(props) {
    super(props)

    this.state = { visible: !isEmpty(props.value), value: props.value }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      this.setState({
        value: nextProps.value,
        visible: !isEmpty(nextProps.value),
      })
    }
  }

  handleChange = (e, value) => {
    this.setState({ visible: !isEmpty(value), value }, () => {
      if (isEmpty(value)) {
        this.props.onSearch()
      }
    })
  }

  handleClear = e => {
    e.nativeEvent.stopImmediatePropagation()
    this.setState({ visible: false, value: '' }, () => {
      this.props.onSearch(this.state.value)
    })
  }

  handleKeyUp = e => {
    if (e.keyCode === 13) {
      const { value } = this.state
      if (!isEmpty(value)) {
        this.props.onSearch(this.state.value)
      }
    }
  }

  render() {
    const { visible, value } = this.state
    const { name, placeholder, disabled, className } = this.props

    return (
      <Control
        className={classNames(
          'has-icons-left',
          'has-icons-right',
          styles.search,
          className
        )}
        data-test="search"
      >
        <Icon className="is-left" name="magnifier" />
        <Input
          type="text"
          placeholder={placeholder}
          onChange={this.handleChange}
          onKeyUp={this.handleKeyUp}
          name={name}
          value={value || ''}
          disabled={disabled}
        />
        {visible && (
          <Icon
            className="is-right"
            name="close"
            clickable
            onClick={this.handleClear}
          />
        )}
      </Control>
    )
  }
}
