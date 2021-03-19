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
import PropTypes from 'prop-types'

import { Input, Tag } from '@kube-design/components'
import { List } from 'components/Base'

import styles from './index.scss'

const Card = ({ type = 'worker', container, onEdit, onDelete, disabled }) => {
  const handleImageChange = (e, value) => {
    container.image = value
  }
  const handleDelete = () => onDelete({ type, ...container })
  const handleEdit = () => onEdit({ type, ...container })

  const extras = (
    <div className={styles.inputs}>
      <Input
        defaultValue={container.image}
        onChange={handleImageChange}
        disabled={disabled}
      />
    </div>
  )

  const title =
    type === 'init' ? (
      <span>
        {container.name}
        <Tag className="margin-l8" type="warning">
          {t('Init Container')}
        </Tag>
      </span>
    ) : (
      container.name
    )

  return (
    <List.Item
      icon="docker"
      title={title}
      className={styles.card}
      description={`${t('Image')}: ${container.image}`}
      extras={extras}
      onDelete={!disabled && handleDelete}
      onEdit={!disabled && handleEdit}
    />
  )
}

Card.propTypes = {
  container: PropTypes.object,
}

export default Card
