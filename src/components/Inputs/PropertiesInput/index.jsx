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

import { isEmpty, has } from 'lodash'
import React from 'react'
import PropTypes from 'prop-types'
import isEqual from 'react-fast-compare'
import classnames from 'classnames'
import { Button } from 'components/Base'

import Item from './Item'

import styles from './index.scss'

export default class PropertiesInput extends React.Component {
  static propTypes = {
    name: PropTypes.string,
    value: PropTypes.object,
    hiddenKeys: PropTypes.arrayOf(PropTypes.string),
    readOnlyKeys: PropTypes.arrayOf(PropTypes.string),
    onChange: PropTypes.func,
    onError: PropTypes.func,
  }

  static defaultProps = {
    name: '',
    value: {},
    hiddenKeys: [],
    readOnlyKeys: [],
    onChange() {},
  }

  constructor(props) {
    super(props)

    this.state = {
      existedKey: false,
      propsValue: props.value,
      ...PropertiesInput.getValues(props),
    }
  }

  static getDerivedStateFromProps(props, state) {
    if (props.controlledValue && !isEqual(props.value, state.propsValue)) {
      return {
        propsValue: props.value,
        ...PropertiesInput.getValues(props),
      }
    }

    return null
  }

  static getValues(props) {
    const propsValue = props.controlledValue || props.value || {}
    const hiddenValues = []
    const readOnlyValues = []
    const arrayValues = []

    Object.keys(propsValue).forEach(key => {
      if (props.hiddenKeys.some(hiddenKey => new RegExp(hiddenKey).test(key))) {
        hiddenValues.push({
          key,
          value: propsValue[key],
        })
      } else if (
        props.readOnlyKeys.some(readOnlyKey =>
          new RegExp(readOnlyKey).test(key)
        )
      ) {
        readOnlyValues.push({
          key,
          value: propsValue[key],
        })
      } else {
        arrayValues.push({
          key,
          value: propsValue[key],
        })
      }
    })

    if (isEmpty(arrayValues) && isEmpty(readOnlyValues)) {
      arrayValues.push({ key: '' })
    }

    return { hiddenValues, readOnlyValues, arrayValues }
  }

  handleAdd = () => {
    this.setState(({ arrayValues }) => ({
      arrayValues: [...arrayValues, { key: '' }],
    }))
  }

  triggerChange = arrayValues => {
    const { onChange } = this.props
    const { hiddenValues, readOnlyValues } = this.state
    let existedKey = false
    let emptyKeyValue = false

    const valuePairs = [...hiddenValues, ...readOnlyValues, ...arrayValues]
    const value = valuePairs.reduce((prev, cur) => {
      cur.key = cur.key || ''

      // when add new line, do not change value
      if (isEmpty(cur.key) && isEmpty(cur.value)) {
        emptyKeyValue = true
      }

      // has duplicate keys
      if (has(prev, cur.key)) {
        existedKey = true
        return prev
      }

      return {
        ...prev,
        [cur.key]: cur.value || '',
      }
    }, {})

    this.setState({ arrayValues }, () => {
      if (emptyKeyValue) {
        return
      }

      if (!existedKey) {
        onChange(value)
      }
    })

    // some key is empty, throw error
    const hasEmptyKey = Object.keys(value).some(key => isEmpty(key))
    if (hasEmptyKey) {
      this.props.onError({ message: t('Empty keys') })
    }

    // has duplicate keys, throw error
    if (existedKey) {
      this.props.onError({ message: t('Duplicate keys') })
    } else {
      this.props.onError()
    }
  }

  handleItemChange = (index, value) => {
    const { arrayValues } = this.state
    arrayValues[index] = value
    this.triggerChange(arrayValues)
  }

  handleItemDelete = index => {
    const { arrayValues } = this.state
    this.triggerChange(arrayValues.filter((_, _index) => _index !== index))
  }

  isAddEnable() {
    const { arrayValues } = this.state

    return arrayValues.every(
      item => !(isEmpty(item) || (!item.key && !item.value))
    )
  }

  render() {
    const { className, addText, itemProps } = this.props
    const { readOnlyValues, arrayValues } = this.state

    return (
      <div className={classnames(styles.wrapper, className)}>
        {readOnlyValues.map(item => (
          <Item
            key={`readonly-${item.key}`}
            value={item}
            readOnly
            {...itemProps}
          />
        ))}
        {arrayValues.map((item, index) => (
          <Item
            key={`array-${index}`}
            index={index}
            value={item || {}}
            onChange={this.handleItemChange}
            onDelete={this.handleItemDelete}
            {...itemProps}
          />
        ))}
        <div className="text-right">
          <Button
            className={styles.add}
            onClick={this.handleAdd}
            disabled={!this.isAddEnable()}
          >
            {addText}
          </Button>
        </div>
      </div>
    )
  }
}
