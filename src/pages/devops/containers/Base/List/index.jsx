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

import { Loading } from '@kube-design/components'
import { Nav } from 'components/Layout'
import { get } from 'lodash'
import { inject, observer } from 'mobx-react'
import Selector from 'projects/components/Selector'
import React, { Component } from 'react'

import { getIndexRoute, renderRoutes } from 'utils/router.config'

import styles from './index.scss'

@inject('rootStore', 'devopsStore')
@observer
class DevOpsListLayout extends Component {
  get workspace() {
    return this.props.match.params.workspace
  }

  get cluster() {
    return this.props.match.params.cluster
  }

  get devops() {
    return this.props.match.params.devops
  }

  get routing() {
    return this.props.rootStore.routing
  }

  get isHostCluster() {
    return (
      !globals.app.isMultiCluster ||
      this.cluster === this.props.devopsStore.hostName
    )
  }

  handleChange = url => this.routing.push(url)

  render() {
    const { match, route, location } = this.props
    const { initializing, detail } = this.props.devopsStore

    const navs = globals.app.getDevOpsNavs({
      devops: this.devops,
      cluster: this.cluster,
      workspace: this.workspace,
    })
    const _navs = this.isHostCluster
      ? navs
      : navs.map(nav => {
          const navsItem = nav.items.filter(
            item => item.name !== 'cd' && item.name !== 'code-repo'
          )
          nav.items = navsItem
          return nav
        })

    const indexNav = get(_navs, '[0].items[0].name', 'management')
    const indexPath = indexNav === 'management' ? 'base-info' : indexNav

    if (initializing) {
      return <Loading className={styles.loading} />
    }

    return (
      <div className="ks-page">
        <div className="ks-page-side">
          <Selector
            type="devops"
            title={t('DEVOPS_PROJECT_LOW')}
            detail={detail}
            onChange={this.handleChange}
            workspace={this.workspace}
            cluster={this.cluster}
          />
          <Nav
            className="ks-page-nav"
            navs={_navs}
            location={location}
            match={match}
          />
        </div>

        <div className="ks-page-main">
          {renderRoutes(
            [
              ...route.routes,
              getIndexRoute({
                path: route.path,
                to: `${route.path}/${indexPath}`,
                exact: true,
              }),
            ],
            {
              isHostCluster: this.isHostCluster,
            }
          )}
        </div>
      </div>
    )
  }
}

export default DevOpsListLayout
