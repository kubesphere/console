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
import { to } from 'utils'

export default class DashboardStore {
  @observable
  resource = {
    quota: {},
    status: {},
    isLoading: true,
  }

  getPath({ cluster, namespace }) {
    let path = ''
    if (cluster) {
      path += `/klusters/${cluster}`
    }
    if (namespace) {
      path += `/namespaces/${namespace}`
    }
    return path
  }

  @action
  async fetchResourceStatus(params) {
    this.resource.isLoading = true

    const [quota, status] = await Promise.all([
      to(
        request.get(
          `kapis/resources.kubesphere.io/v1alpha2${this.getPath(params)}/quotas`
        )
      ),
      to(
        request.get(
          `kapis/resources.kubesphere.io/v1alpha2${this.getPath(
            params
          )}/abnormalworkloads`
        )
      ),
    ])

    this.resource = {
      quota: quota.data,
      status: status.data,
      isLoading: false,
    }
  }
}
