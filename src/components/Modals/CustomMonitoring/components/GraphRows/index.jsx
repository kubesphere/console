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
import GraphMenu from '../GraphMenu'

import styles from './index.scss'

export default function GraphRows({ rows }) {
  return rows.map(row => (
    <div key={row.id}>
      {row.hideTitle || <h3 className={styles.rowTitle}>{row.title}</h3>}
      {row.panels.map(panel => (
        <GraphMenu key={panel.id} title={panel.title} metrics={panel.metrics} />
      ))}
    </div>
  ))
}
