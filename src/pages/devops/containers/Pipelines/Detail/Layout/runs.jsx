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
import { action } from 'mobx'
import { observer, inject } from 'mobx-react'
import moment from 'moment-mini'
import { get, omit } from 'lodash'

import { getPipelineStatus } from 'utils/status'
import Status from 'devops/components/Status'

import RunDetailStore from 'stores/devops/run'
import { trigger } from 'utils/action'
import { Loading } from '@kube-design/components'
import DetailPage from 'devops/containers/Base/Detail'

@inject('rootStore', 'devopsStore', 'pipelineStore')
@observer
@trigger
export default class RunDetailLayout extends React.Component {
  store = new RunDetailStore()

  module = 'pipelines'

  state = {
    showEdit: false,
    showYamlEdit: false,
    isLoading: true,
  }

  refreshTimer = setInterval(() => this.refreshHandler(), 4000)

  get isDisabled() {
    return this.props.pipelineStore?.branchDetail?.disabled
  }

  get listUrl() {
    const { workspace, devops, cluster } = this.props.match.params
    return `/${workspace}/clusters/${cluster}/devops/${devops}/pipelines`
  }

  componentDidMount() {
    this.fetchData()
  }

  refreshHandler = () => {
    const { params } = this.props.match
    const { runDetail } = this.store

    if (runDetail.message) {
      return
    }

    if (this.hasRuning) {
      this.store.getRunDetail(params)
    } else {
      clearInterval(this.refreshTimer)
      this.refreshTimer = null
    }
  }

  fetchData = () => {
    const { params } = this.props.match
    this.props.pipelineStore.getBranchDetail(omit(params, 'runName'))
    this.store.getRunDetail(params)
  }

  getRunName = async () => {
    const { params } = this.props.match
    await this.store.getRunName(params)
  }

  componentDidUpdate(prevProps) {
    const { runDetail } = this.store
    const {
      devops,
      runName,
      branch,
      workspace,
      cluster,
    } = this.props.match.params
    const { params: lastParams } = prevProps.match

    if (runName !== lastParams.runName) {
      clearInterval(this.refreshTimer)
      this.refreshTimer = setInterval(this.refreshHandler, 4000)
    }

    if (runDetail.name && runDetail.name !== runName) {
      this.routing.push(
        `/${workspace}/clusters/${cluster}devops/${devops}/pipelines/${name}${
          branch ? `/branch/${branch}` : ''
        }/run/${runDetail.name}`
      )
    }

    if (!this.refreshTimer && this.hasRuning) {
      this.refreshTimer = setInterval(this.refreshHandler, 4000)
    }
  }

  componentWillUnmount() {
    clearInterval(this.refreshTimer)
  }

  get hasRuning() {
    const { runDetail } = this.store
    const state = get(runDetail, 'state')

    return state && state !== 'FINISHED' && state !== 'PAUSED'
  }

  @action
  rePlay = async () => {
    const { params } = this.props.match

    const result = await this.store.replay(params)

    this.routing.push(
      `/${params.workspace}/clusters/${params.cluster}/devops/${
        params.devops
      }/pipelines/${params.name}${
        params.branch ? `/branch/${params.branch}` : ''
      }/activity`
    )

    if (result.id) {
      this.store.runDetail = result
    }
  }

  get routing() {
    return this.props.rootStore.routing
  }

  get creator() {
    return get(this.store.detail, 'creator', t('unknown'))
  }

  get createTime() {
    return moment(this.store.detail.createTime).format('YYYY-MM-DD HH:mm:ss')
  }

  get updateTime() {
    const { runDetail } = this.store
    const updateTime = get(runDetail, 'startTime', '')
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

  getOperations = () => [
    {
      key: 'rerun',
      type: 'control',
      text: t('RERUN'),
      action: 'edit',
      onClick: () => this.rePlay(),
    },
  ]

  getAttrs = () => {
    const { runDetail } = this.store

    return [
      {
        name: t('RUN_ID'),
        value: runDetail.id,
      },
      {
        name: t('TASK_STATUS'),
        value: <Status {...getPipelineStatus(runDetail)} />,
      },
      {
        name: t('UPDATE_TIME_TCAP'),
        value: this.updateTime,
      },
    ]
  }

  render() {
    const {
      runDetail: { id, annotations, labels },
    } = this.store

    const {
      params: { branch, name, runId },
    } = this.props.match

    const stores = { detailStore: this.store }

    if (this.store.isLoading && !this.store.detail.name) {
      return <Loading className="ks-page-loading" />
    }

    const operations = this.getOperations().filter(item =>
      this.enabledActions.includes(item.action)
    )

    const sideProps = {
      name: id,
      operations: this.isDisabled ? [] : operations,
      attrs: this.getAttrs(),
      desc: get(annotations, 'desc'),
      labels,
      module: this.module,
      breadcrumbs: [
        {
          label: branch
            ? runId
              ? t('BRANCH_PL')
              : t('RUN_RECORDS')
            : t('RUN_RECORDS'),
          url: branch
            ? `${this.listUrl}/${name}/branch/${branch}/activity`
            : `${this.listUrl}/${name}/activity`,
        },
      ],
    }

    return (
      <DetailPage
        routes={this.props.route.routes}
        stores={stores}
        {...sideProps}
      />
    )
  }
}
