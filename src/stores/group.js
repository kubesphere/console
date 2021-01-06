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
import { get, set, cloneDeep } from 'lodash'
import { formatTreeData, flattenTreeData } from 'utils/group'
import FORM_TEMPLATES from 'utils/form.templates'
import Base from './base'

export default class GroupStore extends Base {
  module = 'groups'

  @observable
  treeData = []

  @observable
  rowTreeData = {}

  get apiVersion() {
    return 'kapis/iam.kubesphere.io/v1alpha2'
  }

  getPath({ cluster, workspace, namespace, devops }) {
    let path = ''

    if (cluster) {
      path += `/klusters/${cluster}`
    }

    if (namespace) {
      return `${path}/namespaces/${namespace}`
    }

    if (devops) {
      return `${path}/devops/${devops}`
    }

    if (workspace) {
      return `${path}/workspaces/${workspace}`
    }

    return path
  }

  getResourceUrl = (params = {}) =>
    `kapis/iam.kubesphere.io/v1alpha2${this.getPath(params)}/groups`

  getDetailUrl = (params = {}) =>
    `${this.getResourceUrl(params)}/${params.name}`

  getWatchListUrl = ({ workspace, ...params }) => {
    return `apis/iam.kubesphere.io/v1alpha2/watch${this.getPath(
      params
    )}/groups?labelSelector=kubesphere.io/workspace=${workspace}`
  }

  @action
  async fetchGroup({ workspace, ...params } = {}) {
    this.isLoading = true

    params.sortBy = 'createTime'
    params.limit = -1

    const result = await request.get(
      this.getResourceUrl({ workspace, ...params })
    )
    const data = get(result, 'items', []).map(item => ({
      ...this.mapper(item),
    }))
    this.total = get(result, 'totalItems')

    this.treeData = [
      {
        key: 'root',
        title: workspace,
        group_id: 'root',
        group_name: workspace,
        path: [workspace],
        children: formatTreeData(data, workspace),
      },
    ]
    this.rowTreeData = flattenTreeData(this.treeData)
    this.isLoading = false
    this.list.update({
      data,
      total: result.totalItems || 0,
      ...params,
      limit: Number(params.limit) || 10,
      page: Number(params.page) || 1,
      isLoading: false,
    })
  }

  @action
  create(data, params) {
    const projectRoles = get(
      data,
      'metadata.annotations["kubesphere.io/project-roles"]',
      []
    )
    const devopsRoles = get(
      data,
      'metadata.annotations["kubesphere.io/devops-roles"]',
      []
    )

    set(
      data,
      'metadata.annotations["kubesphere.io/project-roles"]',
      JSON.stringify(projectRoles)
    )
    set(
      data,
      'metadata.annotations["kubesphere.io/devops-roles"]',
      JSON.stringify(devopsRoles)
    )

    return this.submitting(request.post(this.getResourceUrl(params), data))
  }

  @action
  async createGroup(data, params) {
    const result = await this.create(cloneDeep(data), params)
    const name = get(result, 'metadata.name')
    const workspaceRole = get(
      data,
      'metadata.annotations["kubesphere.io/workspace-role"]'
    )
    const projectRoles = get(
      data,
      'metadata.annotations["kubesphere.io/project-roles"]',
      []
    )
    const devopsRoles = get(
      data,
      'metadata.annotations["kubesphere.io/devops-roles"]',
      []
    )

    const requests = [
      this.addWorksapceRoleBinding(
        [FORM_TEMPLATES['workspacerolebinding']({ name, role: workspaceRole })],
        params
      ),
    ]
    const rolebinds = [...projectRoles, ...devopsRoles]

    if (rolebinds.length > 0) {
      rolebinds.forEach(
        ({ role, ...rest }) =>
          role &&
          requests.push(
            this.addRolebindings(
              [FORM_TEMPLATES['rolebinding']({ name, role })],
              {
                ...rest,
              }
            )
          )
      )
    }
    return this.submitting(Promise.all(requests))
  }

  @action
  async update(data, detail, params) {
    const name = get(data, 'metadata.name')
    const patchData = {}
    const aliasName = get(
      data,
      'metadata.annotations["kubesphere.io/alias-name"]'
    )
    const workspaceRole = get(
      data,
      'metadata.annotations["kubesphere.io/workspace-role"]'
    )
    const projectRoles = get(
      data,
      'metadata.annotations["kubesphere.io/project-roles"]',
      []
    )
    const devopsRoles = get(
      data,
      'metadata.annotations["kubesphere.io/devops-roles"]',
      []
    )

    set(
      patchData,
      'metadata.annotations["kubesphere.io/alias-name"]',
      aliasName
    )
    set(
      patchData,
      'metadata.annotations["kubesphere.io/workspace-role"]',
      workspaceRole
    )
    set(
      patchData,
      'metadata.annotations["kubesphere.io/project-roles"]',
      JSON.stringify(projectRoles)
    )
    set(
      patchData,
      'metadata.annotations["kubesphere.io/devops-roles"]',
      JSON.stringify(devopsRoles)
    )

    const requests = [
      request.patch(this.getDetailUrl({ ...params, name }), patchData),
    ]

    const oldWorkspaceRole = get(
      detail,
      'metadata.annotations["kubesphere.io/workspace-role"]'
    )
    if (workspaceRole !== oldWorkspaceRole) {
      const worksapceRoleBindingResult = await this.getWorksapceRoleBinding(
        name,
        params
      )
      await this.deleteWorksapceRoleBinding(
        get(worksapceRoleBindingResult, 'items[0].metadata.name'),
        params
      )
      requests.push(
        this.addWorksapceRoleBinding(
          [
            FORM_TEMPLATES['workspacerolebinding']({
              name,
              role: workspaceRole,
            }),
          ],
          params
        )
      )
    }

    const oldProjectRoles = get(
      detail,
      'metadata.annotations["kubesphere.io/project-roles"]'
    )
    const oldDevopsRoles = get(
      detail,
      'metadata.annotations["kubesphere.io/devops-roles"]'
    )
    const rolebinding = [...projectRoles, ...devopsRoles]
    const oldRolebinding = [...oldProjectRoles, ...oldDevopsRoles]
    const roleRequest = this.getUpdateRolebindsRequests(
      rolebinding,
      oldRolebinding,
      data
    )

    if (roleRequest.length > 0) {
      requests.push(roleRequest)
    }

    return this.submitting(Promise.all(requests))
  }

  getUpdateRolebindsRequests(newRolebinds, oldRolebinds, data) {
    const groupId = get(data, 'metadata.name')
    const requests = []
    newRolebinds.forEach(nrb => {
      const { role, namespace, cluster } = nrb
      const orb = oldRolebinds.find(
        item =>
          item.cluster === cluster &&
          item.namespace === namespace &&
          item.role === role
      )
      if (!orb) {
        requests.push(
          this.addRolebindings(
            [FORM_TEMPLATES['rolebinding']({ name: groupId, role })],
            {
              cluster,
              namespace,
            }
          )
        )
      }
    })

    oldRolebinds.forEach(orb => {
      const { namespace, cluster, role, name } = orb

      const nrb = newRolebinds.find(
        item =>
          item.cluster === cluster &&
          item.namespace === namespace &&
          item.role === role
      )

      if (!nrb) {
        requests.push(
          this.deleteRolebindings(name, {
            cluster,
            namespace,
          })
        )
      }
    })

    return requests
  }

  @action
  async checkName({ name, ...params }) {
    const result = await request.get(`${this.getResourceUrl(params)}`, {
      name,
    })

    if (
      result.items &&
      result.items.some(item => get(item, 'metadata.generateName') === name)
    ) {
      return { exist: true }
    }

    return { exist: false }
  }

  @action
  addGroupBinding(data, params = {}) {
    return request.post(
      `${this.apiVersion}${this.getPath(params)}/groupbindings`,
      data
    )
  }

  @action
  deleteGroupBinding(name, params = {}) {
    return request.delete(
      `${this.apiVersion}${this.getPath(params)}/groupbindings/${name}`
    )
  }

  @action
  addWorksapceRoleBinding(data, params = {}) {
    return request.post(
      `${this.apiVersion}${this.getPath(params)}/workspacerolebindings`,
      data
    )
  }

  @action
  deleteWorksapceRoleBinding(name, params = {}) {
    return request.delete(
      `${this.apiVersion}${this.getPath(params)}/workspacerolebindings/${name}`
    )
  }

  @action
  addRolebindings(data, params = {}) {
    return request.post(
      `${this.apiVersion}${this.getPath(params)}/rolebindings`,
      data
    )
  }

  @action
  deleteRolebindings(name, params = {}) {
    return request.delete(
      `${this.apiVersion}${this.getPath(params)}/rolebindings/${name}`
    )
  }

  @action getGroupBinding({ group, user }, params = {}) {
    return request.get(
      `${this.apiVersion}${this.getPath(params)}/groupbindings`,
      {
        labelSelector: `iam.kubesphere.io/group-ref=${group},iam.kubesphere.io/user-ref=${user}`,
      }
    )
  }

  @action
  async getWorksapceRoleBinding(group, params = {}) {
    return await request.get(
      `${this.apiVersion}${this.getPath(params)}/workspacerolebindings`,
      {
        labelSelector: `iam.kubesphere.io/group-ref=${group}`,
      }
    )
  }

  @action
  getRoleBinding(group, params = {}) {
    return request.get(
      `${this.apiVersion}${this.getPath(params)}/rolebindings`,
      {
        labelSelector: `iam.kubesphere.io/group-ref=${group}`,
      }
    )
  }

  @action
  fetchRoleBinding(group, { clusters, ...params }) {
    const requests = []
    if (clusters.length > 0) {
      clusters.forEach(cluster => {
        requests.push(this.getRoleBinding(group, { cluster, ...params }))
      })
    } else {
      requests.push(this.getRoleBinding(group, { ...params }))
    }
    return Promise.all(requests)
  }

  @action
  deleteGroup(name, params = {}) {
    return request.delete(
      `${this.apiVersion}${this.getPath(params)}/groups/${name}`
    )
  }
}
