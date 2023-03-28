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

import { saveAs } from 'file-saver'
import { cloneDeep, get, isArray, isEmpty, omit, set } from 'lodash'
import { action, observable, toJS } from 'mobx'
import { safeParseJSON } from 'utils'
import cookie from 'utils/cookie'
import BaseStore from '../devops'

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
  isSubmitting = false

  @observable
  pipelineJsonData = {
    pipelineJson: {},
    isLoading: true,
  }

  @observable
  branchDetail = {}

  @observable
  jenkinsFile = ''

  @observable
  devops = ''

  @observable
  devopsName = ''

  getPipelineUrl({ cluster, devops, name }) {
    return `${this.getDevopsUrlV2({
      cluster,
      devops: devops || this.devops,
    })}pipelines/${decodeURIComponent(name)}/`
  }

  @action
  async fetchList({
    devops,
    workspace,
    devopsName,
    silent,
    cluster,
    ...filters
  } = {}) {
    if (!silent) {
      this.list.isLoading = true
    }

    const { page, limit, name, filter, type, ascending } = filters
    const nameKey = name ? `${encodeURIComponent(name)}` : undefined
    const url = `${this.getBaseUrl({ cluster, devops })}pipelines`

    const result = await request.get(
      url,
      {
        page: page || 1,
        limit: limit || 10,
        name: nameKey,
        filter: filter || undefined,
        type: type || undefined,
        ascending,
      },
      { params: { ...filters } }
    )

    const data = (result.items ?? [])
      .filter(({ metadata }) => !metadata.deletionTimestamp)
      .map(item => ({ ...this.mapper(item) }))

    this.setDevops(devops)
    this.devopsName = devopsName

    this.list = {
      data: data || [],
      total: result.totalItems || 0,
      limit: parseInt(limit, 10) || 10,
      page: parseInt(page, 10) || 1,
      filters: omit(filters, 'devops', 'ascending'),
      selectedRowKeys: [],
      isLoading: false,
    }
  }

  @action
  async fetchDetail({ cluster, name, isSilent, devops }) {
    if (!isSilent) {
      this.isLoading = true
    }

    const resultKub = await request.get(
      `${this.getBaseUrl({ devops, cluster })}${this.module}/${name}`
    )

    const result = this.mapper(resultKub)

    this.setPipelineConfig(resultKub)
    this.detail = result
    this.isLoading = false
    return result
  }

  async fetchDetailUntilEditModeNull({ cluster, name, devops }) {
    return new Promise((resolve, reject) => {
      const timerOut = setTimeout(() => {
        clearTimeout(this.timer)
        clearTimeout(timerOut)
        reject(t('CONNECTION_TIMEOUT'))
      }, 60000)
      const getFn = async () => {
        const resultKub = await request.get(
          `${this.getBaseUrl({ devops, cluster })}${this.module}/${name}`
        )
        const result = this.mapper(resultKub)
        clearTimeout(this.timer)
        if (
          get(
            result,
            "annotations['pipeline.devops.kubesphere.io/jenkinsfile.edit.mode']"
          )
        ) {
          this.timer = setTimeout(getFn, 1000)
        } else {
          clearTimeout(timerOut)
          resolve(result)
        }
      }
      getFn()
    })
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
    return await request.get(
      this.getPipelineUrl({ cluster, name, devops }),
      {},
      {
        headers: { 'x-check-exist': true },
      }
    )
  }

  @action
  async getJenkinsFile({ cluster, name, devops }, isRefresh = false) {
    this.pipelineJsonData.isLoading = true

    isRefresh && (await this.fetchDetail({ cluster, name, devops }))
    this.jenkinsFile = get(this.pipelineConfig, 'spec.pipeline.jenkinsfile', '')
    const json = get(
      this.pipelineConfig,
      `metadata.annotations['pipeline.devops.kubesphere.io/jenkinsfile']`
    )

    this.pipelineJsonData = {
      pipelineJson: json ? { json: JSON.parse(json) } : undefined,
      isLoading: false,
    }
  }

  submitting = promise => {
    this.isSubmitting = true
    return promise
  }

  @action
  setPipelineJsonData(json) {
    this.pipelineJsonData = {
      pipelineJson: json ? { json: JSON.parse(json) } : undefined,
      isLoading: false,
    }
  }
  // @action
  // async convertJenkinsFileToJson(jenkinsFile, cluster) {
  //   if (jenkinsFile) {
  //     const result = await request.post(
  //       `${this.getDevopsUrlV2({ cluster })}tojson`,
  //       { jenkinsfile: jenkinsFile },
  //       FORM_HEAR
  //     )
  //     return result.data
  //   }
  // }

  @action
  async convertJenkinsFileToJson(
    jenkinsFile,
    cluster,
    devops,
    name,
    withLoading
  ) {
    if (withLoading) {
      this.isSubmitting = true
    }
    await request.put(
      `/kapis/devops.kubesphere.io/v1alpha3/devops/${devops}/pipelines/${name}/jenkinsfile?mode=raw`,
      { data: jenkinsFile },
      {
        headers: {
          'content-type': 'application/json',
        },
      }
    )
    let mode = 'raw'
    let jsonData
    try {
      // const res = store.mapper(item)
      const res = await this.fetchDetailUntilEditModeNull({
        cluster,
        devops,
        name,
      })
      jsonData = get(
        res,
        'annotations["pipeline.devops.kubesphere.io/jenkinsfile"]'
      )
      mode = ''
    } catch (e) {
      mode = 'raw'
      jsonData = undefined
    } finally {
      if (withLoading) {
        this.isSubmitting = false
      }
    }

    return {
      mode,
      jsonData,
    }
  }

  @action
  async getPullRequest({ name, devops, workspace, cluster, ...filters }) {
    const decodeName = decodeURIComponent(name)

    const { page, limit = 10 } = filters

    if (isEmpty(this.detail)) {
      await this.fetchDetail({ name: decodeName, devops })
    }

    const result = await request.get(
      `${this.getBaseUrl({
        cluster,
        namespace: devops,
      })}pipelines/${decodeURIComponent(name)}/branches`,
      {
        filter: 'pull-requests',
        page: page || 1,
        limit,
      }
    )

    Array.isArray(result.items) &&
      result.items.forEach(item => {
        item.id = item.latestRun.endTime
      })

    this.pullRequestList = {
      data: result.items || [],
      total: result.totalItems || 0,
      limit,
      page: parseInt(page, 10) || 1,
      filters: omit(filters, 'devops'),
      isLoading: false,
      selectedRowKeys: [],
    }
  }

  @action
  async getBranches({ cluster, devops, name, branch, ...filters }) {
    const decodeName = decodeURIComponent(name)

    const { page, limit = 10 } = filters
    if (isEmpty(this.detail)) {
      await this.fetchDetail({ cluster, name: decodeName, devops })
    }

    const result = await request.get(
      `${this.getBaseUrl({
        cluster,
        namespace: devops,
      })}pipelines/${decodeURIComponent(name)}/branches`,
      {
        filter: 'origin',
        page: page || 1,
        limit,
        branch: encodeURIComponent(branch),
      }
    )

    this.branchList = {
      data: result.items || [],
      limit,
      total: result.totalItems || 0,
      page: parseInt(page, 10) || 1,
      filters: omit(filters, 'devops'),
      isLoading: false,
      selectedRowKeys: [],
    }
  }

  @action
  async getActivities({
    name,
    branch,
    devops,
    cluster,
    backward = false,
    ...filters
  }) {
    name = decodeURIComponent(name)

    const { page, limit = 10 } = filters

    if (isEmpty(this.detail)) {
      await this.fetchDetail({ cluster, name, devops })
    }

    const params = {
      page: page || 1,
      limit,
      branch,
      backward,
    }

    if (page < 0) {
      delete params.page
      delete params.limit
    }

    let result = await request.get(
      `${this.getBaseUrl({
        cluster,
        namespace: devops,
      })}pipelines/${name}/pipelineruns`,
      {
        ...params,
      }
    )

    if (isArray(result)) {
      result = result.filter(activity => activity._links)
    }

    if (backward === false && !isEmpty(result) && isArray(result.items)) {
      result.items = result.items.map(item => {
        const res = safeParseJSON(
          get(
            item,
            "metadata.annotations.['devops.kubesphere.io/jenkins-pipelinerun-status']"
          ),
          {}
        )
        return {
          ...res,
          id:
            res.id ??
            get(
              item,
              'metadata.annotations["devops.kubesphere.io/jenkins-pipelinerun-id"]'
            ),
          uid: item.metadata.uid,
          _originData: item,
        }
      })
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
    return result.items
  }

  @action
  async getBranchDetail(params) {
    const { devops, cluster, name, branch } = params
    try {
      const result = await request.get(
        `${this.getBaseUrl({
          cluster,

          namespace: devops,
        })}pipelines/${decodeURIComponent(name)}/branches/${encodeURIComponent(
          branch
        )}`
      )

      if (result.name) {
        this.branchDetail = result
      }
      return result
    } catch (err) {
      return []
    }
  }

  async handleActivityReplay({ url, devops, name, cluster }) {
    return await request.post(
      `${this.getPipelineUrl({ cluster, devops, name })}${url}/replay/`
    )
  }

  async handleActivityStop({ url, devops, name, cluster }) {
    return await request.post(
      `${this.getPipelineUrl({
        cluster,
        devops,
        name,
      })}${url}/stop/?blocking=true&timeOutInSecs=10`
    )
  }

  async runBranch({ cluster, devops, name, branch, parameters }) {
    const href_temp = `${this.getBaseUrl({
      cluster,
      namespace: devops,
    })}pipelines/${name}/pipelineruns${
      branch ? `?branch=${encodeURIComponent(branch)}` : ''
    }`

    const body = !isEmpty(parameters) ? { parameters } : { parameters: [] }

    return await request
      .post(href_temp, body)
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

    const url = `${this.getBaseUrl({
      devops,
      cluster,
    })}pipelines`

    return await request.post(url, data)
  }

  @action
  async updatePipeline({ cluster, data, devops }) {
    data.kind = 'Pipeline'
    data.apiVersion = 'devops.kubesphere.io/v1alpha3'

    const url = `${this.getBaseUrl({
      devops,
      cluster,
    })}pipelines/${data.metadata.name}`

    const result = await request.put(url, data)
    this.setPipelineConfig(result)
    return result
  }

  @action
  updateJenkinsFile(jenkinsFile) {
    const data = cloneDeep(toJS(this.pipelineConfig))
    set(data, 'spec.pipeline.jenkinsfile', jenkinsFile)
    this.setPipelineConfig(data)
  }

  @action
  async delete({ name, devops, cluster }) {
    const url = `${this.getBaseUrl({
      devops,
      cluster,
    })}pipelines/${name}`

    return await request.delete(url)
  }

  @action
  async scanRepository({ devops, name, cluster }) {
    const options = {}

    return await request.defaults({
      method: 'POST',
      url: `${this.getPipelineUrl({
        cluster,
        devops: devops || this.devops,
        name: name || this.detail.name,
      })}scan`,
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
    const logs = await request.get(
      `${this.getPipelineUrl({ cluster, name, devops })}consolelog`
    )
    this.repositoryLog = logs
  }

  async checkCron(value) {
    return await request.get(
      `${this.getDevopsUrlV2()}check/cron?value=${value}`
    )
  }

  async checkScriptCompile(
    { devops, pipeline, value, cluster },
    failureHandler
  ) {
    return request.post(
      `${this.getPipelineUrl({
        cluster,
        name: pipeline,
        devops,
      })}checkScriptCompile`,
      {
        value,
      },
      FORM_HEAR,
      failureHandler
    )
  }

  async getBranchLists({ devops, name, workspace, cluster, ...filters }) {
    const { page, limit = 10 } = filters

    return await request.get(
      `${this.getPipelineUrl({ cluster, name, devops })}branches/`,
      {
        filter: 'origin',
        start: (page - 1) * limit || 0,
        limit,
      }
    )
  }

  async getPipelineTemplateList() {
    const lang = cookie('lang') === 'zh' ? 'ZH' : 'EN'

    const data = await request.get(
      `${this.getBaseUrl()}clustertemplates?limit=100`
    )
    const { items = [] } = data

    const templateList = items.map(item => {
      const template = {}
      const annotations = get(item, 'metadata.annotations', {})
      const imageUrl = annotations[`devops.kubesphere.io/icon`]

      template.type = item.metadata.name
      template.desc =
        annotations[`devops.kubesphere.io/description${lang}`] ||
        annotations['devops.kubesphere.io/descriptionEN']
      template.title =
        annotations[`devops.kubesphere.io/displayName${lang}`] ||
        annotations['devops.kubesphere.io/displayNameEN'] ||
        annotations.displayNameEN

      template.image =
        imageUrl && imageUrl.indexOf('http') > -1
          ? imageUrl
          : `/assets/pipeline/${imageUrl}`

      template.parameters = get(item, 'spec.parameters', [])
      return template
    })

    return templateList
  }

  async getTempleJenkins(clustertemplate, params) {
    const data = await request.post(
      `${this.getBaseUrl()}clustertemplates/${clustertemplate}/render`,
      params
    )

    const jenkins = get(
      data,
      'metadata.annotations["devops.kubesphere.io/render-result"]',
      ''
    )

    return jenkins
  }
}
