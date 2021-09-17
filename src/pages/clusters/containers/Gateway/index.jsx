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

import GatewayCard from './Components/GatewayCard'
import ProjectGatewayList from './Components/ProjectGatewayList'

@inject('rootStore', 'clusterStore')
@observer
@trigger
export default class Getway extends React.Component {
  get component() {
    return this.props.match.params.component
  }

  get cluster() {
    return this.props.match.params.cluster
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
          label: t('PROJECT_GATEWAY'),
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

  handleTabChange = component => {
    this.props.rootStore.routing.push(
      `/clusters/${this.cluster}/gateways/${component}`
    )
  }

  renderGatewayCard = () => {
    return this.component === 'cluster' ? (
      <GatewayCard
        type="cluster"
        {...this.props}
        actions={this.enabledActions}
      />
    ) : (
      <ProjectGatewayList {...this.props} />
    )
  }

  render() {
    return (
      <>
        <Banner
          icon="loadbalancer"
          title={t('GATEWAY_SETTING')}
          description={t('GATEWAY_DESC')}
          tabs={this.tabs}
        />
        {this.renderGatewayCard()}
      </>
    )
  }
}
