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

import { get, set, uniq, isArray } from 'lodash'
import { observable, action } from 'mobx'
import { Notify } from 'components/Base'
import { safeParseJSON } from 'utils'
import cookie from 'utils/cookie'

import Base from './base'

export default class UsersStore extends Base {
  @observable
  logs = {
    data: [],
    total: 0,
    isLoading: true,
  }

  @observable
  roles = []

  module = 'users'

  getPath({ cluster, workspace, namespace, devops } = {}) {
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
      return `/workspaces/${workspace}`
    }

    return path
  }

  getModule({ cluster, workspace, namespace, devops } = {}) {
    if (namespace || devops) {
      return 'members'
    }

    if (workspace) {
      return 'workspacemembers'
    }

    if (cluster) {
      return 'clustermembers'
    }

    return 'users'
  }

  getResourceUrl = (params = {}) =>
    `kapis/iam.kubesphere.io/v1alpha2${this.getPath(params)}/${this.getModule(
      params
    )}`

  getListUrl = this.getResourceUrl

  @action
  async fetchLogs({ name }) {
    this.logs.isLoading = true

    const result = await request.get(`k${this.getDetailUrl({ name })}/logs`)

    this.logs.data = result
    this.logs.isLoading = false
  }

  @action
  async fetchRules({ name, ...params }) {
    let module = 'globalroles'
    if (params.namespace || params.devops) {
      module = 'roles'
    } else if (params.workspace) {
      module = 'workspaceroles'
    } else if (params.cluster) {
      module = 'clusterroles'
    }

    const resp = await request.get(
      `kapis/iam.kubesphere.io/v1alpha2${this.getPath(params)}/${this.getModule(
        params
      )}/${name}/${module}`,
      {},
      {},
      () => {}
    )

    const rules = {}
    resp &&
      resp.forEach(item => {
        const rule = safeParseJSON(
          get(
            item,
            "metadata.annotations['iam.kubesphere.io/role-template-rules']"
          ),
          {}
        )

        Object.keys(rule).forEach(key => {
          rules[key] = rules[key] || []
          if (isArray(rule[key])) {
            rules[key].push(...rule[key])
          } else {
            rules[key].push(rule[key])
          }
          rules[key] = uniq(rules[key])
        })
      })

    switch (module) {
      case 'globaleroles':
        set(globals.user, `globalRules`, rules)
        break
      case 'clusterroles': {
        const parentActions = globals.app.getActions({ module: 'clusters' })
        set(globals.user, `clusterRules[${params.cluster}]`, {
          ...rules,
          _: parentActions,
        })
        break
      }
      case 'workspaceroles': {
        const parentActions = globals.app.getActions({ module: 'workspaces' })
        set(globals.user, `workspaceRules[${params.workspace}]`, {
          ...rules,
          _: parentActions,
        })
        break
      }
      case 'roles': {
        const obj = {}
        if (params.workspace) {
          obj.workspace = params.workspace
        } else if (params.cluster) {
          obj.cluster = params.cluster
        }

        if (params.namespace) {
          const parentActions = globals.app.getActions({
            ...obj,
            module: 'projects',
          })
          set(
            globals.user,
            `projectRules[${params.cluster}][${params.namespace}]`,
            {
              ...rules,
              _: parentActions,
            }
          )
        } else if (params.devops) {
          const parentActions = globals.app.getActions({
            ...obj,
            module: 'devops',
          })

          set(
            globals.user,
            `devopsRules[${params.cluster}][${params.devops}]`,
            {
              ...rules,
              _: parentActions,
            }
          )
        }
        break
      }
      default:
    }
  }

  @action
  checkEmail(email) {
    return request.get(
      `${this.getListUrl()}`,
      { email },
      {
        headers: { 'x-check-exist': true },
      }
    )
  }

  @action
  async update({ name, ...params }, data) {
    await this.submitting(
      request.put(this.getDetailUrl({ name, ...params }), data)
    )

    if (data.password && name === globals.user.username) {
      return await request.post('logout')
    }

    const lang = get(data, 'spec.lang')
    if (lang && data.lang !== cookie('lang')) {
      window.location.reload()
    }
  }

  @action
  async batchDelete({ rowKeys, ...params }) {
    if (rowKeys.includes(globals.user.username)) {
      Notify.error(t('Error Tips'), t('Unable to delete itself'))
    } else {
      await this.submitting(
        Promise.all(
          rowKeys.map(username =>
            request.delete(
              `${this.getDetailUrl({ name: username, ...params })}`
            )
          )
        )
      )
    }
    this.list.selectedRowKeys = []
  }

  @action
  delete(user) {
    if (user.name === globals.user.username) {
      Notify.error(t('Error Tips'), t('Unable to delete itself'))
      return
    }

    return this.submitting(request.delete(`${this.getDetailUrl(user)}`))
  }
}
