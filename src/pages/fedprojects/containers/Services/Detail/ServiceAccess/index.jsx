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
import { keyBy } from 'lodash'
import { observer, inject } from 'mobx-react'
import { Loading } from '@pitrix/lego-ui'

import ClusterService from './ClusterService'

import styles from './index.scss'

@inject('detailStore', 'projectStore')
@observer
export default class ServiceAccess extends React.Component {
  store = this.props.detailStore

  get enabledActions() {
    const { namespace: project, ...rest } = this.props.match.params
    return globals.app.getActions({
      module: 'services',
      ...rest,
      project,
    })
  }

  renderServiceAccess() {
    const { resources = [], isResourcesLoading } = this.store
    const clusters = keyBy(this.props.projectStore.detail.clusters, 'name')

    return (
      <Loading spinning={isResourcesLoading}>
        <div>
          <div className={styles.title}>{t('Service Access')}</div>
          {Object.keys(resources).map(cluster => (
            <ClusterService
              key={cluster}
              store={this.store}
              detail={resources[cluster]}
              cluster={clusters[cluster]}
              enabledActions={this.enabledActions}
            />
          ))}
        </div>
      </Loading>
    )
  }

  render() {
    return <div className={styles.main}>{this.renderServiceAccess()}</div>
  }
}
