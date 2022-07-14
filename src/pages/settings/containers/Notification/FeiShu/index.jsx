/*
 * This file is part of KubeSphere Console.
 * Copyright (C) 2022 The KubeSphere Console Authors.
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
import { isArray, isEmpty, get, set, unset, cloneDeep } from 'lodash'
import { observer } from 'mobx-react'
import BaseBanner from 'settings/components/Cards/Banner'
import FeiShuForm from 'components/Forms/Notification/FeiShuForm'
import { Panel } from 'components/Base'
import { Notify } from '@kube-design/components'

import ReceiverStore from 'stores/notification/receiver'
import SecretStore from 'stores/notification/secret'
import ConfigStore from 'stores/notification/config'
import FORM_TEMPLATES from 'utils/form.templates'
import { safeBtoa } from 'utils/base64'

const CONFIG_NAME = 'default-feishu-config'
const RECEIVER_NAME = 'global-feishu-receiver'
const SECRET_NAME = 'global-feishu-config-secret'

@observer
export default class Feishu extends Component {
  receiverStore = new ReceiverStore()

  configStore = new ConfigStore()

  secretStore = new SecretStore()

  state = {
    formData: {
      config: this.configFormTemplate,
      receiver: this.receiverFormTemplate,
      secret: this.secretTemplate,
    },
    formStatus: 'create',
    isLoading: false,
  }

  formData = {
    config: this.configFormTemplate,
    receiver: this.receiverFormTemplate,
    secret: this.secretTemplate,
  }

  get configFormTemplate() {
    return FORM_TEMPLATES['notificationconfigs']({ name: CONFIG_NAME })
  }

  get receiverFormTemplate() {
    return FORM_TEMPLATES['notificationreceivers']({
      name: RECEIVER_NAME,
      type: 'feishu',
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
    const results = await this.configStore.fetchList({ type: 'feishu' })
    const config = results.find(
      item => get(item, 'metadata.name') === CONFIG_NAME
    )

    if (!isEmpty(config)) {
      const [receivers, secrets] = await Promise.all([
        this.receiverStore.fetchList({
          name: RECEIVER_NAME,
        }),
        this.secretStore.fetchList({ name: SECRET_NAME }),
      ])

      this.formData = {
        config,
        receiver: set(
          this.receiverFormTemplate,
          'spec',
          get(receivers, '[0].spec', {})
        ),
        secret: set(this.secretTemplate, 'data', get(secrets, '[0].data', {})),
      }
      this.setState({
        formData: cloneDeep(this.formData),
        formStatus: 'update',
      })
    }
    this.setState({ isLoading: false })
  }

  getVerifyFormTemplate = data => {
    const template = {}
    const { receiver, secret } = cloneDeep(data)
    const keywords = get(receiver, 'spec.feishu.chatbot.keywords')
    const { appkey, appsecret, webhook, chatbotsecret } = get(
      secret,
      'data',
      {}
    )

    if (appkey) {
      set(template, 'config.spec.feishu.appkey.value', appkey)
    }
    if (appsecret) {
      set(template, 'config.spec.feishu.appsecret.value', appsecret)
    }

    if (webhook) {
      set(template, 'receiver.spec.feishu.chatbot.webhook.value', webhook)
    }
    if (chatbotsecret) {
      set(template, 'receiver.spec.feishu.chatbot.secret.value', chatbotsecret)
    }
    if (!isEmpty(keywords)) {
      set(template, 'receiver.spec.feishu.chatbot.keywords', keywords)
    }

    return template
  }

  handleVerify = ({ receiver, secret }) => {
    const keywords = get(receiver, 'spec.feishu.chatbot.keywords')
    const chatids = get(receiver, 'spec.feishu.conversation.chatids')
    const { appkey, appsecret, webhook, chatbotsecret } = get(
      secret,
      'data',
      {}
    )

    if (
      [
        appkey,
        appsecret,
        chatids,
        webhook,
        chatbotsecret,
        keywords,
      ].every(item => (isArray(item) ? isEmpty(item) : !item))
    ) {
      Notify.error({
        content: t('DINGTALK_SETTING_TIP'),
      })
      return false
    }

    if (appkey || appsecret) {
      if (!appkey) {
        Notify.error({
          content: t('PLEASE_ENTER_VALUE_CUSTOM', { value: t('AppKey') }),
        })
        return false
      }
      if (!appsecret) {
        Notify.error({
          content: t('PLEASE_ENTER_VALUE_CUSTOM', { value: t('AppSecret') }),
        })
        return false
      }
    }

    if (webhook || chatbotsecret || !isEmpty(keywords)) {
      if (!webhook) {
        Notify.error({
          content: t('PLEASE_ENTER_VALUE_CUSTOM', { value: t('Webhook URL') }),
        })
        return false
      }
      if (!chatbotsecret && isEmpty(keywords)) {
        Notify.error({ content: t('DINGTALK_CHATBOT_SECURITY_TIP') })
        return false
      }
    }

    return true
  }

  handleSubmit = async data => {
    const { config, receiver, secret } = cloneDeep(data)
    const { formStatus } = this.state
    let message

    if (!this.handleVerify(data)) {
      return
    }

    const secretData = get(secret, 'data', {})
    Object.keys(secretData).forEach(key => {
      secretData[key] = safeBtoa(secretData[key])
    })

    set(config, 'spec.feishu.appID.valueFrom.secretKeyRef.key', 'appkey')
    set(config, 'spec.feishu.appID.valueFrom.secretKeyRef.name', SECRET_NAME)
    set(
      config,
      'spec.feishu.appSecret.valueFrom.secretKeyRef.name',
      SECRET_NAME
    )

    set(config, 'spec.feishu.appSecret.valueFrom.secretKeyRef.key', 'appsecret')

    set(
      receiver,
      'spec.feishu.chatbot.webhook.valueFrom.secretKeyRef.key',
      'webhook'
    )
    set(
      receiver,
      'spec.feishu.chatbot.webhook.valueFrom.secretKeyRef.name',
      SECRET_NAME
    )
    set(
      receiver,
      'spec.feishu.chatbot.secret.valueFrom.secretKeyRef.key',
      'chatbotsecret'
    )
    set(
      receiver,
      'spec.feishu.chatbot.secret.valueFrom.secretKeyRef.name',
      SECRET_NAME
    )

    if (!secretData.appkey) {
      unset(config, 'spec.feishu.appID')
    }

    if (!secretData.appsecret) {
      unset(config, 'spec.feishu.appSecret')
    }

    if (!secretData.webhook) {
      unset(receiver, 'spec.feishu.chatbot.webhook')
    }
    if (!secretData.chatbotsecret) {
      unset(receiver, 'spec.feishu.chatbot.secret')
    }

    if (isEmpty(get(receiver, 'spec.feishu.chatbot.keywords'))) {
      unset(receiver, 'spec.feishu.chatbot.keywords')
    }

    if (isEmpty(get(receiver, 'spec.feishu.chatbot'))) {
      unset(receiver, 'spec.feishu.chatbot')
    }

    if (formStatus === 'create') {
      await this.configStore.create(config)
      await this.secretStore.create(
        set(this.secretTemplate, 'data', secretData)
      )
      await this.receiverStore.create(receiver)
      message = t('CREATE_SUCCESSFUL')
    } else {
      await this.configStore.update({ name: CONFIG_NAME }, config)
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
    const { isLoading, formData } = this.state

    return (
      <div>
        <BaseBanner type="feishu" />
        <Panel loading={isLoading}>
          <FeiShuForm
            data={formData}
            onCancel={this.onFormClose}
            onSubmit={this.handleSubmit}
            onVerify={this.handleVerify}
            getVerifyFormTemplate={this.getVerifyFormTemplate}
            isSubmitting={this.receiverStore.isSubmitting}
          />
        </Panel>
      </div>
    )
  }
}
