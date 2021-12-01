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

import GatewayCard from 'clusters/containers/Gateway/Components/GatewayCard'
import { Icon, Loading, Button } from '@kube-design/components'
import GatewayStore from 'stores/gateway'
import { observable, toJS } from 'mobx'

import { observer, inject } from 'mobx-react'
import { isEmpty } from 'lodash'
import { Panel } from 'components/Base'
import styles from './index.scss'

@inject('detailStore', 'rootStore')
@observer
export default class Gateway extends React.Component {
  store = new GatewayStore()

  @observable
  gatewayList = []

  @observable
  isLoading = false

  get cluster() {
    return this.props.match.params.cluster
  }

  get namespace() {
    return this.props.match.params.namespace
  }

  get prefix() {
    const workspace = this.props.detailStore.detail.workspace
    return `/${workspace}/clusters/${this.cluster}/projects/${this.namespace}/gateways`
  }

  get enableActions() {
    return globals.app.getActions({
      module: 'project-settings',
      ...this.props.match.params,
      project: this.namespace,
    })
  }

  getProjectGateway = () => {
    const params = { ...this.props.match.params }
    return this.store.getGatewayByProject({ ...params, cluster: this.cluster })
  }

  getInitGateway = async () => {
    this.isLoading = true
    const dataList = await this.getProjectGateway()
    this.gatewayList = dataList
    this.isLoading = false
  }

  componentDidMount() {
    this.getInitGateway()
  }

  renderClusterGatewayTitle = () => (
    <div className="title">{t('CLUSTER_GATEWAY')}</div>
  )

  renderProjectTitle = () => {
    return <div className="title">{t('PROJECT_GATEWAY')}</div>
  }

  renderEmpty() {
    return (
      <Panel className="margin-t12 margin-b12">
        <div className={styles.empty}>
          <div className={styles.icon}>
            <Icon name="loadbalancer" size={40} />
          </div>
          <div className={styles.text}>
            <div>{t('GATEWAY_NOT_ENABLED')}</div>
            <p>{t('ENABLE_GATEWAY_TIP')}</p>
          </div>
        </div>
      </Panel>
    )
  }

  renderOperations = ({ url, disabled }) => {
    return (
      <Button
        disabled={disabled}
        onClick={() => {
          this.props.rootStore.routing.push(url)
        }}
      >
        {t('VIEW_DETAILS')}
      </Button>
    )
  }

  renderGatewayCard = () => {
    const isEmptyData = this.gatewayList.every(item => isEmpty(toJS(item)))

    if (isEmptyData) {
      return this.renderEmpty()
    }

    return this.gatewayList.map((item, index, arr) => {
      const isCluster = index === 0
      return (
        <GatewayCard
          key={index}
          type={isCluster ? 'cluster' : 'project'}
          detail={item}
          actions={this.enableActions}
          {...this.props}
          store={this.store}
          getData={this.getInitGateway}
          title={
            isCluster
              ? this.renderClusterGatewayTitle()
              : this.renderProjectTitle()
          }
          prefix={isCluster ? '' : this.prefix}
          renderOperations={url => this.renderOperations(url)}
          gatewayList={toJS(arr)}
        />
      )
    })
  }

  render() {
    return (
      <div>
        <Loading spinning={this.isLoading}>
          <div>{this.renderGatewayCard()}</div>
        </Loading>
      </div>
    )
  }
}
