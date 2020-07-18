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
import { observer } from 'mobx-react'
import { Link } from 'react-router-dom'
import { keyBy } from 'lodash'
import { Panel, Alert } from 'components/Base'
import ClusterTitle from 'components/Clusters/ClusterTitle'

import ClusterStore from 'stores/cluster'
import FederatedStore from 'stores/federated'

import styles from './index.scss'

@observer
export default class Placement extends Component {
  fedStore = new FederatedStore({ module: this.props.module })

  clusterStore = new ClusterStore()

  componentDidMount() {
    const { name, namespace } = this.props
    this.fedStore.fetchDetail({ name, namespace })
    this.clusterStore.fetchList({ limit: -1 })
  }

  render() {
    const { module, name, namespace } = this.props
    const { clusters = [] } = this.fedStore.detail
    const clusterMap = keyBy(this.clusterStore.list.data, 'name')
    return (
      <Panel title={t('Project Placement')}>
        <Alert
          type="warning"
          message={t('MULTI_CLUSER_RESOURCE_TIP')}
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
                to={`/clusters/${
                  cluster.name
                }/projects/${namespace}/${module}/${name}`}
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
}
