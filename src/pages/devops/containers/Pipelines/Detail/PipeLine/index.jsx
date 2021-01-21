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
import { Button, Loading } from '@kube-design/components'
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

  get enabledActions() {
    const { cluster, devops } = this.props.match.params

    return globals.app.getActions({
      module: 'pipelines',
      cluster,
      devops,
    })
  }

  get isMultibranch() {
    const { detailStore } = this.props
    const scmSource = toJS(detailStore.detail.scmSource)
    return !isEmpty(scmSource)
  }

  handlePipelineModal = () => {
    const { pipelineJsonData } = this.store
    const { params } = this.props.match

    this.trigger('pipeline.pipeline', {
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
    const { jenkinsfile } = this.store
    const { params } = this.props.match

    this.trigger('pipeline.jenkins', {
      store: this.store,
      defaultValue: toJS(jenkinsfile),
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

    await this.store.getJenkinsFile(params)

    this.store.getActivities(params)
  }

  handleRefresh = () => {
    const { params } = this.props.match
    this.store.getJenkinsFile(params)
  }

  componentDidMount() {
    if (this.isMultibranch || !this.enabledActions.includes('edit')) {
      this.props.rootStore.routing.push('./activity')
      return
    }
    this.getData()
  }

  handleRunning = debounce(() => {
    const { detail } = this.store
    const isMultibranch = detail.branchNames
    const hasParameters = detail.parameters && detail.parameters.length
    const { params } = this.props.match

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
    const editable = this.enabledActions.includes('edit')

    return (
      <div className={style.pipelineCard__btnGroup}>
        {editable && (
          <Button onClick={this.handleJenkinsFileModal}>
            {t('Edit Jenkinsfile')}
          </Button>
        )}
        {editable && (
          <Button onClick={this.handlePipelineModal}>
            {t('Edit Pipeline')}
          </Button>
        )}
        {editable && (
          <Button type="control" onClick={this.handleRunning}>
            {t('Run')}
          </Button>
        )}
      </div>
    )
  }

  renderPipeLineContent() {
    const { pipelineJson, isLoading } = this.store.pipelineJsonData

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
            <Button type="control" onClick={this.handlePipelineModal}>
              {t('Edit Pipeline')}
            </Button>
          )}
          {editable && (
            <Button onClick={this.handleJenkinsFileModal}>
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
            <Button onClick={this.handleJenkinsFileModal}>
              {t('Edit Jenkinsfile')}
            </Button>
          )}
          {editable && (
            <Button type="control" onClick={this.handleRunning}>
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
    return <div>{this.renderPipeLineContent()}</div>
  }
}
