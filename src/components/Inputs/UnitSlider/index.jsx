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
import { Slider } from '@kube-design/components'

export default class UnitSlider extends React.Component {
  handleChange = value => {
    const { onChange, unit } = this.props
    let newValue = Number(value.split(unit)[0]) > 2048 ? `2048${unit}` : value;
    if (unit && String(value).indexOf(unit) < 0) {
      newValue = `${value}${unit}`
    }
    onChange && onChange(newValue)
  }

  render() {
    const { onChange, ...rest } = this.props
    return <Slider onChange={this.handleChange} {...rest} />
  }
}
