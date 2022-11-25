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
import React from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'

import { Form, Select } from '@kube-design/components'
import { Modal } from 'components/Base'

import User from './User'

import styles from './index.scss'

@observer
export default class ModifyMemberModal extends React.Component {
  static propTypes = {
    users: PropTypes.array,
    roles: PropTypes.array,
    visible: PropTypes.bool,
    onOk: PropTypes.func,
    onCancel: PropTypes.func,
    isSubmitting: PropTypes.bool,
  }

  static defaultProps = {
    users: [],
    roles: [],
    visible: false,
    isSubmitting: false,
    onOk() {},
    onCancel() {},
  }

  handleOk = (data = {}) => {
    const { onOk, users } = this.props
    const { role } = data
    onOk(users, role)
  }

  getRoleOptions = () => {
    const { roles } = this.props
    return roles.map(role => {
      const desc = get(role, 'description')
      return {
        label: role.name,
        value: role.name,
        desc: t(desc),
      }
    })
  }

  optionRenderer = option => (
    <div className={styles.option}>
      <div>{option.label}</div>
      <p>{option.desc}</p>
    </div>
  )

  render() {
    const { visible, onCancel, users, isSubmitting } = this.props

    return (
      <Modal.Form
        width={691}
        title={t('MODIFY_MEMBER_ROLE')}
        icon="role"
        onOk={this.handleOk}
        onCancel={onCancel}
        visible={visible}
        isSubmitting={isSubmitting}
      >
        <div className="margin-b12">
          {users.map(user => (
            <User key={user.username} user={user} />
          ))}
        </div>
        <Form.Item
          label={t('ROLE')}
          rules={[{ required: true, message: t('SELECT_ROLE_TIP') }]}
        >
          <Select
            name="role"
            optionRenderer={this.optionRenderer}
            options={this.getRoleOptions()}
          />
        </Form.Item>
      </Modal.Form>
    )
  }
}
