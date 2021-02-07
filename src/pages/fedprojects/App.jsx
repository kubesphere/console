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
import { set } from 'lodash'
import { toJS } from 'mobx'
import { inject, observer, Provider } from 'mobx-react'

import { Loading } from '@kube-design/components'

import { renderRoutes } from 'utils/router.config'

import FederatedStore from 'stores/federated'
import ClusterStore from 'stores/cluster'

import routes from './routes'

@inject('rootStore')
@observer
export default class App extends Component {
  constructor(props) {
    super(props)

    this.store = new FederatedStore({ module: 'namespaces' })

    this.clusterStore = new ClusterStore()

    this.init(props.match.params)
  }

  componentDidUpdate(prevProps) {
    if (this.project !== prevProps.match.params.namespace) {
      this.init(this.props.match.params)
    }
  }

  async init(params) {
    this.store.initializing = true

    await Promise.all([
      this.store.fetchDetail({ ...params, name: params.namespace }),
      this.props.rootStore.getRules({ workspace: params.workspace }),
    ])
    await this.props.rootStore.getRules(params)

    await this.clusterStore.fetchList({
      names: this.store.detail.clusters.map(item => item.name).join(','),
      sortBy: 'createTime',
      ascending: true,
      limit: -1,
    })
    this.store.detail.clusters = toJS(this.clusterStore.list.data)

    this.store.detail.clusters.forEach(cluster => {
      set(globals, `clusterConfig.${cluster.name}`, cluster.configz)
    })

    await this.props.rootStore.getRules(params)

    globals.app.cacheHistory(this.props.match.url, {
      type: 'Multi-cluster Project',
      name: this.store.detail.name,
      aliasName: this.store.detail.aliasName,
      isFedManaged: true,
    })

    this.store.initializing = false
  }

  get project() {
    return this.props.match.params.namespace
  }

  render() {
    const { initializing } = this.store

    if (initializing) {
      return <Loading className="ks-page-loading" />
    }

    return <Provider projectStore={this.store}>{renderRoutes(routes)}</Provider>
  }
}
