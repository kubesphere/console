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
  handleReplicasChange = (cluster, replicas) => {
    const { fedDetail, store } = this.props
    const { overrides = [] } = fedDetail

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

    store.patch(fedDetail, { spec: { overrides } }).then(() => {
      store.fetchDetail(fedDetail)
    })
  }

  render() {
    const { module, fedDetail } = this.props

    if (!fedDetail || !fedDetail.clusters) {
      return null
    }

    return (
      <Panel title={t('Instance Status')}>
        <div className={styles.wrapper}>
          {fedDetail.clusters.map(cluster => (
            <Cluster
              module={module}
              cluster={cluster.name}
              namespace={fedDetail.namespace}
              workloadName={fedDetail.name}
              onReplicasChange={this.handleReplicasChange}
              onEdit={this.handleEdit}
            />
          ))}
        </div>
      </Panel>
    )
  }
}
