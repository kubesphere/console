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
import { get, isUndefined } from 'lodash'
import { Icon } from '@kube-design/components'
import { Bar } from 'components/Base'

import { cpuFormat, memoryFormat } from 'utils'
import { ICON_TYPES } from 'utils/constants'

import styles from './index.scss'

const RESERVED_KEYS = ['limits.cpu', 'limits.memory', 'pods']
const Unit = {
  Ti: 1024 ** 4,
  Gi: 1024 ** 3,
  Mi: 1024 ** 2,
  Ki: 1024,
  TB: 1000 ** 4,
  GB: 1000 ** 3,
  MB: 1000 ** 2,
  KB: 1000,
  T: 1000 ** 4,
  G: 1000 ** 3,
  M: 1000 ** 2,
  K: 1000,
  Bytes: 1,
  B: 1,
}

const QuotaItem = ({ name, total, used }) => {
  if (!total && !Number(used) && RESERVED_KEYS.indexOf(name) === -1) {
    return null
  }

  let ratio = 0
  let usedUnit = ''
  let totalUnit = ''

  const getNumberUnit = value => {
    const matchUnit = /[0-9]+([a-zA-Z]+)/
    const unitsMaps = Object.keys(Unit)
    let _unit = get(value.match(matchUnit), '1', '')

    unitsMaps.forEach(unit => {
      if (_unit.indexOf(unit) > -1) {
        _unit = unit
        return false
      }
    })
    return _unit
  }

  const getNumberValue = (unit, value) =>
    unit
      ? [
          unit,
          parseFloat(value) *
            (ICON_TYPES[name] || !Unit[unit] ? 1 : Unit[unit]),
        ]
      : ['', parseFloat(value)]

  const handleNumberValue = value => getNumberValue(getNumberUnit(value), value)

  const handleUsedValue = usedValue => {
    if (totalUnit && !usedUnit) {
      const unitValue =
        ICON_TYPES[name] || !Unit[totalUnit] ? 1 : Unit[totalUnit]
      return `${usedValue / unitValue}${usedValue > 0 ? totalUnit : ''}`
    }

    return usedValue
  }

  const transformName = (text = '') =>
    ICON_TYPES[labelName] ? t(text.replace(/[. ]/g, '_').toUpperCase()) : text

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
    const [_usedUnit, _used] = handleNumberValue(used)
    const [_totalUnit, _total] = handleNumberValue(total)

    usedUnit = _usedUnit
    totalUnit = _totalUnit

    ratio = _used / _total
  }

  ratio = Math.min(Math.max(ratio, 0), 1)
  const labelName = name.indexOf('gpu') > -1 ? 'gpu' : name
  const labelText = labelName === 'gpu' ? `${labelName}.limit` : labelName

  return (
    <div className={styles.quota}>
      <Icon name={ICON_TYPES[labelName] || 'resource'} size={40} />
      <div className={styles.item}>
        <div>{transformName(labelText)}</div>
        <p>{t('RESOURCE_TYPE_SCAP')}</p>
      </div>
      <div className={styles.item}>
        <div>{handleUsedValue(used)}</div>
        <p>{t('USED')}</p>
      </div>
      <div className={styles.item}>
        <div>{isUndefined(total) ? t('NO_LIMIT_TCAP') : total}</div>
        <p>{t('QUOTA')}</p>
      </div>
      <div className={styles.item} style={{ flex: 3 }}>
        <div>{t('USAGE')}</div>
        <Bar
          value={Math.min(ratio, 1)}
          className={styles.bar}
          rightText={!total ? t('NO_LIMIT') : ''}
          text={t('USED_PERCENT', {
            percent: Number((ratio * 100).toFixed(2)),
          })}
        />
      </div>
    </div>
  )
}

export default QuotaItem
