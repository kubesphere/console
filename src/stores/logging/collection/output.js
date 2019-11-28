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

import { observable, action, computed, toJS } from 'mobx'
import { get } from 'lodash'
import Base from './index'

const collectionDefaultSetting = {
  es: {
    Logstash_Format: 'On',
    Replace_Dots: 'on',
    Retry_Limit: 'False',
    Type: 'flb_type',
    Time_Key: '@timestamp',
    Logstash_Prefix: 'logstash',
    Match: 'kube.*',
  },
  kafka: {
    Match: 'kube.*',
    Brokers: null,
    Topics: null,
  },
  forward: {
    Match: 'kube.*',
  },
}

export default class outputStore extends Base {
  @observable
  outputs = []

  @observable
  isCreating = false

  @observable
  fetchError = false

  @computed
  get collections() {
    return this.outputs.map((output = {}) => {
      const parameterDict = (output.parameters || []).reduce(
        (dit, param = {}) => {
          dit[param.name] = param.value
          dit[`${param.name}_valueFrom`] = param.valueFrom
          return dit
        },
        {}
      )
      return { ...output, ...parameterDict }
    })
  }

  getCollection(collectionID) {
    return this.collections.find(({ id }) => id === collectionID)
  }

  getOutput(outputID) {
    return this.outputs.find(({ id }) => id === outputID)
  }

  get path() {
    return 'outputs'
  }

  @action
  async fetch(params = {}) {
    const response = await this.request(params, this.path)
    this.fetchError = response.status !== 200
    this.outputs = get(response, 'outputs', [])
  }

  @action
  async create(params = {}) {
    this.isCreating = true
    const defaultParams = get(collectionDefaultSetting, params.Name, {})
    const parameters = {
      ...defaultParams,
      ...params,
    }

    const newCollectionSetting = {
      type: 'fluentbit_output',
      name: `fluentbit-output-${params.Name}`,
      parameters: Object.entries(parameters)
        .filter(([, value]) => value)
        .map(([key, value]) => ({
          name: key,
          value,
        })),
    }
    await this.request(newCollectionSetting, this.path, 'post')
    this.isCreating = false
  }

  @action
  async editParameters(noop, newCollection) {
    const outputs = toJS(this.outputs)

    const preCollection = outputs.find(({ id }) => id === newCollection.id)
    if (!preCollection) {
      throw Error('500')
    }

    const newParams = Object.entries(newCollection)
      .filter(([key]) => key.match(/^[A-Z]/))
      .reduce((params, [key, value]) => {
        const [, keyForValueFrom] = key.match(/(.+?)_valueFrom$/) || []
        const paramsKey = keyForValueFrom || key
        const preValue = get(params, paramsKey, {})
        params[paramsKey] = keyForValueFrom
          ? {
              ...preValue,
              ...{
                valueFrom: value,
              },
            }
          : {
              ...preValue,
              ...{
                value,
              },
            }
        return params
      }, {})

    preCollection.parameters = Object.entries(newParams).map(
      ([key, value]) => ({
        ...{ name: key },
        ...value,
      })
    )

    const response = await this.request(
      preCollection,
      `${this.path}/${newCollection.id}`,
      'put'
    )
    if (response.status !== 200) {
      throw Error(response.status)
    }
  }

  @action
  async update(output) {
    const { updatetime, ...rest } = output

    const errorMessage = this.paramValidator(rest.parameters)

    if (errorMessage) {
      throw Error(errorMessage)
    }

    const { status } = await this.request(
      rest,
      `${this.path}/${output.id}`,
      'put'
    )
    if (status !== 200) {
      throw Error(status)
    }
  }

  @action
  async delete(collection) {
    const response = await this.request(
      {},
      `${this.path}/${collection}`,
      'delete'
    )
    if (response.status !== 200) {
      throw Error(response.status)
    }
  }

  getValueInParams(params, key) {
    return (params.find(param => param.name === key) || {}).value
  }

  paramValidator = (parameters = []) => {
    const type = this.getValueInParams(parameters, 'Name')
    if (type === 'es') {
      const username = this.getValueInParams(parameters, 'HTTP_User')
      const password = this.getValueInParams(parameters, 'HTTP_Password')
      if (username && !password) {
        return t('Please input password')
      }
      if (!username && password) {
        return t('Please input user name')
      }
    }
  }
}
