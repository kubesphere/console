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

import { action, observable, extendObservable } from 'mobx'
import { RouterStore } from 'mobx-react-router'
import { parse } from 'qs'
import { getQueryString } from 'utils'

import UserStore from 'stores/user'
import WebSocketStore from 'stores/websocket'
import { get } from 'lodash'

export default class RootStore {
  @observable
  navs = globals.config.navs

  @observable
  showGlobalNav = false

  @observable
  actions = {}

  @observable
  oauthServers = []

  constructor() {
    this.websocket = new WebSocketStore()

    this.user = new UserStore()
    this.routing = new RouterStore()
    this.routing.query = this.query

    global.navigateTo = this.routing.push
  }

  register(name, store) {
    extendObservable(this, { [name]: store })
  }

  query = (params = {}, refresh = false) => {
    const { pathname, search } = this.routing.location
    const currentParams = parse(search.slice(1))

    const newParams = refresh ? params : { ...currentParams, ...params }

    this.routing.push(`${pathname}?${getQueryString(newParams)}`)
  }

  @action
  toggleGlobalNav = () => {
    this.showGlobalNav = !this.showGlobalNav
  }

  @action
  hideGlobalNav = () => {
    this.showGlobalNav = false
  }

  @action
  registerActions = actions => {
    extendObservable(this.actions, actions)
  }

  @action
  triggerAction(id, ...rest) {
    this.actions[id] && this.actions[id].on(...rest)
  }

  login(params) {
    return request.post('login', params)
  }

  @action
  async logout() {
    const res = await request.post('logout')
    const url = get(res, 'data.url')
    if (url) {
      window.location.href = url
    }
  }

  @action
  getRules(params) {
    return this.user.fetchRules({ ...params, name: globals.user.username })
  }
}
