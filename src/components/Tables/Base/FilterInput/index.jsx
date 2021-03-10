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
import classNames from 'classnames'
import isEqual from 'react-fast-compare'
import { find, isEmpty, trim, omit } from 'lodash'
import { Icon, Input, Dropdown, Menu, Tag } from '@kube-design/components'
import { hasClass, addClass, removeClass } from 'utils/dom'
import styles from './index.scss'

export default class FilterInput extends Component {
  constructor(props) {
    super(props)

    const suggestions = this.getSuggestions(props.columns)
    const tags = this.getTags(suggestions, props.filters)

    this.state = {
      suggestions,
      activeSuggestion: null,
      optionVisible: false,
      tags,
    }

    this.input = React.createRef()
    this.filterInput = React.createRef()
  }

  componentDidUpdate(prevProps) {
    let { suggestions } = this.state
    if (this.props.columns !== prevProps.columns) {
      suggestions = this.getSuggestions(this.props.columns)
      this.setState({ suggestions })
    }

    if (!isEqual(this.props.filters, prevProps.filters)) {
      this.setState({
        value: '',
        activeSuggestion: null,
        optionVisible: false,
        tags: this.getTags(suggestions, this.props.filters),
      })
    }
  }

  getSuggestions(columns) {
    return columns
      .filter(column => column.search && column.dataIndex)
      .map(column => ({
        label: column.title,
        key: column.dataIndex,
        options:
          column.filters &&
          column.filters.map(filter => ({
            label: filter.text,
            key: filter.value,
          })),
      }))
  }

  getTags(suggestions, filters) {
    if (typeof filters !== 'object') return []

    return Object.keys(filters).map(n => {
      const curFilter = find(suggestions, { key: n }) || {}
      const curValue = curFilter.options
        ? find(curFilter.options, { key: filters[n] }) || {}
        : {}
      return {
        filter: n,
        filterLabel: 'label' in curFilter ? curFilter.label : '',
        value: filters[n],
        valueLabel: 'label' in curValue ? curValue.label : filters[n],
      }
    })
  }

  handleFoucs = () => {
    if (this.filterInput && this.filterInput.current) {
      if (!hasClass(this.filterInput.current, styles.focus)) {
        addClass(this.filterInput.current, styles.focus)
      }
    }
  }

  handleBlur = () => {
    if (this.filterInput && this.filterInput.current) {
      if (hasClass(this.filterInput.current, styles.focus)) {
        removeClass(this.filterInput.current, styles.focus)
      }
    }
  }

  handleChange = e => {
    const { value } = e.target
    this.setState({ value }, () => {
      if (isEmpty(value)) {
        this.setState({ activeSuggestion: null })
      }
    })
  }

  handleClear = e => {
    e.nativeEvent.stopImmediatePropagation()
    this.setState({ value: '', activeSuggestion: null }, () => {
      this.props.onChange({})
    })
  }

  handleKeyUp = e => {
    if (e.keyCode === 13) {
      const { value, suggestions, activeSuggestion } = this.state
      if (!isEmpty(value)) {
        const { onChange, filters } = this.props
        const sg = activeSuggestion || suggestions[0]
        onChange({
          ...filters,
          [sg.key]: trim(value.replace(`${sg.label}:`, '')),
        })
      }
    }
  }

  handleTagDelete = tag => {
    const { onChange, filters } = this.props
    onChange(omit(filters, tag.filter))
  }

  handleMenuClick = (e, key, value) => {
    this.setState(
      {
        activeSuggestion: value,
        value: `${value.label}:`,
        optionVisible: !!value.options,
      },
      () => {
        this.input.current.focus()
      }
    )
  }

  renderMenu() {
    const { suggestions, tags } = this.state

    const sgs = suggestions.filter(
      sg => !tags.some(tag => tag.filter === sg.key)
    )

    if (sgs.length < 1) {
      return null
    }

    return (
      <Menu onClick={this.handleMenuClick}>
        {sgs.map(sg => (
          <Menu.MenuItem key={sg.key} value={sg}>
            {sg.label}
          </Menu.MenuItem>
        ))}
      </Menu>
    )
  }

  handleSuggestionMenuClick = (e, key, value) => {
    const { activeSuggestion } = this.state

    const { onChange, filters } = this.props
    const sg = activeSuggestion
    onChange({
      ...filters,
      [sg.key]: trim(value),
    })
  }

  renderSuggestionOptions() {
    const { activeSuggestion } = this.state

    return (
      <Menu onClick={this.handleSuggestionMenuClick}>
        {activeSuggestion.options.map(option => (
          <Menu.MenuItem key={option.key} value={option.key}>
            {option.label}
          </Menu.MenuItem>
        ))}
      </Menu>
    )
  }

  renderTags() {
    const { tags } = this.state
    return tags.map(tag => (
      <Tag key={tag.filter}>
        <span>
          {tag.filterLabel}:{tag.valueLabel}
        </span>
        <Icon
          name="close"
          type="light"
          clickable
          onClick={() => this.handleTagDelete(tag)}
        />
      </Tag>
    ))
  }

  renderInput() {
    const { activeSuggestion, optionVisible, value } = this.state
    let content
    const input = (
      <Input
        type="text"
        innerRef={this.input}
        placeholder={t('Search with filters')}
        onChange={this.handleChange}
        onKeyUp={this.handleKeyUp}
        value={value || ''}
        onFocus={this.handleFoucs}
        onBlur={this.handleBlur}
      />
    )

    if (activeSuggestion) {
      if (activeSuggestion.options) {
        content = this.renderSuggestionOptions()
      }
    } else {
      content = this.renderMenu()
    }

    if (content) {
      return (
        <Dropdown
          theme="dark"
          content={content}
          visible={optionVisible}
          closeAfterClick={false}
        >
          {input}
        </Dropdown>
      )
    }

    return input
  }

  render() {
    const { className } = this.props
    const { value, tags } = this.state
    const hasValue = !isEmpty(value) || !isEmpty(tags)

    return (
      <div
        className={classNames(
          styles.wrapper,
          { [styles.hasValue]: hasValue },
          className
        )}
        ref={this.filterInput}
      >
        <Icon className="is-left" name="magnifier" />
        <div className={styles.content}>
          {this.renderTags()}
          {this.renderInput()}
        </div>
        {hasValue && (
          <Icon
            className="is-right"
            name="close"
            clickable
            onClick={this.handleClear}
          />
        )}
      </div>
    )
  }
}
