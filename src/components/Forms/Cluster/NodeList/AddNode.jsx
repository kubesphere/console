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
import { cloneDeep, get } from 'lodash'
import classNames from 'classnames'
import {
  Form,
  TextArea,
  Input,
  InputPassword,
  Select,
  Columns,
  Column,
} from '@kube-design/components'
import { Modal } from 'components/Base'
import { NumberInput } from 'components/Inputs'
import { generateId } from 'utils'
import { PATTERN_IP } from 'utils/constants'

import styles from './index.scss'

export default class AddNode extends Component {
  state = {
    formData: cloneDeep(this.props.data || {}),
    authMode: get(this.props.data, 'privateKey') ? 'secret' : 'password',
  }

  componentDidUpdate(prevProps) {
    if (this.props.visible !== prevProps.visible) {
      this.setState({ formData: cloneDeep(this.props.data || {}) })
    }
  }

  get authModes() {
    return [
      {
        label: t('Username & Password'),
        value: 'password',
      },
      {
        label: t('SSH Secret'),
        value: 'secret',
      },
    ]
  }

  get nodeRoles() {
    return this.props.addAfterCreate
      ? [{ label: 'worker', value: 'worker' }]
      : [
          { label: 'master', value: 'master' },
          { label: 'worker', value: 'worker' },
        ]
  }

  handleAuthModeChange = authMode => {
    this.setState({ authMode })
  }

  renderAuthentication() {
    const { authMode } = this.state

    if (authMode === 'password') {
      return (
        <>
          <Form.Item label={t('Username')} desc={t('SSH_ACCOUNT_DESC')}>
            <Input name="user" defaultValue="root" autoComplete="off" />
          </Form.Item>
          <Form.Item label={t('Password')} desc={t('SSH_PASSWORD_DESC')}>
            <InputPassword name="password" autoComplete="off" />
          </Form.Item>
        </>
      )
    }

    return (
      <>
        <Form.Item label={t('SSH Secret')}>
          <TextArea
            name="privateKey"
            placeholder={t('SSH_SECRET_PLACEHOLDER')}
            autoResize
          />
        </Form.Item>
      </>
    )
  }

  render() {
    const { visible, onOk, onCancel, addAfterCreate } = this.props
    const { authMode, formData } = this.state

    const defaultRoles = addAfterCreate ? ['worker'] : undefined

    return (
      <Modal.Form
        icon="add"
        title={t('Add Node')}
        width={600}
        data={formData}
        visible={visible}
        onOk={onOk}
        onCancel={onCancel}
      >
        <Form.Item
          label={t('Node Name')}
          rules={[
            {
              required: true,
              message: t("Please input the node's name"),
            },
          ]}
        >
          <Input name="name" defaultValue={`node-${generateId(4)}`} />
        </Form.Item>
        <Form.Item
          label={t('Node Role')}
          desc={t('NODE_ROLE_DESC')}
          rules={[
            {
              required: true,
              message: t("Please specify the node's roles"),
            },
          ]}
        >
          <Select
            name="roles"
            options={this.nodeRoles}
            closeOnSelect={false}
            defaultValue={defaultRoles}
            multi
          />
        </Form.Item>
        <Form.Item
          label={t('Node Internal IP Address')}
          desc={t('CLUSTER_NODE_INTERNAL_IP_DESC')}
          rules={[
            {
              required: true,
              message: t('Please input the IP address'),
            },
            {
              pattern: PATTERN_IP,
              message: t('Invalid IP address'),
            },
          ]}
        >
          <Input
            name="internalAddress"
            placeholder="XXX.XXX.XXX.XXX"
            autoComplete="off"
          />
        </Form.Item>
        <Columns className={classNames('is-1', styles.ssh)}>
          <Column>
            <Form.Item
              label={t('SSH IP Address')}
              desc={t('SSH_IP_ADDRESS_DESC')}
              rules={[
                {
                  required: true,
                  message: t('Please input the IP address'),
                },
                {
                  pattern: PATTERN_IP,
                  message: t('Invalid IP address'),
                },
              ]}
            >
              <Input
                name="address"
                placeholder="XXX.XXX.XXX.XXX"
                autoComplete="off"
              />
            </Form.Item>
          </Column>
          <Column className="is-narrow">
            <Form.Item className={styles.port} label={t('SSH Port')}>
              <NumberInput
                name="port"
                defaultValue={22}
                max={65535}
                min={0}
                integer
              />
            </Form.Item>
          </Column>
        </Columns>
        <Form.Item
          label={t('SSH Authentication Mode')}
          desc={t('SSH_AUTH_MODE_DESC')}
        >
          <Select
            value={authMode}
            options={this.authModes}
            onChange={this.handleAuthModeChange}
          />
        </Form.Item>
        {this.renderAuthentication()}
      </Modal.Form>
    )
  }
}
