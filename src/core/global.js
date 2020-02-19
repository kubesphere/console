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

import { get, isEmpty, includes, cloneDeep } from 'lodash'

const NAV_KS_MODULE_MAP = {
  repos: 'openpitrix',
  apps: 'openpitrix',
  'apps-manage': 'openpitrix',
  alerting: 'alerting',
  'alert-message': 'alerting',
  'alert-policy': 'alerting',
  logging: 'logging',
  'mail-server': 'notification',
  'log-collection': 'logging',
  devops: 'devops',
  s2ibuilders: 'devops',
  grayrelease: 'servicemesh',
}

/** A global class for authorization check. */
export default class GlobalValue {
  constructor() {
    // local cache
    this._cache_ = {}
  }

  /**
   * Get user's enabled actions of the module
   * @param {String} workspace - workspace name
   * @param {String} project - project name
   * @param {String} module - module name
   * @returns {Array} actions of current module in the project or workspace
   */
  getActions({ workspace, project, module }) {
    if (
      NAV_KS_MODULE_MAP[module] &&
      !this.hasKSModule(NAV_KS_MODULE_MAP[module])
    ) {
      return []
    }

    if (globals.config.disableAuthorization) {
      return ['view', 'edit', 'create', 'delete', 'manage']
    }

    if (project) {
      return get(globals.user, `rules[${project}][${module}]`, [])
    }

    if (workspace) {
      return get(globals.user, `workspace_rules[${workspace}][${module}]`, [])
    }

    return get(globals.user, `cluster_rules[${module}]`, [])
  }

  /**
   * Check if the user has permission to perform the action(s) of the module.
   * @param {String} workspace - workspace name
   * @param {String} project - project name
   * @param {String} module - module name
   * @param {String} action - action name
   * @param {Array} actions - actions name array
   * @returns {Boolean} true or false.
   */
  hasPermission({ workspace, project, module, action, actions }) {
    if (
      NAV_KS_MODULE_MAP[module] &&
      !this.hasKSModule(NAV_KS_MODULE_MAP[module])
    ) {
      return false
    }

    if (globals.config.disableAuthorization) {
      return true
    }

    if (!isEmpty(actions)) {
      return includes(
        this.getActions({ workspace, project, module }),
        ...actions
      )
    }

    return this.getActions({ workspace, project, module }).includes(action)
  }

  checkNavItem(item, callback) {
    if (item.skipAuth) {
      return true
    }

    if (item.ksModule && !this.hasKSModule(item.ksModule)) {
      return false
    }

    if (item.admin && globals.user.cluster_role !== 'cluster-admin') {
      return false
    }

    if (!item._children) {
      item._children = item.children
    }

    if (item._children) {
      item.children = item._children.filter(child => {
        if (child.tabs) {
          return child.tabs.some(_child => this.checkNavItem(_child, callback))
        }

        return this.checkNavItem(child, callback)
      })

      return item.children.length > 0
    }

    if (item.authKey && item.authKey.indexOf('|') !== -1) {
      return item.authKey
        .split('|')
        .some(module => callback({ module, action: 'view' }))
    }

    return callback({
      module: item.authKey || item.name,
      action: item.authAction || 'view',
    })
  }

  get enableGlobalNav() {
    const navs = this.getGlobalNavs()
    return navs.length > 0
  }

  getGlobalNavs() {
    if (!this._cache_['globalNavs']) {
      const navs = []

      globals.config.globalNavs.forEach(nav => {
        const filteredItems = nav.items.filter(item =>
          this.checkNavItem(item, params => this.hasPermission(params))
        )
        if (!isEmpty(filteredItems)) {
          navs.push({ ...nav, items: filteredItems })
        }
      })

      this._cache_['globalNavs'] = navs
    }

    return this._cache_['globalNavs']
  }

  getInfraNavs() {
    if (!this._cache_['infraNavs']) {
      const navs = []

      globals.config.infrastructureNavs.forEach(nav => {
        const filteredItems = nav.items.filter(item =>
          this.checkNavItem(item, params => this.hasPermission(params))
        )

        if (!isEmpty(filteredItems)) {
          navs.push({ ...nav, items: filteredItems })
        }
      })

      this._cache_['infraNavs'] = navs
    }

    return this._cache_['infraNavs']
  }

  get workspaces() {
    return globals.user.workspaces || []
  }

  getWorkspaceNavs(workspace) {
    if (!this._cache_[`workspace_${workspace}_navs`]) {
      const navs = []

      globals.config.workspaceNavs.forEach(nav => {
        const filteredItems = nav.items.filter(item =>
          this.checkNavItem(item, params =>
            this.hasPermission({ ...params, workspace })
          )
        )

        if (!isEmpty(filteredItems)) {
          navs.push({ ...nav, items: filteredItems })
        }
      })

      this._cache_[`workspace_${workspace}_navs`] = cloneDeep(navs)
    }

    return this._cache_[`workspace_${workspace}_navs`]
  }

  getManageAppNavs() {
    return globals.config.manageAppNavs
  }

  getProjectNavs(project) {
    if (!this._cache_[`project_${project}_navs`]) {
      const navs = []

      globals.config.projectNavs.forEach(nav => {
        const filteredItems = nav.items.filter(item =>
          this.checkNavItem(item, params =>
            this.hasPermission({ ...params, project })
          )
        )

        if (!isEmpty(filteredItems)) {
          navs.push({ ...nav, items: filteredItems })
        }
      })

      this._cache_[`project_${project}_navs`] = navs
    }

    return this._cache_[`project_${project}_navs`]
  }

  getDevOpsNavs(project) {
    if (!this._cache_[`devops_${project}_navs`]) {
      const navs = []

      globals.config.devopsNavs.forEach(nav => {
        const filteredItems = nav.items.filter(item =>
          this.checkNavItem(item, params =>
            this.hasPermission({ ...params, project })
          )
        )

        if (!isEmpty(filteredItems)) {
          navs.push({ ...nav, items: filteredItems })
        }

        this._cache_[`devops_${project}_navs`] = navs
      })
    }

    return this._cache_[`devops_${project}_navs`]
  }

  getMonitoringNavs() {
    if (!this._cache_['monitorNavs']) {
      const navs = []
      globals.config.monitoringNavs.forEach(nav => {
        const filteredItems = nav.items.filter(item =>
          this.checkNavItem(item, params => this.hasPermission(params))
        )

        if (!isEmpty(filteredItems)) {
          navs.push({ ...nav, items: filteredItems })
        }
      })

      this._cache_['monitorNavs'] = navs
    }

    return this._cache_['monitorNavs']
  }

  getPlatformSettingsNavs() {
    if (!this._cache_['platformSettingsNavs']) {
      const navs = []

      globals.config.platformSettingsNavs.forEach(nav => {
        const filteredItems = nav.items.filter(item =>
          this.checkNavItem(item, params => this.hasPermission({ ...params }))
        )

        if (!isEmpty(filteredItems)) {
          navs.push({ ...nav, items: filteredItems })
        }
      })

      this._cache_['platformSettingsNavs'] = navs
    }

    return this._cache_['platformSettingsNavs']
  }

  get enableAppStore() {
    return (
      this.hasKSModule('openpitrix') &&
      this.hasPermission({ module: 'apps', action: 'view' })
    )
  }

  get isClusterAdmin() {
    return globals.user.cluster_role === 'cluster-admin'
  }

  hasKSModule(module) {
    return isEmpty(globals.ksConfig) || get(globals.ksConfig, module)
  }
}
