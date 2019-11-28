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

import { get, set, unset, isEmpty } from 'lodash'
import { action, observable } from 'mobx'
import { getFilterString, formatRules } from 'utils'
import ObjectMapper from 'utils/object.mapper'

import MemberList from 'stores/member.list'

const formatLimitRange = (limitRange = {}) => {
  const cpuLimit = get(limitRange, 'spec.limits[0].default.cpu')
  const cpuRequest = get(limitRange, 'spec.limits[0].defaultRequest.cpu')
  const memoryLimit = get(limitRange, 'spec.limits[0].default.memory')
  const memoryRequest = get(limitRange, 'spec.limits[0].defaultRequest.memory')

  !cpuLimit && unset(limitRange, 'spec.limits[0].default.cpu')
  !cpuRequest && unset(limitRange, 'spec.limits[0].defaultRequest.cpu')
  !memoryLimit && unset(limitRange, 'spec.limits[0].default.memory')
  !memoryRequest && unset(limitRange, 'spec.limits[0].defaultRequest.memory')

  if (!cpuLimit && !cpuRequest && !memoryLimit && !memoryRequest) {
    return {}
  }

  return limitRange
}

export default class ProjectStore {
  @observable
  initializing = true

  @observable
  list = {
    data: [],
    page: 1,
    limit: 10,
    total: 0,
    order: '',
    reverse: false,
    keyword: '',
    filters: {},
    isLoading: true,
    selectedRowKeys: [],
  }

  @observable
  isLoading = false

  @observable
  isSubmitting = false

  @observable
  data = {}

  @observable
  limitRanges = {
    data: [],
    total: 0,
    isLoading: true,
  }

  members = new MemberList()

  getResourceUrl = ({ workspace }) =>
    workspace
      ? `kapis/tenant.kubesphere.io/v1alpha2/workspaces/${workspace}/namespaces`
      : `kapis/resources.kubesphere.io/v1alpha2/namespaces`

  getWatchListUrl = ({ workspace }) =>
    workspace
      ? `api/v1/watch/namespaces?labelSelector=kubesphere.io/workspace=${workspace}`
      : 'api/v1/watch/namespaces'

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
  async fetchList({
    workspace,
    limit,
    page,
    order,
    reverse,
    keyword,
    more,
    metrics,
    ...filters
  } = {}) {
    this.list.isLoading = true

    const params = {}

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

    const result = await request.get(this.getResourceUrl({ workspace }), params)
    const items = result.items.map(ObjectMapper.namespaces)

    this.list = {
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
    }
  }

  @action
  async create(data, { workspace }) {
    const namespace = get(data, 'Project.metadata.name')

    this.isSubmitting = true

    await request
      .post(this.getResourceUrl({ workspace }), data.Project)
      .then(() => {
        const limitRange = formatLimitRange(data.LimitRange)

        if (isEmpty(limitRange)) {
          return
        }

        return request.post(
          `api/v1/namespaces/${namespace}/limitranges`,
          limitRange
        )
      })

    await this.checkCreateSuccess(namespace)

    this.isSubmitting = false
  }

  checkCreateSuccess(namespace) {
    return new Promise((resolve, reject) => {
      let count = 0
      this.interval = setInterval(async () => {
        const res = await request.get(
          `apis/rbac.authorization.k8s.io/v1/namespaces/${namespace}/rolebindings/admin`,
          {},
          {
            headers: { 'x-check-exist': true },
          }
        )

        if (res.exist) {
          clearInterval(this.interval)
          resolve()
        } else {
          count++
          if (count >= 5) {
            clearInterval(this.interval)
            reject()
          }
        }
      }, 1500)
    })
  }

  @action
  checkName({ name }) {
    return this.submitting(
      request.get(
        `api/v1/namespaces/${name}`,
        {},
        {
          headers: { 'x-check-exist': true },
        }
      )
    )
  }

  @action
  delete({ name }) {
    return this.submitting(
      Promise.all([
        request.delete(`api/v1/namespaces/${name}`),
        request.delete(`api/v1/namespaces/${name}/limitranges`),
      ])
    )
  }

  @action
  batchDelete(rowKeys) {
    return this.submitting(
      Promise.all(
        rowKeys.map(name =>
          Promise.all([
            request.delete(`api/v1/namespaces/${name}`),
            request.delete(`api/v1/namespaces/${name}/limitranges`),
          ])
        )
      )
    )
  }

  @action
  async fetchDetail({ namespace }) {
    const detail = await request.get(
      `api/v1/namespaces/${namespace}`,
      null,
      null,
      res => {
        if (res.reason === 'NotFound' || res.reason === 'Forbidden') {
          global.navigateTo('/404')
        }
      }
    )

    this.data = ObjectMapper.namespaces(detail)
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
  patch({ name }, data) {
    return this.submitting(request.patch(`api/v1/namespaces/${name}`, data))
  }

  @action
  async fetchMembers({ namespace }) {
    this.members.isLoading = true

    const result = await request.get(
      `kapis/iam.kubesphere.io/v1alpha2/namespaces/${namespace}/users`,
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

  @action
  setSelectRowKeys(key, selectedRowKeys) {
    this[key] && this[key].selectedRowKeys.replace(selectedRowKeys)
  }

  @action
  async fetchLimitRanges({ namespace }) {
    this.limitRanges.isLoading = false
    const result = await request.get(
      `api/v1/namespaces/${namespace}/limitranges`
    )

    this.limitRanges = {
      data: result.items.map(ObjectMapper.limitranges),
      total: result.items.length,
      isLoading: false,
    }

    return this.limitRanges.data
  }

  @action
  createLimitRange({ namespace }, data) {
    const limitRange = formatLimitRange(data)

    if (isEmpty(limitRange)) {
      return
    }

    return this.submitting(
      request.post(`api/v1/namespaces/${namespace}/limitranges`, limitRange)
    )
  }

  @action
  updateLimitRange({ namespace, name }, data) {
    return this.submitting(
      request.put(
        `api/v1/namespaces/${namespace}/limitranges/${name}`,
        formatLimitRange(data)
      )
    )
  }
}
