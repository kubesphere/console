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
import SlackConfigForm from 'components/Forms/SlackConfigForm'

import Store from 'stores/notification/slackconfig'
import SecretStore from 'stores/notification/secret'

import { safeBtoa } from 'utils/base64'
import FORM_TEMPLATES from 'utils/form.templates'

const CONFIG_NAME = 'default-slack-config'
const SECRET_NAME = 'global-slack-token'

@observer
export default class SlackConfig extends React.Component {
  store = new Store()

  secretStore = new SecretStore()

  state = {
    config: {},
    formStatus: 'create',
    isEdit: false,
  }

  get formTemplate() {
    return FORM_TEMPLATES['slackconfigs']({ name: CONFIG_NAME })
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
        'spec.slackTokenSecret.key',
        get(secrets, '[0].data.token', '')
      )
      this.config = cloneDeep(config)
      this.setState({
        config,
        formStatus: 'update',
        showTip: false,
        isEdit: false,
      })
    } else {
      this.config = this.formTemplate
      this.setState({
        config: this.formTemplate,
        formStatus: 'create',
        isEdit: false,
      })
    }
  }

  handleSubmit = async data => {
    let message
    const { formStatus } = this.state
    const token = safeBtoa(get(data, 'spec.slackTokenSecret.key'))
    set(data, 'spec.slackTokenSecret.key', 'token')
    set(data, 'spec.slackTokenSecret.name', SECRET_NAME)

    if (formStatus === 'create') {
      await this.secretStore.create(set(this.secretTemplate, 'data', { token }))
      await this.store.create(data)
      message = t('Added Successfully')
    } else {
      await this.secretStore.update(
        { name: SECRET_NAME },
        set(this.secretTemplate, 'data', { token })
      )
      await this.store.update({ name: CONFIG_NAME }, data)
      message = t('Update Successfully')
    }

    this.fetchData()
    Notify.success({ content: message, duration: 1000 })
  }

  handleChangeMode = () => {
    this.setState(({ isEdit }) => ({
      isEdit: !isEdit,
    }))
  }

  onFormDataChange = () => {
    this.setState({
      showTip: true,
    })
  }

  onFormClose = () => {
    this.setState({
      showTip: false,
      config: cloneDeep(this.config),
    })
  }

  render() {
    return (
      <div>
        <Banner
          icon="file"
          rightIcon="/assets/banner-icon-1.svg"
          name={t('Slack Server Settings')}
          desc={t('SLACK_SERVER_SETTINGS_DESC')}
        />
        {this.renderConfigForm()}
      </div>
    )
  }

  renderConfigForm() {
    const { config, formStatus, showTip, isEdit } = this.state

    return (
      <Panel
        title={t('Slack Server Settings')}
        isLoading={this.store.list.isLoading}
      >
        <SlackConfigForm
          showTip={showTip}
          isEdit={isEdit}
          formStatus={formStatus}
          data={config}
          onCancel={this.onFormClose}
          onSubmit={this.handleSubmit}
          onChange={this.onFormDataChange}
          onChangeMode={this.handleChangeMode}
          isSubmitting={this.store.isSubmitting}
        />
      </Panel>
    )
  }
}
