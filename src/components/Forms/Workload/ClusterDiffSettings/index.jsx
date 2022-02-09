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

import ClustersMapper from './ClustersMapper'
import ContainersMapper from './ContainersMapper'
import ContainerImage from './ContainerImage'
import ContainerPorts from './ContainerPorts'
import Environments from './Environments'
import VolumesMapper from './VolumesMapper'
import VolumeTemplate from './VolumeTemplate'

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

  get showVolumeTemplate() {
    return (
      this.props.module === 'statefulsets' &&
      get(this.formTemplate, 'spec.template.spec.volumeClaimTemplates')
    )
  }

  render() {
    const { formRef, projectDetail, withService, supportGpuSelect } = this.props
    const clustersDetail = keyBy(projectDetail.clusters, 'name')
    return (
      <Form data={this.formTemplate} ref={formRef}>
        <Form.Group
          label={t('CONTAINER_SETTINGS')}
          desc={t('CLUSTER_DIFF_CONTAINER_SETTINGS_DESC')}
          checkable
        >
          <ClustersMapper
            clusters={this.clusters}
            clustersDetail={clustersDetail}
            namespace={this.namespace}
          >
            {props => (
              <ContainersMapper formTemplate={this.formTemplate} {...props}>
                {containerProps => (
                  <ContainerImage
                    supportGpuSelect={supportGpuSelect}
                    workspace={projectDetail.workspace}
                    {...containerProps}
                  />
                )}
              </ContainersMapper>
            )}
          </ClustersMapper>
        </Form.Group>
        {this.showVolumeTemplate && (
          <Form.Group
            label={t('VOLUME_TEMPLATE_SETTINGS')}
            desc={t('CLUSTER_VOLUME_DIFF_DESC')}
            checkable
          >
            <ClustersMapper
              clusters={this.clusters}
              clustersDetail={clustersDetail}
              namespace={this.namespace}
            >
              {props => (
                <VolumesMapper formTemplate={this.formTemplate} {...props}>
                  {volumeProps => <VolumeTemplate {...volumeProps} />}
                </VolumesMapper>
              )}
            </ClustersMapper>
          </Form.Group>
        )}
        <Form.Group
          label={t('PORT_SETTINGS')}
          desc={t('CLUSTER_DIFF_PORT_SETTINGS_DESC')}
          checkable
        >
          <ClustersMapper
            clusters={this.clusters}
            clustersDetail={clustersDetail}
            namespace={this.namespace}
          >
            {props => (
              <ContainersMapper
                formTemplate={this.formTemplate}
                withService={withService}
                serviceTemplate={get(this.props.formTemplate, 'Service')}
                {...props}
              >
                {containerProps => <ContainerPorts {...containerProps} />}
              </ContainersMapper>
            )}
          </ClustersMapper>
        </Form.Group>
        <Form.Group
          label={t('ENVIRONMENT_VARIABLE_PL')}
          desc={t('CLUSTER_DIFF_ENVIRONMENT_VARIABLES_DESC')}
          checkable
        >
          <ClustersMapper
            clusters={this.clusters}
            clustersDetail={clustersDetail}
            namespace={this.namespace}
          >
            {props => (
              <ContainersMapper formTemplate={this.formTemplate} {...props}>
                {containerProps => <Environments {...containerProps} />}
              </ContainersMapper>
            )}
          </ClustersMapper>
        </Form.Group>
      </Form>
    )
  }
}
