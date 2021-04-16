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

import { action, observable, computed, toJS } from 'mobx'
import { get, set, unset, isObject, isEmpty, isArray } from 'lodash'
import { Notify } from '@kube-design/components'

import CredentialStore from 'stores/devops/credential'
import BaseStore from 'stores/devops/base'

import { generateId } from 'utils'

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

export default class Store extends BaseStore {
  constructor() {
    super()
    this.credentialStore = new CredentialStore()
  }

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

  handleAddBranch(lineIndex) {
    if (this.jsonData.json.pipeline.stages[lineIndex].parallel) {
      this.jsonData.json.pipeline.stages[lineIndex].parallel.push(this.newStage)
    } else {
      this.jsonData.json.pipeline.stages[lineIndex] = {
        name: `default-${lineIndex}`,
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
    this.edittingData = data
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
    return this.request
      .post(
        `${this.getBaseUrlV2({ cluster })}/tojenkinsfile`,
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
  getCredentials = async params => {
    await this.credentialStore.fetchList({
      devops: this.params.devops,
      cluster: this.params.cluster,
      ...params,
    })
    this.credentialsList = this.credentialStore.list
  }

  @action
  createCredential = async (data, params) => {
    await this.credentialStore.handleCreate(data, params)
  }

  @action
  async handleConfirm() {
    await this.convertJsonToJenkinsFile()
  }

  @action
  async fetchLabel({ devops }) {
    const url = `${this.getDevopsUrlV2()}${devops}/jenkins/labelsdashboard/labelsData`
    const result = await this.request.get(url, {}, {}, () => {
      this.labelDataList = []
    })

    if (result && result.status === 'ok' && isArray(result.data)) {
      const labelDataList = result.data.map(item => {
        return { label: item.label, value: item.label }
      })
      this.labelDataList = labelDataList
    } else {
      this.labelDataList = []
    }
  }
}
