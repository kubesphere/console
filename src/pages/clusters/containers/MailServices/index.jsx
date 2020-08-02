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
import classnames from 'classnames'
import { isEmpty } from 'lodash'
import { toJS } from 'mobx'

import { Loading, Icon } from '@pitrix/lego-ui'
import { Button, Banner, Notify } from 'components/Base'
import MailServersForm from 'components/Forms/MailServerForm'

import Store from 'stores/notification/mailService'

import styles from './index.scss'

@observer
class MailServerConfig extends React.Component {
  store = new Store()

  get cluster() {
    return this.props.match.params.cluster
  }

  tipMap = {
    needVerified: {
      type: 'error',
      message: t('MAIL_SERVER_CONFIG_NEED_VERIFIED_TIP'),
    },
    needSaved: {
      type: 'info',
      message: t('MAIL_SERVER_CONFIG_NEED_SAVE_TIP'),
    },
    configInvalid: {
      type: 'error',
      message: t('MAIL_SERVER_CONFIG_INVALID_TIP'),
    },
  }

  state = {
    showSettingForm: false,
    formStatus: 'saved',
    config: {},
  }

  get tips() {
    return this.tipMap[this.state.formStatus] || {}
  }

  get enabledActions() {
    return globals.app.getActions({
      module: 'cluster-settings',
      cluster: this.props.match.params.cluster,
    })
  }

  componentDidMount() {
    this.fetchConfig()
  }

  async fetchConfig() {
    await this.store.fetchConfig({
      cluster: this.cluster,
    })
    this.setState({
      config: toJS(this.store.config),
    })
  }

  toggleSettingForm = () => {
    this.setState({
      showSettingForm: true,
    })
  }

  onSSLChange = enableSSL => {
    this.setState(preState => ({
      config: {
        ...preState.config,
        port: enableSSL ? 465 : 25,
      },
    }))
  }

  setMailConfig = async data => {
    await this.store.setConfig(data, {
      cluster: this.cluster,
    })

    Notify.success({ content: t('Update Successfully'), duration: 1000 })
    this.setState({
      formStatus: 'saved',
    })
  }

  onFormClose = () => {
    this.setState({
      config: toJS(this.store.config),
      formStatus: 'saved',
    })
  }

  onFormDataChange = () => {
    this.setState({
      formStatus: 'needVerified',
    })
  }

  onValidate = async config => {
    const isValid = await this.store.validate(config, {
      cluster: this.cluster,
    })
    this.setState({
      formStatus: isValid ? 'needSaved' : 'configInvalid',
    })
  }

  render() {
    return (
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <Banner
            type="purple"
            icon="file"
            rightIcon="/assets/banner-icon-1.svg"
            name={t('Mail Server')}
            desc={t('MAIL_SERVER_DESC')}
            className={styles.banner}
          />
        </div>
        <Loading spinning={this.store.isLoading}>{this.renderConfig()}</Loading>
      </div>
    )
  }

  renderConfig() {
    return isEmpty(this.store.config) && !this.state.showSettingForm
      ? this.renderEmpty()
      : this.renderConfigForm()
  }

  renderEmpty() {
    return (
      <div className={classnames(styles.pane, styles.empty)}>
        <Icon size={40} name="mail" />
        <p>{t('EMPTY_MAIL_SERVER')}</p>
        {this.renderCreateButton()}
      </div>
    )
  }

  renderCreateButton() {
    if (!this.enabledActions.includes('create')) {
      return null
    }

    return (
      <Button type="control" onClick={this.toggleSettingForm}>
        {t('Settings')}
      </Button>
    )
  }

  renderConfigForm() {
    const { config } = this.state

    return (
      <div className={styles.pane}>
        <h2>{t('Server Settings')}</h2>
        <MailServersForm
          data={config}
          tips={this.tips}
          onCancel={this.onFormClose}
          onValidate={this.onValidate}
          onSubmit={this.setMailConfig}
          onChange={this.onFormDataChange}
          onSSLChange={this.onSSLChange}
          isVerifying={this.store.verifying}
          isSubmitting={this.store.isSubmitting}
          disableSubmit={this.state.formStatus !== 'needSaved'}
          readOnly={!this.enabledActions.includes('edit')}
        />
      </div>
    )
  }
}

export default MailServerConfig
