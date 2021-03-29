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
import { get, isNaN } from 'lodash'

import styles from './index.scss'

const CustomToolTip = (props = {}) => {
  if (!props.active) return null
  const data = props.payload || []

  return (
    <div className={styles.tooltip}>
      <div className={styles.list}>
        {data.map(item => {
          const { dataKey, name, value = 0, payload } = item

          if (isNaN(Number(value))) return null

          const color = get(item, 'payload.fill')

          return (
            <div key={dataKey} className={styles.item}>
              <i style={{ background: color }} />
              <label>{t(name)}:</label>
              <p>
                {value}({payload.unit})
              </p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default CustomToolTip
