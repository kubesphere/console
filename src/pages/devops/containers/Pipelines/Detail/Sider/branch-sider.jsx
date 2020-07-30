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

import React from 'react'
import { action, toJS } from 'mobx'
import { observer, inject } from 'mobx-react'
import moment from 'moment-mini'
import { get } from 'lodash'

import { Loading } from '@pitrix/lego-ui'
import Base from 'core/containers/Base/Detail'
import BaseInfo from 'core/containers/Base/Detail/BaseInfo'
import BranchSelectModal from 'components/Forms/CICDs/paramsModal'
import Status from 'devops/components/Status'

import { ReactComponent as ForkIcon } from 'src/assets/fork.svg'

import PipelineStore from 'stores/devops/pipelines'
import CodeQualityStore from 'stores/devops/codeQuality'
import DevopsStore from 'stores/devops'

import { renderRoutes } from 'utils/router.config'
import { getPipelineStatus } from 'utils/status'

import Nav from './nav'
import styles from './sider.scss'

class BranchSider extends Base {
  constructor(props) {
    super(props)

    this.store = new PipelineStore()
    this.devopsStore = new DevopsStore()
    this.sonarqubeStore = new CodeQualityStore()
    this.state = {
      showBranchModal: false,
    }
    this.init()
  }

  get listUrl() {
    const { workspace, devops } = this.props.match.params
    return `/${workspace}/clusters/:cluster/devops/${devops}/pipelines`
  }

  get name() {
    return 'cicds'
  }

  get createTime() {
    return moment(this.store.detail.createTime).format(
      `${t('MMMM Do YYYY')} HH:mm`
    )
  }

  get updateTime() {
    const { activityList } = this.store
    const updateTime = get(toJS(activityList.data), '[0].startTime', '')
    if (!updateTime) {
      return '-'
    }
    return moment(updateTime).format(`${t('MMMM Do YYYY')} HH:mm`)
  }

  get enabledActions() {
    const { cluster, devops } = this.props.match.params

    return globals.app.getActions({
      module: 'pipelines',
      cluster,
      devops,
    })
  }

  init = async () => {
    const { params } = this.props.match

    await Promise.all([
      this.devopsStore.fetchDetail(params),
      this.props.rootStore.getRules({
        workspace: params.workspace,
      }),
    ])

    await this.props.rootStore.getRules({
      cluster: params.cluster,
      workspace: params.workspace,
      devops: params.devops,
    })
  }

  fetchData = () => {
    const { params } = this.props.match
    this.store.setDevops(params.devops)
    this.store.getBranchDetail(params)
    this.store.fetchDetail(params)
    this.getSonarqube()
  }

  getSonarqube = () => {
    const { params } = this.props.match

    this.sonarqubeStore.fetchDetail(params)
  }

  getOperations = () => [
    {
      key: 'run',
      type: 'control',
      text: t('Run'),
      action: 'edit',
      onClick: this.handleRun,
    },
  ]

  get prefix() {
    if (this.props.match.url.endsWith('/')) {
      return this.props.match.url.slice(0, -1)
    }
    return this.props.match.url
  }

  getAttrs = () => {
    const { detail } = this.store
    const { activityList } = this.store

    return [
      {
        name: t('DevOps Project'),
        value: detail.displayName,
      },
      {
        name: t('Status'),
        value: (
          <Status
            {...getPipelineStatus(get(toJS(activityList.data), '[0]', {}))}
          />
        ),
      },
      {
        name: t('Updated Time'),
        value: this.updateTime,
      },
    ]
  }

  renderSubView() {
    const { route } = this.props

    if (this.store.isLoading || this.sonarqubeStore.isLoading)
      return (
        <div className={styles.loading}>
          <Loading />
        </div>
      )

    return renderRoutes(route.routes, {
      ...this.baseProps,
      ...this.getRouteProps(),
    })
  }

  @action
  handleBranchSelect = async branch => {
    const { params } = this.props.match
    const result = await this.store.getBranchDetail({
      ...params,
      branch,
    })

    if (result.parameters) {
      this.store.detail.parameters = result.parameters
    }
  }

  handleRun = async () => {
    const { branchDetail } = this.store
    const { params } = this.props.match
    const isMutibranch = branchDetail.branchNames
    const hasParameters =
      branchDetail.parameters && branchDetail.parameters.length
    if (isMutibranch || hasParameters) {
      this.setState({ showBranchModal: true })
    } else {
      await this.store.runBranch(params)
      this.store.getActivities(params)
    }
  }

  hideBranchModal = () => {
    this.setState({ showBranchModal: false })
  }

  handleRunBranch = async parameters => {
    const { params } = this.props.match
    const { branch, devops } = this.props.match.params
    const { detail } = this.store

    await this.store.runBranch({
      devops,
      branch,
      name: detail.name,
      parameters,
    })
    this.store.getActivities(params)
    this.hideBranchModal()
  }

  renderNav() {
    return (
      <Nav
        sonarqubeStore={this.sonarqubeStore}
        detailStore={this.store}
        route={this.props.route}
        match={this.props.match}
      />
    )
  }

  renderSider() {
    const { params } = this.props.match
    const { branch } = params

    const operations = this.getOperations().filter(item =>
      this.enabledActions.includes(item.action)
    )

    return (
      <React.Fragment>
        <BaseInfo
          icon={<ForkIcon className={styles.branchIcon} />}
          name={decodeURIComponent(branch)}
          operations={operations}
          attrs={this.getAttrs()}
        />
        <BranchSelectModal
          onOk={this.handleRunBranch}
          onCancel={this.hideBranchModal}
          visible={this.state.showBranchModal}
          params={params}
        />
      </React.Fragment>
    )
  }
}

export default inject('rootStore')(observer(BranchSider))
export const Component = BranchSider
