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
import { observer } from 'mobx-react'

import { PATTERN_NAME } from 'utils/constants'

import { Column, Columns, Form, Input } from '@kube-design/components'

@observer
export default class BaseInfo extends React.Component {
  get formTemplate() {
    return this.props.formTemplate.strategy
  }

  get namespace() {
    return get(this.formTemplate, 'metadata.namespace')
  }

  get strategyType() {
    return get(this.formTemplate, 'spec.type')
  }

  nameValidator = (rule, value, callback) => {
    if (!value) {
      return callback()
    }

    this.props.store
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
              label={t('Release Job Name')}
              desc={t('LONG_NAME_DESC')}
              rules={[
                { required: true, message: t('Please input name') },
                {
                  pattern: PATTERN_NAME,
                  message: t('Invalid name', { message: t('LONG_NAME_DESC') }),
                },
                { validator: this.nameValidator },
              ]}
            >
              <Input name="metadata.name" maxLength={253} />
            </Form.Item>
          </Column>
          <Column />
        </Columns>
      </Form>
    )
  }
}
