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

import { observable, action } from 'mobx'
import { observer } from 'mobx-react'
import { Form, Modal, Checkbox } from 'components/Base'
import { Input, Select, Icon, Columns, Column } from '@pitrix/lego-ui'

import styles from './index.scss'

const objToGroovy = obj => {
  const str = Object.keys(obj)
    .map(key => {
      if (typeof obj[key] === 'object') {
        const value = Object.keys(obj[key])
          .map(_argKey => `${_argKey}: '${obj[key][_argKey]}'`)
          .join(', ')
        return `${key}: [[${value}]]`
      }
      return `${key}: '${obj[key]}'`
    })
    .join(', ')

  return `[${str}]`
}

@observer
export default class KubernetesDeploy extends React.Component {
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
    this.state = { formData: {} }
  }

  static getDerivedStateFromProps(nextProps) {
    if (nextProps.edittingData.type === 'kubernetesDeploy') {
      const formData = nextProps.edittingData.data.reduce((prev, arg) => {
        prev[arg.key] = arg.value.value
        return prev
      }, {})
      return { formData }
    }
    return null
  }

  @observable
  dockerCredentials = [{ key: 'default' }]
  @observable
  isShowAdvenced = false
  @observable
  isShowDetail = false

  handleChange = type => e => {
    this.setState(state => {
      state.formData[type] = e.target ? e.target.value.trim() : e
      return state
    })
  }

  @action
  handleCredentialChange = (key, type) => e => {
    this.dockerCredentials = this.dockerCredentials.map(credential => {
      if (credential.key === key) {
        credential[type] = e.target ? e.target.value : e
      }
      return credential
    })
  }

  handleAddDockerCredential = () => {
    this.dockerCredentials.push({ key: `${Math.random()}` })
  }

  showAdvencedSetting = () => {
    this.isShowAdvenced = true
  }

  handleRemove = key => () => {
    this.dockerCredentials = this.dockerCredentials.filter(
      credential => credential.key !== key
    )
  }

  toggleDesc = () => {
    this.isShowDetail = !this.isShowDetail
  }

  handleOk = () => {
    this.formRef.current.validate(() => {
      const _arguments = Object.keys(this.state.formData).map(key => ({
        key,
        value: {
          isLiteral: true,
          value: this.state.formData[key],
        },
      }))
      if (this.isShowAdvenced) {
        const params = this.dockerCredentials.reduce(
          (str, credential, index) => {
            delete credential.key
            if (index === this.dockerCredentials.length - 1) {
              return `${str + objToGroovy(credential)}`
            }
            return `${str + objToGroovy(credential)},`
          },
          ''
        )
        if (params !== '[]') {
          _arguments.push({
            key: 'dockerCredentials',
            value: {
              isLiteral: false,
              value: `\${[${params}]}`,
            },
          })
        }
      }
      this.props.onAddStep({
        name: 'kubernetesDeploy',
        arguments: _arguments.filter(arg => arg.value.value !== ''),
      })
    })
  }

  renderDockerCredentials = () => {
    const { passWordCredentials } = this.props.store
    return (
      <div className={styles.dockerCredentialsContent}>
        <div className={styles.dockerCredentialsContent__title}>
          {t('Kubernetes Secrets')}
        </div>
        <Form.Item label={t('Kubernetes Namespace for Secret')}>
          <Input
            name="secretNamespace"
            value={this.state.formData.secretNamespace}
            onChange={this.handleChange('secretNamespace')}
          />
        </Form.Item>
        <Form.Item label={t('Secret Name')}>
          <Input
            name="secretName"
            value={this.state.formData.secretName}
            onChange={this.handleChange('secretName')}
          />
        </Form.Item>
        <div className={styles.dockerCredentialsContent__title}>
          {t('Docker Container Registry Credentials')}
        </div>
        <div>
          {this.dockerCredentials.map(credential => (
            <div
              key={credential.key}
              className={styles.dockerCredentialsContent__content}
            >
              <Icon
                name="trash"
                clickable
                className={styles.dockerCredentialsContent__trashicon}
                onClick={this.handleRemove(credential.key)}
              />
              <Form.Item label={t('Docker Registry URL')}>
                <Input
                  value={credential.url}
                  onChange={this.handleCredentialChange(credential.key, 'url')}
                />
              </Form.Item>
              <Form.Item label={t('Registry Credentials')}>
                <Select
                  value={credential.credentialsId}
                  options={passWordCredentials}
                  onChange={this.handleCredentialChange(
                    credential.key,
                    'credentialsId'
                  )}
                />
              </Form.Item>
            </div>
          ))}
          <div
            onClick={this.handleAddDockerCredential}
            className={styles.clickable}
          >
            {t('Add another credential')}
          </div>
        </div>
      </div>
    )
  }

  render() {
    const { visible, onCancel } = this.props
    const { kubeconfigCredentials } = this.props.store

    return (
      <Modal
        width={680}
        bodyClassName={styles.body}
        onCancel={onCancel}
        onOk={this.handleOk}
        visible={visible}
        closable={false}
        title={t('kubernetesDeploy')}
      >
        <div className={styles.desc}>
          {t('KUBERNETES_DEPLOY_DESC')}
          {this.isShowDetail ? t.html('KUBERNETES_DEPLOY_DESC_MORE') : null}
          <span className={styles.clickable} onClick={this.toggleDesc}>
            {this.isShowDetail ? t('Collapse') : t('More')}
          </span>
        </div>
        <Form
          className={styles.KubernetesForm}
          data={this.state.formData}
          ref={this.formRef}
        >
          <Form.Item
            label={t('Kubeconfig')}
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
            <Select name="kubeconfigId" options={kubeconfigCredentials} />
          </Form.Item>
          <Form.Item label={t('Config File Path')}>
            <Input name="configs" />
          </Form.Item>
          <Columns className="margin-t12">
            <Column>
              <Form.Item>
                <Checkbox name="enableConfigSubstitution" defaultValue={true}>
                  {t('Enable Variable Substitution in Config')}
                </Checkbox>
              </Form.Item>
            </Column>
            <Column>
              <Form.Item>
                <Checkbox name="deleteResource" defaultValue={false}>
                  {t('Delete all resources of the deployment file')}
                </Checkbox>
              </Form.Item>
            </Column>
          </Columns>
          {this.isShowAdvenced ? (
            this.renderDockerCredentials()
          ) : (
            <div
              className={styles.clickable}
              onClick={this.showAdvencedSetting}
            >
              {t('Show Advanced Settings')}
            </div>
          )}
        </Form>
      </Modal>
    )
  }
}
