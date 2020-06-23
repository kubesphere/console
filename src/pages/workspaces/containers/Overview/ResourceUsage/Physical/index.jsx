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

import { observer, inject } from 'mobx-react'
import { get } from 'lodash'
import React from 'react'

import { Select } from '@pitrix/lego-ui'
import WorkspaceMonitorStore from 'stores/monitoring/workspace'

import { Component as Base } from 'clusters/containers/Monitor/Resource/Usage/Physical'

import styles from './index.scss'

const MetricTypes = {
  cpu_usage: 'workspace_cpu_usage',
  memory_usage: 'workspace_memory_usage_wo_cache',
  disk_usage: 'workspace_disk_size_usage',
}

@inject('rootStore')
@observer
export default class PhysicalResource extends Base {
  state = {
    cluster: this.props.defaultCluster,
  }

  handleClusterChange = cluster => {
    this.setState({ cluster }, this.fetchData)
  }

  get workspace() {
    return this.props.workspace
  }

  get createTime() {
    return get(this.props.rootStore, 'workspace.detail.createTime')
  }

  init() {
    this.monitorStore = new WorkspaceMonitorStore()
  }

  getMonitoringCfgs = () => [
    {
      type: 'cpu',
      title: 'CPU Usage',
      unitType: 'cpu',
      legend: ['CPU'],
      metricType: MetricTypes.cpu_usage,
    },
    {
      type: 'memory',
      title: 'Memory Usage',
      unitType: 'memory',
      legend: ['Memory'],
      metricType: MetricTypes.memory_usage,
    },
  ]

  getControllerProps = () => ({
    title: t('Physical Resources Usage'),
    createTime: this.createTime,
    customAction: this.renderClusters(),
  })

  valueRenderer = option => `${t('Cluster')}: ${option.value}`

  renderClusters() {
    if (this.props.clusterOpts.length) {
      return (
        <Select
          className={styles.clusterSelector}
          value={this.state.cluster}
          options={this.props.clusterOpts}
          onChange={this.handleClusterChange}
          valueRenderer={this.valueRenderer}
        />
      )
    }
  }

  fetchData = params => {
    this.monitorStore.cluster = this.state.cluster

    this.monitorStore.fetchMetrics({
      workspace: this.workspace,
      metrics: Object.values(MetricTypes),
      ...params,
    })
  }
}
