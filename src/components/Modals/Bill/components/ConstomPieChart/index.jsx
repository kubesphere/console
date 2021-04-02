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

import React, { useState } from 'react'

import {
  PieChart,
  Pie,
  Cell,
  Legend,
  ResponsiveContainer,
  Sector,
} from 'recharts'

import { isEmpty } from 'lodash'
import { Text } from 'components/Base'

import { ICON_TYPES } from 'utils/constants'
import styles from './index.scss'
import { PIE_COLORS, RESOURCE_TITLE } from '../../constats'
import BillIcon from '../BillIcon'

const renderActiveShape = props => {
  const RADIAN = Math.PI / 180
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props
  const sin = Math.sin(-RADIAN * midAngle)
  const cos = Math.cos(-RADIAN * midAngle)
  const sx = cx + (outerRadius + 10) * cos
  const sy = cy + (outerRadius + 10) * sin
  const mx = cx + (outerRadius + 30) * cos
  const my = cy + (outerRadius + 30) * sin
  const ex = mx + (cos >= 0 ? 1 : -1) * 22
  const ey = my
  const textAnchor = cos >= 0 ? 'start' : 'end'

  return (
    <g>
      <text
        x={cx}
        y={cy}
        dy={8}
        textAnchor="middle"
        fill={fill}
        className="chart__center__text"
      >
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
      >{`${value} ${payload.unit}`}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
      >
        {`(${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  )
}

const Chart = ({ data, dataKey = 'value' }) => {
  const [activeIndex, setActiveIndex] = useState(0)

  const onPieEnter = (_, index) => {
    setActiveIndex(index)
  }

  const renderLegend = props => {
    const { payload } = props

    return (
      <div className={styles.resourceList}>
        <ul>
          {payload.map((entry, index) => {
            const { name, value, type, unit } = entry.payload
            return (
              <li key={`item-${index}`}>
                <i style={{ background: entry.color }}></i>
                <BillIcon icon={ICON_TYPES[type]} type={type} name={name} />
                <Text
                  className={styles.info}
                  title={`${name}`}
                  description={t(RESOURCE_TITLE[type])}
                />
                <span>{` ${value} ${unit}`}</span>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }

  if (isEmpty(data)) {
    return null
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart width={250} height={250}>
        <Legend vertical content={renderLegend} verticalAlign="top" />
        <Pie
          cx="70%"
          data={data}
          dataKey={dataKey}
          innerRadius="60%"
          outerRadius="75%"
          activeShape={renderActiveShape}
          activeIndex={activeIndex}
          onMouseEnter={onPieEnter}
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${entry.name}`}
              fill={PIE_COLORS[index % PIE_COLORS.length]}
              strokeWidth={1}
            />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  )
}
export default Chart
