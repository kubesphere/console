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

import { Icon, Tooltip } from '@pitrix/lego-ui'
import { getLocalTime } from 'utils'
import { getConditionsStatus } from 'utils/node'

import styles from './index.scss'

const Chart = ({ data }) => {
  const statusType = getConditionsStatus(data)

  return (
    <div className={styles.card}>
      {statusType === 'Running' ? (
        <Icon className={styles.check} name="check" type="light" size={24} />
      ) : (
        <Icon
          className={styles.substract}
          name="substract"
          type="light"
          size={24}
        />
      )}
      <div className={styles.type}>
        <div className="h6">
          {data.type}
          <Tooltip content={t(`NODE_${data.type.toUpperCase()}_TIP`)}>
            <Icon name="information" />
          </Tooltip>
        </div>
        <p>
          {t('lastHeartbeatTime')}:{' '}
          {getLocalTime(data.lastHeartbeatTime).format('YYYY-MM-DD HH:mm:ss')}
        </p>
      </div>
      <div className={styles.reason}>
        <p>
          <span>{t('reason')}</span>: {data.reason}
        </p>
        <p>
          <span>{t('message')}</span>: {data.message}
        </p>
      </div>
    </div>
  )
}

export default Chart
