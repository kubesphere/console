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

import { get, set, isUndefined } from 'lodash'
import React from 'react'
import {
  Columns,
  Column,
  Input,
  InputPassword,
  TextArea,
} from '@pitrix/lego-ui'
import { Form } from 'components/Base'
import { CustomSelect, SchemeInput } from 'components/Inputs'

import { hasChinese } from 'utils'
import { MODULE_KIND_MAP } from 'utils/constants'

import DataList from './DataList'
import DataForm from './DataForm'

const SECRET_TYPES = [
  'Opaque',
  'kubernetes.io/tls',
  'kubernetes.io/dockerconfigjson',
  'kubernetes.io/basic-auth',
]

export default class SecretSettings extends React.Component {
  state = {
    type: get(this.fedFormTemplate, 'type', ''),
    state: '',
    selectDataKey: '',
  }

  get formTemplate() {
    const { formTemplate, module } = this.props
    return get(formTemplate, MODULE_KIND_MAP[module], formTemplate)
  }

  get fedFormTemplate() {
    return this.props.isFederated
      ? get(this.formTemplate, 'spec.template')
      : this.formTemplate
  }

  getTypeOptions = () => [
    { label: t('Default'), value: 'Opaque' },
    { label: t('TLS'), value: 'kubernetes.io/tls' },
    {
      label: t('Image Repository Secret'),
      value: 'kubernetes.io/dockerconfigjson',
    },
    {
      label: t('Account Password Secret'),
      value: 'kubernetes.io/basic-auth',
    },
  ]

  handleTypeChange = type => {
    if (!type || SECRET_TYPES.includes(type)) {
      set(this.fedFormTemplate, 'data', {})
    }

    this.setState({ type })
  }

  dataValidator = (rule, value, callback) => {
    if (isUndefined(value)) {
      return callback()
    }

    if (
      Object.entries(value).some(
        ([key, _value]) => hasChinese(key) || hasChinese(_value)
      )
    ) {
      return callback({ message: t('SECRET_NO_CHINESE_CODE_DESC') })
    }

    callback()
  }

  handleData = data => {
    const { selectDataKey } = this.state
    const originData = get(this.fedFormTemplate, 'data', {})

    if (selectDataKey) {
      delete originData[selectDataKey]
    }

    set(this.fedFormTemplate, 'data', { ...originData, ...data })

    this.hideDataForm()
  }

  showDataForm = () => {
    this.setState({ state: 'data', selectDataKey: '' })
  }

  hideDataForm = () => {
    this.setState({ state: '', selectDataKey: '' })
  }

  handleDataItemEdit = key => {
    this.setState({ state: 'data', selectDataKey: key })
  }

  renderDataForm() {
    const { selectDataKey } = this.state
    const originData = get(this.fedFormTemplate, 'data', {})

    return (
      <DataForm
        detail={originData}
        selectKey={selectDataKey}
        onOk={this.handleData}
        onCancel={this.hideDataForm}
      />
    )
  }

  renderDefault() {
    return (
      <Form.Item
        label={t('Data')}
        rules={[
          { required: true, message: t('Please input data') },
          { validator: this.dataValidator },
        ]}
      >
        <DataList
          name="data"
          onEdit={this.handleDataItemEdit}
          onAdd={this.showDataForm}
        />
      </Form.Item>
    )
  }

  renderTLS() {
    return (
      <div className="margin-t8">
        <Form.Item
          label={t('Credential')}
          rules={[
            { required: true, message: t('Please input credential') },
            { validator: this.dataValidator },
          ]}
        >
          <TextArea name="data['tls.crt']" rows="6" resize />
        </Form.Item>
        <Form.Item
          label={t('Private Key')}
          rules={[
            { required: true, message: t('Please input private key') },
            { validator: this.dataValidator },
          ]}
        >
          <TextArea name="data['tls.key']" rows="6" resize />
        </Form.Item>
      </div>
    )
  }

  renderImage() {
    return (
      <div className="margin-t8">
        <input name="username" className="hidden-input" type="text" disabled />
        <input
          name="password"
          className="hidden-input"
          type="password"
          disabled
        />
        <Columns>
          <Column>
            <Form.Item
              label={t('Registry Address')}
              desc={t('Example: docker.io')}
              rules={[
                { required: true, message: t('Please input registry address') },
                { validator: this.dataValidator },
              ]}
            >
              <SchemeInput name="data['.dockerconfigjson'].url" />
            </Form.Item>
          </Column>
          <Column>
            <Form.Item
              label={t('User Name')}
              rules={[
                { required: true, message: t('Please input user name') },
                { validator: this.dataValidator },
              ]}
            >
              <Input
                name="data['.dockerconfigjson'].username"
                autoComplete="nope"
              />
            </Form.Item>
          </Column>
        </Columns>
        <Columns>
          <Column>
            <Form.Item label={t('Email')}>
              <Input name="data['.dockerconfigjson'].email" />
            </Form.Item>
          </Column>
          <Column>
            <Form.Item
              label={t('Password')}
              rules={[
                { required: true, message: t('Please input password') },
                { validator: this.dataValidator },
              ]}
            >
              <InputPassword
                type="password"
                name="data['.dockerconfigjson'].password"
                autoComplete="new-password"
              />
            </Form.Item>
          </Column>
        </Columns>
      </div>
    )
  }

  renderBasicAuth() {
    return (
      <div className="margin-t8">
        <Form.Item
          label={t('User Name')}
          rules={[
            { required: true, message: t('Please input user name') },
            { validator: this.dataValidator },
          ]}
        >
          <Input name="data.username" autoComplete="nope" />
        </Form.Item>
        <Form.Item
          label={t('Password')}
          rules={[
            { required: true, message: t('Please input password') },
            { validator: this.dataValidator },
          ]}
        >
          <InputPassword
            type="password"
            name="data.password"
            autoComplete="new-password"
          />
        </Form.Item>
      </div>
    )
  }

  renderContent() {
    let content = null

    switch (this.state.type) {
      case 'Opaque':
        content = this.renderDefault()
        break
      case 'kubernetes.io/tls':
        content = this.renderTLS()
        break
      case 'kubernetes.io/dockerconfigjson':
        content = this.renderImage()
        break
      case 'kubernetes.io/basic-auth':
        content = this.renderBasicAuth()
        break
      default:
        content = this.renderDefault()
        break
    }

    return content
  }

  render() {
    const { formRef, mode } = this.props
    const { state } = this.state

    if (state === 'data') {
      return this.renderDataForm()
    }

    return (
      <Form data={this.fedFormTemplate} ref={formRef}>
        {mode !== 'edit' ? (
          <Form.Item label={t('Type')} desc={t('SECRET_TYPE_DESC')}>
            <CustomSelect
              name="type"
              options={this.getTypeOptions()}
              onChange={this.handleTypeChange}
              placeholder={t('Please Select')}
            />
          </Form.Item>
        ) : (
          <Form.Item label={t('Type')}>
            <Input name="type" disabled />
          </Form.Item>
        )}
        {this.renderContent()}
      </Form>
    )
  }
}
