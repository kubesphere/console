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
import { Link } from 'react-router-dom'
import { inject, observer } from 'mobx-react'
import { keyBy } from 'lodash'
import { Panel, Alert } from 'components/Base'
import ClusterTitle from 'components/Clusters/ClusterTitle'
import ResourceUsage from 'projects/containers/Overview/ResourceUsage'

import ClusterStore from 'stores/cluster'
import FederatedStore from 'stores/federated'

import styles from './index.scss'

@inject('detailStore')
@observer
export default class Overview extends React.Component {
  fedStore = new FederatedStore({ module: 'namespaces' })

  clusterStore = new ClusterStore()

  get isFedManaged() {
    return this.props.detailStore.detail.isFedManaged
  }

  componentDidMount() {
    if (this.isFedManaged) {
      const { name } = this.props.detailStore.detail
      this.fedStore.fetchDetail({ name, namespace: name })
      this.clusterStore.fetchList({ limit: -1 })
    }
  }

  renderPlacement() {
    const { clusters = [], name } = this.fedStore.detail
    const clusterMap = keyBy(this.clusterStore.list.data, 'name')
    return (
      <Panel title={t('Project Placement')}>
        <Alert
          type="warning"
          message={t('MULTI_CLUSER_PROJECT_TIP')}
          hideIcon
        />
        <div className={styles.clusters}>
          {clusters.map(cluster => {
            if (!clusterMap[cluster.name]) {
              return null
            }

            return (
              <Link
                key={cluster.name}
                className={styles.cluster}
                to={`/clusters/${cluster.name}/projects/${name}`}
              >
                <ClusterTitle
                  cluster={clusterMap[cluster.name]}
                  theme="light"
                  tagClass="float-right"
                />
              </Link>
            )
          })}
        </div>
      </Panel>
    )
  }

  render() {
    const { detail } = this.props.detailStore
    return (
      <>
        {this.isFedManaged && this.renderPlacement()}
        <ResourceUsage match={this.props.match} workspace={detail.workspace} />
      </>
    )
  }
}
