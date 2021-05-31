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
import classNames from 'classnames'

import { Checkbox } from '@kube-design/components'
import { isEqual } from 'lodash'

export default class CheckboxGroup extends Component {
  static propTypes = {
    options: PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.shape({
          value: PropTypes.any,
          label: PropTypes.string,
          disabled: PropTypes.bool,
        }),
      ])
    ),
    value: PropTypes.array,
    onChange: PropTypes.func,
    direction: PropTypes.oneOf(['row', 'column']),
    className: PropTypes.string,
    disabled: PropTypes.bool,
    children: PropTypes.node,
  }

  static defaultProps = {
    direction: 'row',
    options: [],
    value: [],
    onChange() {},
  }

  state = {
    values: this.props.value || [],
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (!isEqual(nextProps.value, prevState.values)) {
      return {
        values: nextProps.value,
      }
    }
    return null
  }

  handleOptionChange = (checked, value) => {
    const { onChange } = this.props
    const { values } = this.state
    let newValues = []
    if (checked) {
      newValues = [...values, value]
    } else {
      newValues = values.filter(item => item !== value)
    }

    this.setState({ values: newValues }, () => onChange(newValues))
  }

  render() {
    const { className, name, direction, options, children } = this.props
    const { values } = this.state

    if (children && children.length > 0) {
      const childContent = React.Children.map(children, child =>
        React.cloneElement(child, {
          ...child.props,
          name,
          checked: values.includes(child.props.value),
          onChange: this.handleOptionChange,
        })
      )

      return (
        <div
          data-direction={direction}
          className={classNames(`checkbox-group`, className)}
        >
          {childContent}
        </div>
      )
    }

    return (
      <div
        data-direction={direction}
        className={classNames(`checkbox-group`, className)}
      >
        {options.map(option => (
          <Checkbox
            key={option.value}
            name={name}
            value={option.value}
            checked={values.includes(option.value)}
            onChange={this.handleOptionChange}
          >
            {option.label}
          </Checkbox>
        ))}
      </div>
    )
  }
}
