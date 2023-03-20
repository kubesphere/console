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
import { ProjectSelect } from 'components/Inputs'
import { debounce, get, set } from 'lodash'
import { observer } from 'mobx-react'
import React from 'react'
import ProjectStore from 'stores/project'

import { updateLabels } from 'utils'
import {
  APP_LABEL_MODULES,
  MODULE_KIND_MAP,
  PATTERN_ALIAS_NAME,
  PATTERN_NAME,
} from 'utils/constants'

@observer
export default class BaseInfo extends React.Component {
  projectStore = new ProjectStore()

  componentDidMount() {
    this.fetchProjects()
  }

  fetchProjects = (params = {}) => {
    const { cluster } = this.props
    return this.projectStore.fetchList({
      cluster,
      labelSelector: 'kubefed.io/managed=true',
      ...params,
    })
  }

  getProjects() {
    const { data } = this.projectStore.list
    const result = data.map(item => ({
      value: item.name,
    }))
    return result
  }

  get cluster() {
    return this.props.cluster
  }

  get namespace() {
    return get(this.formTemplate, 'metadata.namespace')
  }

  get formTemplate() {
    const { formTemplate, module } = this.props
    return get(formTemplate, MODULE_KIND_MAP[module], formTemplate)
  }

  get fedFormTemplate() {
    return this.props.isFederated
      ? get(this.formTemplate, 'spec.template')
      : this.formTemplate
  }

  nameValidator = (rule, value, callback) => {
    if (!value) {
      return callback()
    }

    this.props.store
      .checkName({
        name: value,
        namespace: this.namespace,
        cluster: this.cluster,
      })
      .then(resp => {
        if (resp.exist) {
          return callback({ message: t('NAME_EXIST_DESC'), field: rule.field })
        }
        callback()
      })
  }

  projectValidator = (rule, value, callback) => {
    const options = this.getProjects()
    const hasDisableValue = options.some(item => item.value === value)

    return hasDisableValue
      ? callback({ message: t('INVALID_PROJECT') })
      : callback()
  }

  handleNameChange = debounce(value => {
    const { module, isFederated } = this.props

    const labels = get(this.fedFormTemplate, 'metadata.labels', {})

    if (APP_LABEL_MODULES.includes(module)) {
      labels.app = value.slice(0, 63)
    }

    updateLabels(this.fedFormTemplate, module, labels)

    if (isFederated && APP_LABEL_MODULES.includes(module)) {
      set(this.formTemplate, 'metadata.labels.app', value.slice(0, 63))
    }
  }, 200)

  render() {
    const { formRef, maxNameLength = 253 } = this.props

    const desc = maxNameLength === 253 ? t('LONG_NAME_DESC') : t('NAME_DESC')

    return (
      <Form data={this.formTemplate} ref={formRef}>
        <Columns>
          <Column>
            <Form.Item
              label={t('NAME')}
              desc={desc}
              rules={[
                { required: true, message: t('NAME_EMPTY_DESC') },
                {
                  pattern: PATTERN_NAME,
                  message: t('INVALID_NAME_DESC', { message: desc }),
                },
                { validator: this.nameValidator },
              ]}
            >
              <Input
                name="metadata.name"
                onChange={this.handleNameChange}
                maxLength={maxNameLength}
                autoFocus={true}
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
          {!this.props.namespace && (
            <Column>
              <Form.Item
                label={t('PROJECT')}
                desc={t('SELECT_PROJECT_DESC')}
                rules={[
                  { required: true, message: t('PROJECT_NOT_SELECT_DESC') },
                  { validator: this.projectValidator },
                ]}
              >
                <ProjectSelect
                  name="metadata.namespace"
                  cluster={this.props.cluster}
                  defaultValue={this.namespace}
                />
              </Form.Item>
            </Column>
          )}
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
