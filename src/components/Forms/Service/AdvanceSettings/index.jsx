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
import { get, set, omit, unset } from 'lodash'
import { MODULE_KIND_MAP } from 'utils/constants'

import { Form } from '@kube-design/components'
import { NumberInput } from 'components/Inputs'
import PodIPRange from 'components/Forms/Workload/AdvanceSettings/PodIPRange'

import Metadata from './Metadata'
import NodeSchedule from './NodeSchedule'
import InternetAccess from './InternetAccess'

export default class AdvancedSettings extends React.Component {
  get namespace() {
    return get(this.props.formTemplate, 'Service.metadata.namespace')
  }

  get fedPrefix() {
    return this.props.isFederated ? 'spec.template.' : ''
  }

  get kind() {
    const { module } = this.props
    return MODULE_KIND_MAP[module]
  }

  handleLabelsChange = labels => {
    const { formTemplate, noWorkload } = this.props
    if (!noWorkload) {
      set(
        formTemplate,
        `Service.${this.fedPrefix}spec.selector`,
        omit(labels, 'version')
      )
      set(formTemplate, `Service.${this.fedPrefix}metadata.labels`, labels)
      set(formTemplate, `Service.metadata.labels`, labels)
    }
  }

  handleSessionAffinityChange = value => {
    const { formTemplate } = this.props

    set(
      formTemplate,
      `Service.${this.fedPrefix}spec.sessionAffinity`,
      value ? 'ClientIP' : 'None'
    )

    if (value) {
      set(
        formTemplate,
        `Service.${this.fedPrefix}spec.sessionAffinityConfig.clientIP.timeoutSeconds`,
        10800
      )
    } else {
      unset(formTemplate, `Service.${this.fedPrefix}spec.sessionAffinityConfig`)
    }
  }

  render() {
    const {
      formRef,
      formTemplate,
      cluster,
      module,
      store,
      noWorkload,
      isFederated,
    } = this.props
    return (
      <Form data={formTemplate} ref={formRef}>
        {!noWorkload &&
          !isFederated &&
          globals.app.hasClusterModule(cluster, 'network.ippool') && (
            <PodIPRange
              cluster={cluster}
              namespace={this.namespace}
              prefix={`${this.kind}.${this.fedPrefix}spec.template.`}
            />
          )}
        {(noWorkload || module !== 'statefulsets') && (
          <Form.Group
            label={t('Internet Access')}
            desc={t('SERVICES_INTERNET_ACCESS_DESC')}
            checkable
          >
            <InternetAccess
              formTemplate={formTemplate}
              isFederated={isFederated}
            />
          </Form.Group>
        )}
        <Form.Group
          label={t('Enable Sticky Session')}
          desc={t('The maximum session sticky time is 10800s (3 hours).')}
          onChange={this.handleSessionAffinityChange}
          checkable
        >
          <Form.Item
            label={t('Maximum Session Sticky Time (s)')}
            desc={t('SERVICE_SESSION_STICKY_DESC')}
          >
            <NumberInput
              name={`Service.${this.fedPrefix}spec.sessionAffinityConfig.clientIP.timeoutSeconds`}
              min={0}
              max={86400}
            />
          </Form.Item>
        </Form.Group>
        {!noWorkload && (
          <Form.Group
            label={t('Set Node Scheduling Policy')}
            desc={t('You can allow Pod replicas to run on specified nodes.')}
            checkable
          >
            <NodeSchedule
              kind={this.kind}
              cluster={cluster}
              namespace={this.namespace}
              formTemplate={formTemplate}
              isFederated={isFederated}
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
            kind={this.kind}
            namespace={this.namespace}
            cluster={cluster}
            formTemplate={formTemplate}
            onLabelsChange={this.handleLabelsChange}
            isFederated={isFederated}
            noWorkload={noWorkload}
          />
        </Form.Group>
      </Form>
    )
  }
}
