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

import { get, set } from 'lodash'
import { observable, action } from 'mobx'
import { observer } from 'mobx-react'
import { Modal } from 'components/Base'
import { Form, Input, Loading, Select, TextArea } from '@kube-design/components'
import CredentialStore from 'stores/devops/credential'
import { PATTERN_NAME } from 'utils/constants'

import styles from './index.scss'

@observer
export default class CredentialModal extends React.Component {
  static propTypes = {
    name: PropTypes.string,
    isEditMode: PropTypes.bool,
    formTemplate: PropTypes.object,
    credentialType: PropTypes.string,
    title: PropTypes.string,
  }

  static defaultProps = {
    visible: false,
    onOk: () => {},
    onCancel: () => {},
    isEditMode: false,
  }

  constructor(props) {
    super(props)
    this.formRef = React.createRef()
    this.store = new CredentialStore()

    if (props.formTemplate) {
      this.formData = props.formTemplate
      this.type = props.formTemplate.type
      this.formData[this.type] = { ...this.formData.data }
    }

    if (props.credentialType) {
      this.type = props.credentialType
      this.formData.type = props.credentialType
    }
    this.username = get(globals, 'user.username', '')
  }

  componentDidMount() {
    if (this.type === 'kubeconfig') {
      this.fetchKubeConfig()
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.visible && !prevProps.visible) {
      this.clearData()
      if (this.props.formTemplate) {
        this.formData = this.props.formTemplate
        this.type = this.props.formTemplate.type
        this.formData[this.type] = { ...this.formData.data }
      }

      if (this.props.credentialType) {
        this.type = this.props.credentialType
        this.formData.type = this.props.credentialType
        if (!this.kubeconfig && this.props.credentialType === 'kubeconfig') {
          this.fetchKubeConfig()
        }
      }
    }
  }

  clearData = () => {
    this.formData = {}
    this.isSubmitting = false
    this.type = 'username_password'
  }

  @observable
  formData = {}

  @observable
  type = 'username_password'

  @observable
  kubeconfig = ''

  @observable
  isSubmitting = false

  @observable
  isGetConfigLoading = false

  @action
  async handleCreate(data, { devops, cluster }) {
    return await this.store.handleCreate(data, { devops, cluster })
  }

  @action
  fetchKubeConfig = async () => {
    const { cluster } = this.props
    this.isGetConfigLoading = true
    const result = await request
      .get(
        `kapis/resources.kubesphere.io/v1alpha2/${this.store.getPath({
          cluster,
        })}/users/${this.username}/kubeconfig`
      )
      .finally(() => {
        this.isGetConfigLoading = false
      })

    this.kubeconfig = result
    set(this.formData, 'kubeconfig.content', result)
    this.forceUpdate()
  }

  @action
  handleOk = () => {
    const formData = this.formRef.current.getData()

    this.formRef.current.validate(async () => {
      this.isSubmitting = true
      this.updateFormData(formData)
      this.props.onOk(formData, () => {
        this.isSubmitting = false
      })
    })
  }

  updateFormData(data) {
    if (data[this.type]) {
      data[this.type].id = data.id
    }
  }

  @action
  handleTypeChange = type => {
    this.type = type
    this.formData[type] = { id: get(this.formData, 'id', '') }
    if (!this.kubeconfig && this.type === 'kubeconfig') {
      this.fetchKubeConfig()
    }
  }

  nameValidator = (rule, value, callback) => {
    const { devops, cluster, isEditMode } = this.props
    if (!value || isEditMode) {
      return callback()
    }

    this.store
      .checkName({
        name: value,
        devops,
        cluster,
      })
      .then(resp => {
        if (resp.exist) {
          return callback({
            message: t('Credential ID exists'),
            field: rule.field,
          })
        }
        callback()
      })
  }

  renderCredentForm = () => {
    switch (this.type) {
      case 'ssh':
        return (
          <React.Fragment>
            <Form.Item label={t('Username')}>
              <Input name="ssh.username" />
            </Form.Item>
            <Form.Item label={t('Private key')}>
              <TextArea name="ssh.private_key" />
            </Form.Item>
            <Form.Item label={t('passphrase')}>
              <Input type="password" name="ssh.passphrase" />
            </Form.Item>
          </React.Fragment>
        )
      case 'username_password':
        return (
          <React.Fragment>
            <Form.Item label={t('Username')}>
              <Input
                name="username_password.username"
                disabled={
                  this.props.sourceType && this.props.sourceType === 'github'
                }
              />
            </Form.Item>
            <Form.Item label={t('Token / Password')}>
              <Input name="username_password.password" type="password" />
            </Form.Item>
          </React.Fragment>
        )
      case 'secret_text':
        return (
          <React.Fragment>
            <Form.Item label={t('secret')}>
              <TextArea name="secret_text.secret" />
            </Form.Item>
          </React.Fragment>
        )
      case 'kubeconfig':
        return (
          <Form.Item
            className={styles.narrowItem}
            label={t('Content')}
            desc={t("The default value here is the current user's kubeconfig.")}
          >
            {this.isGetConfigLoading ? (
              <Loading>
                <TextArea
                  name="kubeconfig.content"
                  defaultValue={this.kubeconfig}
                />
              </Loading>
            ) : (
              <TextArea
                name="kubeconfig.content"
                defaultValue={this.kubeconfig}
              />
            )}
          </Form.Item>
        )
      default:
        return null
    }
  }

  render() {
    const { visible, onCancel, isEditMode, credentialType, title } = this.props

    return (
      <Modal
        width={680}
        bodyClassName={styles.body}
        onCancel={onCancel}
        onOk={this.handleOk}
        visible={visible}
        closable={false}
        isSubmitting={this.isSubmitting}
        title={title || t('Create Credentials')}
      >
        <Form data={this.formData} ref={this.formRef}>
          <Form.Item
            label={t('Credential ID')}
            rules={[
              { required: true, message: t('Please input credential') },
              {
                pattern: PATTERN_NAME,
                message: `${t('Invalid credential ID')}, ${t('NAME_DESC')}`,
              },
              { validator: this.nameValidator },
            ]}
          >
            <Input name="id" disabled={isEditMode} />
          </Form.Item>
          <Form.Item label={t('Type')}>
            <Select
              options={[
                { label: t('username_password'), value: 'username_password' },
                { label: 'SSH', value: 'ssh' },
                { label: t('secret_text'), value: 'secret_text' },
                { label: t('kubeconfig'), value: 'kubeconfig' },
              ]}
              disabled={isEditMode}
              onChange={this.handleTypeChange}
              defaultValue={'username_password' || credentialType}
              name="type"
            />
          </Form.Item>
          {isEditMode ? (
            <div className={styles.desc}>{t('EDIT_CREDENTIAL_DESC')}</div>
          ) : null}
          {this.renderCredentForm()}
          <Form.Item label={t('Description')} desc={t('DESCRIPTION_DESC')}>
            <TextArea name="description" maxLength={256} />
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}
