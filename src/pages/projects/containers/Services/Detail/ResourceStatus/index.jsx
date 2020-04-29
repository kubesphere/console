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
import { reaction } from 'mobx'
import { observer, inject } from 'mobx-react'

import WorkloadStore from 'stores/workload'
import FedStore from 'stores/federated'

import { Component as WorkloadResourceStatus } from 'projects/containers/Deployments/Detail/ResourceStatus'

import styles from './index.scss'

@inject('detailStore', 'fedDetailStore')
@observer
export default class ResourceStatus extends React.Component {
  constructor(props) {
    super(props)

    this.store = props.detailStore

    const workloadModule = this.store.workload.type
    this.workloadStore = new WorkloadStore(workloadModule)
    this.fedWorkloadDetailStore = new FedStore(workloadModule)

    this.disposer = reaction(
      () => this.store.workload,
      () => this.fetchDetail()
    )
  }

  componentDidMount() {
    this.fetchDetail()
  }

  componentWillUnmount() {
    this.disposer && this.disposer()
  }

  fetchDetail = () => {
    const { params } = this.props.match
    const { name, type } = this.store.workload
    this.workloadStore.setModule(type)
    this.fedWorkloadDetailStore.setModule(type)

    this.workloadStore.fetchDetail({ ...params, name })
    this.fedWorkloadDetailStore.fetchDetail({ ...params, name })
  }

  render() {
    const { match } = this.props

    if (this.workloadStore.isLoading) {
      return null
    }

    return (
      <div className={styles.main}>
        <WorkloadResourceStatus
          detailStore={this.workloadStore}
          fedDetailStore={this.fedWorkloadDetailStore}
          match={match}
          noPorts
        />
      </div>
    )
  }
}
