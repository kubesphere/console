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

import { get, set, isEmpty } from 'lodash'
import { action } from 'mobx'
import { getFilterString, formatRules } from 'utils'
import ObjectMapper from 'utils/object.mapper'

import MemberList from 'stores/member.list'

import Base from '../base'

export default class ProjectMemberStore extends Base {
  list = new MemberList()

  get apiVersion() {
    return 'api/v1'
  }

  getResourceUrl = ({ workspace, ...params }) => {
    if (workspace) {
      return `kapis/tenant.kubesphere.io/v1alpha2/workspaces/${workspace}/namespaces`
    }

    return `kapis/resources.kubesphere.io/v1alpha2${this.getPath(
      params
    )}/namespaces`
  }

  getWatchListUrl = ({ workspace, ...params }) => {
    if (workspace) {
      return `${
        this.apiVersion
      }/watch/namespaces?labelSelector=kubesphere.io/workspace=${workspace}`
    }
    return `${this.apiVersion}/watch${this.getPath(params)}/namespaces`
  }

  @action
  async fetchList({
    cluster,
    workspace,
    limit,
    page,
    order,
    reverse,
    keyword,
    more,
    metrics = true,
    ...filters
  } = {}) {
    this.list.isLoading = true

    const params = {}

    if (!order && reverse === undefined) {
      order = 'createTime'
      reverse = true
    }

    if (limit !== Infinity) {
      params.paging = `limit=${limit || 10},page=${page || 1}`
    }

    if (keyword) {
      params.conditions = getFilterString({ name: keyword })
    } else if (!isEmpty(filters)) {
      const { 'kubesphere.io/workspace': assigned, ...rest } = filters
      params.conditions = getFilterString(rest)
      if (assigned === 'not_assigned') {
        params.conditions = params.conditions
          ? `${params.conditions},kubesphere.io/workspace~`
          : 'kubesphere.io/workspace~'
      }
    }

    if (order) {
      params.orderBy = order
    }

    if (reverse) {
      params.reverse = true
    }

    if (metrics) {
      params.metrics = metrics
    }

    const result = await request.get(
      this.getResourceUrl({ cluster, workspace }),
      params
    )
    const items = result.items.map(ObjectMapper.namespaces)

    this.list.update({
      data: more ? [...this.list.data, ...items] : items,
      total: result.total_count || 0,
      limit: Number(limit) || 10,
      page: Number(page) || 1,
      order,
      reverse,
      keyword,
      filters,
      isLoading: false,
      selectedRowKeys: [],
    })
  }

  @action
  async create(data) {
    const cluster = get(data, 'metadata.cluster')
    return this.submitting(request.post(this.getResourceUrl({ cluster }), data))
  }

  @action
  async fetchRules({ namespace, workspace }) {
    this.initializing = true

    const rules = await request.get(
      `kapis/tenant.kubesphere.io/v1alpha2/namespaces/${namespace}/rules`,
      null,
      null,
      () => {}
    )

    if (rules) {
      const formatedRules = formatRules(rules)

      if (workspace === globals.config.systemWorkspace) {
        Object.keys(formatedRules).forEach(key => {
          formatedRules[key] = globals.config.systemWorkspaceProjectRules[
            key
          ] || ['view', 'edit']
        })
      }

      set(globals.user, `rules[${namespace}]`, formatedRules)
    }

    this.initializing = false
  }

  @action
  async fetchMembers({ namespace }) {
    this.members.isLoading = true

    const result = await request.get(
      `apis/iam.kubesphere.io/v1alpha2/namespaces/${namespace}/users`,
      {
        paging: `limit=-1,page=1`,
      }
    )

    this.members.init({
      originData: result,
      page: 1,
    })

    this.members.isLoading = false
  }

  @action
  addMember(namespace, name, role) {
    return request.post(
      `apis/rbac.authorization.k8s.io/v1/namespaces/${namespace}/rolebindings`,
      {
        kind: 'RoleBinding',
        apiVersion: 'rbac.authorization.k8s.io/v1',
        metadata: {
          name: `${role}-${name}`,
        },
        subjects: [
          {
            kind: 'User',
            apiGroup: 'rbac.authorization.k8s.io',
            name,
          },
        ],
        roleRef: {
          apiGroup: 'rbac.authorization.k8s.io',
          kind: 'Role',
          name: role,
        },
      }
    )
  }

  @action
  deleteMember(namespace, member) {
    return this.submitting(
      request.delete(
        `apis/rbac.authorization.k8s.io/v1/namespaces/${namespace}/rolebindings/${
          member.role_binding
        }`
      )
    )
  }

  @action
  batchDeleteMembers(namespace, rowKeys) {
    return this.submitting(
      Promise.all(
        rowKeys.map(rowKey => {
          const member = this.members.data.find(
            user => user.username === rowKey
          )
          return request.delete(
            `apis/rbac.authorization.k8s.io/v1/namespaces/${namespace}/rolebindings/${
              member.role_binding
            }`
          )
        })
      )
    )
  }

  @action
  async changeMemberRole(namespace, member, newRole) {
    await this.deleteMember(namespace, member)
    await this.addMember(namespace, member.username, newRole)
  }
}
