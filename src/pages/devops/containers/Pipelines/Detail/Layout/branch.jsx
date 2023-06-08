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
import { Notify } from '@kube-design/components'

import { toJS } from 'mobx'
import { observer, inject } from 'mobx-react'
import moment from 'moment-mini'
import { get, debounce, isEmpty } from 'lodash'

import Status from 'devops/components/Status'
import CodeQualityStore from 'stores/devops/codeQuality'
import DetailPage from 'devops/containers/Base/Detail'
import Nav from 'devops/components/DetailNav'

import { ReactComponent as ForkIcon } from 'assets/fork.svg'
import { getPipelineStatus } from 'utils/status'
import { trigger } from 'utils/action'

import './index.scss'

@inject('rootStore', 'devopsStore', 'pipelineStore')
@observer
@trigger
export default class BranchDetailLayout extends React.Component {
  sonarqubeStore = new CodeQualityStore()

  module = 'pipelineruns'

  get store() {
    return this.props.pipelineStore
  }

  get routing() {
    return this.props.rootStore.routing
  }

  get isAtBranchDetailPage() {
    return this.props.match.params.branch
  }

  get createTime() {
    return moment(this.store.detail.createTime).format('YYYY-MM-DD HH:mm:ss')
  }

  get updateTime() {
    const { activityList } = this.store
    const updateTime = get(toJS(activityList.data), '[0].startTime', '')
    if (!updateTime) {
      return '-'
    }
    return moment(updateTime).format('YYYY-MM-DD HH:mm:ss')
  }

  get enabledActions() {
    const { cluster, devops } = this.props.match.params

    return globals.app.getActions({
      module: this.module,
      cluster,
      devops,
    })
  }

  componentDidMount() {
    this.fetchData()
  }

  fetchData = () => {
    const { params } = this.props.match
    this.store.setDevops(params.devops)
    this.store.getBranchDetail(params)
    this.getSonarqube()
  }

  getSonarqube = () => {
    if (get(globals, 'config.devops.sonarqubeURL')) {
      const { params } = this.props.match
      this.sonarqubeStore.fetchDetail(params)
    }
  }

  getOperations = () => [
    {
      key: 'run',
      type: 'control',
      text: t('RUN'),
      action: 'edit',
      onClick: this.handleRun,
    },
  ]

  getAttrs = () => {
    const { detail, activityList, branchDetail } = this.store
    const { devopsName } = this.props.devopsStore
    const { branch } = this.props.match.params

    return [
      {
        name: t('DEVOPS_PROJECT'),
        value: devopsName,
      },
      {
        name: t('PIPELINE'),
        value: (
          <span>
            {detail.name}/
            {branchDetail.disabled ? (
              <del>{decodeURIComponent(branch)}</del>
            ) : (
              decodeURIComponent(branch)
            )}
          </span>
        ),
      },
      {
        name: t('TASK_STATUS'),
        value: (
          <Status
            {...getPipelineStatus(get(toJS(activityList.data), '[0]', {}))}
          />
        ),
      },
      {
        name: t('UPDATE_TIME_TCAP'),
        value: this.updateTime,
      },
    ]
  }

  handleRun = debounce(async () => {
    const { params } = this.props.match
    await this.store.getBranchDetail(params)
    const { branchDetail } = this.store
    const isMultibranch = !isEmpty(toJS(branchDetail.branchNames))
    const hasParameters = !isEmpty(toJS(branchDetail.parameters))

    if (isMultibranch || hasParameters) {
      this.trigger('pipeline.params', {
        devops: params.devops,
        cluster: params.cluster,
        params,
        branches: this.isAtBranchDetailPage ? null : [toJS(branchDetail.name)],
        parameters: toJS(branchDetail.parameters),
        success: () => {
          Notify.success({ content: t('PIPELINE_RUN_START_SI') })
          this.handleFetch()
        },
      })
    } else {
      Notify.success({ content: t('PIPELINE_RUN_START_SI') })
      await this.store.runBranch(params)
      this.handleFetch()
    }
  }, 500)

  handleFetch = (params, refresh) => {
    this.routing.query(params, refresh)
  }

  renderNav = () => {
    return (
      <Nav
        sonarqubeStore={this.sonarqubeStore}
        detailStore={this.store}
        route={this.props.route}
        match={this.props.match}
      />
    )
  }

  render() {
    const stores = {
      detailStore: this.store,
      sonarqubeStore: this.sonarqubeStore,
    }
    const { params } = this.props.match
    const { branch } = params
    const { branchDetail } = this.store
    const operations = this.getOperations().filter(item =>
      this.enabledActions.includes(item.action)
    )

    const { devops, cluster, workspace, name } = this.props.match.params
    const sideProps = {
      icon: (
        <span className="icon" style={{ width: '20px', height: '20px' }}>
          <ForkIcon />
        </span>
      ),
      name: branchDetail.disabled ? (
        <del>{decodeURIComponent(branch)}</del>
      ) : (
        decodeURIComponent(branch)
      ),
      operations: branchDetail.disabled ? [] : operations,
      attrs: this.getAttrs(),
      module: this.module,
      breadcrumbs: [
        {
          label: t('BRANCH_PL'),
          url: `/${workspace}/clusters/${cluster}/devops/${devops}/pipelines/${name}/branch`,
        },
      ],
    }

    return (
      <DetailPage
        routes={this.props.route.routes}
        stores={stores}
        nav={this.renderNav()}
        {...sideProps}
      />
    )
  }
}
