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

import { Form } from '@kube-design/components'

import Metadata from './Metadata'
import NodeSchedule from './NodeSchedule'
import PodIPRange from './PodIPRange'

export default class AdvancedSettings extends React.Component {
  get namespace() {
    return get(this.formTemplate, 'metadata.namespace')
  }

  get formTemplate() {
    const { formTemplate, module } = this.props
    return get(formTemplate, MODULE_KIND_MAP[module], formTemplate)
  }

  get fedFormTemplate() {
    return this.props.isFederated
      ? get(this.formTemplate, 'spec.template')
      : this.formTemplate
  }

  render() {
    const { formRef, store, module, cluster, prefix, isFederated } = this.props
    return (
      <Form data={this.fedFormTemplate} ref={formRef}>
        {globals.app.hasClusterModule(cluster, 'network.ippool') &&
          !isFederated && (
            <PodIPRange
              prefix={prefix}
              cluster={cluster}
              namespace={this.namespace}
            />
          )}
        {module !== 'daemonsets' && (
          <Form.Group
            label={t('Set Node Scheduling Policy')}
            desc={t('You can allow Pod replicas to run on specified nodes.')}
            checkable
          >
            <NodeSchedule
              prefix={prefix}
              cluster={cluster}
              namespace={this.namespace}
              formTemplate={this.fedFormTemplate}
            />
          </Form.Group>
        )}
        <Form.Group
          label={t('Add Metadata')}
          desc={t(
            'Additional metadata settings for resources such as Labels and Annotations.'
          )}
          keepDataWhenUnCheck
          checkable
        >
          <Metadata
            store={store}
            module={module}
            cluster={cluster}
            namespace={this.namespace}
            formTemplate={this.formTemplate}
            isFederated={isFederated}
          />
        </Form.Group>
      </Form>
    )
  }
}
