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

import { Form, Input, RadioGroup, Radio } from '@kube-design/components'

import styles from './index.scss'

export default function ParamsInput({ option }) {
  function renderFormItems(type) {
    let content = null

    switch (type) {
      case 'string':
        content = renderStringFormItems()
        break
      case 'bool':
        content = renderBooleanFormItems()
        break
      default:
        content = renderStringFormItems()
        break
    }

    return content
  }

  function renderStringFormItems() {
    return (
      <Form.Item
        label={option.name}
        desc={option.description}
        rules={[
          {
            required: option.required ?? false,
            message: t('PARAM_REQUIRED'),
          },
        ]}
      >
        <Input
          name={`paramsForm.${option.name}`}
          defaultValue={option.default || ''}
        />
      </Form.Item>
    )
  }

  function renderBooleanFormItems() {
    return (
      <Form.Item label={option.name}>
        <RadioGroup
          name={`paramsForm.${option.name}`}
          defaultValue={option.default || false}
        >
          <Radio value={true}>True</Radio>
          <Radio value={false}>False</Radio>
        </RadioGroup>
      </Form.Item>
    )
  }

  return (
    <div className={styles.itemWrapper}>{renderFormItems(option.type)}</div>
  )
}
