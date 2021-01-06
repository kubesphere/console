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

import { Button } from '@kube-design/components'

import styles from './index.scss'

const Item = ({ component, index, value, arrayValue, onChange, onDelete }) => {
  const childNode = React.cloneElement(component, {
    ...component.props,
    index,
    value,
    arrayValue,
    onChange,
  })

  return (
    <div className={styles.item}>
      {childNode}
      <Button
        type="flat"
        icon="trash"
        className={styles.delete}
        onClick={onDelete}
      />
    </div>
  )
}

export default Item
