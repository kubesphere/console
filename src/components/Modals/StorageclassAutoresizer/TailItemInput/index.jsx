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
import { trim } from 'lodash'
import { Select } from '@kube-design/components'
import NumberInput from 'components/Inputs/NumberInput'

import styles from './index.scss'

export default class TailItemInput extends React.Component {
  static propTypes = {
    onChange: PropTypes.func,
    options: PropTypes.array,
    value: PropTypes.string,
    min: PropTypes.number,
    max: PropTypes.number,
    unit: PropTypes.string,
    title: PropTypes.string,
  }

  static defaultProps = {
    options: [],
    value: '',
    min: 0,
    title: '',
    unit: '',
    onChange: () => {},
  }

  constructor(props) {
    super(props)
    this.state = {
      unit: props.unit,
      value: props.value,
    }
  }

  handleSelectChange = val => {
    const { unit } = this.state
    this.props.onChange(`${trim(val)}${unit}`)
  }

  handleInput = val => {
    const { unit } = this.state
    this.props.onChange(`${trim(val)}${unit}`)
  }

  renderTail = () => {
    const { options } = this.props
    const { unit } = this.state
    if (options.length > 1) {
      return (
        <Select
          className={styles.tailSelect}
          options={options}
          value={unit}
          defaultValue={unit}
          onChange={this.handleSelectChange}
        ></Select>
      )
    }
    return <span className={styles.unit}>{unit}</span>
  }

  render() {
    const { title, min, max, value } = this.props
    return (
      <>
        {title !== '' && <div className={styles.title}>{title}</div>}
        <div className={styles.wrapper}>
          <NumberInput
            className={styles.input}
            min={min}
            value={value}
            max={max}
            onChange={this.handleInput}
          ></NumberInput>
          {this.renderTail()}
        </div>
      </>
    )
  }
}
