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
import { get } from 'lodash'
import { reaction } from 'mobx'
import { observer } from 'mobx-react'

import { Icon } from '@pitrix/lego-ui'
import { Tag, Indicator } from 'components/Base'
import { CLUSTER_PROVIDER_ICON } from 'utils/constants'

import ClusterStore from 'stores/cluster'
import WorkloadStore from 'stores/workload'

import styles from './index.scss'

@observer
export default class Cluster extends Component {
  clusterStore = new ClusterStore()

  workloadStore = new WorkloadStore(this.props.module)

  componentDidMount() {
    this.fetchData()

    this.dispatcher = reaction(
      () => this.props.fedStore.syncEvent.id,
      () => {
        if (
          get(this.props.fedStore.syncEvent, 'params.cluster') ===
          this.props.cluster
        ) {
          const { workloadName, cluster, namespace } = this.props
          this.workloadStore.fetchDetail({
            name: workloadName,
            cluster,
            namespace,
          })
        }
      }
    )
  }

  componentWillUnmount() {
    this.dispatcher && this.dispatcher()
  }

  fetchData() {
    const { workloadName, cluster, namespace } = this.props
    this.clusterStore.fetchDetail({ name: cluster })
    this.workloadStore.fetchDetail({ name: workloadName, cluster, namespace })
  }

  triggerReplicasChange = async num => {
    const { cluster, namespace, onReplicasChange, workloadName } = this.props
    await onReplicasChange(cluster, num)
    await this.workloadStore.fetchDetail({
      name: workloadName,
      cluster,
      namespace,
    })
  }

  handleAdd = () => {
    const { podNums } = this.workloadStore.detail

    this.triggerReplicasChange(podNums + 1)
  }

  handleSubStract = () => {
    const { podNums } = this.workloadStore.detail

    this.triggerReplicasChange(Math.max(podNums - 1, 0))
  }

  handleEdit = () => {
    const { cluster, onEdit } = this.props
    onEdit(cluster)
  }

  render() {
    if (this.clusterStore.isLoading) {
      return <div className={styles.clusterLoading} />
    }

    const { cluster } = this.props

    const { podNums = 0, readyPodNums = 0 } = this.workloadStore.detail
    const unReadyNums = podNums - readyPodNums

    const clusterDetail = this.clusterStore.detail

    return (
      <div className={styles.cluster}>
        <div className={styles.textWrapper}>
          <Icon
            className={styles.icon}
            type="light"
            name={CLUSTER_PROVIDER_ICON[clusterDetail.provider] || 'kubernetes'}
            size={40}
          />
          <Indicator className={styles.indicator} type={clusterDetail.status} />
          <div className={styles.text}>
            <div>{cluster}</div>
            <p>{clusterDetail.description || t('Cluster Name')}</p>
          </div>
          {clusterDetail.group && (
            <Tag className={styles.group} type="info">
              {clusterDetail.group}
            </Tag>
          )}
        </div>
        <div className={styles.bottom}>
          <div className={styles.replicas}>
            <span>{readyPodNums}</span> / <span>{podNums}</span>
          </div>
          <div className={styles.pods}>
            {Array(Math.min(podNums, 6))
              .fill('')
              .map((_, index) => (
                <img
                  key={index}
                  src={
                    index < unReadyNums
                      ? '/assets/pod-waiting.svg'
                      : '/assets/pod-ready.svg'
                  }
                  alt=""
                />
              ))}
            {podNums > 6 && (
              <Icon
                name="more"
                className={styles.more}
                size={28}
                color={
                  unReadyNums > 6
                    ? {
                        primary: '#f5a623',
                        secondary: '#f5a623',
                      }
                    : {
                        primary: '#479e88',
                        secondary: '#479e88',
                      }
                }
              />
            )}
          </div>
          <div className={styles.control}>
            <Icon
              name="add"
              type="light"
              size={24}
              clickable
              onClick={this.handleAdd}
            />
            <Icon
              name="substract"
              type="light"
              size={24}
              clickable
              onClick={this.handleSubStract}
            />
          </div>
        </div>
      </div>
    )
  }
}
