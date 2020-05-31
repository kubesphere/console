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
import Selector from 'clusters/components/Selector'

import ClusterStore from 'stores/cluster'

import styles from './layout.scss'

@inject('rootStore')
@observer
class ClusterLayout extends Component {
  constructor(props) {
    super(props)

    this.clusterStore = new ClusterStore()

    this.init(props.match.params)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.cluster !== this.cluster) {
      this.init(this.props.match.params)
    }
  }

  async init(params) {
    this.clusterStore.initializing = true

    await Promise.all([
      this.clusterStore.fetchDetail({
        name: params.cluster,
      }),
      this.props.rootStore.getRules({ cluster: params.cluster }),
    ])

    this.clusterStore.fetchProjects({
      cluster: params.cluster,
    })

    this.clusterStore.initializing = false
  }

  get cluster() {
    return this.props.match.params.cluster
  }

  get routing() {
    return this.props.rootStore.routing
  }

  enterCluster = async cluster =>
    // if (globals.app.isClusterAdmin) {
    this.routing.push(`/clusters/${cluster}/overview`)
  // }

  // return this.routing.push(`/dashboard`)

  render() {
    const { match, route, location } = this.props
    const { detail, initializing } = this.clusterStore

    if (initializing) {
      return <Loading className={styles.loading} />
    }

    return (
      <Provider clusterStore={this.clusterStore}>
        <>
          <div className="ks-page-side">
            <Selector
              icon={detail.icon}
              value={this.cluster}
              onChange={this.enterCluster}
            />
            <Nav
              className="ks-page-nav"
              navs={globals.app.getClusterNavs(this.cluster)}
              location={location}
              match={match}
              disabled={!detail.isReady}
            />
          </div>
          <div className="ks-page-main">{renderRoutes(route.routes)}</div>
        </>
      </Provider>
    )
  }
}

export default ClusterLayout
