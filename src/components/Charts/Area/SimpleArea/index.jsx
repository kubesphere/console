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
import classnames from 'classnames'
import { isEqual, isEmpty, remove } from 'lodash'

import { COLORS_MAP } from 'utils/constants'

import {
  ResponsiveContainer,
  AreaChart,
  CartesianGrid,
  Legend,
  XAxis,
  YAxis,
  Tooltip,
  Area,
  Dot,
  ReferenceLine,
} from 'recharts'
import CustomLegend from 'components/Charts/Custom/Legend'
import CustomTooltip from 'components/Charts/Custom/Tooltip'
import { getActiveSeries } from 'components/Charts/utils'

import styles from './index.scss'

const AreaColors = [
  'green',
  'blue',
  'yellow',
  'red',
  'darkestGreen',
  'darkestBlue',
  'darkestYellow',
  'darkestRed',
  'lightestGreen',
  'lightestBlue',
  'lightestYellow',
  'lightestRed',
]

export default class SimpleArea extends React.Component {
  static propTypes = {
    theme: PropTypes.oneOf(['light', 'dark']),
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    xKey: PropTypes.string,
    unit: PropTypes.string,
    data: PropTypes.array,
    bgColor: PropTypes.string,
    areaColors: PropTypes.array,
    renderTitle: PropTypes.func,
    renderTooltip: PropTypes.func,
    renderArea: PropTypes.func,
    alert: PropTypes.object,
    xAxisTickFormatter: PropTypes.func,
  }

  static defaultProps = {
    theme: 'light',
    width: '100%',
    height: 200,
    title: 'Title',
    xKey: 'time',
    unit: '',
    bgColor: COLORS_MAP['lightest'],
    areaColors: AreaColors,
    data: [],
    alert: {},
    xAxisTickFormatter(value) {
      return value
    },
  }

  constructor(props) {
    super(props)

    const series = getActiveSeries(props)
    this.state = {
      series,
      activeSeries: series,
    }
  }

  static getDerivedStateFromProps(props, state) {
    const series = getActiveSeries(props)
    if (!isEqual(series, state.series)) {
      return {
        series,
        activeSeries: series,
      }
    }
    return null
  }

  handleLegendClick = (e, key) => {
    const activeSeries = [...this.state.activeSeries]

    if (activeSeries.includes(key)) {
      remove(activeSeries, item => item === key)
    } else {
      activeSeries.push(key)
    }

    this.setState({ activeSeries })
  }

  renderTitle() {
    const { title, unit, renderTitle } = this.props

    const text = renderTitle
      ? renderTitle()
      : isEmpty(unit)
      ? t(title)
      : `${t(title)} (${t(unit)})`
    return <div className={styles.title}>{text}</div>
  }

  renderCustomTooltip() {
    const { renderTooltip, alert } = this.props

    if (renderTooltip) {
      return renderTooltip()
    }

    return <CustomTooltip alert={alert} />
  }

  renderLegend() {
    return (
      <Legend
        wrapperStyle={{
          top: 0,
          left: 'auto',
          right: 0,
          width: '80%',
          zIndex: 100,
        }}
        content={
          <CustomLegend
            activeSeries={this.state.activeSeries}
            onClick={this.handleLegendClick}
          />
        }
      />
    )
  }

  renderArea() {
    const { unit, areaColors, renderArea } = this.props
    const { series, activeSeries } = this.state

    if (renderArea) {
      return renderArea()
    }

    return series.map((key, index) => {
      const colorName = areaColors[index]
      const color = COLORS_MAP[colorName] || colorName

      let fillProps = {}
      if (COLORS_MAP[colorName]) {
        fillProps = {
          fill: `url(#${colorName}-area)`,
        }
      } else {
        fillProps = {
          fill: colorName,
          fillOpacity: 0.2,
        }
      }

      return (
        <Area
          key={key}
          dataKey={key}
          stroke={color}
          activeDot={
            <Dot
              r={4}
              stroke="#fff"
              strokeWidth={1}
              fill={color}
              fillOpacity={1}
            />
          }
          unit={unit}
          hide={!activeSeries.includes(key)}
          {...fillProps}
        />
      )
    })
  }

  render() {
    const {
      theme,
      xAxisTickFormatter,
      width,
      height,
      bgColor,
      xKey,
      data,
      alert,
    } = this.props
    const classNames = classnames(styles.chart, 'chart', `chart-${theme}`)

    return (
      <div
        className={classNames}
        style={{ width, height, background: bgColor }}
      >
        {this.renderTitle()}
        <ResponsiveContainer debounce={1}>
          <AreaChart
            data={data}
            margin={{ top: 50, bottom: -20, left: 0, right: 25 }}
          >
            <CartesianGrid
              stroke="#d8dee5"
              strokeDasharray="2 3"
              vertical={false}
            />
            <XAxis
              dataKey={xKey}
              axisLine={false}
              tickLine={false}
              tickFormatter={xAxisTickFormatter}
            />
            <YAxis
              width={45}
              axisLine={false}
              tickLine={false}
              tickFormatter={value => {
                if (value <= 0) return ''
                if (value > 100000) return `${Math.round(value / 1000)}k`
                return value
              }}
            />
            <Tooltip
              wrapperStyle={{ zIndex: 101 }}
              cursor={{
                stroke: COLORS_MAP[theme === 'dark' ? 'lightest' : 'dark'],
                strokeDasharray: '3,2',
                strokeWidth: 2,
              }}
              content={this.renderCustomTooltip()}
            />
            {this.renderLegend()}
            {this.renderArea()}
            {!isEmpty(alert) && (
              <ReferenceLine
                y={alert.value}
                label={`${alert.value}${this.props.unit}`}
                stroke={COLORS_MAP['red']}
                strokeDasharray="3,2"
                isFront
              />
            )}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    )
  }
}
