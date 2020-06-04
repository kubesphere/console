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
import { inject } from 'mobx-react'
import { get } from 'lodash'

import Banner from 'components/Cards/Banner'

import ResourceQuota from './ResourceQuota'

import styles from './index.scss'

@inject('projectStore')
class QuotaManage extends React.Component {
  get store() {
    return this.props.projectStore
  }

  get params() {
    return get(this.props.match, 'params', {})
  }

  get tips() {
    return [
      {
        title: t('HOW_TO_USE_QUOTA_Q'),
        description: t('HOW_TO_USE_QUOTA_A'),
      },
    ]
  }

  getData = () => {
    this.store.fetchDetail(this.params)
  }

  handleMoreMenuClick = (e, key) => {
    const action = this.enabledItemActions.find(_action => _action.key === key)
    if (action && action.onClick) {
      action.onClick()
    }
  }

  render() {
    const { clusters } = this.props.projectStore.detail
    return (
      <div>
        <Banner
          icon="cdn"
          title={t('Quota Management')}
          description={t('PROJECT_QUOTA_MANAGE_DESC')}
          tips={this.tips}
        />
        <div className={styles.title}>{t('Quota Management')}</div>
        {clusters.map(cluster => (
          <ResourceQuota
            key={cluster.name}
            cluster={cluster}
            {...this.props.match.params}
          />
        ))}
      </div>
    )
  }
}

export default QuotaManage
