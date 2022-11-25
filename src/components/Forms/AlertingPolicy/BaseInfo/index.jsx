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
import { observer } from 'mobx-react'

import {
  Column,
  Columns,
  Form,
  Input,
  Select,
  TextArea,
} from '@kube-design/components'

import { PATTERN_NAME } from 'utils/constants'

import { SEVERITY_LEVEL } from 'configs/alerting/metrics/rule.config'

import { UnitWrapper } from 'components/Inputs'

@observer
export default class BaseInfo extends React.Component {
  get namespace() {
    return get(this.props.formTemplate, 'namespace')
  }

  get durationOptions() {
    return [
      {
        label: 1,
        value: 1,
      },
      {
        label: 5,
        value: 5,
      },
      {
        label: 15,
        value: 15,
      },
      {
        label: 30,
        value: 30,
      },
      {
        label: 60,
        value: 60,
      },
    ]
  }

  get severities() {
    return SEVERITY_LEVEL.map(item => ({
      label: t(item.label),
      value: item.value,
      level: item,
    }))
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
          return callback({ message: t('NAME_EXIST_DESC'), field: rule.field })
        }
        callback()
      })
  }

  timeValidator = (rule, value, callback) => {
    const time = /^[0-9]*$/
    if (!time.test(value.slice(0, -1))) {
      return callback({ message: t('INVALID_TIME_DESC') })
    }
    callback()
  }

  render() {
    const { isEdit, formRef, formTemplate } = this.props
    const rules = isEdit
      ? []
      : [
          { required: true, message: t('NAME_EMPTY_DESC') },
          {
            pattern: PATTERN_NAME,
            message: t('INVALID_NAME_DESC', { message: t('LONG_NAME_DESC') }),
          },
          { validator: this.nameValidator },
        ]

    return (
      <Form data={formTemplate} ref={formRef}>
        <Columns>
          <Column>
            <Form.Item
              label={t('NAME')}
              desc={t('LONG_NAME_DESC')}
              rules={rules}
            >
              <Input
                name="name"
                onChange={this.handleNameChange}
                maxLength={253}
                readOnly={isEdit}
              />
            </Form.Item>
          </Column>
          <Column>
            <Form.Item label={t('ALIAS')} desc={t('ALIAS_DESC')}>
              <Input name="annotations.aliasName" maxLength={63} />
            </Form.Item>
          </Column>
        </Columns>
        <Columns>
          <Column>
            <Form.Item
              label={t('DURATION_MIN')}
              desc={t('ALERT_DURATION')}
              rules={[{ validator: this.timeValidator }]}
            >
              <UnitWrapper name="duration" unit="m">
                <Select
                  options={this.durationOptions}
                  searchable
                  placeholder=" "
                />
              </UnitWrapper>
            </Form.Item>
          </Column>
          <Column>
            <Form.Item label={t('SEVERITY')}>
              <Select
                name="labels.severity"
                options={this.severities}
                placeholder=" "
              />
            </Form.Item>
          </Column>
        </Columns>
        <Columns>
          <Column>
            <Form.Item label={t('DESCRIPTION')} desc={t('DESCRIPTION_DESC')}>
              <TextArea name="annotations.description" maxLength={256} />
            </Form.Item>
          </Column>
        </Columns>
      </Form>
    )
  }
}
