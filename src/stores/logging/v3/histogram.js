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

import { computed, observable, action, toJS } from 'mobx'
import { get } from 'lodash'
import LoggingStore from './base'

/**
 * @param {string} interval
 * @return {number}
 */
function esInterval2Ms(interval) {
  const unitMap = {
    s: 1000,
    m: 1000 * 60,
    h: 1000 * 60 * 60,
    d: 1000 * 60 * 60 * 24,
    w: 1000 * 60 * 60 * 24 * 7,
  }

  const [, count = 0, unit = 'ms'] = interval.match(/(\d+)([smhdw])/) || []
  return count * unitMap[unit]
}

export default class LoggingHistogram extends LoggingStore {
  @observable
  histograms = []

  @observable
  logsCount = 0

  @observable
  interval = '' // format 10m

  @computed
  get intervalMillisecond() {
    return esInterval2Ms(this.interval)
  }

  get operation() {
    return 'histogram'
  }

  @action
  updateInterval(interval) {
    this.interval = interval
  }

  /**
   * save params which use in pre fetch
   */
  preFetchParams = {}

  @action
  watchNewLogs({ pollingInterval = 5000, startCollectTime = Date.now() }) {
    const { end_time, start_time, ...preParams } = this.preFetchParams || {}
    const now = Date.now()

    this.pollingTimer = setTimeout(async () => {
      const pollingStore = new LoggingHistogram()

      await pollingStore.fetch({
        ...preParams,
        end_time: now,
        start_time: startCollectTime,
      })

      const newHistograms = (await pollingStore.histograms) || []
      const oldHistograms = toJS(this.histograms || [])

      const histogramsWithNewTimeRange = newHistograms.filter(histogram => {
        const preHistogram = oldHistograms.find(
          oldHistogram => oldHistogram.time === histogram.time
        )
        if (preHistogram) {
          preHistogram.count += histogram.count
          return false
        }
        return true
      })

      this.histograms = [...oldHistograms, ...histogramsWithNewTimeRange]

      this.watchNewLogs({
        startCollectTime: now,
        pollingInterval,
      })
    }, pollingInterval)
  }

  stopWatchNewLogs() {
    clearTimeout(this.pollingTimer)
  }

  @action
  async fetch(params = {}) {
    const resp = await this.request({ interval: this.interval, ...params })

    this.histograms = get(resp, 'histogram.histograms', []) || []
    this.logsCount = get(resp, 'histogram.total', 0)
  }
}
