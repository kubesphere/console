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
import { isEmpty } from 'lodash'
import { getFilterString } from 'utils'

import Base from './base'

export default class VolumeSnapshotStore extends Base {
  module = 'volumesnapshots'

  get resourceKind() {
    return 'VolumeSnapshot'
  }

  get apiVersion() {
    return 'apis/snapshot.storage.k8s.io/v1alpha1'
  }

  async fetchList({
    limit,
    page,
    order,
    reverse,
    workspace,
    namespace,
    more,
    resources,
    conditions,
    /**
     * @TODO add cluster when api support
     */
    cluster,
    ...filters
  }) {
    if (!isEmpty(filters) || conditions) {
      const newConditions =
        conditions ||
        getFilterString(filters, [
          'app.kubernetes.io/name',
          'label',
          'annotation',
        ])

      return await super.fetchList({
        limit,
        page,
        order,
        reverse,
        workspace,
        namespace,
        more,
        resources,
        conditions: newConditions,
        ...filters,
      })
    }

    return await super.fetchList({
      limit,
      page,
      order,
      reverse,
      workspace,
      namespace,
      more,
      resources,
      conditions,
      ...filters,
    })
  }
}
