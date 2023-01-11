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
import { isEmpty, flatten, uniqBy, isNil, throttle } from 'lodash'

import HpaStore from 'stores/workload/hpa'

import PodsCard from 'components/Cards/Pods'
import ContainerPortsCard from 'components/Cards/Containers/Ports'
import HPACard from 'projects/components/Cards/HPA'
import ReplicaCard from 'projects/components/Cards/Replica'
import S2iBuilderCard from 'projects/components/Cards/S2iBuilder'
import Placement from 'projects/components/Cards/Placement'

import styles from './index.scss'

class ResourceStatus extends React.Component {
  constructor(props) {
    super(props)

    this.hpaStore = props.hpaStore || new HpaStore()

    this.state = {
      podNums: props.detailStore.podNums,
      availablePodNums: props.detailStore.availablePodNums,
    }
  }

  get module() {
    return this.props.detailStore.module
  }

  get store() {
    return this.props.detailStore
  }

  get prefix() {
    const { workspace, cluster } = this.props.match.params
    return `${workspace ? `/${workspace}` : ''}/clusters/${cluster}`
  }

  get enabledActions() {
    return globals.app.getActions({
      module: this.module,
      ...this.props.match.params,
      project: this.props.match.params.namespace,
    })
  }

  get volumesTitle() {
    return t('STORAGE_DEVICES')
  }

  get enableScaleReplica() {
    return (
      this.enabledActions.includes('edit') && !this.store.detail.isFedManaged
    )
  }

  componentDidMount() {
    this.fetchData()
  }

  fetchReplica = throttle(async () => {
    const { params } = this.props.match
    const res = await this.store.getReplica(params)
    this.setState({
      podNums: res.podNums,
      availablePodNums: res.availablePodNums,
    })
  }, 500)

  fetchData = () => {
    const { cluster, namespace, name } = this.store.detail

    if (this.module === 'deployments') {
      const { annotations = {} } = this.store.detail
      const params = {
        cluster,
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
    const { cluster, namespace, name } = this.store.detail
    this.store.scale({ cluster, namespace, name }, newReplicas)
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

  renderS2IBuilder() {
    const { cluster, namespace } = this.props.match.params
    const { detail } = this.store

    if (isEmpty(toJS(detail.builderNames))) {
      return null
    }

    return (
      <S2iBuilderCard
        builderNames={toJS(detail.builderNames)}
        cluster={cluster}
        namespace={namespace}
        className={styles.deployment_codeResource}
      />
    )
  }

  renderReplicaInfo() {
    const detail = toJS(this.store.detail)
    const { availablePodNums, podNums } = this.state

    return (
      <ReplicaCard
        module={this.module}
        detail={{ ...detail, availablePodNums, podNums }}
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
    const { noPorts } = this.props

    if (noPorts) {
      return null
    }

    const { isLoading } = this.store
    let { containers } = toJS(this.store.detail)
    containers = isNil(containers) ? [] : containers
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
    return (
      <PodsCard
        prefix={this.prefix}
        detail={this.store.detail}
        getReplica={this.fetchReplica}
      />
    )
  }

  renderContent() {
    return (
      <div>
        {this.renderPlacement()}
        {this.renderReplicaInfo()}
        {this.renderHpaConfig()}
        {this.renderContainerPorts()}
        {this.renderS2IBuilder()}
        {this.renderPods()}
      </div>
    )
  }

  render() {
    return <div className={styles.main}>{this.renderContent()}</div>
  }
}

export default inject('detailStore', 'hpaStore')(observer(ResourceStatus))
export const Component = ResourceStatus
