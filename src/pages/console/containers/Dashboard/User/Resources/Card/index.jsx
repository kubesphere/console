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
import { Link } from 'react-router-dom'
import { Icon, Columns, Column } from '@pitrix/lego-ui'
import { Button } from 'components/Base'
import { getLocalTime } from 'utils'
import { getSuitableValue } from 'utils/monitoring'
import styles from './index.scss'

const Card = ({
  url,
  name,
  desc,
  icon,
  admin,
  createTime,
  type,
  annotations,
}) => (
  <li className={styles.card}>
    <div className={styles.content}>
      <Columns>
        <Column className="is-narrow">
          <div className={styles.icon}>
            {icon.startsWith('/') ? (
              <img src={icon} alt="" />
            ) : (
              <Icon name={icon} size={24} />
            )}
          </div>
        </Column>
        <Column className="is-6">
          <div>
            <div className="h5">
              <Link to={url}>{name}</Link>
            </div>
            <p>{desc}</p>
          </div>
        </Column>
        <Column className="is-2">
          <div>
            <p>
              <strong>{admin || '-'}</strong>
            </p>
            <p>{t('Creator')}</p>
          </div>
        </Column>
        <Column className="is-2">
          <div>
            <p>
              <strong>
                {getLocalTime(createTime).format('YYYY-MM-DD HH:mm:ss')}
              </strong>
            </p>
            <p>{t('Created Time')}</p>
          </div>
        </Column>
      </Columns>
    </div>
    <div className={styles.footer}>
      {type === 'Project' && (
        <div className={styles.metrics}>
          <span>
            {t('Pod')}:{' '}
            <strong>{get(annotations, 'namespace_pod_count', 0)}</strong>
          </span>
          <span>
            {t('CPU')}:{' '}
            <strong>
              {getSuitableValue(
                get(annotations, 'namespace_cpu_usage'),
                'cpu',
                '-'
              )}
            </strong>
          </span>
          <span>
            {t('Memory')}:{' '}
            <strong>
              {getSuitableValue(
                get(annotations, 'namespace_memory_usage_wo_cache'),
                'memory',
                '-'
              )}
            </strong>
          </span>
        </div>
      )}
      <Link className={styles.view} to={url}>
        <Button noShadow>{t(`Enter ${type}`)}</Button>
      </Link>
    </div>
  </li>
)

export default Card
