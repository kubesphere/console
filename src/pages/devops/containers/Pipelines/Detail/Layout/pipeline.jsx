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
import { get, isEmpty, has } from 'lodash'

import Notify from 'components/Base/Notify'
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
export default class PipelineDetailLayout extends React.Component {
  sonarqubeStore = new CodeQualityStore()

  state = {
    formTemplate: this.store.pipeLineConfig,
  }

  get store() {
    return this.props.pipelineStore
  }

  get name() {
    return 'pipelines'
  }

  get routing() {
    return this.props.rootStore.routing
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
    const { params } = this.props.match
    const detail = this.store.detail

    this.setBranchNames(toJS(detail.branchNames), params)
    this.getPipeLineConfig()
    this.sonarqubeStore.fetchDetail(params)
  }

  fetchData = async () => {
    const { params } = this.props.match
    const detail = this.store.detail

    await this.store.fetchDetail(params)

    this.setBranchNames(toJS(detail.branchNames), params)
    this.getPipeLineConfig()
    this.sonarqubeStore.fetchDetail(params)
  }

  getPipeLineConfig = async () => {
    const { params } = this.props.match
    const pipeLineConfig = await this.store.getPipeLineConfig()

    pipeLineConfig.devops = params.devops
    pipeLineConfig.cluster = params.cluster

    this.setState({ formTemplate: pipeLineConfig })
  }

  setBranchNames = (branchNames, params) => {
    isEmpty(branchNames) ? (params.branch = 'master') : null
  }

  getSonarqube = () => {
    const { params } = this.props.match
    this.sonarqubeStore.fetchDetail(params)
  }

  getUpTime = activityList => {
    const updateTime = get(toJS(activityList.data), '[0].startTime', '')
    return !updateTime
      ? '-'
      : moment(updateTime).format(`${t('MMMM Do YYYY')} HH:mm`)
  }

  getOperations = () => {
    const { detail } = toJS(this.store)
    const { devops, cluster, workspace, name } = this.props.match.params

    return [
      {
        key: 'edit',
        type: 'control',
        text: t('EDIT'),
        action: 'edit',
        onClick: () =>
          this.trigger('pipeline.edit', {
            devops,
            cluster,
            formTemplate: this.state.formTemplate,
            success: this.fetchData,
            handleScanRepository: this.handleScanRepository,
          }),
      },
      {
        key: 'editConfig',
        type: 'control',
        text: t('Edit Config'),
        action: 'edit',
        onClick: () => {
          this.getPipeLineConfig()
          this.trigger('pipeline.advance.edit', {
            devops,
            cluster,
            formTemplate: this.state.formTemplate,
            success: this.fetchData,
            handleScanRepository: this.handleScanRepository,
          })
        },
      },
      ...(!isEmpty(detail.scmSource)
        ? [
            {
              key: 'scan',
              text: t('Scan Repository'),
              action: 'edit',
              onClick: this.handleScanRepository,
            },
            {
              key: 'scanLogs',
              text: t('Scan Reponsitory Logs'),
              action: 'edit',
              onClick: () => {
                this.trigger('pipeline.scanRepositoryLogs', {
                  params: { devops, cluster, workspace, name },
                  handleScanRepository: this.handleScanRepository,
                })
              },
            },
          ]
        : []),
      {
        key: 'delete',
        text: t('Delete'),
        action: 'delete',
        onClick: () => {
          this.trigger('resource.delete', {
            devops,
            cluster,
            detail: { devops, cluster, name: this.store.detail.name },
            success: () => {
              this.routing.push(
                `/${workspace}/clusters/${cluster}/devops/${devops}/pipelines`
              )
            },
          })
        },
      },
    ]
  }

  getAttrs = () => {
    const { activityList } = this.store
    const { devopsName } = this.props.devopsStore
    return [
      {
        name: t('DevOps Project'),
        value: devopsName,
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
        value: this.getUpTime(activityList),
      },
    ]
  }

  handleScanRepository = async () => {
    const { params } = this.props.match
    const { detail } = this.store

    await this.store.scanRepository({
      devops: params.devops,
      name: detail.name,
      cluster: params.cluster,
    })
    Notify.success({
      content: t('Scan repo success'),
    })
    this.store.fetchDetail(params)
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
    const operations = this.getOperations().filter(item =>
      this.enabledActions.includes(item.action)
    )
    const { formTemplate } = this.state
    const keyPath = has(formTemplate, 'pipeline')
      ? 'pipeline.description'
      : 'multi_branch_pipeline.description'

    const desc = get(formTemplate, keyPath, '-')
    const { devops, cluster, workspace } = this.props.match.params

    const sideProps = {
      module: this.module,
      authKey: this.authKey,
      name: get(this.store.detail, 'name'),
      desc,
      operations,
      attrs: this.getAttrs(),
      labels: this.store.detail.labels,

      breadcrumbs: [
        {
          label: t('Pipeline List'),
          url: `/${workspace}/clusters/${cluster}/devops/${devops}/pipelines`,
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
