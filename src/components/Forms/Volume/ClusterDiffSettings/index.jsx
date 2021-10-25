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
import { get, keyBy } from 'lodash'
import { MODULE_KIND_MAP } from 'utils/constants'

import { Form } from '@kube-design/components'

import ClustersMapper from 'components/Forms/Workload/ClusterDiffSettings/ClustersMapper'
import VolumeSettings from './VolumeSettings'

export default class AdvancedSettings extends React.Component {
  get namespace() {
    return get(this.formTemplate, 'metadata.namespace')
  }

  get formTemplate() {
    const { formTemplate, module } = this.props
    return get(formTemplate, MODULE_KIND_MAP[module], formTemplate)
  }

  get clusters() {
    return get(this.formTemplate, 'spec.placement.clusters', [])
  }

  render() {
    const {
      formRef,
      projectDetail,
      editModalTitle,
      title,
      formProps,
    } = this.props
    const clustersDetail = keyBy(projectDetail.clusters, 'name')
    return (
      <Form data={this.formTemplate.spec} ref={formRef} {...formProps}>
        <Form.Group
          label={t('STORAGE_SETTINGS')}
          desc={t('CLUSTER_VOLUME_DIFF_DESC')}
          checkable
        >
          <ClustersMapper
            clusters={this.clusters}
            clustersDetail={clustersDetail}
            namespace={this.namespace}
          >
            {props => (
              <VolumeSettings
                {...props}
                formTemplate={this.formTemplate}
                editModalTitle={editModalTitle}
                title={title}
                {...formProps}
              />
            )}
          </ClustersMapper>
        </Form.Group>
      </Form>
    )
  }
}
