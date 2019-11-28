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
import { getFilterString } from 'utils'
import ObjectMapper from 'utils/object.mapper'

import MemberList from 'stores/member.list'

export default class MemberStore {
  list = new MemberList()

  @observable
  detail = {}

  @observable
  isLoading = false

  @observable
  isSubmitting = false

  @observable
  projects = {
    data: [],
    total: 0,
    isLoading: true,
  }

  @observable
  devops = {
    data: [],
    total: 0,
    isLoading: true,
  }

  getListUrl = workspace =>
    `kapis/iam.kubesphere.io/v1alpha2/workspaces/${workspace}/members`

  getDetailUrl = (workspace, member) =>
    `${this.getListUrl(workspace)}/${member}`

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
  async fetchList({ workspace, keyword, paging } = {}) {
    this.list.isLoading = true

    const params = {
      paging: `limit=-1,page=1`,
    }

    if (keyword) {
      params.conditions = getFilterString({ keyword })
    }

    const result = await request.get(this.getListUrl(workspace), params)

    this.list.init({
      originData: result.items,
      page: 1,
      paging,
    })

    this.list.isLoading = false
  }

  @action
  async fetchDetail({ workspace, member } = {}) {
    this.isLoading = true

    if (isEmpty(workspace) || isEmpty(member)) {
      this.isLoading = false
      return
    }

    const result = await request.get(this.getDetailUrl(workspace, member))

    if (result) {
      this.detail = result
    }

    this.isLoading = false
  }

  @action
  async fetchProjects({ workspace, member } = {}) {
    this.projects.isLoading = true

    if (isEmpty(workspace) || isEmpty(member)) {
      this.projects.isLoading = false
      return
    }

    const result = await request.get(
      `kapis/tenant.kubesphere.io/v1alpha2/workspaces/${workspace}/members/${member}/namespaces`
    )

    if (result) {
      this.projects.data = result.items.map(ObjectMapper.namespaces)
      this.projects.total = result.total_count
    }

    this.projects.isLoading = false
  }

  @action
  async fetchDevOps({ workspace, member } = {}) {
    this.devops.isLoading = true

    if (isEmpty(workspace) || isEmpty(member)) {
      this.devops.isLoading = false
      return
    }

    const result = await request.get(
      `kapis/tenant.kubesphere.io/v1alpha2/workspaces/${workspace}/members/${member}/devops`
    )

    if (result) {
      this.devops.data = result.items
      this.devops.total = result.total_count
    }

    this.devops.isLoading = false
  }

  @action
  addMember({ workspace }, data) {
    return this.submitting(
      Promise.all(
        data.map(item => request.post(this.getListUrl(workspace), item))
      )
    )
  }

  @action
  deleteMember({ workspace }, names) {
    return this.submitting(
      Promise.all(
        names.map(name =>
          request.delete(`${this.getDetailUrl(workspace, name)}`)
        )
      )
    )
  }

  @action
  changeMemberRole({ workspace }, data) {
    return this.submitting(
      Promise.all(
        data.map(item => request.post(this.getListUrl(workspace), item))
      )
    )
  }

  @action
  setSelectRowKeys(selectedRowKeys) {
    this.list.selectedRowKeys.replace(selectedRowKeys)
  }
}
