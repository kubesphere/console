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
import { get, set, unset, isObject, isEmpty, isArray, cloneDeep } from 'lodash'

import CredentialStore from 'stores/devops/credential'
import BaseStore from 'stores/devops'
import CDStore from 'stores/cd'

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
  credentialStore = new CredentialStore()

  cdStore = new CDStore()

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
  async saveJenkinsFile({ devops, name }) {
    return request
      .put(
        `${this.getDevopsUrlV3({
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
  async fetchLabel({ devops, cluster }) {
    const url = `${this.getDevopsUrlV2({
      cluster,
      devops,
    })}jenkins/labelsdashboard/labelsData`

    const result = await request.get(url, {}, {}, () => {
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
