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

import { ReactComponent as BarIcon } from 'src/assets/bar-chart.svg'
import { ReactComponent as TextIcon } from 'src/assets/single-stat-logo.svg'
import { ReactComponent as LineIcon } from 'src/assets/line-chart.svg'
import { ReactComponent as TableIcon } from 'src/assets/table-chart.svg'

import styles from './index.scss'

export default function GraphType({ type }) {
  const map = {
    singlestat: {
      i18n: t('SINGLE_STATE_CHART'),
      Icon: TextIcon,
    },
    line: {
      i18n: t('LINE_CHART'),
      Icon: LineIcon,
    },
    bar: {
      i18n: t('BAR_CHART'),
      Icon: BarIcon,
    },
    table: {
      i18n: t('TABLE'),
      Icon: TableIcon,
    },
  }
  const Icon = map[type].Icon
  const title = map[type].i18n
  return (
    <div className={classnames(styles.wrapper, styles[type])}>
      <header>{t('GRAPH_TYPES')}</header>
      <div>
        <Icon className={styles.icon} />
        <h3>{title}</h3>
      </div>
    </div>
  )
}
