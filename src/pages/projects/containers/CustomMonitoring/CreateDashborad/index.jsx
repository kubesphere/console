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
import { get, isArray } from 'lodash'
import CustomMonitoringModal from 'components/Modals/CustomMonitoring'
import CustomMonitoringTemplate from 'stores/monitoring/custom/template'
import tempalteSettings from 'stores/monitoring/custom/template.json'
import CreateModal from 'components/Modals/Create'
import FORM_STEPS from 'configs/steps/dashborads'
import { MODULE_KIND_MAP } from 'utils/constants'
import FORM_TEMPLATES from 'utils/form.templates'

export default class CrateDashboardModalContainer extends React.Component {
  state = {
    finishBasis: false,
  }

  onSave = async () => {
    this.props.onSave(this.store.toJS())
  }

  handleBasicConfirm = params => {
    const { cluster } = this.props
    const kind = MODULE_KIND_MAP[this.props.store.module]
    const config = isArray(params) ? params[0] : params[kind]

    this.store = new CustomMonitoringTemplate({
      isEditing: true,
      name: get(config, 'metadata.name'),
      namespace: get(config, 'metadata.namespace'),
      description: get(config, 'spec.description'),
      cluster,
      ...config.spec,
    })

    this.setState({ finishBasis: true })
  }

  tempalteSettingsOpts = Object.entries(tempalteSettings)
    .map(([key, configs]) => ({
      value: key,
      image: configs.logo,
      label: configs.name,
      description: configs.description,
    }))
    .concat({
      value: '-',
      image: '/assets/prometheus.svg',
      label: t('Custom'),
      description: t('SERVICE_BUILT_INTERFACE'),
    })

  render() {
    const { finishBasis } = this.state
    const { cluster, namespace, store } = this.props
    const { module } = store
    const kind = MODULE_KIND_MAP[module]
    const formTemplate = {
      [kind]: FORM_TEMPLATES[module]({
        namespace,
      }),
    }

    if (finishBasis) {
      return (
        <CustomMonitoringModal
          store={this.store}
          cluster={cluster}
          isSaving={this.props.isSubmitting}
          onCancel={this.props.onCancel}
          onSave={this.onSave}
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
        store={this.props.store}
        onOk={this.handleBasicConfirm}
        onCancel={this.props.onCancel}
      />
    )
  }
}
