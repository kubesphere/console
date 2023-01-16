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
import { get, keyBy, cloneDeep, isEmpty, throttle } from 'lodash'

import WorkloadStore from 'stores/workload'
import FedStore from 'stores/federated'

import PodsCard from 'components/Cards/Pods'
import ClusterWorkloadStatus from 'fedprojects/components/ClusterWorkloadStatus'

import styles from './index.scss'

@inject('detailStore', 'projectStore')
@observer
export default class ResourceStatus extends React.Component {
  constructor(props) {
    super(props)

    this.store = props.detailStore

    this.state = {
      workloadExist: true,
      workloadName: get(
        this.store.detail.annotations,
        '["kubesphere.io/workloadName"]'
      ),
      resources: {},
    }

    const workloadModule = get(
      this.store.detail.annotations,
      '["kubesphere.io/workloadModule"]',
      'deployments'
    )

    this.workloadStore = new FedStore(new WorkloadStore(workloadModule))
  }

  componentDidMount() {
    this.fetchData()
  }

  componentDidUpdate(prevProps, prevState) {
    const { detail } = this.props.detailStore
    const { workloadName } = prevState
    const newWorkloadName = get(
      detail,
      'annotations["kubesphere.io/workloadName"]'
    )

    if (workloadName !== newWorkloadName) {
      this.setState({ workloadName: newWorkloadName })
      this.fetchData()
    }
  }

  get enabledActions() {
    return globals.app.getActions({
      module: this.store.module,
      project: this.props.match.params.namespace,
    })
  }

  get prefix() {
    const { workspace } = this.props.match.params
    return workspace ? `/${workspace}` : ''
  }

  fetchData = async () => {
    const { namespace } = this.props.match.params
    const name = this.state.workloadName

    const clusters = this.store.detail.clusters.map(item => item.name)
    const result = await this.workloadStore.checkName({ name, namespace })
    if (result.exist) {
      this.workloadStore.fetchDetail({ name, namespace })
      this.workloadStore.fetchResources({ name, namespace, clusters })
      this.setState({ workloadExist: true })
    } else {
      this.setState({ workloadExist: false })
    }
  }

  fetchReplica = throttle(async () => {
    const { workloadExist } = this.state
    const { params } = this.props.match

    if (workloadExist) {
      const resources = await this.workloadStore.fetchDetailSilent({
        clusters: this.workloadStore.detail.clusters.map(item => item.name),
        ...params,
        name: this.state.workloadName,
      })
      this.setState({
        resources,
      })
    }
  }, 2000)

  renderReplicaInfo() {
    const { clusters } = this.store.detail || {}
    const { detail, resources, isResourcesLoading } = this.workloadStore
    const clustersDetail = keyBy(
      this.props.projectStore.detail.clusters,
      'name'
    )

    const _resources = cloneDeep(toJS(resources))
    const { resources: refetchResources } = this.state
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
        module={this.workloadStore.module}
        store={this.workloadStore}
        detail={detail}
        resources={_resources}
        clusters={clusters}
        clustersDetail={clustersDetail}
        isLoading={isResourcesLoading}
        canEdit={this.enabledActions.includes('edit')}
      />
    )
  }

  renderWorkloadPods() {
    const { resources } = this.workloadStore
    const clusters = this.store.detail.clusters.map(item => item.name)

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

  renderPods() {
    const { resources, isResourcesLoading } = this.store

    const clusters = this.store.detail.clusters.map(item => item.name)

    return (
      <PodsCard
        prefix={this.prefix}
        details={toJS(resources)}
        clusters={clusters}
        isLoading={isResourcesLoading}
        isFederated
      />
    )
  }

  renderContent() {
    const { workloadName, workloadExist } = this.state
    if (!workloadName || !workloadExist) {
      return this.renderPods()
    }

    return (
      <div>
        {this.renderReplicaInfo()}
        {this.renderWorkloadPods()}
      </div>
    )
  }

  render() {
    return <div className={styles.main}>{this.renderContent()}</div>
  }
}
