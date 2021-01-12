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
import React, { Component } from 'react'
import classNames from 'classnames'
import isEqual from 'react-fast-compare'
import Fuse from 'fuse.js'

import { RATE_RANGES, FUNCTIONS } from '../grammar'

import Item from './Item'

import styles from './index.scss'

const searchFunctions = value => {
  return FUNCTIONS.filter(func => func.label.indexOf(value) >= 0)
}

const searchRateRanges = value => {
  if (value === '[') {
    return RATE_RANGES
  }

  return []
}

const searchLabels = (labelsets = {}, value, tokenType) => {
  const keys = Object.keys(labelsets)
  if (value === '{' || value === ',') {
    return keys.map(key => ({ value: key }))
  }

  if (tokenType.label) {
    const values = labelsets[tokenType.label] || []
    if (value === '=') {
      return values.map(key => ({ value: `"${key}"` }))
    }
    if (value === '""' || value === "''") {
      return values.map(key => ({ value: key }))
    }
    return values
      .map(key => `"${key}"`)
      .filter(val => val.indexOf(value) >= 0)
      .map(val => ({ value: val }))
  }

  return keys
    .filter(key => key.indexOf(value) >= 0)
    .map(key => ({ value: key }))
}

export default class Suggestions extends Component {
  state = {
    focusIndex: 0,
    labels: [],
    functions: [],
    metrics: [],
    rateRanges: [],
  }

  wrapper = React.createRef()

  get keydownHandler() {
    return {
      38: this.handleArrowUp,
      40: this.handleArrowDown,
      13: this.handleEnter,
      14: this.handleEnter,
    }
  }

  componentDidMount() {
    this.fuse = new Fuse(this.props.metrics.map(item => item.value))
    this.getSuggestions()
    document.addEventListener('keydown', this.handleKeyDown)
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.value !== this.props.value ||
      !isEqual(prevProps.tokenContext, this.props.tokenContext) ||
      !isEqual(prevProps.labelsets, this.props.labelsets)
    ) {
      this.getSuggestions()
    }

    if (!isEqual(prevProps.metrics, this.props.metrics)) {
      this.fuse = new Fuse(this.props.metrics.map(item => item.value))
      this.getSuggestions()
    }
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown)
  }

  handleArrowDown = () => {
    this.setState(({ focusIndex, labels, functions, metrics, rateRanges }) => {
      const totalLength =
        labels.length + functions.length + metrics.length + rateRanges.length
      return {
        focusIndex: focusIndex >= totalLength - 1 ? 0 : focusIndex + 1,
      }
    }, this.scrollToFocus)
  }

  handleArrowUp = () => {
    this.setState(({ focusIndex, labels, functions, metrics, rateRanges }) => {
      const totalLength =
        labels.length + functions.length + metrics.length + rateRanges.length
      return {
        focusIndex: focusIndex <= 0 ? totalLength - 1 : focusIndex - 1,
      }
    }, this.scrollToFocus)
  }

  handleEnter = () => {
    const { onSelect } = this.props
    const { focusIndex, functions, metrics, rateRanges, labels } = this.state
    const item = [...labels, ...functions, ...metrics, ...rateRanges][
      focusIndex
    ]
    item && onSelect(item.value || item.label)
  }

  handleKeyDown = e => {
    if (this.keydownHandler[e.keyCode]) {
      e.stopPropagation()
      e.preventDefault()
      this.keydownHandler[e.keyCode](e)
    }
  }

  scrollToFocus = () => {
    if (this.wrapper && this.wrapper.current) {
      const $wrapper = this.wrapper.current
      const $focus = $wrapper.querySelector('.is-focus')

      if (!$focus) {
        return
      }

      const scrollTop = $wrapper.scrollTop
      const scrollBottom = scrollTop + $wrapper.offsetHeight
      const focusTop = $focus.offsetTop
      const focusBottom = focusTop + $focus.offsetHeight

      if (scrollTop > focusTop || scrollBottom < focusBottom) {
        $wrapper.scrollTop = $focus.offsetTop - 6
      }
    }
  }

  searchMetrics = value => {
    return this.fuse.search(value, { limit: 50 }).map(item => ({
      value: item.item,
    }))
  }

  getSuggestions() {
    const { value, labelsets, tokenContext } = this.props

    let functions = []
    let metrics = []
    let rateRanges = []
    let labels = []

    if (tokenContext && tokenContext.type.indexOf('context-labels') > -1) {
      labels = searchLabels(labelsets, value, tokenContext)
    } else {
      functions = searchFunctions(value)
      metrics = this.searchMetrics(value)
      rateRanges = searchRateRanges(value)
    }

    this.setState({ functions, metrics, rateRanges, labels })
  }

  renderList(data, title) {
    const { value, onSelect } = this.props
    const { focusIndex } = this.state

    if (isEmpty(data)) {
      return null
    }

    return (
      <div className={styles.group}>
        <div className={styles.groupTitle}>{title}</div>
        <div className={styles.options}>
          {data.map((item, index) => (
            <Item
              key={item.value || item.label}
              data={item.value || item.label}
              inputValue={value}
              isFocused={focusIndex === index}
              onSelect={onSelect}
            />
          ))}
        </div>
      </div>
    )
  }

  render() {
    const { className } = this.props
    const { functions, metrics, rateRanges, labels } = this.state

    if (
      isEmpty(functions) &&
      isEmpty(metrics) &&
      isEmpty(rateRanges) &&
      isEmpty(labels)
    ) {
      return null
    }

    return (
      <div className={classNames(styles.wrapper, className)} ref={this.wrapper}>
        {this.renderList(labels, 'Labels')}
        {this.renderList(functions, 'Functions')}
        {this.renderList(rateRanges, 'Rate Ranges')}
        {this.renderList(metrics, 'Metrics')}
      </div>
    )
  }
}
