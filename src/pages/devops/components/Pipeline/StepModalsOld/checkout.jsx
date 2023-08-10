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
import { pick } from 'lodash'
import { observer } from 'mobx-react'
import { Form, Input, Select, Tag } from '@kube-design/components'
import { Modal } from 'components/Base'
import { groovyToJS } from 'utils/devops'
import { toJS } from 'mobx'

import styles from './index.scss'

@observer
export default class Checkout extends React.Component {
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
    this.state = { ...this.getFormData(props) }
  }

  getFormData(props) {
    if (props.edittingData.type === 'checkout') {
      const data = toJS(props.edittingData)
      const formData = data.data.reduce((prev, arg) => {
        if (arg.key === 'scm') {
          const str = arg.value.value
          if (str) {
            Object.assign(prev, groovyToJS(str))
          }
        }
        prev[arg.key] = arg.value.value
        return prev
      }, {})
      return { formData }
    }
    return { formData: {} }
  }

  handleOk = () => {
    this.formRef.current.validate(() => {
      this.props.onAddStep({
        name: 'checkout',
        arguments: [
          {
            key: 'scm',
            value: {
              isLiteral: false,
              value: `[$class: 'SubversionSCM', locations: [[cancelProcessOnExternalsFail: true,  ${
                this.state.formData.credentialsId
                  ? `credentialsId: '${this.state.formData.credentialsId}',`
                  : ''
              } depthOption: 'infinity', ignoreExternalsOption: true, local: '.', remote: '${
                this.state.formData.remote
              }']], quietOperation: true, workspaceUpdater: [$class: 'UpdateUpdater']]`,
            },
          },
          {
            key: 'poll',
            value: {
              isLiteral: true,
              value: false,
            },
          },
        ],
      })
    })
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
        disabled: !this.props.store.isPassWordCredentials(credential.type),
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
        title={t('checkout (svn)')}
      >
        <Form data={this.state.formData} ref={this.formRef}>
          <Form.Item
            label={t('CREDENTIAL_NAME')}
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
              optionRenderer={this.optionRender}
              valueRenderer={this.optionRender}
              searchable
              clearable
            />
          </Form.Item>
          <Form.Item
            label={t('REMOTE_REPOSITORY_URL')}
            rules={[{ required: true, message: t('PARAM_REQUIRED') }]}
          >
            <Input name="remote" />
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}
