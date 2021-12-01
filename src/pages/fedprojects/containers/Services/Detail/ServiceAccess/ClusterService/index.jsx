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
import { observer, inject } from 'mobx-react'

import GatewayStore from 'stores/gateway'

import { Panel, Text } from 'components/Base'
import ClusterTitle from 'components/Clusters/ClusterTitle'
import MoreActions from 'components/MoreActions'

import { get } from 'lodash'
import Ports from '../../Ports'

import styles from './index.scss'

@inject('rootStore')
@observer
export default class ClusterService extends Component {
  gatewayStore = new GatewayStore()

  state = {
    gateway: {},
  }

  get cluster() {
    return this.props.cluster.name
  }

  get isStateless() {
    return (
      get(
        this.props.store.detail,
        'annotations["kubesphere.io/serviceType"]'
      ) === 'statelessservice'
    )
  }

  componentDidMount() {
    this.getInitGateway()
  }

  getProjectGateway = () => {
    const { namespace } = this.props.detail
    return this.gatewayStore.getGatewayByProject({
      namespace,
      cluster: this.cluster,
    })
  }

  getInitGateway = async detail => {
    const dataList = await this.getProjectGateway(detail)
    const gateway = dataList[1] || dataList[0]
    this.setState({ gateway })
  }

  getOperations = () => [
    {
      key: 'editGateway',
      icon: 'ip',
      text: t('EDIT_EXTERNAL_ACCESS'),
      action: 'edit',
      onClick: () => this.props.updateService(this.cluster),
    },
  ]

  getEnabledOperations = () => {
    const operations = this.isStateless ? this.getOperations() : []
    return operations.filter(
      item => !item.action || this.props.enabledActions.includes(item.action)
    )
  }

  renderPorts() {
    const { detail } = this.props
    const gateway = this.state.gateway
    return <Ports gateway={gateway} detail={detail} />
  }

  render() {
    const { cluster, detail } = this.props

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
            title={`${detail.name}.${detail.namespace}.svc`}
            description={t('INTERNAL_DOMAIN_NAME_SCAP')}
          />
          <Text
            title={detail.clusterIP}
            description={t('VIRTUAL_IP_ADDRESS')}
          />
          <MoreActions
            className={styles.more}
            options={this.getEnabledOperations()}
          />
        </div>
        <div className={styles.content}>{this.renderPorts()}</div>
      </Panel>
    )
  }
}
