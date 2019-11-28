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

import { get, set, debounce, isEmpty } from 'lodash'
import React from 'react'
import { observer } from 'mobx-react'
import { Columns, Column, Input, Select, TextArea } from '@pitrix/lego-ui'
import { Form } from 'components/Base'
import ToggleView from 'components/ToggleView'
import { updateLabels, generateId } from 'utils'

import {
  PATTERN_SERVICE_NAME,
  PATTERN_LENGTH_63,
  MODULE_KIND_MAP,
} from 'utils/constants'

import ServiceStore from 'stores/service'
import ApplicationStore from 'stores/application/crd'

@observer
export default class ServiceBaseInfo extends React.Component {
  store = new ServiceStore()

  appStore = new ApplicationStore()

  state = {
    showServiceMesh: false,
    selectApp: {},
  }

  componentDidMount() {
    this.appStore.fetchList({ namespace: this.namespace, limit: Infinity })
  }

  get formTemplate() {
    return this.props.formTemplate.Service
  }

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

  get applications() {
    return [
      {
        label: t('Not Join'),
        value: '',
      },
      ...this.appStore.list.data.map(app => ({
        app,
        label: app.name,
        value: app.name,
      })),
    ]
  }

  handleNameChange = debounce(value => {
    const { module, formTemplate, noWorkload } = this.props

    const aliasName = get(
      this.formTemplate,
      'metadata.annotations["kubesphere.io/alias-name"]'
    )
    const labels = get(this.formTemplate, 'metadata.labels', {})
    labels.app = value

    if (!noWorkload) {
      set(
        formTemplate[this.workloadKind],
        'metadata.name',
        `${value}-${generateId()}`
      )
      set(
        formTemplate[this.workloadKind],
        'metadata.annotations["kubesphere.io/alias-name"]',
        aliasName || value
      )
      if (this.workloadKind === 'StatefulSet') {
        set(formTemplate[this.workloadKind], 'spec.serviceName', value)
      }
    }

    updateLabels(formTemplate, module, labels)
  }, 200)

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
  }, 200)

  handleServiceMeshChange = value => {
    const { formTemplate, noWorkload } = this.props

    !noWorkload &&
      set(
        formTemplate[this.workloadKind],
        'metadata.annotations["servicemesh.kubesphere.io/enabled"]',
        value
      )
  }

  handleAppChange = (value, option) => {
    this.setState({
      showServiceMesh: !!value,
      selectApp: (option.find(item => item.value === value) || {}).app || {},
    })
  }

  nameValidator = (rule, value, callback) => {
    if (!value) {
      return callback()
    }

    this.store
      .checkName({ name: value, namespace: this.namespace })
      .then(resp => {
        if (resp.exist) {
          return callback({ message: t('Name exists'), field: rule.field })
        }
        callback()
      })
  }

  render() {
    const { formRef, noWorkload } = this.props
    const { showServiceMesh, selectApp } = this.state

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
                { pattern: PATTERN_LENGTH_63, message: t('NAME_TOO_LONG') },
                { validator: this.nameValidator },
              ]}
            >
              <Input
                name="metadata.name"
                onChange={this.handleNameChange}
                autoFocus={true}
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
          <Column>
            <Form.Item label={t('Description')}>
              <TextArea name="metadata.annotations['kubesphere.io/description']" />
            </Form.Item>
          </Column>
          <Column />
        </Columns>
        <ToggleView>
          <div className="margin-t8">
            <Columns>
              <Column>
                <Form.Item
                  label={t('Join Application')}
                  desc={t('SERVICE_NAME_DESC')}
                >
                  <Select
                    name="metadata.labels['app.kubernetes.io/name']"
                    onChange={this.handleAppChange}
                    options={this.applications}
                    defaultValue=""
                  />
                </Form.Item>
              </Column>
              {!isEmpty(selectApp) && (
                <Column>
                  <Form.Item label={t('Version')}>
                    <Input name="metadata.labels.version" defaultValue="v1" />
                  </Form.Item>
                </Column>
              )}
            </Columns>
            {!noWorkload && showServiceMesh && (
              <Columns>
                <Column>
                  <Form.Item
                    label={t('Service Mesh')}
                    desc={
                      !selectApp.serviceMeshEnable
                        ? t('Application governance is not enabled')
                        : ''
                    }
                  >
                    <Select
                      name="metadata.annotations['servicemesh.kubesphere.io/enabled']"
                      options={this.serviceMeshOptions}
                      onChange={this.handleServiceMeshChange}
                      defaultValue={
                        selectApp.serviceMeshEnable ? 'true' : 'false'
                      }
                      disabled={!selectApp.serviceMeshEnable}
                    />
                  </Form.Item>
                </Column>
                <Column />
              </Columns>
            )}
          </div>
        </ToggleView>
      </Form>
    )
  }
}
