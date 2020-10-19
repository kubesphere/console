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
import { Icon } from '@kube-design/components'

import styles from './index.scss'

export default function RowsSortItem({
  title,
  sortHandlerClassName,
  onEditClick,
  onDeleteClick,
}) {
  return (
    <div className={styles.wrapper}>
      <h3>{title}</h3>
      <div className={styles.tools}>
        <Icon name={'pen'} className={styles.edit} onClick={onEditClick} />
        <Icon name={'trash'} className={styles.edit} onClick={onDeleteClick} />
        <Icon name={'drag-handle'} className={sortHandlerClassName} />
      </div>
    </div>
  )
}
