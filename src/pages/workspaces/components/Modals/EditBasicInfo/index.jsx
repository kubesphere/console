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
import PropTypes from 'prop-types'
import copy from 'fast-copy'
import { observer } from 'mobx-react'
import { debounce, unset } from 'lodash'

import { Input, Select } from '@pitrix/lego-ui'
import { Form, Modal, TextArea } from 'components/Base'

import UserStore from 'stores/user'

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
      formData: copy(props.detail),
    }

    this.userStore = new UserStore()
    this.userStore.fetchList()
  }

  getUsers() {
    return this.userStore.list.data.map(user => ({
      label: user.username,
      value: user.username,
    }))
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
        title={t('Edit Info')}
        icon="enterprise"
        onOk={this.handleOk}
        okText={t('Update')}
        onCancel={onCancel}
        visible={visible}
        isSubmitting={isSubmitting}
      >
        <Form.Item label={t('Workspace Name')} desc={t('NAME_DESC')}>
          <Input name="metadata.name" disabled />
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
        <Form.Item label={t('Description')} desc={t('SHORT_DESCRIPTION_DESC')}>
          <TextArea
            name="metadata.annotations['kubesphere.io/description']"
            rows="3"
            maxLength={1000}
          />
        </Form.Item>
      </Modal.Form>
    )
  }
}
