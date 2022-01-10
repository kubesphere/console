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
import { toJS } from 'mobx'
import { observer, inject } from 'mobx-react'
import { isEmpty } from 'lodash'

import ContainersCard from 'components/Cards/Containers'
import VolumesCard from 'components/Cards/Volumes'

@inject('detailStore')
@observer
class PodsResourceStatus extends React.Component {
  get module() {
    return this.props.detailStore.module
  }

  get store() {
    return this.props.detailStore
  }

  get prefix() {
    return this.props.match.url
      .split('/')
      .slice(0, -1)
      .join('/')
  }

  renderContainers() {
    const { name, cluster, containers, initContainers } = toJS(
      this.store.detail
    )
    return (
      <ContainersCard
        prefix={this.prefix}
        cluster={cluster}
        title={t('CONTAINER_PL')}
        containers={containers}
        initContainers={initContainers}
        podName={name}
      />
    )
  }

  renderVolumes() {
    const { volumes, containers } = toJS(this.store.detail)

    if (isEmpty(volumes)) return null

    return (
      <VolumesCard
        volumes={volumes}
        containers={containers}
        loading={this.store.isLoading}
        match={this.props.match}
      />
    )
  }

  renderContent() {
    return (
      <div>
        {this.renderContainers()}
        {this.renderVolumes()}
      </div>
    )
  }

  render() {
    return <div>{this.renderContent()}</div>
  }
}

export default PodsResourceStatus
