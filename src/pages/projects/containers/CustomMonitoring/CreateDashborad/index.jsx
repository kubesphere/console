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
import { MD5 } from 'object-hash'
import CustomMonitoringModal from 'components/Modals/CustomMonitoring'
import CustomMonitoringTemplate from 'stores/monitoring/custom/template'

export default class CrateDashboardModalContainer extends React.Component {
  constructor(props) {
    super(props)

    /**
     * store custom monitor data make it ease to change and test
     */
    this.store = new CustomMonitoringTemplate({
      title: 'New Custom Monitor Template',
      namespace: props.namespace,
      description: 'Custom Monitor Description',
      isEditing: true,
      refresh: '',
    })
  }

  onSave = async () => {
    const params = this.store.toJS()
    this.props.onSave({
      name: MD5({ ...params, time: Date.now() }),
      ...params,
    })
  }

  render() {
    return (
      <CustomMonitoringModal
        store={this.store}
        isSaving={this.props.isSubmitting}
        onCancel={this.props.onCancel}
        onSave={this.onSave}
      />
    )
  }
}
