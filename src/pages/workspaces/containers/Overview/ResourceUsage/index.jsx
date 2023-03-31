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

import StatusReason from 'clusters/components/StatusReason'
import EmptyList from 'components/Cards/EmptyList'
import { inject, observer } from 'mobx-react'
import React from 'react'
import { getDisplayNameNew, getDomTitle } from 'utils'

import styles from './index.scss'
import PhysicalResource from './Physical'

import ResourceStatistics from './Statistics'
import VirtualResource from './Virtual'

@inject('rootStore', 'workspaceStore')
@observer
class ResourceUsage extends React.Component {
  workspaceStore = this.props.workspaceStore

  get workspace() {
    return this.props.match.params.workspace
  }

  get clusters() {
    return this.workspaceStore.clusters.data
  }

  get clustersOpts() {
    return this.clusters.map(cluster => ({
      label: getDisplayNameNew(cluster),
      value: cluster.name,
      disabled: !cluster.isReady,
      cluster,
    }))
  }

  get clusterProps() {
    return {
      className: styles.clusterSelector,
      cluster: this.workspaceStore.cluster,
      options: this.clustersOpts,
      onChange: this.handleClusterChange,
      valueRenderer: this.valueRenderer,
      optionRenderer: this.optionRenderer,
      workspaceStore: this.workspaceStore,
    }
  }

  valueRenderer = option => {
    return t('CLUSTER_VALUE', { value: option.label })
  }

  optionRenderer = option => (
    <div>
      <div>{getDomTitle(option.label)}</div>
      {!option.cluster.isReady && (
        <div>
          <StatusReason data={option.cluster} noTip />
        </div>
      )}
    </div>
  )

  handleClusterChange = cluster => {
    this.workspaceStore.selectCluster(cluster)
  }

  renderEmpty() {
    return (
      <EmptyList
        icon="cluster"
        title={t('NO_CLUSTER_AVAILABLE')}
        desc={t('WORKSPACE_NO_CLUSTER_TIP')}
      />
    )
  }

  render() {
    return (
      <div>
        {!globals.app.isMultiCluster && (
          <ResourceStatistics workspace={this.workspace} />
        )}
        {this.props.workspaceStore.clusters.data.length > 0 ? (
          <>
            <PhysicalResource
              workspace={this.workspace}
              {...this.clusterProps}
            />
            <VirtualResource
              workspace={this.workspace}
              {...this.clusterProps}
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
