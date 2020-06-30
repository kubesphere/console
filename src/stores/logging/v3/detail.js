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

export default class LogDetailStore extends LoggingStore {
  get operation() {
    return 'query'
  }

  @observable
  records = []

  @observable
  loadingMore = false

  /**
   * {'asc' | 'desc} sort - the logs sort way
   */
  @observable
  sort = 'asc'

  /**
   * {number} from
   * {number} size
   */
  @observable
  from = 0

  @observable
  size = 10

  @observable
  context = []

  /**
   * save params which use in pre fetch
   */
  preFetchParams = {}

  pollingTimer = null

  get hasMoreLogs() {
    return this.records.length < this.total
  }

  @action
  async fetch(params = {}) {
    const defaultParams = {
      sort: this.sort,
      from: this.from,
      size: this.size,
    }

    const requestParams = { ...defaultParams, ...params }
    const resp = await this.request(requestParams)

    this.records = get(resp, 'query.records') || []
    this.total = get(resp, 'query.total', 0)
  }

  @action
  async fetchMore() {
    if (!this.hasMoreLogs) {
      return
    }

    const { from = 0, ...preFetchParams } = this.preFetchParams
    const params = {
      ...preFetchParams,
      from: from + preFetchParams.size,
    }

    const nextPageLogs = await this.request(params, {
      pendingMark: 'loadingMore',
    })

    const nextPageRecords = get(nextPageLogs, 'query.records') || []

    this.records = [...this.records, ...nextPageRecords]

    return nextPageRecords
  }

  // 简单的轮询获取日志
  @action
  watchNewLogs({
    pollingInterval = 5000,
    maxLogFetchCount = 50,
    startCollectTime = Date.now(),
  } = {}) {
    const { end_time, start_time, ...preParams } = this.preFetchParams || {}
    const now = Date.now()

    this.pollingTimer = setTimeout(async () => {
      const pollingStore = new LogDetailStore()

      await pollingStore.fetch({
        ...preParams,
        from: 0,
        sort: 'asc',
        end_time: now,
        start_time: startCollectTime,
        size: maxLogFetchCount,
      })

      const nextPageRecords = get(pollingStore, 'records') || []

      this.records = [...nextPageRecords.reverse(), ...this.records]

      while (pollingStore.hasMoreLogs) {
        this.records = [
          ...(await pollingStore.fetchMore()).reverse(),
          ...this.records,
        ]
      }

      this.watchNewLogs({
        startCollectTime: now,
        maxLogFetchCount,
        pollingInterval,
      })
    }, pollingInterval)
  }

  stopWatchNewLogs() {
    clearTimeout(this.pollingTimer)
  }

  /**
   * 获取一条日志的上下文
   *
   *  */
  async fetchContext({ targetLog, size }) {
    const { log, time, container, pod, namespace } = targetLog
    const timestamp = +new Date(time)

    /** 获取这条日志之后的日志，开始时间这条日志的时间，结束时间为现在，并且排序为正序，这条日志在里面 */
    const nextContext = await this.request({
      start_time: timestamp,
      end_time: Date.now(),
      namespaces: namespace,
      containers: container,
      pods: pod,
      size,
      sort: 'asc',
    })

    const nextContextLogs = get(nextContext, 'query.records') || []

    const index = nextContextLogs.findIndex(
      contextLog => contextLog.time === time && contextLog.log === log
    )

    // 获取之前的日志，时间为0，结束时间为这条日志的时间减一，日志的size做一个处理，防止上文获取的日志是第N条，浪费带宽
    const preContext = await this.request({
      start_time: 0,
      end_time: timestamp - 1,
      namespaces: namespace,
      containers: container,
      pods: pod,
      size: size / 2 - index,
      sort: 'desc',
    })

    const preContextLogs = (get(preContext, 'query.records') || []).reverse()

    this.context = [...preContextLogs, ...nextContextLogs]
  }
}
