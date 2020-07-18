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

import { Component as Base } from 'projects/containers/Deployments/Detail/ResourceStatus'
import ResourceStore from 'stores/workload/resource'

import ServiceCard from './ServiceCard'

@inject('detailStore')
@observer
class ResourceStatus extends Base {
  resourceStore = new ResourceStore()

  get serviceName() {
    return get(this.store.detail, 'spec.serviceName', '')
  }

  fetchData = async () => {
    const { cluster, namespace } = this.store.detail
    const params = {
      name: this.serviceName,
      cluster,
      namespace,
    }

    await this.resourceStore.checkService(params)

    if (this.resourceStore.isExistService) {
      await this.resourceStore.fetchService(params)
    }
  }

  renderServices() {
    const { service, isLoading } = this.resourceStore

    if (!service.name) return null

    return (
      <ServiceCard prefix={this.prefix} service={service} loading={isLoading} />
    )
  }

  renderContent() {
    return (
      <div>
        {this.renderPlacement()}
        {this.renderReplicaInfo()}
        {this.renderServices()}
        {this.renderContainerPorts()}
        {this.renderPods()}
      </div>
    )
  }
}

export default ResourceStatus
