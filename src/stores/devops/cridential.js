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

import { omit } from 'lodash'
import { action, observable } from 'mobx'
import BaseStore from './base'

const TABLE_LIMIT = 20

export default class CridentialStore extends BaseStore {
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
  params = {}

  @action
  setParams(params) {
    this.params = params
  }

  @action
  async fetchList({ project_name, workspace, ...filters } = {}) {
    this.list.isLoading = true
    const { page } = filters

    const result = await this.request.get(
      `${this.devopsUrlV2}${project_name}/credentials`,
      {
        start: (page - 1) * TABLE_LIMIT || 0,
        limit: TABLE_LIMIT,
      }
    )
    this.list = {
      data: result || [],
      total: (result || []).length,
      limit: 100,
      page: parseInt(page, 10) || 1,
      filters: omit(filters, 'project_name'),
      isLoading: false,
    }
    return result
  }

  @action
  async handleCreate(data, { project_name }, reject) {
    return await this.request.post(
      `${this.devopsUrlV2}${project_name}/credentials`,
      data,
      null,
      reject
    )
  }

  @action
  async fetchDetail() {
    const { project_name, cridential_id } = this.params
    const result = await this.request.get(
      `${
        this.devopsUrlV2
      }${project_name}/credentials/${cridential_id}?content=1`
    )
    result.display_name = result.id
    this.detail = result
  }

  @action
  async updateCridential(cridential, { project_name }) {
    return await this.request.put(
      `${this.devopsUrlV2}${project_name}/credentials/${cridential.id}`,
      cridential
    )
  }

  @action
  async delete(cridential_id) {
    const { project_name } = this.params

    return await this.request.delete(
      `${this.devopsUrlV2}${project_name}/credentials/${cridential_id}`
    )
  }
}
