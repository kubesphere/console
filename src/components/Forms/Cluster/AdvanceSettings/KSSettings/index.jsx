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

import ParamInput from '../../ParamInput'

export default class KSSettings extends Component {
  constructor(props) {
    super(props)

    const params = props.components
      .filter(
        item =>
          item.parameters &&
          item.parameters.every(({ name }) => name !== 'enabled')
      )
      .reduce(
        (prev, cur) => [
          ...prev,
          ...cur.parameters.map(param => ({
            ...param,
            name: `${cur.name}.${param.name}`,
          })),
        ],
        []
      )

    const value = props.value.reduce((prev, cur) => {
      const [key, _value] = cur.split('=')
      return { ...prev, [key]: _value }
    }, {})

    this.state = { params, value }
  }

  handleInputChange = (newValue, name) => {
    const { onChange } = this.props

    this.setState(
      ({ value }) => {
        value[name] = newValue
        return { ...value }
      },
      () => {
        onChange(
          Object.entries(this.state.value).map(
            ([key, _value]) => `${key}=${_value}`
          )
        )
      }
    )
  }

  render() {
    const { params, value } = this.state
    return params.map(param => (
      <div key={param.name} className="form-item">
        <label className="form-label" htmlFor={name}>
          {param.title}
        </label>
        <div className="form-control">
          <ParamInput
            name={param.name}
            value={value[param.name]}
            param={param}
            onChange={this.handleInputChange}
          />
          <div className="form-desc">{param.description}</div>
        </div>
      </div>
    ))
  }
}
