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

import { observable, action, computed } from 'mobx'
import { get, assign } from 'lodash'
import { compareVersion } from 'utils'

export default class TerminalStore {
  username = get(globals, 'user.username', '')

  @computed
  get kubeWebsocketUrl() {
    const {
      cluster,
      clusterVersion,
      namespace,
      pod,
      container,
      shell = 'sh',
    } = this.kubectl

    if (compareVersion(clusterVersion, 'v3.1.0') < 0) {
      return `kapis/terminal.kubesphere.io/v1alpha2${this.getClusterPath({
        cluster,
      })}/namespaces/${namespace}/pods/${pod}?container=${container}&shell=${shell}`
    }

    return `kapis/terminal.kubesphere.io/v1alpha2${this.getClusterPath({
      cluster,
    })}/namespaces/${namespace}/pods/${pod}/exec?container=${container}&shell=${shell}`
  }

  @observable
  kubectl = {
    cluster: '',
    namespace: '',
    pod: '',
    container: '',
    shell: 'bash',
    isLoading: true,
  }

  @observable
  kubeconfig = ''

  @observable
  connected = false

  constructor(props) {
    assign(this.kubectl, props)
  }

  getClusterPath({ cluster } = {}) {
    return cluster ? `/klusters/${cluster}` : ''
  }

  @action
  async fetchKubeCtl({ cluster, clusterVersion }) {
    this.kubectl.isLoading = true
    const result = await request.get(
      `kapis/resources.kubesphere.io/v1alpha2${this.getClusterPath({
        cluster,
      })}/users/${this.username}/kubectl`,
      null,
      null,
      this.reject
    )

    this.kubectl = {
      cluster,
      clusterVersion,
      ...result,
      isLoading: false,
    }
  }

  @action
  async fetchKubeConfig(params) {
    const result = await request.get(
      `kapis/resources.kubesphere.io/v1alpha2${this.getClusterPath(
        params
      )}/users/${this.username}/kubeconfig`
    )
    this.kubeconfig = result
  }

  @action
  connect() {
    this.connected = true
  }

  @action
  disconnect() {
    this.connected = false
  }

  reject = res => {
    this.kubectl.isLoading = false
    window.onunhandledrejection(res)
  }
}
