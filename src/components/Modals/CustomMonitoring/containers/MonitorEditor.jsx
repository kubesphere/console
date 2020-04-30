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

import FormContainer from '../components/FormContainer'
import TextMonitorForm from './TextMonitorForm'
import GraphMonitorForm from './GraphMonitorForm'
import TableMonitorForm from './TableMonitorForm'

const FormMap = {
  singlestat: TextMonitorForm,
  graph: GraphMonitorForm,
  table: TableMonitorForm,
}

@inject('modalStore', 'monitoringStore')
@observer
export default class MonitorEditor extends Component {
  @computed
  get monitor() {
    const { modalStore } = this.props
    const { selectedMonitor } = modalStore
    return selectedMonitor
  }

  @computed
  get isNewMonitor() {
    const selectedMonitor = this.monitor
    const monitorRow = selectedMonitor.belongTo
    return !monitorRow.has(selectedMonitor)
  }

  temporaryMonitor = this.getTemporaryMonitor()

  getTemporaryMonitor() {
    return this.isNewMonitor ? this.monitor : this.monitor.clone()
  }

  componentDidMount() {
    this.temporaryMonitor.monitoring(this.props.monitoringStore)
  }

  componentWillUnmount() {
    this.temporaryMonitor.stopMonitoring()
  }

  handleCancel = () => {
    this.props.modalStore.unSelectMonitor()
  }

  handleSubmit = () => {
    this.isNewMonitor
      ? this.monitor.belongTo.push(this.temporaryMonitor)
      : (this.monitor.config = this.temporaryMonitor.config)

    this.props.modalStore.unSelectMonitor()
  }

  render() {
    const Form = FormMap[this.monitor.type]

    return (
      <FormContainer
        formData={this.temporaryMonitor.config}
        onSubmit={this.handleSubmit}
        onCancel={this.handleCancel}
      >
        {Form ? (
          <Form monitor={this.temporaryMonitor} />
        ) : (
          t('MONITOR_TYPE_NO_SUPPORT')
        )}
      </FormContainer>
    )
  }
}
