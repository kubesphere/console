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

import React from 'react'
import { observer, inject } from 'mobx-react'
import { computed } from 'mobx'

import TextPanelListEditor from '../components/TextPanelList'

@inject('monitoringStore', 'modalStore')
@observer
export default class TextContainer extends React.Component {
  @computed
  get monitoringStore() {
    return this.props.monitoringStore
  }

  @computed
  get modalStore() {
    return this.props.modalStore
  }

  @computed
  get textMonitorsRow() {
    return this.monitoringStore.textMonitors
  }

  @computed
  get monitors() {
    return this.textMonitorsRow.monitors
  }

  /**
   * format monitor metrics make it eazy to render
   */
  @computed
  get textMonitorData() {
    return this.monitors.map(monitor => {
      const { title, id } = monitor.config || {}
      return {
        title,
        id,
        value: monitor.stat,
        errorMessage: monitor.errorMessage,
      }
    })
  }

  /**
   * monitor the template change
   */
  componentDidMount() {
    this.monitors.forEach(monitor => monitor.monitoring(this.monitoringStore))
  }

  componentWillUnmount() {
    this.monitors.forEach(monitor => monitor.stopMonitoring())
  }

  componentDidUpdate() {
    this.monitors.forEach(monitor => monitor.monitoring(this.monitoringStore))
  }

  handleDelete = index => {
    this.monitors[index].stopMonitoring()
    this.textMonitorsRow.deleteTextMonitorByIndex(index)
  }

  handleEdit = index => {
    const selectMonitor = this.textMonitorsRow.monitors[index]
    this.props.modalStore.selectMonitor(selectMonitor)
  }

  handleAdd = () => {
    const newMonitor = this.monitoringStore.generateNewTextMonitor()
    this.modalStore.selectMonitor(newMonitor)
  }

  handleSort = sortMonitors => {
    const monitors = sortMonitors.map(({ monitor }) => monitor)
    this.textMonitorsRow.updateMonitors(monitors)
  }

  render() {
    const { isEditing } = this.props.monitoringStore
    const textMonitorData = this.textMonitorData
    const textPanels = textMonitorData
    const monitors = this.monitors.map(monitor => ({ monitor }))

    return (
      <TextPanelListEditor
        isEditing={isEditing}
        monitors={monitors}
        textPanels={textPanels}
        onSort={this.handleSort}
        onDelete={this.handleDelete}
        onEdit={this.handleEdit}
        onAdd={this.handleAdd}
      />
    )
  }
}
