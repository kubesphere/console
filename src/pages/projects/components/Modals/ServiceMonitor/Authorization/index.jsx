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

import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { get, unset, pick } from 'lodash'
import {
  Alert,
  Icon,
  RadioGroup,
  Form,
  Input,
  Checkbox,
  Button,
} from '@kube-design/components'
import { Text } from 'components/Base'
import { SecretSelect } from 'components/Inputs'

import styles from './index.scss'

@observer
export default class Authorization extends Component {
  state = {
    showForm: false,
    authType: get(this.props, 'value.type', ''),
  }

  formRef = React.createRef()

  get authTypes() {
    return [
      { label: 'No Auth', value: '' },
      { label: 'TLSConfig', value: 'tlsConfig' },
      { label: 'BearerTokenSecret', value: 'bearerTokenSecret' },
      { label: 'BasicAuth', value: 'basicAuth' },
    ]
  }

  get secrets() {
    return this.props.secretStore.list.data.slice()
  }

  get secretLink() {
    const { workspace, cluster, namespace } = this.props
    return `/${workspace}/clusters/${cluster}/projects/${namespace}/secrets`
  }

  refreshSecrets = () => {
    const { cluster, namespace } = this.props
    this.props.secretStore.fetchListByK8s({ cluster, namespace })
  }

  toggleForm = () => {
    this.setState(({ showForm }) => ({
      showForm: !showForm,
    }))
  }

  hideForm = () => {
    this.setState({ showForm: false })
  }

  handleTypeChange = value => {
    const types = this.authTypes.map(item => item.value)

    types.forEach(_type => {
      if (_type && _type !== value) {
        unset(this.props.value, _type)
      }
    })

    this.setState({ authType: value })
  }

  handleSubmit = () => {
    const form = this.formRef.current
    form &&
      form.validate(() => {
        const data = form.getData()
        const { onChange, value } = this.props

        onChange({
          ...data,
          ...pick(value, [
            'port',
            'path',
            'scheme',
            'params',
            'interval',
            'scrapeTimeout',
          ]),
        })
        this.hideForm()
      })
  }

  renderFormContent() {
    const { authType } = this.state

    let content
    switch (authType) {
      case '':
        content = <Alert type="info" message={t('NO_AUTH_TIP')} />
        break
      case 'tlsConfig':
        content = (
          <div>
            <Form.Item label={'CA'}>
              <SecretSelect name="tlsConfig.ca.secret" secrets={this.secrets} />
            </Form.Item>
            <Form.Item label={'Cert'}>
              <SecretSelect
                name="tlsConfig.cert.secret"
                secrets={this.secrets}
              />
            </Form.Item>
            <Form.Item label={'key'}>
              <SecretSelect name="tlsConfig.keySecret" secrets={this.secrets} />
            </Form.Item>
            <Form.Item label={'Server Name'}>
              <Input name="tlsConfig.serverName" />
            </Form.Item>
            <Form.Item>
              <Checkbox name="tlsConfig.insecretSkipVerify">
                {t('Insecret Skip Verify')}
              </Checkbox>
            </Form.Item>
          </div>
        )
        break
      case 'bearerTokenSecret':
        content = (
          <div>
            <Form.Item label={'Token'}>
              <SecretSelect name="bearerTokenSecret" secrets={this.secrets} />
            </Form.Item>
          </div>
        )
        break
      case 'basicAuth':
        content = (
          <div>
            <Form.Item label={t('User Name')}>
              <SecretSelect name="basicAuth.username" secrets={this.secrets} />
            </Form.Item>
            <Form.Item label={t('Password')}>
              <SecretSelect name="basicAuth.password" secrets={this.secrets} />
            </Form.Item>
          </div>
        )
        break
      default:
        break
    }

    return content
  }

  renderFormFooter() {
    return (
      <div className={styles.footer}>
        <Button onClick={this.hideForm}>{t('Cancel')}</Button>
        <Button type="control" onClick={this.handleSubmit}>
          {t('OK')}
        </Button>
      </div>
    )
  }

  renderForm() {
    const { value = {} } = this.props
    return (
      <>
        <div className={styles.form}>
          <Text
            className="margin-b12"
            title={t('Choose Authentication Method')}
            description={t('Port connection authentication')}
          />
          <Form type="inner" data={value} ref={this.formRef}>
            <div className="margin-b12">
              <Form.Item>
                <RadioGroup
                  options={this.authTypes}
                  mode="button"
                  name="type"
                  onChange={this.handleTypeChange}
                />
              </Form.Item>
            </div>
            {value.type && (
              <Alert
                type="default"
                className="margin-b12"
                message={
                  <div className={styles.secrets}>
                    <a
                      href={this.secretLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {t('Create a new secret')}
                    </a>{' '}
                    or{' '}
                    <a onClick={this.refreshSecrets}>{t('refresh secrets')}</a>
                  </div>
                }
              />
            )}
            <div className={styles.formContent}>{this.renderFormContent()}</div>
          </Form>
        </div>
        {this.renderFormFooter()}
      </>
    )
  }

  render() {
    const { value = {} } = this.props
    const option =
      this.authTypes.find(item => item.value === value.type) ||
      this.authTypes[0]
    return (
      <div className={styles.wrapper}>
        <div className={styles.value} onClick={this.toggleForm}>
          <Icon className={styles.prefix} name="ssh" />
          <div className={styles.text}>{t(option.label)}</div>
        </div>
        {this.state.showForm && (
          <div className={styles.dropdown}>{this.renderForm()}</div>
        )}
      </div>
    )
  }
}
