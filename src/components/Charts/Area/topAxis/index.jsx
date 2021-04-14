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
import { timestampify } from 'utils/monitoring'
import moment from 'moment'
import { COLORS_MAP } from 'utils/constants'
import { maxBy } from 'lodash'
import {
  ResponsiveContainer,
  AreaChart,
  XAxis,
  Tooltip,
  Area,
  YAxis,
} from 'recharts'
import CustomTooltip from 'components/Charts/Custom/Tooltip'

import styles from './index.scss'

const AreaColors = ['green', 'blue', 'yellow', 'red']

export default class TopArea extends React.Component {
  static propTypes = {
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    xKey: PropTypes.string,
    unit: PropTypes.string,
    data: PropTypes.array,
    bgColor: PropTypes.string,
    areaColors: PropTypes.string,
    renderArea: PropTypes.func,
    darkMode: PropTypes.bool,
    dot: PropTypes.object,
  }

  static defaultProps = {
    width: 180,
    height: 56,
    title: 'Title',
    xKey: 'time',
    unit: '',
    bgColor: COLORS_MAP['lightest'],
    areaColors: AreaColors,
    data: [],
    darkMode: false,
  }

  get series() {
    const { xKey, data } = this.props
    return Object.keys(data[0] || {}).filter(key => key !== xKey)
  }

  xTickFormatter = time => {
    const map = {
      s: 'HH:mm:ss',
      m: 'HH:mm',
      h: 'HH:mm',
      d: 'MM/DD',
      M: 'YYYY/MM',
      Y: 'YYYY',
    }
    const [, unit = 's'] = this.props.interval.match(/\d+(\w+)/) || []
    const timestamp = parseInt(time, 10)
    return moment(timestamp).format(map[unit])
  }

  labelFormatter = timestamp => {
    const startTime = timestamp.label
    const endTime = startTime + timestampify(this.props.interval)
    const startMoment = moment(startTime)
    const endMoment = moment(endTime)
    const isSameDay = startMoment.isSame(endMoment, 'day')
    const dayFormat = 'YYYY/MM/DD'
    const timeFormat = 'HH:mm:ss'
    const momentForMat = `${dayFormat} ${timeFormat}`
    const startMomentString = startMoment.format(momentForMat)
    const endMomentString = endMoment.format(momentForMat)
    const range = isSameDay
      ? `${startMomentString} ~ ${endMoment.format(timeFormat)}`
      : `${startMomentString} ~ ${endMomentString}`

    return `${t('Time Range')} : ${range}`
  }

  renderArea() {
    let openDot = false
    const { unit, areaColors, renderArea, dot } = this.props
    const color = [].push(areaColors)
    if (renderArea) {
      return renderArea()
    }
    if (dot) {
      openDot = dot
    }
    return this.series.map(key => {
      return (
        <Area
          key={key}
          dataKey={key}
          stroke={color}
          fillOpacity="1"
          fill={areaColors}
          unit={unit}
          dot={openDot}
          type="monotone"
        />
      )
    })
  }

  render() {
    const { width, height, bgColor, xKey, data, darkMode } = this.props
    let maxNum = 500
    if (data.length > 0) {
      maxNum = maxBy(data, 'count')
    }
    const yAxisMax = maxNum.count * 2
    const domain = [0, yAxisMax]
    return (
      <div
        className={classNames(styles.chart, { [styles.dark]: darkMode })}
        style={{ width, height, background: bgColor }}
      >
        <ResponsiveContainer
          width="100%"
          height="100%"
          debounce={1}
          baseValue="dataMax"
        >
          <AreaChart
            data={data}
            margin={{ top: 0, left: 0, right: 0, bottom: 0 }}
          >
            <Tooltip
              wrapperStyle={{ zIndex: 1000 }}
              cursor={{
                stroke: COLORS_MAP['dark'],
                strokeDasharray: '3,2',
                strokeWidth: 2,
              }}
              content={<CustomTooltip renderLabel={this.labelFormatter} />}
            />
            {this.renderArea()}
            <XAxis
              dataKey={xKey}
              orientation="top"
              mirror={true}
              tickFormatter={this.xTickFormatter}
            />
            <YAxis hide type="number" domain={domain} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    )
  }
}
