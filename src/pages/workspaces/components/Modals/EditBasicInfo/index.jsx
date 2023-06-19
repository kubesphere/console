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
import { Modal } from 'components/Base'
import copy from 'fast-copy'
import { debounce, get, pick, unset } from 'lodash'
import { observer } from 'mobx-react'
import PropTypes from 'prop-types'
import React from 'react'

import UserStore from 'stores/user'
import { PATTERN_ALIAS_NAME } from 'utils/constants'

@observer
export default class EditBasicInfoModal extends React.Component {
  static propTypes = {
    detail: PropTypes.object,
    visible: PropTypes.bool,
    onOk: PropTypes.func,
    onCancel: PropTypes.func,
    isSubmitting: PropTypes.bool,
  }

  static defaultProps = {
    visible: false,
    onOk() {},
    onCancel() {},
    isSubmitting: false,
  }

  constructor(props) {
    super(props)
    this.state = {
      formData: copy(props.detail._originData),
    }

    this.userStore = new UserStore()
    this.fetchUsers()
  }

  fetchUsers = params => {
    return this.userStore.fetchList({
      ...params,
    })
  }

  get users() {
    const manger = get(this.props.detail, 'spec.template.spec.manager')
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

  handleOk = data => {
    const { onOk } = this.props

    unset(data, 'spec.clusters')
    onOk(data)
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
    const { visible, isSubmitting, onCancel } = this.props
    const { formData } = this.state

    return (
      <Modal.Form
        data={formData}
        width={691}
        title={t('EDIT_INFORMATION')}
        icon="enterprise"
        onOk={this.handleOk}
        okText={t('OK')}
        onCancel={onCancel}
        visible={visible}
        isSubmitting={isSubmitting}
      >
        <Form.Item label={t('NAME')} desc={t('NAME_DESC')}>
          <Input name="metadata.name" disabled />
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
      </Modal.Form>
    )
  }
}
