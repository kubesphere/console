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

import { isEmpty, get, set } from 'lodash'
import { action, observable } from 'mobx'
import moment from 'moment-mini'
import { Notify } from 'components/Base'
import Base from 'stores/base'

import { LIST_DEFAULT_ORDER } from 'utils/constants'

export default class RoleStore extends Base {
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
  rulesInfo = []

  getPath({ workspace, namespace }) {
    let path = ''
    if (workspace) {
      path += `/workspaces/${workspace}`
    }
    if (namespace) {
      path += `/namespaces/${namespace}`
    }
    return path
  }

  getResourceUrl = params =>
    `kapis/iam.kubesphere.io/v1alpha2${this.getPath(params)}/${this.module}`

  constructor(module = 'roles') {
    super(module)
  }

  @action
  async fetchList({ cluster, workspace, namespace, more, ...params } = {}) {
    this.list.isLoading = true

    if (!params.sortBy && params.ascending === undefined) {
      params.sortBy = LIST_DEFAULT_ORDER[this.module] || 'createTime'
    }

    if (params.limit === Infinity || params.limit === -1) {
      params.limit = -1
      params.page = 1
    }

    params.limit = params.limit || 10

    const result = await request.get(
      this.getResourceUrl({ cluster, workspace, namespace }),
      { ...params, label: 'kubesphere.io/creator' }
    )

    const data = get(result, 'items', []).map(this.mapper)

    this.list.update({
      data: more ? [...this.list.data, ...data] : data,
      total: result.totalItems || result.total_count || data.length || 0,
      ...params,
      limit: Number(params.limit) || 10,
      page: Number(params.page) || 1,
      isLoading: false,
      ...(this.list.silent ? {} : { selectedRowKeys: [] }),
    })
  }

  @action
  patch({ name, workspace, namespace }, data) {
    set(
      data,
      'metadata.annotations.lastUpdateTime',
      moment()
        .utc()
        .format()
        .replace('+00:00', 'Z')
    )
    return this.submitting(
      request.patch(this.getDetailUrl(name, workspace, namespace), data)
    )
  }

  @action
  batchDelete(rowKeys, { workspace, namespace }) {
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
          request.delete(this.getDetailUrl(rowKey, workspace, namespace))
        )
      )
    )
  }

  @action
  async fetchRulesInfo() {
    const result = await request.get(
      `apis/iam.kubesphere.io/v1alpha2/rulesmapping/${this.module}`
    )
    this.rulesInfo = result
  }

  @action
  async fetchRules({ name, workspace, namespace }) {
    this.rules.isLoading = true

    const result = await request.get(
      `kapis/iam.kubesphere.io/v1alpha2${this.getPath({
        workspace,
        namespace,
      })}/${this.module}/${name}/rules`
    )

    this.rules.data = result
    this.rules.total = result.length
    this.rules.isLoading = false
  }

  @action
  async fetchUsers({ name, workspace, namespace }) {
    this.users.isLoading = true

    const resp = await request.get(
      `kapis/iam.kubesphere.io/v1alpha2${this.getPath({
        workspace,
        namespace,
      })}/${this.module}/${name}/users`
    )

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
  delete({ name, workspace, namespace }) {
    if (this.checkIfIsPresetRole(name)) {
      Notify.error(
        t('Error Tips'),
        `${t('Unable to delete preset role')}: ${name}`
      )

      return
    }

    return this.submitting(
      request.delete(this.getDetailUrl(name, workspace, namespace))
    )
  }

  checkIfIsPresetRole(name) {
    if (this.module === 'roles') {
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
}
