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

import { Input } from '@pitrix/lego-ui'
import { Modal, Form, TextArea } from 'components/Base'

export default class AppEditModal extends React.Component {
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

  handleOk = data => {
    const { onOk } = this.props

    onOk(data)
  }

  render() {
    const { detail, visible, isSubmitting, onCancel } = this.props

    return (
      <Modal.Form
        data={detail}
        width={691}
        title={t('Edit Info')}
        icon="pen"
        onOk={this.handleOk}
        okText={t('Update')}
        onCancel={onCancel}
        visible={visible}
        isSubmitting={isSubmitting}
      >
        <Form.Item label={t('Name')} desc={t('LONG_NAME_DESC')}>
          <Input name="name" disabled />
        </Form.Item>
        <Form.Item label={t('Description')} desc={t('DESCRIPTION_DESC')}>
          <TextArea maxLength={1000} name="description" />
        </Form.Item>
      </Modal.Form>
    )
  }
}
