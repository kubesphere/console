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

import { set, get, isEmpty, isObject, unset, isUndefined } from 'lodash'
import { action, observable } from 'mobx'
import { safeBtoa } from 'utils/base64'
import {
  CREDENTIAL_KEY,
  CREDENTIAL_DISPLAY_KEY,
  API_VERSIONS,
  CREDENTIAL_TYPE_LIST,
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

    const more = filters.more || false
    unset(filters, 'more')

    filters.sortBy = filters.sortBy || 'createTime'

    const result = await this.request.get(
      this.getResourceUrl({ devops, cluster }),
      {
        ...filters,
      }
    )

    result.items = result.items.filter(v =>
      CREDENTIAL_TYPE_LIST.includes(v.type)
    )

    const dataList = result.items.map(v => {
      v = this.mapper(v)
      v.type = CREDENTIAL_DISPLAY_KEY[v.type.split('/')[1]]
      return v
    })

    this.list.update({
      data: more ? [...this.list.data, ...dataList] : dataList,
      total: result.totalItems || dataList.length || 0,
      filters,
      limit: Number(filters.limit) || TABLE_LIMIT,
      page: Number(filters.page) || 1,
      isLoading: false,
    })

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
          typeDate[key] = safeBtoa(typeDate[key])
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
  async fetchDetail(params) {
    if (!(isUndefined(params) || isEmpty(params))) {
      this.params = params
    }

    const { devops, credential_id, cluster } = this.params
    const result = await this.request.get(
      `${this.getResourceUrl({
        devops,
        name: credential_id,
        cluster,
      })}?content=1`
    )

    const data = this.mapper(result)
    data.display_name = data.name
    data.id = data.name
    data.type = CREDENTIAL_DISPLAY_KEY[data.type.split('/')[1]]

    this.detail = data
    this.isLoading = false
  }

  @action
  async getUsageDetail() {
    const { devops, credential_id, cluster } = this.params

    const usage = await this.request.get(
      `${this.getDevopsUrlV2({
        cluster,
      })}${devops}/credentials/${credential_id}/usage`
    )

    this.usage = usage
  }

  @action
  async updateCredential(credential, { devops, cluster }) {
    const data = credential[credential.type]
    const des = credential.description
    const origin = credential._originData

    if (JSON.stringify(data) !== '{}' && typeof data === 'object') {
      Object.keys(data).forEach(key => {
        data[key] = safeBtoa(data[key])
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
  async delete({ id }) {
    const { devops, cluster } = this.params

    return await this.request.delete(
      `${this.getResourceUrl({
        devops,
        name: id,
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
