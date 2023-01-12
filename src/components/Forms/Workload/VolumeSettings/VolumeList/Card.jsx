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

import { get, isEmpty } from 'lodash'
import React from 'react'
import PropTypes from 'prop-types'
import { Icon } from '@kube-design/components'

import { List } from 'components/Base'

import styles from './index.scss'

const Card = ({ volume, onDelete, onEdit }) => {
  const props = {}
  if (onDelete) {
    props.onDelete = () => onDelete(volume.name)
  }
  if (onEdit) {
    props.onEdit = () => onEdit(volume)
  }

  let icon = 'storage'
  let description
  let details
  if (volume.hostPath) {
    description = `${t('TYPE_HOSTPATH')}`
    details = [
      { title: get(volume, 'hostPath.path', '-'), description: 'HostPath' },
    ]
  } else if (volume.emptyDir) {
    description = `${t('TYPE_EMPTYDIR')}`
    details = []
  } else if (volume.configMap) {
    icon = 'hammer'
    description = `${t('TYPE_CONFIGMAP')}`
    details = [
      {
        title: get(volume, 'configMap.name', '-'),
        description: t('CONFIGMAP'),
      },
    ]
  } else if (volume.secret) {
    icon = 'key'
    description = `${t('TYPE_SECRET')}`
    details = [
      {
        title: get(volume, 'secret.secretName', '-'),
        description: t('SECRET'),
      },
    ]
  } else {
    description = `${t('STORAGE_CLASS')}: ${get(
      volume,
      'volume.storageClassName',
      '-'
    )}`
    details = [
      {
        title: get(volume, 'volume.name', '-'),
        description: t('PERSISTENT_VOLUME_CLAIM'),
      },
      {
        title: get(volume, 'volume.capacity', '-'),
        description: t('CAPACITY'),
      },
      {
        title: get(volume, 'volume.accessMode', '-'),
        description: t('ACCESS_MODE_TCAP'),
      },
    ]
  }

  const mount = !isEmpty(volume.volumeMounts) && (
    <div className={styles.mount}>
      <ul>
        {volume.volumeMounts.map(
          ({ containerName, mountPath, subPath, logPath, readOnly }) => (
            <li key={mountPath}>
              <div>
                <Icon name="docker" size={20} />
                <span>{containerName}</span>
              </div>
              <div>
                <Icon name="mgmt-node" size={20} />
                <span>{mountPath}</span>
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
              {logPath && (
                <div>
                  <Icon name="log" size={20} /> <span>{logPath}</span>
                </div>
              )}
            </li>
          )
        )}
      </ul>
    </div>
  )

  return (
    <List.Item
      icon={icon}
      title={volume.name}
      description={description}
      extras={mount}
      details={details}
      {...props}
    />
  )
}

Card.propTypes = {
  container: PropTypes.object,
}

export default Card
