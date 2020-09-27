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

import { Icon } from '@kube-design/components'

import PieChart from 'components/Charts/Pie/PieChart'

import styles from './index.scss'

export default class Chart extends React.Component {
  render() {
    const { metrics = [], icon, unit } = this.props
    const podRequests =
      metrics.find(metric => metric.name === 'podRequests') || {}
    const used = metrics.find(metric => metric.name === 'used') || {}
    return (
      <div className={styles.chart}>
        <Icon name={icon} size={32} />
        <div className={styles.chartWrapper}>
          <PieChart width={92} height={92} data={metrics} />
        </div>
        <div className={styles.text}>
          <div>
            <span>
              {used.value} {unit}
            </span>
            <span className={styles.podRequests}>+ {podRequests.value}</span>
          </div>
          <p>{t('节点已用请求')}</p>
        </div>
      </div>
    )
  }
}
