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

import { get } from 'lodash'

import { QUOTAS_MAP } from 'utils/constants'
import { Panel } from 'components/Base'

import QuotaItem from './QuotaItem'

import styles from './index.scss'

export default class ResourceQuota extends React.Component {
  render() {
    const { detail } = this.props
    return (
      <Panel className={styles.wrapper} title={t('Resource Quota')}>
        {Object.entries(QUOTAS_MAP).map(([key, value]) => (
          <QuotaItem
            key={key}
            name={key}
            total={get(detail, `hard["${value.name}"]`)}
            used={get(detail, `used["${value.name}"]`, 0)}
            left={get(detail, `left["${value.name}"]`)}
          />
        ))}
      </Panel>
    )
  }
}
