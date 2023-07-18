import React, { Component } from 'react'
import { Input, Select } from '@kube-design/components'
import { isEmpty, isUndefined, trimEnd } from 'lodash'
import classnames from 'classnames'
import styles from './index.scss'

export default class UnitInput extends Component {
  state = {
    unit: this.unit,
  }

  get unit() {
    const { value, unitOptions, defaultValue } = this.props
    let propsUnit = defaultValue || unitOptions[0].value

    unitOptions.forEach(option => {
      if (value?.endsWith(option.value)) {
        propsUnit = option.value
      }
    })

    return propsUnit
  }

  get value() {
    const { value } = this.props
    return trimEnd(value, this.unit)
  }

  handleChange = e => {
    const { onChange } = this.props
    const value = e.target.value
    onChange(
      isUndefined(value) || isEmpty(value) ? '' : `${value}${this.state.unit}`
    )
  }

  handleUnitChange = unit => {
    const { onChange } = this.props
    this.setState(
      {
        unit,
      },
      () => {
        onChange(
          isUndefined(this.value) || isEmpty(this.value)
            ? ''
            : `${this.value}${unit}`
        )
      }
    )
  }

  render() {
    const { name, unitOptions, inputClassName, className } = this.props

    return (
      <div className={classnames(styles.box, className)}>
        <div className={classnames(styles.value, inputClassName)}>
          <Input name={name} onChange={this.handleChange} value={this.value} />
        </div>
        <div className={styles.unit}>
          <Select
            value={this.state.unit}
            onChange={this.handleUnitChange}
            options={unitOptions}
          />
        </div>
      </div>
    )
  }
}
