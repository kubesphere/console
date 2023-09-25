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
import { cloneDeep, get } from "lodash"
export default class UnitSlider extends React.Component {
  innerRef = React.createRef();
  handleChange = value => {
    const { onChange, unit } = this.props
    let newValue = value
    if (unit && String(value).indexOf(unit) < 0) {
      newValue = `${value}${unit}`
    }
    onChange && onChange(newValue)
  }

  render() {
    const { onChange, ...rest } = this.props
    if (get(this.innerRef, 'current') && get(this.innerRef, 'current.value')) {
      let result = cloneDeep(this.innerRef);
      result.current.value = Number(this.innerRef.current.value) > 0 ? Number(this.innerRef.current.value) : this.innerRef.current.value;
      this.innerRef = result;
    };
    return <Slider onChange={this.handleChange} {...rest} innerRef={this.innerRef} />
  }
}
