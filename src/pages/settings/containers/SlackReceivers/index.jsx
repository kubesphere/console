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
import { isEmpty, get, cloneDeep } from 'lodash'

import { Notify } from '@kube-design/components'
import { Banner } from 'components/Base'
import Panel from 'settings/components/Panel'
import SlackReceiverForm from 'components/Forms/SlackReceiverForm'

import Store from 'stores/notification/slackreceiver'

import FORM_TEMPLATES from 'utils/form.templates'

const CONFIG_NAME = 'global-slack-receiver'

@observer
export default class SlackReceiver extends React.Component {
  store = new Store()

  state = {
    config: {},
    formStatus: 'create',
  }

  get formTemplate() {
    return FORM_TEMPLATES['slackreceivers']({ name: CONFIG_NAME })
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

    if (formStatus === 'create') {
      await this.store.create(data)
      message = t('Added Successfully')
    } else {
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
      config: cloneDeep(this.config),
    })
  }

  render() {
    return (
      <div>
        <Banner
          icon="file"
          rightIcon="/assets/banner-icon-1.svg"
          name={t('Slack Channel Settings')}
          desc={t('SLACK_CHANNEL_SETTINGS_DESC')}
        />
        {this.renderConfigForm()}
      </div>
    )
  }

  renderConfigForm() {
    const { config, formStatus, showTip } = this.state

    return (
      <Panel
        title={t('Slack Channel Settings')}
        isLoading={this.store.list.isLoading}
      >
        <SlackReceiverForm
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
