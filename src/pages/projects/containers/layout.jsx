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

import { renderRoutes } from 'utils/router.config'
import { Nav } from 'components/Layout'
import Selector from 'projects/components/Selector'

import ProjectStore from 'stores/project'
import FederatedStore from 'stores/federated'

@inject('rootStore')
@observer
class ProjectLayout extends Component {
  constructor(props) {
    super(props)

    this.store = new ProjectStore()
    this.fedStore = new FederatedStore('namespaces')

    this.init(props.match.params)
  }

  componentDidUpdate(prevProps) {
    if (this.project !== prevProps.match.params.namespace) {
      this.init(this.props.match.params)
    }
  }

  async init(params) {
    this.store.initializing = true

    await this.store.fetchDetail(params)
    if (this.store.detail.isFedManaged) {
      await this.fedStore.fetchDetail({ ...params, name: params.namespace })
      this.store.detail.clusters = this.fedStore.detail.clusters
    }

    this.store.initializing = false
  }

  get project() {
    return this.props.match.params.namespace
  }

  get routing() {
    return this.props.rootStore.routing
  }

  handleChange = url => this.routing.push(url)

  render() {
    const { match, route, location } = this.props
    const { initializing, detail } = this.store

    if (initializing) {
      return <Loading className="ks-page-loading" />
    }

    return (
      <Provider projectStore={this.store}>
        <>
          <div className="ks-page-side">
            <Selector
              title={t('Projects')}
              value={this.project}
              onChange={this.handleChange}
              isFedManaged={detail.isFedManaged}
              workspace={detail.workspace}
              cluster={match.params.cluster}
            />
            <Nav
              className="ks-page-nav"
              navs={globals.app.getProjectNavs(this.project)}
              location={location}
              match={match}
            />
          </div>
          <div className="ks-page-main">{renderRoutes(route.routes)}</div>
        </>
      </Provider>
    )
  }
}

export default ProjectLayout
