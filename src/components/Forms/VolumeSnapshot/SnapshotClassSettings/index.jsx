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
import { Column, Columns, Form, Input, Select } from '@kube-design/components'
import { MODULE_KIND_MAP } from 'utils/constants'

export default class SnapshotClassSettings extends React.Component {
  get formTemplate() {
    const { formTemplate, module } = this.props
    return get(formTemplate, MODULE_KIND_MAP[module], formTemplate)
  }

  get options() {
    return [
      {
        label: 'Delete',
        value: 'Delete',
      },
      {
        label: 'Retain',
        value: 'Retain',
      },
    ]
  }

  render() {
    const { formRef } = this.props

    return (
      <div>
        <Form data={this.formTemplate} ref={formRef}>
          <Columns>
            <Column>
              <Form.Item
                label={t('DRIVER')}
                desc={t('DRIVER_DESC')}
                rules={[{ required: true, message: t('DRIVER_EMPTY_DESC') }]}
              >
                <Input name="driver" autoFocus={true} />
              </Form.Item>
            </Column>
            <Column>
              <Form.Item label={t('DELETION_POLICY')}>
                <Select
                  name="deletionPolicy"
                  defaultValue="Delete"
                  options={this.options}
                />
              </Form.Item>
            </Column>
          </Columns>
        </Form>
      </div>
    )
  }
}
