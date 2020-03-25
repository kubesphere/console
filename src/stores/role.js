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

import { isEmpty, omit, set } from 'lodash'
import { action, observable } from 'mobx'
import moment from 'moment-mini'
import { getFilterString } from 'utils'
import ObjectMapper from 'utils/object.mapper'
import { Notify } from 'components/Base'

import List from './base.list'

export default class RoleStore {
  list = new List()

  @observable
  rules = {
    data: [],
    total: 0,
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
  originDetail = {}

  @observable
  rulesInfo = []

  @observable
  isSubmitting = false

  noWatch = true

  constructor(type) {
    this.type = type || 'roles'
  }

  getListUrl = namespace =>
    this.type === 'roles'
      ? `apis/rbac.authorization.k8s.io/v1/namespaces/${namespace}/${this.type}`
      : `apis/rbac.authorization.k8s.io/v1/${this.type}`

  getDetailUrl = (name, namespace) => `${this.getListUrl(namespace)}/${name}`

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
    limit,
    page,
    order,
    reverse,
    workspace,
    namespace,
    ...filters
  } = {}) {
    this.list.isLoading = true

    if (!order && reverse === undefined) {
      order = 'createTime'
      reverse = true
    }

    const params = {}

    filters.userfacing = true

    if (!isEmpty(filters)) {
      params.conditions = getFilterString(filters)
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

    const url =
      this.type === 'clusterroles'
        ? `kapis/iam.kubesphere.io/v1alpha2/${this.type}`
        : `kapis/iam.kubesphere.io/v1alpha2/namespaces/${namespace}/${
            this.type
          }`

    const result = await request.get(url, params)

    this.list.update({
      data: result.items.map(ObjectMapper.roles) || [],
      total: result.total_count || 0,
      limit: Number(limit) || 10,
      page: Number(page) || 1,
      order,
      reverse,
      filters: omit(filters, ['namespace', 'userfacing']),
      isLoading: false,
      selectedRowKeys: [],
    })
  }

  @action
  create(data, { namespace } = {}) {
    return this.submitting(request.post(this.getListUrl(namespace), data))
  }

  @action
  patch({ name, namespace }, data) {
    set(
      data,
      'metadata.annotations.lastUpdateTime',
      moment()
        .utc()
        .format()
        .replace('+00:00', 'Z')
    )
    return this.submitting(
      request.patch(this.getDetailUrl(name, namespace), data)
    )
  }

  @action
  batchDelete(rowKeys, { namespace }) {
    for (const name in rowKeys) {
      if (this.checkIfIsPresetRole(name)) {
        Notify.error(
          t('Error Tips'),
          `${t('Unable to delete preset role')}: ${name}`
        )
        return
      }
    }

    return this.submitting(
      Promise.all(
        rowKeys.map(rowKey =>
          request.delete(this.getDetailUrl(rowKey, namespace))
        )
      )
    )
  }

  @action
  async fetchRulesInfo() {
    const result = await request.get(
      `kapis/iam.kubesphere.io/v1alpha2/rulesmapping/${this.type}`
    )
    this.rulesInfo = result
  }

  @action
  async fetchDetail({ name, namespace }) {
    const result = await request.get(this.getDetailUrl(name, namespace))

    this.detail = ObjectMapper.roles(result)
    this.originDetail = result
  }

  @action
  async fetchRules({ name, namespace }) {
    this.rules.isLoading = true
    let result
    if (this.type === 'roles') {
      result = await request.get(
        `kapis/iam.kubesphere.io/v1alpha2/namespaces/${namespace}/${
          this.type
        }/${name}/rules`
      )
    } else {
      result = await request.get(
        `kapis/iam.kubesphere.io/v1alpha2/${this.type}/${name}/rules`
      )
    }

    result = result || []

    this.rules.data = result
    this.rules.total = result.length
    this.rules.isLoading = false
  }

  @action
  async fetchUsers({ name, namespace }) {
    this.users.isLoading = true

    let resp = []
    if (this.type === 'roles') {
      resp = await request.get(
        `kapis/iam.kubesphere.io/v1alpha2/namespaces/${namespace}/${
          this.type
        }/${name}/users`
      )
    } else {
      resp = await request.get(
        `kapis/iam.kubesphere.io/v1alpha2/${this.type}/${name}/users`
      )
    }

    if (resp) {
      if (resp.items) {
        this.users.data = resp.items || []
        this.users.total = resp.total_count || 0
      } else {
        this.users.data = resp
        this.users.total = resp.length || 0
      }
    }

    this.users.isLoading = false
  }

  @action
  delete({ name, namespace }) {
    if (this.checkIfIsPresetRole(name)) {
      Notify.error(
        t('Error Tips'),
        `${t('Unable to delete preset role')}: ${name}`
      )

      return
    }

    return this.submitting(request.delete(this.getDetailUrl(name, namespace)))
  }

  checkIfIsPresetRole(name) {
    if (this.type === 'roles') {
      return (
        isEmpty(globals.config.presetRoles) &&
        globals.config.presetRoles.includes(name)
      )
    }

    return (
      isEmpty(globals.config.presetClusterRoles) &&
      globals.config.presetClusterRoles.includes(name)
    )
  }

  @action
  checkRoleName({ name, namespace }) {
    return request.get(
      this.getDetailUrl(name, namespace),
      {},
      {
        headers: { 'x-check-exist': true },
      }
    )
  }

  @action
  setSelectRowKeys(selectedRowKeys) {
    this.list.selectedRowKeys.replace(selectedRowKeys)
  }
}
