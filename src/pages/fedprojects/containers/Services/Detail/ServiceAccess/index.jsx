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
import { Loading } from '@kube-design/components'
import { trigger } from 'utils/action'

import { toJS } from 'mobx'
import ClusterService from './ClusterService'

import styles from './index.scss'

@inject('rootStore', 'detailStore', 'projectStore')
@observer
@trigger
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

  fetchData = () => {
    const { params } = this.props.match
    const clusters = this.store.detail.clusters.map(item => item.name)
    this.store.fetchDetail(params)
    this.store.fetchResources({
      ...params,
      clusters,
    })
  }

  handleUpdateService = cluster => {
    const { detail, resources } = this.store
    this.trigger('fedservice.gateway.edit', {
      cluster,
      detail: toJS(detail),
      resources: toJS(resources),
      success: this.fetchData,
    })
  }

  renderServiceAccess() {
    const { resources = [], isResourcesLoading } = this.store
    const clusters = keyBy(this.props.projectStore.detail.clusters, 'name')

    return (
      <Loading spinning={isResourcesLoading}>
        <div>
          <div className={styles.title}>{t('ACCESS_INFORMATION')}</div>
          {Object.keys(resources).map(cluster => (
            <ClusterService
              key={cluster}
              store={this.store}
              detail={resources[cluster]}
              cluster={clusters[cluster]}
              enabledActions={this.enabledActions}
              updateService={this.handleUpdateService}
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
