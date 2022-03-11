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

import { PieChart } from 'components/Charts'
import { Radio } from '@kube-design/components'
import classnames from 'classnames'
import styles from './index.scss'

export default function ChartCard({ click, item }) {
  const [checked, setCheck] = useState(false)
  const { title, color, used, total, icon } = item

  const handleClick = () => {
    setCheck(!checked)
    click(item)
  }

  return (
    <div
      className={classnames(styles.content, {
        [styles['content--checked']]: checked,
      })}
      onClick={handleClick}
    >
      <div className={styles.chart}>
        <PieChart
          width={64}
          height={64}
          innerRadius="75%"
          outerRadius="120%"
          data={[
            {
              name: 'Used',
              itemStyle: {
                fill: color,
              },
              value: used,
            },
            {
              name: 'Left',
              itemStyle: {
                fill: '#EFF4F9',
              },
              value: total - used,
            },
          ]}
        />
        <img className={styles.innerIcon} src={icon} alt="" />
      </div>
      <div className={styles.info}>
        <p className={styles.label}>{t('HEALTH_STATUS')}</p>
        <Radio
          className={classnames(styles.radio, {
            [styles['radio--show']]: checked,
          })}
          checked={checked}
        />
        <p className={styles.type}>{title}</p>
        <p className={styles.number}>
          <span className={styles.master}>{used}</span>/<span>{total}</span>
        </p>
      </div>
    </div>
  )
}
