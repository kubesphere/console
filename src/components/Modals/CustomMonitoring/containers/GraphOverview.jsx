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

import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { computed } from 'mobx'

import GraphList from './GraphList'
import GraphRowsEditor from './GraphRowsEditor'
import GraphOverviewLayout from '../components/GraphOverviewLayout'

import GraphRows from '../components/GraphRows'

@inject('monitoringStore')
@observer
export default class GraphOverview extends Component {
  @computed
  get monitoringStore() {
    return this.props.monitoringStore
  }

  @computed
  get graphMonitorRows() {
    return this.monitoringStore.graphMonitorRows
  }

  @computed
  get unNameGraphRowMonitors() {
    return this.monitoringStore.unNameGraphRow.monitors
  }

  @computed
  get monitorsInRows() {
    return this.graphMonitorRows.reduce(
      (monitors, row) => [...monitors, ...row.monitors],
      []
    )
  }

  @computed
  get allMonitors() {
    return [...this.unNameGraphRowMonitors, ...this.monitorsInRows]
  }

  componentDidMount() {
    this.allMonitors.forEach(monitor =>
      monitor.monitoring(this.monitoringStore)
    )
  }

  componentWillUnmount() {
    this.allMonitors.forEach(monitor => {
      monitor.stopMonitoring()
      monitor.clearMonitorMetrics()
    })
  }

  render() {
    const { isEditing } = this.props.monitoringStore

    return (
      <GraphOverviewLayout
        graphList={
          <GraphList
            rows={[
              this.monitoringStore.unNameGraphRow,
              ...this.graphMonitorRows,
            ]}
            monitos={this.allMonitors}
          />
        }
        graphRowList={isEditing ? <GraphRowsEditor /> : this.renderGraphRows()}
      />
    )
  }

  monitorStatFactory(monitor) {
    return {
      id: monitor.config.id,
      title: monitor.config.title,
      metrics: monitor.stats.map(stat => ({
        title: stat.name,
        id: stat.id,
        color: stat.color,
        value: stat.stat,
      })),
    }
  }

  renderGraphRows() {
    const unNameRowStat = [
      {
        id: 0,
        hideTitle: true,
        panels: this.unNameGraphRowMonitors.map(this.monitorStatFactory, this),
      },
    ]

    const rowsStat = this.graphMonitorRows.map(row => ({
      title: row.config.title,
      id: row.config.id,
      panels: row.monitors.map(this.monitorStatFactory, this),
    }))

    return (
      <>
        <GraphRows rows={unNameRowStat} />
        <GraphRows rows={rowsStat} />
      </>
    )
  }
}
