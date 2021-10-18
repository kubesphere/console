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
import { get } from 'lodash'
import { Icon, Tooltip } from '@kube-design/components'
import { PieChart } from 'components/Charts'
import { getSuitableValue } from 'utils/monitoring'

import styles from './index.scss'

export default class CircleChart extends React.Component {
  static propTypes = {
    title: PropTypes.string,
    unit: PropTypes.string,
    data: PropTypes.array,
    legendData: PropTypes.array,
    whiteMode: PropTypes.bool,
  }

  static defaultProps = {
    title: '',
    data: [],
    legendData: [],
    whiteMode: false,
  }

  getSeriesData = () => {
    const { data, legendData, whiteMode } = this.props

    const data0 = data[0]
      ? get(data[0], `[${data[0].length - 1}].[1]`, NaN)
      : NaN
    const data1 = data[1]
      ? get(data[1], `[${data[1].length - 1}].[1]`, NaN)
      : NaN

    return [
      {
        name: legendData[0],
        itemStyle: {
          fill: whiteMode ? '#ffffff' : '#329dce',
        },
        value: Number(data0),
      },
      {
        name: legendData[1],
        itemStyle: {
          fill: whiteMode ? '#6fbadc' : '#c7deef',
        },
        value: Number(data1),
      },
    ]
  }

  renderTip() {
    const { tip, whiteMode } = this.props

    return (
      <Tooltip content={tip}>
        <Icon
          name="information"
          className={styles.tip}
          type={whiteMode ? 'light' : 'dark'}
        />
      </Tooltip>
    )
  }

  render() {
    const { title, tip, data, unit } = this.props

    const data0 = data[0]
      ? get(data[0], `[${data[0].length - 1}].[1]`, NaN)
      : NaN
    const data1 = data[1]
      ? get(data[1], `[${data[1].length - 1}].[1]`, NaN)
      : NaN

    return (
      <div className={styles.chart}>
        <div className={styles.circle}>
          <PieChart width={40} height={40} data={this.getSeriesData()} />
        </div>
        <div className={styles.chartDetail}>
          <div className={styles.title}>
            {title} {tip && this.renderTip()}
          </div>
          <div>
            <span className={styles.tag}>
              {isNaN(data0)
                ? t('NO_DATA_SCAP')
                : `${getSuitableValue(data0, unit)} ${unit}`}
            </span>
            <span className={styles.tag}>
              {isNaN(data1)
                ? t('NO_DATA_SCAP')
                : `${getSuitableValue(data1, unit)} ${unit}`}
            </span>
          </div>
        </div>
      </div>
    )
  }
}
