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
import { get, pick } from 'lodash'
import { action } from 'mobx'
import { observer } from 'mobx-react'
import { Form, Input, Select, Tag } from '@kube-design/components'
import { Modal } from 'components/Base'
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
  kubeconfigFile: 'kubeconfigFile',
}

const setCredentialType = str => {
  const typeReg = /\$\{\[([\w-]*)\(/
  const type = str.match(typeReg) && str.match(typeReg)[1]
  if (type) {
    const credentialType = Object.entries(typesDict).find(
      typeArr => typeArr[1] === type
    )
    return credentialType ? credentialType[0] : null
  }
  return null
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
    this.state = {
      formData: {},
      credentialType: 'username_password',
    }
  }

  componentDidMount() {
    this.props.store.getCredentials()
    this.initEditor()
  }

  initEditor = () => {
    const { edittingData } = this.props
    if (edittingData.type === 'withCredentials') {
      const str = get(edittingData, 'data.value', '')
      if (str) {
        const formData = groovyToJS(str)
        const credentialType = setCredentialType(str)
        this.setState({ formData, credentialType })
      }
    }
  }

  @action
  handleCredentialChange = id => {
    const credentialsList = this.getCredentialsList()
    const selectedCredential = credentialsList.find(
      credential => credential.value === id
    )

    const credentialType = get(selectedCredential, 'type', 'username_password')

    this.setState({
      credentialType,
      formData: { credentialsId: id },
    })
  }

  handleOk = () => {
    const formData = this.formRef.current.getData()
    this.formRef.current.validate(() => {
      this.props.onAddStep({
        name: 'withCredentials',
        arguments: {
          isLiteral: false,
          value: formatParams(formData, typesDict[this.state.credentialType]),
        },
        children: [],
      })
    })
  }

  renderParams = () => {
    switch (this.state.credentialType) {
      case 'username_password':
        return (
          <React.Fragment>
            <Form.Item label={t('Password Variable')}>
              <Input name="passwordVariable" />
            </Form.Item>
            <Form.Item label={t('Username Variable')}>
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
            <Form.Item label={t('Username Variable')}>
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
      case 'kubeconfigFile':
        return (
          <Form.Item label={t('KubeconfigFile Variable')}>
            <Input name="variable" />
          </Form.Item>
        )
      default:
        return null
    }
  }

  getCredentialsListData = params => {
    return this.props.store.getCredentials(params)
  }

  getCredentialsList = () => {
    return [
      ...this.props.store.credentialsList.data.map(credential => ({
        label: credential.name,
        value: credential.name,
        type: credential.type,
        disabled: false,
      })),
    ]
  }

  optionRender = ({ label, type, disabled }) => (
    <span style={{ display: 'flex', alignItem: 'center' }}>
      {label}&nbsp;&nbsp;
      <Tag type={disabled ? '' : 'warning'}>
        {type === 'ssh' ? 'SSH' : t(type)}
      </Tag>
    </span>
  )

  render() {
    const { visible, onCancel } = this.props
    const { credentialsList } = this.props.store

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
        <Form data={this.state.formData} ref={this.formRef}>
          <Form.Item
            label={t('CREDENTIAL_NAME')}
            rules={[{ required: true, message: t('PARAM_REQUIRED') }]}
            desc={
              <p>
                {t('SELECT_CREDENTIAL_DESC')}
                <span
                  className={styles.clickable}
                  onClick={this.props.showCredential}
                >
                  {t('CREATE_CREDENTIAL')}
                </span>
              </p>
            }
          >
            <Select
              name="credentialsId"
              options={this.getCredentialsList()}
              pagination={pick(credentialsList, ['page', 'limit', 'total'])}
              isLoading={credentialsList.isLoading}
              onFetch={this.getCredentialsListData}
              onChange={this.handleCredentialChange}
              optionRenderer={this.optionRender}
              valueRenderer={this.optionRender}
              searchable
              clearable
            />
          </Form.Item>
          {this.renderParams()}
        </Form>
      </Modal>
    )
  }
}
