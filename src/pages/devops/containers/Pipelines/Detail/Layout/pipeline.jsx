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
import { get, isEmpty, has, isArray, last } from 'lodash'

import { Notify } from '@kube-design/components'
import Status from 'devops/components/Status'
import CodeQualityStore from 'stores/devops/codeQuality'
import DetailPage from 'devops/containers/Base/Detail'

import { trigger } from 'utils/action'

import { getPipelineStatus } from 'utils/status'

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

  module = 'pipelines'

  get store() {
    return this.props.pipelineStore
  }

  get name() {
    return 'PIPELINE'
  }

  get routing() {
    return this.props.rootStore.routing
  }

  get enabledActions() {
    const { cluster, devops } = this.props.match.params

    return globals.app.getActions({
      module: this.module,
      cluster,
      devops,
    })
  }

  get ksVersion() {
    const { cluster } = this.props.match.params
    return globals.app.isMultiCluster
      ? get(globals, `clusterConfig.${cluster}.ksVersion`)
      : get(globals, 'ksConfig.ksVersion')
  }

  get routes() {
    const [newPipeline, ...rest] = this.props.route.routes
    return [
      {
        ...newPipeline,
        component: newPipeline.getComponent(this.ksVersion),
      },
      ...rest,
    ]
  }

  get route() {
    return {
      ...this.props.route,
      routes: this.routes,
    }
  }

  componentDidMount() {
    const { params } = this.props.match
    const detail = this.store.detail

    this.setBranchNames(toJS(detail.branchNames), params)
    this.getPipeLineConfig()
    this.getSonarqube()
  }

  fetchData = async () => {
    const { params } = this.props.match
    const detail = this.store.detail

    await this.store.fetchDetail(params)

    this.setBranchNames(toJS(detail.branchNames), params)
    this.getPipeLineConfig()
    this.getSonarqube()
  }

  getPipeLineConfig = async () => {
    const { params } = this.props.match
    const pipeLineConfig = await this.store.getPipeLineConfig()

    pipeLineConfig.devops = params.devops
    pipeLineConfig.cluster = params.cluster
    pipeLineConfig.devopsName = this.props.devopsStore.devopsName

    this.setState({ formTemplate: pipeLineConfig })
  }

  setBranchNames = (branchNames, params) => {
    if (isArray(branchNames) && !isEmpty(branchNames)) {
      params.branch = branchNames[0]
    }
  }

  getSonarqube = () => {
    if (get(globals, 'config.devops.sonarqubeURL')) {
      const { params } = this.props.match
      this.sonarqubeStore.fetchDetail(params)
    }
  }

  getUpTime = () => {
    const { activityList } = this.store
    const updateTime = get(toJS(activityList.data), '[0].startTime', '')
    return !updateTime ? '-' : moment(updateTime).format('YYYY-MM-DD HH:mm:ss')
  }

  fetchPipelineConfig = async () => {
    const { params } = this.props.match
    await this.store.fetchDetail({ ...params, isSilent: true })
    await this.getPipeLineConfig()
  }

  getOperations = () => {
    const { detail } = toJS(this.store)
    const { params } = this.props.match
    const { devops, cluster, workspace, name } = params

    return [
      {
        key: 'edit',
        type: 'control',
        text: t('EDIT_INFORMATION'),
        action: 'edit',
        onClick: () =>
          this.trigger('pipeline.edit', {
            devops,
            cluster,
            formTemplate: this.state.formTemplate,
            // codeRepoKey: detail?.codeRepoKey,
            success: this.fetchData,
            handleScanRepository: this.handleScanRepository,
            trigger: (...args) => {
              this.trigger(...args)
            },
          }),
      },
      {
        key: 'editConfig',
        type: 'control',
        text: t('EDIT_SETTINGS'),
        action: 'edit',
        onClick: async () => {
          await this.fetchPipelineConfig()
          this.trigger('pipeline.advance.edit', {
            devops,
            cluster,
            formTemplate: this.state.formTemplate,
            success: this.fetchData,
            handleScanRepository: this.handleScanRepository,
          })
        },
      },
      ...(detail.isMultiBranch
        ? [
            {
              key: 'scan',
              text: t('SCAN_REPOSITORY'),
              action: 'edit',
              onClick: this.handleScanRepository,
            },
            {
              key: 'scanLogs',
              text: t('VIEW_SCAN_LOGS'),
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
        text: t('DELETE'),
        action: 'delete',
        onClick: () => {
          this.trigger('resource.delete', {
            devops,
            cluster,
            type: this.name,
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

  getCurrentState = () => {
    const { activityList, branchList, pullRequestList } = this.store
    const currentState = {
      activity: get(toJS(activityList), 'data[0]', {}),
      branch: get(toJS(branchList), 'data[0].latestRun', {}),
      'pull-request': get(toJS(pullRequestList), 'data[0].latestRun', {}),
    }

    const currentLocation = last(this.props.location.pathname.split('/'))
    return currentState[currentLocation] || currentState.activity
  }

  getPipelineStatus = status => {
    const CONFIG = {
      failed: { type: 'failure', label: t('FAILED') },
      pending: { type: 'running', label: t('RUNNING') },
      working: { type: 'running', label: t('RUNNING') },
      successful: { type: 'success', label: t('SUCCESSFUL') },
    }

    return { ...CONFIG[status] }
  }

  getAttrs = () => {
    const { devopsName } = this.props.devopsStore

    const syncStatus = get(
      this.store.pipelineConfig,
      'metadata.annotations["pipeline.devops.kubesphere.io/syncstatus"]'
    )

    const kind = this.store.detail.isMultiBranch
      ? t('MULTI_BRANCH_PIPELINE')
      : t('PIPELINE_PL')

    return [
      {
        name: t('DEVOPS_PROJECT'),
        value: devopsName,
      },
      {
        name: t('KIND_TCAP'),
        value: kind,
      },
      {
        name: t('TASK_STATUS'),
        value: <Status {...getPipelineStatus(this.getCurrentState())} />,
      },
      {
        name: t('SYNC_STATUS'),
        value: <Status {...this.getPipelineStatus(syncStatus)} />,
      },
      {
        name: t('UPDATE_TIME_TCAP'),
        value: this.getUpTime(),
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
      content: t('SCAN_REPO_SUCCESSFUL'),
    })
    this.store.fetchDetail(params)
  }

  renderNav = () => {
    return (
      <Nav
        sonarqubeStore={this.sonarqubeStore}
        detailStore={this.store}
        route={this.route}
        match={this.props.match}
      />
    )
  }

  render() {
    const stores = {
      detailStore: this.store,
      sonarqubeStore: this.sonarqubeStore,
    }

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
      name: get(this.store.detail, 'name'),
      desc,
      operations,
      attrs: this.getAttrs(),
      labels: this.store.detail.labels,
      breadcrumbs: [
        {
          label: t('PIPELINE_PL'),
          url: `/${workspace}/clusters/${cluster}/devops/${devops}/pipelines`,
        },
      ],
    }

    return (
      <DetailPage
        routes={this.routes}
        stores={stores}
        nav={this.renderNav()}
        {...sideProps}
      />
    )
  }
}
