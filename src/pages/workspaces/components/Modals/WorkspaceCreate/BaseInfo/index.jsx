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

import { Form, Input, Select, TextArea } from '@kube-design/components'
import { pick } from 'lodash'
import { observer } from 'mobx-react'
import React from 'react'
import UserStore from 'stores/user'
import { PATTERN_ALIAS_NAME, PATTERN_NAME } from 'utils/constants'

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
        message: t('INVALID_WORKSPACE_NAME'),
        field: rule.field,
      })
    }

    this.props.store.checkName({ name: value }).then(resp => {
      if (resp.exist) {
        return callback({
          message: t('WORKSPACE_NAME_EXISTS_DESC'),
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
          <div>{t('BASIC_INFORMATION')}</div>
          <p>{t('WORKSPACE_CREATE_DESC')}</p>
        </div>
        <Form data={formTemplate} ref={formRef}>
          <Form.Item
            label={t('NAME')}
            desc={t('NAME_DESC')}
            rules={[
              {
                required: true,
                message: t('WORKSPACE_NAME_EMPTY_DESC'),
              },
              {
                pattern: PATTERN_NAME,
                message: t('INVALID_NAME_DESC'),
              },
              { validator: this.nameValidator },
            ]}
          >
            <Input name="metadata.name" autoFocus={true} maxLength={63} />
          </Form.Item>
          <Form.Item
            label={t('ALIAS')}
            desc={t('ALIAS_NAME_DESC')}
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
          <Form.Item label={t('ADMINISTRATOR')}>
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
          <Form.Item label={t('DESCRIPTION')} desc={t('DESCRIPTION_DESC')}>
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
