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
import { Input, Select } from '@kube-design/components'

import styles from './index.scss'

export default class TimeInput extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      value: props.value.slice(0, -1),
      unit: props.value.slice(-1),
    }
  }

  get options() {
    return [
      {
        label: t('SECONDS'),
        value: 's',
      },
      {
        label: t('MINUTES'),
        value: 'm',
      },
      {
        label: t('HOURS'),
        value: 'h',
      },
    ]
  }

  handleChangeValue = (e, value) => {
    const { onChange } = this.props
    const { unit } = this.state

    this.setState({ value })
    onChange(value ? `${value}${unit}` : value)
  }

  handleChangeUnit = unit => {
    const { onChange } = this.props
    const { value } = this.state

    this.setState({ unit })
    onChange(value ? `${value}${unit}` : value)
  }

  render() {
    const { value, unit } = this.state

    return (
      <div className={styles.timeInput}>
        <Input
          className={styles.input}
          value={value}
          onChange={this.handleChangeValue}
        />
        <Select
          className={styles.select}
          value={unit}
          options={this.options}
          onChange={this.handleChangeUnit}
        />
      </div>
    )
  }
}
