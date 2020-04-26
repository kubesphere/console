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
import { observer } from 'mobx-react'

import { Icon } from '@pitrix/lego-ui'
import { Tag, Indicator } from 'components/Base'

import ClusterStore from 'stores/cluster'
import WorkloadStore from 'stores/workload'

import styles from './index.scss'

@observer
export default class Cluster extends Component {
  clusterStore = new ClusterStore()

  workloadStore = new WorkloadStore(this.props.module)

  componentDidMount() {
    this.fetchData()
  }

  fetchData() {
    const { workloadName, cluster, namespace } = this.props
    this.clusterStore.fetchDetail({ name: cluster })
    this.workloadStore.fetchDetail({ name: workloadName, cluster, namespace })
  }

  handleAdd = () => {
    const { cluster, onReplicasChange } = this.props
    const { podNums } = this.workloadStore.detail

    onReplicasChange(cluster, podNums + 1)
  }

  handleSubStract = () => {
    const { cluster, onReplicasChange } = this.props
    const { podNums } = this.workloadStore.detail

    onReplicasChange(cluster, Math.max(podNums - 1, 0))
  }

  handleEdit = () => {
    const { cluster, onEdit } = this.props
    onEdit(cluster)
  }

  render() {
    if (this.clusterStore.isLoading || this.workloadStore.isLoading) {
      return <div className={styles.clusterLoading} />
    }

    const { cluster } = this.props

    const { podNums, readyPodNums } = this.workloadStore.detail
    const unReadyNums = podNums - readyPodNums

    const clusterDetail = this.clusterStore.detail

    return (
      <div className={styles.cluster}>
        <div className={styles.textWrapper}>
          <Icon
            className={styles.icon}
            type="light"
            name="kubernetes"
            size={40}
          />
          <Indicator className={styles.indicator} type={clusterDetail.status} />
          <div className={styles.text}>
            <div>{cluster}</div>
            <p>{clusterDetail.description || '-'}</p>
          </div>
          {clusterDetail.group && (
            <Tag className={styles.group} type="warning">
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
          <div className={styles.edit}>
            <Icon
              name="pen"
              type="light"
              size={24}
              clickable
              onClick={this.handleEdit}
            />
          </div>
        </div>
      </div>
    )
  }
}
