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

import { get } from 'lodash'
import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import { Text } from 'components/Base'

import styles from './index.scss'

const Card = ({ volume, prefix }) => {
  const description = `${t('Storage Classs')}: ${get(
    volume,
    'storageClassName',
    '-'
  )}`
  const details = [
    {
      title: get(volume, 'capacity', '-'),
      description: t('Capacity'),
    },
    {
      title: get(volume, 'accessMode', '-'),
      description: t('Access Mode'),
    },
  ]
  return (
    <div className={styles.item}>
      <Text
        icon="storage"
        title={
          <Link to={`${prefix}/volumes/${volume.name}`}>{volume.name}</Link>
        }
        description={description}
      />
      {details.map((params, index) => (
        <Text key={index} {...params} />
      ))}
    </div>
  )
}

Card.propTypes = {
  container: PropTypes.object,
}

export default Card
