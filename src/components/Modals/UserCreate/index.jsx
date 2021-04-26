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

import { get } from 'lodash'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { computed } from 'mobx'
import { observer } from 'mobx-react'

import { Form, Input, Select, TextArea } from '@kube-design/components'
import { Modal } from 'components/Base'
import { InputPassword } from 'components/Inputs'
import { isSystemRole } from 'utils'
import { PATTERN_NAME, PATTERN_PASSWORD } from 'utils/constants'
import RoleStore from 'stores/role'

import styles from './index.scss'

@observer
export default class UserCreateModal extends Component {
  static propTypes = {
    store: PropTypes.object,
    detail: PropTypes.object,
    visible: PropTypes.bool,
    onOk: PropTypes.func,
    onCancel: PropTypes.func,
    isSubmitting: PropTypes.bool,
  }

  static defaultProps = {
    visible: false,
    isSubmitting: false,
    onOk() {},
    onCancel() {},
  }

  state = {
    formTemplate: {
      apiVersion: 'iam.kubesphere.io/v1alpha2',
      kind: 'User',
      ...get(this.props, 'detail._originData', {}),
    },
  }

  globalRoleStore = new RoleStore('globalroles')

  componentDidMount() {
    this.globalRoleStore.fetchList({ limit: -1, sortBy: 'createTime' })
  }

  @computed
  get globalRoles() {
    return this.globalRoleStore.list.data
      .filter(role => !isSystemRole(role.name))
      .map(role => ({
        label: role.name,
        value: role.name,
        item: role,
      }))
  }

  userNameValidator = (rule, value, callback) => {
    if (!value) {
      return callback()
    }

    this.props.store.checkName({ name: value }).then(resp => {
      if (resp.exist) {
        return callback({ message: t('User name exists'), field: rule.field })
      }
      callback()
    })
  }

  emailValidator = (rule, value, callback) => {
    if (!value) {
      return callback()
    }

    this.props.store.checkEmail(value).then(resp => {
      if (resp.exist) {
        return callback({ message: t('Email exists'), field: rule.field })
      }
      callback()
    })
  }

  optionRenderer = option => (
    <div className={styles.option}>
      <div>{option.item.name}</div>
      <p>{option.item.description}</p>
    </div>
  )

  render() {
    const { store, detail, ...rest } = this.props

    const title = detail ? 'Edit User' : 'Add User'

    const userRules = detail
      ? [{ required: true, message: t('Please input user name') }]
      : [
          { required: true, message: t('Please input user name') },
          {
            pattern: PATTERN_NAME,
            message: t('Invalid user name', { message: t('USER_NAME_DESC') }),
          },
          { validator: this.userNameValidator },
        ]

    const emailRules = detail
      ? [{ required: true, message: t('Please input email') }]
      : [
          { required: true, message: t('Please input email') },
          { type: 'email', message: t('Invalid email') },
          { validator: this.emailValidator },
        ]

    return (
      <Modal.Form
        title={t(title)}
        icon="human"
        width={691}
        data={this.state.formTemplate}
        {...rest}
      >
        <input name="username" className="hidden-input" type="text" disabled />
        <input
          name="password"
          className="hidden-input"
          type="password"
          disabled
        />
        <Form.Item
          label={t('User Name')}
          desc={t('USER_NAME_DESC')}
          rules={userRules}
        >
          <Input
            name="metadata.name"
            placeholder="username"
            autoComplete="nope"
            disabled={!!detail}
            autoFocus={true}
            maxLength={32}
          />
        </Form.Item>
        <Form.Item label={t('Email')} desc={t('EMAIL_DESC')} rules={emailRules}>
          <Input
            name="spec.email"
            placeholder="User@example.com"
            autoComplete="nope"
          />
        </Form.Item>
        <Form.Item label={t('Role')} desc={t('ROLE_DESC')}>
          <Select
            name="metadata.annotations['iam.kubesphere.io/globalrole']"
            optionRenderer={this.optionRenderer}
            options={this.globalRoles}
          />
        </Form.Item>
        {!detail && (
          <Form.Item
            className={styles.password}
            label={t('Password')}
            desc={t('PASSWORD_DESC')}
            rules={[
              { required: true, message: t('Please input password') },
              {
                pattern: PATTERN_PASSWORD,
                message: t('PASSWORD_DESC'),
              },
            ]}
          >
            <InputPassword
              name="spec.password"
              placeholder={t('Please input password')}
              autoComplete="nope"
              withStrength
            />
          </Form.Item>
        )}
        <Form.Item
          className={styles.textarea}
          label={t('Description')}
          desc={t('DESCRIPTION_DESC')}
        >
          <TextArea
            name="metadata.annotations['kubesphere.io/description']"
            maxLength={256}
            rows="3"
          />
        </Form.Item>
      </Modal.Form>
    )
  }
}
