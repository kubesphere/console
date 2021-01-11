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
import { get } from 'lodash'
import CustomMonitoringModal from 'components/Modals/CustomMonitoring'
import CustomMonitoringTemplate from 'stores/monitoring/custom/template'
import CreateModal from 'components/Modals/Create'
import FORM_STEPS from 'configs/steps/dashborads'

export default class CreateDashboardModalContainer extends React.Component {
  state = {
    finishBasis: false,
  }

  handleOk = async () => {
    this.props.onOk(this.store.toJS())
  }

  handleBasicConfirm = params => {
    const { cluster, namespace } = this.props
    this.store = new CustomMonitoringTemplate({
      cluster,
      namespace,
      formTemplate: params,
      name: get(params, 'metadata.name'),
      description: get(
        params,
        'metadata.annotations["kubesphere.io/description"]'
      ),
      isEditing: true,
      ...params.spec,
    })

    this.setState({ finishBasis: true })
  }

  render() {
    const { finishBasis } = this.state
    const {
      cluster,
      namespace,
      formTemplate,
      isSubmitting,
      onCancel,
      store,
    } = this.props
    const { module } = store

    if (finishBasis) {
      return (
        <CustomMonitoringModal
          store={this.store}
          cluster={cluster}
          onOk={this.handleOk}
          onCancel={onCancel}
          isSubmitting={isSubmitting}
        />
      )
    }

    return (
      <CreateModal
        visible
        module={module}
        name="CUSTOM_MONITORING_DASHBOARD"
        cluster={cluster}
        namespace={namespace}
        formTemplate={formTemplate}
        steps={FORM_STEPS}
        store={store}
        onOk={this.handleBasicConfirm}
        onCancel={onCancel}
        okBtnText={t('Next')}
      />
    )
  }
}
