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
import { omit } from 'lodash'
import BaseStore from '../devops'

export default class CDStore extends BaseStore {
  @observable
  list = {
    data: [],
    page: 1,
    limit: 10,
    total: 0,
    order: '',
    reverse: false,
    filters: {},
    isLoading: true,
  }

  @action
  async fetchList({ devops, workspace, devopsName, cluster, ...filters } = {}) {
    this.list.isLoading = true

    const { page, limit } = filters
    // const nameKey = name ? `${encodeURIComponent(name)}` : undefined
    // const url = `${this.getBaseUrl({ cluster, devops })}pipelines`

    // const result = await request.get(
    //   url,
    //   {
    //     page: page || 1,
    //     limit: 10,
    //     name: nameKey,
    //     filter: filter || undefined,
    //   },
    //   { params: { ...filters } }
    // )

    // const data = result.items.map(item => {
    //   return { ...this.mapper(item) }
    // })

    // this.setDevops(devops)
    // this.devopsName = devopsName

    this.list = {
      data: [],
      total: 0,
      limit: parseInt(limit, 10) || 10,
      page: parseInt(page, 10) || 1,
      filters: omit(filters, 'devops'),
      selectedRowKeys: [],
      isLoading: false,
    }
  }
}
