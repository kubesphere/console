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

import { omit, isArray, get, set, isEmpty } from 'lodash'
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
  constructor(props) {
    super(props)
    this.pipelineConfig = {}
  }

  module = 'pipelines'

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
  reponsitorylog = ''

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
  project_id = ''

  @observable
  devops = ''

  @action
  async fetchList({ devops, workspace, project_id, cluster, ...filters } = {}) {
    this.list.isLoading = true

    const { page, limit, keyword, filter } = filters

    const searchWord = keyword ? `*${encodeURIComponent(keyword)}*` : ''

    const url = `${this.getBaseUrlV2({ cluster })}search`
    const result = await this.request.get(
      url,
      {
        start: (page - 1) * TABLE_LIMIT || 0,
        limit: TABLE_LIMIT,
        q: `type:pipeline;organization:jenkins;pipeline:${project_id}/${searchWord ||
          '*'};excludedFromFlattening:jenkins.branch.MultiBranchProject,hudson.matrix.MatrixProject&filter=${filter ||
          'no-folders'}`,
      },
      { params: { ...filters } }
    )

    this.setProjectId(project_id)
    this.devops = devops

    this.list = {
      data: result.items || [],
      total: result.total_count,
      limit: parseInt(limit, 10) || 10,
      page: parseInt(page, 10) || 1,
      filters: omit(filters, 'project_id'),
      isLoading: false,
    }
  }

  @action
  async fetchDetail({ cluster, name, isSilent, project_id }) {
    if (!isSilent) {
      this.isLoading = true
    }

    const result = await this.request.get(
      `${this.getDevopsUrlV2({ cluster })}${project_id ||
        this.project_id}/pipelines/${decodeURIComponent(name)}/`
    )

    const devopsName = get(result, 'fullDisplayName')

    if (devopsName !== '') {
      try {
        this.devops = devopsName.split('/')[0].slice(0, -5)
      } catch {}
    }

    const resultKub = await this.request.get(
      `${this.getDevOpsDetailUrl({ devops: this.devops, cluster })}/${
        this.module
      }/${name}`
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
  async checkPipelineName({ name, cluster, project_name }) {
    return await this.request.get(
      `${this.getDevopsUrlV2({ cluster })}${project_name}/pipelines/${name}/`,
      {},
      {
        headers: { 'x-check-exist': true },
      }
    )
  }

  @action
  async getJenkinsFile({ cluster, name, project_id }) {
    this.pipelineJsonData.isLoading = true
    const decodeName = decodeURIComponent(name)

    if (isEmpty(this.detail)) {
      await this.fetchDetail({ cluster, name: decodeName, project_id })
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
        { jenkinsfile: toJS(this.jenkinsfile) },
        FORM_HEAR
      )
      return result.data
    }
  }

  @action
  async getPullRequest({ name, project_id, workspace, cluster, ...filters }) {
    const decodeName = decodeURIComponent(name)

    const { page } = filters

    if (isEmpty(this.detail)) {
      await this.fetchDetail({ name: decodeName, project_id })
    }
    const result = await this.request.get(
      `${this.getDevopsUrlV2({
        cluster,
      })}${project_id}/pipelines/${name}/branches/`,
      {
        filter: 'pull-requests',
        start: (page - 1) * TABLE_LIMIT || 0,
        limit: TABLE_LIMIT,
      }
    )
    this.pullRequestList = {
      data: result || [],
      total: this.detail.totalNumberOfPullRequests,
      limit: TABLE_LIMIT,
      page: parseInt(page, 10) || 1,
      filters: omit(filters, 'project_id'),
      isLoading: false,
      selectedRowKeys: [],
    }
  }

  @action
  async getBranches({ cluster, project_id, name, branch, ...filters }) {
    const decodeName = decodeURIComponent(name)

    const { page } = filters
    if (isEmpty(this.detail)) {
      await this.fetchDetail({ cluster, name: decodeName, project_id })
    }

    const result = await this.request.get(
      `${this.getDevopsUrlV2({
        cluster,
      })}${project_id}/pipelines/${name}/branches/`,
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
      total: this.detail.totalNumberOfBranches,
      page: parseInt(page, 10) || 1,
      filters: omit(filters, 'project_id'),
      isLoading: false,
      selectedRowKeys: [],
    }
  }

  @action
  async getActivities({ name, branch, project_id, cluster, ...filters }) {
    name = decodeURIComponent(name)

    const { page } = filters
    const { limit = 10 } = this.activityList

    if (isEmpty(this.detail)) {
      await this.fetchDetail({ cluster, name, project_id })
    }
    let result = await this.request.get(
      `${this.getDevopsUrlV2({
        cluster,
      })}${project_id}/pipelines/${name}/runs/`,
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
      total: result.total_count,
      page: parseInt(page, 10) || 1,
      filters: omit(filters, 'project_id'),
      isLoading: false,
      selectedRowKeys: [],
    }
  }

  @action
  async getBranchDetail(params) {
    const { project_id, cluster, name, branch } = params
    const result = await this.request.get(
      `${this.getDevopsUrlV2({
        cluster,
      })}${project_id}/pipelines/${name}/branches/${encodeURIComponent(
        branch
      )}/`
    )
    if (result.name) {
      this.branchDetail = result
    }

    return result
  }

  async replay(params, _runid) {
    const { project_id, name, branch, runid, cluster } = params
    return await this.request.post(
      `${this.getDevopsUrlV2({
        cluster,
      })}${project_id}/pipelines/${decodeURIComponent(name)}${
        branch ? `/branches/${encodeURIComponent(branch)}` : ''
      }/runs/${_runid || runid}/replay`
    )
  }

  async stop(params, _runid) {
    const { project_id, name, branch, runid, cluster } = params
    return await this.request.post(
      `${this.getDevopsUrlV2({ cluster })}${project_id}/pipelines/${name}${
        branch ? `/branches/${encodeURIComponent(branch)}` : ''
      }/runs/${_runid || runid}/replay/`
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

  async runBranch({ cluster, project_id, name, branch, parameters }) {
    const href_temp = `${this.getDevopsUrlV2({
      cluster,
    })}${project_id}/pipelines/${name}${
      branch ? `/branches/${encodeURIComponent(branch)}` : ''
    }/runs`

    const params = !isEmpty(parameters) ? { parameters } : {}

    return await this.request
      .post(href_temp, params)
      // TODO: backend return updated parameters info in run api will be better way
      .then(() => {
        // pipeline parameters not updated immediately
        setTimeout(() => {
          this.fetchDetail({ cluster, project_id, name, isSilent: true })
        }, 1000)
      })
  }

  saveAsFile = (text = '', fileName = 'default.txt') => {
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' })
    saveAs(blob, fileName)
  }

  @action
  getPipeLineConfig() {
    let detail = JSON.parse(JSON.stringify(this.pipelineConfig))
    detail = { ...toJS(detail.spec), ...toJS(detail) }

    delete detail.spec
    delete detail.kind
    delete detail.apiVersion

    return detail
  }

  @action
  setProjectId(project_id) {
    this.project_id = project_id
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
  async updatePipeline({ cluster, data, project_id }) {
    data.kind = 'Pipeline'
    data.apiVersion = 'devops.kubesphere.io/v1alpha3'
    const devops = this.getDevops(project_id)
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
    const data = JSON.parse(JSON.stringify(this.pipelineConfig))
    set(data, 'spec.pipeline.jenkinsfile', jenkinsFile)

    return this.updatePipeline({
      data,
      project_id: params.project_id,
      cluster: params.cluster,
    })
  }

  @action
  async deletePipeline(name, devops, cluster) {
    const url = `${this.getDevOpsDetailUrl({
      devops,
      cluster,
    })}/pipelines/${name}`

    return await this.request.delete(url)
  }

  @action
  async scanRepository({ project_id, name, cluster }) {
    if (globals.user.crumb === undefined) {
      await this.getCrumb({ cluster })
    }
    const options = {}
    if (globals.user.crumb) {
      set(options, 'headers.Jenkins-Crumb', globals.user.crumb)
    }

    return await this.request.defaults({
      method: 'POST',
      url: `${this.getDevopsUrlV2({ cluster })}${project_id ||
        this.project_id}/pipelines/${name || this.detail.name}/scan`,
      options,
      handler: resp =>
        resp.text().then(() => {
          if (resp.redirected) {
            return 'Scan success'
          }
        }),
    })
  }

  async getRepoScanLogs({ project_id, name, cluster }) {
    const logs = await this.request.get(
      `${this.getDevopsUrlV2({
        cluster,
      })}${project_id}/pipelines/${name}/consolelog`
    )
    this.reponsitorylog = logs
  }

  async checkCron(value) {
    return await this.request.get(
      `${this.getDevopsUrlV2()}check/cron?value=${value}`
    )
  }

  async checkScriptCompile({ project_id, pipeline, value, cluster }) {
    return await this.request.post(
      `${this.getDevopsUrlV2({
        cluster,
      })}${project_id}/pipelines/${pipeline}/checkScriptCompile`,
      {
        value,
      },
      FORM_HEAR
    )
  }

  async getBranchLists({ project_id, name, workspace, cluster, ...filters }) {
    const decodeName = decodeURIComponent(name)
    const { page } = filters

    return await this.request.get(
      `${this.getDevopsUrlV2({
        cluster,
      })}${project_id}/pipelines/${decodeName}/branches/`,
      {
        filter: 'origin',
        start: (page - 1) * TABLE_LIMIT || 0,
        limit: TABLE_LIMIT,
      }
    )
  }
}
