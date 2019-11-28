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

import { observer } from 'mobx-react'

import { Input, TextArea } from '@pitrix/lego-ui'
import { Modal, Form } from 'components/Base'

@observer
export default class EditModal extends React.Component {
  static propTypes = {
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

  handleOk = data => {
    const { onOk } = this.props
    onOk(data)
  }

  render() {
    const { detail, visible, onCancel, isSubmitting } = this.props

    return (
      <Modal.Form
        width={691}
        title={t('Edit Info')}
        icon="pen"
        data={detail}
        onOk={this.handleOk}
        onCancel={onCancel}
        visible={visible}
        isSubmitting={isSubmitting}
      >
        <Form.Item label={t('Workspace Name')} desc={t('WORKSPACE_NAME_DESC')}>
          <Input name="metadata.name" disabled />
        </Form.Item>
        <Form.Item label={t('Description')} desc={t('SHORT_DESCRIPTION_DESC')}>
          <TextArea name="metadata.annotations['kubesphere.io/description']" />
        </Form.Item>
      </Modal.Form>
    )
  }
}
