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

import React, { PureComponent } from 'react'
import classnames from 'classnames'
import { Icon } from '@kube-design/components'

import styles from './index.scss'

export default class Item extends PureComponent {
  handleSelect = () => {
    const { onSelect, data } = this.props
    onSelect(data.category_id)
  }

  handleEdit = e => {
    e.stopPropagation()
    const { onEdit, data } = this.props
    onEdit(data)
  }

  handleDelete = e => {
    e.stopPropagation()
    const { onDelete, data } = this.props
    onDelete(data)
  }

  render() {
    const { data, isSelected } = this.props

    return (
      <li
        onClick={this.handleSelect}
        className={classnames({
          [styles.hasAction]: data.category_id !== 'ctg-uncategorized',
          [styles.active]: isSelected,
        })}
      >
        <Icon
          className={styles.icon}
          name={
            ['uncategorized', ''].includes(data.description)
              ? 'tag'
              : data.description
          }
          size={16}
          clickable
        />
        {t(`APP_CATE_${data.name.toUpperCase()}`, {
          defaultValue: data.name,
        })}
        <label className={styles.number}>{data.app_total || 0}</label>
        <label className={styles.actions}>
          <Icon onClick={this.handleEdit} name={'pen'} size={16} clickable />
          <Icon
            onClick={this.handleDelete}
            name={'trash'}
            size={16}
            clickable
          />
        </label>
      </li>
    )
  }
}
