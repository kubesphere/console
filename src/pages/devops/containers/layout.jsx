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

import { get } from 'lodash'
import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Loading } from '@pitrix/lego-ui'

import { renderRoutes } from 'utils/router.config'
import { Nav } from 'components/Layout'
import Selector from 'projects/components/Selector'

import DevOpsStore from 'stores/devops'
import WorkspaceStore from 'stores/workspace'

import styles from './layout.scss'

@inject('rootStore')
@observer
class DevOpsLayout extends Component {
  constructor(props) {
    super(props)

    if (!this.props.rootStore.workspace) {
      const workspaceStore = new WorkspaceStore()
      this.props.rootStore.register('workspace', workspaceStore)
    }

    if (!this.props.rootStore.devops) {
      const devopsStore = new DevOpsStore()
      props.rootStore.register('devops', devopsStore)
    }

    this.init(props.match.params)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.project_id !== this.project) {
      this.init(this.props.match.params)
    }
  }

  async init(params) {
    const { devops } = this.props.rootStore

    devops.initializing = true

    await this.fetchDevOps(params.project_id)
    await this.fetchWorkspace(devops.data.workspace)

    devops.initializing = false
  }

  get project() {
    return this.props.match.params.project_id
  }

  get routing() {
    return this.props.rootStore.routing
  }

  fetchDevOps(project_id) {
    const requests = []
    const { devops } = this.props.rootStore

    requests.push(devops.fetchDetail({ project_id }))

    const devopsRule = get(globals.user, `rules[${project_id}]`)
    if (devopsRule === undefined) {
      requests.push(devops.fetchRules({ project_id }))
    }

    return Promise.all(requests)
  }

  fetchWorkspace(workspace) {
    const requests = []
    const { workspace: workspaceStore } = this.props.rootStore

    requests.push(workspaceStore.fetchDetail({ workspace }))

    const workspaceRule = get(globals.user, `workspace_rules[${workspace}]`)
    if (workspaceRule === undefined) {
      requests.push(workspaceStore.fetchRules({ workspace }))
    }

    return Promise.all(requests)
  }

  handleChange = url => this.routing.push(url)

  render() {
    const { match, route, location } = this.props
    const { initializing, data: devopsDetail } = this.props.rootStore.devops
    const { detail } = this.props.rootStore.workspace

    if (initializing) {
      return <Loading className={styles.loading} />
    }

    return (
      <div>
        <div className="ks-page-side">
          <Selector
            type="devops"
            icon="/assets/default-project.svg"
            defaultIcon="/assets/default-project.svg"
            title={t('DevOps Project')}
            value={devopsDetail.name}
            onChange={this.handleChange}
            workspace={detail}
          />
          <Nav
            className="ks-page-nav"
            navs={globals.app.getDevOpsNavs(this.project)}
            location={location}
            match={match}
          />
        </div>
        <div className="ks-page-main">{renderRoutes(route.routes)}</div>
      </div>
    )
  }
}

export default DevOpsLayout
