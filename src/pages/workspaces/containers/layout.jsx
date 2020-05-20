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

// import { get } from 'lodash'
import React, { Component } from 'react'
import { inject, observer, Provider } from 'mobx-react'
import { Loading } from '@pitrix/lego-ui'

import { renderRoutes } from 'utils/router.config'

import { Nav } from 'components/Layout'
import Selector from 'workspaces/components/Selector'

import WorkspaceStore from 'stores/workspace'

import styles from './layout.scss'

@inject('rootStore')
@observer
class WorkspaceLayout extends Component {
  constructor(props) {
    super(props)

    this.store = new WorkspaceStore()

    this.init(props.match.params)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.workspace !== this.workspace) {
      this.init(this.props.match.params)
    }
  }

  async init(params) {
    this.store.initializing = true

    await Promise.all([
      this.store.fetchDetail(params),
      this.store.fetchClusters({ workspace: this.workspace, limit: -1 }),
    ])
    // const workspaceRule = get(
    //   globals.user,
    //   `workspace_rules[${params.workspace}]`
    // )

    // if (workspaceRule === undefined) {
    //   await this.store.fetchRules(params)
    // }

    // if (
    //   !globals.app.hasPermission({ module: 'workspaces', action: 'manage' }) &&
    //   !globals.app.hasPermission({
    //     module: 'workspaces',
    //     action: 'view',
    //     workspace: params.workspace,
    //   })
    // ) {
    //   this.routing.push('/404')
    //   return
    // }

    this.store.initializing = false
  }

  get workspace() {
    return this.props.match.params.workspace
  }

  get routing() {
    return this.props.rootStore.routing
  }

  enterWorkspace = async workspace =>
    this.routing.push(`/workspaces/${workspace}/overview`)
  // if (globals.app.isClusterAdmin) {
  //   return this.routing.push(`/workspaces/${workspace}/overview`)
  // }

  // const workspace_rule = get(globals.user, `workspace_rules[${workspace}]`)
  // if (!workspace_rule) {
  //   await this.store.fetchRules({ workspace })
  // }

  // if (
  //   globals.app.hasPermission({ module: 'workspaces', action: 'manage' }) ||
  //   globals.app.hasPermission({
  //     module: 'workspaces',
  //     action: 'view',
  //     workspace,
  //   })
  // ) {
  //   return this.routing.push(`/workspaces/${workspace}/overview`)
  // }

  // return this.routing.push(`/dashboard`)

  render() {
    const { match, route, location } = this.props
    const { detail, initializing } = this.store

    if (initializing) {
      return <Loading className={styles.loading} />
    }

    return (
      <Provider workspaceStore={this.store}>
        <>
          <div className="ks-page-side">
            <Selector
              icon={detail.logo}
              value={this.workspace}
              onChange={this.enterWorkspace}
              // multi={globals.user.workspaces.length > 1}
            />
            <Nav
              className="ks-page-nav"
              navs={globals.app.getWorkspaceNavs(this.workspace)}
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

export default WorkspaceLayout
