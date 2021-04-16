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
import { isEmpty, pick, get, set, isUndefined } from 'lodash'
import { observable, action, toJS } from 'mobx'
import { observer } from 'mobx-react'
import {
  Checkbox,
  Column,
  Columns,
  Form,
  Icon,
  Input,
  Select,
  Tag,
} from '@kube-design/components'
import { Modal } from 'components/Base'

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

  @observable
  formData = { enableConfigSubstitution: true, deleteResource: false }

  formRef = React.createRef()

  @observable
  dockerCredentials = [{ key: 'default' }]

  @observable
  isShowAdvenced = false

  @observable
  isShowDetail = false

  componentDidMount() {
    if (this.props.edittingData.type === 'kubernetesDeploy') {
      const formData = this.props.edittingData.data.reduce((prev, arg) => {
        prev[arg.key] = arg.value.value
        return prev
      }, {})

      const { dockerCredentials, secretNamespace, secretName } = formData

      this.isShowAdvenced = !!(
        dockerCredentials ||
        secretNamespace ||
        secretName
      )

      this.formData = formData
      this.initData()
    }
  }

  @action
  handleCredentialChange = (key, type) => e => {
    this.dockerCredentials = this.dockerCredentials.map(credential => {
      if (credential.key === key) {
        if (type === 'credentialsId' && isUndefined(e)) {
          delete credential[type]
        } else {
          credential[type] = e && e.target ? e.target.value : e
        }
      }

      return credential
    })
  }

  handleAddDockerCredential = () => {
    this.dockerCredentials.push({ key: `${Math.random()}` })
  }

  initData = () => {
    const { dockerCredentials } = this.formData
    this.dockerCredentials = []

    if (dockerCredentials) {
      const matchData = dockerCredentials.match(/\$\{(\[(.+)\])\}$/)
      const value = get(matchData, '[2]', '')
      const data = value.match(/(\[(.+)\])+/g)

      if (!isEmpty(data)) {
        const _data = data[0].split('],[').map(item => {
          const obj = {}
          const _item = item
            .replace('[', '')
            .replace(']', '')
            .split(',')

          _item.forEach(__item => {
            const [curKey, curValue] = this.handleStrToArr(__item)
            obj.key = curValue
            obj[curKey] = curValue
          })

          return obj
        })

        this.dockerCredentials = _data
      } else {
        this.dockerCredentials = []
      }
    } else {
      this.dockerCredentials = []
    }
  }

  handleStrToArr = item => {
    let [key, value] = item.split(':')
    key = key.trim()
    value = value.trim().replace(/'/g, '')
    return [key, value]
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
      const _arguments = Object.keys(this.formData).map(key => ({
        key,
        value: {
          isLiteral: true,
          value: this.formData[key],
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

        if (!isEmpty(params) || params !== '[]') {
          const dockerCredentials = _arguments.find(
            item => item.key === 'dockerCredentials'
          )
          if (dockerCredentials) {
            set(dockerCredentials, 'value.value', `\${[${params}]}`)
            set(dockerCredentials, 'value.isLiteral', false)
          } else {
            _arguments.push({
              key: 'dockerCredentials',
              value: {
                isLiteral: false,
                value: `\${[${params}]}`,
              },
            })
          }
        }
      }

      this.props.onAddStep({
        name: 'kubernetesDeploy',
        arguments: _arguments.filter(arg => arg.value.value !== ''),
      })
    })
  }

  renderDockerCredentials = () => {
    const { credentialsList } = this.props.store
    return (
      <div className={styles.dockerCredentialsContent}>
        <div className={styles.dockerCredentialsContent__title}>
          {t('Kubernetes Secrets')}
        </div>
        <Form.Item label={t('Kubernetes Namespace for Secret')}>
          <Input name="secretNamespace" />
        </Form.Item>
        <Form.Item label={t('Secret Name')}>
          <Input name="secretName" />
        </Form.Item>
        <div className={styles.dockerCredentialsContent__title}>
          {t('Docker Container Registry Credentials')}
        </div>
        <div>
          {toJS(this.dockerCredentials).map(credential => (
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
                  options={this.getRepoCredentialsList()}
                  pagination={pick(credentialsList, ['page', 'limit', 'total'])}
                  isLoading={credentialsList.isLoading}
                  onFetch={this.getCredentialsListData}
                  optionRenderer={this.optionRender}
                  valueRenderer={this.optionRender}
                  searchable
                  clearable
                  onChange={e =>
                    this.handleCredentialChange(
                      credential.key,
                      'credentialsId'
                    )(e)
                  }
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

  getCredentialsListData = params => {
    return this.props.store.getCredentials(params)
  }

  getCredentialsList = () => {
    return [
      ...this.props.store.credentialsList.data.map(credential => ({
        label: credential.name,
        value: credential.name,
        type: credential.type,
        disabled: !this.props.store.isKubeconfigCredentials(credential.type),
      })),
    ]
  }

  getRepoCredentialsList = () => {
    const list = this.getCredentialsList()
      .filter(item => this.props.store.isPassWordCredentials(item.type))
      .map(item => ({ ...item, disabled: false }))

    return list
  }

  optionRender = ({ label, type, disabled }) => (
    <span style={{ display: 'flex', alignItem: 'center' }}>
      {label}&nbsp;&nbsp;
      <Tag type={disabled ? 'default' : 'warning'}>
        {type === 'ssh' ? 'SSH' : t(type)}
      </Tag>
    </span>
  )

  optionRender = ({ label, type, disabled }) => (
    <span style={{ display: 'flex', alignItem: 'center' }}>
      {label}&nbsp;&nbsp;
      <Tag type={disabled ? 'default' : 'warning'}>
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
          data={this.formData}
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
            <Select
              name="kubeconfigId"
              options={this.getCredentialsList()}
              pagination={pick(credentialsList, ['page', 'limit', 'total'])}
              isLoading={credentialsList.isLoading}
              onFetch={this.getCredentialsListData}
              optionRenderer={this.optionRender}
              valueRenderer={this.optionRender}
              searchable
              clearable
            />
          </Form.Item>
          <Form.Item label={t('Config File Path')}>
            <Input name="configs" />
          </Form.Item>
          <Columns className="margin-t12">
            <Column>
              <Form.Item>
                <Checkbox
                  name="enableConfigSubstitution"
                  checked={this.formData.enableConfigSubstitution}
                >
                  {t('enableConfigSubstitution')}
                </Checkbox>
              </Form.Item>
            </Column>
            <Column>
              <Form.Item>
                <Checkbox
                  name="deleteResource"
                  checked={this.formData.deleteResource}
                >
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
