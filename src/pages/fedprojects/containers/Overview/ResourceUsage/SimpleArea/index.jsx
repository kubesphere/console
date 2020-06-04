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
  YAxis,
  Tooltip,
  Area,
} from 'recharts'
import CustomTooltip from 'components/Charts/Custom/Tooltip'

const AreaColors = ['green', 'blue', 'yellow', 'red']

class CustomizedAxisTick extends React.PureComponent {
  render() {
    const { x, y, payload } = this.props
    const textAnchor = 'middle'

    return (
      <g transform={`translate(${x},${y})`}>
        <text x={0} y={0} dy={12} fill="#79879c" textAnchor={textAnchor}>
          {payload.value}
        </text>
      </g>
    )
  }
}

export default class SimpleArea extends React.Component {
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

  getHorizontalPoints() {
    const { height } = this.props
    const offset = 30
    const start = offset
    const step = (height - offset - 6) / 4
    return Array(4)
      .fill('')
      .map((item, index) => start + step * index)
  }

  renderArea() {
    const { unit, areaColors } = this.props

    return this.series.map((key, index) => {
      const color = COLORS_MAP[areaColors[index]]

      return (
        <Area
          key={key}
          dataKey={key}
          stroke={color}
          fillOpacity="1"
          fill="url(#colorPv)"
          unit={unit}
        />
      )
    })
  }

  render() {
    const { width, height, xKey, data } = this.props

    return (
      <ResponsiveContainer width={width} height={height} debounce={1}>
        <AreaChart
          data={data}
          margin={{ top: 32, left: 16, right: 16, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#55bc8a" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#55bc8a" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid
            vertical={false}
            stroke={'#36435c'}
            strokeDasharray="2 2"
            horizontalPoints={this.getHorizontalPoints()}
          />
          <XAxis
            dataKey={xKey}
            axisLine={false}
            tickLine={false}
            height={30}
            interval="preserveStart"
            tick={<CustomizedAxisTick />}
            minTickGap={20}
          />
          <YAxis
            hide
            type="number"
            domain={[
              dataMin => 0 - Math.abs(dataMin),
              dataMax => dataMax * 1.6,
            ]}
          />
          <Tooltip
            wrapperStyle={{ zIndex: 1000 }}
            content={<CustomTooltip />}
          />
          {this.renderArea()}
        </AreaChart>
      </ResponsiveContainer>
    )
  }
}
