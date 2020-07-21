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
import { Loading } from '@pitrix/lego-ui'
import { Button } from 'components/Base'
import { toJS } from 'mobx'
import { observer, inject } from 'mobx-react'
import { get, isEmpty, debounce } from 'lodash'

import ParamsModal from 'components/Forms/CICDs/paramsModal'
import PipelineContent from 'devops/components/Pipeline'

import JenkinsEdit from './jenkinsEdit'
import EmptyCard from '../../EmptyCard'
import PipelineModal from '../../Modals/pipelineEditModal'
import style from './index.scss'

@inject('rootStore')
@observer
export default class Pipeline extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showEditPipeline: false,
      showToken: false,
      showParamsModal: false,
      showEditJenkinsFile: false,
      isSubmitting: false,
      isSaveJenkinsLoading: false,
    }
  }

  get enabledActions() {
    const { cluster, project_id } = this.props.match.params
    const devops = this.props.detailStore.getDevops(project_id)

    return globals.app.getActions({
      module: 'pipelines',
      cluster,
      devops,
    })
  }

  get isMutiBranch() {
    const { detailStore } = this.props
    const scmSource = toJS(detailStore.detail.scmSource)
    return !isEmpty(scmSource)
  }

  get sourceBranch() {
    const { detail } = this.props.detailStore
    if (get(detail, 'branchNames', []).length) {
      if (detail.branchNames.indexOf('master')) {
        return 'master'
      }
      return detail.branchNames[0]
    }
    return ''
  }

  showEditPipeline = () => {
    this.setState({ showEditPipeline: true })
  }

  showEditJenkinsFile = () => {
    this.setState({ showEditJenkinsFile: true })
  }

  hideEditPipeline = () => {
    this.setState({ showEditPipeline: false })
  }

  hideEditJenkins = () => {
    this.setState({ showEditJenkinsFile: false })
  }

  getData = async () => {
    const { params } = this.props.match

    await this.props.detailStore.getJenkinsFile(params)

    this.props.detailStore.getActivities(params)
  }

  handleFresh = () => {
    const { params } = this.props.match
    this.props.detailStore.getJenkinsFile(params)
  }

  componentDidMount() {
    if (this.isMutiBranch || !this.enabledActions.includes('edit')) {
      this.props.rootStore.routing.push('./activity')
      return
    }
    this.getData()
  }

  handleEnterFullScreen = () => {
    const { isFullScreen } = this.state
    if (!isFullScreen) {
      this.setState({ isFullScreen: true })
    }
  }

  handleParamsCancel = () => {
    this.setState({ showParamsModal: false })
  }

  handleOk = async jenkinsFile => {
    const { params } = this.props.match
    if (!jenkinsFile) {
      return
    }
    this.setState({ isSubmitting: true })
    await this.props.detailStore
      .updateJenkinsFile(jenkinsFile, params)
      .finally(() => {
        this.setState({ isSubmitting: false })
      })
    this.setState({ showEditPipeline: false }, () => {
      this.handleFresh()
    })
    const { project_id, name } = params
    localStorage.removeItem(`${globals.user.username}-${project_id}-${name}`)
  }

  handleRun = debounce(() => {
    const { detail } = this.props.detailStore
    const isMutibranch = detail.branchNames
    const hasParameters = detail.parameters && detail.parameters.length
    if (isMutibranch || hasParameters) {
      this.setState({ showParamsModal: true })
    } else {
      this.handleRunOk()
    }
  }, 500)

  handleRunOk = async (parameters, branch) => {
    const { detail } = this.props.detailStore
    const { project_id, cluster } = this.props.match.params
    await this.props.detailStore.runBranch({
      name: detail.name,
      branch,
      parameters,
      cluster,
      project_id,
    })
    this.props.rootStore.routing.push('./activity')
  }

  handleEditOk = () => {
    this.handleBranchCancel()
  }

  handleSaveJenkinsFile = async jenkinsFile => {
    const { params } = this.props.match

    this.setState({ isSaveJenkinsLoading: true })
    await this.props.detailStore
      .updateJenkinsFile(jenkinsFile, params)
      .finally(() => {
        this.setState({ isSaveJenkinsLoading: false })
      })
    this.setState({ showEditJenkinsFile: false })
    this.handleFresh()
  }

  renderBtnGroup() {
    const editable = this.enabledActions.includes('edit')

    return (
      <div className={style.pipelineCard__btnGroup}>
        {editable && (
          <Button onClick={this.showEditJenkinsFile}>
            {t('Edit Jenkinsfile')}
          </Button>
        )}
        {editable && (
          <Button onClick={this.showEditPipeline}>{t('Edit Pipeline')}</Button>
        )}
        {editable && (
          <Button type="control" onClick={this.handleRun}>
            {t('Run')}
          </Button>
        )}
      </div>
    )
  }

  renderPipeLineContent() {
    const { pipelineJson, isLoading } = this.props.detailStore.pipelineJsonData

    const editable = this.enabledActions.includes('edit')

    if (isLoading) {
      return (
        <Loading spinning>
          <div className={style.pipelineCard} />
        </Loading>
      )
    }

    if (isEmpty(toJS(pipelineJson))) {
      return (
        <EmptyCard desc={t('PIPELINE_NO_CONFIG')}>
          {editable && (
            <Button type="control" onClick={this.showEditPipeline}>
              {t('Edit Pipeline')}
            </Button>
          )}
          {editable && (
            <Button onClick={this.showEditJenkinsFile}>
              {t('Edit Jenkinsfile')}
            </Button>
          )}
        </EmptyCard>
      )
    }

    if (pipelineJson.result === 'failure') {
      return (
        <EmptyCard desc={t('NOT_VALID_JENKINS_FILE')}>
          {editable && (
            <Button onClick={this.showEditJenkinsFile}>
              {t('Edit Jenkinsfile')}
            </Button>
          )}
          {editable && (
            <Button type="control" onClick={this.handleRun}>
              {t('Run')}
            </Button>
          )}
        </EmptyCard>
      )
    }

    return (
      <div className={style.pipelineCard}>
        <div className={style.pipelineCard__toolbar}>
          {this.renderBtnGroup()}
        </div>
        <div className={style.pipelineCard__main}>
          <PipelineContent jsonData={pipelineJson} />
        </div>
      </div>
    )
  }

  render() {
    const { showEditPipeline, isSubmitting } = this.state
    const { params } = this.props.match
    const { pipelineJsonData, jenkinsfile, detail } = this.props.detailStore

    return (
      <React.Fragment>
        {this.renderPipeLineContent()}
        <PipelineModal
          jsonData={toJS(pipelineJsonData.pipelineJson)}
          visible={showEditPipeline}
          onOk={this.handleOk}
          onCancel={this.hideEditPipeline}
          params={params}
          projectName={detail.name}
          isSubmitting={isSubmitting}
        />
        <JenkinsEdit
          params={params}
          defaultValue={toJS(jenkinsfile)}
          visible={this.state.showEditJenkinsFile}
          onOk={this.handleSaveJenkinsFile}
          onCancel={this.hideEditJenkins}
          isSubmitting={this.state.isSaveJenkinsLoading}
        />
        <ParamsModal
          branches={toJS(detail.branchNames)}
          visible={this.state.showParamsModal}
          parameters={toJS(detail.parameters)}
          onCancel={this.handleParamsCancel}
          onOk={this.handleRunOk}
          params={params}
        />
      </React.Fragment>
    )
  }
}
