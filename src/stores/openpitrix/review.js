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
import { get, uniq } from 'lodash'

import { getFilterString } from 'utils'
import Base from './base'

export default class Review extends Base {
  resourceName = 'reviews'

  sortKey = 'status_time'

  @observable
  list = {
    data: [],
    apps: [],
    page: 0,
    limit: 10,
    total: 0,
    reverse: false,
    filters: {},
    isLoading: true,
    keyword: '',
    selectedRowKeys: [],
  }

  @action
  handle = async ({ app_id, version_id, ...data } = {}) => {
    const url = this.getUrl({ app_id, version_id, name: 'action' })
    await this.submitting(request.post(url, data))
  }

  @action
  async fetchReviewList({ queryApp, ...rest } = {}) {
    await this.fetchList(rest)
    this.list.isLoading = true
    const appIds = get(this, 'list.data', []).map(app => app.app_id)
    const result = await this.queryApps(uniq(appIds).join('|'))
    Object.assign(this.list, {
      apps: get(result, 'items', []),
      isLoading: false,
    })
  }

  @action
  queryApps = async appIds =>
    await request.get(this.getUrl({ name: 'apps' }), {
      conditions: getFilterString({ app_id: appIds }),
    })
}
