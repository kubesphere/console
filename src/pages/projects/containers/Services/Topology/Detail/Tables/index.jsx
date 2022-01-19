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

import React, { Component } from 'react'
import { get, isEmpty } from 'lodash'

import { Label } from 'components/Base'
import styles from './index.scss'

export default class Tables extends Component {
  render() {
    const tables = get(this.props.detail, 'tables', [])

    if (isEmpty(tables)) {
      return null
    }

    return tables.map(table => {
      return (
        <div key={table.id} className={styles.info}>
          {table.rows.map(item => (
            <Label
              key={item.id}
              name={item.entries.label}
              value={item.entries.value}
            />
          ))}
        </div>
      )
    })
  }
}
