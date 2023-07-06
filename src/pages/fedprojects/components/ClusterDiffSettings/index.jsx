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
import { get, isEmpty, keyBy, set } from 'lodash'
import { MODULE_KIND_MAP } from 'utils/constants'

import { Form } from '@kube-design/components'

import ClustersMapper from 'components/Forms/Workload/ClusterDiffSettings/ClustersMapper'
import ContainersMapper from 'components/Forms/Workload/ClusterDiffSettings/ContainersMapper'
import ContainerPorts from 'components/Forms/Workload/ClusterDiffSettings/ContainerPorts'
import Environments from 'components/Forms/Workload/ClusterDiffSettings/Environments'
import VolumesMapper from 'components/Forms/Workload/ClusterDiffSettings/VolumesMapper'
import VolumeTemplate from 'components/Forms/Workload/ClusterDiffSettings/VolumeTemplate'
import ContainersMapperWithService from 'components/Forms/Workload/ClusterDiffSettings/ContainersMapperWithService'
import ContainerPortsWithService from 'components/Forms/Workload/ClusterDiffSettings/ContainerPortsWithService'
import ClusterSelect from 'components/Forms/Route/RouteRules/RuleForm/ClusterSelect'
import ContainerImage from '../ContainerImage'

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

  get clustersOption() {
    const clusters = this.props.projectDetail.clusters
    const option = []
    clusters.forEach(item => {
      option.push({
        name: item.name,
        value: item.name,
        provider: item.provider,
      })
    })
    return option
  }

  get showVolumeTemplate() {
    return (
      this.props.module === 'statefulsets' &&
      get(this.formTemplate, 'spec.template.spec.volumeClaimTemplates')
    )
  }

  get defaultClusters() {
    return get(this.formTemplate, 'spec.placement.clusters', []).map(
      item => item.name
    )
  }

  handleLocal = clusters => {
    const overrides = this.formTemplate.spec.overrides

    overrides.map(item => {
      if (
        !clusters.includes(item.clusterName) &&
        !isEmpty(item.clusterOverrides)
      ) {
        item.clusterOverrides = []
      }
      return item
    })

    const placementClusters = []
    clusters.forEach(item => {
      placementClusters.push({ name: item })
    })

    set(this.formTemplate, 'spec.placement.clusters', placementClusters)
  }

  render() {
    const {
      formRef,
      projectDetail,
      withService,
      formProps,
      module,
      isEdit,
      workspace,
    } = this.props

    const clustersDetail = keyBy(projectDetail.clusters, 'name')
    return (
      <div>
        <Form data={this.formTemplate} ref={formRef} {...formProps}>
          <Form.Group label={t('CLUSTER')}>
            <Form.Item>
              <ClusterSelect
                name="clusters"
                options={this.clustersOption}
                defaultValue={this.defaultClusters}
                onChange={this.handleLocal}
              />
            </Form.Item>
          </Form.Group>
          {module === 'service' && isEdit ? null : (
            <Form.Group
              label={t('CONTAINER_IMAGE')}
              desc={t('CLUSTER_DIFF_CONTAINER_SETTINGS_DESC')}
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
                    {...props}
                    {...formProps}
                  >
                    {containerProps => (
                      <ContainerImage
                        isEdit={isEdit}
                        {...containerProps}
                        workspace={workspace}
                      />
                    )}
                  </ContainersMapper>
                )}
              </ClustersMapper>
            </Form.Group>
          )}

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
              {module === 'service' && isEdit
                ? props => (
                    <ContainersMapperWithService
                      formTemplate={this.formTemplate}
                      withService={withService}
                      {...props}
                      {...formProps}
                    >
                      {containerProps => (
                        <ContainerPortsWithService {...containerProps} />
                      )}
                    </ContainersMapperWithService>
                  )
                : props => (
                    <ContainersMapper
                      formTemplate={this.formTemplate}
                      withService={withService}
                      serviceTemplate={get(this.props.formTemplate, 'Service')}
                      {...props}
                      {...formProps}
                    >
                      {containerProps => <ContainerPorts {...containerProps} />}
                    </ContainersMapper>
                  )}
            </ClustersMapper>
          </Form.Group>
          {module === 'service' && isEdit ? null : (
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
                  <ContainersMapper
                    formTemplate={this.formTemplate}
                    {...props}
                    {...formProps}
                  >
                    {containerProps => <Environments {...containerProps} />}
                  </ContainersMapper>
                )}
              </ClustersMapper>
            </Form.Group>
          )}
        </Form>
      </div>
    )
  }
}
