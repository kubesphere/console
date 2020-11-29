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

import { get, omit, isEmpty } from 'lodash'
import React from 'react'
import { Column, Columns, Form, Input, Select } from '@kube-design/components'
import { PropertiesInput } from 'components/Inputs'
import { MODULE_KIND_MAP, PROVISIONERS, ACCESS_MODES } from 'utils/constants'

const Components = { input: Input, select: Select }

export default class StorageClassSetting extends React.Component {
  constructor(props) {
    super(props)

    this.isCustomizedProvision = PROVISIONERS.every(
      ({ value }) => value !== this.provisionerValue
    )
  }

  get provisionerValue() {
    return get(
      this.formTemplate,
      'metadata.annotations["kubesphere.io/provisioner"]',
      this.formTemplate.provisioner
    )
  }

  get formTemplate() {
    const { formTemplate, module } = this.props
    return get(formTemplate, MODULE_KIND_MAP[module], formTemplate)
  }

  getAccessModesOptions() {
    const provisioner =
      PROVISIONERS.find(({ value }) => value === this.provisionerValue) || {}

    const supportedAccessModes = isEmpty(provisioner.access_modes)
      ? Object.keys(ACCESS_MODES)
      : provisioner.access_modes

    return supportedAccessModes.map(key => ({
      label: t(key),
      value: key,
    }))
  }

  renderCustom() {
    return (
      <Form.Item label={t('Parameters')}>
        <PropertiesInput name="parameters" addText={t('Add Param')} />
      </Form.Item>
    )
  }

  renderParams() {
    const provisioner = PROVISIONERS.find(
      ({ value }) => value === this.provisionerValue
    )

    if (isEmpty(provisioner) || isEmpty(provisioner.params)) {
      return this.renderCustom()
    }

    const columns = []

    for (let i = 0; i < provisioner.params.length; i += 2) {
      const left = provisioner.params[i] || {}
      const right = provisioner.params[i + 1] || {}

      const LeftComponent = Components[left.type]
      const RightComponent = get(Components, right.type || '')

      columns.push(
        <Columns key={i}>
          <Column>
            <Form.Item label={left.key} desc={t(left.desc)}>
              <LeftComponent
                name={`parameters.${left.key}`}
                {...omit(left, ['type', 'key', 'desc'])}
              />
            </Form.Item>
          </Column>
          {right.type && (
            <Column>
              <Form.Item label={right.key} desc={t(right.desc)}>
                <RightComponent
                  name={`parameters.${right.key}`}
                  {...omit(right, ['type', 'key', 'desc'])}
                />
              </Form.Item>
            </Column>
          )}
        </Columns>
      )
    }

    return columns
  }

  render() {
    const { formRef } = this.props

    const accessModesOptions = this.getAccessModesOptions()
    const defaultModes = accessModesOptions.map(({ value }) => value)

    return (
      <div>
        <Form data={this.formTemplate} ref={formRef}>
          <Columns>
            <Column>
              <Form.Item label={t('Allow Volume Expansion')}>
                <Select
                  name="allowVolumeExpansion"
                  options={[
                    { label: t('Yes'), value: 'true' },
                    { label: t('No'), value: 'false' },
                  ]}
                />
              </Form.Item>
            </Column>
            <Column>
              <Form.Item label={t('Reclaim Policy')}>
                <Input name="reclaimPolicy" disabled />
              </Form.Item>
            </Column>
          </Columns>
          <Columns>
            <Column>
              <Form.Item
                label={t('Supported Access Mode')}
                desc={t('ACCESS_MODES_DESC')}
              >
                <Select
                  name="metadata.annotations['storageclass.kubesphere.io/supported-access-modes']"
                  options={accessModesOptions}
                  defaultValue={defaultModes}
                  multi
                />
              </Form.Item>
            </Column>
            <Column>
              <Form.Item
                rules={[{ required: true, message: t('required') }]}
                label={t('Storage System')}
              >
                <Input name={'provisioner'} />
              </Form.Item>
            </Column>
          </Columns>
          {this.renderParams()}
        </Form>
      </div>
    )
  }
}
