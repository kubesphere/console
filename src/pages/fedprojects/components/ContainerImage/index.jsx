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
import { get, omit } from 'lodash'

import { observer } from 'mobx-react'

import EditForm from 'components/Forms/Workload/ClusterDiffSettings/EditForm'
import ContainerSetting from '../ContainerSetting'

@observer
export default class ContainerImages extends Component {
  handleSubmit = data => {
    const { index, containerType, onEdit } = this.props
    onEdit({ index, containerType, data: omit(data, 'type') })
  }

  render() {
    const { cluster, namespace, formData, containerType, isEdit } = this.props
    const limitRanges = get(formData, 'resources')

    return (
      <EditForm
        {...this.props}
        title={<span>{`${t('IMAGE')}: ${formData.image}`}</span>}
        onOk={this.handleSubmit}
      >
        <ContainerSetting
          data={formData}
          cluster={cluster}
          namespace={namespace}
          limitRanges={limitRanges}
          defaultContainerType={containerType}
          isEdit={isEdit}
        />
      </EditForm>
    )
  }
}
