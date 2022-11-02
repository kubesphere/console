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

import { Tooltip, Icon } from '@kube-design/components'
import styles from './index.scss'

const isSuccess = condition => condition.status === 'True'

export default function StatusReason({ data, noTip }) {
  const conditions = (
    <div>
      <div className="tooltip-title">{t('CLUSTER_STATUS')}</div>
      <div>
        {Object.values(get(data, 'conditions', {})).map(cd => (
          <div key={cd.type} className={styles.condition}>
            <div className={styles.title}>
              {isSuccess(cd) ? (
                <Icon name="success" type="coloured" />
              ) : (
                <Icon
                  name="error"
                  color={{
                    primary: '#ffffff',
                    secondary: '#ea4641',
                  }}
                />
              )}
              <span>
                {t(`CLUSTER_CONDITION_${cd.type.toUpperCase()}`, {
                  defaultValue: cd.type,
                })}
              </span>
            </div>
            {cd.status && <p>{`${t('STATUS')}: ${cd.status}`}</p>}
            {cd.reason && (
              <p>{`${t('REASON')}: ${t(
                `CLUSTER_REASON_${cd.reason.toUpperCase()}`,
                {
                  defaultValue: cd.reason,
                }
              )}`}</p>
            )}
            {cd.message && <p>{`${t('MESSAGE')}: ${cd.message}`}</p>}
          </div>
        ))}
      </div>
    </div>
  )

  const icon = (
    <Icon
      name="information"
      color={{
        primary: '#ffffff',
        secondary: status === 'error' ? '#ab2f29' : '#f5a623',
      }}
    />
  )

  return (
    <span className={styles.reason}>
      {noTip ? (
        icon
      ) : (
        <Tooltip placement="right" content={conditions}>
          {icon}
        </Tooltip>
      )}
      <span className={status === 'error' ? styles.error : styles.warning}>
        {t('UNREADY')}
      </span>
    </span>
  )
}
