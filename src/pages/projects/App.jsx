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
import { Loading } from '@pitrix/lego-ui'
import { set } from 'lodash'

import { renderRoutes } from 'utils/router.config'

import ProjectStore from 'stores/project'
import ClusterStore from 'stores/cluster'

import routes from './routes'

@inject('rootStore')
@observer
class ProjectLayout extends Component {
  constructor(props) {
    super(props)

    this.store = new ProjectStore()
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
      this.store.fetchDetail(params),
      this.clusterStore.fetchDetail({ name: params.cluster }),
      this.props.rootStore.getRules({
        workspace: params.workspace,
      }),
    ])

    await this.props.rootStore.getRules(params)

    this.clusterStore.detail.configz.devops = false
    set(
      globals,
      `clusterConfig.${params.cluster}`,
      this.clusterStore.detail.configz
    )

    globals.app.cacheHistory(this.props.match.url, {
      type: 'Project',
      name: this.store.detail.name,
      description: this.store.detail.description,
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

export default ProjectLayout
