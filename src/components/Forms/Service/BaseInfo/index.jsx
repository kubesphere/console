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

import { get, set, debounce } from 'lodash'
import React from 'react'
import { observer } from 'mobx-react'
import { Columns, Column, Input } from '@pitrix/lego-ui'
import { Form, TextArea } from 'components/Base'
import { updateLabels, updateFederatedAnnotations, generateId } from 'utils'
import { ProjectSelect } from 'components/Inputs'

import { PATTERN_SERVICE_NAME, MODULE_KIND_MAP } from 'utils/constants'

import ServiceStore from 'stores/service'
import FederatedStore from 'stores/federated'

@observer
export default class ServiceBaseInfo extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      showServiceMesh: false,
      selectApp: {},
    }

    this.store = new ServiceStore()
    if (props.isFederated) {
      this.store = new FederatedStore(this.store)
    }
  }

  formTemplate = this.props.formTemplate.Service

  get workloadKind() {
    const { module, noWorkload } = this.props
    if (noWorkload) {
      return ''
    }

    return MODULE_KIND_MAP[module]
  }

  get namespace() {
    return get(this.formTemplate, 'metadata.namespace')
  }

  get serviceMeshOptions() {
    return [
      { label: t('Off'), value: 'false' },
      { label: t('On'), value: 'true' },
    ]
  }

  handleNameChange = value => {
    const { isFederated, noWorkload } = this.props

    const labels = get(this.formTemplate, 'metadata.labels', {})
    labels.app = value.slice(0, 63)

    updateLabels(
      isFederated ? get(this.formTemplate, 'spec.template') : this.formTemplate,
      'services',
      labels
    )

    if (isFederated) {
      set(this.formTemplate, 'metadata.labels.app', value.slice(0, 63))
    }

    if (!noWorkload) {
      this.updateWorkload(value)
    }
  }

  updateWorkload(value) {
    const { module, formTemplate, isFederated } = this.props
    const aliasName = get(
      this.formTemplate,
      'metadata.annotations["kubesphere.io/alias-name"]'
    )
    const labels = get(this.formTemplate, 'metadata.labels', {})
    const namespace = get(this.formTemplate, 'metadata.namespace')
    const workloadName = `${value}-${generateId()}`
    set(formTemplate[this.workloadKind], 'metadata.name', workloadName)
    set(formTemplate[this.workloadKind], 'metadata.namespace', namespace)
    set(
      formTemplate[this.workloadKind],
      'metadata.annotations["kubesphere.io/alias-name"]',
      aliasName || value
    )

    set(formTemplate[this.workloadKind], 'metadata.labels.app', value)
    updateLabels(
      isFederated
        ? get(formTemplate[this.workloadKind], 'spec.template')
        : formTemplate[this.workloadKind],
      module,
      labels
    )

    if (this.workloadKind === 'StatefulSet') {
      set(
        formTemplate[this.workloadKind],
        isFederated ? 'spec.template.spec.serviceName' : 'spec.serviceName',
        value
      )
    }

    set(
      formTemplate.Service,
      'metadata.annotations["kubesphere.io/workloadName"]',
      workloadName
    )
    set(
      formTemplate.Service,
      'metadata.annotations["kubesphere.io/workloadModule"]',
      module
    )
  }

  handleAliasNameChange = debounce(value => {
    const { formTemplate, noWorkload } = this.props

    const name = get(this.formTemplate, 'metadata.name')

    if (!noWorkload) {
      set(
        formTemplate[this.workloadKind],
        'metadata.annotations["kubesphere.io/alias-name"]',
        value || name
      )
    }

    if (this.props.isFederated) {
      updateFederatedAnnotations(this.formTemplate)
    }
  }, 200)

  nameValidator = (rule, value, callback) => {
    if (!value) {
      return callback()
    }

    this.store
      .checkName({
        name: value,
        namespace: this.namespace,
        cluster: this.props.cluster,
      })
      .then(resp => {
        if (resp.exist) {
          return callback({ message: t('Name exists'), field: rule.field })
        }
        callback()
      })
  }

  render() {
    const { formRef } = this.props

    return (
      <Form data={this.formTemplate} ref={formRef}>
        <Columns>
          <Column>
            <Form.Item
              label={t('Name')}
              desc={t('SERVICE_NAME_DESC')}
              rules={[
                { required: true, message: t('Please input name') },
                {
                  pattern: PATTERN_SERVICE_NAME,
                  message: `${t('Invalid name')}, ${t('SERVICE_NAME_DESC')}`,
                },
                { validator: this.nameValidator },
              ]}
            >
              <Input
                name="metadata.name"
                onChange={this.handleNameChange}
                autoFocus={true}
                maxLength={63}
              />
            </Form.Item>
          </Column>
          <Column>
            <Form.Item label={t('Alias')} desc={t('ALIAS_DESC')}>
              <Input
                name="metadata.annotations['kubesphere.io/alias-name']"
                onChange={this.handleAliasNameChange}
              />
            </Form.Item>
          </Column>
        </Columns>
        <Columns>
          {!this.props.namespace && (
            <Column>
              <Form.Item
                label={t('Project')}
                desc={t('PROJECT_DESC')}
                rules={[
                  { required: true, message: t('Please select a project') },
                ]}
              >
                <ProjectSelect
                  name="metadata.namespace"
                  cluster={this.props.cluster}
                  defaultValue={this.namespace}
                />
              </Form.Item>
            </Column>
          )}
          <Column>
            <Form.Item label={t('Description')} desc={t('DESCRIPTION_DESC')}>
              <TextArea
                name="metadata.annotations['kubesphere.io/description']"
                maxLength={256}
              />
            </Form.Item>
          </Column>
        </Columns>
      </Form>
    )
  }
}
