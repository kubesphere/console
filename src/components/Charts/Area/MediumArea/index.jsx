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
import { get, last } from 'lodash'

import { COLORS_MAP } from 'utils/constants'

import { ResponsiveContainer, AreaChart, XAxis, Tooltip, Area } from 'recharts'
import CustomTooltip from 'components/Charts/Custom/Tooltip'

import styles from './index.scss'

const AreaColors = ['green', 'blue', 'yellow', 'red']

export default class MediumArea extends React.Component {
  static propTypes = {
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    xKey: PropTypes.string,
    unit: PropTypes.string,
    data: PropTypes.array,
    areaColors: PropTypes.array,
    renderTitle: PropTypes.func,
    renderArea: PropTypes.func,
  }

  static defaultProps = {
    width: 280,
    height: 100,
    title: 'Title',
    xKey: 'time',
    unit: '',
    areaColors: AreaColors,
    data: [],
  }

  get series() {
    const { xKey, data } = this.props
    return Object.keys(data[0] || {}).filter(key => key !== xKey)
  }

  get lastValue() {
    const { data } = this.props
    const key = get(this.series, [0], '')
    return last(data)?.[key] ?? 0
  }

  renderTitle() {
    const { title, unit, renderTitle } = this.props

    if (renderTitle) return renderTitle()

    return (
      <div className={styles.title}>
        <span>
          <strong>{this.lastValue}</strong> {t(unit)}
        </span>
        {this.lastValue !== 1 && !unit ? t(`${title}_PL`) : t(title)}
      </div>
    )
  }

  renderArea() {
    const { unit, areaColors, renderArea } = this.props

    if (renderArea) {
      return renderArea()
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
        />
      )
    })
  }

  render() {
    const { width, height, xKey, data } = this.props

    return (
      <div className={styles.chart} style={{ width, height }}>
        {this.renderTitle()}
        <ResponsiveContainer width="100%" height="100%" debounce={1}>
          <AreaChart
            data={data}
            margin={{ top: 45, left: 0, right: 0, bottom: 0 }}
          >
            <XAxis dataKey={xKey} hide />
            <Tooltip
              wrapperStyle={{ zIndex: 1000 }}
              cursor={{
                stroke: COLORS_MAP['dark'],
                strokeDasharray: '3,2',
                strokeWidth: 2,
              }}
              content={<CustomTooltip />}
            />
            {this.renderArea()}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    )
  }
}
