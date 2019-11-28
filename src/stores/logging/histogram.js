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
  startTime = 0

  @observable
  endTime = 0

  @observable
  interval = '15m'

  @observable
  histograms = []

  @observable
  logsCount = 0

  @action
  async fetch(params = {}) {
    const defaultParams = {
      operation: 'histogram',
      start_time: this.startTime,
      end_time: this.endTime,
      interval: this.interval,
    }

    const resp = await this.request(assign(defaultParams, params))

    this.histograms = get(resp, 'histogram.histograms', []) || []

    this.logsCount = get(resp, 'histogram.total', 0)
  }

  handleResult(resp) {
    return resp
  }
}
