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

import { get, set } from 'lodash'
import { action, observable } from 'mobx'
import { formatRules } from 'utils'
import ObjectMapper from 'utils/object.mapper'
import FED_TEMPLATES from 'utils/fed.templates'

import Base from '../base'
import List from '../base.list'

export default class ProjectStore extends Base {
  @observable
  initializing = true

  limitRanges = new List()

  module = 'namespaces'

  getResourceUrl = ({ workspace, ...params }) => {
    if (workspace) {
      return `kapis/tenant.kubesphere.io/v1alpha3/workspaces/${workspace}/namespaces`
    }

    return `kapis/resources.kubesphere.io/v1alpha3${this.getPath(
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
    namespace,
    more,
    type,
    ...params
  } = {}) {
    this.list.isLoading = true

    if (!params.sortBy && params.ascending === undefined) {
      params.sortBy = 'createTime'
    }

    if (params.limit === Infinity || params.limit === -1) {
      params.limit = -1
      params.page = 1
    }

    params.limit = params.limit || 10

    const result = await request.get(
      this.getResourceUrl({ cluster, workspace, namespace }),
      {
        ...params,
        label:
          type === 'system'
            ? 'kubesphere.io/workspace:system-workspace'
            : undefined,
      }
    )
    const data = get(result, 'items', []).map(item => ({
      cluster,
      ...this.mapper(item),
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

    return data
  }

  @action
  async fetchDetail({ cluster, namespace }) {
    this.isLoading = true
    const detail = await request.get(
      this.getDetailUrl({ cluster, name: namespace }),
      null,
      null,
      res => {
        if (res.reason === 'NotFound' || res.reason === 'Forbidden') {
          global.navigateTo('/404')
        }
      }
    )

    this.detail = { cluster, ...this.mapper(detail) }

    if (this.detail.isFedManaged) {
      const fedNsDetail = await request.get(
        this.getFedDetailUrl({ name: namespace, namespace })
      )
      this.detail.clusters = get(fedNsDetail, 'spec.placement.clusters')
    }

    this.isLoading = false
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
  async fetchLimitRanges({ cluster, namespace }) {
    this.limitRanges.isLoading = false
    const result = await request.get(
      `api/v1${this.getPath({ cluster, namespace })}/limitranges`
    )
    const data = result.items.map(ObjectMapper.limitranges)

    this.limitRanges.update({
      data,
      total: result.items.length,
      isLoading: false,
    })

    return data
  }

  @action
  create(data, params = {}) {
    return this.submitting(
      request.post(this.getListUrl(params), data).then(() => {
        const fedData = FED_TEMPLATES.namespaces(data)
        return request.post(
          this.getFedListUrl({ namespace: get(data, 'metadata.name') }),
          fedData
        )
      })
    )
  }

  // @action
  // delete(params) {
  //   params.namespace = params.name
  //   const url = params.isFedManaged
  //     ? this.getFedDetailUrl(params)
  //     : this.getDetailUrl(params)
  //   return this.submitting(request.delete(url))
  // }
}
