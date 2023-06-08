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

import { Icon, Tooltip } from '@kube-design/components'
import { get } from 'lodash'
import React from 'react'

import styles from './index.scss'

const isSuccess = (type, condition) => {
  const conditionType = condition.type
  const conditionStatus = condition.status

  if (type === 'volume') {
    return conditionStatus === 'True'
  }

  return conditionType === 'ReplicaFailure'
    ? conditionStatus === 'False'
    : conditionStatus === 'True'
}

export default function StatusReason({
  data,
  status,
  reason,
  type = 'workload',
}) {
  const conditions = (
    <div>
      <div className="tooltip-title">{t('STATUS_INFORMATION')}</div>
      <div>
        {get(data, 'status.conditions', []).map(cd => (
          <div key={cd.type} className={styles.condition}>
            <div className={styles.title}>
              {isSuccess(type, cd) ? (
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
                {t(`${type.toUpperCase()}_CONDITION_${cd.type.toUpperCase()}`, {
                  defaultValue: cd.type,
                })}
              </span>
            </div>
            {cd.status && (
              <p>
                {t('STATUS_VALUE', {
                  value: cd.status === 'True' ? 'True' : 'False',
                })}
              </p>
            )}
            {cd.reason && (
              <p>
                {t('REASON_VALUE', {
                  value: t(
                    `${type.toUpperCase()}_REASON_${cd.reason.toUpperCase()}`,
                    { defaultValue: cd.reason }
                  ),
                })}
              </p>
            )}
            {cd.message && <p>{t('MESSAGE_VALUE', { value: cd.message })}</p>}
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <span className={styles.reason}>
      <Tooltip placement="right" content={conditions} positionFixed={true}>
        <Icon
          name="information"
          color={{
            primary: '#ffffff',
            secondary: status === 'error' ? '#ab2f29' : '#f5a623',
          }}
        />
      </Tooltip>
      {reason && (
        <span className={status === 'error' ? styles.error : styles.warning}>
          {t(reason)}
        </span>
      )}
    </span>
  )
}
