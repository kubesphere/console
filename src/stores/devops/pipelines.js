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

import { omit, isArray, get, set, isEmpty, cloneDeep } from 'lodash'
import { saveAs } from 'file-saver'
import { action, observable, toJS } from 'mobx'
import BaseStore from './base'

const TABLE_LIMIT = 10

const FORM_HEAR = {
  headers: {
    'content-type': 'application/x-www-form-urlencoded',
  },
}

export default class PipelineStore extends BaseStore {
  module = 'pipelines'

  @observable
  pipelineConfig = {}

  @observable
  originalList = []

  @observable
  list = {
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
  branchList = {
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
  activityList = {
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
  pullRequestList = {
    data: [],
    page: 1,
    limit: 10,
    total: 0,
    order: '',
    reverse: false,
    filters: {},
    isLoading: true,
    selectedRowKeys: [],
  }

  @observable
  credentialsList = {
    data: [],
    total: 0,
    isLoading: true,
  }

  @observable
  detail = {}

  @observable
  isLoading = true

  @observable
  notFound = false

  @observable
  repositoryLog = ''

  @observable
  pipelineJsonData = {
    pipelineJson: {},
    isLoading: true,
  }

  @observable
  branchDetail = {}

  @observable
  jenkinsfile = ''

  @observable
  devops = ''

  @observable
  devopsName = ''

  @action
  async fetchList({ devops, workspace, devopsName, cluster, ...filters } = {}) {
    this.list.isLoading = true

    const { page, limit, name, filter } = filters

    const searchWord = name ? `*${encodeURIComponent(name)}*` : ''

    const url = `${this.getBaseUrlV2({ cluster })}search`
    const result = await this.request.get(
      url,
      {
        start: (page - 1) * TABLE_LIMIT || 0,
        limit: TABLE_LIMIT,
        q: `type:pipeline;organization:jenkins;pipeline:${devops}/${searchWord ||
          '*'};excludedFromFlattening:jenkins.branch.MultiBranchProject,hudson.matrix.MatrixProject`,
        filter: `${filter || 'no-folders'}`,
      },
      { params: { ...filters } }
    )

    result.items.forEach(item => {
      item.status = get(
        item,
        'annotations["pipeline.devops.kubesphere.io/syncstatus"]',
        'successful'
      )
    })

    this.setDevops(devops)
    this.devopsName = devopsName

    this.list = {
      data: result.items || [],
      total: result.total_count || 0,
      limit: parseInt(limit, 10) || 10,
      page: parseInt(page, 10) || 1,
      filters: omit(filters, 'devops'),
      selectedRowKeys: [],
      isLoading: false,
    }
  }

  @action
  async fetchDetail({ cluster, name, isSilent, devops }) {
    if (!isSilent) {
      this.isLoading = true
    }

    const result = await this.request.get(
      `${this.getDevopsUrlV2({
        cluster,
      })}${devops || this.devops}/pipelines/${decodeURIComponent(name)}/`
    )

    const resultKub = await this.request.get(
      `${this.getDevOpsDetailUrl({ devops, cluster })}/${this.module}/${name}`
    )

    this.setPipelineConfig(resultKub)
    this.detail = result
    this.isLoading = false
    return result
  }

  @action
  setPipelineConfig = detail => {
    this.pipelineConfig = detail
  }

  @action
  setSelectRowKeys = keys => {
    this.list.selectedRowKeys.replace(keys)
  }

  @action
  async checkPipelineName({ name, cluster, devops }) {
    return await this.request.get(
      `${this.getDevOpsUrl({ cluster })}/${devops}/pipelines/${name}`,
      {},
      {
        headers: { 'x-check-exist': true },
      }
    )
  }

  @action
  async getJenkinsFile({ cluster, name, devops }) {
    this.pipelineJsonData.isLoading = true
    const decodeName = decodeURIComponent(name)

    if (isEmpty(this.detail)) {
      await this.fetchDetail({ cluster, name: decodeName, devops })
    }

    this.jenkinsfile = get(this.pipelineConfig, 'spec.pipeline.jenkinsfile', '')
    const json = await this.convertJenkinsFileToJson(
      toJS(this.jenkinsfile),
      cluster
    )

    this.pipelineJsonData = {
      pipelineJson: json,
      isLoading: false,
    }
  }

  @action
  async convertJenkinsFileToJson(jenkinsfile, cluster) {
    if (jenkinsfile) {
      const result = await this.request.post(
        `${this.getBaseUrlV2({ cluster })}tojson`,
        { jenkinsfile },
        FORM_HEAR
      )
      return result.data
    }
  }

  @action
  async getPullRequest({ name, devops, workspace, cluster, ...filters }) {
    const decodeName = decodeURIComponent(name)

    const { page } = filters

    if (isEmpty(this.detail)) {
      await this.fetchDetail({ name: decodeName, devops })
    }

    const result = await this.request.get(
      `${this.getDevopsUrlV2({
        cluster,
      })}${devops}/pipelines/${name}/branches/`,
      {
        filter: 'pull-requests',
        start: (page - 1) * TABLE_LIMIT || 0,
        limit: TABLE_LIMIT,
      }
    )
    result.forEach(item => {
      item.id = item.latestRun.endTime
    })

    this.pullRequestList = {
      data: result || [],
      total: this.detail.totalNumberOfPullRequests || 0,
      limit: TABLE_LIMIT,
      page: parseInt(page, 10) || 1,
      filters: omit(filters, 'devops'),
      isLoading: false,
      selectedRowKeys: [],
    }
  }

  @action
  async getBranches({ cluster, devops, name, branch, ...filters }) {
    const decodeName = decodeURIComponent(name)

    const { page } = filters
    if (isEmpty(this.detail)) {
      await this.fetchDetail({ cluster, name: decodeName, devops })
    }

    const result = await this.request.get(
      `${this.getDevopsUrlV2({
        cluster,
      })}${devops}/pipelines/${name}/branches/`,
      {
        filter: 'origin',
        start: (page - 1) * TABLE_LIMIT || 0,
        limit: TABLE_LIMIT,
        branch,
      }
    )

    this.branchList = {
      data: result || [],
      limit: TABLE_LIMIT,
      total: this.detail.totalNumberOfBranches || 0,
      page: parseInt(page, 10) || 1,
      filters: omit(filters, 'devops'),
      isLoading: false,
      selectedRowKeys: [],
    }
  }

  @action
  async getActivities({ name, branch, devops, cluster, ...filters }) {
    name = decodeURIComponent(name)

    const { page } = filters
    const { limit = 10 } = this.activityList

    if (isEmpty(this.detail)) {
      await this.fetchDetail({ cluster, name, devops })
    }

    let result = await this.request.get(
      `${this.getDevopsUrlV2({
        cluster,
      })}${devops}/pipelines/${name}/runs/`,
      {
        start: (page - 1) * limit || 0,
        limit,
        branch,
      }
    )
    if (isArray(result)) {
      result = result.filter(activity => activity._links)
    }

    this.activityList = {
      limit,
      data: result.items || [],
      total: result.totalItems || 0,
      page: parseInt(page, 10) || 1,
      filters: omit(filters, 'devops'),
      isLoading: false,
      selectedRowKeys: [],
    }
  }

  @action
  async getBranchDetail(params) {
    const { devops, cluster, name, branch } = params
    try {
      const result = await this.request.get(
        `${this.getDevopsUrlV2({
          cluster,
        })}${devops}/pipelines/${name}/branches/${encodeURIComponent(branch)}/`
      )

      if (result.name) {
        this.branchDetail = result
      }
      return result
    } catch (err) {
      return []
    }
  }

  async replay(params, _runId) {
    const { devops, name, branch, runId, cluster } = params
    return await this.request.post(
      `${this.getDevopsUrlV2({
        cluster,
      })}${devops}/pipelines/${decodeURIComponent(name)}${
        branch ? `/branches/${encodeURIComponent(branch)}` : ''
      }/runs/${_runId || runId}/replay`
    )
  }

  async stop(params, _runId) {
    const { devops, name, branch, runId, cluster } = params
    return await this.request.post(
      `${this.getDevopsUrlV2({ cluster })}${devops}/pipelines/${name}${
        branch ? `/branches/${encodeURIComponent(branch)}` : ''
      }/runs/${_runId || runId}/replay/`
    )
  }

  async handleActivityReplay({ url, cluster }) {
    return await this.request.post(
      `${this.getBaseUrlV2({ cluster })}${url}/replay/`
    )
  }

  async handleActivityStop({ url, cluster }) {
    return await this.request.post(
      `${this.getBaseUrlV2({
        cluster,
      })}${url}/stop/?blocking=true&timeOutInSecs=10`
    )
  }

  async runBranch({ cluster, devops, name, branch, parameters }) {
    const href_temp = `${this.getDevopsUrlV2({
      cluster,
    })}${devops}/pipelines/${name}${
      branch ? `/branches/${encodeURIComponent(branch)}` : ''
    }/runs`

    const params = !isEmpty(parameters) ? { parameters } : { parameters: [] }

    return await this.request
      .post(href_temp, params)
      // TODO: backend return updated parameters info in run api will be better way
      .then(() => {
        // pipeline parameters not updated immediately
        setTimeout(() => {
          this.fetchDetail({ cluster, devops, name, isSilent: true })
        }, 1000)
      })
  }

  saveAsFile = (text = '', fileName = 'default.txt') => {
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' })
    saveAs(blob, fileName)
  }

  @action
  getPipeLineConfig() {
    let detail = cloneDeep(toJS(this.pipelineConfig))
    detail = { ...toJS(detail.spec), ...toJS(detail) }

    delete detail.spec
    delete detail.kind
    delete detail.apiVersion

    return detail
  }

  @action
  setDevops(devops) {
    this.devops = devops
  }

  @action
  async createPipeline({ data, devops, cluster }) {
    data.kind = 'Pipeline'
    data.apiVersion = 'devops.kubesphere.io/v1alpha3'

    const url = `${this.getDevOpsDetailUrl({
      devops,
      cluster,
    })}/pipelines`

    return await this.request.post(url, data)
  }

  @action
  async updatePipeline({ cluster, data, devops }) {
    data.kind = 'Pipeline'
    data.apiVersion = 'devops.kubesphere.io/v1alpha3'

    const url = `${this.getDevOpsDetailUrl({
      devops,
      cluster,
    })}/pipelines/${data.metadata.name}`

    const result = await this.request.put(url, data)
    this.setPipelineConfig(result)
    return result
  }

  @action
  updateJenkinsFile(jenkinsFile, params) {
    const data = cloneDeep(toJS(this.pipelineConfig))
    set(data, 'spec.pipeline.jenkinsfile', jenkinsFile)

    return this.updatePipeline({
      data,
      devops: params.devops,
      cluster: params.cluster,
    })
  }

  @action
  async delete({ name, devops, cluster }) {
    const url = `${this.getDevOpsDetailUrl({
      devops,
      cluster,
    })}/pipelines/${name}`

    return await this.request.delete(url)
  }

  @action
  async scanRepository({ devops, name, cluster }) {
    if (globals.user.crumb === undefined) {
      await this.getCrumb({ cluster })
    }
    const options = {}
    if (globals.user.crumb) {
      set(options, 'headers.Jenkins-Crumb', globals.user.crumb)
    }

    return await this.request.defaults({
      method: 'POST',
      url: `${this.getDevopsUrlV2({ cluster })}${devops ||
        this.devops}/pipelines/${name || this.detail.name}/scan`,
      options,
      handler: resp =>
        resp.text().then(() => {
          if (resp.redirected) {
            return 'Scan success'
          }
        }),
    })
  }

  async getRepoScanLogs({ devops, name, cluster }) {
    const logs = await this.request.get(
      `${this.getDevopsUrlV2({
        cluster,
      })}${devops}/pipelines/${name}/consolelog`
    )
    this.repositoryLog = logs
  }

  async checkCron(value) {
    return await this.request.get(
      `${this.getDevopsUrlV2()}check/cron?value=${value}`
    )
  }

  async checkScriptCompile({ devops, pipeline, value, cluster }) {
    return await this.request.post(
      `${this.getDevopsUrlV2({
        cluster,
      })}${devops}/pipelines/${pipeline}/checkScriptCompile`,
      {
        value,
      },
      FORM_HEAR
    )
  }

  async getBranchLists({ devops, name, workspace, cluster, ...filters }) {
    const decodeName = decodeURIComponent(name)
    const { page } = filters

    return await this.request.get(
      `${this.getDevopsUrlV2({
        cluster,
      })}${devops}/pipelines/${decodeName}/branches/`,
      {
        filter: 'origin',
        start: (page - 1) * TABLE_LIMIT || 0,
        limit: TABLE_LIMIT,
      }
    )
  }
}
