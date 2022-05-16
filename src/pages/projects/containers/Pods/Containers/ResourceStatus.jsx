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
import { inject, observer } from 'mobx-react'

import VolumesCard from 'components/Cards/Volumes'
import ProbeCard from 'projects/components/Cards/Probe'
import LifecycleCard from 'projects/components/Cards/Lifecycle'

@inject('detailStore')
@observer
class ContainersResourceStatus extends React.Component {
  get store() {
    return this.props.detailStore
  }

  renderVolumes() {
    const containers = [toJS(this.store.detail)]
    const volumes = toJS(this.store.volumes)

    return (
      <VolumesCard
        title={t('VOLUME_PL')}
        volumes={volumes}
        containers={containers}
        loading={this.store.isLoading}
        match={this.props.match}
      />
    )
  }

  renderProb() {
    const { livenessProbe, readinessProbe } = toJS(this.store.detail)

    if (!livenessProbe && !readinessProbe) {
      return null
    }

    return <ProbeCard detail={this.store.detail} />
  }

  renderLife() {
    const { lifecycle } = toJS(this.store.detail)

    if (!lifecycle) {
      return null
    }

    return <LifecycleCard detail={this.store.detail} />
  }

  render() {
    return (
      <div>
        {this.renderProb()}
        {this.renderLife()}
        {this.renderVolumes()}
      </div>
    )
  }
}

export default ContainersResourceStatus
