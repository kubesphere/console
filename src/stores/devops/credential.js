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

import { set, get, isEmpty, isObject } from 'lodash'
import { action, observable } from 'mobx'
import {
  CREDENTIAL_KEY,
  CREDENTIAL_DISPLAY_KEY,
  API_VERSIONS,
} from 'utils/constants'

import FORM_TEMPLATES from 'utils/form.templates'
import BaseStore from './base'

const TABLE_LIMIT = 10

export default class CredentialStore extends BaseStore {
  module = 'secrets'

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
  detail = {}

  @observable
  usage = {}

  @observable
  params = {}

  @action
  setParams(params) {
    this.params = params
  }

  get apiVersion() {
    return API_VERSIONS.devops
  }

  getResourceUrl = (params = {}) => {
    const path = `${this.apiVersion}${this.getPath(params)}/devops/${
      params.devops
    }/credentials`

    return params.name ? `${path}/${params.name}` : path
  }

  @action
  async fetchList({ devops, cluster, ...filters } = {}) {
    this.list.isLoading = true

    if (filters.limit === Infinity || filters.limit === -1) {
      filters.limit = -1
      filters.page = 1
    } else {
      filters.limit = filters.limit || 10
    }

    filters.sortBy = filters.sortBy || 'createTime'

    const result = await this.request.get(
      this.getResourceUrl({ devops, cluster }),
      {
        ...filters,
      }
    )

    result.items = result.items.filter(
      v => v.type.indexOf('credential.devops.kubesphere.io') > -1
    )

    const dataList = result.items.map(v => {
      v = this.mapper(v)
      v.type = CREDENTIAL_DISPLAY_KEY[v.type.split('/')[1]]
      return v
    })

    this.list = {
      data: dataList,
      total: result.totalItems || dataList.length || 0,
      filters,
      limit: Number(filters.limit) || TABLE_LIMIT,
      page: Number(filters.page) || 1,
      isLoading: false,
    }

    return dataList
  }

  @action
  async handleCreate(data, { devops, cluster }) {
    const body = FORM_TEMPLATES[this.module]({
      namespace: devops,
    })

    const typeDate = get(data, data.type, {})
    const id = typeDate.id || data.id

    set(body, 'metadata.labels.app', id)
    set(
      body,
      'metadata.annotations["kubesphere.io/description"]',
      data.description
    )
    set(body, 'metadata.name', id)

    delete data.description
    typeDate.id ? delete typeDate.id : null

    if (!isEmpty(typeDate) && isObject(typeDate)) {
      Object.keys(typeDate).forEach(key => {
        if (typeDate[key]) {
          typeDate[key] = btoa(typeDate[key])
        }
      })
    }

    delete data[data.type]

    body.data = { ...typeDate }
    body.type = `credential.devops.kubesphere.io/${CREDENTIAL_KEY[data.type]}`

    return await this.request.post(
      this.getResourceUrl({ devops, cluster }),
      body,
      null,
      null
    )
  }

  @action
  async fetchDetail() {
    const { devops, credential_id, cluster } = this.params
    const result = await this.request.get(
      `${this.getResourceUrl({
        devops,
        name: credential_id,
        cluster,
      })}?content=1`
    )

    const usage = await this.getUsageDetail()
    const data = this.mapper(result)

    data.display_name = data.name
    data.id = data.name
    data.type = CREDENTIAL_DISPLAY_KEY[data.type.split('/')[1]]

    this.usage = usage
    this.detail = data
    this.isLoading = false
  }

  @action
  async getUsageDetail() {
    const { devops, credential_id, cluster } = this.params

    return await this.request.get(
      `${this.getDevopsUrlV2({
        cluster,
      })}${devops}/credentials/${credential_id}/usage`
    )
  }

  @action
  async updateCredential(credential, { devops, cluster }) {
    const data = credential[credential.type]
    const des = credential.description
    const origin = credential._originData

    if (JSON.stringify(data) !== '{}' && typeof data === 'object') {
      Object.keys(data).forEach(key => {
        data[key] = btoa(data[key])
      })
    }

    set(origin, 'data', data)
    set(origin, 'metadata.annotations["kubesphere.io/description"]', des)

    return await this.request.put(
      `${this.getResourceUrl({
        devops,
        name: credential.name,
        cluster,
      })}?content=1`,
      origin
    )
  }

  @action
  async delete(credential_id) {
    const { devops, cluster } = this.params

    return await this.request.delete(
      `${this.getResourceUrl({
        devops,
        name: credential_id,
        cluster,
      })}`
    )
  }

  @action
  checkName(params) {
    return request.get(
      this.getResourceUrl(params),
      {},
      {
        headers: { 'x-check-exist': true },
      }
    )
  }
}
