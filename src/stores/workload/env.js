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
import { get } from 'lodash'
import { safeAtob } from 'utils'

export default class EnvStore {
  @observable
  list = {
    data: [],
    isLoading: true,
  }

  @observable
  variables = {
    data: [],
    isLoading: true,
  }

  getPath({ cluster, namespace } = {}) {
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
  async fetchList({
    cluster,
    namespace,
    containers = [],
    initContainers = [],
  }) {
    this.list.isLoading = true

    const mergeContainers = [
      ...initContainers.map(item => ({ ...item, type: 'init' })),
      ...containers.map(item => ({ ...item, type: 'work' })),
    ]

    const data = await Promise.all(
      mergeContainers.map(container => {
        container.cluster = cluster
        container.namespace = namespace
        return this.fetchVariables(container)
      })
    )

    this.list = {
      data,
      isLoading: false,
    }
  }

  @action
  async fetchVariables(container) {
    this.variables.isLoading = true

    const { cluster, namespace, env = [] } = container
    const requests = []
    const items = []
    env.forEach(item => {
      if ('valueFrom' in item) {
        const { secretKeyRef, configMapKeyRef } = item.valueFrom

        if (secretKeyRef) {
          items.push({
            name: item.name,
            key: secretKeyRef.key,
          })
          requests.push(
            request.get(
              `api/v1${this.getPath({ cluster, namespace })}/secrets/${
                secretKeyRef.name
              }`
            )
          )
        }

        if (configMapKeyRef) {
          items.push({
            name: item.name,
            key: configMapKeyRef.key,
          })
          requests.push(
            request.get(
              `api/v1${this.getPath({ cluster, namespace })}/configmaps/${
                configMapKeyRef.name
              }`
            )
          )
        }
      } else {
        items.push(item)
        requests.push(item.value || '')
      }
    })

    const result = await Promise.all(requests)
    const data = items.map((item, index) => {
      const value = result[index]

      if (value.kind === 'Secret' && item.key) {
        return {
          name: item.name,
          value: safeAtob(get(value.data, item.key, '')),
        }
      }

      if (value.kind === 'ConfigMap' && item.key) {
        return {
          name: item.name,
          value: get(value.data, item.key, ''),
        }
      }

      return { value: '', ...item }
    })

    this.variables = {
      data,
      isLoading: false,
    }

    container.variables = data
    return container
  }
}
