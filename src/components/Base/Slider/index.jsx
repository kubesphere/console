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
import classNames from 'classnames'
import { isUndefined } from 'lodash'
import {
  Slider as BaseSlider,
  Field,
  Control,
  InputNumber,
} from '@pitrix/lego-ui'

import styles from './index.scss'

const handleStyle = {}

const railStyle = {
  height: 10,
  borderRadius: 5,
  backgroundColor: '#eff4f9',
}

const trackStyle = {
  height: 10,
  borderRadius: 5,
  backgroundColor: '#55bc8a',
  boxShadow: '0 8px 16px 0 rgba(85, 188, 138, 0.36)',
}

export default class Slider extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    defaultValue: PropTypes.string,
    min: PropTypes.number,
    max: PropTypes.number,
    step: PropTypes.number,
    marks: PropTypes.object,
    unit: PropTypes.string,
    onChange: PropTypes.func,
  }

  static defaultProps = {
    onChange() {},
    defaultValue: '',
  }

  handleChange = value => {
    const { unit, onChange } = this.props
    onChange(`${value}${unit}`)
  }

  get showSlider() {
    const { min, max } = this.props
    return !isUndefined(max) && !isUndefined(min)
  }

  render() {
    const {
      className,
      min,
      max,
      marks,
      value,
      defaultValue,
      step,
      unit,
    } = this.props

    const formatValue = value
      ? Number(value.slice(0, value.length - unit.length))
      : 0

    const formatDefaultValue =
      Number(defaultValue.slice(0, defaultValue.length - unit.length)) || 0

    return (
      <Field className={classNames(styles.field, className)}>
        {this.showSlider && (
          <Control className={styles.slider}>
            <BaseSlider
              value={formatValue}
              defaultValue={formatDefaultValue}
              max={max}
              min={min}
              marks={marks}
              step={step}
              handleStyle={handleStyle}
              railStyle={railStyle}
              trackStyle={trackStyle}
              onChange={this.handleChange}
            />
          </Control>
        )}
        <Control className={classNames({ [styles.withUnit]: unit })}>
          <InputNumber
            min={min}
            max={max}
            showButton={false}
            value={formatValue}
            defaultValue={formatDefaultValue}
            onChange={this.handleChange}
            className={styles.numberInput}
          />
          <span className={styles.unit}>{unit}</span>
        </Control>
      </Field>
    )
  }
}
