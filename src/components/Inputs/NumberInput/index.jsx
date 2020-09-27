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

import { isUndefined, isEmpty, trimEnd } from 'lodash'
import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import { Input } from '@kube-design/components'

import styles from './index.scss'

class NumberInput extends React.Component {
  static propTypes = {
    unit: PropTypes.string,
    showUnit: PropTypes.bool,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    min: PropTypes.number,
    max: PropTypes.number,
    integer: PropTypes.bool,
    onChange: PropTypes.func,
  }

  static defaultProps = {
    unit: '',
    showUnit: false,
    integer: false,
    onChange() {},
  }

  handleChange = e => {
    const { onChange, unit, min, max, integer } = this.props
    const { value } = e.target

    if (
      // pass empty
      isEmpty(value) ||
      // pass 1. but not 1.111.
      (!integer &&
        value.indexOf('.') > 0 &&
        `${this.props.value}`.indexOf('.') === -1) ||
      // pass '-' at first code
      (value === '-' && isEmpty(this.props.value))
    ) {
      onChange(value)
      return
    }

    let formatValue = Number(value)

    // invalid number
    if (isNaN(formatValue)) {
      return
    }

    // not smaller than min
    if (!isUndefined(min) && formatValue < min) {
      formatValue = min
    }

    // not bigger than max
    if (!isUndefined(max) && formatValue > max) {
      formatValue = max
    }

    if (
      !integer &&
      // format 01, 001 ...
      !(value.startsWith('0') && !value.startsWith('0.')) &&
      // enable input 0.0, 1.0
      formatValue === Number(value) &&
      `${formatValue}` !== value
    ) {
      formatValue = value
    }

    // add unit
    if (!isUndefined(formatValue) && unit) {
      formatValue = `${formatValue}${unit}`
    }

    onChange && onChange(formatValue)
  }

  render() {
    const {
      className,
      unit,
      showUnit,
      value,
      defaultValue,
      onChange,
      integer,
      ...rest
    } = this.props

    let formatValue = isUndefined(value) ? defaultValue : value

    if (unit) {
      formatValue = trimEnd(formatValue, unit)
    }

    const props = {
      type: 'text',
      ...rest,
      value: isUndefined(formatValue) ? '' : formatValue,
      onChange: this.handleChange,
    }

    if (unit && showUnit) {
      return (
        <div className={classnames(className, styles.withUnit)}>
          <Input {...props} />
          <span>{unit}</span>
        </div>
      )
    }

    return <Input className={className} {...props} />
  }
}

export default NumberInput
