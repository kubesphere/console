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
import { Banner } from 'components/Base'
import Panel from 'settings/components/Panel'
import WebhookReceiverForm from 'components/Forms/WebhookReceiverForm'

import Store from 'stores/notification/webhookconfig'
import ReceiverStore from 'stores/notification/webhookreceiver'
import SecretStore from 'stores/notification/secret'

import { safeBtoa } from 'utils/base64'
import FORM_TEMPLATES from 'utils/form.templates'

const CONFIG_NAME = 'default-webhook-config'
const RECEIVER_NAME = 'global-webhook-receiver'
const SECRET_NAME = 'global-webhook-receiver-secret'

@observer
export default class WebhookConfig extends React.Component {
  store = new Store()

  receiverStore = new ReceiverStore()

  secretStore = new SecretStore()

  state = {
    receiverConfig: {},
    formStatus: 'create',
    showTip: false,
  }

  get formTemplate() {
    return FORM_TEMPLATES['webhookconfigs']({ name: CONFIG_NAME })
  }

  get receiverTemplate() {
    return FORM_TEMPLATES['webhookreceivers']({ name: RECEIVER_NAME })
  }

  get secretTemplate() {
    return FORM_TEMPLATES['globalsecret']({ name: SECRET_NAME })
  }

  componentDidMount() {
    this.fetchData()
  }

  fetchData = async () => {
    const results = await this.store.fetchList()
    const config = results.find(
      item => get(item, 'metadata.name') === CONFIG_NAME
    )
    const receivers = await this.receiverStore.fetchList()
    const receiverConfig = receivers.find(
      item => get(item, 'metadata.name') === RECEIVER_NAME
    )

    if (!isEmpty(receiverConfig)) {
      const secrets = await this.secretStore.fetchList({ name: SECRET_NAME })

      set(
        receiverConfig,
        'spec.httpConfig.basicAuth.password.key',
        get(secrets, '[0].data.password', '')
      )
      set(
        receiverConfig,
        'spec.httpConfig.tlsConfig.rootCA.key',
        get(secrets, '[0].data.ca', '')
      )
      set(
        receiverConfig,
        'spec.httpConfig.tlsConfig.clientCertificate.cert.key',
        get(secrets, '[0].data.cert', '')
      )
      set(
        receiverConfig,
        'spec.httpConfig.tlsConfig.clientCertificate.key.key',
        get(secrets, '[0].data.key', '')
      )

      this.receiverConfig = cloneDeep(receiverConfig)
      this.setState({
        config,
        receiverConfig,
        formStatus: 'update',
        showTip: false,
      })
    } else {
      this.receiverConfig = this.receiverTemplate
      this.setState({
        config,
        receiverConfig: this.receiverTemplate,
        formStatus: 'create',
      })
    }
  }

  handleSubmit = async data => {
    let message
    const { config, formStatus } = this.state
    const password = safeBtoa(
      get(data, 'spec.httpConfig.basicAuth.password.key')
    )
    const ca = safeBtoa(get(data, 'spec.httpConfig.tlsConfig.rootCA.key'))
    const cert = safeBtoa(
      get(data, 'spec.httpConfig.tlsConfig.clientCertificate.cert.key')
    )
    const key = safeBtoa(
      get(data, 'spec.httpConfig.tlsConfig.clientCertificate.key.key')
    )
    const insecureSkipVerify = !Number(
      get('metadata.annotations["kubesphere.io/tls-mode"]', '')
    )

    set(
      data,
      'spec.httpConfig.tlsConfig.insecureSkipVerify',
      insecureSkipVerify
    )
    set(data, 'spec.httpConfig.basicAuth.password.key', 'password')
    set(data, 'spec.httpConfig.basicAuth.password.name', SECRET_NAME)
    set(data, 'spec.httpConfig.tlsConfig.rootCA.key', 'ca')
    set(data, 'spec.httpConfig.tlsConfig.rootCA.name', SECRET_NAME)
    set(data, 'spec.httpConfig.tlsConfig.clientCertificate.cert.key', 'cert')
    set(
      data,
      'spec.httpConfig.tlsConfig.clientCertificate.cert.name',
      SECRET_NAME
    )
    set(data, 'spec.httpConfig.tlsConfig.clientCertificate.key.key', 'key')
    set(
      data,
      'spec.httpConfig.tlsConfig.clientCertificate.key.name',
      SECRET_NAME
    )

    if (isEmpty(config)) {
      await this.store.create(this.formTemplate)
    }

    if (formStatus === 'create') {
      await this.receiverStore.create(data)
      await this.secretStore.create(
        set(this.secretTemplate, 'data', { password, ca, cert, key })
      )

      message = t('Added Successfully')
    } else {
      await this.receiverStore.update({ name: RECEIVER_NAME }, data)
      await this.secretStore.update(
        { name: SECRET_NAME },
        set(this.secretTemplate, 'data', { password, ca, cert, key })
      )

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
      receiverConfig: cloneDeep(this.receiverConfig),
    })
  }

  render() {
    return (
      <div>
        <Banner
          icon="file"
          rightIcon="/assets/banner-icon-1.svg"
          name={t('Webhook Settings')}
          desc={t('WEBHOOK_SETTINGS_DESC')}
        />
        {this.renderConfigForm()}
      </div>
    )
  }

  renderConfigForm() {
    const { receiverConfig, formStatus, showTip } = this.state

    return (
      <Panel
        title={t('Webhook Settings')}
        isLoading={this.receiverStore.list.isLoading}
      >
        <WebhookReceiverForm
          showTip={showTip}
          formStatus={formStatus}
          data={receiverConfig}
          onCancel={this.onFormClose}
          onSubmit={this.handleSubmit}
          onChange={this.onFormDataChange}
          isSubmitting={this.store.isSubmitting}
        />
      </Panel>
    )
  }
}
