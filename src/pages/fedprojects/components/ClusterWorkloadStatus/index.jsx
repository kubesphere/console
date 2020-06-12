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

import React, { Component } from 'react'

import { Panel } from 'components/Base'

import Cluster from './Cluster'

import styles from './index.scss'

export default class ClusterWorkloadStatus extends Component {
  handleReplicasChange = async (cluster, replicas) => {
    const { detail, store } = this.props
    const { overrides = [] } = detail

    const override = overrides.find(item => item.clusterName === cluster)
    if (override) {
      const path = override.clusterOverrides.find(
        item => item.path === '/spec/replicas'
      )
      if (path) {
        path.value = replicas
      } else {
        override.clusterOverrides.push({
          path: '/spec/replicas',
          value: replicas,
        })
      }
    } else {
      overrides.push({
        clusterName: cluster,
        clusterOverrides: [
          {
            path: '/spec/replicas',
            value: replicas,
          },
        ],
      })
    }

    await store.patch(detail, { spec: { overrides } })
    await store.resourceStore.patch(
      { ...detail, cluster },
      { spec: { replicas } }
    )
  }

  render() {
    const { store, resources, clusters } = this.props

    return (
      <Panel title={t('Instance Status')}>
        <div className={styles.wrapper}>
          {Object.keys(resources).map(cluster => (
            <Cluster
              key={cluster}
              cluster={clusters[cluster]}
              workload={resources[cluster]}
              onReplicasChange={this.handleReplicasChange}
              onEdit={this.handleEdit}
              store={store}
            />
          ))}
        </div>
      </Panel>
    )
  }
}
