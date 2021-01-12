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

import { observable, computed, action, reaction, toJS } from 'mobx'
import { get, isString } from 'lodash'

export const MONITOR_PANEL_TYPE = {
  TEXT: 'singlestat',
  ROW: 'row',
  GRAPH: 'graph',
}

export default class PanelMonitor {
  get apiVersion() {
    return 'kapis/monitoring.kubesphere.io/v1alpha3'
  }

  /**
   * which row has this monitor
   */
  belongTo = null

  @observable
  errorMessage = ''

  @observable
  config = {}

  @observable
  metrics = []

  @observable
  timeRange = { start: 0, end: 0 }

  @computed
  get type() {
    return this.config.type
  }

  @computed
  get targets() {
    return this.config.targets || []
  }

  getPath({ cluster, namespace } = {}) {
    let path = ''
    if (cluster) {
      path += `/klusters/${cluster}`
    }
    if (namespace) {
      path += `/namespaces/${namespace}`
    }
    return path
  }

  get id() {
    return this.config.id
  }

  constructor(config) {
    /**
     * grafana template panel config
     */
    this.config = config
    this.requestID = 0
  }

  /**
   * monitoring template and config
   */
  monitoring = (template = this.template) => {
    if (this.isObserving) {
      return
    }
    this.isObserving = true

    this.pollingController = polling(
      () => {
        const { from, to } = template.getTimeRange()
        this.fetchMetrics({ start: from.valueOf(), end: to.valueOf() })
      },
      {
        interval: template.refreshMs,
      }
    )

    this.disposer = reaction(
      () => ({
        time: template.timeRange,
        refresh: template.refreshMs,
        exprs: this.config.targets.map(target => target.expr),
        steps: this.config.targets.map(target => target.step),
      }),
      ({ refresh }) => {
        this.metrics = this.metrics.map(metric => ({
          ...metric,
          values: [],
        }))
        this.pollingController && this.pollingController.stopPolling()
        this.pollingController = polling(
          () => {
            const { from: newFrom, to: newTo } = template.getTimeRange()

            this.fetchMetrics({
              start: newFrom.valueOf(),
              end: newTo.valueOf(),
            })
          },
          {
            interval: refresh,
          }
        )
      }
    )
  }

  @action
  clearMonitorMetrics() {
    this.metrics = []
  }

  @action
  fetchMetrics = async ({ start, end }) => {
    const { targets = [], cluster, namespace } = this.config

    this.timeRange = { start, end }

    const req = {
      ID: ++this.requestID,
      errorMessage: '',
      metrics: [],
    }

    try {
      const result = await Promise.all(
        targets.map(async target => {
          const { expr, step } = target
          const data = await this.fetchMetric({
            cluster,
            namespace,
            expr,
            step,
            start: parseInt(start / 1000, 10),
            end: parseInt(end / 1000, 10),
          })
          return { data, target }
        })
      )
      req.metrics = result.reduce((metrics, metricsGroup) => {
        const { data = [], target = {} } = metricsGroup
        const { expr, refId: targetID } = target

        const parsedMetrics = data.map(metricFromServer => {
          const { values = [], metric = {} } = metricFromServer
          const responseMetricID = parseExpr2GrafanaQuery(metric) || expr
          const metricID = `${targetID}.${responseMetricID}`

          return {
            values,
            metric,
            target,
            id: metricID,
            responseMetricID,
          }
        })

        return metrics.concat(parsedMetrics)
      }, [])
    } catch (err) {
      req.errorMessage = err.message
    } finally {
      if (req.ID === this.requestID) {
        this.metrics = req.metrics
        this.errorMessage = req.errorMessage
      }
    }
  }

  @computed
  get formattedMetrics() {
    return this.metrics.map(_metric => {
      const { target, metric, responseMetricID, ...rest } = _metric
      const { legendFormat } = target
      const name = generateLegendName(legendFormat, metric) || responseMetricID

      return {
        ...rest,
        name,
      }
    })
  }

  fetchMetric = async ({ expr, step, start, end, cluster, namespace }) => {
    if (!expr) {
      return []
    }

    const response =
      (await request.get(
        `${this.apiVersion}${this.getPath({
          cluster,
          namespace,
        })}/targets/query`,
        {
          expr,
          step,
          start,
          end,
        },
        null,
        (e, customError) => {
          throw new Error(customError.message)
        }
      )) || {}

    return get(response, 'data.result', [])
  }

  stopMonitoring = () => {
    this.isObserving = false
    this.pollingController && this.pollingController.stopPolling()
    this.disposer && this.disposer()
  }

  belong = row => {
    this.belongTo = row
    return this
  }

  clone() {
    return new this.constructor(toJS(this.config))
  }
}

/**
 * get grafana querystring
 */
function parseExpr2GrafanaQuery({ __name__, ...reset } = {}) {
  if (!__name__) {
    return JSON.stringify(reset || {})
  }

  const querys = Object.entries(reset || {}).map(
    ([key, value]) => `${key}="${value}"`
  )
  const queryParams = querys.length ? `{${querys.join(',')}}` : ''
  return `${__name__}${queryParams}`
}

function generateLegendName(legendFormat = '', metric = {}) {
  if (isString(legendFormat)) {
    return legendFormat.replace(
      /\{\{(.*?)\}\}/g,
      (noop, match) => metric[match]
    )
  }
}

function polling(task, options) {
  const exports = {
    timer: null,
    stopPolling() {
      clearTimeout(exports.timer)
    },
  }

  task()

  const cycle = function() {
    if (options.interval) {
      exports.timer = setTimeout(() => {
        task()
        cycle()
      }, options.interval)
    }
  }
  cycle()

  return exports
}
