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
import { isArray, isEmpty, get, set, unset, cloneDeep } from 'lodash'

import { Notify } from '@kube-design/components'
import { Panel } from 'components/Base'
import DingTalkForm from 'components/Forms/Notification/DingTalkForm'
import BaseBanner from 'settings/components/Cards/Banner'

import ConfigStore from 'stores/notification/config'
import ReceiverStore from 'stores/notification/receiver'
import SecretStore from 'stores/notification/secret'

import { safeBtoa } from 'utils/base64'
import FORM_TEMPLATES from 'utils/form.templates'

const CONFIG_NAME = 'default-dingtalk-config'
const RECEIVER_NAME = 'global-dingtalk-receiver'
const SECRET_NAME = 'global-dingtalk-config-secret'

@observer
export default class DingTalk extends React.Component {
  configStore = new ConfigStore()

  receiverStore = new ReceiverStore()

  secretStore = new SecretStore()

  state = {
    formData: {
      config: this.configFormTemplate,
      receiver: this.receiverFormTemplate,
      secret: this.secretTemplate,
    },
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
      type: 'dingtalk',
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

    const [configResult, receivers, secrets] = await Promise.all([
      this.configStore.fetchList({ type: 'dingtalk' }),
      this.receiverStore.fetchList({
        name: RECEIVER_NAME,
      }),
      this.secretStore.fetchList({ name: SECRET_NAME }),
    ])

    const config = configResult.find(
      item => get(item, 'metadata.name') === CONFIG_NAME
    )

    this.formData = {
      config: config || this.configFormTemplate,
      receiver: set(
        this.receiverFormTemplate,
        'spec',
        get(receivers, '[0].spec', {})
      ),
      secret: set(this.secretTemplate, 'data', get(secrets, '[0].data', {})),
    }

    this.setState({
      formData: cloneDeep(this.formData),
    })

    this.setState({ isLoading: false })
  }

  getVerifyFormTemplate = data => {
    const template = {}
    const { receiver, secret } = cloneDeep(data)
    const chatids = get(receiver, 'spec.dingtalk.conversation.chatids')
    const keywords = get(receiver, 'spec.dingtalk.chatbot.keywords')
    const { appkey, appsecret, webhook, chatbotsecret } = get(
      secret,
      'data',
      {}
    )

    if (appkey) {
      set(template, 'config.spec.dingtalk.conversation.appkey.value', appkey)
    }
    if (appsecret) {
      set(
        template,
        'config.spec.dingtalk.conversation.appsecret.value',
        appsecret
      )
    }
    if (!isEmpty(chatids)) {
      set(template, 'receiver.spec.dingtalk.conversation.chatids', chatids)
    }
    if (webhook) {
      set(template, 'receiver.spec.dingtalk.chatbot.webhook.value', webhook)
    }
    if (chatbotsecret) {
      set(
        template,
        'receiver.spec.dingtalk.chatbot.secret.value',
        chatbotsecret
      )
    }
    if (!isEmpty(keywords)) {
      set(template, 'receiver.spec.dingtalk.chatbot.keywords', keywords)
    }

    return template
  }

  handleVerify = ({ receiver, secret }) => {
    const keywords = get(receiver, 'spec.dingtalk.chatbot.keywords')
    const chatids = get(receiver, 'spec.dingtalk.conversation.chatids')
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

    if (appkey || appsecret || !isEmpty(chatids)) {
      if (!appkey) {
        Notify.error({
          content: t('PLEASE_ENTER_APP_KEY'),
        })
        return false
      }
      if (!appsecret) {
        Notify.error({
          content: t('PLEASE_ENTER_APP_SECRET'),
        })
        return false
      }
      if (isEmpty(chatids)) {
        Notify.error({
          content: t('PLEASE_ENTER_CHAT_ID'),
        })
        return false
      }
    }

    if (webhook || chatbotsecret || !isEmpty(keywords)) {
      if (!webhook) {
        Notify.error({
          content: t('PLEASE_ENTER_WEBHOOK_URL'),
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

  getResource = async () => {
    const [isExitConfig, isExitReceiver, isExitSecret] = await Promise.all([
      this.configStore.getResource({ name: CONFIG_NAME }),
      this.receiverStore.getResource({ name: RECEIVER_NAME }),
      this.secretStore.getResource({ name: SECRET_NAME }),
    ])

    return {
      isExitConfig,
      isExitReceiver,
      isExitSecret,
    }
  }

  handleSubmit = async data => {
    const { config, receiver, secret } = cloneDeep(data)

    if (!this.handleVerify(data)) {
      return
    }

    const secretData = get(secret, 'data', {})
    Object.keys(secretData).forEach(key => {
      secretData[key] = safeBtoa(secretData[key])
    })

    set(
      config,
      'spec.dingtalk.conversation.appkey.valueFrom.secretKeyRef.key',
      'appkey'
    )
    set(
      config,
      'spec.dingtalk.conversation.appkey.valueFrom.secretKeyRef.name',
      SECRET_NAME
    )
    set(
      config,
      'spec.dingtalk.conversation.appsecret.valueFrom.secretKeyRef.key',
      'appsecret'
    )
    set(
      config,
      'spec.dingtalk.conversation.appsecret.valueFrom.secretKeyRef.name',
      SECRET_NAME
    )

    set(
      receiver,
      'spec.dingtalk.chatbot.webhook.valueFrom.secretKeyRef.key',
      'webhook'
    )
    set(
      receiver,
      'spec.dingtalk.chatbot.webhook.valueFrom.secretKeyRef.name',
      SECRET_NAME
    )
    set(
      receiver,
      'spec.dingtalk.chatbot.secret.valueFrom.secretKeyRef.key',
      'chatbotsecret'
    )
    set(
      receiver,
      'spec.dingtalk.chatbot.secret.valueFrom.secretKeyRef.name',
      SECRET_NAME
    )

    if (!secretData.appkey) {
      unset(config, 'spec.dingtalk.conversation.appkey')
    }

    if (!secretData.appsecret) {
      unset(config, 'spec.dingtalk.conversation.appsecret')
    }

    const conversation = get(config, 'spec.dingtalk.conversation')

    if (isEmpty(conversation)) {
      unset(config, 'spec.dingtalk.conversation')
    }

    if (!secretData.webhook) {
      unset(receiver, 'spec.dingtalk.chatbot.webhook')
    }
    if (!secretData.chatbotsecret) {
      unset(receiver, 'spec.dingtalk.chatbot.secret')
    }

    if (isEmpty(get(receiver, 'spec.dingtalk.conversation.chatids'))) {
      unset(receiver, 'spec.dingtalk.conversation')
    }

    if (isEmpty(get(receiver, 'spec.dingtalk.chatbot.keywords'))) {
      unset(receiver, 'spec.dingtalk.chatbot.keywords')
    }

    if (isEmpty(get(receiver, 'spec.dingtalk.chatbot'))) {
      unset(receiver, 'spec.dingtalk.chatbot')
    }

    const {
      isExitConfig,
      isExitReceiver,
      isExitSecret,
    } = await this.getResource()

    if (isExitConfig) {
      if (isEmpty(get(receiver, 'spec.dingtalk.conversation.chatids'))) {
        await this.configStore.delete({ name: CONFIG_NAME })
      } else {
        await this.configStore.update({ name: CONFIG_NAME }, config)
      }
    } else {
      unset(config, 'metadata.resourceVersion')
      await this.configStore.create(config)
    }

    if (isExitReceiver) {
      await this.receiverStore.update({ name: RECEIVER_NAME }, receiver)
    } else {
      await this.receiverStore.create(receiver)
    }

    if (isExitSecret) {
      await this.secretStore.update(
        { name: SECRET_NAME },
        set(this.secretTemplate, 'data', secretData)
      )
    } else {
      await this.secretStore.create(
        set(this.secretTemplate, 'data', secretData)
      )
    }
    await this.fetchData()
    Notify.success({ content: t('UPDATE_SUCCESSFUL'), duration: 1000 })
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
        <BaseBanner type="dingtalk" />
        <Panel loading={isLoading}>
          <DingTalkForm
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
