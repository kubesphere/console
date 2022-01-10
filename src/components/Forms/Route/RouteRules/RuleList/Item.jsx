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

import { get, isArray } from 'lodash'
import React from 'react'
import PropTypes from 'prop-types'

import { Button, Columns, Column } from '@kube-design/components'
import { Text } from 'components/Base'

import ClusterWrapper from 'components/Clusters/ClusterWrapper'

import styles from './index.scss'

const Item = ({ index, rule, tls = [], projectDetail, onDelete, onEdit }) => {
  const tlsItem = tls.find(item => item.hosts && item.hosts.includes(rule.host))
  const protocol = tlsItem ? 'https' : 'http'

  const handleDelete = () => onDelete(index)

  const handleEdit = () => onEdit(index)

  const clusters =
    isArray(rule.clusters) && rule.clusters.map(item => ({ name: item }))

  return (
    <div className={styles.item}>
      <div className={styles.texts}>
        <Text
          icon="earth"
          title={rule.host}
          description={
            <div className={styles.description}>
              <span>
                {t('PROTOCOL_VALUE', { value: protocol.toUpperCase() })}
              </span>
              {protocol === 'https' && (
                <span>
                  {t('CERTIFICATE_VALUE', { value: tlsItem.secretName })}
                </span>
              )}
            </div>
          }
        />
        {isArray(clusters) && (
          <Text
            title={
              <ClusterWrapper
                clusters={clusters}
                clustersDetail={projectDetail.clusters}
              />
            }
            description={t('CLUSTER')}
          />
        )}
      </div>
      <div className={styles.paths}>
        {rule.http.paths.map((path, i) => (
          <div key={`${path.path}-${i}`} className={styles.path}>
            <Columns>
              <Column>
                <span>{t('PATH_VALUE', { value: path.path })}</span>
              </Column>
              <Column>
                <span>
                  {t('SERVICE_VALUE', {
                    value: get(path, 'backend.service.name'),
                  })}
                </span>
              </Column>
              <Column>
                <span>
                  {t('PORT_VALUE', {
                    value: get(path, 'backend.service.port.number'),
                  })}
                </span>
              </Column>
            </Columns>
          </div>
        ))}
      </div>
      <div className="buttons">
        <Button type="flat" icon="trash" onClick={handleDelete} />
        <Button type="flat" icon="pen" onClick={handleEdit} />
      </div>
    </div>
  )
}

Item.propTypes = {
  rule: PropTypes.object,
}

export default Item
