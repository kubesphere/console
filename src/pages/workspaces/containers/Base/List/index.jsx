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
import { inject, observer } from 'mobx-react'

import { renderRoutes } from 'utils/router.config'

import { Nav } from 'components/Layout'
import Selector from 'workspaces/components/Selector'

@inject('rootStore', 'workspaceStore')
@observer
class WorkspaceLayout extends Component {
  get workspace() {
    return this.props.match.params.workspace
  }

  get routing() {
    return this.props.rootStore.routing
  }

  get canViewOverview() {
    return globals.app.hasPermission({
      workspace: this.workspace,
      module: 'projects',
      action: 'view',
    })
  }

  getRoutes() {
    const { routes, path } = this.props.route
    if (routes && !this.canViewOverview) {
      routes.forEach(route => {
        if (route.path === path && route.redirect) {
          route.redirect.to = `${path}/projects`
        }
      })
    }
    return routes
  }

  enterWorkspace = async workspace =>
    this.routing.push(`/workspaces/${workspace}/overview`)

  render() {
    const { match, location } = this.props
    const { detail } = this.props.workspaceStore
    return (
      <div className="ks-page">
        <div className="ks-page-side">
          <Selector
            icon={detail.logo}
            detail={detail}
            onChange={this.enterWorkspace}
          />
          <Nav
            className="ks-page-nav"
            navs={globals.app.getWorkspaceNavs(this.workspace)}
            location={location}
            match={match}
          />
        </div>
        <div className="ks-page-main">{renderRoutes(this.getRoutes())}</div>
      </div>
    )
  }
}

export default WorkspaceLayout
