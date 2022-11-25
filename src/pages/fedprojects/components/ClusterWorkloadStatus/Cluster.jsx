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

import styles from './index.scss'

@observer
export default class Cluster extends Component {
  websocket = new WebSocketStore()

  state = {
    replicas: get(this.props, 'workload.podNums', 0),
  }

  componentDidUpdate(prevProps) {
    if (get(this.props.workload, 'name') !== get(prevProps.workload, 'name')) {
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

  triggerReplicasChange = debounce(async () => {
    const { cluster, onReplicasChange } = this.props
    await onReplicasChange(cluster.name, this.state.replicas)
  }, 1000)

  handleAdd = () => {
    this.setState(
      ({ replicas }) => ({
        replicas: replicas + 1,
      }),
      this.triggerReplicasChange
    )
  }

  handleSubStract = () => {
    this.setState(
      ({ replicas }) => ({
        replicas: Math.max(replicas - 1, 0),
      }),
      this.triggerReplicasChange
    )
  }

  render() {
    const { cluster, workload = {}, store, onReplicasChange } = this.props
    const { replicas } = this.state
    const { podNums = 0, readyPodNums = 0 } = workload
    const unReadyNums = podNums - readyPodNums
    const { status, reason } = getWorkloadStatus(
      workload,
      store.resourceStore.module
    )

    return (
      <div className={styles.cluster}>
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
          {onReplicasChange && (
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
          )}
        </div>
      </div>
    )
  }
}
