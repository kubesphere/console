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

import { get, set, unset } from 'lodash'
import React from 'react'
import { Select } from '@pitrix/lego-ui'
import { Form } from 'components/Base'
import { PropertiesInput } from 'components/Inputs'
import { updateFederatedAnnotations } from 'utils'

import styles from './index.scss'

export default class InternetAccess extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      mode: get(this.formTemplate, 'spec.type', 'ClusterIP'),
    }
  }

  get fedPreifx() {
    return this.props.isFederated ? 'spec.template.' : ''
  }

  get formTemplate() {
    return this.props.formTemplate.Service
  }

  get accessModes() {
    return [
      {
        label: 'NodePort',
        desc: t('ACCESS_NODEPORT_TIP'),
        value: 'NodePort',
      },
      {
        label: 'LoadBalancer',
        desc: t('ACCESS_LOADBALANCER_TIP'),
        value: 'LoadBalancer',
      },
    ]
  }

  handleAccessModeChange = mode => {
    if (mode === 'LoadBalancer') {
      let annotations = get(this.formTemplate, 'metadata.annotations', {})
      annotations = {
        ...globals.config.loadBalancerDefaultAnnotations,
        ...annotations,
      }
      set(this.formTemplate, 'metadata.annotations', annotations)
    } else {
      Object.keys(globals.config.loadBalancerDefaultAnnotations).forEach(
        key => {
          unset(this.formTemplate, `metadata.annotations["${key}"]`)
        }
      )
    }

    if (this.props.isFederated) {
      updateFederatedAnnotations(this.formTemplate)
    }

    this.setState({ mode })
  }

  handleAnnotationsChange = () => {
    if (this.props.isFederated) {
      updateFederatedAnnotations(this.formTemplate)
    }
  }

  optionRenderer = option => (
    <div className={styles.option}>
      <div>{option.label}</div>
      <p>{option.desc}</p>
    </div>
  )

  render() {
    const { mode } = this.state

    return (
      <>
        <Form.Item label={t('Access Method')}>
          <Select
            name={`Service.${this.fedPreifx}spec.type`}
            options={this.accessModes}
            onChange={this.handleAccessModeChange}
            optionRenderer={this.optionRenderer}
          />
        </Form.Item>
        {mode === 'LoadBalancer' && (
          <Form.Item label={t('Annotations')}>
            <PropertiesInput
              name="Service.metadata.annotations"
              hiddenKeys={globals.config.preservedAnnotations}
              onChange={this.handleAnnotationsChange}
              addText={t('Add Annotation')}
            />
          </Form.Item>
        )}
      </>
    )
  }
}
