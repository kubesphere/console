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
import SlackForm from 'components/Forms/Notification/SlackForm'
import BaseBanner from 'settings/components/Cards/Banner'

import ConfigStore from 'stores/notification/config'
import ReceiverStore from 'stores/notification/receiver'
import SecretStore from 'stores/notification/secret'

import { safeBtoa } from 'utils/base64'
import FORM_TEMPLATES from 'utils/form.templates'

const CONFIG_NAME = 'default-slack-config'
const RECEIVER_NAME = 'global-slack-receiver'
const SECRET_NAME = 'global-slack-config-token'

@observer
export default class Slack extends React.Component {
  configStore = new ConfigStore()

  receiverStore = new ReceiverStore()

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
      type: 'slack',
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
    const results = await this.configStore.fetchList({ type: 'slack' })
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
    const { config, receiver, secret } = cloneDeep(data)
    set(config, 'spec.slack.slackTokenSecret.value', get(secret, 'data.token'))
    unset(receiver, 'spec.slack.alertSelector')
    unset(config, 'spec.slack.slackTokenSecret.valueFrom')

    return { config, receiver, secret }
  }

  handleSubmit = async data => {
    const { config, receiver, secret } = cloneDeep(data)
    const { formStatus } = this.state
    const token = safeBtoa(get(secret, 'data.token'))
    let message

    set(
      config,
      'spec.slack.slackTokenSecret.valueFrom.secretKeyRefkey.key',
      'token'
    )
    set(
      config,
      'spec.slack.slackTokenSecret.valueFrom.secretKeyRefkey.name',
      SECRET_NAME
    )
    set(secret, 'data.token', token)

    if (formStatus === 'create') {
      await this.configStore.create(config)
      await this.secretStore.create(secret)
      await this.receiverStore.create(receiver)
      message = t('ADDED_SUCCESS_DESC')
    } else {
      await this.secretStore.update({ name: SECRET_NAME }, secret)
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
        <BaseBanner type="slack" />
        <Panel loading={isLoading}>
          <SlackForm
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
