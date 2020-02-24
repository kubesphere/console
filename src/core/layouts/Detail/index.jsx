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
import PropTypes from 'prop-types'

import ProjectStore from 'stores/project'
import DevOpsStore from 'stores/devops'
import WorkspaceStore from 'stores/workspace'

import { Layout, Loading } from '@pitrix/lego-ui'

import { Breadcrumb } from 'components/Base'

import styles from './index.scss'

const { LayoutHeader } = Layout

@inject('rootStore')
@observer
class DetailLayout extends Component {
  static propTypes = {
    module: PropTypes.string,
    component: PropTypes.any.isRequired,
  }

  static defaultProps = {
    module: '',
    component() {},
  }

  constructor(props) {
    super(props)

    this.state = { initializing: true }
    this.checkGlobalStore(props.match.params)
    this.detailRef = React.createRef()
  }

  componentDidMount() {
    this.init(this.props.match.params)
  }

  async init(params = {}) {
    const rootStore = this.props.rootStore

    if (params.namespace && rootStore.project) {
      const projectRule = get(globals.user, `rules[${params.namespace}]`)

      await rootStore.project.fetchDetail(params)
      if (projectRule === undefined) {
        await rootStore.project.fetchRules({
          namespace: params.namespace,
          workspace: rootStore.project.data.workspace,
        })
      }
    }

    if (params.project_id && rootStore.devops) {
      const devopsRule = get(globals.user, `rules[${params.project_id}]`)

      if (devopsRule === undefined) {
        await rootStore.devops.fetchRules(params)
      }
    }

    if (params.workspace && rootStore.workspace) {
      const workspaceRule = get(
        globals.user,
        `workspace_rules[${params.workspace}]`
      )

      if (workspaceRule === undefined) {
        await rootStore.workspace.fetchRules(params)
      }
    }

    this.setState({ initializing: false })
  }

  checkGlobalStore(params = {}) {
    const rootStore = this.props.rootStore

    if (params.namespace && !rootStore.project) {
      const projectStore = new ProjectStore()
      rootStore.register('project', projectStore)
    }

    if (params.project_id && !rootStore.devops) {
      const devopsStore = new DevOpsStore()
      rootStore.register('devops', devopsStore)
    }

    if (params.workspace && !rootStore.workspace) {
      const workspaceStore = new WorkspaceStore()
      rootStore.register('workspace', workspaceStore)
    }
  }

  goBack = () => {
    const routing = this.props.rootStore.routing

    const listUrl = get(this.detailRef, 'current.wrappedInstance.listUrl')

    if (listUrl) {
      return routing.push(listUrl)
    }

    return routing.go(-1)
  }

  render() {
    const { component, rootStore, breadcrumbs, ...rest } = this.props
    const DetailComponent = component
    const commonProps = {
      rootStore,
      projectStore: rootStore.project,
      ...rest,
    }

    if (this.state.initializing) {
      return <Loading className="ks-page-loading" />
    }

    return (
      <Layout className={styles.wrapper}>
        <LayoutHeader className={styles.header}>
          <Breadcrumb
            params={rest.match.params}
            pathname={rest.location.pathname}
            breadcrumbs={breadcrumbs}
            routes={rest.route.routes}
            goBack={this.goBack}
          />
        </LayoutHeader>
        <DetailComponent {...commonProps} ref={this.detailRef} />
      </Layout>
    )
  }
}

export default DetailLayout
