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
import { assign, get } from 'lodash'
import LoggingStore from './index'

export default class LoggingHistogram extends LoggingStore {
  @observable
  logsCount = 0

  @observable
  startTime = 0

  @observable
  namespaces = []

  @action
  async fetch(params = {}, maxAge) {
    const start_time = new Date(new Date().setHours(0, 0, 0, 0)).getTime()
    const end_time = new Date().getTime()
    const operation = 'statistics'
    const defaultParams = { operation, start_time, end_time }
    const requestParams = assign(defaultParams, params)

    const resp = await this.request(requestParams, 'get', maxAge)

    this.containersCount = get(resp, 'statistics.containers', 0)

    this.logsCount = get(resp, 'statistics.logs', 0)

    this.startTime = start_time

    this.namespaces = get(resp, 'statistics.namespaces', []) || []
  }

  handleResult(resp) {
    return resp
  }
}
