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
import { Button, Loading, Tooltip } from '@kube-design/components'
import { toJS } from 'mobx'
import { observer, inject } from 'mobx-react'
import { isEmpty, debounce } from 'lodash'

import PipelineContent from 'devops/components/Pipeline'

import { trigger } from 'utils/action'
import EmptyCard from 'devops/components/Cards/EmptyCard'

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

  get isMultibranch() {
    const { detailStore } = this.props
    return toJS(detailStore.detail.isMultiBranch)
  }

  handlePipelineModal = () => {
    const { pipelineJsonData } = this.store
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
      success: jenkinsFile => {
        this.trigger('pipeline.pipelineCreate', {
          store: this.store,
          jsonData: jenkinsFile,
          params,
          success: () => {
            const { devops, name } = params
            localStorage.removeItem(
              `${globals.user.username}-${devops}-${name}`
            )
            this.handleRefresh()
          },
        })
      },
    })
  }

  handleEditorPipelineModal = () => {
    const { pipelineJsonData } = this.store
    const { params } = this.props.match

    this.trigger('pipeline.pipelineCreate', {
      store: this.store,
      jsonData: toJS(pipelineJsonData.pipelineJson),
      params,
      success: () => {
        const { devops, name } = params
        localStorage.removeItem(`${globals.user.username}-${devops}-${name}`)
        this.handleRefresh()
      },
    })
  }

  handleJenkinsFileModal = () => {
    const { pipelineConfig } = this.store
    const { params } = this.props.match

    this.trigger('pipeline.jenkins', {
      store: this.store,
      defaultValue: toJS(pipelineConfig.spec.pipeline.jenkinsfile),
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
  }

  handleRefresh = () => {
    const { params } = this.props.match
    const decodeName = decodeURIComponent(params.name)

    this.store.getJenkinsFile({ ...params, name: decodeName }, true)
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

    if (!this.store.detail?.validate || isEmpty(toJS(pipelineJson))) {
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

    if (pipelineJson.result === 'failure') {
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
