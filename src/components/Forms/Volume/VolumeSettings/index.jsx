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
import { get, set } from 'lodash'
import { MODULE_KIND_MAP } from 'utils/constants'
import { Form, TypeSelect } from 'components/Base'

import FormTemplate from './FormTemplate'
import SnapshotForm from './SnapshotForm'

const CREATE_TYPE_OPTIONS = [
  {
    icon: 'snapshot',
    value: 'snapshot',
    get label() {
      return t('CREATE_VOLUME_BY_SNAPSHOT')
    },
    get description() {
      return t('SELECT_SNAPSHOT_TO_CREATE_VOLUME')
    },
  },
  {
    icon: 'database',
    value: 'storageclass',
    get label() {
      return t('CREATE_VOLUME_BY_STORAGECLASS')
    },
    get description() {
      return t('STORAGE_CLASS_DESC')
    },
  },
]

const CREATE_WAY = {
  SNAPSHOT: 'snapshot',
  NORMAL: 'storageclass',
}
const DEFAULT_CREATE_WAY = CREATE_WAY.NORMAL
/**
 * use for save the temporary message
 */
const CREATE_TYPE_NAME = 'create_way'

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
    method: this.formTemplate[CREATE_TYPE_NAME] || DEFAULT_CREATE_WAY,
  }

  handeChange = method => {
    this.setState({ method })

    /**
     * reset the form data, make it easy to dev
     */
    set(this.fedFormTemplate, 'spec.accessModes', [])
    set(this.fedFormTemplate, 'dataSource', {})
    set(this.fedFormTemplate, 'spec.resources.requests.storage', '0Gi')
  }

  render() {
    const { formRef, cluster } = this.props
    const { method } = this.state

    return (
      <Form data={this.fedFormTemplate} ref={formRef}>
        <Form.Item label={t('Method')}>
          <TypeSelect
            name={CREATE_TYPE_NAME}
            defaultValue={DEFAULT_CREATE_WAY}
            options={CREATE_TYPE_OPTIONS}
            onChange={this.handeChange}
          />
        </Form.Item>
        {method === CREATE_WAY.SNAPSHOT ? (
          <SnapshotForm
            namespace={get(this.formTemplate, 'metadata.namespace')}
          />
        ) : (
          <FormTemplate cluster={cluster} />
        )}
      </Form>
    )
  }
}
