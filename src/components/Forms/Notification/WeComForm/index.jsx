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
import { get } from 'lodash'
import { Form, Button, Input, Alert } from '@kube-design/components'
import { ToggleField } from 'components/Base'
import { BoxInput } from 'components/Inputs'

import Item from './Item'

import styles from './index.scss'

export default class WeComForm extends Component {
  state = {
    type: 'toUser',
  }

  get options() {
    return [
      {
        label: t('User'),
        value: 'toUser',
      },
      {
        label: t('Department'),
        value: 'toParty',
      },
      {
        label: t('Tag'),
        value: 'toTag',
      },
    ]
  }

  formRef = React.createRef()

  handleSubmit = () => {
    const form = this.formRef.current
    form &&
      form.validate(() => {
        this.props.onSubmit(form.getData())
      })
  }

  handleTypeChange = type => {
    this.setState({ type })
  }

  handleAdd = value => {
    this.props.onAddReceiver(this.state.type, value)
  }

  handleDelete = (type, value) => {
    this.props.onDeleteReceiver(type, value)
  }

  render() {
    return (
      <Form
        ref={this.formRef}
        data={this.props.data}
        onChange={this.props.onChange}
      >
        <div className={styles.formBody}>
          {this.renderTips()}
          {this.renderFormItems()}
        </div>
        <div className={styles.footer}>{this.renderFooterBtns()}</div>
      </Form>
    )
  }

  renderTips() {
    if (this.props.showTip && this.props.formStatus === 'update') {
      return (
        <Alert
          className={styles.tips}
          type="error"
          message={t('WECOM_SETTINGS_CHANGE_NEED_SAVE_TIP')}
        />
      )
    }
    return null
  }

  renderFormItems() {
    const { type } = this.state
    const { data } = this.props

    return (
      <>
        <div className={styles.row}>
          <div className={styles.title}>{t('Notification Settings')}</div>
          <div className={styles.item}>
            <Form.Item
              className={styles.isHorizon}
              label={t('Receive Notification')}
            >
              <ToggleField
                name="receiver.spec.wechat.enabled"
                value={get(data, 'receiver.spec.wechat.enabled')}
                onText={t('On')}
                offText={t('Off')}
              />
            </Form.Item>
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.title}>{t('Server Settings')}</div>
          <div className={styles.item}>
            <Form.Item
              label={t('Wechat Api Corp Id')}
              rules={[
                {
                  required: true,
                  message: t('Please input wechat api corp id'),
                },
              ]}
            >
              <Input name="config.spec.wechat.wechatApiCorpId" />
            </Form.Item>
            <Form.Item
              label={t('Wechat Api Agent Id')}
              rules={[
                {
                  required: true,
                  message: t('Please input wechat api agent id'),
                },
              ]}
            >
              <Input name="config.spec.wechat.wechatApiAgentId" />
            </Form.Item>
            <Form.Item
              label={t('Wechat Api Secret')}
              rules={[
                {
                  required: true,
                  message: t('Please input wechat api secret'),
                },
              ]}
            >
              <Input name="secret.data.appsecret" />
            </Form.Item>
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.title}>{t('Receiver Settings')}</div>
          <div className={styles.item}>
            <BoxInput
              defaultSelectValue={type}
              options={this.options}
              onSelectChange={this.handleTypeChange}
              onAdd={this.handleAdd}
            />
            <Item
              title={t('User Set')}
              resources={get(data, 'receiver.spec.wechat.toUser', [])}
              type="toUser"
              onDelete={this.handleDelete}
            />
            <Item
              title={t('Department Set')}
              resources={get(data, 'receiver.spec.wechat.toParty', [])}
              type="toParty"
              onDelete={this.handleDelete}
            />
            <Item
              title={t('Tag Set')}
              resources={get(data, 'receiver.spec.wechat.toTag', [])}
              type="toTag"
              onDelete={this.handleDelete}
            />
          </div>
        </div>
      </>
    )
  }

  renderFooterBtns() {
    return (
      <>
        <Button onClick={this.props.onCancel}>{t('Cancel')}</Button>
        <Button
          type="control"
          loading={this.props.isSubmitting}
          disabled={this.props.disableSubmit}
          onClick={this.handleSubmit}
        >
          {this.props.formStatus === 'update' ? t('Update') : t('Save')}
        </Button>
      </>
    )
  }
}
