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
import { observer, inject } from 'mobx-react'
import classnames from 'classnames'
import { isEmpty, isUndefined, get, omit } from 'lodash'

import { cacheFunc } from 'utils'
import { getAreaChartOps, getZeroValues } from 'utils/monitoring'
import ClusterMonitorStore from 'stores/monitoring/cluster'

import { Controller as MonitoringController } from 'components/Cards/Monitoring'
import { MediumArea } from 'components/Charts'
import ResourceMonitoringModal from 'components/Modals/Monitoring/ApplicationResource'

import styles from './index.scss'

const MetricTypes = {
  cpu_usage: 'cluster_cpu_usage',
  memory_usage: 'cluster_memory_usage_wo_cache',
  disk_usage: 'cluster_disk_size_usage',
}

class PhysicalResource extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      showModal: false,
      selectItem: {},
    }

    this.init()
  }

  get metrics() {
    return this.monitorStore.data
  }

  get cluster() {
    return get(this.props, 'match.params.cluster')
  }

  init() {
    this.monitorStore = new ClusterMonitorStore({
      cluster: this.cluster,
    })
  }

  fetchData = params => {
    this.monitorStore.fetchMetrics({
      metrics: Object.values(MetricTypes),
      ...params,
    })
  }

  isEmptyData = data => {
    if (isEmpty(data)) return true

    const result = Object.values(data).every(item =>
      isEmpty(get(item, 'data.result'))
    )
    return result
  }

  showModal = config =>
    cacheFunc(
      `_showModal_${config.type}`,
      () => {
        if (this.props.workspace) {
          config.workspace = this.props.workspace
        }

        this.setState({
          showModal: true,
          selectItem: {
            ...config,
          },
        })
      },
      this
    )

  hideModal = () => {
    this.setState({
      showModal: false,
      selectItem: {},
    })
  }

  getControllerProps = () => ({})

  getMonitoringCfgs = () => [
    {
      type: 'cpu',
      title: 'CPU',
      unitType: 'cpu',
      legend: ['USAGE'],
      metricType: MetricTypes.cpu_usage,
    },
    {
      type: 'memory',
      title: 'MEMORY',
      unitType: 'memory',
      legend: ['USAGE'],
      metricType: MetricTypes.memory_usage,
    },
  ]

  renderCard() {
    const { isLoading, isRefreshing } = this.monitorStore
    const configs = this.getMonitoringCfgs()

    return (
      <MonitoringController
        title={t('CLUSTER_RESOURCE_USAGE')}
        step="1h"
        times={24}
        onFetch={this.fetchData}
        loading={isLoading}
        refreshing={isRefreshing}
        isEmpty={this.isEmptyData(this.metrics)}
        {...this.getControllerProps()}
      >
        <div className={styles.content}>
          {configs.map(item => {
            const ops = omit(item, ['onClick'])
            const itemEvent = isUndefined(item.onClick)
              ? this.showModal(ops)
              : item.onClick && item.onClick(ops)
            const itemData =
              get(this.metrics, `${item.metricType}.data.result`) || []
            const config = getAreaChartOps({
              ...ops,
              data: isEmpty(itemData)
                ? [{ values: getZeroValues() }]
                : itemData,
            })

            return (
              <div
                key={item.type}
                className={classnames(styles.item, {
                  [styles.cursor]: !!itemEvent,
                })}
                onClick={itemEvent}
              >
                <MediumArea width="100%" height={100} {...config} />
              </div>
            )
          })}
        </div>
      </MonitoringController>
    )
  }

  renderModal() {
    const { showModal, selectItem } = this.state
    return (
      <div>
        <ResourceMonitoringModal
          visible={showModal}
          detail={selectItem}
          cluster={this.cluster}
          workspace={this.workspace}
          workspaceStore={this.props.workspaceStore}
          onCancel={this.hideModal}
        />
      </div>
    )
  }

  render() {
    return (
      <div>
        {this.renderCard()}
        {this.renderModal()}
      </div>
    )
  }
}

export default inject('rootStore')(observer(PhysicalResource))
export const Component = PhysicalResource
