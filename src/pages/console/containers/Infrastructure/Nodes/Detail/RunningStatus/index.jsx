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
import { observer } from 'mobx-react'
import { isEmpty, get } from 'lodash'

import { getValueByUnit } from 'utils/monitoring'
import NodeMonitoringStore from 'stores/monitoring/node'

import { Card } from 'components/Base'
import { StatusCircle } from 'components/Cards/Monitoring'
import ConditionCard from './ConditionCard'
import TaintCard from './TaintCard'

import styles from './index.scss'

const MetricTypes = {
  cpu_used: 'node_cpu_usage',
  cpu_total: 'node_cpu_total',
  memory_used: 'node_memory_usage_wo_cache',
  memory_total: 'node_memory_total',
  disk_size_usage: 'node_disk_size_usage',
  disk_size_capacity: 'node_disk_size_capacity',
  pod_used: 'node_pod_running_count',
  pod_total: 'node_pod_quota',
}

@observer
class RunningStatus extends React.Component {
  constructor(props) {
    super(props)

    this.module = props.module
    this.store = props.detailStore
    this.monitoringStore = new NodeMonitoringStore()

    this.fetchData()
  }

  fetchData() {
    const { name } = this.store.detail

    this.monitoringStore.fetchMetrics({
      resources: [name],
      metrics: Object.values(MetricTypes),
      last: true,
    })
  }

  getLastValue = (type, unit) => {
    const metrics = toJS(this.monitoringStore.data)

    return getValueByUnit(
      get(metrics, `${type}.data.result[0].value[1]`, 0),
      unit
    )
  }

  renderResourceStatus() {
    return (
      <Card
        title={t('Resource Status')}
        loading={this.monitoringStore.isLoading}
      >
        <div className={styles.charts}>
          <div>
            <StatusCircle
              key="cpu"
              name={t('CPU Utilization')}
              used={this.getLastValue(MetricTypes.cpu_used, 'core')}
              total={this.getLastValue(MetricTypes.cpu_total, 'core')}
              unit={t('core')}
              showRate
            />
          </div>
          <div>
            <StatusCircle
              key="memory"
              name={t('Memory Utilization')}
              used={this.getLastValue(MetricTypes.memory_used, 'GiB')}
              total={this.getLastValue(MetricTypes.memory_total, 'GiB')}
              unit={t('GiB')}
              showRate
            />
          </div>
          <div>
            <StatusCircle
              key="disk"
              name={t('Local Storage')}
              legend={['Used', 'Capacity']}
              used={this.getLastValue(MetricTypes.disk_size_usage, 'GB')}
              total={this.getLastValue(MetricTypes.disk_size_capacity, 'GB')}
              unit={t('GB')}
              showRate
            />
          </div>
          <div>
            <StatusCircle
              key="pod"
              name={t('Pod Usage')}
              legend={['Used', 'Capacity']}
              used={this.getLastValue(MetricTypes.pod_used, 'default')}
              total={this.getLastValue(MetricTypes.pod_total, 'default')}
              showRate
            />
          </div>
        </div>
      </Card>
    )
  }

  renderConditions() {
    const { conditions } = toJS(this.store.detail)

    return (
      <Card title={t('Node Status')}>
        {conditions.map((condition, i) => (
          <ConditionCard key={condition.type || i} data={condition} />
        ))}
      </Card>
    )
  }

  renderTanits() {
    const { taints } = toJS(this.store.detail)

    if (isEmpty(taints)) return null

    return (
      <Card title={t('Taints')} empty={t('NO_TAINTS_TIPS')}>
        {taints && (
          <div>
            {taints.map((taint, i) => (
              <TaintCard key={taint.type || i} data={taint} />
            ))}
          </div>
        )}
      </Card>
    )
  }

  render() {
    return (
      <div className={styles.main}>
        {this.renderResourceStatus()}
        {this.renderConditions()}
        {this.renderTanits()}
      </div>
    )
  }
}

export default RunningStatus
