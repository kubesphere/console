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

import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Input, TextArea } from '@pitrix/lego-ui'
import { Modal, Form } from 'components/Base'
import UrlInput from './url.input'

import styles from './index.scss'

export default class AddRepoModal extends Component {
  static propTypes = {
    store: PropTypes.object,
    detail: PropTypes.object,
    visible: PropTypes.bool,
    isSubmitting: PropTypes.bool,
    onOk: PropTypes.func,
    onCancel: PropTypes.func,
  }

  static defaultProps = {
    visible: false,
    isSubmitting: false,
    onOk() {},
    onCancel() {},
  }

  constructor(props) {
    super(props)

    this.formRef = React.createRef()
    this.state = {
      formData: this.getFormData(props.detail),
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.detail !== prevProps.detail) {
      this.setState({
        formData: this.getFormData(this.props.detail),
      })
    }
  }

  getFormData = detail => {
    const data = Object.assign(
      {
        name: '',
        repoType: 'Helm',
        type: 'https',
        visibility: 'public',
        credential: '{}',
        providers: ['kubernetes'],
      },
      detail
    )

    return data
  }

  handleSubmit = data => {
    this.props.onOk(data).then(() => {
      this.setState({ formData: this.getFormData({}) })
    })
  }

  handleCancel = () => {
    this.props.onCancel()
    this.setState({ formData: this.getFormData({}) })
  }

  handleUrlValidate = data => {
    this.setState({ isValid: data.isValid })
  }

  render() {
    const { detail, store, onOk, onCancel, ...rest } = this.props

    const title = detail ? 'Edit App Repository' : 'Add App Repository'

    return (
      <Modal.Form
        bodyClassName={styles.body}
        title={t(title)}
        icon="firewall"
        width={691}
        data={this.state.formData}
        onOk={this.handleSubmit}
        onCancel={this.handleCancel}
        {...rest}
      >
        <Form.Item
          label={t('App Repository Name')}
          rules={[{ required: true, message: t('Please input name') }]}
        >
          <Input name="name" autoFocus={true} />
        </Form.Item>
        <Form.Item label={t('Type')}>
          <Input name="repoType" defaultValue="Helm" disabled />
        </Form.Item>
        <UrlInput
          store={store}
          formData={this.state.formData}
          onValidate={this.handleUrlValidate}
          isSubmitting={this.props.isSubmitting}
        />
        <Form.Item label={t('Description')}>
          <TextArea
            name="description"
            placeholder={t('SHORT_DESCRIPTION_DESC')}
          />
        </Form.Item>
      </Modal.Form>
    )
  }
}
