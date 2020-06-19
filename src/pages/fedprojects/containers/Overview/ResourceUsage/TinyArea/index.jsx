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

import { COLORS_MAP } from 'utils/constants'

import {
  ResponsiveContainer,
  CartesianGrid,
  AreaChart,
  XAxis,
  Tooltip,
  Area,
} from 'recharts'
import CustomTooltip from 'components/Charts/Custom/Tooltip'

const AreaColors = ['green', 'blue', 'yellow', 'red']

export default class TinyArea extends React.Component {
  static propTypes = {
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    xKey: PropTypes.string,
    unit: PropTypes.string,
    data: PropTypes.array,
    bgColor: PropTypes.string,
    areaColors: PropTypes.array,
  }

  static defaultProps = {
    width: 180,
    height: 56,
    xKey: 'time',
    unit: '',
    bgColor: COLORS_MAP['lightest'],
    areaColors: AreaColors,
    data: [],
  }

  get series() {
    const { xKey, data } = this.props
    return Object.keys(data[0] || {}).filter(key => key !== xKey)
  }

  getVeticalPoints() {
    const { width } = this.props
    const offset = 5
    const start = offset
    const step = (width - offset * 2) / 10
    return Array(10)
      .fill('')
      .map((item, index) => start + step * index)
  }

  renderArea() {
    const { unit, areaColors } = this.props
    const dot = {
      stroke: '#55bc8a',
      strokeWidth: 1,
      fill: '#fff',
      fillOpacity: 1,
    }

    return this.series.map((key, index) => {
      const color = COLORS_MAP[areaColors[index]]

      return (
        <Area
          key={key}
          dataKey={key}
          stroke={color}
          fillOpacity="0.1"
          fill={color}
          unit={unit}
          dot={dot}
        />
      )
    })
  }

  render() {
    const { width, height, xKey, data } = this.props

    return (
      <ResponsiveContainer width={width} height={height} debounce={1}>
        <AreaChart data={data}>
          <XAxis dataKey={xKey} hide />
          <Tooltip
            wrapperStyle={{ zIndex: 1000 }}
            content={<CustomTooltip />}
          />
          <CartesianGrid
            strokeDasharray="3 6"
            horizontal={false}
            verticalPoints={this.getVeticalPoints()}
          />
          {this.renderArea()}
        </AreaChart>
      </ResponsiveContainer>
    )
  }
}
