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

import { Text } from 'components/Base'
import { PieChart } from 'components/Charts'

import { getSuitableUnit, getValueByUnit } from 'utils/monitoring'

import styles from './index.scss'

export default function ResourceItem(props) {
  const title = t(props.name)
  const unit = getSuitableUnit(props.total, props.unitType) || unit
  const used = getValueByUnit(props.used, unit)
  const total = getValueByUnit(props.total, unit) || used

  return (
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
      <Text
        title={`${Math.round((used * 100) / total)}%`}
        description={title}
      />
      <Text
        title={
          unit
            ? used !== 1 && unit === 'core'
              ? `${used} cores`
              : `${used} ${unit}`
            : used
        }
        description={t('USED')}
      />
      <Text
        title={
          unit
            ? total !== 1 && unit === 'core'
              ? `${total} cores`
              : `${total} ${unit}`
            : total
        }
        description={t('TOTAL')}
      />
    </div>
  )
}
