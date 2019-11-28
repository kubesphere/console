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
import { get, isEmpty, isUndefined, uniq } from 'lodash'

import { Button } from 'components/Base'
import Item from './Item'

import styles from './index.scss'

export default class TaintInput extends React.Component {
  static propTypes = {
    name: PropTypes.string,
    common: PropTypes.array,
    value: PropTypes.array,
    onChange: PropTypes.func,
    checkItemValid: PropTypes.func,
  }

  static defaultProps = {
    name: '',
    common: [],
    value: [''],
    onChange() {},
  }

  constructor(props) {
    super(props)

    this.state = {
      value: props.value,
      errorKeys: [],
      errorMsg: '',
    }
  }

  get defaultValue() {
    return {}
  }

  get commonKeys() {
    return this.props.common.map(value => value.key).filter(value => value)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.state.value) {
      this.setState({ value: nextProps.value })
    }
  }

  showKeyError = ({ index, message }) => {
    const errorKeys = uniq([...this.state.errorKeys, index])
    this.setState({ errorKeys, errorMsg: message })
  }

  hideKeyError = ({ index } = {}) => {
    const errorKeys = index
      ? this.state.errorKeys.filter(key => key !== index)
      : []
    this.setState({ errorKeys, errorMsg: '' })
  }

  isAddEnable() {
    const { checkItemValid } = this.props
    const { value, errorKeys } = this.state

    if (checkItemValid) {
      return value.every(checkItemValid)
    }

    return (
      isEmpty(errorKeys) &&
      value.every(
        item => !isEmpty(item) && Object.values(item).every(_value => _value)
      )
    )
  }

  handleAdd = () => {
    const { onChange } = this.props
    const { value } = this.state

    onChange([...value, this.defaultValue], this.defaultValue)
  }

  handleChange = (index, childValue) => {
    const { onChange } = this.props
    const { value } = this.state
    const itemValue = get(childValue, 'currentTarget.value', childValue)

    // some key is empty, throw error
    const emptyKeyIndex = value.findIndex(item => isEmpty(item.key))
    if (emptyKeyIndex !== -1) {
      this.showKeyError({ index: emptyKeyIndex, message: t('No empty keys') })
      return false
    }

    // has duplicate keys, throw error
    let existed = this.commonKeys.includes(itemValue.key)
    value.reduce((prev, cur) => {
      if (prev.key === cur.key) {
        existed = true
      }
      return cur
    })
    if (existed) {
      this.showKeyError({ index, message: t('Duplicate keys') })
      return false
    }

    let newValues = []
    if (isUndefined(value[index])) {
      newValues = [...value]
      newValues[index] = itemValue
    } else {
      newValues = value.map((item, _index) =>
        _index === index ? itemValue : item
      )
    }

    this.hideKeyError({ index })
    onChange(newValues)
  }

  handleSelect = index => {
    const { onSelect } = this.props
    const { value } = this.state

    onSelect(value[index], index)
  }

  handleDelete = index => {
    const { onChange } = this.props
    const { value } = this.state
    const newValues = value.filter((_, _index) => _index !== index)

    onChange(newValues, value[index])
  }

  renderItems() {
    const { onSelect } = this.props
    const { value, errorKeys, errorMsg } = this.state

    return value.map((item, index) => (
      <div
        key={index}
        className={classnames(styles.inputItem, {
          [styles.errorItem]: errorKeys.includes(index),
        })}
      >
        <Item
          value={item || this.defaultValue}
          onChange={this.handleChange.bind(this, index)}
          onSelect={onSelect && this.handleSelect.bind(this, index)}
          onDelete={this.handleDelete.bind(this, index)}
        />
        <div className={styles.error}>{errorMsg}</div>
      </div>
    ))
  }

  render() {
    const { className } = this.props

    return (
      <div className={classnames(styles.wrapper, className)}>
        {this.renderItems()}
        <div className="text-right">
          <Button
            className={styles.add}
            onClick={this.handleAdd}
            disabled={!this.isAddEnable()}
          >
            {t('Add Taint')}
          </Button>
        </div>
      </div>
    )
  }
}
