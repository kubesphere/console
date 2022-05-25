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
import { get } from 'lodash'
import { Select } from '@kube-design/components'
import ContainerMonitorStore from 'stores/monitoring/container'
import { observer } from 'mobx-react'
import styles from './index.scss'
import PhysicalResourceItem from '../../../../Overview/ResourceUsage/PhysicalResourceItem'

const MetricTypes = {
  cpu_usage: 'container_cpu_usage',
  memory_usage: 'container_memory_usage_wo_cache',
}

@observer
export default class Containers extends Component {
  constructor(props) {
    super(props)
    this.state = {
      podsId: '',
      containerName: '',
    }
    this.monitorStore = new ContainerMonitorStore()
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const podsId = get(nextProps.detail, 'id', '')

    if (podsId !== prevState.podsId) {
      return {
        containerName: '',
        podsId,
      }
    }

    return null
  }

  get podName() {
    const children = get(this.props.detail, 'children', []).filter(
      item => item.label === 'Pods'
    )
    return children.length > 0 ? children[0].nodes[0].label : ''
  }

  get containers() {
    return get(this.props.detail, 'children', []).filter(item => {
      return item.label === 'Containers'
    })
  }

  get cpuMetric() {
    const { containerName } = this.state
    const { data: metrics } = this.monitorStore

    return containerName === ''
      ? []
      : get(metrics, `${MetricTypes.cpu_usage}.data.result`)
  }

  get memoryMetric() {
    const { containerName } = this.state
    const { data: metrics } = this.monitorStore

    return containerName === ''
      ? []
      : get(metrics, `${MetricTypes.memory_usage}.data.result`)
  }

  fetchData = () => {
    const { containerName } = this.state
    const { cluster, namespace } = this.props.match.params
    this.monitorStore.fetchMetrics({
      cluster,
      namespace,
      container: containerName,
      podName: this.podName,
      metrics: Object.values(MetricTypes),
    })
  }

  getOptions(container) {
    if (container.length > 0) {
      const needOmitLabel = ['POD']
      container[0].nodes = container[0].nodes.filter(
        node => needOmitLabel.indexOf(node.label) === -1
      )
    }
    const con =
      container.length > 0
        ? [
            ...container[0].nodes.map(item => ({
              label: item.label,
              value: item.label,
              icon: 'docker',
            })),
          ]
        : []
    const result = []
    const obj = {}
    for (let i = 0; i < con.length; i++) {
      if (!obj[con[i].label]) {
        result.push(con[i])
        obj[con[i].label] = true
      }
    }
    return result
  }

  handleContainerChange = value => {
    this.setState(
      {
        containerName: value,
      },
      () => {
        this.fetchData()
      }
    )
  }

  render() {
    const { isLoading, isRefreshing } = this.monitorStore
    const { containerName } = this.state

    return (
      <div className={styles.container}>
        <Select
          className={styles.containerSelect}
          options={this.getOptions(this.containers)}
          onChange={this.handleContainerChange}
          value={containerName}
        />
        <div>
          <PhysicalResourceItem
            type="cpu"
            title="CPU Usage(m)"
            metrics={this.cpuMetric}
            isLoading={isLoading || isRefreshing}
            showDay={172800}
          />
          <PhysicalResourceItem
            type="memory"
            title="Memory Usage(Mi)"
            metrics={this.memoryMetric}
            isLoading={isLoading || isRefreshing}
            showDay={172800}
          />
        </div>
      </div>
    )
  }
}
