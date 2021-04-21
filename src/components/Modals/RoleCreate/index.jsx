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

import { get, set } from 'lodash'
import React from 'react'
import { observer } from 'mobx-react'
import PropTypes from 'prop-types'
import { Input, Form, Alert, TextArea } from '@kube-design/components'

import { Modal } from 'components/Base'
import EditAuthorization from 'components/Modals/EditAuthorization'

import { PATTERN_NAME } from 'utils/constants'

@observer
export default class CreateModal extends React.Component {
  static propTypes = {
    store: PropTypes.object,
    module: PropTypes.string,
    roleTemplates: PropTypes.array,
    formTemplate: PropTypes.object,
    title: PropTypes.string,
    visible: PropTypes.bool,
    onOk: PropTypes.func,
    onCancel: PropTypes.func,
    isSubmitting: PropTypes.bool,
  }

  static defaultProps = {
    visible: false,
    isSubmitting: false,
    module: 'roles',
    onOk() {},
    onCancel() {},
  }

  state = {
    showEditAuthorization: false,
  }

  showEditAuthorization = () => {
    this.setState({ showEditAuthorization: true })
  }

  hideEditAuthorization = () => {
    this.setState({ showEditAuthorization: false })
  }

  handleCreate = roleTemplates => {
    set(
      this.props.formTemplate,
      'metadata.annotations["iam.kubesphere.io/aggregation-roles"]',
      JSON.stringify(roleTemplates)
    )
    this.props.onOk(this.props.formTemplate)
  }

  roleNameValidator = (rule, value, callback) => {
    if (!value) {
      return callback()
    }

    const { workspace, cluster, namespace } = this.props
    const name = get(this.props.formTemplate, 'metadata.name')

    if (this.props.edit && name === value) {
      return callback()
    }

    this.props.store
      .checkName({ name: value, workspace, cluster, namespace })
      .then(resp => {
        if (resp.exist) {
          return callback({ message: t('Role name exists'), field: rule.field })
        }
        callback()
      })
  }

  render() {
    const {
      title,
      visible,
      module,
      onCancel,
      formTemplate,
      roleTemplates,
      isSubmitting,
    } = this.props
    const { showEditAuthorization } = this.state

    const isWorkspaceRole = module === 'workspaceroles'

    if (showEditAuthorization) {
      return (
        <EditAuthorization
          module={module}
          visible={showEditAuthorization}
          formTemplate={formTemplate}
          roleTemplates={roleTemplates}
          onOk={this.handleCreate}
          onCancel={this.hideEditAuthorization}
          isSubmitting={isSubmitting}
        />
      )
    }

    return (
      <Modal.Form
        width={600}
        title={title || t('Create Role')}
        icon="role"
        data={formTemplate}
        onCancel={onCancel}
        onOk={this.showEditAuthorization}
        okText={t('Edit Authorization')}
        visible={visible}
      >
        <Form.Item
          label={t('Role Identifier')}
          desc={t('NAME_DESC')}
          tip={isWorkspaceRole ? t('WORKSPACE_ROLE_NAME_TIP') : null}
          rules={[
            { required: true, message: t('Please input role name') },
            {
              pattern: PATTERN_NAME,
              message: t('Invalid name', { message: t('NAME_DESC') }),
            },
            { validator: this.roleNameValidator },
          ]}
        >
          <Input name="metadata.name" maxLength={63} />
        </Form.Item>
        <Form.Item label={t(`${t('Role Name')}`)} desc={t('ALIAS_DESC')}>
          <Input
            name="metadata.annotations['kubesphere.io/alias-name']"
            maxLength={63}
          />
        </Form.Item>
        <Form.Item label={t('Description')} desc={t('DESCRIPTION_DESC')}>
          <TextArea
            name="metadata.annotations['kubesphere.io/description']"
            maxLength={256}
          />
        </Form.Item>
        <Alert
          className="margin-t12"
          title={t('ROLE_CREATE_TIP_TITLE')}
          message={t('ROLE_CREATE_TIP_MESSAGE')}
        />
      </Modal.Form>
    )
  }
}
