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

import { get, has, set } from 'lodash'
import React from 'react'
import ClusterStore from 'stores/cluster'
import DevOpsStore from 'stores/devops'
import ProjectStore from 'stores/project'
import FederatedProject from 'stores/project.federated'
import WorkspaceStore from 'stores/workspace'
import { eventBus } from 'utils/EventBus'
import { capitalizeSimple } from 'utils/index'

const Nothing = () => {}
export const initEvents = (...listeners) => {
  listeners.forEach(([key, listener]) => {
    eventBus.on(key, listener)
  })
  return () => {
    listeners.forEach(([key, listener]) => {
      eventBus.off(key, listener)
    })
  }
}

export const useEventValue = (key, valueProps, formatter = d => d) => {
  const [value, setValue] = React.useState(valueProps)
  React.useEffect(() => {
    setValue(valueProps)
  }, [valueProps])
  React.useEffect(() => {
    const listener = data => {
      setValue(formatter(data))
    }
    eventBus.on(key, listener)
    return () => {
      eventBus.off(key, listener)
    }
  }, [key])

  return [value, setValue]
}

export const eventKeys = {
  CLUSTER_CHANGE: 'cluster.change',
  CLUSTER_ITEM_CHANGE: cluster => `cluster.${cluster}.change`,
  WORKSPACE_CHANGE: 'workspace.change',
  WORKSPACE_ITEM_CHANGE: workspace => `workspace.${workspace}.change`,
  PROJECT_CHANGE: 'project.change',
  PROJECT_ITEM_CHANGE: (project, cluster) =>
    `${cluster}.project.${project}.change`,
  DEVOPS_CHANGE: 'devops.change',
  DEVOPS_ITEM_CHANGE: (devops, cluster, workspace) =>
    `${cluster}.${workspace}.devops.${devops}.change`,
  // hostClusterName
  HOST_CLUSTER_CHANGE: 'host.cluster.change',
  requestCluster: 'request.cluster',
  requestClusterItem: ({ cluster }) => `request.cluster.${cluster}.change`,
  requestWorkspace: 'request.workspace',
  requestWorkspaceItem: ({ workspace }) =>
    `request.workspace.${workspace}.change`,
  requestProject: 'request.project',
  requestProjectItem: ({ project, cluster }) =>
    `${cluster}.request.project.${project}.change`,
  requestDevops: 'request.devops',
  requestDevopsItem: ({ devops, cluster, namespace }) =>
    `${cluster}.request.devops.${namespace}.${devops}.change`,
  requestAlias: 'request.alias',
  initRequestAlias: 'init.request.alias',
  cancelEvents: 'cancel.event',
  DELETE_CLUSTER: 'delete.cluster',
  DELETE_WORKSPACE: 'delete.workspace',
  DELETE_PROJECT: 'delete.project',
  DELETE_DEVOPS: 'delete.devops',

  // federatedProjects
  FEDERATED_PROJECT_CHANGE: 'federated.project.change',
  FEDERATED_PROJECT_ITEM_CHANGE: federatedProject =>
    `federated.project.${federatedProject}.change`,
  requestFederatedProject: 'request.federated.project',
  requestFederatedProjectItem: ({ federatedProject }) =>
    `request.federated.project.${federatedProject}.change`,
  DELETE_FEDERATED_PROJECT: 'delete.federated.project',
}

export const setDefaultHost = [
  eventKeys.CLUSTER_CHANGE,
  data => {
    if (!data) {
      return
    }

    if (has(data, 'labels["cluster-role.kubesphere.io/host"]')) {
      const hostClusterName = get(data, 'name') ?? 'default'
      if (hostClusterName !== globals.hostClusterName) {
        globals.hostClusterName = hostClusterName
        eventBus.emit(eventKeys.HOST_CLUSTER_CHANGE, hostClusterName)
      }
    }
  },
]

export const requestAlias = [
  eventKeys.requestAlias,
  ({ type, params }) => {
    const key = `request${capitalizeSimple(type)}Item`
    const action = eventKeys[key]?.(params)
    if (!action || eventBus.hasListener(action, Nothing)) {
      return
    }

    eventBus.on(action, Nothing)
    eventBus.emit(eventKeys[`request${capitalizeSimple(type)}`], params)
  },
]

export const requestCluster = [
  eventKeys.requestCluster,

  async params => {
    const clusterStore = new ClusterStore()
    const detail = await clusterStore.fetchDetail({
      name: params.cluster,
      redirect: false,
    })
    eventBus.emit(eventKeys.CLUSTER_CHANGE, detail)
  },
]

export const clusterChange = [
  eventKeys.CLUSTER_CHANGE,
  data => {
    const objectArray = get(globals, `clusterArray`, [])
    const index = objectArray.findIndex(item => item.name === data.name)
    if (index > -1) {
      objectArray[index] = data
    } else {
      objectArray.push(data)
    }
    globals.clusterArray = objectArray

    eventBus.emit(eventKeys.CLUSTER_ITEM_CHANGE(data.name), data)
    eventBus.off(eventKeys.requestClusterItem({ cluster: data.name }), Nothing)
  },
]

export const requestWorkspace = [
  eventKeys.requestWorkspace,
  async params => {
    const workspaceStore = new WorkspaceStore()
    const detail = await workspaceStore.fetchDetail({
      workspace: params.workspace,
      redirect: false,
    })
    eventBus.emit(eventKeys.WORKSPACE_CHANGE, detail)
  },
]

export const workspaceChange = [
  eventKeys.WORKSPACE_CHANGE,
  data => {
    const objectArray = get(globals, `workspaceArray`, [])
    const index = objectArray.findIndex(item => item.name === data.name)
    if (index > -1) {
      objectArray[index] = data
    } else {
      objectArray.push(data)
    }
    globals.workspaceArray = objectArray

    eventBus.emit(eventKeys.WORKSPACE_ITEM_CHANGE(data.name), data)
    eventBus.off(
      eventKeys.requestWorkspaceItem({ workspace: data.name }),
      Nothing
    )
  },
]

export const requestProject = [
  eventKeys.requestProject,
  async params => {
    const projectStore = new ProjectStore()
    const detail = await projectStore.fetchDetail(
      {
        cluster: params.cluster,
        namespace: params.project,
      },
      () => {}
    )
    eventBus.emit(eventKeys.PROJECT_CHANGE, detail)
  },
]

export const projectChange = [
  eventKeys.PROJECT_CHANGE,
  data => {
    const objectArray = get(globals, `clusterProjectArray.${data.cluster}`, [])
    const index = objectArray.findIndex(
      item => item.name === data.name && item.cluster === data.cluster
    )
    if (index > -1) {
      objectArray[index] = data
    } else {
      objectArray.push(data)
    }
    set(globals, `clusterProjectArray.${data.cluster}`, objectArray)

    eventBus.emit(eventKeys.PROJECT_ITEM_CHANGE(data.name, data.cluster), data)
    eventBus.off(
      eventKeys.requestProjectItem({
        project: data.name,
        cluster: data.cluster,
      }),
      Nothing
    )
  },
]

export const requestDevops = [
  eventKeys.requestDevops,
  async params => {
    const devopsStore = new DevOpsStore()
    const detail = await devopsStore.fetchDetail({
      cluster: params.cluster,
      namespace: params.namespace,
      devops: params.devops,
    })
    eventBus.emit(eventKeys.DEVOPS_CHANGE, detail)
  },
]

export const devopsChange = [
  eventKeys.DEVOPS_CHANGE,
  data => {
    const objectArray = get(globals, `clusterDevopsArray.${data.cluster}`, [])
    const index = objectArray.findIndex(
      item => item.name === data.name && item.workspace === data.workspace
    )
    if (index > -1) {
      objectArray[index] = data
    } else {
      objectArray.push(data)
    }
    set(globals, `clusterDevopsArray.${data.cluster}`, objectArray)

    eventBus.emit(
      eventKeys.DEVOPS_ITEM_CHANGE(data.name, data.cluster, data.workspace),
      data
    )

    eventBus.off(
      eventKeys.requestDevopsItem({
        cluster: data.cluster,
        workspace: data.workspace,
        devops: data.name,
      }),
      Nothing
    )
  },
]

export const deleteCluster = [
  eventKeys.DELETE_CLUSTER,
  data => {
    const objectArray = get(globals, `clusterArray`, [])
    const index = objectArray.findIndex(item => item.name === data.name)
    if (index > -1) {
      objectArray.splice(index, 1)
    }
    globals.clusterArray = objectArray

    eventBus.emit(eventKeys.CLUSTER_ITEM_CHANGE(data.name), null)
  },
]

export const deleteWorkspace = [
  eventKeys.DELETE_WORKSPACE,
  data => {
    const objectArray = get(globals, `workspaceArray`, [])
    const index = objectArray.findIndex(item => item.name === data.name)
    if (index > -1) {
      objectArray.splice(index, 1)
    }
    globals.workspaceArray = objectArray

    eventBus.emit(eventKeys.WORKSPACE_ITEM_CHANGE(data.name), null)
  },
]

export const deleteProject = [
  eventKeys.DELETE_PROJECT,
  data => {
    const objectArray = get(globals, `clusterProjectArray.${data.cluster}`, [])
    const index = objectArray.findIndex(
      item => item.name === data.name && item.cluster === data.cluster
    )
    if (index > -1) {
      objectArray.splice(index, 1)
    }
    set(globals, `clusterProjectArray.${data.cluster}`, objectArray)

    eventBus.emit(eventKeys.PROJECT_ITEM_CHANGE(data.name, data.cluster), null)
  },
]

export const deleteDevops = [
  eventKeys.DELETE_DEVOPS,
  data => {
    const objectArray = get(globals, `clusterDevopsArray.${data.cluster}`, [])
    const index = objectArray.findIndex(
      item =>
        item.namespace === data.namespace && item.workspace === data.workspace
    )
    if (index > -1) {
      objectArray.splice(index, 1)
    }
    set(globals, `clusterDevopsArray.${data.cluster}`, objectArray)

    eventBus.emit(
      eventKeys.DEVOPS_ITEM_CHANGE(data.name, data.cluster, data.workspace),
      null
    )
  },
]

// ----------- federatedproject ---------------

export const requestFederatedProject = [
  eventKeys.requestFederatedProject,
  async params => {
    const federatedProjectStore = new FederatedProject(new ProjectStore())
    const detail = await federatedProjectStore.fetchDetail({
      namespace: params.federatedProject,
      name: params.federatedProject,
    })
    eventBus.emit(eventKeys.FEDERATED_PROJECT_CHANGE, detail)
  },
]

export const federatedProjectChange = [
  eventKeys.FEDERATED_PROJECT_CHANGE,
  data => {
    const objectArray = get(globals, `federatedProjectArray`, [])
    const index = objectArray.findIndex(item => item.name === data.name)
    if (index > -1) {
      objectArray[index] = data
    } else {
      objectArray.push(data)
    }
    globals.federatedProjectArray = objectArray

    eventBus.emit(eventKeys.FEDERATED_PROJECT_ITEM_CHANGE(data.name), data)
    eventBus.off(
      eventKeys.requestFederatedProjectItem({
        federatedProject: data.name,
      }),
      Nothing
    )
  },
]

export const initAlias = [
  setDefaultHost,
  requestAlias,
  requestCluster,
  clusterChange,
  requestWorkspace,
  workspaceChange,
  requestProject,
  projectChange,
  requestDevops,
  devopsChange,
  deleteCluster,
  deleteWorkspace,
  deleteProject,
  deleteDevops,
  requestFederatedProject,
  federatedProjectChange,
]
