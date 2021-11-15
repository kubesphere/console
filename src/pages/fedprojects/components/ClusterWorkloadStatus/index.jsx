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

import React, { Component } from 'react'

import { Panel } from 'components/Base'
import Icon from '@kube-design/components/lib/components/Icon'
import { set, get } from 'lodash'
import { toJS } from 'mobx'
import Cluster from './Cluster'
import ScheduleCluster from './ScheduleCluster'
import ReplicasInput from './ReplicasInput'
import styles from './index.scss'

export default class ClusterWorkloadStatus extends Component {
  getWeight = name => {
    const { store } = this.props
    const weight = get(
      store.deployedScheduleTemplate,
      `spec.clusters.${name}.weight`,
      0
    )
    return weight
  }

  get getTotalReplicas() {
    const { store } = this.props
    return get(store.deployedScheduleTemplate, 'spec.totalReplicas', 0)
  }

  handleReplicasChange = async (cluster, replicas) => {
    const { detail, store } = this.props
    const { overrides = [] } = detail

    const override = overrides.find(item => item.clusterName === cluster)
    if (override) {
      const path = override.clusterOverrides.find(
        item => item.path === '/spec/replicas'
      )
      if (path) {
        path.value = replicas
      } else {
        override.clusterOverrides.push({
          path: '/spec/replicas',
          value: replicas,
        })
      }
    } else {
      overrides.push({
        clusterName: cluster,
        clusterOverrides: [
          {
            path: '/spec/replicas',
            value: replicas,
          },
        ],
      })
    }

    await store.patch(detail, { spec: { overrides } })
    await store.resourceStore.patch(
      { ...detail, cluster },
      { spec: { replicas } }
    )
  }

  updateSchedule = async () => {
    const { store, detail, projectStore, clustersDetail } = this.props
    const clusters = Object.keys(toJS(clustersDetail))
    const params = {
      name: detail.name,
      namespace: projectStore.detail.namespace,
      workspace: projectStore.detail.workspace,
    }
    await store.updateScheduleYaml(detail, store.deployedScheduleTemplate)
    await store.fetchResources({ clusters, ...params })
  }

  handleWeightChange = async (cluster, weight) => {
    const { store } = this.props

    set(
      store.deployedScheduleTemplate,
      `spec.clusters.${cluster}.weight`,
      weight
    )
    await this.updateSchedule()
  }

  renderTittleText() {
    const { store } = this.props

    const params = store.isScheduleProject
      ? {
          Icon: 'stretch',
          title: t('WEIGHTS'),
          des: t('SPECIFY_WEIGHTS_DESC'),
        }
      : {
          Icon: 'backup',
          title: t('REPLICA_COUNT'),
          des: t('SPECIFY_REPLICAS_DESC'),
        }

    return (
      <div className={styles.titleBox}>
        <div className={styles.IconBox}>
          <Icon name={params.Icon} size="40"></Icon>
        </div>
        <div className={styles.right}>
          <span className={styles.title}>{params.title}</span>
          <span className={styles.des}>{params.des}</span>
        </div>
      </div>
    )
  }

  totalChange = async value => {
    const { store } = this.props
    set(store.deployedScheduleTemplate, `spec.totalReplicas`, Number(value))
    await this.updateSchedule()
  }

  render() {
    const {
      store,
      resources,
      clusters,
      clustersDetail,
      canEdit,
      projectStore,
    } = this.props

    if (!clusters) {
      return null
    }

    return (
      <Panel title={t('POD_REPLICAS')}>
        {this.renderTittleText()}
        <div className={styles.wrapper}>
          {store.isScheduleProject && (
            <div className={styles.totalBox}>
              <Icon name="pod" size="40"></Icon>
              <div className={styles.total}>{t('TOTAL_REPLICAS')}</div>
              <ReplicasInput
                desire={this.getTotalReplicas}
                onChange={this.totalChange}
              ></ReplicasInput>
            </div>
          )}
          {clusters.map(cluster => {
            if (!clustersDetail[cluster.name]) {
              return null
            }
            return store.isScheduleProject ? (
              <ScheduleCluster
                key={cluster.name}
                cluster={clustersDetail[cluster.name]}
                workload={resources[cluster.name]}
                store={store}
                projectStore={projectStore}
                onWeightChange={this.handleWeightChange}
                onReplicasChange={canEdit ? this.handleReplicasChange : null}
              />
            ) : (
              <Cluster
                key={cluster.name}
                cluster={clustersDetail[cluster.name]}
                workload={resources[cluster.name]}
                onReplicasChange={canEdit ? this.handleReplicasChange : null}
                store={store}
              />
            )
          })}
        </div>
      </Panel>
    )
  }
}
