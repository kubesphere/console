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
import { MODULE_KIND_MAP } from 'utils/constants'

import { Form } from 'components/Base'

import ClustersMapper from './ClustersMapper'
import ContainersMapper from './ContainersMapper'
import ContainerImage from './ContainerImage'
import ContainerPorts from './ContainerPorts'
import Environments from './Environments'

export default class AdvancedSettings extends React.Component {
  get namespace() {
    return get(this.formTemplate, 'metadata.namespace')
  }

  get formTemplate() {
    const { formTemplate, module } = this.props
    return get(formTemplate, MODULE_KIND_MAP[module], formTemplate)
  }

  render() {
    const { formRef, projectDetail, withService } = this.props
    const clusters = projectDetail.clusters
    return (
      <Form data={this.formTemplate} ref={formRef}>
        <Form.Group
          label={t('Container Image')}
          desc={t('CLUSTER_CONTAINER_IMAGE_DIFF_DESC')}
          checkable
        >
          <ClustersMapper clusters={clusters} namespace={this.namespace}>
            {props => (
              <ContainersMapper formTemplate={this.formTemplate} {...props}>
                {containerProps => <ContainerImage {...containerProps} />}
              </ContainersMapper>
            )}
          </ClustersMapper>
        </Form.Group>
        <Form.Group
          label={t('Service Settings')}
          desc={t('CLUSTER_SERVICE_DIFF_DESC')}
          checkable
        >
          <ClustersMapper clusters={clusters} namespace={this.namespace}>
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
          label={t('Environment Variables')}
          desc={t('CLUSTER_ENV_DIFF_DESC')}
          checkable
        >
          <ClustersMapper clusters={clusters} namespace={this.namespace}>
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
