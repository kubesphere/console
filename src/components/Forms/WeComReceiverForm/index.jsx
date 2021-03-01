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
import classnames from 'classnames'
import { get } from 'lodash'

import { Form, Button, TextArea, Alert } from '@kube-design/components'

import styles from './index.scss'

export default class WeComReceiverForm extends Component {
  get disabled() {
    const { data } = this.props
    return (
      !get(data, 'spec.toUser', '') &&
      !get(data, 'spec.toPart', '') &&
      !get(data, 'spec.toTag')
    )
  }

  render() {
    return (
      <Form
        data={this.props.data}
        onChange={this.props.onChange}
        onSubmit={this.props.onSubmit}
      >
        <div
          className={classnames(styles.formBody, this.props.formBodyClassName)}
        >
          <div
            className={classnames(
              styles.formAttrs,
              this.props.formAttrsClassName
            )}
          >
            {this.renderTips()}
            {this.renderFormItems()}
          </div>
        </div>
        <div className={classnames(styles.footer, this.props.footerClassName)}>
          {this.renderFooterBtns()}
        </div>
      </Form>
    )
  }

  renderTips() {
    if (this.props.showTip && this.props.formStatus === 'update') {
      return (
        <Alert
          className={styles.tips}
          type="error"
          message={t('WECOM_REVEIVER_CHANGE_NEED_SAVE_TIP')}
        />
      )
    }
    return null
  }

  renderFormItems() {
    return (
      <>
        <Form.Item
          label={t('Wechat Receiver User')}
          desc={t('WECHAT_RECEIVER_INPUT_DESC')}
        >
          <TextArea className="max-width-full" name="spec.toUser" />
        </Form.Item>
        <Form.Item
          label={t('Wechat Receiver Department')}
          desc={t('WECHAT_RECEIVER_INPUT_DESC')}
        >
          <TextArea className="max-width-full" name="spec.toParty" />
        </Form.Item>
        <Form.Item
          label={t('Wechat Receiver Tag')}
          desc={t('WECHAT_RECEIVER_INPUT_DESC')}
        >
          <TextArea className="max-width-full" name="spec.toTag" />
        </Form.Item>
      </>
    )
  }

  renderFooterBtns() {
    const { onCancel, isSubmitting, formStatus } = this.props
    return (
      <>
        <Button onClick={onCancel}>{t('Cancel')}</Button>
        <Button
          type="control"
          htmlType="submit"
          loading={isSubmitting}
          disabled={this.disabled}
        >
          {formStatus === 'update' ? t('Update') : t('Save')}
        </Button>
      </>
    )
  }
}
