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
import { observer, inject } from 'mobx-react'
import { trigger } from 'utils/action'
import Banner from 'components/Cards/Banner'
import GatewayStore from 'stores/gateway'
import { observable } from 'mobx'
import { Loading } from '@kube-design/components'
import GatewayCard from './Components/GatewayCard'
import ProjectGatewayList from './Components/ProjectGatewayList'

@inject('rootStore', 'clusterStore')
@observer
@trigger
export default class Getway extends React.Component {
  store = new GatewayStore()

  @observable
  hostGateway = {}

  @observable
  isLoading = false

  get component() {
    return this.props.match.params.component
  }

  get cluster() {
    return this.props.match.params.cluster
  }

  get prefix() {
    return this.props.match.url
  }

  get tabs() {
    return {
      value: this.component,
      onChange: this.handleTabChange,
      options: [
        {
          value: 'cluster',
          label: t('CLUSTER_GATEWAY'),
        },
        {
          value: 'project',
          label: t('PROJECT_GATEWAY_PL'),
        },
      ],
    }
  }

  get enabledActions() {
    return globals.app.getActions({
      module: 'cluster-settings',
      cluster: this.cluster,
    })
  }

  getData = async () => {
    this.isLoading = true
    const { cluster } = this.props.match.params
    this.hostGateway = await this.store.getGateway({ cluster })
    this.isLoading = false
  }

  componentDidMount() {
    this.getData()
  }

  componentDidUpdate(prevProps) {
    const component = prevProps.match.params.component
    if (component !== this.component && this.component === 'cluster') {
      this.getData()
    }
  }

  handleTabChange = component => {
    this.props.rootStore.routing.push(
      `/clusters/${this.cluster}/gateways/${component}`
    )
  }

  renderGatewayCard = () => {
    return this.component === 'cluster' ? (
      <Loading spinning={this.isLoading}>
        <GatewayCard
          type="cluster"
          {...this.props}
          actions={this.enabledActions}
          prefix={this.prefix}
          detail={this.hostGateway}
          store={this.store}
          getData={this.getData}
        />
      </Loading>
    ) : (
      <ProjectGatewayList {...this.props} type="project" />
    )
  }

  render() {
    return (
      <>
        <Banner
          icon="loadbalancer"
          title={t('GATEWAY_SETTINGS')}
          description={t('CLUSTER_GATEWAY_DESC')}
          tabs={this.tabs}
        />
        {this.renderGatewayCard()}
      </>
    )
  }
}
