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

import { omit, isEmpty } from 'lodash'
import React from 'react'
import { toJS } from 'mobx'
import { observer } from 'mobx-react'
import { Panel, Text } from 'components/Base'
import ClusterTitle from 'components/Clusters/ClusterTitle'
import Annotations from 'projects/components/Cards/Annotations'
import GatewayStore from 'stores/gateway'

import Rule from '../Rule'

import styles from './index.scss'

@observer
export default class Item extends React.Component {
  store = new GatewayStore()

  state = {
    gateway: {},
  }

  componentDidMount() {
    this.getGateway()
  }

  async getGateway() {
    const { cluster, namespace } = this.props

    const datalist = await this.store.getGatewayByProject({
      cluster: cluster.name,
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

    return ip || '-'
  }

  renderRules() {
    const { workspace, namespace, detail } = this.props
    const gateway = toJS(this.state.gateway) || {}

    if (!detail || isEmpty(detail.rules)) {
      return t('NO_DATA')
    }

    const tls = detail.tls || []

    return (
      <div className={styles.rules}>
        {detail.rules.map(rule => (
          <Rule
            key={rule.host}
            tls={tls}
            rule={rule}
            gateway={gateway}
            prefix={`/${workspace}/federatedprojects/${namespace}`}
          />
        ))}
      </div>
    )
  }

  renderAnnotations() {
    const { detail } = this.props

    if (!detail) {
      return null
    }

    return (
      <Annotations
        data={omit(detail.annotations, ['displayName', 'desc', 'creator'])}
      />
    )
  }

  render() {
    const { cluster } = this.props
    const gateway = toJS(this.state.gateway) || {}

    return (
      <Panel>
        <div className={styles.header}>
          <div className={styles.cluster}>
            <ClusterTitle
              cluster={cluster}
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
              description={t('EXTERNAL_IP_ADDRESS')}
            />
          )}
        </div>
        <div className={styles.content}>
          {this.renderRules()}
          {this.renderAnnotations()}
        </div>
      </Panel>
    )
  }
}
