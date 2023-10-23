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

import { omit, isArray, get, isEmpty } from 'lodash'
import { saveAs } from 'file-saver'
import { action, computed, observable, toJS } from 'mobx'
import { Notify } from '@kube-design/components'
import { getClusterUrl, safeParseJSON } from 'utils'

import BaseStore from '../devops'

import PipelineStore from './pipelines'

export default class PipelineRunStore extends BaseStore {
  constructor() {
    super()
    this.pipelineStore = new PipelineStore()
  }

  @observable
  detail = {}

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
  runStartDetailLogs = ''

  @observable
  logSize = 0

  @observable
  overflow = false

  @observable
  hasMore = false

  hasMoreNotify = false

  @observable
  lastDetailLogs = ''

  @computed
  get runDetailLogs() {
    return this.runStartDetailLogs + this.lastDetailLogs
  }

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
    runName,
    devops,
    workspace,
    cluster,
    ...filters
  }) {
    name = decodeURIComponent(name)

    const { page, limit = 10 } = filters

    if (!this.runDetail.id) {
      await this.getRunDetail({ devops, cluster, runName })
    }

    this.commitsList.isLoading = true

    const result = await request.get(
      `${this.getRunUrl({
        cluster,
        devops,
        name,
        branch,
        runId: this.runDetail.id,
      })}`,
      {
        start: (page - 1) * limit || 0,
        limit,
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
      limit,
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
    runName,
    branch,
    cluster,
    workspace,
    ...filters
  }) {
    name = decodeURIComponent(name)
    const { page, limit = 10 } = filters

    if (!this.runDetail.id) {
      await this.getRunDetail({ devops, cluster, runName })
    }

    this.artifactsList.isLoading = true
    const result = await request.get(
      `${this.getRunUrl({
        cluster,
        devops,
        name,
        branch,
        runId: this.runDetail.id,
      })}artifacts/`,
      {
        start: (page - 1) * limit || 0,
        limit,
      }
    )

    this.artifactsList = {
      data: result || [],
      pipeline: name,
      pipelineRun: runName,
      total: result.length,
      limit,
      page: parseInt(page, 10) || 1,
      filters: omit(filters, 'devops'),
      isLoading: false,
      selectedRowKeys: [],
    }
  }

  @action
  async getNodesStatus({ devops, name, branch, cluster }) {
    name = decodeURIComponent(name)

    this.getNodesStatusLoading = true

    const result = await request.get(
      `${this.getBaseUrl({
        cluster,
        namespace: devops,
      })}pipelineruns/${this.runDetail.name}/nodedetails`
    )

    if (!isArray(result)) {
      this.getNodesStatusLoading = false
      return
    }

    const hasStep = !isEmpty(result)

    if (hasStep) {
      // format to tree structure
      this.nodesStatus = result.reduce((_arr, stage, index) => {
        stage.causeOfBlockage = this.runDetail.causeOfBlockage
        if (stage.type === 'STAGE') {
          if (result[index + 1] && result[index + 1].type === 'PARALLEL') {
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

    if (!result || result.length < 1) {
      this.getRunStatusLogs({
        devops,
        name,
        branch,
        runId: this.runDetail.id,
        cluster,
      })
    }
    this.getNodesStatusLoading = false
  }

  @action
  async getRunDetail(params) {
    const { devops, cluster, runName } = params

    const runDetail = await request.get(
      `${this.getBaseUrl({
        cluster,
        namespace: devops,
      })}pipelineruns/${runName}`,
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
      name: get(runDetail, 'metadata.name'),
      _originData: runDetail,
    }
    this.isLoading = false
  }

  async replay(params, _runId) {
    const { devops, name, branch, cluster } = params
    return await request.post(
      `${this.getRunUrl({
        cluster,
        devops,
        name,
        branch,
        runId: _runId || this.runDetail.id,
      })}replay`
    )
  }

  @action
  async getRunStatusLogs(
    { devops, name, branch, runId, cluster },
    refresh = false
  ) {
    if (refresh) {
      this.logSize = 0
      this.runStartDetailLogs = ''
      this.hasMore = false
    }
    if (this.overflow) {
      const result = await request.get(
        `${this.getRunUrl({
          cluster,
          devops,
          name,
          branch,
          runId,
        })}log/?thresholdInKB=150`
      )
      this.hasMore = true
      this.lastDetailLogs = `

*****************************************************************    
* The log is too large, please download it to view the details. *
*                                                               * 
* The following is the latest 150KB log.                        * 
*****************************************************************    

${result}`
    } else {
      const start = this.logSize
      const params = start ? `?start=${start}` : ''
      const result = await request.get(
        `${this.getRunUrl({
          cluster,
          devops,
          name,
          branch,
          runId,
        })}log/${params}`,
        {},
        {
          headers: {
            // 'x-file-size-limit': 1024 * 1024 * 10,
            'x-with-headers': true,
          },
        }
      )
      const size = result.headers.get('x-text-size')
      if (size) {
        this.logSize = Number(size)
        this.hasMore = Boolean(result.headers.get('x-more-data'))
      } else {
        this.logSize += Number(result.headers.get('x-text-size'))
        this.hasMore = Boolean(result.headers.get('x-more-data'))
      }
      this.overflow =
        Boolean(result.headers.get('X-File-Size-Limit-Out')) ||
        this.logSize >= 1024 * 1024 * 10

      result.text().then(text => {
        if (start === 0) {
          this.runStartDetailLogs = text
          return
        }
        // console.log(this.runStartDetailLogs.slice(-100).split('\n'))
        const arr = this.runStartDetailLogs.slice(-100).split('\n')
        if (arr.length >= 2) {
          arr.pop()
          if (arr.length && arr.pop().startsWith('Finished:')) {
            //
          } else {
            this.runStartDetailLogs += text
          }
        } else {
          this.runStartDetailLogs += text
        }
      })
    }
  }
  // removeSameWords = (str1, str2) => {
  //   const end = str1.slice(-100)
  //   const index = str2.indexOf(end)
  //   if (index === -1) {
  //     return str2
  //   }
  //   return str2.slice(index + end.length)
  // }

  handleJumpFullLogs({ devops, name, branch, cluster }) {
    name = decodeURIComponent(name)
    const url = getClusterUrl(
      `${window.location.protocol}//${window.location.host}/${this.getRunUrl({
        cluster,
        devops,
        name,
        branch,
        runId: this.runDetail.id,
      })}log/?start=0`
    )
    window.open(url)
  }

  async handleDownloadLogs({ devops, name, branch, cluster }) {
    name = decodeURIComponent(name)
    const url = getClusterUrl(
      `${window.location.protocol}//${window.location.host}/${this.getRunUrl({
        cluster,
        devops,
        name,
        branch,
        runId: this.runDetail.id,
      })}log/?start=0&download=true`
    )
    const a = document.createElement('a')
    a.href = url
    a.download = `${name}-${this.runDetail.id}-${this.runDetail.name}.log`
    a.headers = {
      'x-add-res-header': JSON.stringify({
        'Content-Disposition': `attachment; filename=${name}-${this.runDetail.name}.log`,
      }),
    }
    a.click()
  }

  saveAsFile = (text = '', fileName = 'default.txt') => {
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' })
    saveAs(blob, fileName)
  }

  async handleProceed({
    parameters,
    devops,
    name,
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
        runId: this.runDetail.id,
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
        runId: this.runDetail.id,
      })}nodes/${nodeId}/steps/${stepId}/`,
      {
        id: inputId,
        abort: true,
      }
    )
  }
}