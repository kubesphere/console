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
import { isUndefined } from 'lodash'
import { Icon } from '@kube-design/components'
import { Bar } from 'components/Base'

import { cpuFormat, memoryFormat } from 'utils'
import { ICON_TYPES } from 'utils/constants'

import styles from './index.scss'

const QuotaItem = ({ name, total, used }) => {
  let ratio = 0

  if (name === 'limits.cpu' || name === 'requests.cpu') {
    if (total) {
      ratio = Number(cpuFormat(used)) / Number(cpuFormat(total))
      used = `${cpuFormat(used)} Core`
      total = `${cpuFormat(total)} Core`
    }
  } else if (name === 'limits.memory' || name === 'requests.memory') {
    if (total) {
      ratio = Number(memoryFormat(used)) / Number(memoryFormat(total))
      used = `${memoryFormat(used, 'Gi')} Gi`
      total = `${memoryFormat(total, 'Gi')} Gi`
    }
  } else if (total) {
    ratio = Number(used) / Number(total)
  }

  ratio = Math.min(Math.max(ratio, 0), 1)

  return (
    <div className={styles.quota}>
      <Icon name={ICON_TYPES[name]} size={40} />
      <div className={styles.item}>
        <div>{t(name)}</div>
        <p>{t('Resource Type')}</p>
      </div>
      <div className={styles.item}>
        <div>{used}</div>
        <p>{t('Used')}</p>
      </div>
      <div className={styles.item}>
        <div>{isUndefined(total) ? t('No Limit') : total}</div>
        <p>{t('Resource Limit')}</p>
      </div>
      <div className={styles.item} style={{ flex: 3 }}>
        <div>{t('Usage')}</div>
        <Bar
          value={Math.min(ratio, 1)}
          className={styles.bar}
          rightText={!total ? t('No Limit') : ''}
          text={`${t('Used')} ${Number((ratio * 100).toFixed(2))}%`}
        />
      </div>
    </div>
  )
}

export default QuotaItem
