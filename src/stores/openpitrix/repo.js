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

import { action } from 'mobx'

import Base from './base'

export default class Repo extends Base {
  resourceName = 'repos'

  getUrl = ({ repo_id, name } = {}) => {
    if (repo_id) {
      return `${this.baseUrl}repos/${repo_id}/${name || ''}`
    }

    return `${this.baseUrl}repos`
  }

  @action
  validate(data) {
    return request.post(`${this.getUrl()}?validate=true`, data)
  }

  @action
  index({ repo_id }) {
    if (repo_id) {
      return request.post(this.getUrl({ repo_id, name: 'action' }), {
        action: 'index',
      })
    }
  }

  @action
  fetchEvents({ repo_id }) {
    return request.get(this.getUrl({ repo_id, name: 'events' }), {})
  }

  @action
  update = async ({ repo_id, ...data } = {}) => {
    await this.submitting(request.patch(this.getUrl({ repo_id }), data))
  }

  @action
  delete = ({ repo_id }) =>
    this.submitting(request.delete(this.getUrl({ repo_id }), {}))

  @action
  setSelectRowKeys(selectedRowKeys) {
    this.list.selectedRowKeys = selectedRowKeys
  }
}
