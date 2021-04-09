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

import { action, observable } from 'mobx'

import { get } from 'lodash'
import Base from './base'
import List from '../base.list'

export default class Repo extends Base {
  resourceName = 'repos'

  defaultStatus = ['active']

  @observable
  events = new List()

  getUrl = ({ workspace, repo_id, name } = {}) => {
    let prefix = this.baseUrl

    if (workspace) {
      prefix += `/workspaces/${workspace}`
    }

    if (repo_id) {
      return `${prefix}/repos/${repo_id}/${name || ''}`
    }

    return `${prefix}/repos`
  }

  getWatchListUrl = ({ workspace } = {}) =>
    `apis/application.kubesphere.io/v1alpha1/watch/helmrepos?labelSelector=kubesphere.io/workspace=${workspace}`

  @action
  fetchDetail = async ({ workspace, repo_id } = {}) => {
    this.isLoading = true

    const result = await request.get(this.getUrl({ workspace, repo_id }))

    this.detail = result || {}
    this.detail.workspace = workspace
    this.isLoading = false
  }

  @action
  validate({ workspace, ...data }) {
    return request.post(`${this.getUrl({ workspace })}?validate=true`, data)
  }

  @action
  index({ workspace, repo_id }) {
    if (repo_id) {
      return request.post(this.getUrl({ workspace, repo_id, name: 'action' }), {
        action: 'index',
      })
    }
  }

  @action
  async fetchEvents({ workspace, repo_id }) {
    this.events.isLoading = true
    const result = await request.get(
      this.getUrl({ workspace, repo_id, name: 'events' }),
      {}
    )

    this.events.update({
      data: get(result, 'items', []),
      total: get(result, 'total_count', 0),
    })

    this.events.isLoading = false
  }

  @action
  update = async ({ workspace, repo_id, ...data } = {}) => {
    await this.submitting(
      request.patch(this.getUrl({ workspace, repo_id }), data)
    )
  }

  @action
  delete = ({ workspace, repo_id }) =>
    this.submitting(request.delete(this.getUrl({ workspace, repo_id }), {}))

  @action
  setSelectRowKeys(selectedRowKeys) {
    this.list.selectedRowKeys = selectedRowKeys
  }
}
