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
  Form,
  Input,
  InputPassword,
  Select,
  TextArea,
} from '@kube-design/components'

import { hasChinese } from 'utils'
import { MODULE_KIND_MAP } from 'utils/constants'

import DataList from './DataList'
import DataForm from './DataForm'
import Base64Wrapper from './Base64Wrapper'
import ImagerRegistry from './ImagerRegistry'

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

  imageRegistryRef = React.createRef()

  get formTemplate() {
    const { formTemplate, module } = this.props
    return get(formTemplate, MODULE_KIND_MAP[module], formTemplate)
  }

  get fedFormTemplate() {
    return this.props.isFederated
      ? get(this.formTemplate, 'spec.template')
      : this.formTemplate
  }

  get isDefault() {
    return (
      get(
        this.formTemplate,
        'metadata.annotations["secret.kubesphere.io/is-default-class"]',
        'false'
      ) === 'true'
    )
  }

  getTypeOptions = () => [
    { label: t('DEFAULT'), value: 'Opaque' },
    { label: t('TLS_INFORMATION'), value: 'kubernetes.io/tls' },
    {
      label: t('IMAGE_REGISTRY_INFORMATION'),
      value: 'kubernetes.io/dockerconfigjson',
    },
    {
      label: t('USERNAME_PASSWORD'),
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

  imageValidator = (rule, value, callback) => {
    if (this.imageRegistryRef.current.validate()) {
      return callback()
    }
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
        label={t('DATA')}
        rules={[
          { required: true, message: t('ENTER_DATA_DESC') },
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
      <div key="tls" className="margin-t8">
        <Form.Item
          label={t('CERTIFICATE')}
          rules={[
            { required: true, message: t('CREDENTIAL_NAME_EMPTY_DESC') },
            { validator: this.dataValidator },
          ]}
        >
          <Base64Wrapper name="data['tls.crt']">
            <TextArea rows="6" resize />
          </Base64Wrapper>
        </Form.Item>
        <Form.Item
          label={t('PRIVATE_KEY_TCAP')}
          rules={[
            { required: true, message: t('ENTER_PRIVATE_KEY_DESC') },
            { validator: this.dataValidator },
          ]}
        >
          <Base64Wrapper name="data['tls.key']">
            <TextArea rows="6" resize />
          </Base64Wrapper>
        </Form.Item>
      </div>
    )
  }

  renderImage() {
    const { cluster, isFederated } = this.props
    const { name, namespace } = get(this.formTemplate, 'metadata')
    return (
      <div key="image" className="margin-t8">
        <Form.Item rules={[{ validator: this.imageValidator }]}>
          <Base64Wrapper name="data['.dockerconfigjson']">
            <ImagerRegistry
              fedFormTemplate={this.fedFormTemplate}
              cluster={cluster}
              isDefault={this.isDefault}
              onChangeDefault={_isDefault =>
                set(
                  this.fedFormTemplate,
                  'metadata.annotations["secret.kubesphere.io/is-default-class"]',
                  _isDefault ? 'true' : 'false'
                )
              }
              namespace={namespace}
              isFederated={isFederated}
              screatName={name}
              ref={this.imageRegistryRef}
            />
          </Base64Wrapper>
        </Form.Item>
        <Form.Item>{this.renderDefault()}</Form.Item>
      </div>
    )
  }

  renderBasicAuth() {
    return (
      <div key="basic" className="margin-t8">
        <Form.Item
          label={t('USERNAME')}
          rules={[
            { required: true, message: t('USERNAME_EMPTY_DESC') },
            { validator: this.dataValidator },
          ]}
        >
          <Base64Wrapper name="data.username">
            <Input autoComplete="nope" />
          </Base64Wrapper>
        </Form.Item>
        <Form.Item
          label={t('PASSWORD')}
          rules={[
            { required: true, message: t('PASSWORD_EMPTY_DESC') },
            { validator: this.dataValidator },
          ]}
        >
          <Base64Wrapper name="data.password">
            <InputPassword type="password" autoComplete="new-password" />
          </Base64Wrapper>
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
    const { formRef, disableSelect } = this.props
    const { state } = this.state

    if (state === 'data') {
      return this.renderDataForm()
    }

    return (
      <Form data={this.fedFormTemplate} ref={formRef}>
        <Form.Item
          label={t('TYPE')}
          desc={disableSelect ? '' : t('SECRET_TYPE_DESC')}
        >
          <Select
            name="type"
            options={this.getTypeOptions()}
            onChange={this.handleTypeChange}
            placeholder=" "
            disabled={disableSelect}
            searchable
          />
        </Form.Item>
        {this.renderContent()}
      </Form>
    )
  }
}
