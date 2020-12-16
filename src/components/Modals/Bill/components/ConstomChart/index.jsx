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
import { isEmpty } from 'lodash'
import React from 'react'
import { Treemap } from 'recharts'

const COLORS = [
  '#a2d8bb',
  '#55bc8a',
  '#479e88',
  '#3b747a',
  '#c7deef',
  '#7eb8dc',
  '#329dce',
  '#3385b0',
  '#326e93',
  '#fae7e5',
  '#ea8573',
  '#ca2621',
  '#ab2f29',
  '#8c3231',
  '#ffe1be',
  '#ffc781',
  '#f5a623',
  '#e0992c',
  '#8d663e',
]
const CustomChartComponent = ({ data }) => {
  if (isEmpty(data)) {
    return null
  }
  return (
    <Treemap
      width={600}
      height={330}
      data={data}
      dataKey="size"
      ratio={4 / 3}
      stroke="#fff"
      fill="#8884d8"
      content={<CustomizedContent colors={COLORS} />}
    />
  )
}

class CustomizedContent extends React.PureComponent {
  render() {
    const { root, depth, x, y, width, height, index, colors, name } = this.props

    return (
      <g>
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          style={{
            fill:
              depth < 2
                ? colors[Math.floor((index / root.children.length) * 6)]
                : 'none',
            stroke: '#fff',
            strokeWidth: 2 / (depth + 1e-10),
            strokeOpacity: 1 / (depth + 1e-10),
          }}
        />
        {depth === 1 ? (
          <text
            x={x + width / 2}
            y={y + height / 2 + 7}
            textAnchor="middle"
            fill="#fff"
            fontSize={14}
          >
            {name}
          </text>
        ) : null}
        {depth === 1 ? (
          <text
            x={x + 4}
            y={y + 18}
            fill="#fff"
            fontSize={16}
            fillOpacity={0.9}
          >
            {index + 1}
          </text>
        ) : null}
      </g>
    )
  }
}

export default CustomChartComponent
