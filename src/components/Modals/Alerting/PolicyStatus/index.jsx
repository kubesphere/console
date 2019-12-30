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

  get name() {
    const { name, displayName } = this.props.detail
    return displayName || name
  }

  get options() {
    return [
      {
        label: t('Enable'),
        value: 'false',
      },
      {
        label: t('Disable'),
        value: 'true',
      },
    ]
  }

  render() {
    const { title, detail, ...rest } = this.props

    const formData = {
      alert_name: this.name,
      disabled: String(detail.disabled),
    }

    return (
      <Modal.Form
        width={691}
        bodyClassName={styles.body}
        title={t(title)}
        icon="pen"
        data={formData}
        {...rest}
      >
        <Form.Item label={t('Alerting Policy')}>
          <Input name="alert_name" disabled />
        </Form.Item>
        <Form.Item label={t('Status')}>
          <Select name="disabled" options={this.options} />
        </Form.Item>
      </Modal.Form>
    )
  }
}
