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

import React, { Component } from 'react'
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from 'recharts'

import { Panel, Text } from 'components/Base'
import { PieChart } from 'components/Charts'

import styles from './index.scss'

const Item = ({ title, used, total, unit }) => (
  <div className={styles.item}>
    <div className={styles.pie}>
      <PieChart
        width={48}
        height={48}
        data={[
          {
            name: 'Used',
            itemStyle: {
              fill: '#329dce',
            },
            value: used,
          },
          {
            name: 'Left',
            itemStyle: {
              fill: '#c7deef',
            },
            value: total - used,
          },
        ]}
      />
    </div>
    <Text title={`${Math.round((used * 100) / total)}%`} description={title} />
    <Text title={unit ? `${used} ${unit}` : used} description={t('Used')} />
    <Text title={unit ? `${total} ${unit}` : used} description={t('Total')} />
  </div>
)

const data = [
  {
    subject: 'CPU',
    usage: 78,
  },
  {
    subject: 'Memory',
    usage: 74,
  },
  {
    subject: 'Pod',
    usage: 62,
  },
  {
    subject: 'Storage',
    usage: 80,
  },
]

export default class ResourcesUsage extends Component {
  shape = () => (
    <polygon
      stroke="#345681"
      fill="#1c2d4267"
      className="recharts-polygon"
      points="180,62.52799999999999 270.576,158 180,233.888 82.07999999999998,158"
    />
  )
  render() {
    return (
      <Panel title={t('Cluster Resources Usage')}>
        <div className={styles.wrapper}>
          <div className={styles.chart}>
            <RadarChart cx={180} cy={158} width={360} height={316} data={data}>
              <PolarGrid gridType="circle" />
              <PolarAngleAxis dataKey="subject" />
              <PolarRadiusAxis domain={[0, 100]} />
              <Radar
                dataKey="usage"
                stroke="#345681"
                fill="#1c2d4267"
                shape={this.shape}
              />
            </RadarChart>
          </div>
          <div className={styles.list}>
            <Item title={t('CPU Usage')} used={24.9} total={32} unit="%" />
            <Item
              title={t('Memory Usage')}
              used={94.72}
              total={128}
              unit="Gi"
            />
            <Item title={t('Pod Usage')} used={204} total={330} />
            <Item
              title={t('Local Storage')}
              used={337.33}
              total={421.67}
              unit="GB"
            />
          </div>
        </div>
      </Panel>
    )
  }
}
