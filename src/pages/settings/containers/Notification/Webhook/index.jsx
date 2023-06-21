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
import { observer } from 'mobx-react'
import { isEmpty, get, set, unset, cloneDeep } from 'lodash'

import { Notify } from '@kube-design/components'
import { Panel } from 'components/Base'
import WebhookForm from 'components/Forms/Notification/WebhookForm'
import BaseBanner from 'settings/components/Cards/Banner'

import ReceiverStore from 'stores/notification/receiver'
import SecretStore from 'stores/notification/secret'

import { safeBtoa } from 'utils/base64'
import FORM_TEMPLATES from 'utils/form.templates'

const RECEIVER_NAME = 'global-webhook-receiver'
const SECRET_NAME = 'global-webhook-config-secret'

@observer
export default class Webhook extends React.Component {
  receiverStore = new ReceiverStore()

  secretStore = new SecretStore()

  state = {
    formData: {
      receiver: this.receiverFormTemplate,
      secret: this.secretTemplate,
    },
    formStatus: 'create',
    isLoading: false,
  }

  formData = {
    receiver: this.receiverFormTemplate,
    secret: this.secretTemplate,
  }

  get receiverFormTemplate() {
    return FORM_TEMPLATES['notificationreceivers']({
      name: RECEIVER_NAME,
      type: 'webhook',
    })
  }

  get secretTemplate() {
    return FORM_TEMPLATES['globalsecret']({ name: SECRET_NAME })
  }

  componentDidMount() {
    this.fetchData()
  }

  fetchData = async () => {
    this.setState({ isLoading: true })
    const results = await this.receiverStore.fetchList({ type: 'webhook' })
    const receivers = results.find(
      item => get(item, 'metadata.name') === RECEIVER_NAME
    )

    if (!isEmpty(receivers)) {
      const secrets = await this.secretStore.fetchList({ name: SECRET_NAME })
      const data = get(secrets, '[0].data', {})

      this.formData = {
        receiver: receivers,
        secret: set(this.secretTemplate, 'data', data),
      }

      this.setState({
        formData: cloneDeep(this.formData),
        formStatus: 'update',
      })
    }
    this.setState({ isLoading: false })
  }

  getVerifyFormTemplate = data => {
    const { receiver, secret } = cloneDeep(data)
    const type = get(
      receiver,
      'metadata.annotations["kubesphere.io/verify-type"]'
    )
    const username = get(receiver, 'spec.webhook.httpConfig.basicAuth.username')
    const { password, token } = get(secret, 'data', {})

    unset(receiver, 'spec.webhook.httpConfig.bearerToken')
    unset(receiver, 'spec.webhook.httpConfig.basicAuth')

    if (type === 'basic' && password) {
      set(
        receiver,
        'spec.webhook.httpConfig.basicAuth.password.value',
        password
      )
      set(receiver, 'spec.webhook.httpConfig.basicAuth.username', username)
    }
    if (type === 'token' && token) {
      set(receiver, 'spec.webhook.httpConfig.bearerToken.value', token)
    }

    unset(receiver, 'spec.webhook.alertSelector')

    return { receiver }
  }

  handleSubmit = async data => {
    const { receiver, secret } = cloneDeep(data)
    const { formStatus } = this.state
    const type = get(
      receiver,
      'metadata.annotations["kubesphere.io/verify-type"]'
    )
    const username = get(receiver, 'spec.webhook.httpConfig.basicAuth.username')
    const password = safeBtoa(get(secret, 'data.password'))
    const token = safeBtoa(get(secret, 'data.token'))
    const secretData = {}
    let message

    unset(receiver, 'spec.webhook.httpConfig.bearerToken')
    unset(receiver, 'spec.webhook.httpConfig.basicAuth')

    if (type === 'basic') {
      set(secretData, 'password', password)

      set(receiver, 'spec.webhook.httpConfig.basicAuth.username', username)
      set(
        receiver,
        'spec.webhook.httpConfig.basicAuth.password.valueFrom.secretKeyRef.key',
        'password'
      )
      set(
        receiver,
        'spec.webhook.httpConfig.basicAuth.password.valueFrom.secretKeyRef.name',
        SECRET_NAME
      )
    }

    if (type === 'token') {
      set(secretData, 'token', token)
      set(
        receiver,
        'spec.webhook.httpConfig.bearerToken.valueFrom.secretKeyRef.key',
        'token'
      )
      set(
        receiver,
        'spec.webhook.httpConfig.bearerToken.valueFrom.secretKeyRef.name',
        SECRET_NAME
      )
    }

    if (formStatus === 'create') {
      await this.secretStore.create(
        set(this.secretTemplate, 'data', secretData)
      )
      await this.receiverStore.create(receiver)
      message = t('ADDED_SUCCESS_DESC')
    } else {
      await this.secretStore.update(
        { name: SECRET_NAME },
        set(this.secretTemplate, 'data', secretData)
      )
      await this.receiverStore.update({ name: RECEIVER_NAME }, receiver)
      message = t('UPDATE_SUCCESSFUL')
    }

    this.fetchData()
    Notify.success({ content: message, duration: 1000 })
  }

  onFormClose = () => {
    this.setState({
      formData: cloneDeep(this.formData),
    })
  }

  render() {
    const { formData, isLoading } = this.state

    return (
      <div>
        <BaseBanner type="webhook" />
        <Panel loading={isLoading}>
          <WebhookForm
            data={formData}
            onCancel={this.onFormClose}
            onSubmit={this.handleSubmit}
            getVerifyFormTemplate={this.getVerifyFormTemplate}
            isSubmitting={this.receiverStore.isSubmitting}
          />
        </Panel>
      </div>
    )
  }
}
