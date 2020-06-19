import { observable, action } from 'mobx'
import { assign, get } from 'lodash'
import { to } from 'utils'
import moment from 'moment-mini'
import stripAnsi from 'strip-ansi'

export default class EventSearchStore {
  @observable
  isLoading = true

  @observable
  histogramTodayData = {}

  @observable
  histogramData = {}

  @observable
  interval = '30m'

  @observable
  data = []

  @observable
  from = 0

  @observable
  total = 0

  @observable
  size = 10

  @observable
  namespaces = []

  @observable
  logsCount = 0

  constructor(state = {}) {
    Object.getOwnPropertyNames(state).forEach(prop => {
      this[prop] = state[prop]
    })
  }

  fetchUrl(cluster) {
    return cluster
      ? `kapis/clusters/${cluster}/tenant.kubesphere.io/v1alpha2/auditing/events`
      : 'kapis/tenant.kubesphere.io/v1alpha2/auditing/events'
  }

  @action
  changeTimeRang = time => {
    this.time_rang = time
    this.fetchQuery()
  }

  @action
  async fetchTodayHistogram({ cluster, ...params } = {}) {
    this.isLoading = true

    const defaultParams = {
      operation: 'statistics',
      start_time: Math.ceil(
        moment()
          .startOf('day')
          .valueOf() / 1000
      ),
      end_time: Math.ceil(Date.now() / 1000),
      interval: this.interval,
    }

    const { statistics = {} } = await to(
      request.get(this.fetchUrl(cluster), assign(defaultParams, params))
    )

    this.isLoading = false

    this.histogramTodayData = statistics
  }

  @action
  async fetchHistogram({ cluster, ...params } = {}) {
    this.isLoading = true

    const defaultParams = {
      operation: 'histogram',
      start_time: Math.ceil(Date.now() / 1000) - 60 * 60 * 12,
      end_time: Math.ceil(Date.now() / 1000),
      interval: this.interval,
    }

    const { histogram = {} } = await to(
      request.get(this.fetchUrl(cluster), assign(defaultParams, params))
    )

    this.logsCount = histogram.total || 0

    this.isLoading = false

    this.histogramData = histogram
  }

  @action
  async fetchQuery({ cluster, ...params } = {}, options = {}) {
    this.isLoading = true

    const defaultParams = {
      operation: 'query',
      from: this.from,
      size: this.size,
    }

    const queryParams = assign(defaultParams, params)

    const resp = await to(request.get(this.fetchUrl(cluster), queryParams))

    const query = get(resp, 'query', {})

    const records = this.stripAnsiRecords(query.records || [])

    this.data = options.loadMore ? this.data.concat(records) : records

    this.total = query.total || 0

    this.isLoading = false

    this.from = queryParams.from

    this.size = queryParams.size

    this.preParams = queryParams
  }

  stripAnsiRecords(records = []) {
    return records.map(record => ({
      ...record,
      logStripANSI: stripAnsi(record.log),
    }))
  }
}
