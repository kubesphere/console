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

import { isEmpty } from 'lodash'
import React from 'react'
import { toJS } from 'mobx'
import { observer, inject } from 'mobx-react'

import { Button, Icon, Tooltip } from '@kube-design/components'
import { Panel, Text } from 'components/Base'
import GatewayCard from 'clusters/containers/Gateway/Components/GatewayCard'

import ClusterTitle from 'components/Clusters/ClusterTitle'
import GatewayStore from 'stores/gateway'
import { trigger } from 'utils/action'

import styles from './index.scss'

@inject('rootStore')
@observer
@trigger
class InternetAccess extends React.Component {
  constructor(props) {
    super(props)

    this.store = new GatewayStore()
  }

  get canEdit() {
    return this.props.actions.includes('manage')
  }

  get prefix() {
    return this.props.match.url
  }

  componentDidMount() {
    const { namespace, cluster } = this.props
    this.store.getGateway({ namespace, cluster: cluster.name })
  }

  showGatewaySetting = () => {
    this.trigger('gateways.create', {
      name: 'kubesphere-router-kubesphere-system',
      namespace: 'kubesphere-controls-system',
      cluster: this.cluster,
      store: this.store,
      success: this.props.rootStore.routing.query,
    })
  }

  renderEmpty() {
    const { cluster } = this.props
    return (
      <Panel>
        <div className={styles.empty}>
          <div className={styles.cluster}>
            <ClusterTitle cluster={cluster} theme="light" />
          </div>
          <Text
            className={styles.desc}
            title={t('Gateway Not Set')}
            description={t('PROJECT_INTERNET_ACCESS_DESC')}
          />
          {this.canEdit && (
            <Button type="control" onClick={this.showGatewaySetting}>
              {t('Set Gateway')}
            </Button>
          )}
        </div>
      </Panel>
    )
  }

  renderInternetAccess() {
    const { cluster } = this.props
    return (
      <div className={styles.container}>
        <div className={styles.cluster}>
          <ClusterTitle cluster={cluster} theme="light" />
        </div>
        <div className={styles.title}>
          <span> {t('CLUSTER_GATEWAY')}</span>
          <Tooltip content={t('CLUSTER_GATEWAY_GUIDE_DESC')} placement="top">
            <Icon name="question" size={20} />
          </Tooltip>
        </div>
        <GatewayCard
          type="cluster"
          {...this.props}
          bodyClassName={styles.bodyClass}
          itemClassName={styles.itemClass}
          isFederated={true}
          prefix={this.prefix}
        />
        <div className={styles.title}>{t('PROJECT_GATEWAY')}</div>
        <GatewayCard
          type="project"
          {...this.props}
          bodyClassName={styles.bodyClass}
          itemClassName={styles.itemClass}
          isFederated={true}
          prefix={this.prefix}
        />
      </div>
    )
  }

  renderContent() {
    const { data, isLoading } = toJS(this.store.gateway)

    if (isLoading) {
      return null
    }

    if (isEmpty(data)) {
      return this.renderEmpty()
    }

    return this.renderInternetAccess(data)
  }

  render() {
    return <div>{this.renderContent()}</div>
  }
}

export default InternetAccess
