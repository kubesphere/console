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

import { Button, Loading, Notify, Tooltip } from '@kube-design/components'
import EmptyCard from 'devops/components/Cards/EmptyCard'

import PipelineContent from 'devops/components/Pipeline'
import { debounce, isEmpty } from 'lodash'
import { toJS } from 'mobx'
import { inject, observer } from 'mobx-react'
import React from 'react'

import { trigger } from 'utils/action'

import style from './index.scss'

@inject('rootStore', 'detailStore')
@observer
@trigger
export default class Pipeline extends React.Component {
  store = this.props.detailStore || {}

  formTemplate = {}

  get enabledActions() {
    const { cluster, devops } = this.props.match.params

    return globals.app.getActions({
      module: 'pipelines',
      cluster,
      devops,
    })
  }

  get editable() {
    return this.enabledActions.includes('edit')
  }

  get jenkinsFileMode() {
    return this.store.pipelineConfig.metadata.annotations[
      'pipeline.devops.kubesphere.io/jenkinsfile.edit.mode'
    ]
  }

  get isValidated() {
    return (
      this.store.pipelineConfig.metadata.annotations[
        'pipeline.devops.kubesphere.io/jenkinsfile.validate'
      ] !== 'failure'
    )
  }

  get jenkinsFile() {
    const { pipelineConfig } = this.store
    return toJS(pipelineConfig.spec.pipeline.jenkinsfile)
  }

  get isMultibranch() {
    const { detailStore } = this.props
    return toJS(detailStore.detail.isMultiBranch)
  }

  handlePipelineModal = () => {
    const { pipelineJsonData, pipelineConfig } = this.store
    const defaultValue = toJS(pipelineConfig.spec.pipeline.jenkinsfile)
    const { params } = this.props.match

    this.trigger('pipeline.pipelineTemplate', {
      store: this.store,
      jsonData: toJS(pipelineJsonData.pipelineJson),
      formTemplate: this.formTemplate,
      title: t('CREATE_PIPELINE'),
      imageIcon: '/assets/pipeline/pipeline-icon-dark.svg',
      description: t('CREATE_PIPELINE_DESC'),
      width: '960px',
      contentWidth: '960px',
      noCodeEdit: true,
      params,
      onCancel: () => this.handleReset(defaultValue),
      success: ({ jenkinsFile, jsonData, mode, template }) => {
        if (template === 'custom') {
          this.trigger('pipeline.pipelineCreate', {
            store: this.store,
            jsonData: {},
            params,
            trigger: (...args) => {
              this.trigger(...args)
            },
            onCancel: () => this.handleReset(defaultValue),
            success: () => {
              const { devops, name } = params
              localStorage.removeItem(
                `${globals.user.username}-${devops}-${name}`
              )
              this.handleRefresh()
            },
          })
        } else if (!mode) {
          this.store.updateJenkinsFile(jenkinsFile)
          if (!isEmpty(jsonData)) {
            this.store.setPipelineJsonData(jsonData)
            this.handleEditorPipelineModal(undefined, () =>
              this.handleReset(defaultValue)
            )
          } else {
            this.handleJenkinsFileModal(undefined, () =>
              this.handleReset(defaultValue)
            )
          }
        } else {
          Notify.success({ content: t('CREATE_SUCCESSFUL') })
          this.handleRefresh()
        }
      },
    })
  }

  handleReset = (defaultValue = '') => {
    const { params } = this.props.match
    const { devops, name, cluster } = params
    clearTimeout(this.store.timer)
    const clusterPath =
      cluster && cluster !== 'default' ? `/klusters/${cluster}` : ''
    request
      .put(
        `/kapis/devops.kubesphere.io/v1alpha3${clusterPath}/devops/${devops}/pipelines/${name}/jenkinsfile?mode=raw`,
        { data: defaultValue },
        {
          headers: {
            'content-type': 'application/json',
          },
        }
      )
      .then(this.handleRefresh)
  }

  handleEditorPipelineModal = (e, cb) => {
    const { pipelineJsonData } = this.store
    const { params } = this.props.match

    this.trigger('pipeline.pipelineCreate', {
      store: this.store,
      jsonData: toJS(pipelineJsonData.pipelineJson),
      onCancel: cb,
      params,
      trigger: (...args) => {
        this.trigger(...args)
      },
      success: () => {
        const { devops, name } = params
        localStorage.removeItem(`${globals.user.username}-${devops}-${name}`)
        this.handleRefresh()
      },
    })
  }

  handleJenkinsFileModal = (e, cb) => {
    const { pipelineConfig } = this.store
    const { params } = this.props.match

    this.trigger('pipeline.jenkins', {
      store: this.store,
      defaultValue: toJS(pipelineConfig.spec.pipeline.jenkinsfile),
      onCancel: cb,
      params,
      success: () => {
        const { devops, name } = params
        localStorage.removeItem(`${globals.user.username}-${devops}-${name}`)
        this.handleRefresh()
      },
    })
  }

  getData = async () => {
    const { params } = this.props.match
    const decodeName = decodeURIComponent(params.name)

    await this.store.getJenkinsFile({ ...params, name: decodeName })

    this.store.getActivities(params)
    if (this.jenkinsFileMode) {
      this.handleRefresh()
    }
  }

  handleRefresh = async () => {
    const { params } = this.props.match
    const decodeName = decodeURIComponent(params.name)
    await this.store.getJenkinsFile({ ...params, name: decodeName }, true)
    if (this.jenkinsFileMode) {
      this.store
        .fetchDetailUntilEditModeNull({
          ...params,
          name: decodeName,
        })
        .then(res => {
          this.store.detail = res
          this.store.setPipelineConfig(res._originData)
        })
    }
  }

  componentDidMount() {
    if (this.isMultibranch || !this.editable) {
      this.props.rootStore.routing.push('./activity')
      return
    }
    this.getData()
  }

  handleRunning = debounce(async () => {
    const { params } = this.props.match
    await this.store.fetchDetail(params)
    const { detail } = this.store
    const isMultibranch = !isEmpty(toJS(detail.branchNames))
    const hasParameters = !isEmpty(toJS(detail.parameters))

    if (isMultibranch || hasParameters) {
      this.trigger('pipeline.params', {
        devops: params.devops,
        cluster: params.cluster,
        params,
        branches: toJS(detail.branchNames),
        disabledBrancheNames: toJS(detail.disabledBranchNames),
        parameters: toJS(detail.parameters),
        success: () => {
          this.props.rootStore.routing.push('./activity')
        },
      })
    } else {
      this.handleRunSubmit()
    }
  }, 500)

  handleRunSubmit = async (parameters, branch) => {
    const { detail } = this.store
    const { devops, cluster } = this.props.match.params
    await this.store.runBranch({
      name: detail.name,
      branch,
      parameters,
      cluster,
      devops,
    })
    this.props.rootStore.routing.push('./activity')
  }

  renderBtnGroup() {
    if (!this.editable) {
      return
    }

    return (
      <div className={style.pipelineCard__btnGroup}>
        {this.jenkinsFileMode === 'json' ? (
          <Tooltip content={t('JENKINS_UNAVAILABLE')}>
            <Button className={style['btn-disabled']}>
              {t('EDIT_JENKINSFILE')}
            </Button>
          </Tooltip>
        ) : (
          <Button onClick={this.handleJenkinsFileModal}>
            {t('EDIT_JENKINSFILE')}
          </Button>
        )}
        {this.jenkinsFileMode === 'raw' ? (
          <Tooltip content={t('JENKINS_UNAVAILABLE')}>
            <Button className={style['btn-disabled']}>
              {t('EDIT_PIPELINE')}
            </Button>
          </Tooltip>
        ) : (
          <Button onClick={this.handleEditorPipelineModal}>
            {t('EDIT_PIPELINE')}
          </Button>
        )}
        <Button type="control" onClick={this.handleRunning}>
          {t('RUN')}
        </Button>
      </div>
    )
  }

  renderPipeLineContent() {
    const { pipelineJson, isLoading } = this.store.pipelineJsonData

    if (isLoading) {
      return (
        <Loading spinning>
          <div className={style.pipelineCard} />
        </Loading>
      )
    }

    if (this.jenkinsFileMode && this.jenkinsFileMode === 'raw') {
      return (
        <EmptyCard desc={t('JENKINS_UNAVAILABLE')}>
          {this.editable && (
            <>
              <Button
                onClick={this.handleJenkinsFileModal}
                disabled={this.jenkinsFileMode === 'json'}
              >
                {t('EDIT_JENKINSFILE')}
              </Button>
              <Button type="control" onClick={this.handleRunning}>
                {t('RUN')}
              </Button>
            </>
          )}
        </EmptyCard>
      )
    }

    if (
      (pipelineJson && pipelineJson.result === 'failure') ||
      !this.isValidated
    ) {
      return (
        <EmptyCard desc={t('INVALID_JENKINSFILE_TIP')}>
          {this.editable && (
            <>
              <Button
                onClick={this.handleJenkinsFileModal}
                disabled={this.jenkinsFileMode === 'json'}
              >
                {t('EDIT_JENKINSFILE')}
              </Button>
              <Button type="control" onClick={this.handleRunning}>
                {t('RUN')}
              </Button>
            </>
          )}
        </EmptyCard>
      )
    }

    if (isEmpty(toJS(pipelineJson)) || !this.jenkinsFile) {
      return (
        <EmptyCard desc={t('NO_PIPELINE_CONFIG_FILE_TIP')}>
          {this.editable && (
            <>
              <Button
                onClick={this.handleJenkinsFileModal}
                disabled={this.jenkinsFileMode === 'json'}
              >
                {t('EDIT_JENKINSFILE')}
              </Button>
              <Button
                type="control"
                onClick={this.handlePipelineModal}
                disabled={this.jenkinsFileMode === 'raw'}
              >
                {t('EDIT_PIPELINE')}
              </Button>
            </>
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
    return <div>{this.renderPipeLineContent()}</div>
  }
}
