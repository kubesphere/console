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
import { inject, observer } from 'mobx-react'
import { get, isEmpty } from 'lodash'

import NodeMonitoringStore from 'stores/monitoring/node'

import { cpuFormat, memoryFormat } from 'utils'

import { Panel, Text } from 'components/Base'
import MonitorTab from 'components/Cards/Monitoring/MonitorTab'
import ConditionCard from './ConditionCard'
import TaintCard from './TaintCard'

import styles from './index.scss'

const METRIC_TYPES = [
  'node_cpu_utilisation',
  'node_memory_utilisation',
  'node_disk_size_utilisation',
  'node_pod_utilisation',
]

@inject('detailStore')
@observer
export default class RunningStatus extends React.Component {
  constructor(props) {
    super(props)

    this.store = props.detailStore
    this.monitoringStore = new NodeMonitoringStore({ cluster: this.cluster })
  }

  get cluster() {
    return this.props.match.params.cluster
  }

  componentDidMount() {
    this.fetchData()
  }

  fetchData() {
    const { name, role = [] } = this.store.detail

    this.monitoringStore.fetchMetrics({
      resources: [name],
      metrics: METRIC_TYPES,
      step: '180s',
      fillZero: !role.includes('edge'),
    })
  }

  renderResourceStatus() {
    const metrics = toJS(this.monitoringStore.data)
    return (
      <Panel
        className={styles.resources}
        title={t('Resource Usage Status')}
        loading={this.monitoringStore.isLoading}
      >
        <MonitorTab
          tabs={[
            {
              key: 'cpu',
              icon: 'cpu',
              unit: '%',
              legend: ['node_cpu_utilisation'],
              title: t('node_cpu_utilisation'),
              data: get(metrics, 'node_cpu_utilisation.data.result'),
            },
            {
              key: 'memory',
              icon: 'memory',
              unit: '%',
              legend: ['node_memory_utilisation'],
              title: t('node_memory_utilisation'),
              data: get(metrics, 'node_memory_utilisation.data.result'),
            },
            {
              key: 'pod',
              icon: 'pod',
              unit: '%',
              legend: ['node_pod_utilisation'],
              title: t('node_pod_utilisation'),
              data: get(metrics, 'node_pod_utilisation.data.result'),
            },
            {
              key: 'storage',
              icon: 'database',
              unit: '%',
              legend: ['node_disk_size_utilisation'],
              title: t('node_disk_size_utilisation'),
              data: get(metrics, 'node_disk_size_utilisation.data.result'),
            },
          ]}
        />
      </Panel>
    )
  }

  renderAllocatedResources() {
    const { detail } = this.store

    return (
      <Panel className={styles.allocated} title={t('Allocated Resources')}>
        <Text
          title={`${cpuFormat(
            get(detail, 'annotations["node.kubesphere.io/cpu-requests"]')
          )} Core (${get(
            detail,
            'annotations["node.kubesphere.io/cpu-requests-fraction"]'
          )})`}
          description={t('CPU Requests')}
        />
        <Text
          title={`${cpuFormat(
            get(detail, 'annotations["node.kubesphere.io/cpu-limits"]')
          )} Core (${get(
            detail,
            'annotations["node.kubesphere.io/cpu-limits-fraction"]'
          )})`}
          description={t('CPU Limits')}
        />
        <Text
          title={`${memoryFormat(
            get(detail, 'annotations["node.kubesphere.io/memory-requests"]'),
            'Gi'
          )} Gi (${get(
            detail,
            'annotations["node.kubesphere.io/memory-requests-fraction"]'
          )})`}
          description={t('Memory Requests')}
        />
        <Text
          title={`${memoryFormat(
            get(detail, 'annotations["node.kubesphere.io/memory-limits"]'),
            'Gi'
          )} Gi (${get(
            detail,
            'annotations["node.kubesphere.io/memory-limits-fraction"]'
          )})`}
          description={t('Memory Limits')}
        />
      </Panel>
    )
  }

  renderConditions() {
    const { conditions } = this.store.detail

    return (
      <Panel title={t('Health Status')}>
        <div className={styles.conditions}>
          {conditions.map((condition, i) => (
            <ConditionCard key={condition.type || i} data={condition} />
          ))}
        </div>
      </Panel>
    )
  }

  renderTanits() {
    const { taints } = this.store.detail

    if (isEmpty(taints)) return null

    return (
      <Panel title={t('Taints')} empty={t('NO_TAINTS_TIPS')}>
        {taints && (
          <div>
            {taints.map((taint, i) => (
              <TaintCard key={taint.type || i} data={taint} />
            ))}
          </div>
        )}
      </Panel>
    )
  }

  render() {
    return (
      <div className={styles.main}>
        {this.renderResourceStatus()}
        {this.renderAllocatedResources()}
        {this.renderConditions()}
        {this.renderTanits()}
      </div>
    )
  }
}
