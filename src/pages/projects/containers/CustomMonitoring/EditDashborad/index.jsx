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
import CustomMonitoringModal from 'components/Modals/CustomMonitoring'
import CustomMonitoringTemplate from 'stores/monitoring/custom/template'

export default class EditDashboardModalContainer extends React.Component {
  constructor(props) {
    super(props)

    /**
     * store custom monitor data make it ease to change and test
     */
    const { metadata = {}, spec = {} } = props.data
    const {
      title,
      description,
      refresh,
      panels,
      datasource,
      templatings,
      time,
    } = spec

    const { namespace, name } = metadata

    this.store = new CustomMonitoringTemplate({
      title,
      cluster: props.cluster,
      namespace,
      description,
      refresh,
      isEditing: false,
      panels,
      datasource,
      templatings,
      time,
      name,
      formTemplate: props.data,
    })
  }

  handleOk = async () => {
    const params = this.store.toJS()
    await this.props.onOk(params)
    this.store.switchEditingMode(false)
  }

  render() {
    const { cluster, readOnly, isSubmitting, onCancel } = this.props
    return (
      <CustomMonitoringModal
        store={this.store}
        cluster={cluster}
        readOnly={readOnly}
        isSubmitting={isSubmitting}
        onCancel={onCancel}
        onOk={this.handleOk}
      />
    )
  }
}
