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
import { toJS } from 'mobx'
import { observer, inject } from 'mobx-react'
import moment from 'moment-mini'
import { get } from 'lodash'

import { ReactComponent as ForkIcon } from 'assets/fork.svg'
import Status from 'devops/components/Status'
import CodeQualityStore from 'stores/devops/codeQuality'
import DetailPage from 'devops/containers/Base/Detail'

import { getPipelineStatus } from 'utils/status'
import { trigger } from 'utils/action'

import Nav from 'devops/components/DetailNav'
import './index.scss'

@inject('rootStore', 'devopsStore', 'pipelineStore')
@observer
@trigger
export default class BranchDetailLayout extends React.Component {
  sonarqubeStore = new CodeQualityStore()

  get store() {
    return this.props.pipelineStore
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

  handleRun = async () => {
    const { branchDetail } = this.store
    const { params } = this.props.match
    const isMultibranch = branchDetail.branchNames
    const hasParameters =
      branchDetail.parameters && branchDetail.parameters.length

    if (isMultibranch || hasParameters) {
      this.trigger('pipeline.params', {
        devops: this.devops,
        cluster: this.cluster,
        params,
        success: this.fetchData,
      })
    } else {
      await this.store.runBranch(params)
      this.store.getActivities(params)
    }
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
    const stores = { detailStore: this.store }
    const { params } = this.props.match
    const { branch } = params

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
      name: decodeURIComponent(branch),
      operations,
      attrs: this.getAttrs(),

      breadcrumbs: [
        {
          label: t('Branch'),
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
