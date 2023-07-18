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

import { debounce, get, isEmpty, isUndefined, set } from 'lodash'
import React from 'react'
import { Form } from '@kube-design/components'
import { PropertiesInput } from 'components/Inputs'
import { isValidLabel, updateLabels, updateFederatedAnnotations } from 'utils'

export default class Metadata extends React.Component {
  get formTemplate() {
    return this.props.formTemplate
  }

  get fedFormTemplate() {
    return this.props.isFederated
      ? get(this.formTemplate, 'spec.template')
      : this.formTemplate
  }

  handleLabelsChange = debounce(value => {
    const { module, isFederated } = this.props
    updateLabels(this.fedFormTemplate, module, value)
    if (isFederated) {
      set(this.formTemplate, 'metadata.labels', value)
    }
  }, 200)

  handleAnnotationsChange = debounce(value => {
    if (this.props.isFederated) {
      set(this.formTemplate, 'metadata.annotations', value)
      updateFederatedAnnotations(this.formTemplate)
    }
  }, 200)

  labelsValidator = (rule, value, callback) => {
    if (isUndefined(value) || isEmpty(value)) {
      return callback()
    }

    if (!isValidLabel(value)) {
      return callback({ message: t('LABEL_FORMAT_DESC') })
    }

    const { namespace, cluster } = this.props
    this.props.store
      .checkLabels({ labels: value, namespace, cluster })
      .then(resp => {
        if (resp.exist) {
          this.props.formGroupRef.current.state.isCheck = true
          return callback({ message: t('DUPLICATE_LABELS'), field: rule.field })
        }
        callback()
      })
  }

  render() {
    return (
      <>
        <Form.Item
          label={t('LABEL_PL')}
          rules={[{ validator: this.labelsValidator }]}
        >
          <PropertiesInput
            name="metadata.labels"
            addText={t('ADD')}
            onChange={this.handleLabelsChange}
          />
        </Form.Item>
        <Form.Item label={t('ANNOTATION_PL')}>
          <PropertiesInput
            name="metadata.annotations"
            addText={t('ADD')}
            hiddenKeys={globals.config.preservedAnnotations}
            onChange={this.handleAnnotationsChange}
          />
        </Form.Item>
      </>
    )
  }
}
