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
import { Component as Base } from 'projects/containers/Deployments/Detail/ResourceStatus'
import PodsCard from 'components/Cards/Pods'
import { Loading } from '@pitrix/lego-ui'

@inject('detailStore', 's2iRunStore')
@observer
class JobsResourceStatus extends Base {
  get store() {
    return this.props.s2iRunStore
  }

  renderPods() {
    const { workspace, cluster } = this.props.match.params

    return (
      <PodsCard
        prefix={`/${workspace ? `/${workspace}` : ''}/clusters/${cluster}`}
        detail={{ cluster, ...this.store.jobDetail }}
      />
    )
  }

  renderContent() {
    const { isLoading } = this.store

    if (isLoading) {
      return <Loading />
    }
    return (
      <div>
        {this.renderContainerPorts()}
        {this.renderPods()}
      </div>
    )
  }
}

export default JobsResourceStatus
