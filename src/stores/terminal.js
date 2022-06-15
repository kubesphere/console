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

import { observable, action } from 'mobx'
import { get, assign } from 'lodash'
import { Notify } from '@kube-design/components'

export default class TerminalStore {
  username = get(globals, 'user.username', '')

  @observable
  kubectl = {
    cluster: '',
    namespace: '',
    pod: '',
    container: '',
    nodename: '',
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

  async kubeWebsocketUrl() {
    const {
      cluster,
      namespace,
      nodename,
      pod,
      container,
      shell = 'sh',
    } = this.kubectl

    if (nodename) {
      return `kapis/terminal.kubesphere.io/v1alpha2${this.getClusterPath({
        cluster,
      })}/nodes/${nodename}/exec`
    }
    const result = await request.get(
      `kapis/terminal.kubesphere.io/v1alpha2${this.getClusterPath({
        cluster,
      })}/namespaces/${namespace}/pods/${pod}/exec?container=${container}&shell=${shell}`,
      null,
      null,
      err => {
        if (err.status === 404) {
          return false
        }
        return true
      }
    )
    if (!result) {
      return `kapis/terminal.kubesphere.io/v1alpha2${this.getClusterPath({
        cluster,
      })}/namespaces/${namespace}/pods/${pod}?container=${container}&shell=${shell}`
    }
    return `kapis/terminal.kubesphere.io/v1alpha2${this.getClusterPath({
      cluster,
    })}/namespaces/${namespace}/pods/${pod}/exec?container=${container}&shell=${shell}`
  }

  @action
  async fetchKubeCtl({ cluster }) {
    this.kubectl.isLoading = true
    const result = await request.get(
      `kapis/resources.kubesphere.io/v1alpha2${this.getClusterPath({
        cluster,
      })}/users/${this.username}/kubectl`,
      null,
      null,
      this.reject
    )
    if (!result) {
      Notify.error({
        content: t('OPEN_TERMINAL_DESC'),
      })
    }
    this.kubectl = {
      ...this.kubectl,
      cluster,
      ...result,
      isLoading: false,
    }
  }

  @action
  setNodename = nodename => {
    this.kubectl.nodename = nodename
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
