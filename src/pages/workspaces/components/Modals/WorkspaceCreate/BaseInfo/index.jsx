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

import { pick } from 'lodash'
import React from 'react'
import { observer } from 'mobx-react'
import { Input, Select, Form, TextArea } from '@kube-design/components'
import { PATTERN_NAME } from 'utils/constants'
import UserStore from 'stores/user'

import styles from './index.scss'

@observer
export default class BaseInfo extends React.Component {
  constructor(props) {
    super(props)

    this.userStore = new UserStore()

    this.fetchUsers()
  }

  fetchUsers = params => {
    return this.userStore.fetchList({
      ...params,
    })
  }

  get users() {
    const manger = globals.user.username
    const users = this.userStore.list.data.map(user => ({
      label: user.username,
      value: user.username,
    }))

    if (users.every(item => item.value !== manger)) {
      users.unshift({
        label: manger,
        value: manger,
      })
    }

    return users
  }

  nameValidator = (rule, value, callback) => {
    if (!value) {
      return callback()
    }

    if (value === 'workspaces') {
      return callback({
        message: t('current name is not available'),
        field: rule.field,
      })
    }

    this.props.store.checkName({ name: value }).then(resp => {
      if (resp.exist) {
        return callback({
          message: t('Workspace name exists'),
          field: rule.field,
        })
      }
      callback()
    })
  }

  render() {
    const { formRef, formTemplate } = this.props

    return (
      <div className={styles.wrapper}>
        <div className={styles.step}>
          <div>{t('Basic Info')}</div>
          <p>{t('WORKSPACE_CREATE_DESC')}</p>
        </div>
        <Form data={formTemplate} ref={formRef}>
          <Form.Item
            label={t('Workspace Name')}
            desc={t('NAME_DESC')}
            rules={[
              {
                required: true,
                message: t('Please input workspace name'),
              },
              {
                pattern: PATTERN_NAME,
                message: t('Invalid name', { message: t('NAME_DESC') }),
              },
              { validator: this.nameValidator },
            ]}
          >
            <Input name="metadata.name" autoFocus={true} maxLength={63} />
          </Form.Item>
          <Form.Item label={t('Alias')} desc={t('ALIAS_DESC')}>
            <Input
              name="metadata.annotations['kubesphere.io/alias-name']"
              maxLength={63}
            />
          </Form.Item>
          <Form.Item label={t('Workspace Manager')}>
            <Select
              name="spec.template.spec.manager"
              options={this.users}
              pagination={pick(this.userStore.list, ['page', 'limit', 'total'])}
              isLoading={this.userStore.list.isLoading}
              onFetch={this.fetchUsers}
              defaultValue={globals.user.username}
              onChange={this.handleChange}
              searchable
            />
          </Form.Item>
          <Form.Item label={t('Description')} desc={t('DESCRIPTION_DESC')}>
            <TextArea
              name="metadata.annotations['kubesphere.io/description']"
              maxLength={256}
              rows="3"
            />
          </Form.Item>
        </Form>
      </div>
    )
  }
}
