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

const URL_PREFIX = 'kapis/devops.kubesphere.io/v1alpha2/devops/'

const TABLE_LIMIT = 10

const FORM_HEADR = {
  headers: {
    'content-type': 'application/x-www-form-urlencoded',
  },
}

const getPipelineName = configData =>
  get(configData, 'pipeline.name', '') ||
  get(configData, 'multi_branch_pipeline.name', '')

export default class PipelineStore extends BaseStore {
  constructor(props) {
    super(props)
    this.pipelineConfig = {}
  }
  @observable
  project_id = ''
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
    limit: 30,
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

  @action
  async fetchList({ project_id, workspace, ...filters } = {}) {
    this.list.isLoading = true
    const { page, keyword, filter } = filters

    const searchWord = keyword ? `*${encodeURIComponent(keyword)}*` : ''

    const result = await this.request.get(
      'kapis/devops.kubesphere.io/v1alpha2/search',
      {
        q: `type:pipeline;organization:jenkins;pipeline:${project_id}%2F${searchWord ||
          '*'};excludedFromFlattening:jenkins.branch.MultiBranchProject,hudson.matrix.MatrixProject&filter=${filter ||
          'no-folders'}`,
        start: (page - 1) * TABLE_LIMIT || 0,
        limit: TABLE_LIMIT,
      }
    )

    this.list = {
      data: result.items || [],
      total: result.total_count,
      limit: 10,
      page: parseInt(page, 10) || 1,
      filters: omit(filters, 'project_id'),
      isLoading: false,
    }
  }

  @action
  async fetchDetail({ name, project_id, isSilent }) {
    if (!isSilent) {
      this.isLoading = true
    }

    const result = await this.request.get(
      `${URL_PREFIX}${project_id}/pipelines/${decodeURIComponent(name)}/`
    )

    this.detail = result
    this.isLoading = false
    return result
  }

  @action
  async checkPipelineName({ name, project_id }) {
    return await this.request.get(
      `${URL_PREFIX}${project_id}/pipelines/${name}/`,
      {},
      {
        headers: { 'x-check-exist': true },
      }
    )
  }

  @action
  async getJenkinsFile({ name, project_id }) {
    this.pipelineJsonData.isLoading = true
    name = decodeURIComponent(name)
    if (isEmpty(this.detail)) {
      await this.fetchDetail({ name, project_id })
    }
    const result = await this.request.get(
      `kapis/devops.kubesphere.io/v1alpha2/devops/${project_id}/pipelines/${
        this.detail.name
      }/config`
    )
    this.jenkinsfile = get(result, 'pipeline.jenkinsfile', '')
    this.pipelineConfig = result
    const json = await this.convertJenkinsFileToJson(toJS(this.jenkinsfile))
    this.pipelineJsonData = {
      pipelineJson: json,
      isLoading: false,
    }
  }

  @action
  async convertJenkinsFileToJson(jenkinsfile) {
    if (jenkinsfile) {
      const result = await this.request.post(
        `kapis/devops.kubesphere.io/v1alpha2/tojson`,
        { jenkinsfile: toJS(this.jenkinsfile) },
        FORM_HEADR
      )
      return result.data
    }
  }

  @action
  async getPullRequest({ name, project_id, workspace, ...filters }) {
    name = decodeURIComponent(name)

    const { page } = filters

    if (isEmpty(this.detail)) {
      await this.fetchDetail({ name, project_id })
    }
    const result = await this.request.get(
      `${URL_PREFIX}${project_id}/pipelines/${name}/branches/`,
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
  async getBranches({ project_id, name, branch, workspace, ...filters }) {
    name = decodeURIComponent(name)

    const { page } = filters

    if (isEmpty(this.detail)) {
      await this.fetchDetail({ name, project_id })
    }

    const result = await this.request.get(
      `${URL_PREFIX}${project_id}/pipelines/${name}/branches/`,
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
  async getActivities({ name, branch, project_id, workspace, ...filters }) {
    name = decodeURIComponent(name)

    const { page } = filters
    const { limit = 10 } = this.activityList

    if (isEmpty(this.detail)) {
      await this.fetchDetail({ name, project_id })
    }
    let result = await this.request.get(
      `${URL_PREFIX}${project_id}/pipelines/${name}/runs/`,
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
    const { project_id, name, branch } = params

    return await this.request
      .get(
        `${URL_PREFIX}${project_id}/pipelines/${name}/branches/${encodeURIComponent(
          branch
        )}/`
      )
      .then(result => {
        if (result.name) {
          this.branchDetail = result
        }
        return result
      })
  }

  async replay(params, _runid) {
    const { project_id, name, branch, runid } = params
    return await this.request.post(
      `${URL_PREFIX}${project_id}/pipelines/${decodeURIComponent(name)}${
        branch ? `/branches/${encodeURIComponent(branch)}` : ''
      }/runs/${_runid || runid}/replay`
    )
  }

  async stop(params, _runid) {
    const { project_id, name, branch, runid } = params
    return await this.request.post(
      `${URL_PREFIX}${project_id}/pipelines/${name}${
        branch ? `/branches/${encodeURIComponent(branch)}` : ''
      }/runs/${_runid || runid}/replay/`
    )
  }

  async handleActivityReplay(href) {
    return await this.request.post(
      `kapis/devops.kubesphere.io/v1alpha2/${href}/replay/`
    )
  }

  async handleActivityStop(href) {
    return await this.request.post(
      `kapis/devops.kubesphere.io/v1alpha2/${href}/stop/?blocking=true&timeOutInSecs=10`
    )
  }

  async runBranch({ project_id, name, branch, parameters }) {
    const href_temp = `${URL_PREFIX}${project_id}/pipelines/${name}${
      branch ? `/branches/${encodeURIComponent(branch)}` : ''
    }/runs`
    return await this.request
      .post(href_temp, !isEmpty(parameters) ? { parameters } : {})
      // TODO: backend return updated parameters info in run api will be better way
      .then(() => {
        // pipeline parameters not updated immediately
        setTimeout(() => {
          this.fetchDetail({ project_id, name, isSilent: true })
        }, 1000)
      })
  }

  saveAsFile = (text = '', fileName = 'default.txt') => {
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' })
    saveAs(blob, fileName)
  }

  @action
  async getPipeLineConfig(pipeline_id, { project_id }) {
    return await this.request.get(
      `kapis/devops.kubesphere.io/v1alpha2/devops/${project_id}/pipelines/${pipeline_id}/config`
    )
  }

  @action
  async createPipeline(data) {
    return await this.request.post(
      `kapis/devops.kubesphere.io/v1alpha2/devops/${data.project_id}/pipelines`,
      data
    )
  }

  @action
  async updatePipeline(data, { project_id }) {
    return await this.request.put(
      `kapis/devops.kubesphere.io/v1alpha2/devops/${project_id}/pipelines/${getPipelineName(
        data
      )}`,
      data
    )
  }

  @action
  updateJenkinsFile(jenkinsFile, params) {
    this.pipelineConfig.pipeline.jenkinsfile = jenkinsFile
    return this.updatePipeline(this.pipelineConfig, params)
  }

  @action
  async deletePipeline(pipelineId, project_id) {
    return await this.request.delete(
      `kapis/devops.kubesphere.io/v1alpha2/devops/${project_id}/pipelines/${pipelineId}`
    )
  }

  @action
  async scanRepository({ project_id, name }) {
    if (globals.user.crumb === undefined) {
      await this.getCrumb()
    }
    const options = {}
    if (globals.user.crumb) {
      set(options, 'headers.Jenkins-Crumb', globals.user.crumb)
    }

    return await this.request.defaults({
      method: 'POST',
      url: `kapis/devops.kubesphere.io/v1alpha2/devops/${project_id ||
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

  async getRepoScanLogs({ project_id, name }) {
    const logs = await this.request.get(
      `kapis/devops.kubesphere.io/v1alpha2/devops/${project_id}/pipelines/${name}/consolelog`
    )
    this.reponsitorylog = logs
  }

  async checkCron(value) {
    return await this.request.get(`${URL_PREFIX}check/cron?value=${value}`)
  }

  async checkScriptCompile({ project_id, pipeline, value }) {
    return await this.request.post(
      `${URL_PREFIX}/${project_id}/pipelines/${pipeline}/checkScriptCompile`,
      {
        value,
      },
      FORM_HEADR
    )
  }

  async getBranchLists({ project_id, name, workspace, ...filters }) {
    name = decodeURIComponent(name)
    const { page } = filters

    return await this.request.get(
      `${URL_PREFIX}${project_id}/pipelines/${name}/branches/`,
      {
        filter: 'origin',
        start: (page - 1) * 100 || 0,
        limit: 100,
      }
    )
  }
}
