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
        title={t('RESOURCE_USAGE')}
        loading={this.monitoringStore.isLoading}
      >
        <MonitorTab
          tabs={[
            {
              key: 'cpu',
              icon: 'cpu',
              unit: '%',
              legend: ['CPU_USAGE'],
              title: 'CPU_USAGE',
              data: get(metrics, 'node_cpu_utilisation.data.result'),
            },
            {
              key: 'memory',
              icon: 'memory',
              unit: '%',
              legend: ['MEMORY_USAGE'],
              title: 'MEMORY_USAGE',
              data: get(metrics, 'node_memory_utilisation.data.result'),
            },
            {
              key: 'pod',
              icon: 'pod',
              unit: '%',
              legend: ['MAXIMUM_PODS'],
              title: 'MAXIMUM_PODS',
              data: get(metrics, 'node_pod_utilisation.data.result'),
            },
            {
              key: 'storage',
              icon: 'database',
              unit: '%',
              legend: ['DISK_USAGE'],
              title: 'DISK_USAGE',
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
      <Panel className={styles.allocated} title={t('ALLOCATED_RESOURCES')}>
        <Text
          title={
            cpuFormat(
              get(detail, 'annotations["node.kubesphere.io/cpu-requests"]')
            ) === 1
              ? t('CPU_CORE_PERCENT_SI', {
                  core: cpuFormat(
                    get(
                      detail,
                      'annotations["node.kubesphere.io/cpu-requests"]'
                    )
                  ),
                  percent: get(
                    detail,
                    'annotations["node.kubesphere.io/cpu-requests-fraction"]'
                  ),
                })
              : t('CPU_CORE_PERCENT_PL', {
                  core: cpuFormat(
                    get(
                      detail,
                      'annotations["node.kubesphere.io/cpu-requests"]'
                    )
                  ),
                  percent: get(
                    detail,
                    'annotations["node.kubesphere.io/cpu-requests-fraction"]'
                  ),
                })
          }
          description={t('CPU_REQUEST_SCAP')}
        />
        <Text
          title={
            cpuFormat(
              get(detail, 'annotations["node.kubesphere.io/cpu-limits"]')
            ) === 1
              ? t('CPU_CORE_PERCENT_SI', {
                  core: cpuFormat(
                    get(detail, 'annotations["node.kubesphere.io/cpu-limits"]')
                  ),
                  percent: get(
                    detail,
                    'annotations["node.kubesphere.io/cpu-limits-fraction"]'
                  ),
                })
              : t('CPU_CORE_PERCENT_PL', {
                  core: cpuFormat(
                    get(detail, 'annotations["node.kubesphere.io/cpu-limits"]')
                  ),
                  percent: get(
                    detail,
                    'annotations["node.kubesphere.io/cpu-limits-fraction"]'
                  ),
                })
          }
          description={t('CPU_LIMIT_SCAP')}
        />
        <Text
          title={t('MEMORY_GIB_PERCENT', {
            gib: memoryFormat(
              get(detail, 'annotations["node.kubesphere.io/memory-requests"]'),
              'Gi'
            ),
            percent: get(
              detail,
              'annotations["node.kubesphere.io/memory-requests-fraction"]'
            ),
          })}
          description={t('MEMORY_REQUEST_SCAP')}
        />
        <Text
          title={t('MEMORY_GIB_PERCENT', {
            gib: memoryFormat(
              get(detail, 'annotations["node.kubesphere.io/memory-limits"]'),
              'Gi'
            ),
            percent: get(
              detail,
              'annotations["node.kubesphere.io/memory-limits-fraction"]'
            ),
          })}
          description={t('MEMORY_LIMIT_SCAP')}
        />
      </Panel>
    )
  }

  renderConditions() {
    const { conditions } = this.store.detail

    return (
      <Panel title={t('HEALTH_STATUS')}>
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
      <Panel title={t('TAINTS')} empty={t('NO_TAINTS_TIPS')}>
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
