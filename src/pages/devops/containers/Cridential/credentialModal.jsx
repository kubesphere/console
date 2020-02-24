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
import { Form, Modal } from 'components/Base'
import { Input, Select, TextArea, Loading } from '@pitrix/lego-ui'
import CredentialStore from 'stores/devops/cridential'

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

  componentWillReceiveProps(nextProps) {
    if (nextProps.visible && !this.props.visible) {
      this.clearData()
      if (nextProps.formTemplate) {
        this.formData = nextProps.formTemplate
        this.type = nextProps.formTemplate.type
      }
      if (nextProps.credentialType) {
        this.type = nextProps.credentialType
        this.formData.type = nextProps.credentialType
        if (!this.kubeconfig && nextProps.credentialType === 'kubeconfig') {
          this.fetchKubeConfig()
        }
      }
    }
  }

  clearData = () => {
    this.formData = {}
    this.type = 'username_password'
  }

  @observable
  formData = {}
  @observable
  type = 'username_password'
  @observable
  isConflict = false
  @observable
  kubeconfig = ''
  @observable
  isSubmitting = false
  @observable
  isGetConfigLoading = false

  @action
  async handleCreate(data, project_id, reject) {
    return await this.store.handleCreate(data, { project_id }, reject)
  }

  @action
  fetchKubeConfig = async () => {
    this.isGetConfigLoading = true
    const result = await request
      .get(
        `kapis/resources.kubesphere.io/v1alpha2/users/${
          this.username
        }/kubeconfig`
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
    const { isEditMode, project_id } = this.props
    const formData = this.formRef.current.getData()
    this.isConflict = false
    this.formRef.current.validate(async () => {
      this.isSubmitting = true
      this.updataFormData(formData)

      if (isEditMode) {
        await this.store
          .updateCridential(formData, { project_id })
          .finally(() => {
            this.isSubmitting = false
          })
      } else {
        await this.handleCreate(formData, project_id, resp => {
          if (resp.status === 409) {
            this.isConflict = true
          }
        }).finally(() => {
          this.isSubmitting = false
        })
      }
      if (!this.isConflict) {
        this.props.onOk()
      }
    })
  }

  updataFormData(data) {
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

  renderCreidentForm = () => {
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
              <Input name="username_password.username" />
            </Form.Item>
            <Form.Item label={t('token / password')}>
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
            desc={t("The default value here is the current user's kubeconfig")}
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
        title={title || t('Create credentials')}
      >
        <Form data={this.formData} ref={this.formRef}>
          <Form.Item
            label={t('Credential ID')}
            error={
              this.isConflict ? { message: t('this name has been used') } : null
            }
            rules={[
              { required: true, message: t('Please input credential name') },
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
          {this.renderCreidentForm()}
          <Form.Item label={t('Description')}>
            <TextArea name="description" />
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}
