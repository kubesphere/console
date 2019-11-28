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
import classnames from 'classnames'
import { get } from 'lodash'

import styles from './index.scss'

const CustomLegend = (props = {}) => {
  const { className, payload, activeSeries = [], showAll = false } = props
  const data = payload || []

  if (data.length < 2 && !showAll) return <div className={styles.legend} />

  const handleClick = e => {
    const { onClick } = props

    if (onClick) {
      const key = get(e.target, 'dataset.key')
      onClick(e, key)
    }
  }

  return (
    <div className={classnames(className, styles.legend)} onClick={handleClick}>
      {data.map(item => {
        const inactive = !activeSeries.includes(item.value)
        const color = get(item, 'payload.stroke')

        return (
          <div
            key={item.dataKey}
            data-key={item.dataKey}
            className={classnames(styles.item, {
              [styles.inactive]: inactive,
            })}
          >
            <i style={{ backgroundColor: color }} />
            {t(item.value)}
          </div>
        )
      })}
    </div>
  )
}

export default CustomLegend
