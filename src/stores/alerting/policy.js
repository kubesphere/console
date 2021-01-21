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

import { get } from 'lodash'
import { action, observable } from 'mobx'
import Base from 'stores/base'

export default class AlertRuleStore extends Base {
  get apiVersion() {
    return 'kapis/alerting.kubesphere.io/v2alpha1/'
  }

  module = 'rules'

  getResourceUrl = this.getListUrl

  @observable
  targetsMetadata = []

  @action
  async fetchMetadata(params) {
    const { data: targetsMetadata } = (await request.get(
      `kapis/monitoring.kubesphere.io/v1alpha3${this.getPath(
        params
      )}/targets/metadata`
    )) || { data: [] }

    this.targetsMetadata = targetsMetadata || []
  }

  fetchMetric = async ({ expr, step, start, end, cluster, namespace }) => {
    if (!expr) {
      return []
    }

    const response = await request.get(
      `kapis/monitoring.kubesphere.io/v1alpha3${this.getPath({
        cluster,
        namespace,
      })}/targets/query`,
      {
        expr,
        step,
        start,
        end,
      },
      null,
      () => {}
    )

    return get(response, 'data.result', [])
  }
}
