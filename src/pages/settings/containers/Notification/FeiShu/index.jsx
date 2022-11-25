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

    const [configRes, receivers, secrets] = await Promise.all([
      await this.configStore.fetchList({ type: 'feishu' }),
      this.receiverStore.fetchList({
        name: RECEIVER_NAME,
      }),
      this.secretStore.fetchList({ name: SECRET_NAME }),
    ])

    const config = configRes.find(
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
    const keywords = get(receiver, 'spec.feishu.chatbot.keywords')
    const department = get(receiver, 'spec.feishu.department')
    const user = get(receiver, 'spec.feishu.user')

    const { appkey, appsecret, webhook, chatbotsecret } = get(
      secret,
      'data',
      {}
    )
    if (appkey) {
      set(template, 'config.spec.feishu.appID.value', appkey)
    }

    if (appsecret) {
      set(template, 'config.spec.feishu.appSecret.value', appsecret)
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

    if (!isEmpty(department)) {
      set(template, 'receiver.spec.feishu.department', department)
    }

    if (!isEmpty(user)) {
      set(template, 'receiver.spec.feishu.user', user)
    }

    return template
  }

  handleVerify = ({ receiver, secret }) => {
    const keywords = get(receiver, 'spec.feishu.chatbot.keywords')
    const department = get(receiver, 'spec.feishu.department', [])
    const user = get(receiver, 'spec.feishu.user', [])

    const { appkey, appsecret, webhook, chatbotsecret } = get(
      secret,
      'data',
      {}
    )

    if (
      [appkey, appsecret, webhook, chatbotsecret, keywords].every(item =>
        isArray(item) ? isEmpty(item) : !item
      )
    ) {
      Notify.error({
        content: t('DINGTALK_SETTING_TIP'),
      })
      return false
    }

    if (department.length > 0 || user.length > 0) {
      if (!appkey) {
        Notify.error({
          content: t('PLEASE_ENTER_APP_ID'),
        })
        return false
      }

      if (!appsecret) {
        Notify.error({
          content: t('PLEASE_ENTER_APP_SECRET'),
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

    const conversation = get(config, 'spec.dingtalk')

    if (isEmpty(conversation)) {
      unset(config, 'spec.feishu')
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

    const {
      isExitConfig,
      isExitReceiver,
      isExitSecret,
    } = await this.getResource()

    if (isExitConfig) {
      if (isEmpty(get(config, 'spec.feishu'))) {
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
