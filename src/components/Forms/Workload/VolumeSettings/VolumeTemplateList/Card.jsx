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

import { Icon } from '@kube-design/components'
import { List } from 'components/Base'

import styles from './index.scss'

const Card = ({ volume, onDelete, onEdit, banEdit = false }) => {
  const handleDelete = () => onDelete(volume.metadata.name)
  const handleEdit = () => onEdit(volume)

  const details = [
    {
      title: get(volume, 'spec.resources.requests.storage', '-'),
      description: t('CAPACITY'),
    },
    {
      title: get(volume, 'spec.accessModes[0]', '-'),
      description: t('ACCESS_MODE_TCAP'),
    },
  ]

  const mount = (
    <div className={styles.mount}>
      <ul>
        {volume.volumeMounts &&
          volume.volumeMounts.map(
            ({ containerName, mountPath, subPath, readOnly }) => (
              <li key={mountPath}>
                <div>
                  <Icon name="docker" size={20} />
                  <span>{containerName}</span>
                </div>
                <div>
                  <Icon name="mgmt-node" size={20} /> <span>{mountPath}</span>
                  <span className="text-secondary">
                    &nbsp;(
                    {readOnly ? t('READ_ONLY_LOW') : t('READ_AND_WRITE_LOW')})
                  </span>
                </div>
                {subPath && (
                  <div>
                    <Icon name="textfield" size={20} /> <span>{subPath}</span>
                  </div>
                )}
              </li>
            )
          )}
      </ul>
    </div>
  )

  if (banEdit) {
    return (
      <List.Item
        icon="storage"
        title={get(volume, 'metadata.name', '-')}
        description={t('STORAGE_CLASS_VALUE', {
          value: get(volume, 'spec.storageClassName', '-'),
        })}
        extras={mount}
        details={details}
      />
    )
  }

  return (
    <List.Item
      icon="storage"
      title={get(volume, 'metadata.name', '-')}
      description={t('STORAGE_CLASS_VALUE', {
        value: get(volume, 'spec.storageClassName', '-'),
      })}
      extras={mount}
      details={details}
      onDelete={handleDelete}
      onEdit={handleEdit}
    />
  )
}

Card.propTypes = {
  container: PropTypes.object,
}

export default Card
