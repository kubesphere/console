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

import { get, debounce, isEmpty, isUndefined, set } from 'lodash'
import React from 'react'
import { Form } from 'components/Base'
import { PropertiesInput } from 'components/Inputs'
import { isValidLabel, updateLabels } from 'utils'

export default class Metadata extends React.Component {
  get fedPrefix() {
    return this.props.isFederated ? 'spec.template.' : ''
  }

  handleLabelsChange = debounce(value => {
    const {
      module,
      kind,
      isFederated,
      formTemplate,
      onLabelsChange,
    } = this.props

    const template = isFederated
      ? get(formTemplate[kind], 'spec.template')
      : formTemplate[kind]
    updateLabels(template, module, value)

    if (isFederated) {
      set(formTemplate[kind], 'metadata.labels', value)
    }

    onLabelsChange && onLabelsChange(value)
  }, 200)

  labelsValidator = (rule, value, callback) => {
    if (isUndefined(value)) {
      return callback()
    }
    if (isEmpty(value)) {
      return callback({ message: t('Labels cannot be empty') })
    }

    if (!isValidLabel(value)) {
      return callback({ message: t('LABEL_FORMAT_DESC') })
    }

    this.props.store
      .checkLabels({
        labels: value,
        namespace: this.props.namespace,
        cluster: this.props.cluster,
      })
      .then(resp => {
        if (resp.exist) {
          return callback({ message: t('Labels exists'), field: rule.field })
        }
        callback()
      })
  }

  render() {
    const { kind, noWorkload } = this.props
    return (
      <>
        <Form.Item
          label={t('Labels')}
          rules={[
            { required: true, message: t('Labels cannot be empty') },
            { validator: this.labelsValidator },
          ]}
        >
          <PropertiesInput
            name={`${kind}.${this.fedPrefix}metadata.labels`}
            addText={t('Add Label')}
            onChange={this.handleLabelsChange}
          />
        </Form.Item>
        {!noWorkload && (
          <Form.Item
            label={`${t('Annotations')} (${t('Applied to the workload')})`}
          >
            <PropertiesInput
              name={`${kind}.metadata.annotations`}
              addText={t('Add Annotation')}
              hiddenKeys={globals.config.preservedAnnotations}
            />
          </Form.Item>
        )}
      </>
    )
  }
}
