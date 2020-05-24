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
import Selector from 'projects/components/Selector'

import DevOpsStore from 'stores/devops'

import styles from './layout.scss'

@inject('rootStore')
@observer
class DevOpsLayout extends Component {
  constructor(props) {
    super(props)

    this.store = new DevOpsStore()
    this.init(props.match.params)
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.match.params.project_id !== this.props.match.params.project_id
    ) {
      this.init(this.props.match.params)
    }
  }

  async init(params) {
    this.store.initializing = true
    await this.store.fetchDetail(params)

    this.store.initializing = false
  }

  get project() {
    return this.props.match.params.project_id
  }

  get routing() {
    return this.props.rootStore.routing
  }

  handleChange = url => this.routing.push(url)

  render() {
    const { match, route, location } = this.props
    const { initializing, data } = this.store

    if (initializing) {
      return <Loading className={styles.loading} />
    }

    return (
      <Provider devopsStore={this.store}>
        <>
          <div className="ks-page-side">
            <Selector
              type="devops"
              title={t('DevOps Project')}
              value={this.project}
              onChange={this.handleChange}
              workspace={data.workspace}
            />
            <Nav
              className="ks-page-nav"
              navs={globals.app.getDevOpsNavs(this.project)}
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

export default DevOpsLayout
