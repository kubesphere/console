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

import Base from 'stores/base'

export default class ClusterStore extends Base {
  @observable
  initializing = true

  @observable
  isAgentLoading = true

  @observable
  agent = ''

  module = 'clusters'

  getAgentUrl = ({ cluster }) =>
    `kapis/cluster.kubesphere.io/v1alpha1/clusters/${cluster}/agent/deployment`

  @action
  async fetchAgent(params) {
    this.isAgentLoading = true

    const result = await request.get(this.getAgentUrl(params))

    this.agent = result
    this.isAgentLoading = false
  }
}
