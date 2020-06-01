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

import { action, computed } from 'mobx'
import { isEmpty, get, set } from 'lodash'

import ObjectMapper from 'utils/object.mapper'
import NotificationAddressStore from 'stores/notification/address'
import UserStore from 'stores/notification/user'

import cookie from 'utils/cookie'
import List from 'stores/base.list'
import Base from './base'

import { getLevelPath } from './path'

export default class PolicyStore extends Base {
  rules = new List()

  notification = new List()

  addressStore = new NotificationAddressStore()

  userStore = new UserStore()

  @computed
  get ksFormatDetail() {
    const detail = this.detail || {}
    return {
      ...detail,
      metadata: {
        name: detail.name,
        annotations: {
          'kubesphere.io/alias-name': detail.displayName,
          'kubesphere.io/description': detail.desc,
        },
      },
    }
  }

  getPolicyUrl = ({ name, ...params }) => {
    const path = getLevelPath(params, this.level)
    return `${this.apiVersion}${path}/policy`
  }

  getRulesUrl = params => {
    const path = getLevelPath(params, this.level)
    return `${this.apiVersion}${path}/alert_status`
  }

  getPolicyFormData = (params = {}) => {
    const data = { ...params }
    const selector = get(data, 'resource_filter.rs_filter_param.selector') || []

    if (!isEmpty(selector)) {
      set(
        data,
        'resource_filter.rs_filter_param.selector',
        JSON.stringify(selector)
      )
    }

    set(
      data,
      'resource_filter.rs_filter_param',
      JSON.stringify(get(data, 'resource_filter.rs_filter_param', {}))
    )

    set(
      data,
      'policy.policy_config',
      JSON.stringify(get(data, 'policy.policy_config', {}))
    )

    set(data, 'policy.creator', get(globals, 'user.username'))

    set(data, 'policy.language', get(globals, 'user.lang', cookie('lang')))

    return data
  }

  @action
  create(data, params) {
    const { AlertingPolicy = {}, Notification = {} } = data || {}

    const { address_ids = [] } = Notification
    const req = this.addressStore
      .createList({
        address_id: address_ids,
        cluster: params.cluster,
      })
      .then(result => {
        const address_list_id = result.address_list_id || ''
        const postData = {
          ...this.getPolicyFormData(AlertingPolicy),
          action: {
            action_name: `${address_list_id}`,
            nf_address_list_id: address_list_id,
          },
        }

        return request.post(this.getListUrl(params), postData)
      })

    return this.submitting(req)
  }

  @action
  patchBasicInfo({ name, ...params }, newObject) {
    return this.submitting(
      request.patch(this.getPolicyUrl({ name, ...params }), {
        ...newObject,
        alert_name: name,
      })
    )
  }

  @action
  async fetchRules({
    name,
    reverse = false,
    limit = 10,
    page = 1,
    more = false,
    ...filters
  }) {
    this.rules.isLoading = true

    const params = {
      alert_names: name,
      ...filters,
    }

    if (limit !== Infinity) {
      params.limit = limit
      params.offset = (Number(page) - 1) * limit || 0
    }

    const api = this.getRulesUrl(params)
    const result = await request.get(api, params)
    const data = (result.alertstatus_set || []).map(ObjectMapper['alertrule'])

    this.rules.update({
      data: more ? [...this.list.data, ...data] : data,
      total: result.total || 0,
      limit: Number(limit) || 10,
      page: Number(page) || 1,
      reverse,
      isLoading: false,
    })

    return data
  }

  @action
  async fetchNotificationRule({ cluster, addressListId }) {
    this.notification.isLoading = true

    const params = {
      cluster,
      address_list_id: addressListId,
    }
    const results = await this.addressStore.fetchList(params)

    // fetch ks user info
    const emails = results.map(item => item.address)
    const users = await this.userStore.fetchList({
      emails,
    })

    const data = results.map(item => {
      const userInfo = users.find(user => user.email === item.address)

      if (userInfo) {
        return {
          ...item,
          ...userInfo,
        }
      }

      return item
    })

    this.notification.update({
      notifyType: get(results, '[0].notify_type'),
      data,
      isLoading: false,
    })
  }
}
