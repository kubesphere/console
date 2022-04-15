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
import { get, uniq } from 'lodash'
import { Column, Columns, Form, Select } from '@kube-design/components'
import { MODULE_KIND_MAP } from 'utils/constants'
import StorageClass from 'stores/storageClass'
import { toJS } from 'mobx'
import { observer } from 'mobx-react'

@observer
export default class SnapshotClassSettings extends React.Component {
  storageClass = new StorageClass()

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

  get provisionerOption() {
    const data = toJS(this.storageClass.list.data).map(item => item.provisioner)
    return uniq(data).map(item => ({ label: item, value: item }))
  }

  componentDidMount() {
    const { cluster } = this.props
    this.storageClass.fetchList({ cluster, limit: -1 })
  }

  render() {
    const { formRef } = this.props

    return (
      <div>
        <Form data={this.formTemplate} ref={formRef}>
          <Columns>
            <Column>
              <Form.Item
                label={t('PROVISIONER')}
                desc={t('SNAPSHOT_CLASS_PROVISIONER_DESC')}
                rules={[
                  {
                    required: true,
                    message: t('SNAPSHOT_CLASS_PROVISIONER_EMPTY_DESC'),
                  },
                ]}
              >
                <Select name="driver" options={this.provisionerOption} />
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
