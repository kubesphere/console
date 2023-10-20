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
import classNames from 'classnames'
import styles from './item.scss'

const ItemWrapper = props => {
  const { title, list } = props
  return (
    <div className={classNames(styles.card, {})}>
      <div className={styles.header}>
        <div className={styles.title}>{title}</div>
      </div>
      <div className={classNames(styles.content, {})}>
        {list.map((item, index) => {
          return (
            <div key={index} className={styles.item}>
              {Array.isArray(item) &&
                item.map(i => (
                  <span key={i} className={styles.kv}>
                    {i}
                  </span>
                ))}
              {typeof item === 'string' && (
                <span className={styles.kv}>{item}</span>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ItemWrapper
