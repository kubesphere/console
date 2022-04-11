/*
 * This file is part of KubeSphere Console.
 * Copyright (C) 2022 The KubeSphere Console Authors.
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

import { observer } from 'mobx-react'
import { Modal } from 'components/Base'
import { Form, Input, Select, Tag } from '@kube-design/components'

import { Column, Columns } from '@kube-design/components/lib/components/Layout'
import { pick } from 'lodash'
import styles from './index.scss'

const formTemplate = ({
  credentialsId,
  appName,
  devops,
  name,
  newName,
  branch,
  tag,
}) => ({
  arguments: {
    isLiteral: true,
    value: 'base',
  },
  children: [
    {
      arguments: {
        isLiteral: false,
        value: `\${[usernamePassword(credentialsId : '${credentialsId}' ,passwordVariable : 'PASS' ,usernameVariable : 'USER')]}`,
      },
      children: [
        {
          arguments: [
            {
              key: 'script',
              value: {
                isLiteral: true,
                value: `ks app update --app-name ${appName} \\\n --app-namespace ${devops} \\\n --name ${name} \\\n --newName ${newName}${
                  tag ? `:${tag}` : ''
                } \\\n --git-password $PASS --git-username=$USER \\\n --git-target-branch ${branch}`,
              },
            },
          ],
          name: 'sh',
        },
      ],
      name: 'withCredentials',
    },
  ],
  name: 'container',
})

@observer
export default class CD extends React.Component {
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

  componentDidMount() {
    this.getCDListData()
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
        disabled: credential.type !== 'username_password',
      })),
    ]
  }

  getCDListData = params => {
    return this.props.store.getCDListData(params)
  }

  getCDList = () => {
    return [
      ...this.props.store.cdList.data.map(item => ({
        label: item.name,
        value: item.name,
      })),
    ]
  }

  handleOk = () => {
    const formData = this.formRef.current.getData()

    this.formRef.current.validate(() => {
      const _arguments = formTemplate({
        ...formData,
        devops: this.props.store.params.devops,
      })

      this.props.onAddStep(_arguments)
    })
  }

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
    const { credentialsList, cdList } = this.props.store

    return (
      <Modal
        width={680}
        bodyClassName={styles.body}
        onCancel={onCancel}
        onOk={this.handleOk}
        visible={visible}
        closable={false}
        title={t('UPDATE_CD_TITLE')}
      >
        <Form data={this.state.formData} ref={this.formRef}>
          <div className={styles.columns}>
            <Columns>
              <Column className="is-8">
                <Form.Item
                  label={t('CONTINUOUS_DEPLOYMENT_PL')}
                  rules={[{ required: true, message: t('PARAM_REQUIRED') }]}
                >
                  <Select
                    name="appName"
                    options={this.getCDList()}
                    pagination={pick(cdList, ['page', 'limit', 'total'])}
                    isLoading={cdList.isLoading}
                    onFetch={this.getCDListData}
                    searchable
                    clearable
                  />
                </Form.Item>
              </Column>
              <Column className="is-4">
                <Form.Item
                  label={t('BRANCH_SI')}
                  rules={[{ required: true, message: t('PARAM_REQUIRED') }]}
                >
                  <Input name="branch" />
                </Form.Item>
              </Column>
            </Columns>
          </div>
          <Form.Item
            label={t('ORIGINAL_IMAGE_ADDRESS')}
            rules={[{ required: true, message: t('PARAM_REQUIRED') }]}
          >
            <Input name="name" />
          </Form.Item>
          <div className={styles.columns}>
            <Columns>
              <Column className="is-8">
                <Form.Item
                  label={t('NEW_IMAGE_ADDRESS')}
                  rules={[{ required: true, message: t('PARAM_REQUIRED') }]}
                >
                  <Input name="newName" />
                </Form.Item>
              </Column>
              <Column className="is-4">
                <Form.Item label={t('NEW_IMAGE_TAG')}>
                  <Input name="tag" />
                </Form.Item>
              </Column>
            </Columns>
          </div>
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
            rules={[{ required: true, message: t('PARAM_REQUIRED') }]}
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
        </Form>
      </Modal>
    )
  }
}
