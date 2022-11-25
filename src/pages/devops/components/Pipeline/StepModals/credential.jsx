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

import React, { Component } from 'react'
import { pick, get } from 'lodash'
import { Select, Tag, Form } from '@kube-design/components'
import { observer } from 'mobx-react'

import styles from '../index.scss'

@observer
export default class SecretSelect extends Component {
  async componentDidMount() {
    const { formData, onChange, option } = this.props
    await this.getCredentialsListData()
    if (!get(formData, `${option.name}.name`)) {
      onChange(formData[option.name])
    }
  }

  getCredentialsListData = params => {
    return this.props.store.getCredentials(params)
  }

  getCredentialsList = option => {
    return [
      ...this.props.store.credentialsList.data.map(credential => ({
        label: credential.name,
        value: credential.name,
        type: credential.type,
        disabled: option.secretType
          ? credential.type !== option.secretType
          : false,
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

  renderCredentialDesc() {
    return (
      <p>
        {t('SELECT_CREDENTIAL_DESC')}
        <span className={styles.clickable} onClick={this.props.showCredential}>
          {t('CREATE_CREDENTIAL')}
        </span>
      </p>
    )
  }

  render() {
    const { option, onChange } = this.props
    const { credentialsList } = this.props.store
    const formProps = {
      key: option.name,
      label: t(option.display),
      rules: [
        {
          required: option.required ?? false,
          message: t('PARAM_REQUIRED'),
        },
      ],
      desc: this.renderCredentialDesc(),
    }
    return (
      <Form.Item {...formProps}>
        <Select
          name={`${option.name}.name`}
          options={this.getCredentialsList(option)}
          pagination={pick(credentialsList, ['page', 'limit', 'total'])}
          isLoading={credentialsList.isLoading}
          onFetch={this.getCredentialsListData}
          searchable
          clearable
          onChange={onChange}
        />
      </Form.Item>
    )
  }
}
