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
import classNames from 'classnames'
import { Icon, Tooltip } from '@kube-design/components'
import { ICON_TYPES } from 'utils/constants'
import { get, isEmpty } from 'lodash'
import { getNodeStatus } from 'utils/node'
import { Avatar, Status, Text } from 'components/Base'

import { getValueByUnit } from 'utils/monitoring'

import styles from './index.scss'

const MetricTypes = {
  cpu_used: 'node_cpu_usage',
  cpu_total: 'node_cpu_total',
  cpu_utilisation: 'node_cpu_utilisation',
  memory_used: 'node_memory_usage_wo_cache',
  memory_total: 'node_memory_total',
  memory_utilisation: 'node_memory_utilisation',
  pod_used: 'node_pod_running_count',
  pod_total: 'node_pod_quota',
}

export default class NodeItem extends React.Component {
  handleClick = () => {
    const { onClick, detail } = this.props
    onClick(detail)
  }

  renderStatus = detail => {
    const status = getNodeStatus(detail)
    const taints = detail.taints

    return (
      <Text
        title={
          <>
            <Status
              type={status}
              name={t(`NODE_STATUS_${status.toUpperCase()}`)}
            />
            {!isEmpty(taints) && detail.importStatus === 'success' && (
              <Tooltip content={this.renderTaintsTip(taints)}>
                <span className={styles.taints}>{taints.length}</span>
              </Tooltip>
            )}
          </>
        }
        description={t('Status')}
      />
    )
  }

  renderTaintsTip = data => (
    <div>
      <div>{t('Taints')}:</div>
      <div>
        {data.map(item => {
          const text = `${item.key}=${item.value || ''}:${item.effect}`
          return <div key={text}>{text}</div>
        })}
      </div>
    </div>
  )

  getLastValue = (node, type, unit) => {
    const { metricsData } = this.props
    const result = get(metricsData[type], 'data.result') || []
    const metrics = result.find(item => get(item, 'metric.node') === node.name)
    return getValueByUnit(get(metrics, 'value[1]', 0), unit)
  }

  getRecordMetrics = (record, configs) => {
    const metrics = {}
    configs.forEach(cfg => {
      metrics[cfg.type] = parseFloat(
        this.getLastValue(record, MetricTypes[cfg.type], cfg.unit)
      )
    })
    return metrics
  }

  renderCPU = detail => {
    const metrics = this.getRecordMetrics(detail, [
      {
        type: 'cpu_used',
        unit: 'Core',
      },
      {
        type: 'cpu_total',
        unit: 'Core',
      },
      {
        type: 'cpu_utilisation',
      },
    ])

    return (
      <Text
        title={
          <div className={styles.resource}>
            <span>{`${Math.round(metrics.cpu_utilisation * 100)}%`}</span>
            {metrics.cpu_utilisation >= 0.9 && <Icon name="exclamation" />}
          </div>
        }
        description={t('CPU')}
      />
    )
  }

  renderMemory = detail => {
    const metrics = this.getRecordMetrics(detail, [
      {
        type: 'memory_used',
        unit: 'Gi',
      },
      {
        type: 'memory_total',
        unit: 'Gi',
      },
      {
        type: 'memory_utilisation',
      },
    ])

    return (
      <Text
        title={
          <div className={styles.resource}>
            <span>{`${Math.round(metrics.memory_utilisation * 100)}%`}</span>
            {metrics.memory_utilisation >= 0.9 && <Icon name="exclamation" />}
          </div>
        }
        description={t('Memory')}
      />
    )
  }

  render() {
    const { detail, selected } = this.props

    return (
      <div
        className={classNames(styles.item, { [styles.selected]: selected })}
        onClick={this.handleClick}
      >
        <Icon name={ICON_TYPES.nodes} size={20} />
        <div className={styles.ring} />
        <div className={styles.name}>
          <Avatar icon={null} to={null} title={detail.name} desc={detail.ip} />
        </div>
        {this.renderStatus(detail)}
        <div>
          <Text title={<>{detail.role.join(',')}</>} description={t('Role')} />
        </div>
        <div>{this.renderCPU(detail)}</div>
        <div>{this.renderMemory(detail)}</div>
      </div>
    )
  }
}
