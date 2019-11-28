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
import { get, isEmpty, isNaN } from 'lodash'

import { compareByCondition } from 'utils/alerting'

import styles from './index.scss'

const CustomToolTip = (props = {}) => {
  if (!props.active) return null

  const { renderLabel, payload, usageData, totalData, alert = {} } = props
  const data = payload || []
  const timeStr = props.label
  const unit = get(data, '[0].unit') || ''
  const unitText = unit === 'default' ? '' : unit === '%' ? '%' : ` ${t(unit)}`

  let labelContent = renderLabel ? renderLabel(props) : timeStr
  if (!isEmpty(alert)) {
    const { label, condition, value } = alert

    if (data.some(item => compareByCondition(item.value, value, condition))) {
      labelContent = (
        <div>
          <p>
            <img src="/assets/error.svg" />
            {`${t('Alert Occurred')} ${t(
              label
            )} ${condition} ${value}${unitText}`}
          </p>
          <p>{timeStr}</p>
        </div>
      )
    }
  }

  return (
    <div className={styles.tooltip}>
      <div className={styles.label}>{labelContent}</div>
      <div className={styles.list}>
        {data.map(item => {
          const { dataKey, name, value = 0 } = item

          if (isNaN(Number(value))) return null

          const color = get(item, 'stroke')

          let ratio = ''
          if (!isEmpty(usageData) && !isEmpty(totalData)) {
            const usage =
              get(usageData.find(_item => _item.time === timeStr), name) || 0
            const total =
              get(totalData.find(_item => _item.time === timeStr), name) || 0
            ratio = <span>{` (${usage}/${total})`}</span>
          }

          return (
            <div key={dataKey} className={styles.item}>
              <i style={{ background: color }} />
              <label>{t(name)}:</label>
              <p>
                {value}
                {unitText}
                {ratio}
              </p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default CustomToolTip
