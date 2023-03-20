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
import UnitInput from 'components/Forms/AlertingPolicy/BaseInfo/UnitInput'

import { SEVERITY_LEVEL } from 'configs/alerting/metrics/rule.config'
import { observer } from 'mobx-react'
import React from 'react'

import { PATTERN_ALIAS_NAME, PATTERN_NAME } from 'utils/constants'

@observer
export default class BaseInfo extends React.Component {
  get namespace() {
    return this.props.namespace
  }

  get durationUnitOptions() {
    return [
      {
        label: t('SECONDS'),
        value: 's',
      },
      {
        label: t('MINUTES'),
        value: 'm',
      },
      {
        label: t('HOURS'),
        value: 'h',
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
        name: `${this.props.cluster_id}-${value}`,
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
    const duration = value.slice(0, -1)
    const time = /^[0-9]*$/

    if (!time.test(duration)) {
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
            message: t('INVALID_NAME_DESC', { message: t('NAME_DESC') }),
          },
          { validator: this.nameValidator },
        ]

    return (
      <Form data={formTemplate} ref={formRef}>
        <Columns>
          <Column>
            <Form.Item label={t('NAME')} desc={t('NAME_DESC')} rules={rules}>
              <Input
                name="metadata.name"
                onChange={this.handleNameChange}
                maxLength={63}
                readOnly={isEdit}
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
              <Input
                name="metadata.annotations['kubesphere.io/alias-name']"
                maxLength={63}
              />
            </Form.Item>
          </Column>
        </Columns>
        <Columns>
          <Column>
            <Form.Item
              label={t('CHECK_INTERVAL')}
              desc={t('ALERTING_POLICY_CHECK_INTERVAL_DESC')}
              rules={[{ validator: this.timeValidator }]}
            >
              <UnitInput
                name="spec.interval"
                unitOptions={this.durationUnitOptions}
                defaultValue={this.durationUnitOptions[1].value}
              />
            </Form.Item>
          </Column>
          <Column>
            <Form.Item label={t('DESCRIPTION')} desc={t('DESCRIPTION_DESC')}>
              <TextArea
                name="metadata.annotations['kubesphere.io/description']"
                maxLength={256}
              />
            </Form.Item>
          </Column>
        </Columns>
      </Form>
    )
  }
}
