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
import { Select, Input } from '@kube-design/components'
import { SCHEME_OPTIONS, SCHEME_REG } from 'utils/constants'
import styles from './index.scss'

export default class SchemeInput extends React.Component {
  static defaultProps = {
    className: '',
    value: '',
    onChange: () => {},
  }

  get inputValue() {
    const { value } = this.props
    const [, , , inputValue = ''] = value.match(SCHEME_REG) || []
    return inputValue
  }

  get schemeValue() {
    const { value } = this.props
    const [, schemeValue = 'https://'] = value.match(SCHEME_REG) || []
    return schemeValue
  }

  handleInputChange = (e, value) => {
    value = value.toLowerCase()
    const [, schemeValue = this.schemeValue, , inputValue = ''] =
      value.match(SCHEME_REG) || []
    this.props.onChange(`${schemeValue}${inputValue}`)
  }

  handleSchemeChange = value => {
    this.props.onChange(`${value}${this.inputValue}`)
  }

  render() {
    return (
      <div className={styles.container}>
        <Select
          value={this.schemeValue}
          className={styles.select}
          options={SCHEME_OPTIONS}
          onChange={this.handleSchemeChange}
        />
        <Input
          className={styles.input}
          onChange={this.handleInputChange}
          value={this.inputValue}
          autoComplete="off"
        />
      </div>
    )
  }
}
