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
import { observer } from 'mobx-react'

import EditForm from '../EditForm'
import Environments from '../../ContainerSettings/ContainerForm/Environments'

@observer
export default class ContainerImages extends Component {
  handleSubmit = data => {
    const { index, onEdit } = this.props
    onEdit({ index, data })
  }

  render() {
    const { formData, clusters, namespace } = this.props

    const title = (
      <span>{`${t('ENVIRONMENT_VARIABLE_PL')}: ${(formData.env || [])
        .map(item => item.name)
        .join(', ') || t('NONE')}`}</span>
    )

    return (
      <EditForm {...this.props} title={title} onOk={this.handleSubmit}>
        <Environments
          checkable={false}
          isFederated={true}
          namespace={namespace}
          projectDetail={{ clusters }}
        />
      </EditForm>
    )
  }
}
