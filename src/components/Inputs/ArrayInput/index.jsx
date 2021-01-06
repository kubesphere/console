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

import { get, isEmpty, isUndefined } from 'lodash'
import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import { Button } from '@kube-design/components'
import Item from './Item'

import styles from './index.scss'

export default class ArrayInput extends React.Component {
  static propTypes = {
    name: PropTypes.string,
    value: PropTypes.array,
    onChange: PropTypes.func,
    addText: PropTypes.string,
    itemType: PropTypes.oneOf(['string', 'object']),
    children: PropTypes.node.isRequired,
    checkItemValid: PropTypes.func,
  }

  static defaultProps = {
    name: '',
    value: [''],
    onChange() {},
    addText: 'Add',
    itemType: 'string',
  }

  getDefaultValue() {
    const { itemType } = this.props

    if (itemType === 'object') {
      return {}
    }

    return ''
  }

  isAddEnable() {
    const { value, checkItemValid } = this.props

    if (checkItemValid) {
      return value.every(checkItemValid)
    }

    return value.every(
      item => !isEmpty(item) && Object.values(item).every(_value => _value)
    )
  }

  handleAdd = () => {
    const { value, onChange } = this.props

    onChange([...value, this.getDefaultValue()])
  }

  handleChange = (index, childValue) => {
    const { value, onChange } = this.props
    const itemValue = get(childValue, 'currentTarget.value', childValue)

    let newValues = []

    if (isUndefined(value[index])) {
      value[index] = itemValue
      newValues = [...value]
    } else {
      newValues = value.map((item, _index) =>
        _index === index ? itemValue : item
      )
    }

    onChange(newValues)
  }

  handleDelete = index => {
    const { value, onChange } = this.props

    onChange(value.filter((_, _index) => _index !== index))
  }

  renderItems() {
    const { value, children } = this.props

    return value.map((item, index) => (
      <Item
        key={index}
        index={index}
        value={item || this.getDefaultValue()}
        arrayValue={value}
        component={children}
        onChange={this.handleChange.bind(this, index)}
        onDelete={this.handleDelete.bind(this, index)}
      />
    ))
  }

  render() {
    const { className, addText, extraAdd, desc } = this.props

    return (
      <div className={classnames(styles.wrapper, className)}>
        {this.renderItems()}
        <p
          className={styles.desc}
          dangerouslySetInnerHTML={{
            __html: desc,
          }}
        />
        <div className="text-right">
          <Button
            className={styles.add}
            onClick={this.handleAdd}
            disabled={!this.isAddEnable()}
          >
            {addText}
          </Button>
          {extraAdd}
        </div>
      </div>
    )
  }
}
