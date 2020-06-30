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

import { observable, action, computed, extendObservable } from 'mobx'
import moment from 'moment-mini'
import { PATTERN_NAME } from 'utils/constants'

const START_TIME = '_startTIme'
// Symbol('startTime')
const END_TIME = '_endTIme'
// Symbol('endTime')

/**
 * an abstract class for handle common elastic search logic
 */
export default class LoggingStore {
  /**
   * {number} count
   * {string} unit - one of ['Seconds', 'Minutes', 'Hours', 'Days']
   * eg: {count: 0, unit: 'Seconds'}
   */
  @observable
  recent = null

  @observable
  isLoading = false

  supportQueryFields = [
    {
      key: 'log_query',
      des: t('LOG_KEY_WORDS'),
    },
    {
      key: 'namespaces',
      des: t('Project Name'),
      valueRegex: PATTERN_NAME,
    },
    {
      key: 'workloads',
      des: t('Workload Name'),
      valueRegex: PATTERN_NAME,
    },
    {
      key: 'pods',
      des: t('Pod Name'),
      valueRegex: PATTERN_NAME,
    },
    {
      key: 'containers',
      des: t('Container Name'),
      valueRegex: PATTERN_NAME,
    },
  ]

  constructor({ startTime = 0, endTime = 0, recent, ...state } = {}) {
    Object.getOwnPropertyNames(state).forEach(prop => {
      this[prop] = state[prop]
    })

    extendObservable(this, {
      [START_TIME]: 0,
      [END_TIME]: 0,
    })

    /** 指定具体时间跟，最近一段时间分开处理 */
    recent
      ? this.setTimeRangeWithRecent(recent)
      : this.setTimeRangeDirect({ startTime, endTime })
  }

  // 指定最近多长时间
  @action
  setTimeRangeWithRecent({ count = 0, unit = 'Seconds' }) {
    this[START_TIME] = 0
    this[END_TIME] = 0
    this.recent = { count, unit }
  }

  // 指定具体时间
  @action
  setTimeRangeDirect({ startTime = 0, endTime = 0 }) {
    this.recent = null
    this[START_TIME] = startTime
    this[END_TIME] = endTime
  }

  // 返回一个具体时间段
  @computed
  get timeRange() {
    const startTime = this[START_TIME]
    const endTime = this[END_TIME]
    return this.recent
      ? this.getTimeFormRecent(this.recent)
      : { startTime, endTime }
  }

  getTimeRange() {
    return this.recent
      ? this.getTimeFormRecent(this.recent)
      : { startTime: this[START_TIME], endTime: this[END_TIME] }
  }

  getTimeFormRecent({ count = 0, unit = 'Seconds' }) {
    const startTime = moment().subtract(count, unit)

    return {
      startTime: startTime.valueOf(),
      endTime: Date.now(),
    }
  }

  get apiVersion() {
    return 'kapis/logging.kubesphere.io/v1alpha2'
  }

  /** 用于拼接API的filter */
  get encodedPathParams() {
    const pathParams = Object.entries(this.pathParams)
      .reduce((path, param) => {
        const [key, value] = param
        return path.concat(value ? [key, value] : [])
      }, [])
      .join('/')

    return pathParams
  }

  get apiPath() {
    const encodedPathParams = this.encodedPathParams

    return encodedPathParams
      ? `${this.apiVersion}/${encodedPathParams}`
      : this.clusterLogAPI
  }

  get clusterLogAPI() {
    return 'kapis/tenant.kubesphere.io/v1alpha2/logs'
  }

  /**
   * @param {field[]} fields - list of supportQueryFields
   * @param {string} filed.key - filed in supportQueryList
   * @param {string} filed.value - value query value
   * @return {object} a dict contains all queryFields
   */
  formatQueryFields(fields = []) {
    return fields.reduce((dict, { key, value }) => {
      const preValue = dict[key] || []
      return {
        ...dict,
        [key]: [].concat(preValue, value).join(','),
      }
    }, {})
  }

  /**
   * A method to send request which format by formatQueryFields
   */
  search(opts, fields = []) {
    const queryDict = this.formatQueryFields(fields)
    return this.fetch({
      ...queryDict,
      ...opts,
    })
  }

  @action
  clearPreParams() {
    this.preFetchParams = {}
  }

  /**
   * update isLoading props and request logging result with time range
   * @param {object} params - request params
   * @param {string} method - request method
   * @return {object} - api success response
   */
  @action
  async request(
    params = {},
    {
      method = 'get',
      path = this.clusterLogAPI,
      pendingMark = 'isLoading',
    } = {}
  ) {
    this[pendingMark] = true

    const { startTime, endTime } = this.timeRange

    const requestParams = {
      operation: this.operation,
      start_time: startTime,
      end_time: endTime,
      ...params,
    }

    const res = await request[method](path, requestParams)

    this[pendingMark] = false
    this.preFetchParams = requestParams

    return res
  }
}
