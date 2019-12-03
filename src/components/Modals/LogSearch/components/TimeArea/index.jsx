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

import React, { PureComponent } from 'react'
import { get } from 'lodash'
import classnames from 'classnames'
import { ResponsiveContainer, AreaChart, Area, XAxis, Tooltip } from 'recharts'
import PropTypes from 'prop-types'
import moment from 'moment-mini'

import styles from './index.scss'

const TIME_FORMAT_MAP = {
  [60 * 1000]: 'HH:mm:ss',
  [60 * 60 * 1000]: 'HH:mm',
  [2 * 24 * 60 * 60 * 1000]: 'ddd HH:mm',
  [30 * 24 * 60 * 60 * 1000]: 'MM/DD',
  Infinity: 'YYYY/MM/DD',
}

export default class TimeArea extends PureComponent {
  static propTypes = {
    theme: PropTypes.oneOf(['dark']),
    xAxisDataKey: PropTypes.string.isRequired,
    data: PropTypes.array,

    maxTickCount: PropTypes.number.isRequired,
    minTickGap: PropTypes.number.isRequired,
    tickLabelGap: PropTypes.number,
    perDataTimeInterval: PropTypes.number.isRequired,
  }

  static defaultProps = {
    theme: 'dark',
    xAxisDataKey: 'time',
    tickLabelGap: 5,
    tickLabelIndent: 1,
    AreaChartProps: {
      margin: {
        left: 0,
        right: 0,
      },
    },
    maxTickCount: 60,
    minTickGap: 30,
  }

  ref = React.createRef()

  /**
   * readyForAxisRending {boolean} - componentDidUpdate
   */
  state = {
    readyForAxisRending: false,
  }

  /**
   * @todo
   */
  getXAxisTickFormatter() {
    const { perDataTimeInterval, tickLabelGap } = this.props

    const interval = this.getInterval()
    const nextTickDistance = perDataTimeInterval * (1 + interval) * tickLabelGap

    let tickFormat = 'YYYY/MM/DD HH:mm:ss'
    for (const [minValue, format] of Object.entries(TIME_FORMAT_MAP)) {
      if (nextTickDistance <= Number(minValue)) {
        tickFormat = format
        break
      }
    }

    return tickFormat
  }

  componentDidMount() {
    // xAxis interval props depend on svg width
    this.setState({ readyForAxisRending: true })
  }

  xAxisTickFormatterCreate = () => {
    const xAxisTickFormatter = this.getXAxisTickFormatter()
    return timestamp => moment(timestamp).format(xAxisTickFormatter)
  }

  getInterval() {
    const { minTickGap, maxTickCount, data } = this.props
    const clientWidth = get(this.ref, 'current.container.clientWidth', 0)

    const screenMaxTickCount = clientWidth
      ? clientWidth / minTickGap
      : maxTickCount

    const tickCount = Math.min(screenMaxTickCount, maxTickCount)
    return Math.max(Math.ceil(data.length / tickCount) - 1, 0)
  }

  gapy(fun) {
    const { tickLabelGap, tickLabelIndent } = this.props
    let counter = tickLabelGap - tickLabelIndent
    return (...args) => {
      if (counter++ >= tickLabelGap) {
        counter = 0
        return fun(...args)
      }
      return ''
    }
  }

  tooltipTimeFormatter(timestamp) {
    return `${t('Time')} : ${moment(timestamp).format('YYYY/MM/DD HH:mm:ss')}`
  }

  render() {
    const { AreaChartProps, data, className, theme } = this.props
    const { readyForAxisRending } = this.state

    return (
      <div className={classnames(styles.wrapper, styles[theme], className)}>
        <ResponsiveContainer>
          <AreaChart ref={this.ref} data={data} {...AreaChartProps}>
            {this.renderAreas()}
            <Tooltip labelFormatter={this.tooltipTimeFormatter} />
            {readyForAxisRending && this.renderXAxis()}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    )
  }

  renderAreas() {
    const { areaDataConfigs } = this.props

    return areaDataConfigs.map(([dataKey, name]) => (
      <Area dataKey={dataKey} name={name} key={dataKey} />
    ))
  }

  renderXAxis() {
    const { xAxisDataKey } = this.props
    const interval = this.getInterval()
    const tickFormatter = this.xAxisTickFormatterCreate()
    const gapyTickFormatter = this.gapy(tickFormatter)

    return (
      <XAxis
        mirror
        orientation={'top'}
        tickSize={10}
        dataKey={xAxisDataKey}
        interval={interval}
        tickFormatter={gapyTickFormatter}
      />
    )
  }
}
