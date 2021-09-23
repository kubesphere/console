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

import { get, set } from 'lodash'
import React from 'react'
import { Form, Input } from '@kube-design/components'
import { MODULE_KIND_MAP } from 'utils/constants'

export default class ServiceSettings extends React.Component {
  get formTemplate() {
    const { formTemplate, module } = this.props
    return get(formTemplate, MODULE_KIND_MAP[module], formTemplate)
  }

  componentDidMount() {
    if (get(this.formTemplate, 'spec.type') !== 'ExternalName') {
      set(this.formTemplate, 'spec', { type: 'ExternalName' })
    }
  }

  render() {
    const { formRef } = this.props

    return (
      <Form data={this.formTemplate} ref={formRef}>
        <Form.Item
          label={t('EXTERNAL_SERVICE_ADDRESS')}
          desc={t('EXTERNAL_SERVICE_ADDRESS_DESC')}
          rules={[
            {
              required: true,
              message: t('EXTERNAL_SERVICE_ADDRESS_EMPTY_DESC'),
            },
          ]}
        >
          <Input name="spec.externalName" placeholder={'foo.bar.example.com'} />
        </Form.Item>
      </Form>
    )
  }
}
