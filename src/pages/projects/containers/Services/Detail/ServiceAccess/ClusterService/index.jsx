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
import { Panel, Text } from 'components/Base'

import ClusterTitle from 'components/ClusterTitle'

import ClusterStore from 'stores/cluster'
import ServiceStore from 'stores/service'

import Ports from '../../Ports'

import styles from './index.scss'

@observer
export default class ServicePort extends Component {
  serviceStore = new ServiceStore()

  clusterStore = new ClusterStore()

  componentDidMount() {
    const { cluster, name, namespace } = this.props
    this.serviceStore.fetchDetail({ cluster, name, namespace })
    this.clusterStore.fetchDetail({ name: cluster })
  }

  renderPorts() {
    const { gateway } = this.props
    const detail = this.serviceStore.detail
    return <Ports gateway={gateway} detail={detail} />
  }

  render() {
    const clusterDetail = this.clusterStore.detail
    const serviceDetail = this.serviceStore.detail

    return (
      <Panel>
        <div className={styles.header}>
          <div className={styles.cluster}>
            <ClusterTitle
              cluster={clusterDetail}
              theme="light"
              tagClass="float-right"
            />
          </div>
          <Text
            icon="eip-pool"
            title={`${serviceDetail.name}.${serviceDetail.namespace}.svc`}
            description={t('EIP_POOL_DESC')}
          />
          <Text title={serviceDetail.clusterIP} description={t('Virtual IP')} />
        </div>
        <div className={styles.content}>{this.renderPorts()}</div>
      </Panel>
    )
  }
}
