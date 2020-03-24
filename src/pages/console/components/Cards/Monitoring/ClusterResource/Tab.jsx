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

import { getSuitableUnit, getValueByUnit } from 'utils/monitoring'

import { SimpleCircle } from 'components/Charts'

import styles from './index.scss'

const TabItem = ({ active, name, used, total, unit, unitType }) => {
  const nameText = t(name)
  const _unit = getSuitableUnit(total || used, unitType) || unit
  const _used = getValueByUnit(used, _unit)
  const _total = getValueByUnit(total, _unit)

  return (
    <div
      className={classnames(styles.tab, {
        [styles.active]: active,
      })}
    >
      <SimpleCircle
        width={40}
        height={40}
        title={nameText}
        value={parseFloat(_used)}
        total={parseFloat(_total)}
        unit={_unit}
        showCenter={false}
        showRate={true}
        active={active}
      />
      <div className={styles.info}>
        <div className={styles.title}>
          {nameText} {t(_unit)}
        </div>
        <p title={`${_used}/${_total}`}>
          {_used}
          <span>/{_total}</span>
        </p>
      </div>
    </div>
  )
}

export default TabItem
