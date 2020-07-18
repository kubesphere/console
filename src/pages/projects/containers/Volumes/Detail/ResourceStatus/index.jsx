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
import { computed } from 'mobx'
import { get } from 'lodash'

import PodsCard from 'components/Cards/Pods'
import Placement from 'projects/components/Cards/Placement'
import VolumeMonitor from 'stores/monitoring/volume'
import UsageCard from './UsageCard'

import styles from './index.scss'

@inject('detailStore')
@observer
class ResourceStatus extends React.Component {
  get store() {
    return this.props.detailStore
  }

  get module() {
    return this.props.module
  }

  @computed
  get shouldMonitoringShow() {
    const { storageClassName, inUse } = this.store.detail
    return storageClassName === 'csi-qingcloud' && inUse
  }

  get prefix() {
    const { workspace, cluster } = this.props.match.params
    return `${workspace ? `/${workspace}` : ''}/clusters/${cluster}`
  }

  constructor(props) {
    super(props)

    const { cluster, namespace, name } = this.props.match.params

    this.monitor = new VolumeMonitor({
      cluster,
      namespace,
      pvc: name,
    })
  }

  renderPlacement() {
    const { name, namespace } = this.props.match.params
    const { detail } = this.store
    if (detail.isFedManaged) {
      return (
        <Placement
          module={this.store.module}
          name={name}
          namespace={namespace}
        />
      )
    }
    return null
  }

  render() {
    const detail = {
      kind: 'PVC',
      ...get(this.props.match, 'params'),
    }

    return (
      <div className={styles.main}>
        {this.renderPlacement()}
        {this.shouldMonitoringShow && (
          <UsageCard title={t('Volume')} store={this.monitor} />
        )}
        <PodsCard
          title={t('Mounted Pods')}
          detail={detail}
          prefix={this.prefix}
        />
      </div>
    )
  }
}

export default ResourceStatus
