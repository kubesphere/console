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

import { Form, Input, TextArea } from '@kube-design/components'
import { Modal } from 'components/Base'

import styles from './index.scss'

export default class AlertingCommentModal extends React.Component {
  static propTypes = {
    visible: PropTypes.bool,
    detail: PropTypes.object,
    onOk: PropTypes.func,
    onCancel: PropTypes.func,
  }

  static defaultProps = {
    visible: false,
    detail: {},
    onOk() {},
    onCancel() {},
  }

  render() {
    const { detail, ...rest } = this.props

    return (
      <Modal.Form
        title={t('ALERT_COMMENT')}
        icon="human"
        width={691}
        data={detail}
        {...rest}
      >
        <Form.Item label={t('Alerting Message')}>
          <Input name="rule_name" disabled />
        </Form.Item>
        <Form.Item
          className={styles.textarea}
          label={t('ALERT_COMMENT')}
          desc={t('ALERT_COMMENT_DESC')}
          rules={[
            { required: true, message: t('Please input comment content') },
          ]}
        >
          <TextArea name="comment" rows="3" />
        </Form.Item>
      </Modal.Form>
    )
  }
}
