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
import { inject, observer } from 'mobx-react'
import EmptyList from 'components/Cards/EmptyList'
import WorkspaceStore from 'stores/workspace'

import ResourceStatistics from './Statistics'
import PhysicalResource from './Physical'
import VirtualResource from './Virtual'

@inject('rootStore')
@observer
class ResourceUsage extends React.Component {
  get workspace() {
    return this.props.match.params.workspace
  }

  get clusters() {
    return this.workspaceStore.clusters.data
  }

  get clustersOpts() {
    return this.clusters.map(({ name }) => ({
      label: name,
      value: name,
    }))
  }

  get defaultCluster() {
    const { name } =
      this.clusters.find(cluster => cluster.isHost) || this.clusters[0] || {}
    return name
  }

  workspaceStore = new WorkspaceStore()

  componentDidMount() {
    this.workspaceStore.fetchClusters({ workspace: this.workspace })
  }

  renderEmpty() {
    return (
      <EmptyList
        icon="cluster"
        title={t('No Available Cluster')}
        desc={t('NO_CLUSTER_TIP')}
      />
    )
  }

  render() {
    return (
      <div>
        {!globals.app.isMultiCluster && (
          <ResourceStatistics workspace={this.workspace} />
        )}
        {this.workspaceStore.clusters.data.length > 0 ? (
          <>
            <PhysicalResource
              workspace={this.workspace}
              clusterOpts={this.clustersOpts}
              defaultCluster={this.defaultCluster}
            />
            <VirtualResource
              workspace={this.workspace}
              clusterOpts={this.clustersOpts}
              defaultCluster={this.defaultCluster}
            />
          </>
        ) : (
          this.renderEmpty()
        )}
      </div>
    )
  }
}

export default ResourceUsage
