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

import { get, set, isUndefined, isObject } from 'lodash'
import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import styles from './index.scss'

export default class ObjectInput extends React.Component {
  static propTypes = {
    name: PropTypes.string,
    value: PropTypes.object,
    defaultValue: PropTypes.object,
    onChange: PropTypes.func,
    children: PropTypes.node.isRequired,
  }

  static defaultProps = {
    name: '',
    value: {},
    onChange() {},
  }

  handleChildChange = (name, childOnChange, childValue) => {
    const { onChange } = this.props
    let { value = {} } = this.props

    value = isObject(value) ? value : {}
    childValue = get(childValue, 'currentTarget.value', childValue)

    set(value, name, childValue)

    onChange({ ...value })

    if (childOnChange) {
      childOnChange(childValue)
    }
  }

  getValue = (name, childDefaultValue) => {
    const value = get(this.props.value, name)
    const defaultValue = get(this.props.defaultValue, name)

    if (!isUndefined(value)) {
      return value
    }

    if (!isUndefined(defaultValue)) {
      set(this.props.value, name, defaultValue)
      return defaultValue
    }

    set(this.props.value, name, childDefaultValue)

    return childDefaultValue
  }

  render() {
    const { className, value, children } = this.props

    const childNodes = React.Children.map(children, child =>
      React.cloneElement(child, {
        ...child.props,
        className: classNames(child.props.className, styles.item),
        value: isUndefined(value)
          ? child.props.value
          : this.getValue(child.props.name, child.props.defaultValue),
        onChange: this.handleChildChange.bind(
          this,
          child.props.name,
          child.props.onChange
        ),
      })
    )

    return (
      <div className={classNames(styles.wrapper, className)}>{childNodes}</div>
    )
  }
}
