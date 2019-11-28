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

import { Input, Select } from '@pitrix/lego-ui'
import { Modal, Form } from 'components/Base'

import styles from './index.scss'

export default class PolicyStatusModal extends React.Component {
  static propTypes = {
    visible: PropTypes.bool,
    title: PropTypes.string,
    detail: PropTypes.object,
    onOk: PropTypes.func,
    onCancel: PropTypes.func,
  }

  static defaultProps = {
    visible: false,
    title: 'Change Status',
    detail: {},
    onOk() {},
    onCancel() {},
  }

  constructor(props) {
    super(props)

    this.state = {
      status: this.getStatus(props.detail),
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.detail !== this.props.detail) {
      this.setState({ status: this.getStatus(nextProps.detail) })
    }
  }

  get name() {
    const { name, displayName } = this.props.detail
    return displayName || name
  }

  get options() {
    return [
      {
        label: t('Enable'),
        value: 1,
      },
      {
        label: t('Disable'),
        value: 0,
      },
    ]
  }

  getStatus = data => (data.disabled ? 0 : 1)

  handleSelect = status => {
    this.setState({ status })
  }

  handleOk = () => {
    const { name } = this.props.detail
    const { status } = this.state

    this.props.onOk({
      name,
      disabled: status === 0,
    })
  }

  render() {
    const { title, detail, onOk, ...rest } = this.props
    const { status } = this.state

    return (
      <Modal.Form
        width={691}
        bodyClassName={styles.body}
        title={t(title)}
        icon="pen"
        data={detail}
        onOk={this.handleOk}
        {...rest}
      >
        <Form.Item label={t('Alerting Policy')}>
          <Input value={this.name} disabled />
        </Form.Item>
        <Form.Item label={t('Status')}>
          <Select
            options={this.options}
            value={status}
            onChange={this.handleSelect}
          />
        </Form.Item>
      </Modal.Form>
    )
  }
}
