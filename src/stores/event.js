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

import { orderBy } from 'lodash'
import { action, observable } from 'mobx'

import ObjectMapper from 'utils/object.mapper'

export default class EventsStore {
  @observable
  list = {
    data: [],
    page: 1,
    limit: 10,
    total: 0,
    isLoading: true,
  }

  @action
  async fetchList({ name, cluster, namespace, ...rest }) {
    this.list.isLoading = true

    const clusterPath = cluster ? `/klusters/${cluster}` : ''
    const namespacePath = namespace ? `/namespaces/${namespace}` : ''
    const result = await request.get(
      `api/v1${clusterPath}${namespacePath}/events`,
      rest
    )

    this.list = {
      data: orderBy(result.items.map(ObjectMapper.events), 'lastTimestamp'),
      total: result.items.length,
      isLoading: false,
    }
  }
}
