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
import { get, isEmpty } from 'lodash'

import { Icon, Tag } from '@kube-design/components'
import { List } from 'components/Base'
import { cpuFormat, memoryFormat } from 'utils'

import styles from './index.scss'

const Card = ({ type = 'worker', container, onDelete, onEdit, readOnly }) => {
  const handleDelete = () => onDelete({ type, ...container })
  const handleEdit = () => onEdit({ type, ...container })
  const limits = get(container, 'resources.limits', {})
  const requests = get(container, 'resources.requests', {})

  const isIstioProxy = container.name === 'istio-proxy'

  if (isIstioProxy) {
    return (
      <List.Item
        icon="istio"
        title={container.name}
        description={t('IMAGE_VALUE', { value: container.image })}
      />
    )
  }

  let extras
  if (isEmpty(limits) && isEmpty(requests)) {
    extras = (
      <div className={styles.limits}>
        <Icon name="exclamation" />
        <span>&nbsp;{t('NO_RESOURCE_LIMIT')}</span>
      </div>
    )
  } else {
    extras = (
      <div className={styles.limits}>
        {(limits.cpu || requests.cpu) && (
          <span className={styles.limit}>
            <Icon name="cpu" size={20} />
            <span>{`${requests.cpu ? cpuFormat(requests.cpu) : 0} – ${
              limits.cpu ? cpuFormat(limits.cpu) : '∞'
            }`}</span>
          </span>
        )}
        {(limits.memory || requests.memory) && (
          <span className={styles.limit}>
            <Icon name="memory" size={20} />
            {`${
              requests.memory ? `${memoryFormat(requests.memory)} MiB` : 0
            } – ${limits.memory ? `${memoryFormat(limits.memory)} MiB` : '∞'}`}
          </span>
        )}
      </div>
    )
  }

  const title =
    type === 'init' ? (
      <span>
        {container.name}
        <Tag className="margin-l8" type="warning">
          {t('INIT_CONTAINER')}
        </Tag>
      </span>
    ) : (
      container.name
    )

  return (
    <List.Item
      icon="docker"
      title={title}
      description={t('IMAGE_VALUE', { value: container.image })}
      extras={extras}
      onDelete={!readOnly && handleDelete}
      onEdit={!readOnly && handleEdit}
    />
  )
}

Card.propTypes = {
  container: PropTypes.object,
}

export default Card
