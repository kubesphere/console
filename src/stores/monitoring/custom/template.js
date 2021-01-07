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

import { get, set, omit } from 'lodash'
import { observable, action, computed, toJS } from 'mobx'
import moment from 'moment-mini'

import { CreateUidFactory } from 'utils/monitoring'
import { getMsFromTimeAlias } from 'utils/time'
import { MONITOR_GRAPH_COLORS } from 'utils/constants'

import Monitor, { MONITOR_PANEL_TYPE } from './monitor'
import SinglestateMonitor from './singlestat'
import GraphMonitor from './graph'
import MonitorRow from './row'

const DATASOURCE = 'prometheus'
const DAFAULT_TIME = { from: 'now-30m', to: 'now' }

const MONITOR_MAP = {
  graph: GraphMonitor,
  signlestat: SinglestateMonitor,
}

export default class CustomMonitoringTemplate {
  @observable title = ''

  @observable refresh = ''

  /**
   * monitoring timeRange
   */
  @observable time = { from: 'now', to: 'now' }

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

  /**
   * refresh timestamp convenient for use
   */
  @computed
  get refreshMs() {
    return this.refresh ? getMsFromTimeAlias(this.refresh) : 0
  }

  /**
   * format time to Moment instance
   */
  @computed
  get timeRange() {
    const { from, to } = this.time
    return {
      from: moment(this.parseGrafanaTime(from)),
      to: moment(this.parseGrafanaTime(to)),
    }
  }

  getTimeRange() {
    const { from, to } = this.time
    return {
      from: moment(this.parseGrafanaTime(from)),
      to: moment(this.parseGrafanaTime(to)),
    }
  }

  @observable isEditing = false

  /**
   * singlestat row which store singlestat monitors
   */
  @observable
  textMonitors = {}

  unNameGraphRow = new MonitorRow({ config: { id: 0 } })

  /**
   * row list which store name row
   */
  @observable
  graphMonitorRows = []

  @observable
  targetsMetadata = []

  constructor({
    title = '',
    cluster = '',
    namespace = '' /** require */,
    datasource = DATASOURCE /** now ks only support prometheus */,
    description = '',
    panels = [],
    templatings = [],
    time = DAFAULT_TIME,
    isEditing = false,
    refresh = '',
    name = '',
    formTemplate,
  }) {
    this.title = title
    this.cluster = cluster
    this.namespace = namespace
    this.datasource = datasource
    this.description = description
    this.panels = panels
    this.templatings = templatings
    this.time = time
    this.refresh = refresh
    this.name = name
    this.formTemplate = formTemplate

    this.isEditing = isEditing

    /**
     * hack for grafana panels to ks panels which has side effect
     */
    this.generateMonitorList()
    this.uidFactory = CreateUidFactory(this.panels.map(panel => panel.id))
  }

  @action
  changeTitle = title => {
    this.title = title
  }

  @action
  changeRefreshInterval(refresh) {
    this.refresh = refresh
  }

  @action
  changeTimeRange({ from, to }) {
    this.time.from = from
    this.time.to = to
  }

  @action
  switchEditingMode(isEditing) {
    this.isEditing = isEditing
  }

  changeModeToEditing() {
    this.switchEditingMode(true)
    return this
  }

  @action
  generateMonitorList() {
    /**
     * group panel
     */
    const { textPanels, otherPanels } = this.panels.reduce(
      (panelGroup, panel) => {
        const panelTargetGroup =
          panel.type === MONITOR_PANEL_TYPE.TEXT ? 'textPanels' : 'otherPanels'
        panelGroup[panelTargetGroup].push(panel)
        return panelGroup
      },
      {
        textPanels: [],
        otherPanels: [],
      }
    )

    this.textMonitors = this.generateTextMonitors(textPanels)

    const { unNameGraphRow, graphRows } = this.gennerateGraphMonitorRows(
      otherPanels
    )

    this.unNameGraphRow = unNameGraphRow
    this.graphMonitorRows = graphRows
  }

  generateTextMonitors(panels) {
    const monitors = panels.map(
      panel =>
        new SinglestateMonitor({
          ...panel,
          namespace: this.namespace,
          cluster: this.cluster,
        })
    )
    return new MonitorRow({ monitors })
  }

  /**
   *
   * @param {array} panels
   * @returns [{
   *  type: 'row', _graphsMonitors: array, ...othermetris
   * }]
   */
  gennerateGraphMonitorRows(panels) {
    const [unNameGraphRow, ...graphRows] = panels.reduce(
      (rows, panel) => {
        if (panel.type === MONITOR_PANEL_TYPE.ROW) {
          return [...rows, new MonitorRow({ config: panel })]
        }

        const Constructor = MONITOR_MAP[panel.type] || Monitor
        const monitor = new Constructor({
          ...panel,
          namespace: this.namespace,
          cluster: this.cluster,
        })
        const lastRow = rows.pop()
        lastRow.push(monitor)
        return [...rows, lastRow]
      },
      [this.unNameGraphRow]
    )

    return {
      unNameGraphRow,
      graphRows,
    }
  }

  addNewRow() {
    this.graphMonitorRows.push(
      new MonitorRow({
        config: {
          id: this.uidFactory.generateUID(),
          title: 'New Row',
          type: 'row',
        },
      })
    )
  }

  generateNewTextMonitor() {
    const monitor = new SinglestateMonitor({
      id: this.uidFactory.generateUID(),
      title: '',
      format: 'none',
      type: 'singlestat',
      decimals: 0,
      namespace: this.namespace,
      cluster: this.cluster,
      valueName: 'last',
      targets: [
        {
          expr: '',
        },
      ],
    })
    monitor.belong(this.textMonitors)
    return monitor
  }

  generatGraphMonitor({ bars, lines }) {
    const monitor = new GraphMonitor({
      id: this.uidFactory.generateUID(),
      type: 'graph',
      title: '',
      lines,
      bars,
      description: '',
      namespace: this.namespace,
      cluster: this.cluster,
      stack: false,
      targets: [
        {
          expr: '',
          legendFormat: '',
          step: '1m',
          refId: 1,
        },
      ],
      yaxes: [
        {
          format: 'none',
          decimals: 0,
        },
      ],
      colors: MONITOR_GRAPH_COLORS[0].colors,
    })
    monitor.belong(this.unNameGraphRow)
    return monitor
  }

  generatTableMonitor() {
    const monitor = new Monitor({
      id: this.uidFactory.generateUID(),
      title: '',
      format: 'none',
      type: 'graph',
      decimals: 0,
      namespaces: this.namespace,
      cluster: this.cluster,
      targets: [
        {
          expr: '',
        },
      ],
    })
    monitor.belong(this.unNameGraphRow)
    return monitor
  }

  /**
   * @param {string} time
   * @return {number} - timestamp
   */
  parseGrafanaTime(time) {
    const isGrafanaTime = this.isGrafanaTimeFormat(time)
    if (isGrafanaTime) {
      const subtractTime = time.replace(/now-?/, '')
      const passTime = getMsFromTimeAlias(subtractTime)
      return Date.now() - passTime
    }
    return new Date(time).valueOf()
  }

  isGrafanaTimeFormat(time = '') {
    return time.match(/^now$|^now-(\d+[smhd])$/)
  }

  async fetchMetadata() {
    const { data: targetsMetadata } = (await request.get(
      `kapis/monitoring.kubesphere.io/v1alpha3${this.getPath({
        cluster: this.cluster,
        namespace: this.namespace,
      })}/targets/metadata`
    )) || { data: [] }
    this.targetsMetadata = targetsMetadata || []
  }

  toJS() {
    const { textMonitors, unNameGraphRow, graphMonitorRows } = this

    const unRowPanels = [
      ...unNameGraphRow.monitors,
      ...textMonitors.monitors,
    ].map(monitor => omit(toJS(monitor.config), ['cluster', 'namespace']))

    const inRowPanels = graphMonitorRows.reduce((panels, row) => {
      const monitorConfigs = row.monitors.map(monitor =>
        omit(toJS(monitor.config), ['cluster', 'namespace'])
      )
      return panels.concat(row.config, monitorConfigs)
    }, [])

    set(
      this.formTemplate,
      'spec',
      Object.assign(get(this.formTemplate, 'spec', {}), {
        title: this.title,
        templatings: this.templatings,
        refresh: this.refresh,
        time: toJS(this.time),
        panels: [...unRowPanels, ...inRowPanels],
      })
    )

    return this.formTemplate
  }
}
