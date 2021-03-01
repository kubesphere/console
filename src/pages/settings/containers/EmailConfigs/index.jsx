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
import MailServersForm from 'components/Forms/MailServerForm'
import Panel from 'settings/components/Panel'

import Store from 'stores/notification/emailconfig'
import SecretStore from 'stores/notification/secret'

import { safeBtoa } from 'utils/base64'
import FORM_TEMPLATES from 'utils/form.templates'

const CONFIG_NAME = 'default-email-config'
const SECRET_NAME = 'global-email-config-password'

@observer
export default class EmailConfig extends React.Component {
  store = new Store()

  secretStore = new SecretStore()

  state = {
    config: {},
    formStatus: 'create',
    showTip: false,
  }

  get formTemplate() {
    return FORM_TEMPLATES['emailconfigs']({ name: CONFIG_NAME })
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

    if (!isEmpty(config)) {
      const secrets = await this.secretStore.fetchList({ name: SECRET_NAME })
      set(
        config,
        'spec.authPassword.key',
        get(secrets, '[0].data.password', '')
      )
      this.config = cloneDeep(config)
      this.setState({ config, formStatus: 'update', showTip: false })
    } else {
      this.config = this.formTemplate
      this.setState({ config: this.formTemplate, formStatus: 'create' })
    }
  }

  handleSubmit = async data => {
    let message
    const { formStatus } = this.state
    const password = safeBtoa(get(data, 'spec.authPassword.key'))

    if (!get(data, 'spec.from', '')) {
      set(data, 'spec.from', data.spec.authUsername)
    }

    set(data, 'spec.authPassword.key', 'password')
    set(data, 'spec.authPassword.name', SECRET_NAME)

    if (formStatus === 'create') {
      await this.secretStore.create(
        set(this.secretTemplate, 'data', { password })
      )
      await this.store.create(data)
      message = t('Added Successfully')
    } else {
      await this.secretStore.update(
        { name: SECRET_NAME },
        set(this.secretTemplate, 'data', { password })
      )
      await this.store.update({ name: CONFIG_NAME }, data)
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
      config: this.config,
    })
  }

  render() {
    return (
      <div>
        <Banner
          type="purple"
          icon="file"
          rightIcon="/assets/banner-icon-1.svg"
          name={t('Mail Server')}
          desc={t('MAIL_SERVER_DESC')}
        />
        {this.renderConfigForm()}
      </div>
    )
  }

  renderConfigForm() {
    const { config, formStatus, showTip } = this.state

    return (
      <Panel
        title={t('Mail Server Settings')}
        isLoading={this.store.list.isLoading}
      >
        <MailServersForm
          showTip={showTip}
          formStatus={formStatus}
          data={config}
          onCancel={this.onFormClose}
          onSubmit={this.handleSubmit}
          onChange={this.onFormDataChange}
          isSubmitting={this.store.isSubmitting}
        />
      </Panel>
    )
  }
}
