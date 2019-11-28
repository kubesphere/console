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
import { Columns, Column, Input, TextArea } from '@pitrix/lego-ui'
import { Form } from 'components/Base'
import { PATTERN_SERVICE_NAME, PATTERN_LENGTH_63 } from 'utils/constants'

import ProjectStore from 'stores/project'

export default class BaseInfo extends React.Component {
  constructor(props) {
    super(props)

    this.store = new ProjectStore()
  }

  get formTemplate() {
    return this.props.formTemplate.Project
  }

  nameValidator = (rule, value, callback) => {
    if (!value) {
      return callback()
    }

    this.store.checkName({ name: value }).then(resp => {
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
                { pattern: PATTERN_LENGTH_63, message: t('NAME_TOO_LONG') },
                { validator: this.nameValidator },
              ]}
            >
              <Input name="metadata.name" autoFocus={true} />
            </Form.Item>
          </Column>
          <Column>
            <Form.Item label={t('Alias')} desc={t('ALIAS_DESC')}>
              <Input name="metadata.annotations['kubesphere.io/alias-name']" />
            </Form.Item>
          </Column>
        </Columns>
        <Form.Item label={t('Description')}>
          <TextArea name="metadata.annotations['kubesphere.io/description']" />
        </Form.Item>
      </Form>
    )
  }
}
