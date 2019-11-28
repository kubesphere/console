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
import { get, isEmpty } from 'lodash'

import { Alert } from '@pitrix/lego-ui'
import { Card } from 'components/Base'
import { ReplicasInput } from 'components/Inputs'
import VolumesCard from 'components/Cards/Volumes'
import ContainerTemplate from 'projects/components/Cards/ContainerTemplate'

import styles from './index.scss'

class ConfigTemplate extends React.Component {
  get module() {
    return this.props.module
  }

  get enabledActions() {
    return globals.app.getActions({
      module: this.module,
      project: this.props.match.params.namespace,
    })
  }

  get store() {
    return this.props.detailStore
  }

  get revision() {
    return Number(get(this.props, 'match.params.revision'))
  }

  get isCurRevision() {
    return this.revision === this.store.currentRevision
  }

  get replicaMsg() {
    return t('WORKLOAD_REPLICA_MSG')
  }

  get replicaStatus() {
    const { podNums } = this.store.workloadDetail
    const editable = this.enabledActions.includes('edit')

    return {
      value: podNums || 0,
      onChange: editable && this.isCurRevision && this.handleReplicaChange,
    }
  }

  get volumesTitle() {
    return t('Volumes')
  }

  handleReplicaChange = newReplicas => {
    const { name, namespace } = this.store.workloadDetail
    const params = {
      name,
      namespace,
    }

    this.store.scale(params, newReplicas).then(() => {
      this.store.fetchWorkloadDetail(params)
    })
  }

  renderReplicaInfo() {
    return (
      <Card className={styles.replica}>
        <div className={styles.replicaCount}>
          <ReplicasInput {...this.replicaStatus} />
        </div>
        <Alert type="info" message={this.replicaMsg} />
      </Card>
    )
  }

  renderContainerConfig() {
    const { containers = [], initContainers = [] } = toJS(this.store.detail)

    containers.forEach(container => {
      if (container.ready) {
        delete container.ready
      }
    })

    return (
      <ContainerTemplate
        containers={containers}
        initContainers={initContainers}
      />
    )
  }

  renderVolumes() {
    const { isLoading } = this.store
    const { volumes, containers } = toJS(this.store.detail)
    const { namespace } = this.props.match.params

    if (isEmpty(volumes)) return null

    return (
      <VolumesCard
        title={this.volumesTitle}
        volumes={volumes}
        containers={containers}
        loading={isLoading}
        prefix={`/projects/${namespace}`}
      />
    )
  }

  renderContent() {
    return (
      <div>
        {this.renderReplicaInfo()}
        {this.renderContainerConfig()}
        {this.renderVolumes()}
      </div>
    )
  }

  render() {
    return <div className={styles.main}>{this.renderContent()}</div>
  }
}

export default inject('rootStore')(observer(ConfigTemplate))
export const Component = ConfigTemplate
