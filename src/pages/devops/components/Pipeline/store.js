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

import { Notify } from '@kube-design/components'
import { cloneDeep, get, isArray, isEmpty, isObject, set, unset } from 'lodash'
import { action, computed, observable, toJS } from 'mobx'
import qs from 'qs'
import CDStore from 'stores/cd'
import BaseStore from 'stores/devops'

import CredentialStore from 'stores/devops/credential'
import PipelineStore from 'stores/devops/pipelines'

import { generateId, safeParseJSON } from 'utils'
import { CREDENTIAL_DISPLAY_KEY } from 'utils/constants'

import cookie from 'utils/cookie'

const formatPipeLineJson = json => {
  if (!get(json, 'pipeline.stages')) return
  json.pipeline.stages = json.pipeline.stages.map(stage => {
    if (stage.parallel) {
      stage.parallel = stage.parallel.map(_stage => {
        unset(_stage, 'branches[0].id')
        delete _stage.error
        delete _stage.conditionError
        delete _stage.isActive
        return _stage
      })
      return stage
    }
    unset(stage, 'branches[0].id')
    delete stage.error
    delete stage.conditionError
    delete stage.isActive
    return stage
  })

  if (isObject(json.pipeline.parameters) && isEmpty(json.pipeline.parameters)) {
    delete json.pipeline.parameters
  } else {
    const parameters = get(json, 'pipeline.parameters.parameters', [])
    if (!isEmpty(parameters) && isArray(parameters)) {
      parameters.forEach(item => {
        const args = get(item, 'arguments', [])
        if (!isEmpty(parameters) && isArray(args)) {
          args.forEach(arg => {
            const value = get(arg, 'value.value')
            if (!value && arg.key) {
              set(arg, 'value.value', '')
            }
          })
        }
      })
    }
  }

  return json
}

const formatStepTemplate = data => {
  const lang = cookie('lang') === 'zh' ? 'ZH' : 'EN'
  const template = {}
  const annotations = get(data, 'metadata.annotations', {})

  template.icon = annotations['step.devops.kubesphere.io/icon']
  template.category = get(data, [
    'metadata',
    'labels',
    'step.devops.kubesphere.io/category',
  ])
  template.name = data.metadata.name
  template.desc =
    annotations[`devops.kubesphere.io/description${lang}`] ||
    annotations['devops.kubesphere.io/descriptionEN']
  template.title =
    annotations[`devops.kubesphere.io/displayName${lang}`] ||
    annotations['devops.kubesphere.io/displayNameEN'] ||
    annotations.displayNameEN

  template.parameters = get(data, 'spec.parameters', []).map(p => {
    return {
      ...p,
      ...(p.options
        ? {
            options: safeParseJSON(p.options, []).map(opt => ({
              label: t(opt.label),
              value: opt.value,
            })),
          }
        : {}),
    }
  })

  if (!isEmpty(get(data, 'spec.secret', {}))) {
    const secretType =
      CREDENTIAL_DISPLAY_KEY[data.spec.secret.type?.split('/')[1]]
    template.parameters.push({
      name: 'secret',
      type: 'secret',
      display: 'Secret',
      postByQuery: true,
      required: true,
      secretType,
    })
  }
  return template
}

export default class Store extends BaseStore {
  credentialStore = new CredentialStore()

  cdStore = new CDStore()

  pipelineStore = new PipelineStore()

  get newStage() {
    return {
      branches: [
        {
          id: String(Math.random()),
          name: '',
          steps: [],
        },
      ],
      agent: { type: 'none' },
      name: `stage-${generateId(5)}`,
    }
  }

  @computed
  get stages() {
    return get(this.jsonData, 'json.pipeline.stages', [])
  }

  @computed
  get activeStage() {
    if (this.activeLineIndex === '') {
      return ''
    }
    if (!this.stages[this.activeLineIndex]) {
      return ''
    }
    if (!this.stages[this.activeLineIndex].parallel) {
      return this.stages[this.activeLineIndex]
    }
    return this.stages[this.activeLineIndex].parallel[this.activeColumnIndex]
  }

  @observable
  jsonData = {}

  @observable
  activeLineIndex = ''

  @observable
  activeColumnIndex = ''

  @observable
  isAddingStep = false

  @observable
  edittingData = {}

  @observable
  params = {}

  @observable
  labelDataList = []

  @observable
  credentialsList = { data: [] }

  @observable
  cdList = { data: [] }

  @observable
  pipelineList = { data: [] }

  @observable
  pipelineSteps = []

  handleAddBranch(lineIndex) {
    if (this.jsonData.json.pipeline.stages[lineIndex].parallel) {
      this.jsonData.json.pipeline.stages[lineIndex].parallel.push(this.newStage)
    } else {
      this.jsonData.json.pipeline.stages[lineIndex] = {
        name: generateId(6),
        parallel: [
          this.jsonData.json.pipeline.stages[lineIndex],
          this.newStage,
        ],
      }
    }
    this.handleSetInLocalStorage()
  }

  handleSetInLocalStorage() {
    const { devops, name } = this.params
    this.prevData = localStorage.setItem(
      `${globals.user.username}-${devops}-${name}`,
      JSON.stringify(toJS(this.jsonData))
    )
  }

  @action
  setData(data) {
    this.jsonData = data
    formatPipeLineJson(this.jsonData.json)
  }

  @action
  insertColumn(index) {
    this.jsonData.json.pipeline.stages.splice(index, 0, this.newStage)
  }

  @action
  setFocus(lineIndex, columnIndex) {
    if (this.activeLineIndex !== '') {
      this.setActive(this.activeLineIndex, this.activeColumnIndex, undefined)
    }
    this.activeLineIndex = lineIndex
    this.activeColumnIndex = columnIndex
    this.setActive(lineIndex, columnIndex, true)
  }

  @action
  setActive(lineIndex, columnIndex, value) {
    if (
      this.jsonData.json.pipeline.stages[lineIndex] &&
      this.jsonData.json.pipeline.stages[lineIndex].parallel
    ) {
      this.jsonData.json.pipeline.stages[lineIndex].parallel[columnIndex] = {
        ...this.jsonData.json.pipeline.stages[lineIndex].parallel[columnIndex],
        ...{ isActive: value },
      }
    } else {
      this.jsonData.json.pipeline.stages[lineIndex] = {
        ...this.jsonData.json.pipeline.stages[lineIndex],
        ...{ isActive: value },
      }
    }
  }

  @action
  setEdittingData(data) {
    this.edittingData = cloneDeep(data)
  }

  isPassWordCredentials(type) {
    return type === 'username_password'
  }

  isKubeconfigCredentials(type) {
    return type === 'kubeconfig'
  }

  @action
  clearFocus() {
    if (this.activeLineIndex !== '') {
      this.setActive(this.activeLineIndex, this.activeColumnIndex, undefined)
    }
    this.activeLineIndex = ''
    this.activeColumnIndex = ''
    this.edittingData = {}
    this.isAddingStep = false
  }

  @action
  deleteStage() {
    if (this.jsonData.json.pipeline.stages[this.activeLineIndex].parallel) {
      if (
        this.jsonData.json.pipeline.stages[this.activeLineIndex].parallel
          .length === 1
      ) {
        this.jsonData.json.pipeline.stages.splice(this.activeLineIndex, 1)
      } else if (
        // delete parallel word
        this.jsonData.json.pipeline.stages[this.activeLineIndex].parallel
          .length === 2
      ) {
        this.jsonData.json.pipeline.stages[
          this.activeLineIndex
        ].parallel.splice(this.activeColumnIndex, 1)
        this.jsonData.json.pipeline.stages[
          this.activeLineIndex
        ] = this.jsonData.json.pipeline.stages[this.activeLineIndex].parallel[0]
      } else {
        this.jsonData.json.pipeline.stages[
          this.activeLineIndex
        ].parallel.splice(this.activeColumnIndex, 1)
      }
    } else {
      this.jsonData.json.pipeline.stages.splice(this.activeLineIndex, 1)
    }
    this.activeLineIndex = ''
    this.activeColumnIndex = ''
    this.handleSetInLocalStorage()
  }

  @action
  setValue(stage) {
    if (this.jsonData.json.pipeline.stages[this.activeLineIndex].parallel) {
      this.jsonData.json.pipeline.stages[this.activeLineIndex].parallel.splice(
        this.activeColumnIndex,
        1,
        stage
      )
    } else {
      this.jsonData.json.pipeline.stages.splice(this.activeLineIndex, 1, stage)
    }
    this.handleSetInLocalStorage()
  }

  @action
  async convertJsonToJenkinsFile({ cluster }) {
    return request
      .post(
        `${this.getDevopsUrlV2({ cluster })}/tojenkinsfile`,
        {
          json: JSON.stringify(formatPipeLineJson(toJS(this.jsonData.json))),
        },
        {
          headers: {
            'content-type': 'application/x-www-form-urlencoded',
          },
        }
      )
      .then(result => {
        if (result && get(result, 'data.result') === 'success') {
          this.jenkinsFile = result.data.jenkinsfile
          return result
        }

        if (result && get(result, 'data.result') === 'failure') {
          result.data.errors.forEach(error => {
            if (!error.location) {
              // no location show full screen message
              window.onunhandledrejection({
                status: 'Failure',
                reason: t('pipeline syntax error'),
                message: error.error || JSON.stringify(error),
              })
              return
            }

            const loacationArr = error.location.join('.').split('.branches')
            const errorObj = get(this.jsonData.json, loacationArr[0])

            if (errorObj && !isEmpty(errorObj)) {
              const errorStepIndex =
                error.location.indexOf('steps') !== -1
                  ? parseInt(
                      error.location[error.location.indexOf('steps') + 1],
                      10
                    )
                  : undefined
              if (errorStepIndex !== undefined) {
                set(this.jsonData.json, loacationArr[0], {
                  ...toJS(get(this.jsonData.json, loacationArr[0])),
                  error: { error: error.error, index: errorStepIndex },
                })
                return
              }

              Notify.error({
                title: t('pipeline syntax error'),
                content: t(error.error),
                duration: 6000,
              })
              return
            }

            if (error.location.indexOf('conditions') !== -1) {
              const conditionLoacationArr = error.location
                .join('.')
                .split('.when')
              const errorStepIndex =
                error.location.indexOf('conditions') !== -1
                  ? parseInt(
                      error.location[error.location.indexOf('conditions') + 1],
                      10
                    )
                  : undefined

              set(this.jsonData.json, conditionLoacationArr[0], {
                ...toJS(get(this.jsonData.json, conditionLoacationArr[0])),
                conditionError: { error: error.error, index: errorStepIndex },
              })
              return
            }

            const errorStepIndex =
              error.location.indexOf('steps') !== -1
                ? parseInt(
                    error.location[error.location.indexOf('steps') + 1],
                    10
                  )
                : undefined
            set(this.jsonData.json, loacationArr[0], {
              ...toJS(get(this.jsonData.json, loacationArr[0])),
              error: { error: error.error, index: errorStepIndex },
            })
          })
        }
      })
  }

  @action
  async saveJenkinsFile({ devops, name, cluster }) {
    return request
      .put(
        `${this.getDevopsUrlV3({
          cluster,
          devops,
        })}/pipelines/${name}/jenkinsfile?mode=json`,
        { data: JSON.stringify(formatPipeLineJson(toJS(this.jsonData.json))) },
        {
          headers: {
            'content-type': 'application/json',
          },
        }
      )
      .then(({ result }) => {
        if (result === 'success') {
          this.jenkinsFile = JSON.stringify(
            formatPipeLineJson(toJS(this.jsonData.json))
          )
          return this.jenkinsFile
        }
      })
  }

  @action
  getCredentials = async params => {
    await this.credentialStore.fetchList({
      devops: this.params.devops,
      cluster: this.params.cluster,
      ...params,
    })
    this.credentialsList = this.credentialStore.list
  }

  @action
  getPipelines = async params => {
    await this.pipelineStore.fetchList({
      devops: this.params.devops,
      cluster: this.params.cluster,
      filter: 'no-folders',
      ...params,
    })
    this.pipelineList = this.pipelineStore.list
  }

  @action
  getCDListData = async params => {
    await this.cdStore.fetchList({
      devops: this.params.devops,
      cluster: this.params.cluster,
      ...params,
    })
    this.cdList = this.cdStore.list
  }

  @action
  createCredential = async (data, params) => {
    await this.credentialStore.handleCreate(data, params)
  }

  @action
  async handleConfirm() {
    await this.saveJenkinsFile()
  }

  @action
  async handleConfirmOld() {
    await this.convertJsonToJenkinsFile()
  }

  @action
  async fetchLabel() {
    const url = `${this.getDevopsUrlV3()}ci/nodelabels`
    this.labelDataList = []
    const result = await request.get(url, {}, {}, () => null)

    if (result && result.status === 'success' && isArray(result.data)) {
      this.labelDataList = result.data.map(item => ({
        label: item,
        value: item,
      }))
    }
  }

  @action
  async fetchPipelineStepTemplates() {
    const data = await request.get(
      `${this.getBaseUrl()}clustersteptemplates?limit=100`
    )

    const { items = [] } = data
    const templateList = items.map(formatStepTemplate)

    this.pipelineSteps = templateList
    return templateList
  }

  @action
  async fetchStepTemplate(clustersteptemplate) {
    const data = await request.get(
      `${this.getBaseUrl()}clustersteptemplates/${clustersteptemplate}`
    )
    return formatStepTemplate(data)
  }

  async getPipelineStepTempleJenkins(clustersteptemplate, params, query = {}) {
    const data = await request.post(
      `${this.getBaseUrl()}clustersteptemplates/${clustersteptemplate}/render?${qs.stringify(
        query
      )}`,
      params
    )

    const jenkins = get(data, 'data', '')

    return jenkins
  }
}
