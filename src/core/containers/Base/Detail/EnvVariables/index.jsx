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
import { isEmpty, get } from 'lodash'

import EnvStore from 'stores/workload/env'

import ContainerEnvCard from 'components/Cards/Containers/EnvVariables'

class EnvVariables extends React.Component {
  constructor(props) {
    super(props)

    this.envStore = new EnvStore()
    this.fetchData()
  }

  get module() {
    return this.store.module
  }

  get store() {
    return this.props.detailStore
  }

  get namespace() {
    return this.store.detail.namespace
  }

  get cluster() {
    return this.store.detail.cluster
  }

  get containers() {
    const data = toJS(this.store.detail)
    const { spec, containers = [] } = data

    if (this.module === 'containers') return [data]

    if (!isEmpty(containers)) return containers
    if (!isEmpty(spec)) return get(spec, 'template.spec.containers', [])

    return []
  }

  get initContainers() {
    const data = toJS(this.store.detail)
    const { spec, initContainers = [] } = data

    if (this.module === 'containers') return [data]

    if (!isEmpty(initContainers)) return initContainers
    if (!isEmpty(spec)) return get(spec, 'template.spec.initContainers', [])

    return []
  }

  fetchData = () => {
    this.envStore.fetchList({
      namespace: this.namespace,
      cluster: this.cluster,
      containers: this.containers,
      initContainers: this.initContainers,
    })
  }

  render() {
    const { data, isLoading } = toJS(this.envStore.list)

    return (
      <div>
        {data.map((container, index) => (
          <ContainerEnvCard
            key={index}
            detail={container}
            expand={index === 0}
            loading={isLoading}
          />
        ))}
      </div>
    )
  }
}

export default inject('rootStore', 'detailStore')(observer(EnvVariables))
export const Component = EnvVariables
