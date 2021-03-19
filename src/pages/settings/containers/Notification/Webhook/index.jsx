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
import { isEmpty, get, set, cloneDeep } from 'lodash'

import { Notify } from '@kube-design/components'
import { Banner, Panel } from 'components/Base'
import WebhookForm from 'components/Forms/Notification/WebhookForm'

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
    showTip: false,
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
        showTip: false,
      })
    }
  }

  handleSubmit = async data => {
    const { receiver, secret } = cloneDeep(data)
    const { formStatus } = this.state
    const type = get(
      receiver,
      'metadata.annotations["kubesphere.io/verify-type"]'
    )
    const password = safeBtoa(get(secret, 'data.password'))
    const token = safeBtoa(get(secret, 'data.token'))
    const secretData = {}
    let message

    if (type === 'basic') {
      set(secretData, 'password', password)
    }
    if (type === 'token') {
      set(secretData, 'token', token)
    }

    set(receiver, 'spec.webhook.httpConfig.basicAuth.password.key', 'password')
    set(
      receiver,
      'spec.webhook.httpConfig.basicAuth.password.name',
      SECRET_NAME
    )
    set(receiver, 'spec.webhook.httpConfig.bearerToken.key', 'token')
    set(receiver, 'spec.webhook.httpConfig.bearerToken.name', SECRET_NAME)

    if (formStatus === 'create') {
      await this.secretStore.create(
        set(this.secretTemplate, 'data', secretData)
      )
      await this.receiverStore.create(receiver)
      message = t('Added Successfully')
    } else {
      await this.secretStore.update(
        { name: SECRET_NAME },
        set(this.secretTemplate, 'data', secretData)
      )
      await this.receiverStore.update({ name: RECEIVER_NAME }, receiver)
      message = t('Update Successfully')
    }

    this.fetchData()
    Notify.success({ content: message, duration: 1000 })
  }

  onFormDataChange = () => {
    this.setState({
      showTip: true,
    })
  }

  onFormClose = () => {
    this.setState({
      showTip: false,
      formData: cloneDeep(this.formData),
    })
  }

  render() {
    return (
      <div>
        <Banner
          icon="file"
          type="white"
          name={t('Webhook')}
          desc={t('WEBHOOK_SETTING_DESC')}
        />
        {this.renderConfigForm()}
      </div>
    )
  }

  renderConfigForm() {
    const { formData, formStatus, showTip } = this.state

    return (
      <Panel loading={this.receiverStore.list.isLoading}>
        <WebhookForm
          showTip={showTip}
          formStatus={formStatus}
          data={formData}
          onCancel={this.onFormClose}
          onSubmit={this.handleSubmit}
          onChange={this.onFormDataChange}
          isSubmitting={this.receiverStore.isSubmitting}
          disableSubmit={!showTip && formStatus === 'update'}
        />
      </Panel>
    )
  }
}
