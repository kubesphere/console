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
import MailForm from 'components/Forms/Notification/MailForm'

import ConfigStore from 'stores/notification/config'
import ReceiverStore from 'stores/notification/receiver'
import SecretStore from 'stores/notification/secret'
import UserStore from 'stores/user'

import { safeParseJSON } from 'utils'
import { safeBtoa } from 'utils/base64'
import FORM_TEMPLATES from 'utils/form.templates'

const CONFIG_NAME = 'default-email-config'
const RECEIVER_NAME = 'global-email-receiver'
const SECRET_NAME = 'global-email-config-secret'

@observer
export default class Mail extends React.Component {
  configStore = new ConfigStore()

  receiverStore = new ReceiverStore()

  secretStore = new SecretStore()

  userStore = new UserStore()

  state = {
    formData: {
      config: this.configFormTemplate,
      receiver: this.receiverFormTemplate,
      secret: this.secretTemplate,
    },
    formStatus: 'create',
    showTip: false,
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
      type: 'email',
    })
  }

  get secretTemplate() {
    return FORM_TEMPLATES['globalsecret']({ name: SECRET_NAME })
  }

  componentDidMount() {
    this.fetchData()
  }

  fetchData = async () => {
    const results = await this.configStore.fetchList({ type: 'email' })
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
      const receiverMail = safeParseJSON(
        get(
          receivers[0],
          'metadata.annotations["kubesphere.io/receiver-mail"]',
          []
        )
      )
      set(
        receivers[0],
        'metadata.annotations["kubesphere.io/receiver-mail"]',
        receiverMail
      )
      this.formData = {
        config: set(this.configFormTemplate, 'spec', config.spec),
        receiver: receivers[0],
        secret: set(this.secretTemplate, 'data', get(secrets, '[0].data', {})),
      }
      this.setState({
        formData: cloneDeep(this.formData),
        formStatus: 'update',
        showTip: false,
      })
    }
  }

  handleSubmit = async data => {
    const { config, receiver, secret } = cloneDeep(data)
    const { formStatus } = this.state
    const receiverMail = get(
      receiver,
      'metadata.annotations["kubesphere.io/receiver-mail"]',
      []
    )
    let message

    const secretData = get(secret, 'data')
    Object.keys(secretData).forEach(key => {
      secretData[key] = safeBtoa(secretData[key])
    })

    set(config, 'spec.email.authPassword.key', 'authPassword')
    set(config, 'spec.email.authPassword.name', SECRET_NAME)
    set(
      receiver,
      'metadata.annotations["kubesphere.io/receiver-mail"]',
      JSON.stringify(receiverMail)
    )
    set(
      receiver,
      'spec.email.to',
      receiverMail.map(item => item.email)
    )
    if (formStatus === 'create') {
      await this.configStore.create(config)
      await this.secretStore.create(
        set(this.secretTemplate, 'data', secretData)
      )
      await this.receiverStore.create(receiver)
      message = t('Added Successfully')
    } else {
      await this.configStore.update({ name: CONFIG_NAME }, config)
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
          name={t('Mail')}
          desc={t('MAIL_DESC')}
        />
        {this.renderConfigForm()}
      </div>
    )
  }

  renderConfigForm() {
    const { formData, formStatus, showTip } = this.state

    return (
      <Panel loading={this.configStore.list.isLoading}>
        <MailForm
          showTip={showTip}
          formStatus={formStatus}
          data={formData}
          onCancel={this.onFormClose}
          onSubmit={this.handleSubmit}
          onChange={this.onFormDataChange}
          isSubmitting={this.configStore.isSubmitting}
          disableSubmit={!showTip && formStatus === 'update'}
        />
      </Panel>
    )
  }
}
