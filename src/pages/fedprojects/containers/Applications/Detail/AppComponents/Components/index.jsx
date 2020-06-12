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

import { keyBy } from 'lodash'
import { inject, observer } from 'mobx-react'
import { joinSelector } from 'utils'
import { Loading } from '@pitrix/lego-ui'
import { Panel } from 'components/Base'
import ClusterTitle from 'components/Clusters/ClusterTitle'

import ServiceStore from 'stores/service'

import ServiceCard from './ServiceCard'

import styles from './index.scss'

@inject('projectStore')
@observer
export default class Components extends Component {
  serviceStore = new ServiceStore()

  get prefix() {
    const { workspace, namespace } = this.props
    return `/${workspace}/federatedprojects/${namespace}`
  }

  componentDidMount() {
    this.getData()
  }

  getData() {
    const { cluster, namespace, detail } = this.props
    const { selector } = detail
    if (selector) {
      const params = {
        cluster,
        namespace,
        labelSelector: joinSelector(selector),
      }

      this.serviceStore.fetchListByK8s(params)
    }
  }

  render() {
    const { cluster } = this.props
    const { data, isLoading } = this.serviceStore.list
    const clusters = keyBy(this.props.projectStore.detail.clusters, 'name')

    return (
      <Panel>
        <div className={styles.header}>
          <div className={styles.cluster}>
            <ClusterTitle
              cluster={clusters[cluster]}
              theme="light"
              tagClass="float-right"
            />
          </div>
        </div>
        <div className={styles.content}>
          <Loading spinning={isLoading}>
            <>
              {data.map(item => (
                <ServiceCard key={item.name} data={item} prefix={this.prefix} />
              ))}
            </>
          </Loading>
        </div>
      </Panel>
    )
  }
}
