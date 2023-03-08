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
import { toJS } from 'mobx'
import { inject, observer } from 'mobx-react'
import { get, set } from 'lodash'

import { renderRoutes, getIndexRoute } from 'utils/router.config'

import { Nav } from 'components/Layout'
import Selector from 'workspaces/components/Selector'

import ClusterStore from 'stores/cluster'
import WorkspaceStore from 'stores/workspace'
import ProjectStore from 'stores/project'

@inject('rootStore', 'workspaceStore')
@observer
class WorkspaceLayout extends Component {
  constructor(props) {
    super(props)

    this.store = new ClusterStore()
    this.clusterStore = new ClusterStore()
    this.workspaceStore = new WorkspaceStore()
    this.projectStore = new ProjectStore()
  }

  state = {
    fetchFin: false,
  }

  componentDidMount() {
    this.setGlobals()
  }

  get workspace() {
    return this.props.match.params.workspace
  }

  get routing() {
    return this.props.rootStore.routing
  }

  enterWorkspace = async workspace =>
    this.routing.push(`/workspaces/${workspace}/`)

  async setGlobals() {
    const storeArray = [
      { store: this.clusterStore, arrayName: 'clusterArray' },
      {
        store: this.workspaceStore,
        arrayName: 'workspaceArray',
      },
      {
        store: this.projectStore,
        arrayName: 'projectArray',
        searchKey: ['cluster', 'workspace'],
      },
    ]

    const param = {}
    storeArray.map(async item => {
      if (item.searchKey) {
        item.searchKey.forEach(para => {
          param[para] = this.props.match.params[para]
        })
      }
      await item.store.fetchList({ limit: Infinity, ...param })
      set(globals, item.arrayName, toJS(item.store.list.data))
    })

    this.setState({
      fetchFin: true,
    })
  }

  render() {
    const {
      match,
      location,
      route: { routes = [], path },
    } = this.props
    const { detail } = this.props.workspaceStore
    const navs = globals.app.getWorkspaceNavs(this.workspace)
    const indexPath = get(navs, '[0].items[0].name')

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
            navs={navs}
            location={location}
            match={match}
          />
        </div>
        <div className="ks-page-main">
          {indexPath &&
            renderRoutes([
              ...routes,
              getIndexRoute({
                path,
                to: `${path}/${indexPath}`,
                exact: true,
              }),
              getIndexRoute({ path: '*', to: '/404', exact: true }),
            ])}
        </div>
      </div>
    )
  }
}

export default WorkspaceLayout
