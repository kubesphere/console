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
import { isEmpty } from 'lodash'
import { toJS } from 'mobx'
import { Icon } from '@pitrix/lego-ui'
import isEqual from 'react-fast-compare'
import { joinSelector } from 'utils'
import PodStore from 'stores/pod'

import Item from './Item'

import styles from './index.scss'

export default class Pods extends React.Component {
  constructor(props) {
    super(props)

    this.podStore = new PodStore()

    this.state = {
      pods: {},
    }

    this.getData()
  }

  componentDidUpdate(prevProps) {
    if (!isEqual(prevProps.detail, this.props.detail)) {
      this.getData(this.props)
    }
  }

  getData(props) {
    const { detail, store } = props || this.props
    if (detail && detail.name) {
      this.podStore
        .fetchListByK8s({
          namespace: store.detail.namespace,
          cluster: store.detail.cluster,
          labelSelector: joinSelector({
            ...store.detail.selector,
            app: detail.name,
          }),
        })
        .then(() => {
          const pods = toJS(this.podStore.list.data)
          const podVersionMap = {}
          pods.forEach(pod => {
            if (pod.labels && pod.labels.version) {
              podVersionMap[pod.labels.version] =
                podVersionMap[pod.labels.version] || []
              podVersionMap[pod.labels.version].push(pod)
            }
          })
          this.setState({ pods: podVersionMap })
        })
    }
  }

  render() {
    const { detail } = this.props
    const { pods } = this.state

    if (isEmpty(detail.nodes)) {
      return null
    }

    const workloads = detail.nodes.filter(node => node.data.workload) || []

    return (
      <div className={styles.wrapper}>
        {workloads.map(workload => (
          <div className={styles.item} key={workload.data.id}>
            <div className={styles.title}>
              <Icon name="backup" size={32} />
              <div className={styles.text}>
                <p>
                  <strong>{workload.data.workload}</strong>
                </p>
                <div className={styles.version}>
                  <span>version</span> {workload.data.version}
                </div>
              </div>
            </div>
            <div className={styles.pods}>
              {pods[workload.data.version] &&
                pods[workload.data.version].map(pod => (
                  <Item key={pod.uid} data={pod} />
                ))}
            </div>
          </div>
        ))}
      </div>
    )
  }
}
