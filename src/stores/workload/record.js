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

import { action, observable } from 'mobx'
import { isEmpty, get } from 'lodash'

import { joinSelector } from 'utils'

import Base from '../base'

export default class RecordStore extends Base {
  @observable
  excute = {
    data: [],
    page: 1,
    limit: 10,
    total: 0,
    isLoading: true,
  }

  constructor() {
    super()
    this.module = 'jobs'
  }

  get apiVersion() {
    return 'apis/kubesphere.io/v1alpha1'
  }

  @action
  async fetchListByK8s({ cluster, namespace, selector, ...params }) {
    this.list.isLoading = true

    if (!isEmpty(selector)) {
      params.labelSelector = joinSelector(selector)
    }

    const result = await request.get(
      `apis/batch/v1${this.getPath({ cluster, namespace })}/${this.module}`,
      params
    )
    const data = result.items || []

    this.list.update({
      data: data.map(this.mapper),
      total: data.length,
      isLoading: false,
      selectedRowKeys: [],
    })

    return data
  }

  @action
  async fetchExcuteRecords(params) {
    this.excute.isLoading = true

    const result = await request.get(
      `apis/batch/v1${this.getPath(params)}/${this.module}/${params.name}`
    )
    const detail = this.mapper(result)

    let data = []
    try {
      const records = JSON.parse(get(detail, 'annotations.revisions', {}))
      data = Object.entries(records).map(([key, value]) => ({
        ...value,
        id: key,
      }))
    } catch (e) {}

    this.excute = {
      data,
      total: data.length || 0,
      isLoading: false,
    }
  }
}
