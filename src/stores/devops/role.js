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

import ObjectMapper from 'utils/object.mapper'
import { isEmpty, get } from 'lodash'
import { action } from 'mobx'
import { Notify } from 'components/Base'

import { LIST_DEFAULT_ORDER } from 'utils/constants'

import List from 'stores/base.list'
import BaseStore from './base'

export default class DevopsRoleStore extends BaseStore {
  module = 'roles'

  roleTemplates = new List()

  getResourceUrl = ({ project_id }) =>
    `kapis/iam.kubesphere.io/v1alpha2/devopsprojects/${project_id}/roles`

  getDetailUrl = ({ project_id, name }) => {
    ;`${this.getResourceUrl(project_id)}/${name}`
  }

  getFetchUrl = ({ project_id }) =>
    `kapis/iam.kubesphere.io/v1alpha2/namespaces/${project_id}/roles`

  @action
  async fetchList({ project_id, more, ...params } = {}) {
    this.list.isLoading = true

    if (!params.sortBy && params.ascending === undefined) {
      params.sortBy = LIST_DEFAULT_ORDER[this.module] || 'createTime'
    }

    if (params.limit === Infinity || params.limit === -1) {
      params.limit = -1
      params.page = 1
    }

    params.limit = params.limit || 10
    // ${globals.user.username}
    const result = await request.get(this.getResourceUrl({ project_id }), {
      annotation: `kubesphere.io/creator=`,
    })

    const data = result.items.map(item => ({
      ...ObjectMapper.roles(item),
    }))

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
  batchDelete(rowKeys, { project_id }) {
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
          request.delete(this.getDetailUrl({ name: rowKey, project_id }))
        )
      )
    )
  }

  @action
  async fetchRoleTemplates({ project_id, name }) {
    this.roleTemplates.isLoading = true
    const result = await request.get(this.getResourceUrl({ project_id }), {
      aggregateTo: name,
    })

    this.roleTemplates.update({
      data: get(result, 'items', []).map(ObjectMapper.roles),
      total: result.totalItems || result.total_count || 0,
      isLoading: false,
    })
  }

  @action
  delete({ name, project_id }) {
    if (this.checkIfIsPresetRole(name)) {
      Notify.error(
        t('Error Tips'),
        `${t('Unable to delete preset role')}: ${name}`
      )

      return
    }

    return this.submitting(
      request.delete(this.getDetailUrl({ name, project_id }))
    )
  }

  @action
  checkName(params) {
    return request.get(
      `${this.getFetchUrl({ project_id: params.namespace })}/${params.name}`,
      {},
      {
        headers: { 'x-check-exist': true },
      }
    )
  }

  checkIfIsPresetRole(name) {
    return (
      isEmpty(globals.config.presetRoles) &&
      globals.config.presetRoles.includes(name)
    )
  }
}
