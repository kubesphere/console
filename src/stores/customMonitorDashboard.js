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

/**
 * reuse kubesphere resouce request logic
 */
import Base from 'stores/base'

/**
 * list and request logic
 */
export default class CustomMonitoringDashboardStore extends Base {
  module = 'dashboards'

  getListUrl = ({ cluster, namespace }) =>
    `${this.apiVersion}${this.getPath({ cluster, namespace })}/${this.module}`

  create({ cluster, namespace, name, ...spec }) {
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
