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

import { debounce, isEmpty, isUndefined } from 'lodash'
import React from 'react'
import { Form } from 'components/Base'
import { PropertiesInput } from 'components/Inputs'
import { isValidLabel, updateLabels } from 'utils'

export default class Metadata extends React.Component {
  handleLabelsChange = debounce(value => {
    const { module, formTemplate } = this.props
    updateLabels(formTemplate, module, value)
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
          return callback({ message: t('Labels exists'), field: rule.field })
        }
        callback()
      })
  }

  render() {
    return (
      <>
        <Form.Item
          label={t('Labels')}
          rules={[{ validator: this.labelsValidator }]}
        >
          <PropertiesInput
            name="metadata.labels"
            addText={t('Add Label')}
            onChange={this.handleLabelsChange}
            readOnlyKeys={['app']}
          />
        </Form.Item>
        <Form.Item label={t('Annotations')}>
          <PropertiesInput
            name="metadata.annotations"
            addText={t('Add Annotation')}
            hiddenKeys={globals.config.preservedAnnotations}
          />
        </Form.Item>
      </>
    )
  }
}
