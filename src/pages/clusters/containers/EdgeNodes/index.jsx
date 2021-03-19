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
import { isEmpty, get } from 'lodash'
import { Tooltip, Icon } from '@kube-design/components'

import { cpuFormat, memoryFormat } from 'utils'
import { ICON_TYPES, NODE_STATUS } from 'utils/constants'
import { getNodeStatus } from 'utils/node'
import { getValueByUnit } from 'utils/monitoring'
import EdgeNodeStore from 'stores/edgenode'
import NodeMonitoringStore from 'stores/monitoring/node'

import { withClusterList, ListPage } from 'components/HOCs/withList'

import { Avatar, Status, Text } from 'components/Base'
import Banner from 'components/Cards/Banner'
import Table from 'components/Tables/List'

import { toJS } from 'mobx'
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

@withClusterList({
  store: new EdgeNodeStore(),
  name: 'Edge Node',
  module: 'edgenodes',
})
export default class EdgeNodes extends React.Component {
  store = this.props.store

  monitoringStore = new NodeMonitoringStore({ cluster: this.cluster })

  get cluster() {
    return this.props.match.params.cluster
  }

  get itemActions() {
    const { store, clusterStore, routing, trigger, name } = this.props
    return [
      {
        key: 'uncordon',
        icon: 'start',
        text: t('Uncordon'),
        action: 'edit',
        show: item =>
          item.importStatus === 'success' && this.getUnschedulable(item),
        onClick: item => store.uncordon(item).then(routing.query),
      },
      {
        key: 'cordon',
        icon: 'stop',
        text: t('Cordon'),
        action: 'edit',
        show: item =>
          item.importStatus === 'success' && !this.getUnschedulable(item),
        onClick: item => store.cordon(item).then(routing.query),
      },
      {
        key: 'logs',
        icon: 'eye',
        text: t('Show Logs'),
        action: 'edit',
        show: item => item.importStatus !== 'success',
        onClick: () =>
          trigger('node.add.log', { detail: toJS(clusterStore.detail) }),
      },
      {
        key: 'delete',
        icon: 'trash',
        text: t('Delete'),
        action: 'delete',
        show: item => item.importStatus === 'failed',
        onClick: item =>
          trigger('resource.delete', {
            type: t(name),
            detail: item,
            success: routing.query,
          }),
      },
    ]
  }

  get tableActions() {
    const { trigger, routing, tableProps } = this.props
    const actions = []

    actions.push({
      key: 'add',
      type: 'control',
      text: t('Add Node'),
      action: 'create',
      onClick: () =>
        trigger('node.edge.add', {
          cluster: this.cluster,
          store: this.store,
        }),
    })

    return {
      ...tableProps.tableActions,
      actions,
      selectActions: [
        {
          key: 'taint',
          type: 'default',
          text: t('Taint Management'),
          action: 'edit',
          onClick: () =>
            trigger('node.taint.batch', {
              success: routing.query,
            }),
        },
      ],
    }
  }

  get tips() {
    return [
      {
        title: t('WHAT_IS_NODE_TAINTS_Q'),
        description: t('WHAT_IS_NODE_TAINTS_A'),
      },
    ]
  }

  getData = async params => {
    await this.store.fetchList({
      ...params,
      ...this.props.match.params,
      type: 'edgenode',
    })

    await this.monitoringStore.fetchMetrics({
      ...this.props.match.params,
      resources: this.store.list.data.map(node => node.name),
      metrics: Object.values(MetricTypes),
      last: true,
    })
  }

  getUnschedulable = record => {
    const taints = record.taints

    return taints.some(
      taint => taint.key === 'node.kubernetes.io/unschedulable'
    )
  }

  getLastValue = (node, type, unit) => {
    const metricsData = this.monitoringStore.data
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

  getStatus() {
    return NODE_STATUS.map(status => ({
      text: t(status.text),
      value: status.value,
    }))
  }

  getColumns = () => {
    const { module, prefix, getSortOrder, getFilteredValue } = this.props
    return [
      {
        title: t('Name'),
        dataIndex: 'name',
        sorter: true,
        sortOrder: getSortOrder('name'),
        search: true,
        render: (name, record) => (
          <Avatar
            icon={ICON_TYPES[module]}
            iconSize={40}
            to={record.importStatus !== 'success' ? null : `${prefix}/${name}`}
            title={name}
            desc={record.ip}
          />
        ),
      },
      {
        title: t('Status'),
        dataIndex: 'status',
        filters: this.getStatus(),
        filteredValue: getFilteredValue('status'),
        isHideable: true,
        search: true,
        render: (_, record) => {
          const status = getNodeStatus(record)
          const taints = record.taints

          return (
            <div className={styles.status}>
              <Status
                type={status}
                name={t(`NODE_STATUS_${status.toUpperCase()}`)}
              />
              {!isEmpty(taints) && record.importStatus === 'success' && (
                <Tooltip content={this.renderTaintsTip(taints)}>
                  <span className={styles.taints}>{taints.length}</span>
                </Tooltip>
              )}
            </div>
          )
        },
      },
      {
        title: t('Role'),
        dataIndex: 'role',
        isHideable: true,
        search: true,
        render: roles => roles.join(','),
      },
      {
        title: t('CPU'),
        key: 'cpu',
        isHideable: true,
        render: record => {
          const metrics = this.getRecordMetrics(record, [
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
                  {metrics.cpu_utilisation >= 0.9 && (
                    <Icon name="exclamation" />
                  )}
                </div>
              }
              description={`${metrics.cpu_used}/${metrics.cpu_total} Core`}
            />
          )
        },
      },
      {
        title: t('Memory'),
        key: 'memory',
        isHideable: true,
        render: record => {
          const metrics = this.getRecordMetrics(record, [
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
                  <span>{`${Math.round(
                    metrics.memory_utilisation * 100
                  )}%`}</span>
                  {metrics.memory_utilisation >= 0.9 && (
                    <Icon name="exclamation" />
                  )}
                </div>
              }
              description={`${metrics.memory_used}/${metrics.memory_total} Gi`}
            />
          )
        },
      },
      {
        title: t('Pods'),
        key: 'pods',
        isHideable: true,
        render: record => {
          const metrics = this.getRecordMetrics(record, [
            {
              type: 'pod_used',
            },
            {
              type: 'pod_total',
            },
          ])
          const uitilisation = metrics.pod_total
            ? parseFloat(metrics.pod_used / metrics.pod_total)
            : 0

          return (
            <Text
              title={`${Math.round(uitilisation * 100)}%`}
              description={`${metrics.pod_used}/${metrics.pod_total}`}
            />
          )
        },
      },
      {
        title: t('Allocated CPU'),
        key: 'allocated_resources_cpu',
        isHideable: true,
        render: this.renderCPUTooltip,
      },
      {
        title: t('Allocated Memory'),
        key: 'allocated_resources_memory',
        isHideable: true,
        render: this.renderMemoryTooltip,
      },
    ]
  }

  renderCPUTooltip = record => {
    const content = (
      <p>
        {t('Resource Limits')}:{' '}
        {cpuFormat(get(record, 'annotations["node.kubesphere.io/cpu-limits"]'))}{' '}
        Core (
        {get(record, 'annotations["node.kubesphere.io/cpu-limits-fraction"]')})
      </p>
    )
    return (
      <Tooltip content={content} placement="top">
        <Text
          title={`${cpuFormat(
            get(record, 'annotations["node.kubesphere.io/cpu-requests"]')
          )} Core (${get(
            record,
            'annotations["node.kubesphere.io/cpu-requests-fraction"]'
          )})`}
          description={t('Resource Requests')}
        />
      </Tooltip>
    )
  }

  renderMemoryTooltip = record => {
    const content = (
      <p>
        {t('Resource Limits')}:{' '}
        {memoryFormat(
          get(record, 'annotations["node.kubesphere.io/memory-limits"]'),
          'Gi'
        )}{' '}
        Gi (
        {get(
          record,
          'annotations["node.kubesphere.io/memory-limits-fraction"]'
        )}
        )
      </p>
    )
    return (
      <Tooltip content={content} placement="top">
        <Text
          title={`${memoryFormat(
            get(record, 'annotations["node.kubesphere.io/memory-requests"]'),
            'Gi'
          )} Gi (${get(
            record,
            'annotations["node.kubesphere.io/memory-requests-fraction"]'
          )})`}
          description={t('Resource Requests')}
        />
      </Tooltip>
    )
  }

  showCreate = () => {
    const { query, match, module } = this.props
    return this.props.trigger('workload.create', {
      module,
      namespace: query.namespace,
      cluster: match.params.cluster,
    })
  }

  render() {
    const { bannerProps, tableProps } = this.props
    const isLoadingMonitor = this.monitoringStore.isLoading

    return (
      <ListPage {...this.props} getData={this.getData} noWatch>
        <Banner {...bannerProps} tips={this.tips} />
        <Table
          {...tableProps}
          onCreate={this.showCreate}
          itemActions={this.itemActions}
          tableActions={this.tableActions}
          columns={this.getColumns()}
          isLoading={tableProps.isLoading || isLoadingMonitor}
        />
      </ListPage>
    )
  }
}
