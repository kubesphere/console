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

import { omit, isArray, get } from 'lodash'
import { saveAs } from 'file-saver'
import { action, observable, toJS } from 'mobx'
import { Notify } from '@kube-design/components'
import { safeParseJSON } from 'utils'

import BaseStore from '../devops'

import PipelineStore from './pipelines'

const TABLE_LIMIT = 10

export default class PipelineRunStore extends BaseStore {
  constructor() {
    super()
    this.pipelineStore = new PipelineStore()
  }

  @observable
  detail = {}

  @observable
  runName = ''

  @observable
  devops = ''

  @observable
  commitsList = {
    data: [],
    page: 1,
    limit: 10,
    total: 0,
    order: '',
    reverse: false,
    filters: {},
    isLoading: true,
  }

  @observable
  artifactsList = {
    data: [],
    page: 1,
    limit: 10,
    total: 0,
    order: '',
    reverse: false,
    filters: {},
    isLoading: true,
  }

  @observable
  isLoading = true

  @observable
  getNodesStatusLoading = false

  @observable
  nodesStatus = []

  @observable
  runDetail = {}

  // entire run log
  @observable
  runDetailLogs = ''

  getUrl({ cluster, devops, name }) {
    return `${this.getDevopsUrlV2({
      cluster,
      devops,
    })}pipelines/${decodeURIComponent(name)}/`
  }

  getRunUrl({ cluster, devops, name, branch, runId }) {
    return `${this.getUrl({ cluster, devops, name })}${
      branch ? `branches/${encodeURIComponent(branch)}/` : ''
    }runs/${runId}/`
  }

  @action
  async getCommits({
    name,
    branch,
    runId,
    devops,
    workspace,
    cluster,
    ...filters
  }) {
    name = decodeURIComponent(name)

    const { page } = filters

    this.commitsList.isLoading = true
    const result = await request.get(
      `${this.getRunUrl({ cluster, devops, name, branch, runId })}`,
      {
        start: (page - 1) * TABLE_LIMIT || 0,
        limit: TABLE_LIMIT,
      }
    )
    let data = []

    if (result.changeSet && isArray(result.changeSet)) {
      data = result.changeSet.map(item => {
        return {
          commitId: get(item, 'commitId'),
          startTime: get(item, 'timestamp'),
          url: get(item, 'url'),
          author: get(item, 'author.fullName'),
          title: get(item, 'msg'),
        }
      })
    } else if (result.pullRequest) {
      const commitBody = {
        commitId: get(result, 'commitId'),
        startTime: get(result, 'startTime'),
        url: get(result, 'pullRequest.url'),
        author: get(result, 'pullRequest.author'),
        title: get(result, 'pullRequest.title'),
      }
      data.push(commitBody)
    }

    this.commitsList = {
      data,
      limit: TABLE_LIMIT,
      total: data.length,
      page: parseInt(page, 10) || 1,
      filters: omit(filters, 'devops'),
      isLoading: false,
      selectedRowKeys: [],
    }
  }

  @action
  async getArtifacts({
    devops,
    name,
    branch,
    runId,
    cluster,
    workspace,
    ...filters
  }) {
    name = decodeURIComponent(name)
    const { page } = filters

    this.artifactsList.isLoading = true
    const result = await request.get(
      `${this.getRunUrl({
        cluster,
        devops,
        name,
        branch,
        runId,
      })}artifacts/`,
      {
        start: (page - 1) * TABLE_LIMIT || 0,
        limit: TABLE_LIMIT,
      }
    )

    this.artifactsList = {
      data: result || [],
      total: result.length,
      limit: TABLE_LIMIT,
      page: parseInt(page, 10) || 1,
      filters: omit(filters, 'devops'),
      isLoading: false,
      selectedRowKeys: [],
    }
  }

  @action
  async getNodesStatus({ devops, name, branch, runId, cluster }) {
    name = decodeURIComponent(name)

    this.getNodesStatusLoading = true

    const stages = JSON.parse(
      get(
        this.runDetail,
        '_originData.metadata.annotations["devops.kubesphere.io/jenkins-pipelinerun-stages-status"]',
        '[]'
      )
    )

    if (stages) {
      // format to tree structure
      this.nodesStatus = stages.reduce((_arr, stage, index) => {
        stage.causeOfBlockage = this.runDetail.causeOfBlockage
        if (stage.type === 'STAGE') {
          if (stages[index + 1] && stages[index + 1].type === 'PARALLEL') {
            const arr = []
            _arr.push(arr)
            return _arr
          }
          _arr.push(stage)
        } else if (Array.isArray(_arr[_arr.length - 1])) {
          _arr[_arr.length - 1].push(stage)
        } else {
          _arr.push([stage])
        }
        return _arr
      }, [])
    } else {
      this.nodesStatus = []
    }

    if (!stages || stages.length < 1) {
      this.getRunStatusLogs({ devops, name, branch, runId, cluster })
    }
    this.getNodesStatusLoading = false
  }

  @action
  async getRunName({ devops, name, branch, runId, cluster }) {
    const activitiesList = await this.pipelineStore.getActivities({
      cluster,
      devops,
      name,
      backward: false,
      page: -1,
    })

    const runDetail =
      isArray(activitiesList) &&
      activitiesList.filter(item => {
        const branchName = get(item, '_originData.spec.scm.refName', '')
        const _branch = branch || ''

        if (item.id === runId && _branch === branchName) {
          return true
        }
        return false
      })[0]

    this.runName = get(runDetail, '_originData.metadata.name')
  }

  @action
  async getRunDetail(params) {
    const { devops, cluster } = params

    const runDetail = await request.get(
      `${this.getBaseUrl({
        cluster,
        namespace: devops,
      })}pipelineruns/${this.runName}`,
      null,
      null,
      async res => {
        if (res.status === 404) {
          const pipelineDetail = await this.pipelineStore.fetchDetail(params)
          this.runDetail = pipelineDetail.latestRun || {}
          return toJS(this.runDetail)
        }
      }
    )

    this.runDetail = {
      ...safeParseJSON(
        get(
          runDetail,
          "metadata.annotations.['devops.kubesphere.io/jenkins-pipelinerun-status']"
        )
      ),
      _originData: runDetail,
    }
  }

  async replay(params, _runId) {
    const { devops, name, branch, runId, cluster } = params
    return await request.post(
      `${this.getRunUrl({
        cluster,
        devops,
        name,
        branch,
        runId: _runId || runId,
      })}replay`
    )
  }

  @action
  async getRunStatusLogs({ devops, name, branch, runId, cluster }) {
    // TODO: use response headers offset
    const result = await request.get(
      `${this.getRunUrl({
        cluster,
        devops,
        name,
        branch,
        runId,
      })}log/?start=0`
    )
    this.runDetailLogs = result
  }

  async handleDownloadLogs({ devops, name, branch, runId, cluster }) {
    name = decodeURIComponent(name)
    await this.getRunStatusLogs({
      devops,
      name,
      branch,
      runId,
      cluster,
    })
    this.saveAsFile(this.runDetailLogs, 'log.txt')
  }

  saveAsFile = (text = '', fileName = 'default.txt') => {
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' })
    saveAs(blob, fileName)
  }

  async handleProceed({
    parameters,
    devops,
    name,
    runId,
    nodeId,
    branch,
    cluster,
    stepId,
    inputId,
  }) {
    return await request.post(
      `${this.getRunUrl({
        cluster,
        devops,
        name,
        branch,
        runId,
      })}nodes/${nodeId}/steps/${stepId}/`,
      {
        id: inputId,
        parameters,
      },
      null,
      resp => {
        if (resp.status === 400) {
          Notify.error({
            content: t("Sorry, you don't have the permission to do this."),
          })
          return true
        }
      }
    )
  }

  async handleBreak({
    devops,
    name,
    runId,
    nodeId,
    branch,
    stepId,
    inputId,
    cluster,
  }) {
    return await request.post(
      `${this.getRunUrl({
        cluster,
        devops,
        name,
        branch,
        runId,
      })}nodes/${nodeId}/steps/${stepId}/`,
      {
        id: inputId,
        abort: true,
      }
    )
  }
}
