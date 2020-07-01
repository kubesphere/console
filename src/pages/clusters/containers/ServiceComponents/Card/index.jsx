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

import moment from 'moment-mini'
import React from 'react'
import { Link } from 'react-router-dom'
import { Icon, Columns, Column } from '@pitrix/lego-ui'
import { Status } from 'components/Base'
import { getComponentStatus } from 'utils/status'

import styles from './index.scss'

const Card = ({ cluster, component = {} }) => {
  const { name, namespace } = component
  const status = getComponentStatus(component)
  const descKey = `${String(name).toUpperCase()}_DESC`
  const descText = t(descKey)

  return (
    <div className={styles.card} data-test="service-component">
      <Columns>
        <Column className="is-narrow">
          <Icon name="components" size={32} />
        </Column>
        <Column className="is-4">
          <div className="h6">
            <Link to={`/clusters/${cluster}/components/${namespace}/${name}`}>
              {name}
            </Link>
            {descText !== descKey ? <p>{descText}</p> : null}
          </div>
        </Column>
        <Column className="is-2">
          <div>
            <p>
              <Status type={status} name={t(status)} />
            </p>
            <p>{t('Status')}</p>
          </div>
        </Column>
        <Column className="is-2">
          <div>
            <p>
              <strong>
                {component.healthyBackends} / {component.totalBackends}
              </strong>
            </p>
            <p>{t('Replicas Number')}</p>
          </div>
        </Column>
        <Column className="is-2">
          <div>
            <p>
              <strong>
                {component.startedAt
                  ? moment(component.startedAt).toNow(true)
                  : '-'}
              </strong>
            </p>
            <p>{t('Running Time')}</p>
          </div>
        </Column>
      </Columns>
    </div>
  )
}

export default Card
