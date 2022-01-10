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
import { get } from 'lodash'

import { Form, Input, TextArea } from '@kube-design/components'
import { Modal } from 'components/Base'
import TimeInput from './time.input'
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
    let type = 'https'

    if (detail && detail.url) {
      const matches = detail.url.match(/^(.*):\/\//)
      if (matches[1]) {
        type = matches[1]
      }
    }

    const data = {
      type,
      name: '',
      sync_period: get(detail, 'sync_period', '0s'),
      repoType: 'Helm',
      visibility: 'public',
      credential: '{}',
      providers: ['kubernetes'],
      ...detail,
    }

    return data
  }

  getSeconds = timeStr => {
    const unit = timeStr.slice(-1)
    const number = timeStr.slice(0, -1)
    const value = parseFloat(timeStr)

    if (value.toString() !== number) {
      return 179
    }
    switch (unit) {
      default:
      case 's':
        return value
      case 'm':
        return value * 60
      case 'h':
        return value * 60 * 60
    }
  }

  timeValidator = (rule, value, callback) => {
    const data = this.getSeconds(value)
    const time = /^[0-9]*$/

    if (!data) {
      return callback()
    }
    if (!time.test(data)) {
      return callback({ message: t('SYNC_INTERVAL_INVALID') })
    }

    if (data !== 0 && (data > 86400 || data < 180)) {
      return callback({ message: t('SYNC_INTERVAL_TIP') })
    }
    callback()
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
    const { detail, store, onOk, onCancel, workspace, ...rest } = this.props

    const title = detail ? 'EDIT_APP_REPO' : 'ADD_APP_REPO'

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
          label={t('NAME')}
          rules={[{ required: true, message: t('NAME_EMPTY_DESC') }]}
        >
          <Input name="name" autoFocus={true} />
        </Form.Item>
        <UrlInput
          store={store}
          workspace={workspace}
          formData={this.state.formData}
          onValidate={this.handleUrlValidate}
          isSubmitting={this.props.isSubmitting}
        />
        <Form.Item
          label={t('SYNC_INTERVAL')}
          desc={t('SYNC_INTERVAL_DESC')}
          rules={[
            { required: true, message: t('SYNC_PERIOD_EMPTY_DESC') },
            { validator: this.timeValidator },
          ]}
        >
          <TimeInput name="sync_period" />
        </Form.Item>
        <Form.Item label={t('DESCRIPTION')} desc={t('DESCRIPTION_DESC')}>
          <TextArea name="description" maxLength={256} />
        </Form.Item>
      </Modal.Form>
    )
  }
}
