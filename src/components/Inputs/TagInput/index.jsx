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
import classnames from 'classnames'
import { noop } from 'lodash'

import { Tag, Icon } from '@kube-design/components'
import Autosuggest from './autosuggest'

import styles from './index.scss'

export default class TagInput extends React.Component {
  static propTypes = {
    placeholder: PropTypes.string,
    value: PropTypes.array,
    onChange: PropTypes.func,
    onInputChange: PropTypes.func,
  }

  static defaultProps = {
    value: [],
    onChange: noop,
    onBlur: noop,
    onFocus: noop,
    onClear: noop,
    onInputChange: noop,
  }

  constructor(props) {
    super(props)
    this.state = {
      tags: props.value || [],
    }
  }

  get placeholder() {
    const { placeholder } = this.props
    const { tags } = this.state
    if (tags.length === 0) {
      return placeholder
    }
    return null
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.tags !== nextProps.value) {
      return { tags: nextProps.value }
    }
    return null
  }

  handleClick = () => {
    this.autosuggest.focus()
  }

  handleInputChange = (event, value) => {
    const { onInputChange } = this.props
    onInputChange(event, value)
  }

  handleAdd = value => {
    const { tags } = this.state
    const { onChange } = this.props
    const newTags = [...tags, value]

    this.setState({ tags: newTags }, () => {
      onChange(newTags)
    })
  }

  handleDelete = () => {
    const { tags } = this.state
    const { onChange } = this.props
    if (tags.length <= 0) return
    const newTags = tags.filter((n, index) => index !== tags.length - 1)
    this.setState({ tags: newTags }, () => {
      onChange(newTags)
    })
  }

  handleCloseTag = ({ value, index }) => {
    const { tags } = this.state
    const { onChange } = this.props
    const newTags = tags.filter((item, i) => item !== value && i !== index)
    this.setState({ tags: newTags }, () => {
      onChange(newTags)
    })
  }

  renderTags = () => {
    const { tags } = this.state

    return (
      <React.Fragment>
        {tags.map((item, index) => (
          <Tag key={`${item}-${index + 1}`}>
            {item}
            <Icon
              name="close"
              color={{ primary: 'rgb(255,255,255)' }}
              size={16}
              clickable
              onClick={() => this.handleCloseTag({ item, index })}
            ></Icon>
          </Tag>
        ))}
      </React.Fragment>
    )
  }

  render() {
    return (
      <div
        className={classnames('input', styles.filterInput)}
        onClick={this.handleClick}
      >
        {this.renderTags()}
        <Autosuggest
          ref={n => {
            this.autosuggest = n
          }}
          placeholder={this.placeholder}
          onChange={this.handleInputChange}
          onAdd={this.handleAdd}
          onDelte={this.handleDelete}
        />
      </div>
    )
  }
}
