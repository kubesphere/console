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

import { isEmpty, get, set, intersection } from 'lodash'
import { action, observable } from 'mobx'
import ObjectMapper from 'utils/object.mapper'
import { getFilterString, formatRules } from 'utils'
import List from '../base.list'

export default class WorkspaceStore {
  list = new List()

  @observable
  namespaces = {
    data: [],
    page: 1,
    limit: 10,
    total: 0,
    keyword: '',
    isLoading: true,
  }

  @observable
  devops = {
    data: [],
    page: 1,
    limit: 10,
    total: 0,
    keyword: '',
    isLoading: true,
  }

  @observable
  detail = {}

  @observable
  isLoading = false

  @observable
  isSubmitting = false

  @observable
  initializing = true

  getListUrl = () => 'apis/tenant.kubesphere.io/v1alpha1/workspaces'
  getDetailUrl = name => `${this.getListUrl()}/${name}`

  @action
  submitting = promise => {
    this.isSubmitting = true

    setTimeout(() => {
      promise
        .catch(() => {})
        .finally(() => {
          this.isSubmitting = false
        })
    }, 500)

    return promise
  }

  @action
  async fetchList({ limit, page, order, reverse, more, ...rest } = {}) {
    this.list.isLoading = true

    const params = {}

    const filters = { ...this.list.filters, ...rest }
    const conditions = getFilterString(filters)
    if (conditions) {
      params.conditions = conditions
    }

    if (!order && reverse === undefined) {
      order = 'createTime'
      reverse = true
    }

    if (limit !== Infinity) {
      params.paging = `limit=${limit || 10},page=${page || 1}`
    }

    if (order) {
      params.orderBy = order
    }

    if (reverse) {
      params.reverse = true
    }

    const result = await request.get(
      'kapis/tenant.kubesphere.io/v1alpha2/workspaces',
      params
    )

    const data = result.items.map(ObjectMapper.workspaces)

    this.list.update({
      data: more ? [...this.list.data, ...data] : data,
      total: result.total_count || 0,
      limit: Number(limit) || 10,
      page: Number(page) || 1,
      order,
      reverse,
      filters,
      isLoading: false,
      selectedRowKeys: [],
    })
  }

  @action
  async fetchResourceList({ limit, page, order, reverse, more, ...rest } = {}) {
    this.list.isLoading = true

    const params = {}

    const filters = { ...this.list.filters, ...rest }
    const conditions = getFilterString(filters)
    if (conditions) {
      params.conditions = conditions
    }

    if (!order && reverse === undefined) {
      order = 'createTime'
      reverse = true
    }

    if (limit !== Infinity) {
      params.paging = `limit=${limit || 10},page=${page || 1}`
    }

    if (order) {
      params.orderBy = order
    }

    if (reverse) {
      params.reverse = true
    }

    const result = await request.get(
      'kapis/resources.kubesphere.io/v1alpha2/workspaces',
      params
    )

    const data = result.items.map(ObjectMapper.workspaces)

    this.list.update({
      data: more ? [...this.list.data, ...data] : data,
      total: result.total_count || 0,
      limit: Number(limit) || 10,
      page: Number(page) || 1,
      order,
      reverse,
      filters,
      isLoading: false,
      selectedRowKeys: [],
    })
  }

  @action
  async fetchDetail({ workspace } = {}) {
    if (isEmpty(workspace)) {
      return
    }

    const detail = await request.get(
      `kapis/tenant.kubesphere.io/v1alpha2/workspaces/${workspace}`,
      null,
      null,
      res => {
        if (
          res.reason === 'Not Found' ||
          res.reason === 'No Such Object' ||
          res.reason === 'Forbidden'
        ) {
          global.navigateTo('/404')
        }
      }
    )

    this.detail = ObjectMapper.workspaces(detail)
  }

  @action
  async fetchRules({ workspace } = {}) {
    this.initializing = true

    if (isEmpty(workspace)) {
      this.initializing = false
      return
    }

    const rules = await request.get(
      `kapis/tenant.kubesphere.io/v1alpha2/workspaces/${workspace}/rules`
    )

    const formatedRules = formatRules(rules)
    if (workspace === globals.config.systemWorkspace) {
      Object.keys(formatedRules).forEach(key => {
        formatedRules[key] = intersection(
          formatedRules[key],
          globals.config.systemWorkspaceRules[key]
        )
      })
    }

    set(globals.user, `workspace_rules[${workspace}]`, formatedRules)

    this.initializing = false
  }

  @action
  create(data) {
    return this.submitting(request.post(this.getListUrl(), data))
  }

  @action
  update(data) {
    const name = get(data, 'metadata.name')
    return this.submitting(request.patch(this.getDetailUrl(name), data))
  }

  @action
  delete({ workspace }) {
    return this.submitting(request.delete(this.getDetailUrl(workspace)))
  }

  @action
  async checkName(workspace) {
    return await request.get(
      this.getDetailUrl(workspace),
      {},
      {
        headers: { 'x-check-exist': true },
      }
    )
  }

  @action
  async fetchNamespaces({
    workspace,
    keyword,
    page = 1,
    limit = 10,
    more,
  } = {}) {
    this.namespaces.isLoading = true

    const params = {}

    if (keyword) {
      params.conditions = getFilterString({ name: keyword })
    }

    if (limit !== Infinity) {
      params.paging = `limit=${limit || 10},page=${page || 1}`
    }

    const result = await request.get(
      `kapis/tenant.kubesphere.io/v1alpha2/workspaces/${workspace}/namespaces`,
      params
    )

    const items = result.items.map(ObjectMapper.namespaces)

    this.namespaces = {
      data: more ? [...this.namespaces.data, ...items] : items,
      total: result.total_count,
      limit: Number(limit),
      page: Number(page),
      keyword,
      isLoading: false,
    }
  }

  @action
  async fetchDevOps({ workspace, keyword, page = 1, limit = 10, more } = {}) {
    this.devops.isLoading = true

    const params = {}

    if (keyword) {
      params.conditions = getFilterString({ keyword })
    }

    if (limit !== Infinity) {
      params.paging = `limit=${limit || 10},page=${page || 1}`
    }

    const result = await request.get(
      `kapis/tenant.kubesphere.io/v1alpha2/workspaces/${workspace}/devops`,
      params
    )

    this.devops = {
      data: more ? [...this.devops.data, ...result.items] : result.items,
      total: result.total_count,
      limit: Number(limit),
      page: Number(page),
      keyword,
      isLoading: false,
    }
  }
}
