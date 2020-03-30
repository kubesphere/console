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

import { set, isArray } from 'lodash'
import { action, observable } from 'mobx'
import { getFilterString, formatRules } from 'utils'

import List from './base.list'
import MemberList from './member.list'

export default class DevOpsStore {
  @observable
  initializing = true

  list = new List()

  @observable
  isLoading = false

  @observable
  isSubmitting = false

  @observable
  data = {}

  @observable
  limitRanges = {}

  members = new MemberList()

  @observable
  roles = {
    data: [],
    page: 1,
    total: 0,
    isLoading: true,
  }

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

  getListUrl = () => 'kapis/devops.kubesphere.io/v1alpha2/devops'
  getDetailUrl = project_id => `${this.getListUrl()}/${project_id}`

  getResourceUrl = ({ workspace }) =>
    `kapis/tenant.kubesphere.io/v1alpha2/workspaces/${workspace}/devops`

  @action
  async fetchList({ workspace, limit, page, order, reverse, keyword } = {}) {
    this.list.isLoading = true

    const params = {}

    if (limit !== Infinity) {
      params.paging = `limit=${limit || 10},page=${page || 1}`
    }

    if (keyword) {
      params.conditions = getFilterString({ keyword })
    }

    if (order) {
      params.orderBy = order
    }

    if (reverse) {
      params.reverse = true
    }

    const result = await request.get(this.getResourceUrl({ workspace }), params)

    this.list.update({
      data: result.items,
      total: result.total_count || 0,
      limit: Number(limit) || 10,
      page: Number(page) || 1,
      order,
      reverse,
      keyword,
      isLoading: false,
      selectedRowKeys: [],
    })
  }

  @action
  create(data, { workspace }) {
    return this.submitting(
      request.post(this.getResourceUrl({ workspace }), data)
    )
  }

  @action
  update(project_id, data) {
    return this.submitting(
      request.patch(
        `kapis/devops.kubesphere.io/v1alpha2/devops/${project_id}`,
        data,
        {
          headers: {
            'content-type': 'application/json',
          },
        }
      )
    )
  }

  @action
  delete({ project_id }, { workspace }) {
    return this.submitting(
      request.delete(`${this.getResourceUrl({ workspace })}/${project_id}`)
    )
  }

  @action
  batchDelete(rowKeys, params) {
    return this.submitting(
      Promise.all(
        rowKeys.map(project_id =>
          request.delete(`${this.getResourceUrl(params)}/${project_id}`)
        )
      )
    )
  }

  @action
  async fetchDetail({ project_id }) {
    const detail = await request.get(
      this.getDetailUrl(project_id),
      null,
      null,
      res => {
        if (res.reason === 'Not Found' || res.reason === 'Forbidden') {
          global.navigateTo('/404')
        }
      }
    )

    this.data = detail
  }

  @action
  async fetchRules({ project_id }) {
    this.initializing = true

    const rules = await request.get(
      `kapis/tenant.kubesphere.io/v1alpha2/devops/${project_id}/rules`,
      null,
      null,
      () => []
    )

    set(globals.user, `rules[${project_id}]`, formatRules(rules))

    this.initializing = false
  }

  @action
  async fetchRoles({ project_id }) {
    this.roles.isLoading = true
    const result = await request.get(
      `${this.getListUrl()}/${project_id}/defaultroles`
    )

    if (isArray(result)) {
      this.roles.data = result.map(role => {
        role.description = t(`pipeline_${role.name}`)
        return role
      })
      this.roles.total = result.length
    }

    this.roles.isLoading = false
  }

  @action
  async fetchMembers({ project_id }) {
    this.members.isLoading = true
    const result = await request.get(
      `${this.getDetailUrl(project_id)}/members`,
      { paging: `limit=9999,page=1` }
    )

    if (result) {
      this.members.init({
        originData: result.items,
        page: 1,
      })
    }

    this.members.isLoading = false
    return result
  }

  @action
  addMember({ project_id, ...params }) {
    return this.submitting(
      request.post(`${this.getDetailUrl(project_id)}/members`, params)
    )
  }

  @action
  updateMember({ project_id, username, ...params }) {
    return this.submitting(
      request.patch(
        `${this.getDetailUrl(project_id)}/members/${username}`,
        params,
        {
          headers: {
            'content-type': 'application/json',
          },
        }
      )
    )
  }

  @action
  deleteMember(project_id, { username }) {
    return this.submitting(
      request.delete(`${this.getDetailUrl(project_id)}/members/${username}`)
    )
  }

  @action
  batchDeleteMembers(project_id, rowKeys) {
    return this.submitting(
      Promise.all(
        rowKeys.map(rowKey =>
          request.delete(`${this.getDetailUrl(project_id)}/members/${rowKey}`)
        )
      )
    )
  }

  @action
  setSelectRowKeys(key, selectedRowKeys) {
    this[key] && this[key].selectedRowKeys.replace(selectedRowKeys)
  }
}
