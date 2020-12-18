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
import { Modal } from 'components/Base'

import SubnetSettings from 'components/Forms/Subnet/SubnetSettings'

export default class EditSubnetModal extends React.Component {
  static propTypes = {
    visible: PropTypes.bool,
    detail: PropTypes.object,
    onOk: PropTypes.func,
    onCancel: PropTypes.func,
    isSubmitting: PropTypes.bool,
  }

  static defaultProps = {
    visible: false,
    detail: {},
    onOk() {},
    onCancel() {},
    isSubmitting: false,
  }

  constructor(props) {
    super(props)

    this.formRef = React.createRef()

    this.state = { formTemplate: props.detail }
  }

  handleOk = () => {
    const { onOk } = this.props
    const form = this.formRef.current
    form &&
      form.validate(() => {
        onOk(form.getData())
      })
  }

  handleCancel = () => {
    const { onCancel } = this.props

    onCancel()
  }

  renderForm() {
    return (
      <SubnetSettings
        formRef={this.formRef}
        formTemplate={this.props.formTemplate}
        onCancel={this.resetState}
        cluster={this.props.cluster}
        editdisabled={true}
        {...this.props}
      />
    )
  }

  render() {
    const { visible, isSubmitting } = this.props
    return (
      <Modal
        width={1162}
        title={t('Edit Subnet')}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        visible={visible}
        isSubmitting={isSubmitting}
      >
        {this.renderForm()}
      </Modal>
    )
  }
}
