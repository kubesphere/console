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
import { get, isEmpty } from 'lodash'
import { Button, Alert, RadioButton, RadioGroup } from '@kube-design/components'
import { ScrollLoad } from 'components/Base'

import NodeStore from 'stores/node'
import EdgeNodeStore from 'stores/edgenode'
import NodeMonitoringStore from 'stores/monitoring/node'

import NodeItem from './Item'

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

@observer
export default class NodeSelect extends React.PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      type: 'node',
      selectItem: {},
    }

    const { cluster } = this.props

    this.nodeStore = new NodeStore()
    this.edgeNodeStore = new EdgeNodeStore()
    this.monitoringStore = new NodeMonitoringStore({ cluster })

    this.store = {
      node: this.nodeStore,
      edgenode: this.edgeNodeStore,
    }
  }

  get edgeDisabled() {
    const { cluster } = this.props
    return globals.app.hasClusterModule(cluster, 'kubeedge')
  }

  handleTypeChange = async type => {
    await this.fetchData({ type })
    this.setState({ type })
  }

  async componentDidMount() {
    await this.fetchData({ type: this.state.type })
  }

  fetchData = async ({ type, ...params }) => {
    const { cluster, namespace } = this.props

    await this.store[type].fetchList({ cluster, type, namespace, ...params })
    await this.monitoringStore.fetchMetrics({
      resources: this.store[type].list.data.map(node => node.name),
      metrics: Object.values(MetricTypes),
      last: true,
    })
  }

  handleSelect = item => {
    this.setState({ selectItem: item })
  }

  handleCancel = () => {
    this.setState({ selectItem: {} }, () => {
      this.props.onCancel()
    })
  }

  handleOK = () => {
    const { onSelect } = this.props
    const { selectItem } = this.state
    const label = {
      'kubernetes.io/hostname': get(
        selectItem,
        'labels["kubernetes.io/hostname"]'
      ),
    }

    onSelect(label)
  }

  renderRadio = () => {
    const { type } = this.state

    return this.edgeDisabled ? (
      <RadioGroup
        mode="button"
        buttonWidth={120}
        value={type}
        onChange={this.handleTypeChange}
        size="small"
      >
        <RadioButton value="node">{t('Cluster Nodes')}</RadioButton>
        <RadioButton value="edgenode">{t('Edge Nodes')}</RadioButton>
      </RadioGroup>
    ) : null
  }

  render() {
    const { type, selectItem } = this.state
    const { data, total, page, isLoading } = toJS(this.store[type].list)
    const metricsData = toJS(this.monitoringStore).data

    if (isEmpty(metricsData)) {
      return null
    }

    return (
      <div className={styles.container}>
        <div className={styles.body}>
          <Alert
            className="margin-b8"
            message={t('SPECIFY_NODE_DESC')}
            hideIcon
          />
          {this.renderRadio()}
          <div className={styles.nodes}>
            <ScrollLoad
              data={data}
              total={total}
              page={page}
              loading={isLoading}
              onFetch={param => this.fetchData({ type, ...param })}
            >
              {data.map((item, index) => (
                <NodeItem
                  key={`${item.uid}${index}`}
                  module={type}
                  detail={item}
                  metricsData={metricsData}
                  onClick={this.handleSelect}
                  selected={selectItem.uid === item.uid}
                />
              ))}
            </ScrollLoad>
          </div>
        </div>
        <div className={styles.footer}>
          <Button onClick={this.handleCancel}>{t('Cancel')}</Button>
          <Button type="control" onClick={this.handleOK}>
            {t('OK')}
          </Button>
        </div>
      </div>
    )
  }
}
