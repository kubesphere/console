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

import { keyBy, isEmpty } from 'lodash'
import { inject, observer } from 'mobx-react'
import { joinSelector } from 'utils'
import { Loading } from '@pitrix/lego-ui'
import { Panel, Text } from 'components/Base'
import ClusterTitle from 'components/Clusters/ClusterTitle'

import RouterStore from 'stores/router'

import IngressCard from './IngressCard'

import styles from './index.scss'

@inject('projectStore')
@observer
export default class Components extends Component {
  routerStore = new RouterStore()

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

      this.routerStore.fetchListByK8s(params)
    }
    this.routerStore.getGateway(detail)
  }

  getNodePorts(gateway) {
    if (!gateway.ports) {
      return '-'
    }

    return gateway.ports.map(port => `${port.name}:${port.nodePort}`).join(', ')
  }

  getExternalIP(gateway) {
    let ip = '-'

    if (isEmpty(gateway.externalIPs)) {
      ip = gateway.loadBalancerIngress
    } else {
      ip = gateway.externalIPs.join(', ')
    }

    return ip || '-'
  }

  render() {
    const { cluster } = this.props
    const { data, isLoading } = this.routerStore.list
    const gateway = this.routerStore.gateway.data
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
          <Text
            icon="eip-pool"
            title={gateway.type}
            description={t('Gateway Type')}
          />
          {gateway.type === 'NodePort' ? (
            <>
              <Text
                title={gateway.loadBalancerIngress || '-'}
                description={t('Gateway IP')}
              />
              <Text
                title={this.getNodePorts(gateway)}
                description={t('Node Port')}
              />
            </>
          ) : (
            <Text
              title={this.getExternalIP(gateway)}
              description={t('External IP')}
            />
          )}
        </div>
        <div className={styles.content}>
          <Loading spinning={isLoading}>
            <>
              {data.map(item => (
                <IngressCard
                  key={item.name}
                  detail={item}
                  prefix={this.prefix}
                  gateway={gateway}
                />
              ))}
            </>
          </Loading>
        </div>
      </Panel>
    )
  }
}
