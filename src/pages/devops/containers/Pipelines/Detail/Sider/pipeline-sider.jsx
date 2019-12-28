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
import { observer, inject } from 'mobx-react'
import moment from 'moment-mini'
import { get } from 'lodash'
import { Loading } from '@pitrix/lego-ui'

import { ICON_TYPES } from 'utils/constants'
import { renderRoutes } from 'utils/router.config'
import { updatePipelineParams } from 'utils/devops'
import { getPipelineStatus } from 'utils/status'

import Notify from 'components/Base/Notify'
import Base from 'core/containers/Base/Detail'
import BaseInfo from 'core/containers/Base/Detail/BaseInfo'
import Status from 'devops/components/Status'
import DeleteModal from 'components/Modals/Delete'
import PipelineStore from 'stores/devops/pipelines'
import CodeQualityStore from 'stores/devops/codeQuality'

import ScanRepositoryLogs from '../../Modals/scanRepositoryLogsModal'
import BaseInfoModal from '../../Modals/baseInfoModal'
import EditPipelineConfig from '../../Modals/editPipelineConfigModal'
import Nav from './nav'
import styles from './sider.scss'

class PipelineDetail extends Base {
  constructor(props) {
    super(props)

    this.store = new PipelineStore()
    this.sonarqubeStore = new CodeQualityStore()
    this.store.project_id = get(props.match, 'params.project_id', '')

    this.state = {
      showEditConfig: false,
      showDelete: false,
      showEditBaseInfo: false,
      deleteLoading: false,
    }
  }

  get listUrl() {
    const { project_id } = this.props.match.params
    return `/devops/${project_id}/pipelines`
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
    const { activityList } = this.store
    const updateTime = get(activityList, 'data.0.startTime', '')
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

  fetchData = async () => {
    const { params } = this.props.match

    const result = await this.store.fetchDetail(params).catch(e => {
      if (e.status === 404) {
        this.store.notFound = true
      }
    })

    if (!result) {
      return
    }

    if (result.branchNames) {
      params.branch = 'master'
      this.sonarqubeStore.fetchDetail(params)
    } else {
      this.sonarqubeStore.fetchDetail(params)
    }
  }

  getSonarqube = () => {
    const { params } = this.props.match

    this.sonarqubeStore.fetchDetail(params)
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

  getOperations = () => {
    const { detail } = this.store

    return [
      {
        key: 'edit',
        type: 'control',
        text: t('EDIT'),
        action: 'edit',
        onClick: this.showEditModal,
      },
      {
        key: 'editConfig',
        type: 'control',
        text: t('Edit Config'),
        action: 'edit',
        onClick: this.showEditConfigModal,
      },
      ...(detail.scmSource
        ? [
            {
              key: 'scan',
              text: t('Scan Repository'),
              action: 'trigger',
              onClick: this.handleScanRepository,
            },
            {
              key: 'scanLogs',
              text: t('Scan Reponsitory Logs'),
              action: 'trigger',
              onClick: this.showScanLogsModal,
            },
          ]
        : []),
      {
        key: 'delete',
        text: t('Delete'),
        action: 'delete',
        onClick: this.showDeleteModal,
      },
    ]
  }

  getAttrs = () => {
    const { activityList } = this.store
    const { params } = this.props.match

    return [
      {
        name: t('DevOps Project'),
        value: params.project_id,
      },
      {
        name: t('Status'),
        value: (
          <Status {...getPipelineStatus(get(activityList.data, '[0]', {}))} />
        ),
      },
      {
        name: t('Updated Time'),
        value: this.updateTime,
      },
    ]
  }

  showEditModal = async () => {
    const { params } = this.props.match
    const { detail } = this.store

    const pipeLineConfig = await this.store.getPipeLineConfig(
      detail.name,
      params
    )
    pipeLineConfig.project_id = params.project_id
    this.setState({ showEditBaseInfo: true, formTemplate: pipeLineConfig })
  }

  showEditConfigModal = async () => {
    const { params } = this.props.match
    const { detail } = this.store

    const pipeLineConfig = await this.store.getPipeLineConfig(
      detail.name,
      params
    )
    this.setState({ showEditConfig: true, formTemplate: pipeLineConfig })
  }

  hideEditModal = () => {
    this.setState({ showEditBaseInfo: false })
  }

  hideEditConfig = () => {
    this.setState({ showEditConfig: false })
  }

  hideScanLogs = () => {
    this.setState({ showScanLogs: false })
  }

  handleScanRepository = async () => {
    const { params } = this.props.match
    const { detail } = this.store

    await this.store.scanRepository({
      project_id: params.project_id,
      name: detail.name,
    })
    Notify.success({
      content: t('Scan repo success'),
    })
    this.store.fetchDetail(params)
  }

  showScanLogsModal = () => {
    this.setState({ showScanLogs: true })
  }

  handleEdit = async data => {
    const { params } = this.props.match
    updatePipelineParams(data)
    await this.store.updatePipeline(data, params)
    this.fetchData()
    this.setState({ showEditBaseInfo: false, showEditConfig: false })
  }

  showDeleteModal = () => {
    this.setState({ showDelete: true })
  }

  hideDeleteModal = () => {
    this.setState({ showDelete: false })
  }

  handleDelete = () => {
    const { project_id } = this.props.match.params
    const { detail } = this.store
    this.setState({ deleteLoading: true })
    this.store.deletePipeline(detail.name, project_id).then(() => {
      this.hideDeleteModal()
      this.routing.push(`/devops/${project_id}/pipelines`)
    })
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
    const { detail } = this.store

    const operations = this.getOperations().filter(item =>
      this.enabledActions.includes(item.action)
    )

    return (
      <BaseInfo
        icon={ICON_TYPES[this.module]}
        name={detail.name}
        desc={get(detail.annotations, 'desc')}
        operations={operations}
        labels={detail.labels}
        attrs={this.getAttrs()}
      />
    )
  }

  renderExtraModals() {
    const { params } = this.props.match
    const { detail } = this.store
    const {
      showDelete,
      formTemplate,
      showScanLogs,
      showEditBaseInfo,
      showEditConfig,
      deleteLoading,
    } = this.state

    return (
      <div>
        <BaseInfoModal
          detail={formTemplate}
          visible={showEditBaseInfo}
          onOk={this.handleEdit}
          onCancel={this.hideEditModal}
          handleScanRepository={this.handleScanRepository}
        />
        <EditPipelineConfig
          title={t('Edit Pipeline')}
          formTemplate={formTemplate}
          visible={showEditConfig}
          onOk={this.handleEdit}
          project_id={params.project_id}
          onCancel={this.hideEditConfig}
        />
        <DeleteModal
          type={t('Pipeline')}
          resource={detail.name}
          visible={showDelete}
          onOk={this.handleDelete}
          onCancel={this.hideDeleteModal}
          isSubmitting={deleteLoading}
        />
        <ScanRepositoryLogs
          visible={showScanLogs}
          onCancel={this.hideScanLogs}
          store={this.store}
          params={params}
          handleScanRepository={this.handleScanRepository}
        />
      </div>
    )
  }
}

export default inject('rootStore')(observer(PipelineDetail))
export const Component = PipelineDetail
