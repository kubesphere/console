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
import MailReceiverForm from 'components/Forms/MailReceiverForm'
import Panel from 'settings/components/Panel'

import Store from 'stores/notification/emailreceiver'

import FORM_TEMPLATES from 'utils/form.templates'

const CONFIG_NAME = 'global-email-receiver'

@observer
export default class EmailReceiver extends React.Component {
  store = new Store()

  state = {
    config: {},
    formStatus: 'create',
    showTip: false,
  }

  get formTemplate() {
    return FORM_TEMPLATES['emailreceivers']({ name: CONFIG_NAME })
  }

  componentDidMount() {
    this.fetchData()
  }

  fetchData = async () => {
    const results = await this.store.fetchList()
    const config = results.find(
      item => get(item, 'metadata.name') === CONFIG_NAME
    )

    if (isEmpty(config)) {
      this.config = cloneDeep(this.formTemplate)
      this.setState({ config: this.formTemplate, formStatus: 'create' })
    } else {
      this.config = cloneDeep(config)
      this.setState({ config, formStatus: 'update', showTip: false })
    }
  }

  handleSubmit = data => {
    const { formStatus } = this.state
    if (formStatus === 'create') {
      this.store.create(data).then(() => {
        this.fetchData()
        Notify.success({ content: t('Added Successfully'), duration: 1000 })
      })
    }

    if (formStatus === 'update') {
      this.store.update({ name: CONFIG_NAME }, data).then(() => {
        this.fetchData()
        Notify.success({ content: t('Update Successfully'), duration: 1000 })
      })
    }
  }

  onFormDataChange = () => {
    this.setState({
      showTip: true,
    })
  }

  onFormClose = () => {
    this.setState({
      config: cloneDeep(this.config),
      showTip: false,
    })
  }

  render() {
    return (
      <div>
        <Banner
          icon="mail"
          type="white"
          name={t('Mail Receiver Management')}
          desc={t('MAIL_RECEIVER_MANAGEMENT_DESC')}
        />
        {this.renderConfigForm()}
      </div>
    )
  }

  renderConfigForm() {
    const { config, formStatus, showTip } = this.state

    return (
      <Panel
        title={t('Mail Receiver Settings')}
        isLoading={this.store.list.isLoading}
      >
        <MailReceiverForm
          formStatus={formStatus}
          showTip={showTip}
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
