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

import { getLocalTime } from 'utils'
import { getAreaChartOps } from 'utils/monitoring'

import SimpleArea from '../SimpleArea'

import styles from './index.scss'

export default class PhysicalResourceItem extends React.Component {
  render() {
    const { type, title, metrics, showDay } = this.props
    const config = getAreaChartOps({
      title,
      unitType: type,
      legend: ['COUNT'],
      data: metrics,
      xFormatter: value =>
        getLocalTime(Number(value) * 1000).format(
          showDay ? 'MM-DD HH:mm' : 'HH:mm'
        ),
    })

    return (
      <div className={styles.wrapper}>
        <div className={styles.chartWrapper}>
          <div className={styles.title}>{title}</div>
          <div className={styles.chart}>
            <SimpleArea
              width="100%"
              height={120}
              bgColor="transparent"
              {...config}
            />
          </div>
        </div>
      </div>
    )
  }
}
