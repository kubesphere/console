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

import { omit, isArray } from 'lodash'
import { saveAs } from 'file-saver'
import { action, observable, toJS } from 'mobx'
import { Message } from '@pitrix/lego-ui'

import BaseStore from './base'
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

  @action
  async getCommits({
    name,
    branch,
    runid,
    devops,
    workspace,
    cluster,
    ...filters
  }) {
    name = decodeURIComponent(name)

    const { page } = filters

    this.commitsList.isLoading = true
    const result = await this.request.get(
      `${this.getDevopsUrlV2({ cluster })}${devops}/pipelines/${name}${
        branch ? `/branches/${encodeURIComponent(branch)}` : ''
      }/runs/${runid}/`,
      {
        start: (page - 1) * TABLE_LIMIT || 0,
      }
    )
    this.commitsList = {
      data: result.changeSet || [],
      limit: TABLE_LIMIT,
      total: result.changeSet ? result.changeSet.length : 0,
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
    runid,
    cluster,
    workspace,
    ...filters
  }) {
    name = decodeURIComponent(name)

    const { page } = filters

    this.artifactsList.isLoading = true
    const result = await this.request.get(
      `${this.getDevopsUrlV2({ cluster })}${devops}/pipelines/${name}${
        branch ? `/branches/${encodeURIComponent(branch)}` : ''
      }/runs/${runid}/artifacts/`,
      {
        start: (page - 1) * TABLE_LIMIT || 0,
        limit: 100,
      }
    )
    this.artifactsList = {
      data: result || [],
      total: result.length,
      limit: 100,
      page: parseInt(page, 10) || 1,
      filters: omit(filters, 'devops'),
      isLoading: false,
      selectedRowKeys: [],
    }
  }

  @action
  async getNodesStatus({ devops, name, branch, runid, cluster }) {
    name = decodeURIComponent(name)

    this.getNodesStatusLoading = true
    const result = await this.request.get(
      `${this.getDevopsUrlV2({ cluster })}${devops}/pipelines/${name}${
        branch ? `/branches/${encodeURIComponent(branch)}` : ''
      }/runs/${runid}/nodesdetail/?limit=10000`
    )

    if (!isArray(result)) {
      this.getNodesStatusLoading = false
      return
    }

    const hasStep = result.some(stage => stage.steps && stage.steps.length)
    if (hasStep) {
      // format to tree structure
      this.nodesStatus = result.reduce((_arr, stage, index) => {
        stage.causeOfBlockage = this.runDetail.causeOfBlockage
        if (stage.type === 'STAGE') {
          if (result[index + 1] && result[index + 1].type === 'PARALLEL') {
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

    if (!result.length || !hasStep) {
      this.getRunStatusLogs({ devops, name, branch, runid, cluster })
    }
    this.getNodesStatusLoading = false
  }

  @action
  async getRunDetail(params) {
    const { devops, name, branch, runid, cluster } = params
    const result = await this.request.get(
      `${this.getDevopsUrlV2({
        cluster,
      })}${devops}/pipelines/${decodeURIComponent(name)}${
        branch ? `/branches/${encodeURIComponent(branch)}` : ''
      }/runs/${runid}/`,
      null,
      null,
      async resp => {
        if (resp.status === 404) {
          const pipelineDetail = await this.pipelineStore.fetchDetail(params)
          this.runDetail = pipelineDetail.latestRun || {}
          return toJS(this.runDetail)
        }
      }
    )
    this.runDetail = result
    this.isLoading = false
  }

  async replay(params, _runid) {
    const { devops, name, branch, runid, cluster } = params
    return await this.request.post(
      `${this.getDevopsUrlV2({
        cluster,
      })}${devops}/pipelines/${decodeURIComponent(name)}${
        branch ? `/branches/${encodeURIComponent(branch)}` : ''
      }/runs/${_runid || runid}/replay`
    )
  }

  @action
  async getRunStatusLogs({ devops, name, branch, runid, cluster }) {
    // TODO: use response headers offset
    const result = await this.request.get(
      `${this.getDevopsUrlV2({ cluster })}${devops}/pipelines/${name}${
        branch ? `/branches/${encodeURIComponent(branch)}` : ''
      }/runs/${runid}/log/?start=0`
    )
    this.runDetailLogs = result
  }

  async handleDownloadLogs({ devops, name, branch, runid, cluster }) {
    name = decodeURIComponent(name)
    await this.getRunStatusLogs({ devops, name, branch, runid, cluster })
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
    runid,
    nodeId,
    branch,
    cluster,
    stepId,
    inputId,
  }) {
    return await this.request.post(
      `${this.getDevopsUrlV2({ cluster })}${devops}/pipelines/${name}/${
        branch ? `branches/${encodeURIComponent(branch)}/` : ''
      }runs/${runid}/nodes/${nodeId}/steps/${stepId}/`,
      {
        id: inputId,
        parameters,
      },
      null,
      resp => {
        if (resp.status === 400) {
          Message.error({
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
    runid,
    nodeId,
    branch,
    stepId,
    inputId,
    cluster,
  }) {
    return await this.request.post(
      `${this.getDevopsUrlV2({ cluster })}${devops}/pipelines/${name}/${
        branch ? `branches/${encodeURIComponent(branch)}/` : ''
      }runs/${runid}/nodes/${nodeId}/steps/${stepId}/`,
      {
        id: inputId,
        abort: true,
      }
    )
  }
}
