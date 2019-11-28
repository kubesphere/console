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
import { observer } from 'mobx-react'
import { isEmpty, get, flatten, uniqBy } from 'lodash'

import HpaStore from 'stores/workload/hpa'
import ResourceStore from 'stores/workload/resource'

import PodsCard from 'components/Cards/Pods'
import VolumesCard from 'components/Cards/Volumes'
import ContainerPortsCard from 'components/Cards/Containers/Ports'
import HPACard from 'projects/components/Cards/HPA'
import ReplicaCard from 'projects/components/Cards/Replica'
import S2iBuilderCard from 'projects/components/Cards/S2iBuilder'

import styles from './index.scss'

class ResourceStatus extends React.Component {
  constructor(props) {
    super(props)

    this.resourceStore = props.resourceStore || new ResourceStore(this.module)
    this.hpaStore = props.hpaStore || new HpaStore()

    this.state = {}
  }

  get module() {
    return this.props.module
  }

  get store() {
    return this.props.detailStore
  }

  get enabledActions() {
    return globals.app.getActions({
      module: this.module,
      project: this.props.match.params.namespace,
    })
  }

  get volumesTitle() {
    return t('Storage Device')
  }

  get enableScaleReplica() {
    return (
      this.enabledActions.includes('edit') && !get(this.hpaStore.detail, 'name')
    )
  }

  componentDidMount() {
    this.fetchData()
  }

  fetchData = () => {
    const { namespace, name } = this.store.detail

    if (this.module === 'deployments') {
      const { annotations = {} } = this.store.detail
      const params = {
        namespace,
        name: annotations['kubesphere.io/relatedHPA'] || name,
      }

      this.hpaStore.checkName(params).then(resp => {
        if (resp.exist) {
          this.hpaStore.fetchDetail(params)
        }
      })
    }
  }

  handleScale = newReplicas => {
    const { namespace, name } = this.store.detail
    this.store.scale({ name, namespace }, newReplicas)
  }

  handlePodUpdate = () => {
    const { namespace, name } = this.store.detail
    this.store.fetchDetail({ namespace, name, silent: true }, false)
  }

  handleDeleteHpa = () => {
    this.store
      .patch(this.store.detail, {
        metadata: {
          annotations: {
            'kubesphere.io/relatedHPA': null,
          },
        },
      })
      .then(() => {
        this.hpaStore.reset()
      })
  }

  renderS2IBuilder = () => {
    const { namespace } = this.props.match.params
    const { detail } = this.store

    if (isEmpty(detail.builderNames)) {
      return null
    }

    return (
      <S2iBuilderCard
        builderNames={detail.builderNames}
        namespace={namespace}
        className={styles.deployment_codeResource}
      />
    )
  }

  renderReplicaInfo() {
    const detail = toJS(this.store.detail)

    return (
      <ReplicaCard
        module={this.module}
        detail={detail}
        onScale={this.handleScale}
        enableScale={this.enableScaleReplica}
      />
    )
  }

  renderHpaConfig() {
    const detail = toJS(this.hpaStore.detail)

    if (!detail.name) return null

    return (
      <HPACard
        store={this.hpaStore}
        detail={detail}
        loading={this.hpaStore.isLoading}
        onDeleted={this.handleDeleteHpa}
      />
    )
  }

  renderContainerPorts() {
    const { isLoading } = this.store
    const { containers = [] } = toJS(this.store.detail)
    const ports = uniqBy(
      flatten(
        containers.map(container =>
          isEmpty(container.ports) ? [] : container.ports
        )
      ),
      'name'
    )

    if (isEmpty(ports)) return null

    return <ContainerPortsCard ports={ports} loading={isLoading} />
  }

  renderPods() {
    const { params = {} } = this.props.match
    const { namespace, name } = params

    return (
      <PodsCard
        prefix={`/projects/${namespace}/${this.module}/${name}`}
        detail={this.store.detail}
        onUpdate={this.handlePodUpdate}
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
        {this.renderHpaConfig()}
        {this.renderContainerPorts()}
        {this.renderS2IBuilder()}
        {this.renderPods()}
        {this.renderVolumes()}
      </div>
    )
  }

  render() {
    return <div className={styles.main}>{this.renderContent()}</div>
  }
}

export default observer(ResourceStatus)
export const Component = ResourceStatus
