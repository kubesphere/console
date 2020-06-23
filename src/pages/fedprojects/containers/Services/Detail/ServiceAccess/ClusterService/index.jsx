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

import RouterStore from 'stores/router'

import { Panel, Text } from 'components/Base'
import ClusterTitle from 'components/Clusters/ClusterTitle'
import MoreActions from 'components/MoreActions'
import { trigger } from 'utils/action'

import Ports from '../../Ports'

import styles from './index.scss'

@inject('rootStore')
@observer
@trigger
export default class ClusterService extends Component {
  routerStore = new RouterStore()

  get cluster() {
    return this.props.cluster.name
  }

  componentDidMount() {
    const { namespace } = this.props.detail
    this.routerStore.getGateway({ cluster: this.cluster, namespace })
  }

  getOperations = () => [
    {
      key: 'editGateway',
      icon: 'ip',
      text: t('Edit Internet Access'),
      action: 'edit',
      onClick: () =>
        this.trigger('service.gateway.edit', {
          cluster: this.cluster,
          detail: this.props.detail,
          isFederated: true,
        }),
    },
  ]

  getEnabledOperations = () => {
    const operations = this.getOperations()
    return operations.filter(
      item => !item.action || this.props.enabledActions.includes(item.action)
    )
  }

  renderPorts() {
    const { detail } = this.props
    const gateway = this.routerStore.gateway.data
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
            description={t('EIP_POOL_DESC')}
          />
          <Text title={detail.clusterIP} description={t('Virtual IP')} />
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
