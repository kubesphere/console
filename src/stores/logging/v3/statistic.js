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
import { get } from 'lodash'
import LoggingStore from './base'

export default class LoggingStatistics extends LoggingStore {
  @observable
  logsCount = 0

  @observable
  containersCount = 0

  get operation() {
    return 'statistics'
  }

  @action
  async fetch(params = {}) {
    const resp = await this.request(params)
    this.containersCount = get(resp, 'statistics.containers', 0)
    this.logsCount = get(resp, 'statistics.logs', 0)
  }
}
