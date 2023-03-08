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
import { set } from 'lodash'
import React, { Component } from 'react'
import { toJS } from 'mobx'
import { inject, observer } from 'mobx-react'

import { renderRoutes } from 'utils/router.config'
import { Nav } from 'components/Layout'
import Selector from 'projects/components/Selector'

import ClusterStore from 'stores/cluster'
import WorkspaceStore from 'stores/workspace'
import ProjectStore from 'stores/project'

@inject('rootStore', 'projectStore')
@observer
export default class FederatedProjectLayout extends Component {
  constructor(props) {
    super(props)

    this.store = new ClusterStore()
    this.clusterStore = new ClusterStore()
    this.workspaceStore = new WorkspaceStore()
    this.projectStore = new ProjectStore()
  }

  componentDidMount() {
    this.setGlobals()
  }

  state = {
    fetchFin: false,
  }

  get project() {
    return this.props.match.params.namespace
  }

  get routing() {
    return this.props.rootStore.routing
  }

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

  handleChange = url => this.routing.push(url)

  render() {
    const { match, route, location } = this.props
    const { detail } = this.props.projectStore

    return (
      <div className="ks-page">
        <div className="ks-page-side">
          <Selector
            title={t('MULTI_CLUSTER_PROJECT_SCAP')}
            type="federatedprojects"
            detail={detail}
            workspace={match.params.workspace}
            onChange={this.handleChange}
            isFederated
          />
          <Nav
            className="ks-page-nav"
            navs={globals.app.getFederatedProjectNavs()}
            location={location}
            match={match}
          />
        </div>
        <div className="ks-page-main">{renderRoutes(route.routes)}</div>
      </div>
    )
  }
}
