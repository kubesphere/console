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

import { getLocalTime } from 'utils'
import { getMonitoringRuleInfo } from 'utils/alerting'

import { Icon, Columns, Column, Tooltip } from '@pitrix/lego-ui'
import { Button } from 'components/Base'

import styles from './index.scss'

const PolicyCard = ({ data = {}, actions = [] }) => {
  const {
    id,
    name,
    displayName,
    desc,
    targetCount,
    recentAlertTime,
    metrics,
  } = data
  const viewAction = actions.find(action => action.key === 'view')
  const monitorRule = getMonitoringRuleInfo(metrics)
  const nameText = displayName ? `(${displayName})` : ''

  return (
    <li className={styles.wrapper} key={id}>
      <div className={styles.content}>
        <Columns>
          <Column className="is-narrow">
            <Icon name="bell" size={40} />
          </Column>
          <Column>
            <div>
              <div className="h5">
                <a onClick={viewAction && viewAction.onClick(data)}>
                  {`${name}${nameText}`}
                </a>
              </div>
              <p>{desc}</p>
            </div>
          </Column>
          <Column className="is-2">
            <div>
              <p>
                <strong>{targetCount}</strong>
              </p>
              <p>{t('Monitoring Target Count')}</p>
            </div>
          </Column>
          <Column className="is-2">
            <div>
              <p>
                <strong>
                  {recentAlertTime
                    ? getLocalTime(recentAlertTime).format(
                        `YYYY-MM-DD HH:mm:ss`
                      )
                    : '-'}
                </strong>
              </p>
              <p>{t('Recent Alert Time')}</p>
            </div>
          </Column>
        </Columns>
      </div>
      <div className={styles.footer}>
        <div className={styles.members}>
          <span>{t('Monitoring Rules')}:</span>
          {Object.entries(monitorRule).map(([key, value]) => (
            <Tooltip
              key={key}
              content={
                <div>
                  {value.map(item => (
                    <p key={item}>{t(item)}</p>
                  ))}
                </div>
              }
            >
              <Icon name={key} size={24} />
            </Tooltip>
          ))}
        </div>
        <div className={styles.view}>
          {actions.map(action => (
            <Button {...action} onClick={action.onClick(data)}>
              {t(action.text)}
            </Button>
          ))}
        </div>
      </div>
    </li>
  )
}

export default PolicyCard
