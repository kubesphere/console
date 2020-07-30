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
import { get, isEmpty } from 'lodash'
import { Loading } from '@pitrix/lego-ui'

import { ICON_TYPES } from 'utils/constants'
import { renderRoutes } from 'utils/router.config'
import { updatePipelineParams, updatePipelineParamsInSpec } from 'utils/devops'
import { getPipelineStatus } from 'utils/status'

import Notify from 'components/Base/Notify'
import Base from 'core/containers/Base/Detail'
import BaseInfo from 'core/containers/Base/Detail/BaseInfo'
import Status from 'devops/components/Status'
import PipelineStore from 'stores/devops/pipelines'
import DeleteModal from 'components/Modals/Delete'
import CodeQualityStore from 'stores/devops/codeQuality'
import DevopsStore from 'stores/devops'

import ScanRepositoryLogs from '../../Modals/scanRepositoryLogsModal'
import BaseInfoModal from '../../Modals/baseInfoModal'
import EditPipelineConfig from '../../Modals/editPipelineConfigModal'
import Nav from './nav'
import styles from './sider.scss'

@inject('rootStore')
@observer
export default class PipelineDetail extends Base {
  constructor(props) {
    super(props)

    this.store = new PipelineStore()
    this.sonarqubeStore = new CodeQualityStore()
    this.devopsStore = new DevopsStore()

    const { devops } = this.props.match.params
    this.store.setDevops(devops)

    this.state = {
      showEditConfig: false,
      showDelete: false,
      showEditBaseInfo: false,
      deleteLoading: false,
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

  get enabledActions() {
    const { cluster, devops } = this.props.match.params

    return globals.app.getActions({
      module: 'pipelines',
      cluster,
      devops,
    })
  }

  fetchData = async () => {
    const { params } = this.props.match

    const result = await this.store.fetchDetail(params).catch(e => {
      if (e.status === 404) {
        this.store.notFound = true
      }
    })

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

  getUpTime = activityList => {
    const updateTime = get(toJS(activityList.data), '[0].startTime', '')
    return !updateTime
      ? '-'
      : moment(updateTime).format(`${t('MMMM Do YYYY')} HH:mm`)
  }

  getOperations = () => {
    const { detail } = toJS(this.store)
    const list = [
      {
        key: 'edit',
        type: 'control',
        text: t('EDIT'),
        action: 'edit',
        onClick: () => this.showEditModal('showEditBaseInfo'),
      },
      {
        key: 'editConfig',
        type: 'control',
        text: t('Edit Config'),
        action: 'edit',
        onClick: () => this.showEditModal('showEditConfig'),
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
    return list
  }

  getAttrs = () => {
    const { activityList } = this.store
    const { devopsName } = this.devopsStore
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

  showEditModal = async type => {
    const { params } = this.props.match

    const pipeLineConfig = await this.store.getPipeLineConfig()

    pipeLineConfig.devops = params.devops
    this.setState({ [type]: true, formTemplate: pipeLineConfig })
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
      devops: params.devops,
      name: detail.name,
      cluster: params.cluster,
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
    const { devops, cluster } = this.props.match.params
    updatePipelineParams(data, true)
    updatePipelineParamsInSpec(data, devops)

    await this.store.updatePipeline({ data, devops, cluster })

    this.setState({ showEditBaseInfo: false, showEditConfig: false }, () => {
      this.fetchData()
    })
  }

  showDeleteModal = () => {
    this.setState({ showDelete: true })
  }

  hideDeleteModal = () => {
    this.setState({ showDelete: false })
  }

  handleDelete = () => {
    const { devops, cluster, workspace } = this.props.match.params
    const { detail } = this.store
    this.setState({ deleteLoading: true })
    this.store.deletePipeline(detail.name, devops, cluster).then(() => {
      this.hideDeleteModal()
      this.routing.push(
        `/${workspace}/clusters/${cluster}/devops/${devops}/pipelines`
      )
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
    const { detail } = toJS(this.store)
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
          project_name={params.project_name}
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
