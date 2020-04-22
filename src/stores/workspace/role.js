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

import { isEmpty } from 'lodash'
import { action, observable } from 'mobx'
import ObjectMapper from 'utils/object.mapper'

export default class RoleStore {
  @observable
  list = {
    data: [],
    total: 0,
    page: 1,
    selectedRowKeys: [],
    isLoading: true,
  }

  @observable
  rules = {
    data: [],
    total: 0,
    page: 1,
    isLoading: true,
  }

  @observable
  users = {
    data: [],
    page: 1,
    limit: 10,
    total: 0,
    isLoading: true,
  }

  @observable
  detail = {}

  @observable
  isLoading = false

  @action
  async fetchList({ workspace } = {}) {
    this.list.isLoading = true

    const result = await request.get(
      `apis/iam.kubesphere.io/v1alpha2/workspaces/${workspace}/roles`
    )

    this.list = {
      data: Object.values(result || []).map(ObjectMapper.roles),
      total: result.length || 0,
      page: 1,
      selectedRowKeys: [],
      isLoading: false,
    }
  }

  @action
  async fetchDetail({ workspace, role } = {}) {
    this.isLoading = true

    if (isEmpty(workspace) || isEmpty(role)) {
      this.isLoading = false
      return
    }

    const result = await request.get(
      `apis/iam.kubesphere.io/v1alpha2/workspaces/${workspace}/roles/${role}`
    )

    if (result) {
      this.detail = ObjectMapper.roles(result)
    }

    this.isLoading = false
  }

  @action
  async fetchRules({ workspace, role }) {
    this.rules.isLoading = true

    const result = await request.get(
      `apis/iam.kubesphere.io/v1alpha2/workspaces/${workspace}/roles/${role}/rules`
    )

    this.rules.data = result
    this.rules.total = result.length
    this.rules.isLoading = false
  }

  @action
  async fetchUsers({ workspace, role }) {
    this.users.isLoading = true

    const resp = await request.get(
      `apis/iam.kubesphere.io/v1alpha2/workspaces/${workspace}/members?conditions=role=${role}`
    )

    this.users.data = resp.items
    this.users.total = resp.total_count
    this.users.isLoading = false
  }

  @action
  setSelectRowKeys(selectedRowKeys) {
    this.list.selectedRowKeys.replace(selectedRowKeys)
  }
}
