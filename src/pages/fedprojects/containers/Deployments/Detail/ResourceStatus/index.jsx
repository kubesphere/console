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
import { toJS } from 'mobx'
import { observer, inject } from 'mobx-react'
import {
  isEmpty,
  flatten,
  uniqBy,
  keyBy,
  throttle,
  get,
  cloneDeep,
} from 'lodash'

import PodsCard from 'components/Cards/Pods'
import ContainerPortsCard from 'components/Cards/Containers/Ports'
import ClusterWorkloadStatus from 'fedprojects/components/ClusterWorkloadStatus'

import styles from './index.scss'

class ResourceStatus extends React.Component {
  state = {
    resources: {},
  }

  get module() {
    return this.props.detailStore.module
  }

  get store() {
    return this.props.detailStore
  }

  get prefix() {
    const { workspace } = this.props.match.params
    return workspace ? `/${workspace}` : ''
  }

  get enabledActions() {
    return globals.app.getActions({
      module: this.module,
      project: this.props.match.params.namespace,
    })
  }

  fetchReplica = throttle(async () => {
    const { params } = this.props.match
    const resources = await this.store.fetchDetailSilent({
      clusters: this.store.detail.clusters.map(item => item.name),
      ...params,
    })
    this.setState({
      resources,
    })
  }, 1000)

  renderReplicaInfo() {
    const { detail = {}, resources, isResourcesLoading } = this.store
    const _resources = cloneDeep(toJS(resources))
    const { resources: refetchResources } = this.state
    const clustersDetail = keyBy(
      this.props.projectStore.detail.clusters,
      'name'
    )

    if (!isEmpty(refetchResources)) {
      Object.keys(_resources).forEach(cluster => {
        _resources[cluster] = {
          ..._resources[cluster],
          ...get(refetchResources, cluster, {}),
        }
      })
    }

    return (
      <ClusterWorkloadStatus
        module={this.module}
        store={this.store}
        detail={detail}
        resources={_resources}
        clustersDetail={clustersDetail}
        clusters={detail.clusters}
        isLoading={isResourcesLoading}
        canEdit={this.enabledActions.includes('edit')}
        projectStore={this.props.projectStore}
      />
    )
  }

  renderContainerPorts() {
    const { noPorts } = this.props

    if (noPorts) {
      return null
    }

    const { resources, isResourcesLoading } = this.store
    const ports = []
    Object.values(resources).forEach(resource => {
      if (resource && resource.containers) {
        ports.push(
          ...uniqBy(
            flatten(
              resource.containers.map(container =>
                isEmpty(container.ports) ? [] : container.ports.slice()
              )
            ),
            'name'
          ).map(item => ({ ...item, cluster: resource.cluster }))
        )
      }
    })

    if (isEmpty(ports)) return null

    return (
      <ContainerPortsCard
        ports={ports}
        loading={isResourcesLoading}
        isFederated
      />
    )
  }

  renderPods() {
    const { detail, resources } = this.store
    const clustersMap = keyBy(this.props.projectStore.detail.clusters, 'name')
    const clusters = detail.clusters
      .filter(item => clustersMap[item.name])
      .map(item => item.name)

    return (
      <PodsCard
        prefix={this.prefix}
        details={toJS(resources)}
        clusters={clusters}
        getReplica={this.fetchReplica}
        isFederated
      />
    )
  }

  renderContent() {
    return (
      <div>
        {this.renderReplicaInfo()}
        {this.renderContainerPorts()}
        {this.renderPods()}
      </div>
    )
  }

  render() {
    return <div className={styles.main}>{this.renderContent()}</div>
  }
}

export default inject('projectStore', 'detailStore')(observer(ResourceStatus))
export const Component = ResourceStatus
