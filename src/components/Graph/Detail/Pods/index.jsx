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
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import { get } from 'lodash'
import { toJS } from 'mobx'
import { Icon } from '@kube-design/components'
import isEqual from 'react-fast-compare'
import { joinSelector } from 'utils'
import PodStore from 'stores/pod'
import WorkloadStore from 'stores/workload'

import Item from './Item'

import styles from './index.scss'

@withRouter
export default class Pods extends React.Component {
  constructor(props) {
    super(props)

    this.podStore = new PodStore()
    this.workloadStore = new WorkloadStore('deployments')

    this.state = {
      workloads: [],
    }
  }

  componentDidMount() {
    this.getData()
  }

  componentDidUpdate(prevProps) {
    if (!isEqual(prevProps.detail, this.props.detail)) {
      this.getData()
    }
  }

  async getData() {
    const { detail, store } = this.props
    if (detail && detail.name) {
      const { namespace, cluster } = store.detail
      const workloadNames = detail.nodes
        .filter(node => node.data.workload)
        .map(item => item.data.workload)
      await Promise.all([
        this.workloadStore.fetchList({
          namespace,
          cluster,
          names: workloadNames.join(','),
        }),
        this.podStore.fetchListByK8s({
          namespace,
          cluster,
          labelSelector: joinSelector({
            ...store.detail.selector,
            app: detail.name,
          }),
        }),
      ])

      const workloads = toJS(this.workloadStore.list.data)
      const pods = toJS(this.podStore.list.data)

      workloads.forEach(workload => {
        if (workload.labels && workload.labels.version) {
          workload.pods = pods.filter(
            item =>
              item.labels &&
              item.labels.version === workload.labels.version &&
              item.labels.app === workload.labels.app
          )
        }
      })
      this.setState({ workloads })
    }
  }

  render() {
    const { workloads } = this.state
    const { workspace, cluster, namespace } = this.props.match.params

    return (
      <div className={styles.wrapper}>
        {workloads.map(workload => (
          <div className={styles.item} key={workload.uid}>
            <div className={styles.title}>
              <Icon name="backup" size={32} />
              <div className={styles.text}>
                <p>
                  <strong>
                    <Link
                      to={`/${workspace}/clusters/${cluster}/projects/${namespace}/deployments/${workload.name}`}
                    >
                      {workload.name}
                    </Link>
                  </strong>
                </p>
                <div className={styles.version}>
                  <span>version</span> {get(workload, 'labels.version')}
                </div>
              </div>
            </div>
            {workload.pods && (
              <div className={styles.pods}>
                {workload.pods.map(pod => (
                  <Item key={pod.uid} data={pod} match={this.props.match} />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    )
  }
}
