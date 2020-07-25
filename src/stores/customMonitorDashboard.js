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
import Base from 'stores/base'
import List from 'stores/federated.list'

/**
 * list and request logic
 */
export default class CustomMonitoringDashboardStore extends Base {
  module = 'dashboards'

  list = new List()

  getListUrl = ({ cluster, namespace }) =>
    `${this.apiVersion}${this.getPath({ cluster, namespace })}/${this.module}`

  @action
  async fetchList({
    cluster,
    namespace,
    page,
    name,
    limit,
    more,
    ...rest
  } = {}) {
    this.list.isLoading = true

    page = Number(page)
    if (!page || page === 1) {
      this.list.continues = {}
      page = 1
    }

    if (page > 1 && !this.list.continues[page]) {
      page = 1
      this.list.continues = {}
    }

    const params = rest

    params.limit = limit || this.list.limit

    if (this.list.continues[page]) {
      params.continue = this.list.continues[page]
    }

    if (name) {
      params.fieldSelector = `metadata.name=${name}`
    }

    const result = await request.get(
      this.getListUrl({ cluster, namespace }),
      params,
      null,
      () => {}
    )

    const data = result.items.map(item => ({
      ...this.mapper(item),
      cluster,
    }))

    this.list.continues[page + 1] = result.metadata.continue

    if (page === 1) {
      this.list.total = data.length + (result.metadata.remainingItemCount || 0)
    }

    this.list.update({
      data: more ? [...this.list.data, ...data] : data,
      page,
      name,
    })

    this.list.isLoading = false
  }

  create({ cluster, namespace, name, workspace, ...spec }) {
    return super.create(
      {
        apiVersion: 'monitoring.kubesphere.io/v1alpha1',
        kind: 'Dashboard',
        metadata: {
          name,
          namespace,
        },
        spec,
      },
      { cluster, namespace }
    )
  }

  edit({ cluster, namespace, name, resourceVersion, ...spec }) {
    return this.update(
      { cluster, namespace, name },
      {
        apiVersion: 'monitoring.kubesphere.io/v1alpha1',
        kind: 'Dashboard',
        metadata: {
          name,
          namespace,
          resourceVersion,
        },
        spec,
      }
    )
  }
}
