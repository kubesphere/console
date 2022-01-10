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

import React, { useEffect, useState } from 'react'

import { get, isEmpty } from 'lodash'

import { QUOTAS_MAP } from 'utils/constants'
import { Panel } from 'components/Base'

import QuotaItem from './QuotaItem'

import styles from './index.scss'

export default function ResourceQuota({ detail }) {
  const [quotaListKeys, setQuotaListKeys] = useState([])

  useEffect(() => {
    if (detail.used) {
      const _quotaListKeys = Object.entries(QUOTAS_MAP).map(([key, value]) => {
        return {
          label: key,
          ...value,
        }
      })

      Object.entries(detail.used).forEach(([key]) => {
        const quota = _quotaListKeys.find(item => item.name === key)

        if (isEmpty(quota)) {
          _quotaListKeys.push({
            label: key,
            name: key,
          })
        }
      })

      setQuotaListKeys(_quotaListKeys)
    }
  }, [detail])

  return (
    <Panel className={styles.wrapper} title={t('PROJECT_QUOTA_PL')}>
      {quotaListKeys.map(({ label, name }) => (
        <QuotaItem
          key={label}
          name={label}
          total={get(detail, `hard["${name}"]`)}
          used={get(detail, `used["${name}"]`, 0)}
          left={get(detail, `left["${name}"]`)}
        />
      ))}
    </Panel>
  )
}
