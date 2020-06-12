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
import { get, set } from 'lodash'
import { MODULE_KIND_MAP } from 'utils/constants'

import { Form } from 'components/Base'

import Metadata from './Metadata'
import NodeSchedule from './NodeSchedule'
import InternetAccess from './InternetAccess'
import SessionAffinity from './SessionAffinity'

export default class AdvancedSettings extends React.Component {
  get namespace() {
    return get(this.props.formTemplate, 'Service.metadata.namespace')
  }

  get fedPreifx() {
    return this.props.isFederated ? 'spec.template.' : ''
  }

  get kind() {
    const { module } = this.props
    return MODULE_KIND_MAP[module]
  }

  handleLabelsChange = labels => {
    const { formTemplate, noWorkload } = this.props
    if (!noWorkload) {
      set(formTemplate, `Service.${this.fedPrefix}spec.selector`, labels)
      set(formTemplate, `Service.${this.fedPrefix}metadata.labels`, labels)
    }
  }

  handleSessionAffinityChange = value => {
    const { formTemplate, noWorkload } = this.props
    if (!noWorkload) {
      set(
        formTemplate,
        `Service.${this.fedPrefix}spec.sessionAffinity`,
        value ? 'clusterIP' : 'None'
      )
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
          label={t('Open Session Sticky')}
          desc={t('the maximum session sticky time is 10800s(3 hours)')}
          checkable
        >
          <SessionAffinity
            formTemplate={formTemplate}
            isFederated={isFederated}
          />
        </Form.Group>
        {!noWorkload && (
          <Form.Group
            label={t('Setting node schedule policy')}
            desc={t('Running pods on the specified nodes')}
            keepDataWhenUnCheck
            checkable
          >
            <NodeSchedule
              kind={this.kind}
              namespace={this.namespace}
              formTemplate={formTemplate}
              isFederated={isFederated}
            />
          </Form.Group>
        )}
        <Form.Group
          label={t('Add metadata')}
          desc={t(
            'Additional metadata settings for resources such as Label and Annotation'
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
          />
        </Form.Group>
      </Form>
    )
  }
}
