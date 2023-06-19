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

import { Form, Input, TextArea } from '@kube-design/components'
import { Modal } from 'components/Base'
import copy from 'fast-copy'
import { toJS } from 'mobx'
import { observer } from 'mobx-react'
import PropTypes from 'prop-types'
import React from 'react'

import RoleStore from 'stores/role'
import { PATTERN_ALIAS_NAME } from 'utils/constants'

@observer
export default class EditServiceAccountModal extends React.Component {
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

  roleStore = new RoleStore()

  constructor(props) {
    super(props)

    this.state = {
      formData: copy(toJS(props.detail._originData || props.detail)),
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.visible && this.props.visible !== prevProps.visible) {
      this.setState({
        formData: copy(
          toJS(this.props.detail._originData || this.props.detail)
        ),
      })
    }
  }

  handleOk = data => {
    const { onOk, store, detail } = this.props
    const list = store.list
    const selectedRowKeys = toJS(list.selectedRowKeys)
    const newSelectedRowKeys = selectedRowKeys.filter(
      item => item !== detail.uid
    )
    onOk(data)
    list.setSelectRowKeys(newSelectedRowKeys)
  }

  render() {
    const { visible, isSubmitting, onCancel } = this.props
    const { formData } = this.state

    return (
      <Modal.Form
        data={formData}
        width={691}
        title={t('EDIT_INFORMATION')}
        icon="pen"
        onOk={this.handleOk}
        okText={t('OK')}
        onCancel={onCancel}
        visible={visible}
        isSubmitting={isSubmitting}
      >
        <Form.Item label={t('NAME')}>
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
        <Form.Item label={t('DESCRIPTION')} desc={t('DESCRIPTION_DESC')}>
          <TextArea
            name="metadata.annotations['kubesphere.io/description']"
            maxLength={256}
          />
        </Form.Item>
      </Modal.Form>
    )
  }
}
