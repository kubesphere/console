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
import PropTypes from 'prop-types'
import { get } from 'lodash'

import { observable, action } from 'mobx'
import { observer } from 'mobx-react'
import { Form, Modal } from 'components/Base'
import { Input, Select } from '@pitrix/lego-ui'
import { groovyToJS } from 'utils/devops'

import styles from './index.scss'

const formatParams = (formData, type) => {
  const content = Object.keys(formData).reduce(
    (str, key) => `${str}${key} : '${formData[key]}' ,`,
    ''
  )
  return `\${[${type}(${content})]}`
}

const typesDict = {
  secret_text: 'string',
  username_password: 'usernamePassword',
  ssh: 'sshUserPrivateKey',
  kubeconfig: 'kubeconfigContent',
}

@observer
export default class WithCredentials extends React.Component {
  static propTypes = {
    name: PropTypes.string,
  }

  static defaultProps = {
    visible: false,
    onOk() {},
    onCancel() {},
  }

  constructor(props) {
    super(props)
    this.formRef = React.createRef()
  }

  componentDidMount() {
    this.props.store.getCredentials()
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.edittingData.type === 'withCredentials') {
      const str = get(nextProps, 'edittingData.data.value', '')
      if (str) {
        this.formData = groovyToJS(str)
        this.setCredentialType(str)
      }
    }
  }

  @observable
  formData = {}
  @observable
  credentialType = 'username_password'

  @action
  setCredentialType = str => {
    const typeReg = /\$\{\[([\w-]*)\(/
    const type = str.match(typeReg) && str.match(typeReg)[1]
    if (type) {
      this.credentialType = Object.entries(typesDict).find(
        typeArr => typeArr[1] === type
      )[0]
    }
  }

  @action
  handleCredentialChange = id => {
    const { credentials } = this.props.store

    const selectedCredential = credentials.find(
      credential => credential.value === id
    )
    this.credentialType = selectedCredential.type
  }

  handleOk = () => {
    const formData = this.formRef.current.getData()
    this.formRef.current.validate(() => {
      this.props.onAddStep({
        name: 'withCredentials',
        arguments: {
          isLiteral: false,
          value: formatParams(formData, typesDict[this.credentialType]),
        },
        children: [],
      })
    })
  }

  renderParams = () => {
    switch (this.credentialType) {
      case 'username_password':
        return (
          <React.Fragment>
            <Form.Item label={t('password Variable')}>
              <Input name="passwordVariable" />
            </Form.Item>
            <Form.Item label={t('username Variable')}>
              <Input name="usernameVariable" />
            </Form.Item>
          </React.Fragment>
        )
      case 'secret_text':
        return (
          <React.Fragment>
            <Form.Item label={t('Text Variable')}>
              <Input name="variable" />
            </Form.Item>
          </React.Fragment>
        )
      case 'ssh':
        return (
          <React.Fragment>
            <Form.Item label={t('key File Variable')}>
              <Input name="keyFileVariable" />
            </Form.Item>
            <Form.Item label={t('passphrase Variable')}>
              <Input name="passphraseVariable" />
            </Form.Item>
            <Form.Item label={t('username Variable')}>
              <Input name="usernameVariable" />
            </Form.Item>
          </React.Fragment>
        )
      case 'kubeconfig':
        return (
          <Form.Item label={t('Kubeconfig Variable')}>
            <Input name="variable" />
          </Form.Item>
        )
      default:
        return null
    }
  }

  render() {
    const { visible, onCancel } = this.props
    const { credentials } = this.props.store
    return (
      <Modal
        width={680}
        bodyClassName={styles.body}
        onCancel={onCancel}
        onOk={this.handleOk}
        visible={visible}
        closable={false}
        title={t('withCredentials')}
      >
        <Form data={this.formData} ref={this.formRef}>
          <Form.Item
            label={t('Credential ID')}
            rules={[{ required: true, message: t('This param is required') }]}
            desc={
              <p>
                {t('ADD_NEW_CREDENTIAL_DESC')}
                <span
                  className={styles.clickable}
                  onClick={this.props.showCredential}
                >
                  {t('Create a credential')}
                </span>
              </p>
            }
          >
            <Select
              name="credentialsId"
              options={credentials}
              onChange={this.handleCredentialChange}
            />
          </Form.Item>
          {this.renderParams()}
        </Form>
      </Modal>
    )
  }
}
