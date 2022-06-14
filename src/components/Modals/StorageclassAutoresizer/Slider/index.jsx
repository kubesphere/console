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
import { Slider } from '@kube-design/components'
import NumberInput from 'components/Inputs/NumberInput'

import styles from './index.scss'

export default class unitSlider extends React.Component {
  static propTypes = {
    size: PropTypes.number,
    max: PropTypes.number,
    min: PropTypes.number,
    unit: PropTypes.string,
    onChange: PropTypes.func,
  }

  static defaultProps = {
    size: 10,
    max: 2048,
    min: 0,
    unit: 'Gi',
    onChange: () => {},
  }

  constructor(props) {
    super(props)
    this.state = {
      size: props.size,
    }
  }

  handleSliderChange = value => {
    this.setState(
      {
        size: value,
      },
      () => {
        this.props.onChange(value)
      }
    )
  }

  inputChange = value => {
    this.setState(
      {
        size: value,
      },
      () => {
        this.props.onChange(value)
      }
    )
  }

  render() {
    const { max, min, unit, marks } = this.props
    const { size } = this.state
    return (
      <div className={styles.wrapper}>
        <Slider
          value={size}
          max={max}
          min={min}
          marks={marks}
          unit={unit}
          onChange={this.handleSliderChange}
        ></Slider>
        <div className={styles.inputBox}>
          <NumberInput
            className={styles.input}
            value={size}
            max={max}
            min={min}
            onChange={this.inputChange}
          ></NumberInput>
          <span className={styles.unit}>{unit}</span>
        </div>
      </div>
    )
  }
}
