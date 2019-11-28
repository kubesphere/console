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

@observer
class RunSider extends Base {
  constructor(props) {
    super(props)

    this.store = new RunDetailStore()

    this.state = {
      showEdit: false,
      showYamlEdit: false,
    }
    this.refreshTimer = setInterval(this.refreshHandler, 4000)
  }

  get listUrl() {
    const { project_id } = this.props.match.params
    return `/devops/${project_id}/pipelines`
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

  componentWillReceiveProps(nextProps) {
    const { params } = nextProps.match
    const { params: thisParmas } = this.props.match
    if (params.runId !== thisParmas.runid) {
      clearInterval(this.refreshTimer)
      this.refreshTimer = setInterval(this.refreshHandler, 4000)
    }
  }

  componentDidUpdate() {
    const { runDetail } = this.store
    const { params } = this.props.match
    if (runDetail.id && runDetail.id !== params.runid) {
      this.routing.push(
        `/devops/${params.project_id}/pipelines/${params.name}${
          params.branch ? `/branch/${params.branch}` : ''
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
    if (params.branch) {
      this.routing.push(
        `/devops/${params.project_id}/pipelines/${params.name}${
          params.branch ? `/branch/${params.branch}` : ''
        }/activity`
      )
    }
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

  get application() {
    const { detail } = this.store
    return detail.labels && detail.labels.chart && detail.labels.release
      ? `${detail.labels.release}/${detail.labels.chart}`
      : '-'
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
    return globals.app.getActions({
      module: 'pipelines',
      project: this.props.match.params.project_id,
    })
  }

  getOperations = () => [
    {
      key: 'rerun',
      type: 'control',
      text: t('Rerun'),
      action: 'trigger',
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
        attrs={this.getAttrs()}
      />
    )
  }
}

export default inject('rootStore')(observer(RunSider))
export const Component = RunSider
