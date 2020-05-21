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
import BasicFormModal from 'src/pages/projects/components/Modals/CustomMonitorBasic'
import CustomMonitoringModal from 'components/Modals/CustomMonitoring'
import CustomMonitoringTemplate from 'stores/monitoring/custom/template'
import tempalteSettings from 'stores/monitoring/custom/template.json'

export default class CrateDashboardModalContainer extends React.Component {
  state = {
    finishBasis: false,
  }

  onSave = async () => {
    this.props.onSave(this.store.toJS())
  }

  handleBasicConfirm = ({ name, description, panels = '' }) => {
    const { settings } = tempalteSettings[panels] || {}

    this.store = new CustomMonitoringTemplate({
      namespace: this.props.namespace,
      description,
      isEditing: true,
      name,
      ...settings,
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
      image: '/assets/prometheus@2x.png',
      label: t('Custom'),
      description: t('SERVICE_BUILT_INTERFACE'),
    })

  nameValidator = async (rule, value, callback) => {
    if (!value) {
      return callback()
    }

    const { exist } =
      (await this.props.checkName({
        name: value,
      })) || {}

    if (exist) {
      return callback({ message: t('Name exists'), field: rule.field })
    }
    callback()
  }

  render() {
    const { finishBasis } = this.state

    if (finishBasis) {
      return (
        <CustomMonitoringModal
          store={this.store}
          isSaving={this.props.isSubmitting}
          onCancel={this.props.onCancel}
          onSave={this.onSave}
        />
      )
    }

    return (
      <BasicFormModal
        data={{}}
        nameValidator={this.nameValidator}
        onCancel={this.props.onCancel}
        templateOpts={this.tempalteSettingsOpts}
        onOk={this.handleBasicConfirm}
      />
    )
  }
}
