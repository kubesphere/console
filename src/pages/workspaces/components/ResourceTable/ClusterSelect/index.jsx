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
import { observer, inject } from 'mobx-react'
import { withRouter } from 'react-router'
import { SearchSelect } from 'components/Base'
import ClusterStore from 'stores/cluster'

import styles from './index.scss'

@withRouter
@inject('rootStore')
@observer
export default class ClusterSelect extends Component {
  clusterStore = new ClusterStore()

  routing = this.props.rootStore.routing

  componentDidMount() {
    this.fetchClusters()
  }

  get clusters() {
    return this.clusterStore.list.data.map(item => ({
      label: item.name,
      value: item.name,
    }))
  }

  get hostCluster() {
    const cluster = this.clusterStore.list.data.find(item => item.isHost) || {}
    return cluster.name || ''
  }

  fetchClusters = (params = {}) =>
    this.clusterStore.fetchList({
      ...params,
    })

  handleChange = cluster => {
    const { module } = this.props
    const { workspace } = this.props.match.params

    this.routing.push(`/workspaces/${workspace}/${module}?cluster=${cluster}`)
  }

  render() {
    const { cluster = this.hostCluster } = this.props

    return (
      <SearchSelect
        className={styles.select}
        value={cluster}
        onChange={this.handleChange}
        options={this.clusters}
        page={this.clusterStore.list.page}
        total={this.clusterStore.list.total}
        currentLength={this.clusterStore.list.data.length}
        isLoading={this.clusterStore.list.isLoading}
        onFetch={this.fetchClusters}
      />
    )
  }
}
