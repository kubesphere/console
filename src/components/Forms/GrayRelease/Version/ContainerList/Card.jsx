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

import { Button } from 'components/Base'
import { Icon, Buttons, Input } from '@pitrix/lego-ui'

import styles from './index.scss'

const Card = ({ container, onEdit, disabled }) => {
  const handleEdit = () => onEdit(container)
  const handleImageChange = (e, value) => {
    container.image = value
  }

  return (
    <li className={styles.card}>
      <Icon name="docker" size={40} />
      <div className={styles.text}>
        <div className="h6">{container.name}</div>
        <p>
          {t('Image')}: {container.image}
        </p>
      </div>
      <div className={styles.inputs}>
        <Input
          defaultValue={container.image}
          onChange={handleImageChange}
          disabled={disabled}
        />
      </div>
      {!disabled && (
        <Buttons>
          {onEdit && <Button type="flat" icon="pen" onClick={handleEdit} />}
        </Buttons>
      )}
    </li>
  )
}

Card.propTypes = {
  container: PropTypes.object,
}

export default Card
