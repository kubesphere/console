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

import { Column, Columns, Form, Input, TextArea } from '@kube-design/components'
import * as React from 'react'
import {
  PATTERN_ALIAS_NAME,
  PATTERN_SERVICE_NAME,
} from '../../../../utils/constants'

export default class SilentPolicyBaseForm extends React.Component {
  nameValidator = (rule, value, callback) => {
    if (!value || this.props.isEdit) {
      return callback()
    }

    this.props.store
      .checkName({
        name: value,
        namespace: this.props.namespace,
        cluster: this.props.cluster,
      })
      .then(resp => {
        if (resp.exist) {
          return callback({ message: t('NAME_EXIST_DESC'), field: rule.field })
        }
        callback()
      })
  }

  render() {
    const { formRef, formTemplate, isEdit = false } = this.props

    return (
      <Form ref={formRef} data={formTemplate}>
        <Columns>
          <Column>
            <Form.Item
              label={t('NAME')}
              desc={t('PROJECT_NAME_DESC')}
              ref={this.nameRef}
              rules={[
                { required: true, message: t('NAME_EMPTY_DESC') },
                {
                  pattern: PATTERN_SERVICE_NAME,
                  message: t('PROJECT_NAME_INVALID_DESC'),
                },
                { validator: this.nameValidator },
              ]}
            >
              <Input
                name="name"
                autoFocus={true}
                maxLength={63}
                disabled={isEdit}
              />
            </Form.Item>
          </Column>
          <Column>
            <Form.Item
              label={t('ALIAS')}
              desc={t('ALIAS_DESC')}
              rules={[
                {
                  pattern: PATTERN_ALIAS_NAME,
                  message: t('INVALID_ALIAS_NAME_DESC'),
                },
              ]}
            >
              <Input name="aliasName" maxLength={63} />
            </Form.Item>
          </Column>
        </Columns>
        <Columns>
          <Column>
            <Form.Item label={t('DESCRIPTION')} desc={t('DESCRIPTION_DESC')}>
              <TextArea name="desc" maxLength={256} />
            </Form.Item>
          </Column>
          <Column />
        </Columns>
      </Form>
    )
  }
}
