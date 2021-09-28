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
import { Column, Columns, Form } from '@kube-design/components'
import { NumberInput } from 'components/Inputs'
import { MODULE_KIND_MAP } from 'utils/constants'

export default class JobSettings extends React.Component {
  get prefix() {
    return this.props.prefix || 'spec.'
  }

  get formTemplate() {
    const { formTemplate, module } = this.props
    return get(formTemplate, MODULE_KIND_MAP[module], formTemplate)
  }

  render() {
    const { formRef } = this.props

    return (
      <Form data={this.formTemplate} ref={formRef}>
        <Columns>
          <Column>
            <Form.Item
              label={t('MAXIMUM_RETRIES')}
              desc={t('MAXIMUM_RETRIES_DESC')}
            >
              <NumberInput
                min={0}
                name={`${this.prefix}backoffLimit`}
                integer
              />
            </Form.Item>
            <Form.Item
              label={t('PARALLEL_PODS')}
              desc={t('PARALLEL_PODS_DESC')}
            >
              <NumberInput min={0} name={`${this.prefix}parallelism`} integer />
            </Form.Item>
          </Column>
          <Column>
            <Form.Item
              label={t('COMPLETE_PODS')}
              desc={t('COMPLETE_PODS_DESC')}
            >
              <NumberInput min={0} name={`${this.prefix}completions`} integer />
            </Form.Item>
            <Form.Item
              label={t('MAXIMUM_DURATION')}
              desc={t('MAXIMUM_DURATION_DESC')}
            >
              <NumberInput
                min={0}
                name={`${this.prefix}activeDeadlineSeconds`}
                integer
              />
            </Form.Item>
          </Column>
        </Columns>
      </Form>
    )
  }
}
