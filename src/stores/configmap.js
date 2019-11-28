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

export default class ConfigMapStore extends Base {
  constructor() {
    super()
    this.module = 'configmaps'
  }

  get apiVersion() {
    return 'api/v1'
  }

  @action
  async fetchByK8s({ namespace }) {
    this.list.isLoading = true
    const result = await request.get(
      `${this.apiVersion}/namespaces/${namespace}/${this.module}`
    )

    const data = result.items.map(this.mapper)
    this.list.data = data
    this.list.total = result.items.length
    this.list.isLoading = false

    return data
  }
}
