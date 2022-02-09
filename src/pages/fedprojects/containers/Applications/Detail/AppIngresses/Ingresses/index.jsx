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
import { Loading } from '@kube-design/components'
import { Panel, Text } from 'components/Base'
import ClusterTitle from 'components/Clusters/ClusterTitle'

import GatewayStore from 'stores/gateway'
import IngressStore from 'stores/ingress'

import IngressCard from './IngressCard'

import styles from './index.scss'

@inject('projectStore')
@observer
export default class Components extends Component {
  gatewayStore = new GatewayStore()

  ingressStore = new IngressStore()

  state = {
    gateway: {},
  }

  get prefix() {
    const { workspace, namespace } = this.props
    return `/${workspace}/federatedprojects/${namespace}`
  }

  componentDidMount() {
    this.getData()
  }

  async getData() {
    const { cluster, namespace, detail } = this.props
    const { selector } = detail
    if (selector) {
      const params = {
        cluster,
        namespace,
        labelSelector: joinSelector(selector),
      }

      this.ingressStore.fetchListByK8s(params)
    }
    await this.getGateway()
  }

  async getGateway() {
    const { cluster, namespace } = this.props

    const datalist = await this.gatewayStore.getGatewayByProject({
      cluster,
      namespace,
    })

    this.setState({ gateway: datalist[1] || datalist[0] })
  }

  getNodePorts(gateway) {
    if (!gateway.ports) {
      return '-'
    }

    return gateway.ports
      .map(port => `${port.name.toUpperCase()}: ${port.nodePort}`)
      .join('/')
  }

  getExternalIP(gateway) {
    let ip = '-'

    if (!isEmpty(gateway.loadBalancerIngress)) {
      ip = gateway.loadBalancerIngress.join('; ')
    } else if (!isEmpty(gateway.externalIPs)) {
      ip = gateway.externalIPs.join('; ')
    }

    return ip
  }

  render() {
    const { cluster } = this.props
    const { data, isLoading } = this.ingressStore.list
    const clusters = keyBy(this.props.projectStore.detail.clusters, 'name')
    const gateway = this.state.gateway || {}

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
            description={t('GATEWAY_ACCESS_MODE')}
          />
          {gateway.type === 'NodePort' ? (
            <>
              <Text
                title={gateway.loadBalancerIngress || '-'}
                description={t('GATEWAY_IP_ADDRESS')}
              />
              <Text
                title={this.getNodePorts(gateway)}
                description={t('NODE_PORTS_SCAP')}
              />
            </>
          ) : (
            <Text
              title={this.getExternalIP(gateway)}
              description={t('LOAD_BALANCER_SCAP')}
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
