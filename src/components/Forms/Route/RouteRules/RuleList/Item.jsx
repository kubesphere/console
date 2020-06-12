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
import { Button, Tag } from 'components/Base'
import { CLUSTER_PROVIDER_ICON, CLUSTER_GROUP_TAG_TYPE } from 'utils/constants'

import styles from './index.scss'

const Item = ({ rule, tls = {}, onDelete, onEdit }) => {
  const protocol = tls.hosts && tls.hosts.includes(rule.host) ? 'https' : 'http'

  const handleDelete = () => onDelete(rule)

  const handleEdit = () => {
    if (protocol === 'https') {
      onEdit({ ...rule, protocol: 'https', secretName: tls.secretName })
    } else {
      onEdit({ ...rule, protocol: 'http' })
    }
  }

  return (
    <div className={styles.item}>
      <div className={styles.icon}>
        <Icon name="earth" size={40} />
      </div>
      <div className={styles.texts}>
        <div className={styles.text}>
          <div className={styles.title}>{rule.host}</div>
          <div className={styles.description}>
            <span>
              {t('Protocol')}: {protocol}
            </span>
            {protocol === 'https' && (
              <span>
                {t('Certificate')}: {tls.secretName}
              </span>
            )}
          </div>
        </div>
      </div>
      {rule.cluster && (
        <div className={styles.clusters}>
          <div className={styles.text}>
            <div className={styles.title}>
              <Tag type={CLUSTER_GROUP_TAG_TYPE[rule.cluster.group]}>
                <Icon
                  name={
                    CLUSTER_PROVIDER_ICON[rule.cluster.provider] || 'kubernetes'
                  }
                  type="light"
                  size={20}
                />
                <span>{rule.cluster.name}</span>
              </Tag>
            </div>
            <div className={styles.description}>{t('Deploy Placement')}</div>
          </div>
        </div>
      )}
      <div className={styles.paths}>
        {rule.http.paths.map(path => (
          <div key={path.path} className={styles.path}>
            <Columns>
              <Column>
                <span>{t('path')}:</span>
                <span>{path.path}</span>
              </Column>
              <Column>
                <span>{t('Service')}:</span>
                <span>{get(path, 'backend.serviceName')}</span>
              </Column>
              <Column>
                <span>{t('Port')}:</span>
                <span>{get(path, 'backend.servicePort')}</span>
              </Column>
            </Columns>
          </div>
        ))}
      </div>
      <Buttons>
        <Button type="flat" icon="trash" onClick={handleDelete} />
        <Button type="flat" icon="pen" onClick={handleEdit} />
      </Buttons>
    </div>
  )
}

Item.propTypes = {
  rule: PropTypes.object,
}

export default Item
