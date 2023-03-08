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
import { debounce, get, unset } from 'lodash'
import { renderRoutes } from 'utils/router.config'

import { Nav } from 'components/Layout'
import Selector from 'clusters/components/Selector'
import { showNameAndAlias } from 'utils'

@inject('rootStore', 'clusterStore')
@observer
class ClusterLayout extends Component {
  get cluster() {
    return this.props.match.params.cluster
  }

  get routing() {
    return this.props.rootStore.routing
  }

  enterCluster = async cluster =>
    this.routing.push(`/clusters/${cluster}/overview`)

  componentDidUpdate() {
    if (get(globals, `need_rebuild_${this.cluster}_nav`, false)) {
      this.fetchConfigz()
    }
  }

  fetchConfigz = debounce(async () => {
    const shouldDeleteFlag = await this.props.clusterStore.fetchClusterConfigz({
      cluster: this.cluster,
    })
    if (shouldDeleteFlag) {
      globals.app.getClusterNavs(this.cluster)
      unset(globals, `need_rebuild_${this.cluster}_nav`)
      this.forceUpdate()
    }
  }, 3000)

  render() {
    const { match, route, location } = this.props
    const { detail } = this.props.clusterStore

    return (
      <div className="ks-page">
        <div className="ks-page-side">
          <Selector
            icon={detail.icon}
            value={showNameAndAlias(detail)}
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
      </div>
    )
  }
}

export default ClusterLayout
