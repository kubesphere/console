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
import { inject, observer, Provider } from 'mobx-react'
import { set, pick } from 'lodash'

import { Loading } from '@kube-design/components'

import { renderRoutes } from 'utils/router.config'

import ClusterStore from 'stores/cluster'

@inject('rootStore')
@observer
export default class App extends Component {
  constructor(props) {
    super(props)

    this.store = new ClusterStore()
  }

  componentDidMount() {
    this.init(this.props.match.params)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.cluster !== this.cluster) {
      this.init(this.props.match.params)
    }
  }

  async init(params) {
    this.store.initializing = true

    if (params.cluster) {
      await Promise.all([
        this.store.fetchDetail({ name: params.cluster }),
        this.props.rootStore.getRules({ cluster: params.cluster }),
      ])

      if (this.store.detail.isReady) {
        await this.store.fetchProjects({ cluster: params.cluster })
      }

      set(globals, `clusterConfig.${params.cluster}`, this.store.detail.configz)

      globals.app.cacheHistory(this.props.match.url, {
        type: 'Cluster',
        ...pick(this.store.detail, ['name', 'aliasName', 'group', 'isHost']),
      })
    }

    this.store.initializing = false
  }

  get cluster() {
    return this.props.match.params.cluster
  }

  render() {
    const { initializing } = this.store

    if (initializing) {
      return <Loading className="ks-page-loading" />
    }

    return (
      <Provider clusterStore={this.store}>
        {renderRoutes(this.props.route.routes)}
      </Provider>
    )
  }
}
