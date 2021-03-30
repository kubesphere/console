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
import { toJS, computed } from 'mobx'
import { observer, inject } from 'mobx-react'
import classnames from 'classnames'
import { get } from 'lodash'

import ComponentMonitoringStore from 'stores/monitoring/component'

import { Columns, Column, Loading, Icon } from '@kube-design/components'
import { Card } from 'components/Base'
import { StatusCircle } from 'components/Cards/Monitoring'
import {
  ClusterResourceStatus,
  ETCDStatus,
  ServiceComponentStatus,
} from 'clusters/components/Cards/Monitoring'

import styles from './index.scss'

@inject('rootStore')
@observer
class Overview extends React.Component {
  constructor(props) {
    super(props)

    this.componentMonitoringStore = new ComponentMonitoringStore({
      cluster: this.cluster,
    })
    this.fetchData()
  }

  get routing() {
    return this.props.rootStore.routing
  }

  get cluster() {
    return this.props.match.params.cluster
  }

  @computed
  get componentHealth() {
    return toJS(this.componentMonitoringStore.health)
  }

  @computed
  get supportETCD() {
    return this.props.rootStore.monitoring.supportETCD
  }

  componentDidMount() {
    this.updateData()
  }

  componentWillUnmount() {
    clearTimeout(this.timer)
  }

  updateData = () => {
    this.timer = setTimeout(async () => {
      await this.componentMonitoringStore.requestHealthMetrics()
      this.updateData()
    }, 2000)
  }

  getComponentStatus = component => {
    const conditions = component.conditions || []

    return conditions.some(
      item => item.status !== 'Ture' && item.type !== 'Healthy'
    )
      ? 'unhealthy'
      : 'healthy'
  }

  getCoreComponentStatus = () => {
    const { data = {} } = this.componentHealth
    const { kubernetes = [], node = {} } = data
    const status = {}

    kubernetes.forEach(item => {
      status[get(item, 'metadata.name')] = this.getComponentStatus(item)
    })

    status['node'] =
      node.healthyNodes === node.totalNodes ? 'healthy' : 'unhealthy'

    status['controller-manager'] = this.componentHealth.supportControllerManager
      ? 'healthy'
      : 'unhealthy'
    status['scheduler'] = this.componentHealth.supportKsScheduler
      ? 'healthy'
      : 'unhealthy'
    status['etcd-0'] = this.supportETCD ? 'healthy' : 'unhealthy'

    return status
  }

  fetchData = () => {
    this.componentMonitoringStore.fetchHealthMetrics()
  }

  handleNodeClick = () => {
    globals.app.hasPermission({
      module: 'nodes',
      action: 'view',
      cluster: this.cluster,
    }) && this.routing.push(`/clusters/${this.cluster}/nodes`)
  }

  handleComponentsClick = () => {
    globals.app.hasPermission({
      module: 'monitoring',
      action: 'view',
      cluster: this.cluster,
    }) && this.routing.push(`/clusters/${this.cluster}/components`)
  }

  renderNodeStatus() {
    const { counts, isLoading = false } = this.componentHealth
    const { health = 0, total = 0 } = counts.node || {}

    return (
      <Card className={styles.node} title={t('Cluster Node Status')}>
        <Loading spinning={isLoading}>
          <StatusCircle
            theme="light"
            className={styles.nodeStatus}
            name={t('Node Online Status')}
            legend={['Online Nodes', 'All Nodes']}
            used={health}
            total={total}
            onClick={this.handleNodeClick}
          />
        </Loading>
      </Card>
    )
  }

  renderServiceComponents() {
    const { componentCounts: counts } = this.componentHealth
    const components = [
      {
        type: 'kubesphere',
        icon: '/assets/kubesphere.svg',
      },
      {
        type: 'kubeSystem',
        icon: '/assets/kubernetes.svg',
      },
      {
        type: 'istio',
        icon: '/assets/istio.svg',
        disabled: !globals.app.hasClusterModule(this.cluster, 'servicemesh'),
      },
      {
        type: 'monitoring',
        icon: '/assets/monitoring.svg',
        disabled: !globals.app.hasClusterModule(this.cluster, 'monitoring'),
      },
      {
        type: 'logging',
        icon: '/assets/logging.svg',
        disabled: !globals.app.hasClusterModule(this.cluster, 'logging'),
      },
    ]

    return (
      <div
        className={classnames(styles.list, styles.service)}
        onClick={this.handleComponentsClick}
      >
        {components.map(item => (
          <div
            key={item.type}
            className={classnames(styles.item, {
              [styles.disabled]: item.disabled,
            })}
          >
            <img src={item.icon} />
            {!item.disabled ? (
              <p>
                {get(counts, `[${item.type}].health`, 0)}
                <span>/{get(counts, `[${item.type}].total`, 0)}</span>
              </p>
            ) : (
              <span>{t('Not Enabled')}</span>
            )}
          </div>
        ))}
      </div>
    )
  }

  renderCoreComponents() {
    const statuses = this.getCoreComponentStatus()
    const components = [
      {
        type: 'etcd-0',
        name: t('etcd'),
      },
      {
        type: 'controller-manager',
        name: t('Controller Manager'),
      },
      {
        type: 'scheduler',
        name: t('K8s Scheduler'),
      },
      {
        type: 'node',
        name: t('Node'),
      },
    ]

    return (
      <div className={classnames(styles.list, styles.core)}>
        {components.map(item => {
          const status = statuses[item.type]

          return (
            <div key={item.type} className={styles.item}>
              <div className={classnames(styles.itemIcon, styles[status])}>
                <Icon
                  name={
                    status === 'healthy' || status === 'ready'
                      ? 'check'
                      : 'substract'
                  }
                  type="light"
                  size={16}
                />
              </div>
              <p title={item.name}>{item.name}</p>
            </div>
          )
        })}
      </div>
    )
  }

  renderComponentStatus() {
    const { isLoading = false } = this.componentMonitoringStore.health

    return (
      <Card className={styles.components} title={t('Component Status')}>
        <Loading spinning={isLoading}>
          <div className={styles.wrapper}>
            {this.renderServiceComponents()}
            {this.renderCoreComponents()}
          </div>
        </Loading>
      </Card>
    )
  }

  render() {
    return (
      <div>
        <Columns className="is-1_1">
          <Column className="is-5">{this.renderNodeStatus()}</Column>
          <Column className="is-7">{this.renderComponentStatus()}</Column>
        </Columns>
        <Columns>
          <Column className="is-12">
            <ClusterResourceStatus cluster={this.cluster} />
            {this.supportETCD && <ETCDStatus cluster={this.cluster} />}
            <ServiceComponentStatus cluster={this.cluster} />
          </Column>
        </Columns>
      </div>
    )
  }
}

export default Overview
