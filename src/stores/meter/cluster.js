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
import { isArray, isEmpty, isUndefined } from 'lodash'

import ClusterStore from 'stores/cluster'
import NodeStore from 'stores/node'
import WorkspaceStore from 'stores/workspace'
import NamespaceStore from 'stores/project'
import ApplicationCrdStore from 'stores/application/crd'

import ServiceStore from 'stores/service'
import WorkloadStore from 'stores/workload'
import PodStore from 'stores/pod'

import { ICON_TYPES } from 'utils/constants'

import {
  filterResourceLevel,
  hasNameSpacesType,
  filterListByType,
  getFetchParams,
  getListConfig,
} from 'utils/meter'

import Base from './base'

export default class ClusterMeter extends Base {
  @observable
  list = []

  @observable
  cacheList = []

  @observable
  levelMeterData = {}

  @observable
  cacheLevelData = {}

  @observable
  isLoading = false

  clusterStore = new ClusterStore()

  nodeStore = new NodeStore()

  workspaceStore = new WorkspaceStore()

  namespaceStore = new NamespaceStore()

  applicationCrdStore = new ApplicationCrdStore()

  serviceStore = new ServiceStore()

  deploymetStore = new WorkloadStore('deployments')

  statefulsetStore = new WorkloadStore('statefulsets')

  podStore = new PodStore()

  getPath({
    cluster,
    namespaces,
    workspaces,
    deployments,
    statefulsets,
    services,
    pods,
  } = {}) {
    let path = ''

    if (cluster) {
      path += `/klusters/${cluster}`
    }
    if (namespaces) {
      path += `/namespaces/${namespaces}`
    }
    if (workspaces) {
      path += `/workspaces/${workspaces}`
    }
    if (services) {
      path += `/services/${services}`
    }
    if (deployments) {
      path += `/deployments/${deployments}`
    }
    if (statefulsets) {
      path += `/statefulsets/${statefulsets}`
    }
    if (pods) {
      path += `/pods/${pods}`
    }

    return path
  }

  store = {
    cluster: this.clusterStore,
    nodes: this.nodeStore,
    workspaces: this.workspaceStore,
    namespaces: this.namespaceStore,
    applications: this.applicationCrdStore,
    services: this.serviceStore,
    deployments: this.deploymetStore,
    statefulsets: this.statefulsetStore,
    pods: this.podStore,
  }

  get isMultiCluster() {
    return !globals.app.isMultiCluster
  }

  getStore = type => {
    return this.store[type]
  }

  @action
  fetchList = async ({ type, ...rest }) => {
    const store = this.getStore(type)
    const params = getFetchParams({
      isMultiCluster: this.isMultiCluster,
      type,
      ...rest,
    })
    const listConfig = getListConfig({
      isMultiCluster: this.isMultiCluster,
      type,
    })
    const requestList = []

    params.forEach(request => {
      if (Object.prototype.toString.call(store) === '[object Array]') {
        store.forEach(_store => {
          requestList.push(_store.fetchList({ ...request }))
        })
      } else {
        requestList.push(store.fetchList({ ...request }))
      }
    })

    const repList = await Promise.all(requestList)
    const data = []

    if (!isEmpty(repList) && isArray(repList)) {
      repList.forEach((rep, index) => {
        rep.forEach(item => {
          if (
            !hasNameSpacesType(type) ||
            (hasNameSpacesType(type) &&
              filterListByType({ type, ...rest })(item))
          ) {
            const { status, desc } = listConfig[index]
            const _status = status
              ? type === 'deployments' || type === 'statefulsets'
                ? status({
                    hasS2i: item.hasS2i,
                    spec: item.spec,
                    status: item.status,
                    annotations: item.annotations,
                  })
                : status(item)
              : undefined

            data.push({
              icon: ICON_TYPES[type],
              name: item.name,
              status: _status,
              desc: t(desc),
              createTime: item.createTime,
              labelSelector: item.selector,
              type,
              _origin: { ...item },
            })
          }
        })
      })
    }

    if (rest.node) {
      this.list = data
      return data
    }

    const result = await filterResourceLevel({
      levelMeterData: this.levelMeterData,
      type,
      data,
      ...rest,
    })

    this.list = result
    return result
  }

  @action
  fetchLevelMeter = async ({ cluster, namespaces }) => {
    if (cluster) {
      this.cluster = cluster
    }
    const url = `${this.tenantUrl}${this.getPaths({
      module,
      namespaces,
    })}/metering_hierarchy`

    const result = await request.get(url, {}, {}, () => {})
    const data =
      !isUndefined(result) && !isEmpty(result) ? { [namespaces]: result } : {}

    this.levelMeterData = data
    return data
  }

  @action
  setLevelMeterData = levelMeterData => {
    this.levelMeterData = levelMeterData
  }
}
