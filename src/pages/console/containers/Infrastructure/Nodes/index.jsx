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
import { isEmpty, get } from 'lodash'

import { ICON_TYPES, NODE_STATUS } from 'utils/constants'
import { getNodeRoles, getNodeStatus } from 'utils/node'
import { getValueByUnit } from 'utils/monitoring'
import NodeStore from 'stores/node'
import NodeMonitoringStore from 'stores/monitoring/node'

import Base from 'core/containers/Base/List'
import { Icon, Menu, Tooltip } from '@pitrix/lego-ui'
import { Avatar, Status, Notify, Panel, Text } from 'components/Base'
import Banner from 'components/Cards/Banner'
import TaintsManageModal from 'components/Modals/Node/TaintManagement/Batch'

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

@inject('rootStore')
@observer
class Nodes extends Base {
  init() {
    this.store = new NodeStore()
    this.monitoringStore = new NodeMonitoringStore()

    this.state = {
      taintsManagement: false,
      deleteModal: false,
      selectItem: {},
      metricsData: {},
    }
  }

  componentDidMount() {
    super.componentDidMount()
    this.store.fetchCount()
  }

  get module() {
    return 'nodes'
  }

  get name() {
    return 'Node'
  }

  get tips() {
    return [
      {
        title: t('NODE_TYPES_Q'),
        description: t('NODE_TYPES_A'),
      },
      {
        title: t('WHAT_IS_NODE_TAINTS_Q'),
        description: t('WHAT_IS_NODE_TAINTS_A'),
      },
    ]
  }

  async getData(params) {
    await this.store.fetchList(params)
    await this.monitoringStore
      .fetchMetrics({
        resources: this.store.list.data.map(node => node.name),
        metrics: Object.values(MetricTypes),
        last: true,
      })
      .then(() => {
        this.setState({
          metricsData: toJS(this.monitoringStore.data),
        })
      })
  }

  getUnschedulable = record => {
    const taints = record.taints

    return taints.some(
      taint => taint.key === 'node.kubernetes.io/unschedulable'
    )
  }

  getLastValue = (node, type, unit) => {
    const { metricsData } = this.state
    const result = get(metricsData[type], 'data.result') || []
    const metrics = result.find(
      item => get(item, 'metric.resource_name') === node.name
    )

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

  getTableProps() {
    return {
      ...Base.prototype.getTableProps.call(this),
      onCreate: null,
      selectActions: [
        {
          key: 'taint',
          type: 'default',
          text: t('Taint Management'),
          action: 'edit',
          onClick: this.showModal('taintsManagement'),
        },
        {
          key: 'delete',
          type: 'danger',
          text: t('Delete'),
          action: 'delete',
          onClick: this.showModal('batchDeleteModal'),
        },
      ],
      alwaysUpdate: true,
    }
  }

  handleTaintsManagement = nodes => {
    this.store.batchPatchTaints(nodes).then(() => {
      this.hideModal('taintsManagement')()
      Notify.success({ content: `${t('Updated Successfully')}!` })
      this.routing.query()
    })
  }

  handleDelete = () => {
    const { selectItem } = this.state
    this.store
      .delete(selectItem)
      .then(this.getData)
      .then(() => {
        this.setState({ showDelete: false })
      })
  }

  handleMoreMenuClick = record => (e, key, value) => {
    switch (value) {
      case 'uncordon':
        this.store.uncordon(record).then(() => {
          setTimeout(this.handleFetch, 0)
        })
        break
      case 'cordon':
        this.store.cordon(record).then(() => {
          setTimeout(this.handleFetch, 0)
        })
        break
      case 'delete':
        this.setState({ deleteModal: true, selectItem: record })
        break
      default:
        break
    }
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

  renderMoreMenu = record => (
    <Menu onClick={this.handleMoreMenuClick(record)}>
      {this.enabledActions.includes('edit') &&
        (this.getUnschedulable(record) ? (
          <Menu.MenuItem value="uncordon">
            <Icon name="start" /> {t('Uncordon')}
          </Menu.MenuItem>
        ) : (
          <Menu.MenuItem value="cordon">
            <Icon name="stop" /> {t('Cordon')}
          </Menu.MenuItem>
        ))}
      {getNodeRoles(record.labels).includes('master') &&
        this.enabledActions.includes('delete') && (
          <Menu.MenuItem value="delete">
            <Icon name="trash" /> {t('Delete')}
          </Menu.MenuItem>
        )}
    </Menu>
  )

  getStatus() {
    return NODE_STATUS.map(status => ({
      text: t(status.text),
      value: status.value,
    }))
  }

  getColumns = () => [
    {
      title: t('Name'),
      dataIndex: 'name',
      sorter: true,
      sortOrder: this.getSortOrder('name'),
      search: true,
      render: (name, record) => (
        <Avatar
          icon={ICON_TYPES[this.module]}
          iconSize={40}
          to={`${this.prefix}/${name}`}
          title={name}
          desc={record.ip}
        />
      ),
    },
    {
      title: t('Status'),
      dataIndex: 'status',
      filters: this.getStatus(),
      filteredValue: this.getFilteredValue('status'),
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
            {!isEmpty(taints) && (
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
      title: t('System Version'),
      dataIndex: 'system',
      isHideable: true,
      render: (_, record) => {
        const osVersion = get(record, 'status.nodeInfo.osImage', '')
        const dockerVersion = `Docker ${get(
          record,
          'status.nodeInfo.containerRuntimeVersion',
          ''
        ).replace('docker://', '')}`

        return <Text title={osVersion} description={dockerVersion} />
      },
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
            title={`${Math.round(metrics.cpu_utilisation * 100)}%`}
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
            unit: 'GiB',
          },
          {
            type: 'memory_total',
            unit: 'GiB',
          },
          {
            type: 'memory_utilisation',
          },
        ])

        return (
          <Text
            title={`${Math.round(metrics.memory_utilisation * 100)}%`}
            description={`${metrics.memory_used}/${metrics.memory_total} GiB`}
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
      key: 'more',
      width: 60,
      render: this.renderMore,
    },
  ]

  renderExtraModals() {
    const { taintsManagement } = this.state
    const { data, selectedRowKeys } = toJS(this.store.list)
    const selectedNodes = data.filter(node =>
      selectedRowKeys.includes(node.name)
    )

    return (
      <TaintsManageModal
        visible={taintsManagement}
        nodes={selectedNodes}
        onOk={this.handleTaintsManagement}
        onCancel={this.hideModal('taintsManagement')}
        isSubmitting={this.store.isSubmitting}
      />
    )
  }

  renderOverview() {
    const { masterCount, masterWorkerCount, list } = this.store
    const totalCount = list.total
    const workerCount = Math.max(
      Number(totalCount) - Number(masterCount) + Number(masterWorkerCount),
      0
    )

    return (
      <Panel className="margin-b12">
        <div className={styles.overview}>
          <Text icon="nodes" title={totalCount} description={t('Node Count')} />
          <Text title={masterCount} description={t('Master')} />
          <Text title={workerCount} description={t('Worker')} />
        </div>
      </Panel>
    )
  }

  renderHeader() {
    return (
      <>
        <Banner
          className="margin-b12"
          title={t(this.title)}
          description={t(`${this.name.toUpperCase()}_DESC`)}
          module={this.module}
          tips={this.tips}
        />
        {this.renderOverview()}
      </>
    )
  }
}

export default Nodes
