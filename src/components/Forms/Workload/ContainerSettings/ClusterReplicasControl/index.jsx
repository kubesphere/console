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

import { Tabs } from '@kube-design/components'
import { get, set, uniqBy } from 'lodash'
import { observer } from 'mobx-react'
import PropTypes from 'prop-types'
import React from 'react'
import { getDisplayNameNew } from 'utils'
import styles from './index.scss'

import Placement from './Placement'
import Scheduling from './Scheduling'

@observer
export default class ReplicasControl extends React.Component {
  static propTypes = {
    template: PropTypes.object,
    value: PropTypes.array,
    omitAlias: PropTypes.bool,
  }

  static defaultProps = {
    value: [],
  }

  handleChange = (name, newReplicas) => {
    let overrides = get(this.props.template, 'spec.overrides', [])
    let od = overrides.find(item => item.clusterName === name)
    if (!od) {
      od = { clusterName: name, clusterOverrides: [] }
      overrides.push(od)
    }

    od.clusterOverrides = od.clusterOverrides || []
    const cod = od.clusterOverrides.find(item => item.path === '/spec/replicas')
    if (cod) {
      cod.value = newReplicas
    } else {
      od.clusterOverrides.push({ path: '/spec/replicas', value: newReplicas })
    }

    // if replicas = 0, remove override
    if (newReplicas === 0) {
      overrides = overrides.filter(item => item.clusterName !== name)
    }

    set(this.props.template, 'spec.overrides', overrides)

    const clusters = get(this.props.template, 'spec.placement.clusters', [])
    set(
      this.props.template,
      'spec.placement.clusters',
      newReplicas === 0
        ? clusters.filter(item => item.name !== name)
        : uniqBy([...clusters, { name }], 'name')
    )

    this.props.onClusterUpdate && this.props.onClusterUpdate()
  }

  getValue = name => {
    const clusters = get(this.props.template, 'spec.placement.clusters', [])

    if (clusters.every(cluster => cluster.name !== name)) {
      return 0
    }

    const overrides = get(this.props.template, 'spec.overrides', [])
    const replicas = get(this.props.template, 'spec.template.spec.replicas', 0)

    let cod
    overrides.forEach(od => {
      if (od.clusterName === name) {
        if (od.clusterOverrides) {
          cod = od.clusterOverrides.find(item => item.path === '/spec/replicas')
        }
      }
    })

    return cod ? cod.value : replicas
  }

  switchMode = () => {
    const store = this.props.store
    store.isScheduleDeployment
      ? store.switchSchedule(false)
      : store.switchSchedule(true)
  }

  getTotalReplicas = () => {
    return get(this.props.scheduleTemplate, 'spec.totalReplicas', '')
  }

  renderPlacement(clusters) {
    const { omitAlias = false } = this.props
    return (
      <div className={styles.wrapper}>
        {clusters.map(cluster => (
          <Placement
            key={cluster.name}
            cluster={getDisplayNameNew(cluster, omitAlias)}
            replicas={this.getValue(cluster.name)}
            onChange={this.handleChange}
          />
        ))}
      </div>
    )
  }

  renderSchedule() {
    const { clusters } = this.props
    const store = this.props.store
    const { TabPanel } = Tabs
    return (
      <>
        <Tabs type="button" onChange={this.switchMode}>
          <TabPanel label={t('SPECIFY_REPLICAS')} name="Normal" icon="cluster">
            {this.renderPlacement(clusters)}
          </TabPanel>
          <TabPanel
            label={t('SPECIFY_WEIGHTS')}
            name="Scheduling"
            icon="cluster"
          >
            <Scheduling
              clusters={clusters}
              scheduleTemplate={store.scheduleTemplate}
              onError={this.props.onError}
            ></Scheduling>
          </TabPanel>
        </Tabs>
      </>
    )
  }

  render() {
    const { clusters } = this.props
    const renderScheduleTab = get(this.props.store, 'renderScheduleTab', false)
    return renderScheduleTab
      ? this.renderSchedule()
      : this.renderPlacement(clusters)
  }
}
