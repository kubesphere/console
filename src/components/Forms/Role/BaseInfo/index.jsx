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

import { get } from 'lodash'
import React from 'react'
import { Columns, Column, Input, TextArea } from '@pitrix/lego-ui'
import { PATTERN_NAME } from 'utils/constants'
import { Form } from 'components/Base'

export default class BaseInfo extends React.Component {
  roleNameValidator = (rule, value, callback) => {
    if (!value) {
      return callback()
    }

    const name = get(this.props.formTemplate, 'metadata.name')

    if (this.props.edit && name === value) {
      return callback()
    }

    const namespace = get(this.props.formTemplate, 'metadata.namespace')

    this.props.store.checkRoleName({ name: value, namespace }).then(resp => {
      if (resp.exist) {
        return callback({ message: t('Role name exists'), field: rule.field })
      }
      callback()
    })
  }

  render() {
    const { formRef, formTemplate, edit } = this.props

    return (
      <Form data={formTemplate} ref={formRef}>
        <Columns>
          <Column>
            <Form.Item
              label={t('Name')}
              desc={t('NAME_DESC')}
              rules={[
                { required: true, message: t('Please input role name') },
                {
                  pattern: PATTERN_NAME,
                  message: `${t('Invalid name')}, ${t('NAME_DESC')}`,
                },
                { validator: this.roleNameValidator },
              ]}
            >
              <Input name="metadata.name" disabled={edit} autoFocus={true} />
            </Form.Item>
          </Column>
          <Column>
            <Form.Item label={t('Description')}>
              <TextArea name="metadata.annotations['kubesphere.io/description']" />
            </Form.Item>
          </Column>
        </Columns>
      </Form>
    )
  }
}
