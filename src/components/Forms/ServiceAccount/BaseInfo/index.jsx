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
import { ProjectSelect, RoleSelect } from 'components/Inputs'
import { get, set } from 'lodash'
import { observer } from 'mobx-react'
import React from 'react'
import RoleStore from 'stores/role'

import {
  MODULE_KIND_MAP,
  PATTERN_ALIAS_NAME,
  PATTERN_NAME,
} from 'utils/constants'

@observer
export default class BaseInfo extends React.Component {
  roleStore = new RoleStore()

  constructor(props) {
    super(props)

    this.state = {
      cluster: props.cluster,
      workspace: props.workspace,
      namespace: props.namespace,
    }
  }

  get formTemplate() {
    const { formTemplate, module } = this.props
    return get(formTemplate, MODULE_KIND_MAP[module], formTemplate)
  }

  nameValidator = (rule, value, callback) => {
    if (!value) {
      return callback()
    }

    this.props.store
      .checkName({
        name: value,
        namespace: this.state.namespace,
        cluster: this.state.cluster,
      })
      .then(resp => {
        if (resp.exist) {
          return callback({ message: t('NAME_EXIST_DESC'), field: rule.field })
        }
        callback()
      })
  }

  handleChange = value => {
    set(this.formTemplate, 'metadata.annotations["iam.kubesphere.io/role"]', '')
    this.setState({ namespace: value })
  }

  render() {
    const { formRef } = this.props
    const { cluster, namespace } = this.state

    return (
      <Form data={this.formTemplate} ref={formRef}>
        <Columns>
          <Column>
            <Form.Item
              label={t('NAME')}
              desc={t('NAME_DESC')}
              rules={[
                { required: true, message: t('NAME_EMPTY_DESC') },
                {
                  pattern: PATTERN_NAME,
                  message: t('INVALID_NAME_DESC'),
                },
                { validator: this.nameValidator },
              ]}
            >
              <Input name="metadata.name" autoFocus={true} maxLength={63} />
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
                ]}
              >
                <ProjectSelect
                  name="metadata.namespace"
                  cluster={this.props.cluster}
                  onChange={this.handleChange}
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
        <Columns>
          <Column>
            <Form.Item
              label={t('PROJECT_ROLE_SI')}
              desc={t('SELECT_PROJECT_ROLE_DESC')}
            >
              <RoleSelect
                name="metadata.annotations['iam.kubesphere.io/role']"
                cluster={cluster}
                namespace={namespace}
                placeholder=" "
              />
            </Form.Item>
          </Column>
        </Columns>
      </Form>
    )
  }
}
