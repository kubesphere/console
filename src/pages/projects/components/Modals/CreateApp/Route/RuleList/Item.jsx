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

import { Buttons, Icon, Columns, Column } from '@pitrix/lego-ui'
import { Button } from 'components/Base'

import styles from './index.scss'

const Item = ({ rule, tls = {}, onDelete, onEdit }) => {
  const protocol = tls.hosts && tls.hosts.includes(rule.host) ? 'https' : 'http'

  const handleDelete = () => onDelete(rule.host)

  const handleEdit = () => {
    if (protocol === 'https') {
      onEdit({ ...rule, protocol: 'https', secretName: tls.secretName })
    } else {
      onEdit({ ...rule, protocol: 'http' })
    }
  }

  return (
    <li className={styles.card}>
      <div className={styles.content}>
        <Icon name="earth" size={40} />
        <div className={styles.title}>
          {rule.host}
          <p>
            <span>
              {t('Protocol')}: {protocol}
            </span>
            {protocol === 'https' && (
              <span>
                {t('Certificate')}: {tls.secretName}
              </span>
            )}
          </p>
        </div>

        <Buttons>
          <Button type="flat" icon="trash" onClick={handleDelete} />
          <Button type="flat" icon="pen" onClick={handleEdit} />
        </Buttons>
      </div>
      {rule.http.paths.map(path => (
        <div key={path.path} className={styles.path}>
          <Columns>
            <Column>
              <span>
                {t('path')}: <strong>{path.path}</strong>
              </span>
            </Column>
            <Column>
              <span>
                {t('Service')}:{' '}
                <strong>{get(path, 'backend.serviceName')}</strong>
              </span>
            </Column>
            <Column>
              <span>
                {t('Port')}: <strong>{get(path, 'backend.servicePort')}</strong>
              </span>
            </Column>
          </Columns>
        </div>
      ))}
    </li>
  )
}

Item.propTypes = {
  rule: PropTypes.object,
}

export default Item
