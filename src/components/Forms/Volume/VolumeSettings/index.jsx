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
import { get, set, unset } from 'lodash'
import { MODULE_KIND_MAP } from 'utils/constants'
import { Form } from '@kube-design/components'
import { TypeSelect } from 'components/Base'
import FormTemplate from './FormTemplate'
import SnapshotForm from './SnapshotForm'

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

export default class VolumeSettings extends React.Component {
  get formTemplate() {
    const { formTemplate, module } = this.props
    return get(formTemplate, MODULE_KIND_MAP[module], formTemplate)
  }

  get fedFormTemplate() {
    return this.props.isFederated
      ? get(this.formTemplate, 'spec.template')
      : this.formTemplate
  }

  state = {
    fromSnapshot: !!get(this.formTemplate, 'spec.dataSource.name'),
  }

  handleChange = fromSnapshot => {
    if (fromSnapshot !== this.state.fromSnapshot) {
      unset(this.fedFormTemplate, 'spec.storageClassName')
      set(this.fedFormTemplate, 'spec.accessModes', [])
      set(this.fedFormTemplate, 'spec.dataSource', {})
      set(this.fedFormTemplate, 'spec.resources.requests.storage', '0Gi')
      this.setState({ fromSnapshot })
    }
  }

  render() {
    const { formRef, isFederated, cluster } = this.props
    const { fromSnapshot } = this.state

    return (
      <Form data={this.fedFormTemplate} ref={formRef}>
        {!isFederated && (
          <Form.Item label={t('CREATION_METHOD')}>
            <TypeSelect
              value={fromSnapshot}
              options={CREATE_TYPE_OPTIONS}
              onChange={this.handleChange}
            />
          </Form.Item>
        )}
        {fromSnapshot ? (
          <SnapshotForm
            namespace={get(this.formTemplate, 'metadata.namespace')}
            cluster={cluster}
          />
        ) : (
          <FormTemplate cluster={cluster} isFederated={isFederated} />
        )}
      </Form>
    )
  }
}
