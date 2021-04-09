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
import React, { Component } from 'react'
import { pick, set } from 'lodash'
import { inject, observer, Provider } from 'mobx-react'
import { Loading } from '@kube-design/components'

import { renderRoutes } from 'utils/router.config'

import DevOpsStore from 'stores/devops'
import ClusterStore from 'stores/cluster'

@inject('rootStore')
@observer
export default class Layout extends Component {
  constructor(props) {
    super(props)
    this.store = new DevOpsStore()
    this.clusterStore = new ClusterStore()
  }

  get cluster() {
    return this.props.match.params.cluster
  }

  get devops() {
    return this.props.match.params.devops
  }

  get workspace() {
    return this.props.match.params.workspace
  }

  get routing() {
    return this.props.rootStore.routing
  }

  componentDidMount() {
    this.init()
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.match.params.cluster !== this.cluster ||
      prevProps.match.params.devops !== this.devops
    ) {
      this.init()
    }
  }

  async init() {
    this.store.initializing = true
    const params = {
      cluster: this.cluster,
      devops: this.devops,
      workspace: this.workspace,
    }

    await Promise.all([
      this.store.fetchDetail(params),
      this.clusterStore.fetchDetail({ name: params.cluster }),
      this.props.rootStore.getRules({
        workspace: this.workspace,
      }),
    ])

    await this.props.rootStore.getRules(params)

    set(
      globals,
      `clusterConfig.${params.cluster}`,
      this.clusterStore.detail.configz
    )

    globals.app.cacheHistory(this.props.match.url, {
      type: 'DevOps',
      name: this.devops,
      aliasName: this.store.data.aliasName,
      cluster: pick(this.clusterStore.detail, [
        'name',
        'aliasName',
        'group',
        'provider',
      ]),
    })

    this.store.initializing = false
  }

  render() {
    const { initializing } = this.store
    if (initializing) {
      return <Loading className="ks-page-loading" />
    }
    return (
      <Provider devopsStore={this.store}>
        {renderRoutes(this.props.route.routes)}
      </Provider>
    )
  }
}
