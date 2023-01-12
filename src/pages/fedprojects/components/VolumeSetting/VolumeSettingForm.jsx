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
import { Form } from '@kube-design/components'
import { TypeSelect } from 'components/Base'

import FormTemplate from 'components/Forms/Volume/VolumeSettings/FormTemplate'
import SnapshotForm from 'components/Forms/Volume/VolumeSettings/SnapshotForm'

import Base from 'components/Forms/Volume/VolumeSettings'

const CREATE_TYPE_OPTIONS = [
  {
    icon: 'snapshot',
    value: true,
    get label() {
      return t('CREATE_VOLUME_BY_SNAPSHOT')
    },
    get description() {
      return t('SELECT_SNAPSHOT_TO_CREATE_VOLUME')
    },
  },
  {
    icon: 'database',
    value: false,
    get label() {
      return t('CREATE_VOLUME_BY_STORAGE_CLASS')
    },
    get description() {
      return t('SELECT_STORAGE_CLASS_CREATE_VOLUME')
    },
  },
]

export default class VolumeSettingsForm extends Base {
  render() {
    const { formRef, isFederated, cluster, formProps, isEdit } = this.props
    const { fromSnapshot } = this.state

    return (
      <Form data={this.fedFormTemplate} ref={formRef} {...formProps}>
        {!isFederated && (
          <Form.Item label={t('CREATION_METHOD')}>
            <TypeSelect
              value={fromSnapshot}
              options={CREATE_TYPE_OPTIONS}
              onChange={this.handeChange}
            />
          </Form.Item>
        )}
        {fromSnapshot ? (
          <SnapshotForm
            namespace={get(this.formTemplate, 'metadata.namespace')}
            cluster={cluster}
          />
        ) : (
          <FormTemplate
            cluster={cluster}
            isFederated={isFederated}
            isEdit={isEdit}
          />
        )}
      </Form>
    )
  }
}
