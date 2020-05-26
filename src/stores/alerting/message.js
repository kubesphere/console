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

import { observable, action } from 'mobx'
import { isEmpty } from 'lodash'

import ObjectMapper from 'utils/object.mapper'
import UserStore from 'stores/notification/user'
import List from 'stores/base.list'

import Base from './base'

export default class MessageStore extends Base {
  module = 'history'

  comments = new List()

  userStore = new UserStore()

  @observable
  notifications = {
    data: {},
    total: 0,
    isLoading: true,
  }

  get mapper() {
    return ObjectMapper['alertmessage']
  }

  getDetailUrl = ({ id, ...params }) =>
    `${this.getListUrl(params)}?${this.module}_ids=${id}`

  getCommentUrl = (params = {}) =>
    `${this.apiVersion}${this.getPath(params)}/comment`

  @action
  async fetchNotifications({
    ruleId,
    resourceName,
    status,
    recent = false,
    ...rest
  }) {
    this.notifications.isLoading = true

    const params = {
      rule_ids: ruleId,
      resource_names: resourceName,
      recent,
      reverse: true,
      sort_key: 't1.create_time',
      ...rest,
    }

    if (!isEmpty(status)) {
      params.events = status
    }

    const result = await request.get(this.getListUrl(rest), params)
    const data = (result[this.itemsKey] || []).map(this.mapper)

    this.notifications = {
      data,
      total: result.total || 0,
      isLoading: false,
    }
  }

  @action
  async fetchComments({ cluster, id }) {
    this.comments.isLoading = true

    const params = {
      history_ids: id,
    }
    const result = await request.get(this.getCommentUrl({ cluster }), params)
    const results = result.comment_set || []

    this.comments.update({
      data: results,
      isLoading: false,
    })
  }

  @action
  createComment(params, data) {
    return this.submitting(request.post(this.getCommentUrl(params), data))
  }

  fetchList(params) {
    const defaultParams = {
      sort_key: 't1.create_time',
      reverse: true,
    }
    super.fetchList({ ...defaultParams, ...params })
  }
}
