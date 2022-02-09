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
import { toJS } from 'mobx'
import { observer } from 'mobx-react'
import copy from 'fast-copy'

import { Form } from '@kube-design/components'
import { Modal } from 'components/Base'
import { RoleSelect } from 'components/Inputs'

import RoleStore from 'stores/role'

@observer
export default class ModifyModal extends React.Component {
  static propTypes = {
    detail: PropTypes.object,
    title: PropTypes.string,
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

  roleStore = new RoleStore()

  constructor(props) {
    super(props)

    this.state = {
      formData: copy(toJS(props.detail._originData)),
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.visible && this.props.visible !== prevProps.visible) {
      this.setState({ formData: copy(toJS(this.props.detail._originData)) })
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
    const {
      title,
      visible,
      onCancel,
      isSubmitting,
      cluster,
      namespace,
    } = this.props
    const { formData } = this.state

    return (
      <Modal.Form
        width={600}
        title={title || t('CHANGE_ROLE')}
        icon="client"
        data={formData}
        onOk={this.handleOk}
        onCancel={onCancel}
        visible={visible}
        isSubmitting={isSubmitting}
      >
        <Form.Item
          label={t('PROJECT_ROLE_SI')}
          desc={t('SERVICE_ACCOUNT_PROJECT_ROLE_DESC')}
        >
          <RoleSelect
            name="metadata.annotations['iam.kubesphere.io/role']"
            cluster={cluster}
            namespace={namespace}
            placeholder=" "
          />
        </Form.Item>
      </Modal.Form>
    )
  }
}
