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

import { debounce } from 'lodash'
import React from 'react'
import { observer } from 'mobx-react'
import { Input, Select } from '@pitrix/lego-ui'
import { PATTERN_NAME } from 'utils/constants'
import { Form, TextArea } from 'components/Base'
import UserStore from 'stores/user'

import styles from './index.scss'

@observer
export default class BaseInfo extends React.Component {
  constructor(props) {
    super(props)

    this.userStore = new UserStore()
    this.userStore.fetchList()
  }

  getUsers() {
    return this.userStore.list.data.map(user => ({
      label: user.username,
      value: user.username,
    }))
  }

  get networkOptions() {
    return [
      { label: t('Off'), value: 'false' },
      { label: t('On'), value: 'true' },
    ]
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

  handleScrollToBottom = () => {
    if (
      !this.scrolling &&
      this.userStore.list.total > this.userStore.list.data.length
    ) {
      this.scrolling = true
      this.userStore
        .fetchList({
          more: true,
          page: this.userStore.list.page + 1,
        })
        .then(() => {
          this.scrolling = false
        })
    }
  }

  handleInputChange = debounce(value => {
    // Workaround for search in select, should be fixed after lego-ui upgrade
    if (!value && this._select) {
      this._select = false
      return
    }

    this._search = true
    this.userStore.fetchList({ name: value })
  }, 300)

  handleChange = value => {
    this._select = true
    if (!value && this._search) {
      this.userStore.fetchList()
      this._search = false
    }
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
            controlClassName={styles.nameWrapper}
            label={t('Workspace Name')}
            desc={t('NAME_DESC')}
            rules={[
              {
                required: true,
                message: t('Please input workspace name'),
              },
              {
                pattern: PATTERN_NAME,
                message: `${t('Invalid name')}`,
              },
              { validator: this.nameValidator },
            ]}
          >
            <Input name="metadata.name" autoFocus={true} />
          </Form.Item>
          <Form.Item label={t('Alias')} desc={t('ALIAS_DESC')}>
            <Input name="metadata.annotations['kubesphere.io/alias-name']" />
          </Form.Item>
          <Form.Item label={t('Workspace Manager')}>
            <Select
              name="spec.template.spec.manager"
              searchable
              options={this.getUsers()}
              defaultValue={globals.user.username}
              onChange={this.handleChange}
              onInputChange={this.handleInputChange}
              onBlurResetsInput={false}
              onCloseResetsInput={false}
              openOnClick={true}
              isLoadingAtBottom
              isLoading={this.userStore.list.isLoading}
              bottomTextVisible={
                this.userStore.list.total === this.userStore.list.data.length
              }
              onMenuScrollToBottom={this.handleScrollToBottom}
            />
          </Form.Item>
          <Form.Item
            label={t('Network Isolation')}
            desc={t('NETWORK_ISOLATED_DESC')}
          >
            <Select
              name="spec.template.spec.networkIsolation"
              options={this.networkOptions}
              defaultValue={String(globals.config.defaultNetworkIsolation)}
            />
          </Form.Item>
          <Form.Item
            controlClassName={styles.textarea}
            label={t('Description')}
            desc={t('SHORT_DESCRIPTION_DESC')}
          >
            <TextArea
              name="metadata.annotations['kubesphere.io/description']"
              rows="3"
              maxLength={1000}
            />
          </Form.Item>
        </Form>
      </div>
    )
  }
}
