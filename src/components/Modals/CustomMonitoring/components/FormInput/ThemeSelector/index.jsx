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

import { isEqual, isArray } from 'lodash'

import styles from './index.scss'

export default function ThemeSelector({ options, value, onChange }) {
  return (
    <div className={styles.wrapper}>
      {options.map((option, index) => (
        <div
          className={classnames({
            [styles.select]: isEqual(option.value.join(','), value.join(',')),
          })}
          key={isArray(option.value) ? option.value.join(',') : index}
          onClick={() => {
            onChange(option.value)
          }}
        >
          <h3>{option.label}</h3>
          <div className={styles.colors}>
            {option.value.map(color => (
              <div key={color} style={{ backgroundColor: color }} />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
