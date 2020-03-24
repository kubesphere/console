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

import { Loading } from '@pitrix/lego-ui'
import { Card } from 'components/Base'
import { StatusCircle } from 'components/Cards/Monitoring'

import styles from './index.scss'

@inject('rootStore')
@observer
export default class ResourceStatistics extends React.Component {
  constructor(props) {
    super(props)

    this.componentMonitoringStore = new ComponentMonitoringStore()
    this.fetchData()
  }

  get routing() {
    return this.props.rootStore.routing
  }

  @computed
  get counts() {
    const { counts } = this.componentMonitoringStore.health
    return toJS(counts)
  }

  @computed
  get componentCounts() {
    const { componentCounts } = this.componentMonitoringStore.health
    return toJS(componentCounts)
  }

  getStatusClassName = (health = 0, total = 0) => {
    const rate = total === 0 ? 1 : health / total
    return rate < 0.7 ? 'danger' : rate < 1 ? 'warning' : 'default'
  }

  fetchData = () => {
    this.componentMonitoringStore.fetchHealthMetrics()
  }

  handleNodeClick = () => {
    this.routing.push('/infrastructure/nodes')
  }

  handleComponentsClick = () => {
    this.routing.push('/components')
  }

  renderNodeStatus() {
    const { health = 0, total = 0 } = this.counts.node || {}

    return (
      <StatusCircle
        name={t('Node Online Status')}
        legend={['Online Nodes', 'All Nodes']}
        used={health}
        total={total}
        onClick={this.handleNodeClick}
      />
    )
  }

  renderComponentsStatus() {
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
        type: 'openpitrix',
        icon: '/assets/openpitrix.svg',
        disabled: !globals.app.hasKSModule('openpitrix'),
      },
      {
        type: 'istio',
        icon: '/assets/istio.svg',
        disabled: !globals.app.hasKSModule('servicemesh'),
      },
      {
        type: 'monitoring',
        icon: '/assets/monitoring.svg',
        disabled: !globals.app.hasKSModule('monitoring'),
      },
      {
        type: 'logging',
        icon: '/assets/logging.svg',
        disabled: !globals.app.hasKSModule('logging'),
      },
    ]

    return (
      <div className={styles.list} onClick={this.handleComponentsClick}>
        {components.map(item => {
          const health = get(this.componentCounts, `[${item.type}].health`, 0)
          const total = get(this.componentCounts, `[${item.type}].total`, 0)

          return (
            <div
              key={item.type}
              className={classnames(
                styles.item,
                styles[this.getStatusClassName(health, total)],
                { [styles.disabled]: item.disabled }
              )}
            >
              <img src={item.icon} />
              {!item.disabled ? (
                <p>
                  {health}
                  <span>/{total}</span>
                </p>
              ) : (
                <p>{t('Not Enabled')}</p>
              )}
            </div>
          )
        })}
      </div>
    )
  }

  render() {
    const { isLoading } = this.componentMonitoringStore.health

    return (
      <Loading spinning={isLoading}>
        <Card title={t('Cluster Status')} className={styles.card}>
          <div className={styles.wrapper}>
            <div className={styles.node}>{this.renderNodeStatus()}</div>
            <div className={styles.components}>
              {this.renderComponentsStatus()}
            </div>
          </div>
        </Card>
      </Loading>
    )
  }
}
