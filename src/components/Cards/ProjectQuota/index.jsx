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

import { observer } from 'mobx-react'

import { QUOTAS_MAP } from 'utils/constants'
import { Panel } from 'components/Base'

import QuotaStore from 'stores/quota'

import QuotaItem from './QuotaItem'

import styles from './index.scss'

@observer
export default class ProjectQuota extends React.Component {
  store = new QuotaStore()

  componentDidUpdate(prevProps) {
    if (prevProps.namespace !== this.props.namespace && this.props.namespace) {
      this.store.fetch(this.props)
    }
  }

  componentDidMount() {
    if (this.props.namespace) {
      this.store.fetch(this.props)
    }
  }

  render() {
    const quota = this.store.data
    return (
      <Panel className={styles.wrapper} title={t('Resource Quota')}>
        {Object.entries(QUOTAS_MAP).map(([key, value]) => (
          <QuotaItem
            key={key}
            name={key}
            total={get(quota, `hard["${value.name}"]`)}
            used={get(quota, `used["${value.name}"]`, 0)}
            left={get(quota, `left["${value.name}"]`)}
          />
        ))}
      </Panel>
    )
  }
}
