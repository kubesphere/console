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
import { get } from 'lodash'

import { Component as Base } from 'fedprojects/containers/Deployments/Detail/ResourceStatus'
import FederatedStore from 'stores/federated'

import ServiceCard from './ServiceCard'

@inject('projectStore', 'detailStore')
@observer
class ResourceStatus extends Base {
  serviceStore = new FederatedStore({ module: 'services' })

  componentDidMount() {
    this.fetchService()
  }

  fetchService = async () => {
    const { namespace, template } = this.store.detail
    const name = get(template, 'spec.serviceName', '')
    if (name) {
      await this.serviceStore.fetchDetail({ name, namespace })
    }
  }

  renderServices() {
    const { detail, isLoading } = this.serviceStore
    const { workspace } = this.props.match.params

    if (!detail.name) return null

    return (
      <ServiceCard service={detail} workspace={workspace} loading={isLoading} />
    )
  }

  renderContent() {
    return (
      <div>
        {this.renderReplicaInfo()}
        {this.renderServices()}
        {this.renderContainerPorts()}
        {this.renderPods()}
      </div>
    )
  }
}

export default ResourceStatus
