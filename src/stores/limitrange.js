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

import Base from 'stores/base'
import { action } from 'mobx'
import { LimitsEqualRequests } from 'utils'

export default class LimitRangeStore extends Base {
  module = 'limitranges'

  @action
  async fetchListByK8s({ cluster, namespace, module, ...rest } = {}) {
    this.list.isLoading = true

    if (module) {
      this.module = module
    }

    const params = rest

    const result = await request.get(
      this.getListUrl({ cluster, namespace, module }),
      params
    )
    const data = result.items.map(item => ({
      cluster,
      module: module || this.module,
      ...this.mapper(item),
    }))

    LimitsEqualRequests(data)

    this.list.update({
      data,
      total: result.items.length,
      isLoading: false,
    })

    return data
  }
}
