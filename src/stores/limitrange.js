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
import { omit, set, isEmpty } from 'lodash'

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

    this.cancelGpuSetting(data)

    this.list.update({
      data,
      total: result.items.length,
      isLoading: false,
    })

    return data
  }

  cancelGpuSetting(data) {
    if (data.length > 0) {
      const gpu = omit(data[0].limit.default, ['cpu', 'memory'])
      const gpuKey = Object.keys(gpu)[0]
      if (isEmpty(gpu)) {
        set(data[0].limit, 'gpu', {
          type: '',
          value: '',
        })
      } else {
        data[0] = omit(data[0], [
          `limit.default['${gpuKey}']`,
          `limit.defaultRequest['${gpuKey}']`,
        ])
        set(data[0].limit, 'gpu', {
          type: gpuKey,
          value: Object.values(gpu)[0],
        })
      }
    }
  }
}
