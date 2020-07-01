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
import { Columns, Column, Input, Select } from '@pitrix/lego-ui'
import { Form } from 'components/Base'
import { PropertiesInput } from 'components/Inputs'
import { MODULE_KIND_MAP, PROVISIONERS, ACCESS_MODES } from 'utils/constants'

const Components = { input: Input, select: Select }

export default class StorageClassSetting extends React.Component {
  constructor(props) {
    super(props)

    const { provisioner: provisionerValue } = this.formTemplate
    this.isCustomizedProvision = PROVISIONERS.every(
      ({ value }) => value !== provisionerValue
    )
  }

  get formTemplate() {
    const { formTemplate, module } = this.props
    return get(formTemplate, MODULE_KIND_MAP[module], formTemplate)
  }

  getSnapshotOptions() {
    return [
      {
        label: t('True'),
        value: 'true',
      },
      {
        label: t('False'),
        value: 'false',
      },
    ]
  }

  getAccessModesOptions() {
    const { provisioner: provisionerValue } = this.formTemplate
    const provisioner =
      PROVISIONERS.find(({ value }) => value === provisionerValue) || {}

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
    const { provisioner: provisionerValue } = this.formTemplate

    const provisioner = PROVISIONERS.find(
      ({ value }) => value === provisionerValue
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

    const snapshotOptions = this.getSnapshotOptions()
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
              <Form.Item label={t('Support Volume Snapshot')}>
                <Select
                  name="metadata.annotations['storageclass.kubesphere.io/support-snapshot']"
                  options={snapshotOptions}
                  defaultValue="false"
                />
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
                  name="metadata.annotations['storageclass.kubesphere.io/supported_access_modes']"
                  options={accessModesOptions}
                  defaultValue={defaultModes}
                  multi
                />
              </Form.Item>
            </Column>
            <Column>
              <Form.Item label={t('Reclaiming Policy')}>
                <Input name="reclaimPolicy" disabled />
              </Form.Item>
            </Column>
          </Columns>
          {this.isCustomizedProvision && (
            <Columns>
              <Column>
                <Form.Item
                  rules={[
                    {
                      required: true,
                      message: t('required'),
                    },
                  ]}
                  label={t('Storage System')}
                >
                  <Input name={'provisioner'} />
                </Form.Item>
              </Column>
            </Columns>
          )}
          {this.renderParams()}
        </Form>
      </div>
    )
  }
}
