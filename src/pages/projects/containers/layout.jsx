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

import WorkspaceStore from 'stores/workspace'
import ProjectStore from 'stores/project'
import QuotaStore from 'stores/quota'

@inject('rootStore')
@observer
class ProjectLayout extends Component {
  constructor(props) {
    super(props)

    if (!this.props.rootStore.workspace) {
      const workspaceStore = new WorkspaceStore()
      this.props.rootStore.register('workspace', workspaceStore)
    }

    if (!this.props.rootStore.project) {
      const projectStore = new ProjectStore()
      this.props.rootStore.register('project', projectStore)
    }

    if (!this.props.rootStore.quota) {
      const quotaStore = new QuotaStore()
      this.props.rootStore.register('quota', quotaStore)
    }

    this.init(props.match.params)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.namespace !== this.project) {
      this.init(nextProps.match.params)
    }
  }

  async init(params) {
    const { quota, project } = this.props.rootStore

    quota.fetch(params)

    project.initializing = true

    await this.fetchProject(params.namespace)
    await this.fetchWorkspace(project.data.workspace)

    project.initializing = false
  }

  get project() {
    return this.props.match.params.namespace
  }

  get routing() {
    return this.props.rootStore.routing
  }

  async fetchProject(namespace) {
    const { project } = this.props.rootStore

    await project.fetchDetail({ namespace })

    const projectRule = get(globals.user, `rules[${namespace}]`)
    if (projectRule === undefined) {
      await project.fetchRules({ namespace, workspace: project.data.workspace })
    }
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
    const { initializing } = this.props.rootStore.project
    const { detail } = this.props.rootStore.workspace

    if (initializing) {
      return <Loading className="ks-page-loading" />
    }

    return (
      <div>
        <div className="ks-page-side">
          <Selector
            title={t('Projects')}
            value={this.project}
            onChange={this.handleChange}
            workspace={detail}
          />
          <Nav
            className="ks-page-nav"
            navs={globals.app.getProjectNavs(this.project)}
            location={location}
            match={match}
          />
        </div>
        <div className="ks-page-main">{renderRoutes(route.routes)}</div>
      </div>
    )
  }
}

export default ProjectLayout
