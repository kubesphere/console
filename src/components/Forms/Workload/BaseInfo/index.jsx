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
import { get, debounce } from 'lodash'
import { observer } from 'mobx-react'

import { updateLabels } from 'utils'
import {
  PATTERN_NAME,
  PATTERN_LENGTH_63,
  PATTERN_LENGTH_253,
  MODULE_KIND_MAP,
} from 'utils/constants'

import { Columns, Column, Input, TextArea } from '@pitrix/lego-ui'
import { Form } from 'components/Base'

@observer
export default class BaseInfo extends React.Component {
  get namespace() {
    return get(this.formTemplate, 'metadata.namespace')
  }

  get formTemplate() {
    const { formTemplate, module } = this.props
    return get(formTemplate, MODULE_KIND_MAP[module], formTemplate)
  }

  get nameLengthRules() {
    return {
      63: {
        pattern: PATTERN_LENGTH_63,
        message: t('NAME_TOO_LONG'),
      },
      253: {
        pattern: PATTERN_LENGTH_253,
        message: t('LONG_NAME_TOO_LONG'),
      },
    }
  }

  nameValidator = (rule, value, callback) => {
    if (!value) {
      return callback()
    }

    this.props.store
      .checkName({ name: value, namespace: this.namespace })
      .then(resp => {
        if (resp.exist) {
          return callback({ message: t('Name exists'), field: rule.field })
        }
        callback()
      })
  }

  handleNameChange = debounce(value => {
    const { module, formTemplate } = this.props

    const labels = get(this.formTemplate, 'metadata.labels', {})
    labels.app = value

    updateLabels(formTemplate, module, labels)
  }, 200)

  render() {
    const { formRef, maxNameLength = 253 } = this.props

    const desc = maxNameLength === 253 ? t('LONG_NAME_DESC') : t('NAME_DESC')

    return (
      <Form data={this.formTemplate} ref={formRef}>
        <Columns>
          <Column>
            <Form.Item
              label={t('Name')}
              desc={desc}
              rules={[
                { required: true, message: t('Please input name') },
                {
                  pattern: PATTERN_NAME,
                  message: `${t('Invalid name')}, ${desc}`,
                },
                this.nameLengthRules[maxNameLength] || {},
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
              <Input name="metadata.annotations['kubesphere.io/alias-name']" />
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
      </Form>
    )
  }
}
