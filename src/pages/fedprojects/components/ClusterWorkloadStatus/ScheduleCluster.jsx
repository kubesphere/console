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
import { reaction } from 'mobx'
import { observer } from 'mobx-react'
import { get, debounce } from 'lodash'

import { Icon } from '@kube-design/components'
import ClusterTitle from 'components/Clusters/ClusterTitle'
import StatusReason from 'projects/components/StatusReason'

import { getWorkloadStatus } from 'utils/status'

import WebSocketStore from 'stores/websocket'

import classNames from 'classnames'
import styles from './index.scss'

@observer
export default class ScheduleCluster extends Component {
  websocket = new WebSocketStore()

  state = {
    replicas: get(this.props, 'workload.podNums', 0),
    weight: this.getWeight,
  }

  get getWeight() {
    const { store, cluster } = this.props
    const weight = get(
      store.deployedScheduleTemplate,
      `spec.clusters.${cluster.name}.weight`,
      0
    )
    return weight
  }

  componentDidUpdate(prevProps) {
    if (
      get(this.props.workload, 'name') !== get(prevProps.workload, 'name') ||
      get(this.props.workload, 'podNums') !== get(prevProps.workload, 'podNums')
    ) {
      this.setState({ replicas: get(this.props, 'workload.podNums', 0) })
      this.unInitWebsocket()
      this.initWebsocket()
    }
  }

  componentDidMount() {
    this.initWebsocket()
  }

  componentWillUnmount() {
    this.unInitWebsocket()
  }

  initWebsocket() {
    const { workload, store } = this.props

    const url = store.resourceStore.getWatchUrl(workload)
    if (workload && url) {
      this.websocket.watch(url)
      this.disposer = reaction(
        () => this.websocket.message,
        message => {
          if (message.type === 'MODIFIED') {
            store.updateResource(workload.cluster, message.object)
          }
        }
      )
    }
  }

  unInitWebsocket() {
    this.disposer && this.disposer()
    this.websocket.close()
  }

  triggerWeightChange = debounce(async () => {
    const { cluster, onWeightChange } = this.props
    const { weight } = this.state
    await onWeightChange(cluster.name, weight)
  }, 1000)

  handleAdd = () => {
    this.setState(
      ({ weight }) => ({
        weight: weight + 1,
      }),
      this.triggerWeightChange
    )
  }

  handleSubStract = () => {
    this.setState(
      ({ weight }) => ({
        weight: Math.max(weight - 1, 0),
      }),
      this.triggerWeightChange
    )
  }

  render() {
    const { cluster, workload = {}, store } = this.props
    const { replicas } = this.state
    const { podNums = 0, readyPodNums = 0 } = workload
    const unReadyNums = podNums - readyPodNums
    const { status, reason } = getWorkloadStatus(
      workload,
      store.resourceStore.module
    )

    return (
      <div className={classNames(styles.scheduleCluster)}>
        <ClusterTitle cluster={cluster} tagClass="float-right" theme="light" />
        <div className={styles.bottom}>
          <div className={styles.replicas}>
            <span className={styles.readyNum}>{readyPodNums}</span> /{' '}
            <span className={styles.readyNum}>{replicas}</span>&nbsp;
            {reason && <StatusReason status={status} data={workload} />}
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
        </div>
        <div className={styles.weight} onClick={this.stopPropagation}>
          <Icon
            name="add"
            type="light"
            size={20}
            clickable
            onClick={this.handleAdd}
          />
          <span className={styles.value}>
            <span className={styles.spanText}>{this.getWeight}</span>
            <span className={styles.subText}> {t('WEIGHT')}</span>
          </span>
          <Icon
            name="substract"
            type="light"
            size={20}
            clickable
            onClick={this.handleSubStract}
          />
        </div>
      </div>
    )
  }
}
