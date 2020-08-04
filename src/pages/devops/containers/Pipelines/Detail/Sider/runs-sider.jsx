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
import { get } from 'lodash'

import { ICON_TYPES } from 'utils/constants'
import { getPipelineStatus } from 'utils/status'

import Base from 'core/containers/Base/Detail'
import BaseInfo from 'core/containers/Base/Detail/BaseInfo'
import Status from 'devops/components/Status'

import RunDetailStore from 'stores/devops/run'
import DevopsStore from 'stores/devops'

class RunSider extends Base {
  constructor(props) {
    super(props)

    this.store = new RunDetailStore()
    this.devopsStore = new DevopsStore()

    this.state = {
      showEdit: false,
      showYamlEdit: false,
      isLoading: true,
    }

    this.refreshTimer = setInterval(this.refreshHandler, 4000)
    this.init()
  }

  get listUrl() {
    const { workspace, devops, cluster } = this.props.match.params
    return `/${workspace}/clusters/${cluster}/devops/${devops}/pipelines`
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

    this.setState({
      isLoading: false,
    })
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
    this.store.getRunDetail(params)
  }

  componentDidUpdate(prevProps) {
    const { runDetail } = this.store
    const {
      devops,
      runid,
      branch,
      workspace,
      cluster,
    } = this.props.match.params
    const { params: lastParams } = prevProps.match

    if (runid !== lastParams.runid) {
      clearInterval(this.refreshTimer)
      this.refreshTimer = setInterval(this.refreshHandler, 4000)
    }

    if (runDetail.id && runDetail.id !== runid) {
      this.routing.push(
        `/${workspace}/clusters/${cluster}devops/${devops}/pipelines/${name}${
          branch ? `/branch/${branch}` : ''
        }/run/${runDetail.id}`
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

  get name() {
    return 'cicds'
  }

  get routing() {
    return this.props.rootStore.routing
  }

  get creator() {
    return get(this.store.detail, 'creator', t('unknown'))
  }

  get createTime() {
    return moment(this.store.detail.createTime).format(
      `${t('MMMM Do YYYY')} HH:mm`
    )
  }

  get updateTime() {
    const { runDetail } = this.store
    const updateTime = get(runDetail, 'startTime', '')
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

  getOperations = () => [
    {
      key: 'rerun',
      type: 'control',
      text: t('Rerun'),
      action: 'edit',
      onClick: this.rePlay,
    },
  ]

  getAttrs = () => {
    const { runDetail } = this.store

    return [
      {
        name: t('Activity'),
        value: runDetail.id,
      },
      {
        name: t('Status'),
        value: <Status {...getPipelineStatus(runDetail)} />,
      },
      {
        name: t('Updated Time'),
        value: this.updateTime,
      },
    ]
  }

  showEditModal = () => {
    this.setState({ showEdit: true })
  }

  hideEditModal = () => {
    this.setState({ showEdit: false })
  }

  handleEdit = () => {
    const { detail } = this.store
    this.store.update(detail).then(() => {
      this.hideEditModal()
    })
  }

  renderSider() {
    const {
      runDetail: { id, annotations, labels },
    } = this.store
    const { isLoading } = this.state
    const operations = this.getOperations().filter(item =>
      this.enabledActions.includes(item.action)
    )

    return (
      <BaseInfo
        icon={ICON_TYPES[this.module]}
        name={id}
        desc={get(annotations, 'desc')}
        operations={operations}
        labels={labels}
        isLoading={isLoading}
        attrs={this.getAttrs()}
      />
    )
  }
}

export default inject('rootStore')(observer(RunSider))
export const Component = RunSider
